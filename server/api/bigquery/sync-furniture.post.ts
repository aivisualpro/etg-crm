/**
 * POST /api/bigquery/sync-furniture
 *
 * Syncs the Furniture table from Google Sheets → BigQuery.
 * Processes ONE partition per request to avoid timeout.
 *
 * Query params:
 *  - partition: index (0-14) or 'list' to get partition list
 *  - images: 'false' to skip image copy (default: true)
 *
 * Images are copied from Google Drive Furniture_Images → GCS
 * with path: {A7}/{A8}/{A9}/{filename} (level1/level2/level3)
 */

// ─── Partition config ───────────────────────────────────────
const PARTITIONS = [
    { a7: 'A6', sheet: 'Furniture_Madinah' },
    { a7: 'A275', sheet: 'Furniture_Hail' },
    { a7: '919591d7', sheet: 'Furniture_National' },
    { a7: 'Com4', sheet: 'Furniture_Com4' },
    { a7: 'Com5', sheet: 'Furniture_Com5' },
    { a7: 'Com6', sheet: 'Furniture_Com6' },
    { a7: 'Com7', sheet: 'Furniture_Com7' },
    { a7: 'Com8', sheet: 'Furniture_Com8' },
    { a7: 'Com9', sheet: 'Furniture_Com9' },
    { a7: 'Com10', sheet: 'Furniture_Com10' },
    { a7: '6691b660', sheet: 'Furniture_6691b660' },
    { a7: '96c8d7f4', sheet: 'Furniture_96c8d7f4' },
    { a7: 'f5ffd16c', sheet: 'Furniture_f5ffd16c' },
    { a7: '73ed2936', sheet: 'Furniture_73ed2936' },
    { a7: '895b1303', sheet: 'Furniture_895b1303' },
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

    const headers = parseLine(rawLines[0])
    const rows: Record<string, string>[] = []
    for (let i = 1; i < rawLines.length; i++) {
        if (!rawLines[i].trim()) continue
        const values = parseLine(rawLines[i])
        const row: Record<string, string> = {}
        for (let j = 0; j < headers.length; j++) row[headers[j]] = values[j] || ''
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

export default defineEventHandler(async (event: Parameters<Parameters<typeof defineEventHandler>[0]>[0]) => {
    try {
        const query = getQuery(event)
        const partitionIdx = query.partition as string
        const syncImages = query.images !== 'false'

        // Return partition list
        if (partitionIdx === undefined || partitionIdx === 'list') {
            return {
                success: true,
                partitions: PARTITIONS.map((p, i) => ({ index: i, a7: p.a7, sheet: p.sheet })),
                total: PARTITIONS.length,
            }
        }

        const idx = Number(partitionIdx)
        if (isNaN(idx) || idx < 0 || idx >= PARTITIONS.length) {
            throw createError({ statusCode: 400, statusMessage: `Invalid partition: ${partitionIdx}` })
        }

        const partition = PARTITIONS[idx]
        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const bq = useBigQuery()
        const fqTable = `\`${projectId}.${dataset}.${BQ_TABLE}\``

        console.log(`\n═══ Furniture Sync: ${partition.sheet} (${idx + 1}/${PARTITIONS.length}) ═══`)

        // ─── Auth token for Google Sheets ────────────────────────
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
        const { access_token: sheetsToken } = await tokenRes.json() as { access_token: string }

        // ─── Ensure BQ table exists ──────────────────────────────
        const schema = COLUMNS.map(col => ({ name: col, type: 'STRING' as const, mode: 'NULLABLE' as const }))
        try { await bq.dataset(dataset).table(BQ_TABLE).get() }
        catch { await bq.dataset(dataset).createTable(BQ_TABLE, { schema: { fields: schema } }) }

        // ─── Read partition data (paginated) ─────────────────────
        const rows: Record<string, string>[] = []
        let offset = 0

        while (true) {
            const tq = encodeURIComponent(`select * limit ${GVIZ_PAGE_SIZE} offset ${offset}`)
            const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(partition.sheet)}&tq=${tq}`
            const res = await fetch(url, { headers: { Authorization: `Bearer ${sheetsToken}` } })
            if (!res.ok) break

            const pageRows = csvParse(await res.text())
            for (const row of pageRows) { if (!row.A7) row.A7 = partition.a7 }
            rows.push(...pageRows)
            console.log(`  📄 Offset ${offset}: ${pageRows.length} rows (total: ${rows.length})`)
            if (pageRows.length < GVIZ_PAGE_SIZE) break
            offset += GVIZ_PAGE_SIZE
        }

        console.log(`  ✅ ${partition.sheet}: ${rows.length} rows fetched`)
        if (rows.length === 0) {
            return { success: true, message: `${partition.sheet}: no data`, partition: partition.a7, count: 0, index: idx, imagesCopied: 0 }
        }

        // ─── Copy images: Google Drive → GCS ─────────────────────
        let imagesCopied = 0
        if (syncImages) {
            try {
                const drive = useDrive()
                const { uploadToGCS } = await import('../../utils/gcs')
                const ETG_FOLDER_ID = '11VajRLFO1YtFjalXkYnzJ8F75gZ1hdHJ'

                // Find Furniture_Images folder
                const folderRes = await drive.files.list({
                    q: `'${ETG_FOLDER_ID}' in parents and name = 'Furniture_Images' and mimeType = 'application/vnd.google-apps.folder'`,
                    fields: 'files(id)',
                    supportsAllDrives: true,
                    includeItemsFromAllDrives: true,
                })
                const imagesFolderId = folderRes.data.files?.[0]?.id

                if (imagesFolderId) {
                    // Index all files in Furniture_Images (paginated)
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

                    console.log(`  📂 ${driveFileMap.size} files indexed from Furniture_Images`)

                    // Copy images for each row
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
                                    const ext = imgFileName.split('.').pop() || 'jpg'
                                    const ct = driveFile.mimeType || 'image/jpeg'
                                    // GCS path: A7/A8/A9/filename
                                    const gcsPath = `${row.A7 || '_'}/${row.A8 || '_'}/${row.A9 || '_'}/${imgFileName}`
                                    await uploadToGCS(GCS_BUCKET, gcsPath, buf, ct)
                                    row[col + '_url'] = gcsPath
                                    imagesCopied++
                                    if (imagesCopied % 100 === 0) console.log(`  🖼️ ${imagesCopied} images...`)
                                }
                            }
                            catch { /* skip failed downloads */ }
                        }
                    }
                    console.log(`  🖼️ Total images copied: ${imagesCopied}`)
                }
                else {
                    console.warn('  ⚠️ Furniture_Images folder not found')
                }
            }
            catch (imgErr: unknown) {
                const msg = imgErr instanceof Error ? imgErr.message : String(imgErr)
                console.warn(`  ⚠️ Image copy error (continuing): ${msg}`)
            }
        }

        // ─── Delete old rows for this partition ──────────────────
        try { await bq.query({ query: `DELETE FROM ${fqTable} WHERE A7 = '${partition.a7}'`, location: 'US', maximumBytesBilled: '0' }) }
        catch { /* ignore — table might not exist yet */ }

        // ─── Insert new rows in batches ──────────────────────────
        const BATCH_SIZE = 1000
        let inserted = 0
        let failedBatches = 0

        for (let i = 0; i < rows.length; i += BATCH_SIZE) {
            const batch = rows.slice(i, i + BATCH_SIZE)
            const valueRows = batch.map(row => {
                const vals = COLUMNS.map(col => escapeSQL(row[col]))
                return `(${vals.join(',')})`
            })

            // Retry up to 3 times per batch
            let success = false
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    await bq.query({
                        query: `INSERT INTO ${fqTable} (${COLUMNS.join(',')}) VALUES ${valueRows.join(',')}`,
                        location: 'US',
                        jobTimeoutMs: '120000', // 2 minute timeout per batch
                    })
                    inserted += batch.length
                    success = true
                    break
                }
                catch (batchErr: unknown) {
                    const msg = batchErr instanceof Error ? batchErr.message : String(batchErr)
                    if (attempt < 2) {
                        console.warn(`  ⚠️ Batch ${Math.floor(i / BATCH_SIZE) + 1} attempt ${attempt + 1} failed: ${msg}. Retrying...`)
                        await new Promise(r => setTimeout(r, 2000 * (attempt + 1))) // exponential backoff
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

        return {
            success: true,
            message: `${partition.sheet}: ${inserted} rows synced, ${imagesCopied} images copied`,
            partition: partition.a7,
            sheet: partition.sheet,
            count: inserted,
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
