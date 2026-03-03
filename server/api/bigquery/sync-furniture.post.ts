/**
 * POST /api/bigquery/sync-furniture
 *
 * Syncs the Furniture table from Google Sheets → BigQuery.
 *
 * The AppSheet "Furnitures" table uses **partitions**: each Level1 entity (A7)
 * has its own worksheet, e.g. Furniture_Madinah, Furniture_Com4, etc.
 *
 * Strategy:
 *  • Full sync: reads all partition sheets, truncates + inserts to BQ
 *  • Incremental sync (?mode=incremental): reads sheets, MERGEs only
 *    rows whose ID doesn't exist or whose data has changed
 *  • Image columns (A69, A71, A72) are copied from Google Drive → GCS
 *    with path: {A7}/Furniture/{ID}/{column}.{ext}
 *  • Virtual/computed columns are NOT present (sheets have raw data only)
 *
 * Columns: ID, A7, A8, A9, A66, A67, A222, A68, A69, A70, A71, A72,
 *          A75, A76, A77, A78, A2, A79, A213
 */

import { parse as csvParse } from '../../utils/csv-parser'

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
const IMAGE_COLUMNS = ['A69', 'A71', 'A72']
const GCS_BUCKET = 'etg-storage'

// Columns we want to store (all of them — no virtuals in sheets)
const COLUMNS = ['ID', 'A7', 'A8', 'A9', 'A66', 'A67', 'A222', 'A68', 'A69', 'A70', 'A71', 'A72', 'A75', 'A76', 'A77', 'A78', 'A2', 'A79', 'A213', 'A69_url', 'A71_url', 'A72_url']

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const mode = (query.mode as string) || 'full'
    const syncImages = query.images !== 'false' // default: sync images

    try {
        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const bq = useBigQuery()

        console.log(`\n═══ Furniture Sync (${mode}) ═══`)

        // ─── Step 1: Get auth token for Google Sheets ────────────
        const privateKey = bigquery.privateKey?.replace(/\\n/g, '\n') || ''
        const clientEmail = bigquery.clientEmail || ''
        const { createSign } = await import('crypto')

        const now = Math.floor(Date.now() / 1000)
        const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
        const payload = Buffer.from(JSON.stringify({
            iss: clientEmail,
            scope: 'https://www.googleapis.com/auth/drive.readonly',
            aud: 'https://oauth2.googleapis.com/token',
            iat: now,
            exp: now + 3600,
        })).toString('base64url')
        const sign = createSign('RSA-SHA256')
        sign.update(`${header}.${payload}`)
        const signature = sign.sign(privateKey, 'base64url')
        const jwt = `${header}.${payload}.${signature}`

        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
        })
        const { access_token: sheetsToken } = await tokenRes.json() as { access_token: string }

        // ─── Step 2: Read all partition sheets ───────────────────
        const allRows: Record<string, string>[] = []
        const partitionCounts: Record<string, number> = {}

        for (const partition of PARTITIONS) {
            console.log(`  📋 Reading ${partition.sheet}...`)
            try {
                const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(partition.sheet)}`
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${sheetsToken}` },
                })

                if (!res.ok) {
                    console.warn(`  ⚠️ ${partition.sheet}: HTTP ${res.status}`)
                    continue
                }

                const csvText = await res.text()
                const rows = csvParse(csvText)

                // Each row already has A7 from the sheet, but ensure it's set
                for (const row of rows) {
                    if (!row.A7) row.A7 = partition.a7
                }

                allRows.push(...rows)
                partitionCounts[partition.a7] = rows.length
                console.log(`  ✅ ${partition.sheet}: ${rows.length} rows`)
            }
            catch (e: any) {
                console.warn(`  ⚠️ ${partition.sheet}: ${e.message}`)
            }
        }

        console.log(`  📊 Total rows fetched: ${allRows.length}`)

        if (allRows.length === 0) {
            return { success: true, message: 'No furniture data found', details: { total: 0 } }
        }

        // ─── Step 3: Copy images from Google Drive → GCS ─────────
        let imagesCopied = 0
        if (syncImages) {
            const drive = useDrive()
            const { uploadToGCS } = await import('../../utils/gcs')

            const ETG_FOLDER_ID = '11VajRLFO1YtFjalXkYnzJ8F75gZ1hdHJ'

            // Find the Furniture_Images folder
            const folderRes = await drive.files.list({
                q: `'${ETG_FOLDER_ID}' in parents and name = 'Furniture_Images' and mimeType = 'application/vnd.google-apps.folder'`,
                fields: 'files(id)',
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
            })
            const imagesFolderId = folderRes.data.files?.[0]?.id

            if (imagesFolderId) {
                // List ALL image files (paginate through)
                let driveFiles: Array<{ id: string, name: string, mimeType: string }> = []
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
                    driveFiles.push(...((filesRes.data.files || []) as typeof driveFiles))
                    pageToken = filesRes.data.nextPageToken || undefined
                } while (pageToken)

                console.log(`  📂 Found ${driveFiles.length} files in Furniture_Images`)

                // Build a lookup: filename → drive file info
                const driveFileMap = new Map<string, typeof driveFiles[0]>()
                for (const f of driveFiles) {
                    driveFileMap.set(f.name, f)
                }

                // For incremental mode, only copy images for NEW rows
                // For full mode, we check if image already exists in GCS
                const existingUrls = new Set<string>()
                if (mode === 'incremental') {
                    try {
                        const existing = await queryBigQuery<{ ID: string, A69_url: string, A71_url: string, A72_url: string }>(
                            `SELECT ID, A69_url, A71_url, A72_url FROM \`${projectId}.${dataset}.${BQ_TABLE}\` WHERE A69_url IS NOT NULL OR A71_url IS NOT NULL OR A72_url IS NOT NULL`,
                        )
                        for (const r of existing) {
                            if (r.A69_url) existingUrls.add(r.ID + '_A69')
                            if (r.A71_url) existingUrls.add(r.ID + '_A71')
                            if (r.A72_url) existingUrls.add(r.ID + '_A72')
                        }
                        console.log(`  📋 ${existingUrls.size} existing image URLs (skip these)`)
                    }
                    catch { /* table might not exist yet */ }
                }

                // Process images — batch to avoid overwhelming Drive API
                for (const row of allRows) {
                    for (const col of IMAGE_COLUMNS) {
                        const imgPath = row[col]
                        if (!imgPath || !imgPath.trim()) continue

                        // In incremental mode, skip if already uploaded
                        if (mode === 'incremental' && existingUrls.has(row.ID + '_' + col)) {
                            row[col + '_url'] = `${row.A7}/Furniture/${row.ID}/${col}.${imgPath.split('.').pop() || 'jpg'}`
                            continue
                        }

                        const imgFileName = imgPath.split('/').pop()
                        if (!imgFileName) continue

                        const driveFile = driveFileMap.get(imgFileName)
                        if (!driveFile) continue

                        try {
                            const downloadRes = await drive.files.get(
                                { fileId: driveFile.id, alt: 'media' },
                                { responseType: 'arraybuffer' },
                            )
                            const imgBuffer = new Uint8Array(downloadRes.data as ArrayBuffer)

                            if (imgBuffer.length > 0) {
                                const ext = imgFileName.split('.').pop() || 'jpg'
                                const contentType = driveFile.mimeType || 'image/jpeg'
                                const gcsPath = `${row.A7}/Furniture/${row.ID}/${col}.${ext}`

                                await uploadToGCS(GCS_BUCKET, gcsPath, imgBuffer, contentType)
                                row[col + '_url'] = gcsPath
                                imagesCopied++

                                if (imagesCopied % 50 === 0) {
                                    console.log(`  🖼️ ${imagesCopied} images copied...`)
                                }
                            }
                        }
                        catch {
                            // Silently skip failed image downloads
                        }
                    }
                }
                console.log(`  🖼️ Total images copied: ${imagesCopied}`)
            }
            else {
                console.warn('  ⚠️ Furniture_Images folder not found in Drive')
            }
        }

        // ─── Step 4: Upsert to BigQuery ──────────────────────────
        const tableRef = bq.dataset(dataset).table(BQ_TABLE)

        // Build schema
        const schema = COLUMNS.map(col => ({
            name: col,
            type: 'STRING' as const,
            mode: 'NULLABLE' as const,
        }))

        if (mode === 'full') {
            // Full sync: drop + recreate + insert via SQL
            console.log('  🗃️ Full sync: recreating table...')

            try { await tableRef.delete() } catch { /* doesn't exist yet */ }

            await bq.dataset(dataset).createTable(BQ_TABLE, { schema: { fields: schema } })

            // Use SQL INSERT (more reliable than streaming for new tables)
            const BATCH_SIZE = 200
            let inserted = 0

            for (let i = 0; i < allRows.length; i += BATCH_SIZE) {
                const batch = allRows.slice(i, i + BATCH_SIZE)

                // Build VALUES clause
                const valueRows = batch.map(row => {
                    const vals = COLUMNS.map(col => {
                        const v = row[col]
                        if (!v || v === '') return 'NULL'
                        // Escape single quotes
                        return `'${v.replace(/'/g, "\\'")}'`
                    })
                    return `(${vals.join(',')})`
                })

                const insertSQL = `INSERT INTO \`${projectId}.${dataset}.${BQ_TABLE}\` (${COLUMNS.join(',')}) VALUES ${valueRows.join(',')}`

                await bq.query({ query: insertSQL, location: 'US' })
                inserted += batch.length

                if (inserted % 2000 === 0 || i + BATCH_SIZE >= allRows.length) {
                    console.log(`  📥 Inserted ${inserted} / ${allRows.length} rows`)
                }
            }
        }
        else {
            // Incremental: use MERGE to only insert/update changed rows
            console.log('  🔄 Incremental sync: merging changes...')

            // Ensure table exists
            try {
                await tableRef.get()
            }
            catch {
                // Table doesn't exist, create and do full insert
                await bq.dataset(dataset).createTable(BQ_TABLE, { schema: { fields: schema } })
            }

            // Create a temp table, insert new data, then MERGE
            const tempTable = `${BQ_TABLE}_temp_${Date.now()}`

            try {
                await bq.dataset(dataset).createTable(tempTable, { schema: { fields: schema } })

                const tempRef = bq.dataset(dataset).table(tempTable)
                const BATCH_SIZE = 500

                for (let i = 0; i < allRows.length; i += BATCH_SIZE) {
                    const batch = allRows.slice(i, i + BATCH_SIZE).map(row => {
                        const bqRow: Record<string, string | null> = {}
                        for (const col of COLUMNS) {
                            bqRow[col] = row[col] || null
                        }
                        return bqRow
                    })
                    await tempRef.insert(batch, { raw: false })
                }

                // Wait for streaming buffer to be available
                await new Promise(resolve => setTimeout(resolve, 30000))

                // MERGE from temp into main
                const updateCols = COLUMNS.filter(c => c !== 'ID').map(c => `T.${c} = S.${c}`).join(', ')
                const insertCols = COLUMNS.join(', ')
                const insertVals = COLUMNS.map(c => `S.${c}`).join(', ')

                const mergeSQL = `
                    MERGE \`${projectId}.${dataset}.${BQ_TABLE}\` T
                    USING \`${projectId}.${dataset}.${tempTable}\` S
                    ON T.ID = S.ID
                    WHEN MATCHED THEN UPDATE SET ${updateCols}
                    WHEN NOT MATCHED THEN INSERT (${insertCols}) VALUES (${insertVals})
                `

                await bq.query({ query: mergeSQL, location: 'US' })
                console.log('  ✅ MERGE complete')

                // Delete rows no longer in source
                const existingIds = allRows.map(r => `'${r.ID}'`).join(',')
                // Only delete if we have a reasonable set of IDs to check
                if (allRows.length > 0) {
                    try {
                        await bq.query({
                            query: `DELETE FROM \`${projectId}.${dataset}.${BQ_TABLE}\` WHERE ID NOT IN (SELECT ID FROM \`${projectId}.${dataset}.${tempTable}\`)`,
                            location: 'US',
                        })
                        console.log('  🗑️ Stale rows removed')
                    }
                    catch { /* ignore if streaming buffer issue */ }
                }

                // Cleanup temp table
                await bq.dataset(dataset).table(tempTable).delete()
            }
            catch (e: any) {
                // Cleanup temp table on error
                try { await bq.dataset(dataset).table(tempTable).delete() } catch { }
                throw e
            }
        }

        return {
            success: true,
            message: `Furniture synced: ${allRows.length} rows across ${Object.keys(partitionCounts).length} partitions`,
            details: {
                total: allRows.length,
                imagesCopied,
                partitions: partitionCounts,
                mode,
            },
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        console.error('Furniture sync failed:', message)
        throw createError({ statusCode: 500, statusMessage: `Furniture sync failed: ${message}` })
    }
})
