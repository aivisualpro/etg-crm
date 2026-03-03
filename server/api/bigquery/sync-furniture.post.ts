/**
 * POST /api/bigquery/sync-furniture
 *
 * Smart Furniture Sync: Google Sheets → BigQuery
 *
 * Modes:
 *  - partition=list          → Return partition list with sheet/BQ counts (fast health check)
 *  - partition=0..13         → Sync ONE partition (full replace for that partition)
 *  - partition=smart         → Only sync partitions where sheet count ≠ BQ count
 *  - partition=0&mode=delta  → Only fetch NEW rows (offset = current BQ count)
 *
 * Query params:
 *  - partition: index (0-13), 'list', or 'smart'
 *  - mode: 'full' (default) or 'delta' (only new rows)
 *  - images: 'true' to sync images (default: false)
 */

// ─── Partition config ───────────────────────────────────────
const PARTITIONS = [
    { a7: 'A6', sheet: 'Furniture_Madinah', expected: 17134 },
    { a7: 'A275', sheet: 'Furniture_Hail', expected: 11622 },
    { a7: '919591d7', sheet: 'Furniture_National', expected: 168 },
    { a7: 'Com4', sheet: 'Furniture_Com4', expected: 21933 },
    { a7: 'Com5', sheet: 'Furniture_Com5', expected: 25397 },
    { a7: 'Com6', sheet: 'Furniture_Com6', expected: 11010 },
    { a7: 'Com7', sheet: 'Furniture_Com7', expected: 849 },
    { a7: 'Com8', sheet: 'Furniture_Com8', expected: 11471 },
    { a7: 'Com9', sheet: 'Furniture_Com9', expected: 21964 },
    { a7: 'Com10', sheet: 'Furniture_Com10', expected: 9724 },
    { a7: '6691b660', sheet: 'Furniture_6691b660', expected: 4636 },
    { a7: '96c8d7f4', sheet: 'Furniture_96c8d7f4', expected: 46764 },
    { a7: 'f5ffd16c', sheet: 'Furniture_f5ffd16c', expected: 32965 },
    { a7: '73ed2936', sheet: 'Furniture_73ed2936', expected: 14098 },
]

const SPREADSHEET_ID = '1EvPmbQm3mAF1gHAfGfFHb2y5PscMVTc9QwtahVdX2Ao'
const BQ_TABLE = 'etgFurniture'
const COLUMNS = ['ID', 'A7', 'A8', 'A9', 'A66', 'A67', 'A222', 'A68', 'A69', 'A70', 'A71', 'A72', 'A75', 'A76', 'A77', 'A78', 'A2', 'A79', 'A213', 'A69_url', 'A71_url', 'A72_url']
const IMAGE_COLUMNS = ['A69', 'A71', 'A72']
const GCS_BUCKET = 'etg-storage'
const GVIZ_PAGE_SIZE = 10000

// ─── Inline CSV parser ──────────────────────────────────────
function csvParse(csv: string): Record<string, string>[] {
    const rawLines: string[] = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < csv.length; i++) {
        const ch = csv[i]
        if (ch === '"') { inQuotes = !inQuotes; current += ch }
        else if (ch === '\n' && !inQuotes) { rawLines.push(current); current = '' }
        else if (ch === '\r' && !inQuotes) { /* skip */ }
        else { current += ch }
    }
    if (current.trim()) rawLines.push(current)
    if (rawLines.length < 2) return []

    const headers = parseLine(rawLines[0] || '')
    const rows: Record<string, string>[] = []
    for (let i = 1; i < rawLines.length; i++) {
        const line = rawLines[i]
        if (!line || !line.trim()) continue
        const values = parseLine(line)
        const row: Record<string, string> = {}
        for (let j = 0; j < headers.length; j++) row[headers[j] || `col${j}`] = values[j] || ''
        rows.push(row)
    }
    return rows
}

function parseLine(line: string): string[] {
    const values: string[] = []
    let cur = ''
    let inQ = false
    for (let i = 0; i < line.length; i++) {
        const ch = line[i]
        if (ch === '"') {
            if (inQ && line[i + 1] === '"') { cur += '"'; i++ }
            else inQ = !inQ
        }
        else if (ch === ',' && !inQ) { values.push(cur); cur = '' }
        else cur += ch
    }
    values.push(cur)
    return values
}

function escapeSQL(v: string | undefined): string {
    if (!v || v === '') return 'NULL'
    return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

// ─── Get Google Sheets auth token ────────────────────────────
async function getSheetsToken(bigquery: any): Promise<string> {
    const privateKey = bigquery.privateKey?.replace(/\\n/g, '\n') || ''
    const clientEmail = bigquery.clientEmail || ''
    const { createSign } = await import('crypto')

    const now = Math.floor(Date.now() / 1000)
    const jwtH = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
    const jwtP = Buffer.from(JSON.stringify({
        iss: clientEmail,
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
    })).toString('base64url')
    const signer = createSign('RSA-SHA256')
    signer.update(`${jwtH}.${jwtP}`)
    const jwtS = signer.sign(privateKey, 'base64url')
    const jwt = `${jwtH}.${jwtP}.${jwtS}`

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    })
    const { access_token } = await tokenRes.json() as { access_token: string }
    return access_token
}

// ─── Get sheet row count (fast — uses SELECT COUNT) ─────────
async function getSheetRowCount(sheetName: string, token: string): Promise<number> {
    const tq = encodeURIComponent('select count(A) ')
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&tq=${tq}`
    try {
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok) return -1
        const csv = await res.text()
        // CSV will be: "count-A"\n12345\n
        const lines = csv.trim().split('\n')
        if (lines.length >= 2) {
            const countStr = (lines[1] || '').replace(/"/g, '').trim()
            return Number(countStr) || 0
        }
        return 0
    }
    catch {
        return -1
    }
}

// ─── Fetch rows from a sheet with optional offset ────────────
async function fetchSheetRows(
    sheetName: string,
    a7: string,
    token: string,
    startOffset = 0,
): Promise<Record<string, string>[]> {
    const rows: Record<string, string>[] = []
    let offset = startOffset

    while (true) {
        const tq = encodeURIComponent(`select * limit ${GVIZ_PAGE_SIZE} offset ${offset}`)
        const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&tq=${tq}`
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok) break

        const pageRows = csvParse(await res.text())
        for (const row of pageRows) { if (!row.A7) row.A7 = a7 }
        rows.push(...pageRows)
        console.log(`  📄 Offset ${offset}: ${pageRows.length} rows (batch total: ${rows.length})`)
        if (pageRows.length < GVIZ_PAGE_SIZE) break
        offset += GVIZ_PAGE_SIZE
    }

    return rows
}

// ─── Deduplicate by A70 (Asset Code = unique key) ────────────
function deduplicateRows(rows: Record<string, string>[]): Record<string, string>[] {
    const seen = new Set<string>()
    const unique: Record<string, string>[] = []
    for (const row of rows) {
        const key = (row.A70 || '').trim()
        if (!key) continue // Skip rows without Asset Code
        if (!seen.has(key)) {
            seen.add(key)
            unique.push(row)
        }
    }
    return unique
}

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const partitionIdx = query.partition as string
        const syncMode = (query.mode as string) || 'full'
        const syncImages = query.images === 'true'

        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const bq = useBigQuery()
        const fqTable = `\`${projectId}.${dataset}.${BQ_TABLE}\``

        // ─── MODE: Health Check / List ───────────────────────────
        if (partitionIdx === undefined || partitionIdx === 'list') {
            // Get BQ counts per partition
            let bqCounts: Record<string, number> = {}
            let bqTotal = 0
            try {
                const [countRows] = await bq.query({
                    query: `SELECT A7, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7`,
                    location: 'US',
                })
                for (const r of countRows) {
                    bqCounts[r.A7 as string] = Number(r.cnt)
                    bqTotal += Number(r.cnt)
                }
            }
            catch {
                // Table might not exist yet
            }

            // Get sheet counts in parallel (fast COUNT queries)
            const token = await getSheetsToken(bigquery)
            const sheetCountPromises = PARTITIONS.map(async (p) => {
                const sheetCount = await getSheetRowCount(p.sheet, token)
                return { ...p, sheetCount }
            })
            const partitionsWithCounts = await Promise.all(sheetCountPromises)

            const result = partitionsWithCounts.map((p, i) => {
                const bqCount = bqCounts[p.a7] || 0
                const sheetCount = p.sheetCount
                const diff = sheetCount - bqCount
                return {
                    index: i,
                    a7: p.a7,
                    sheet: p.sheet,
                    expected: p.expected,
                    sheetCount, // actual count from Google Sheets right now
                    bqCount,    // current count in BigQuery
                    diff,       // positive = BQ needs more, negative = BQ has extras
                    status: diff === 0 ? 'synced' : (diff > 0 ? 'behind' : 'excess'),
                    needsSync: diff !== 0,
                }
            })

            const totalSheet = result.reduce((s, r) => s + (r.sheetCount > 0 ? r.sheetCount : 0), 0)
            const needsSync = result.filter(r => r.needsSync)

            return {
                success: true,
                partitions: result,
                total: PARTITIONS.length,
                bqTotal,
                sheetTotal: totalSheet,
                diff: totalSheet - bqTotal,
                needsSyncCount: needsSync.length,
                allSynced: needsSync.length === 0,
            }
        }

        // ─── MODE: Smart Sync (only changed partitions) ──────────
        if (partitionIdx === 'smart') {
            const token = await getSheetsToken(bigquery)

            // Get BQ counts
            let bqCounts: Record<string, number> = {}
            try {
                const [countRows] = await bq.query({
                    query: `SELECT A7, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7`,
                    location: 'US',
                })
                for (const r of countRows) {
                    bqCounts[r.A7 as string] = Number(r.cnt)
                }
            }
            catch { /* table might not exist */ }

            // Ensure table exists
            const schema = COLUMNS.map(col => ({ name: col, type: 'STRING' as const, mode: 'NULLABLE' as const }))
            try { await bq.dataset(dataset).table(BQ_TABLE).get() }
            catch { await bq.dataset(dataset).createTable(BQ_TABLE, { schema: { fields: schema } }) }

            // Check each partition's sheet count
            const results: { sheet: string, a7: string, action: string, sheetCount: number, bqCount: number, synced: number }[] = []
            let totalSynced = 0
            let skipped = 0

            for (let i = 0; i < PARTITIONS.length; i++) {
                const p = PARTITIONS[i]!
                const bqCount = bqCounts[p.a7] || 0
                const sheetCount = await getSheetRowCount(p.sheet, token)

                if (sheetCount === bqCount && sheetCount > 0) {
                    // ✅ Already in sync — SKIP
                    console.log(`  ✅ ${p.sheet}: ${bqCount} rows — in sync, SKIPPING`)
                    results.push({ sheet: p.sheet, a7: p.a7, action: 'skipped', sheetCount, bqCount, synced: 0 })
                    skipped++
                    continue
                }

                if (sheetCount > bqCount && bqCount > 0 && syncMode === 'delta') {
                    // 📥 Delta sync — only fetch new rows
                    console.log(`  📥 ${p.sheet}: ${bqCount} → ${sheetCount} (+${sheetCount - bqCount} new rows) — DELTA SYNC`)
                    const newRows = await fetchSheetRows(p.sheet, p.a7, token, bqCount)
                    const unique = deduplicateRows(newRows)

                    if (unique.length > 0) {
                        const inserted = await insertRows(bq, fqTable, unique)
                        totalSynced += inserted
                        results.push({ sheet: p.sheet, a7: p.a7, action: 'delta', sheetCount, bqCount, synced: inserted })
                    }
                    else {
                        results.push({ sheet: p.sheet, a7: p.a7, action: 'delta-empty', sheetCount, bqCount, synced: 0 })
                    }
                    continue
                }

                // 🔄 Full re-sync for this partition
                console.log(`  🔄 ${p.sheet}: BQ=${bqCount} vs Sheet=${sheetCount} — FULL RESYNC`)
                const allRows = await fetchSheetRows(p.sheet, p.a7, token)
                const unique = deduplicateRows(allRows)

                // Delete old data
                try { await bq.query({ query: `DELETE FROM ${fqTable} WHERE A7 = '${p.a7}'`, location: 'US' }) }
                catch { /* ignore */ }

                const inserted = await insertRows(bq, fqTable, unique)
                totalSynced += inserted
                results.push({ sheet: p.sheet, a7: p.a7, action: 'full', sheetCount, bqCount, synced: inserted })
            }

            return {
                success: true,
                message: `Smart sync complete: ${totalSynced} rows synced, ${skipped}/${PARTITIONS.length} partitions skipped (already in sync)`,
                results,
                totalSynced,
                skipped,
                partitionsProcessed: PARTITIONS.length - skipped,
            }
        }

        // ─── MODE: Single partition sync ─────────────────────────
        const idx = Number(partitionIdx)
        if (isNaN(idx) || idx < 0 || idx >= PARTITIONS.length) {
            throw createError({ statusCode: 400, statusMessage: `Invalid partition: ${partitionIdx}` })
        }

        const partition = PARTITIONS[idx]!
        const token = await getSheetsToken(bigquery)

        console.log(`\n═══ Furniture Sync: ${partition.sheet} (${idx + 1}/${PARTITIONS.length}) ═══`)

        // Ensure table exists
        const schema = COLUMNS.map(col => ({ name: col, type: 'STRING' as const, mode: 'NULLABLE' as const }))
        try { await bq.dataset(dataset).table(BQ_TABLE).get() }
        catch { await bq.dataset(dataset).createTable(BQ_TABLE, { schema: { fields: schema } }) }

        // Get current BQ count for this partition
        let currentBqCount = 0
        try {
            const [r] = await bq.query({
                query: `SELECT COUNT(*) as cnt FROM ${fqTable} WHERE A7 = @a7`,
                params: { a7: partition.a7 },
                location: 'US',
            })
            currentBqCount = Number(r[0]?.cnt || 0)
        }
        catch { /* ignore */ }

        // Decide: delta or full
        let rows: Record<string, string>[]
        let isDelta = false

        if (syncMode === 'delta' && currentBqCount > 0) {
            // Delta: only fetch rows after current offset
            console.log(`  📥 Delta mode: fetching rows after offset ${currentBqCount}`)
            rows = await fetchSheetRows(partition.sheet, partition.a7, token, currentBqCount)
            isDelta = true
        }
        else {
            // Full: fetch all rows, delete old, insert fresh
            rows = await fetchSheetRows(partition.sheet, partition.a7, token)
        }

        console.log(`  ✅ ${partition.sheet}: ${rows.length} rows fetched`)
        if (rows.length === 0 && isDelta) {
            return {
                success: true,
                message: `${partition.sheet}: already in sync (${currentBqCount} rows)`,
                partition: partition.a7,
                sheet: partition.sheet,
                count: currentBqCount,
                action: 'skipped',
                index: idx,
                totalPartitions: PARTITIONS.length,
            }
        }
        if (rows.length === 0) {
            return { success: true, message: `${partition.sheet}: no data`, partition: partition.a7, count: 0, index: idx, imagesCopied: 0 }
        }

        // Deduplicate by A70 (Asset Code)
        const unique = deduplicateRows(rows)
        const dupsRemoved = rows.length - unique.length
        if (dupsRemoved > 0) {
            console.log(`  🧹 Removed ${dupsRemoved} duplicates (${rows.length} → ${unique.length})`)
        }

        // Delete old rows for full sync
        if (!isDelta) {
            try { await bq.query({ query: `DELETE FROM ${fqTable} WHERE A7 = '${partition.a7}'`, location: 'US' }) }
            catch { /* ignore */ }
        }

        // Insert
        const inserted = await insertRows(bq, fqTable, unique)

        // Copy images if requested
        let imagesCopied = 0
        if (syncImages) {
            imagesCopied = await copyImages(unique)
        }

        return {
            success: true,
            message: `${partition.sheet}: ${inserted} rows ${isDelta ? 'added' : 'synced'}${imagesCopied > 0 ? `, ${imagesCopied} images` : ''}`,
            partition: partition.a7,
            sheet: partition.sheet,
            count: inserted,
            action: isDelta ? 'delta' : 'full',
            dupsRemoved,
            imagesCopied,
            index: idx,
            totalPartitions: PARTITIONS.length,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : JSON.stringify(error)
        console.error('Furniture sync failed:', error)
        throw createError({ statusCode: 500, statusMessage: `Furniture sync failed: ${message}` })
    }
})

// ─── Insert rows in batches ──────────────────────────────────
async function insertRows(bq: any, fqTable: string, rows: Record<string, string>[]): Promise<number> {
    const BATCH_SIZE = 1000
    let inserted = 0
    let failedBatches = 0

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE)
        const valueRows = batch.map(row => {
            const vals = COLUMNS.map(col => escapeSQL(row[col]))
            return `(${vals.join(',')})`
        })

        let success = false
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                await bq.query({
                    query: `INSERT INTO ${fqTable} (${COLUMNS.join(',')}) VALUES ${valueRows.join(',')}`,
                    location: 'US',
                    jobTimeoutMs: 120000,
                })
                inserted += batch.length
                success = true
                break
            }
            catch (batchErr: unknown) {
                const msg = batchErr instanceof Error ? batchErr.message : String(batchErr)
                if (attempt < 2) {
                    console.warn(`  ⚠️ Batch ${Math.floor(i / BATCH_SIZE) + 1} attempt ${attempt + 1} failed: ${msg}. Retrying...`)
                    await new Promise(r => setTimeout(r, 2000 * (attempt + 1)))
                }
                else {
                    console.error(`  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} failed after 3 attempts: ${msg}`)
                    failedBatches++
                }
            }
        }

        if (inserted % 5000 === 0 || i + BATCH_SIZE >= rows.length) {
            console.log(`  📥 ${inserted} / ${rows.length} inserted${failedBatches > 0 ? ` (${failedBatches} failed)` : ''}`)
        }
    }

    return inserted
}

// ─── Copy images from Drive → GCS ────────────────────────────
async function copyImages(rows: Record<string, string>[]): Promise<number> {
    let imagesCopied = 0
    try {
        const drive = useDrive()
        const { uploadToGCS } = await import('../../utils/gcs')
        const ETG_FOLDER_ID = '11VajRLFO1YtFjalXkYnzJ8F75gZ1hdHJ'

        const folderRes = await drive.files.list({
            q: `'${ETG_FOLDER_ID}' in parents and name = 'Furniture_Images' and mimeType = 'application/vnd.google-apps.folder'`,
            fields: 'files(id)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        })
        const imagesFolderId = folderRes.data.files?.[0]?.id
        if (!imagesFolderId) return 0

        const driveFileMap = new Map<string, { id: string, name: string, mimeType: string }>()
        let pageToken: string | undefined
        do {
            const filesRes = await drive.files.list({
                q: `'${imagesFolderId}' in parents`,
                pageSize: 1000,
                fields: 'nextPageToken, files(id, name, mimeType)',
                pageToken,
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
            })
            for (const f of (filesRes.data.files || []) as Array<{ id: string, name: string, mimeType: string }>) {
                driveFileMap.set(f.name, f)
            }
            pageToken = filesRes.data.nextPageToken || undefined
        } while (pageToken)

        for (const row of rows) {
            for (const col of IMAGE_COLUMNS) {
                const imgPath = row[col]
                if (!imgPath || !imgPath.includes('/')) continue
                const imgFileName = imgPath.split('/').pop()
                if (!imgFileName) continue
                const driveFile = driveFileMap.get(imgFileName)
                if (!driveFile) continue

                try {
                    const dlRes = await drive.files.get(
                        { fileId: driveFile.id, alt: 'media' },
                        { responseType: 'arraybuffer' },
                    )
                    const buf = new Uint8Array(dlRes.data as ArrayBuffer)
                    if (buf.length > 0) {
                        const ct = driveFile.mimeType || 'image/jpeg'
                        const gcsPath = `furniture/${row.A7 || '_'}/${row.A8 || '_'}/${row.A9 || '_'}/${imgFileName}`
                        await uploadToGCS(GCS_BUCKET, gcsPath, buf, ct)
                        row[col + '_url'] = gcsPath
                        imagesCopied++
                    }
                }
                catch { /* skip */ }
            }
        }
    }
    catch (err: unknown) {
        console.warn(`  ⚠️ Image copy error: ${err instanceof Error ? err.message : String(err)}`)
    }
    return imagesCopied
}
