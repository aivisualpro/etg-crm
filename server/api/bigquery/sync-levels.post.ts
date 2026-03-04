/**
 * POST /api/bigquery/sync-levels
 * Syncs level1, level2, level3 from AppSheet → BigQuery
 * Drops & recreates tables, then INSERTs fresh data (avoids streaming buffer issues)
 * Copies level1 logo images from Google Drive → GCS
 */
export default defineEventHandler(async () => {
    try {
        const APPSHEET_APP_ID = 'b7510e79-c7cf-416c-9b6c-4ee4247538c5'
        const APPSHEET_ACCESS_KEY = 'V2-rG4Pb-U8Egw-OYr5C-yqEkB-qwebd-9tCNg-hZD5U-SJtJs'
        const GCS_BUCKET = 'etg-storage'

        const bq = useBigQuery()
        const { bigquery } = useRuntimeConfig()
        const dataset = bigquery.dataset || 'etg_database'
        const projectId = bigquery.projectId || 'flutter-5e2fd'

        // Each table with its AppSheet key column
        // imageColumn: AppSheet column containing file paths (e.g. 'logo', 'Image')
        // imageDriveFolder: folder name in Google Drive that holds the images
        // excludeColumns: virtual/computed AppSheet columns to skip
        const tables = [
            { appsheet: 'level1', bqTable: 'etgLevel1', keyColumn: 'A7', imageColumn: 'logo', imageDriveFolder: 'level1_Images', excludeColumns: [] as string[] },
            { appsheet: 'level2', bqTable: 'etgLevel2', keyColumn: 'A8', imageColumn: '', imageDriveFolder: '', excludeColumns: [] as string[] },
            { appsheet: 'level3', bqTable: 'etgLevel3', keyColumn: 'A9', imageColumn: '', imageDriveFolder: '', excludeColumns: [] as string[] },
            { appsheet: 'Asset Category', bqTable: 'etgAssetCategory', keyColumn: 'A51', imageColumn: '', imageDriveFolder: '', excludeColumns: ['Label', 'Related SubCategories'] },
            { appsheet: 'SubCategories', bqTable: 'etgSubCategories', keyColumn: 'A66', imageColumn: 'Image', imageDriveFolder: 'SubCategories_Images', excludeColumns: ['_RowNumber', 'Label', 'Related Equipments', 'Related Vehicles', 'Related Furnitures'] },
            { appsheet: 'Asset Description', bqTable: 'etgAssetDescription', keyColumn: 'A67', imageColumn: 'Image', imageDriveFolder: 'Asset Description_Images', excludeColumns: ['_RowNumber', 'Label', 'Related Equipments', 'Related Vehicles', 'Related Furnitures'] },
        ]

        const results: Record<string, { total: number, created: number, updated: number, deleted: number }> = {}

        for (const { appsheet, bqTable, keyColumn, imageColumn, imageDriveFolder, excludeColumns } of tables) {
            // ─── Step 1: Fetch from AppSheet ─────────────────────────
            const response = await fetch(
                `https://api.appsheet.com/api/v2/apps/${APPSHEET_APP_ID}/tables/${encodeURIComponent(appsheet)}/Action`,
                {
                    method: 'POST',
                    headers: {
                        'ApplicationAccessKey': APPSHEET_ACCESS_KEY,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Action: 'Find',
                        Properties: { Locale: 'en-US', Timezone: 'UTC' },
                        Rows: [],
                    }),
                },
            )

            if (!response.ok) {
                throw new Error(`AppSheet error for ${appsheet}: ${response.status}`)
            }

            const rows = await response.json()
            if (rows.length === 0) {
                results[bqTable] = { total: 0, created: 0, updated: 0, deleted: 0 }
                continue
            }

            // ─── Step 2: Copy images from Google Drive → GCS ─────────
            if (imageColumn && imageDriveFolder) {
                const drive = useDrive()
                const { uploadToGCS } = await import('../../utils/gcs')

                const ETG_FOLDER_ID = '11VajRLFO1YtFjalXkYnzJ8F75gZ1hdHJ'
                const folderRes = await drive.files.list({
                    q: `'${ETG_FOLDER_ID}' in parents and name = '${imageDriveFolder}' and mimeType = 'application/vnd.google-apps.folder'`,
                    fields: 'files(id)',
                    supportsAllDrives: true,
                    includeItemsFromAllDrives: true,
                })
                const imagesFolderId = folderRes.data.files?.[0]?.id
                if (!imagesFolderId) {
                    console.warn(`  ⚠️ ${imageDriveFolder} folder not found in Drive`)
                }

                // Index ALL files in the images folder (top-level + subfolders)
                const driveFileMap = new Map<string, { id: string, name: string, mimeType: string }>()
                const subfolderMap = new Map<string, string>() // subfolder name → subfolder id

                if (imagesFolderId) {
                    // Get top-level items (files + folders)
                    const topRes = await drive.files.list({
                        q: `'${imagesFolderId}' in parents`,
                        pageSize: 1000,
                        fields: 'files(id, name, mimeType)',
                        supportsAllDrives: true,
                        includeItemsFromAllDrives: true,
                    })
                    const topItems = (topRes.data.files || []) as Array<{ id: string, name: string, mimeType: string }>

                    for (const item of topItems) {
                        if (item.mimeType === 'application/vnd.google-apps.folder') {
                            // Track subfolders (may be named by entity ID like A7 value)
                            subfolderMap.set(item.name.toLowerCase(), item.id)
                        }
                        else {
                            driveFileMap.set(item.name, item)
                            // Also index by name without extension for flexible matching
                            const nameNoExt = item.name.replace(/\.[^.]+$/, '')
                            if (!driveFileMap.has(nameNoExt)) {
                                driveFileMap.set(`__noext__${nameNoExt.toLowerCase()}`, item)
                            }
                        }
                    }

                    // Index files inside subfolders (AppSheet often stores images in entity-named subfolders)
                    for (const [subName, subId] of subfolderMap) {
                        const subRes = await drive.files.list({
                            q: `'${subId}' in parents`,
                            pageSize: 100,
                            fields: 'files(id, name, mimeType)',
                            supportsAllDrives: true,
                            includeItemsFromAllDrives: true,
                        })
                        for (const f of (subRes.data.files || []) as Array<{ id: string, name: string, mimeType: string }>) {
                            if (f.mimeType !== 'application/vnd.google-apps.folder') {
                                // Index as "subfolder/filename" for path-based matching
                                driveFileMap.set(`${subName}/${f.name.toLowerCase()}`, f)
                                // Also index as just the subfolder key (for matching by entity ID)
                                if (!driveFileMap.has(`__sub__${subName}`)) {
                                    driveFileMap.set(`__sub__${subName}`, f)
                                }
                            }
                        }
                    }

                    console.log(`  📂 Indexed ${driveFileMap.size} files (+ ${subfolderMap.size} subfolders) in ${imageDriveFolder}`)
                }

                for (const row of rows) {
                    const imgPath = row[imageColumn]
                    const entityId = row[keyColumn]
                    if (!entityId) continue

                    // Strategy 1: Match by the exact filename from the logo/image column
                    let driveFile: { id: string, name: string, mimeType: string } | undefined
                    if (imgPath && typeof imgPath === 'string' && imgPath.trim()) {
                        const imgFileName = imgPath.split('/').pop() || ''
                        if (imgFileName) {
                            // Try exact match
                            driveFile = driveFileMap.get(imgFileName)
                            // Try path-based match (subfolder/filename)
                            if (!driveFile) {
                                const pathParts = imgPath.split('/')
                                if (pathParts.length >= 2) {
                                    const subPath = pathParts.slice(-2).join('/').toLowerCase()
                                    driveFile = driveFileMap.get(subPath)
                                }
                            }
                        }
                    }

                    // Strategy 2: Match by entity key ID as filename (e.g. "A7_value.png")
                    if (!driveFile && entityId) {
                        driveFile = driveFileMap.get(`__noext__${entityId.toLowerCase()}`)
                    }

                    // Strategy 3: Look for a subfolder named after the entity ID
                    if (!driveFile && entityId) {
                        driveFile = driveFileMap.get(`__sub__${entityId.toLowerCase()}`)
                    }

                    if (!driveFile) {
                        if (imgPath) {
                            console.warn(`  ⚠️ Image not found in Drive: ${imgPath} (entity: ${row.eng || entityId})`)
                        }
                        continue
                    }

                    try {
                        const downloadRes = await drive.files.get(
                            { fileId: driveFile.id, alt: 'media' },
                            { responseType: 'arraybuffer' },
                        )
                        const imgBuffer = new Uint8Array(downloadRes.data as ArrayBuffer)

                        if (imgBuffer.length > 0) {
                            const ext = (driveFile.name.split('.').pop() || 'png').toLowerCase()
                            const contentType = driveFile.mimeType || (ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`)
                            const gcsPath = `images/${bqTable}/${entityId}/image.${ext}`

                            await uploadToGCS(GCS_BUCKET, gcsPath, imgBuffer, contentType)
                            row.image_url = gcsPath
                            console.log(`  ✅ Image: ${row.eng || entityId} → ${gcsPath} (from: ${driveFile.name})`)
                        }
                    }
                    catch (e: any) {
                        console.warn(`  ⚠️ Image copy failed for ${row.eng || entityId}: ${e.message}`)
                    }
                }
            }

            // ─── Step 3: Build safe column names & rows ─────────────
            const allKeys = new Set<string>()
            for (const row of rows) {
                for (const key of Object.keys(row)) allKeys.add(key)
            }
            if (imageColumn) allKeys.add('image_url')
            // Remove virtual/excluded columns
            for (const col of excludeColumns) {
                allKeys.delete(col)
            }

            // Sanitize column names (BQ-safe)
            const columnMap: Record<string, string> = {}
            for (const key of allKeys) {
                columnMap[key] = key.replace(/[^a-zA-Z0-9_]/g, '_')
            }

            const schema = [...allKeys].map(name => ({
                name: columnMap[name],
                type: 'STRING' as const,
                mode: 'NULLABLE' as const,
            }))

            const bqRows = rows.map((row: Record<string, unknown>) => {
                const cleaned: Record<string, string | null> = {}
                for (const [key, value] of Object.entries(row)) {
                    const safeKey = columnMap[key]
                    if (value === null || value === undefined) cleaned[safeKey] = null
                    else if (typeof value === 'object') cleaned[safeKey] = JSON.stringify(value)
                    else cleaned[safeKey] = String(value)
                }
                return cleaned
            })

            const safeKeyColumn = columnMap[keyColumn]
            const columns = [...allKeys].map(k => columnMap[k])

            // ─── Step 4: Drop & recreate table (avoids streaming buffer issues) ─
            const dsRef = bq.dataset(dataset)
            const tableRef = dsRef.table(bqTable)
            const [exists] = await tableRef.exists()
            if (exists) {
                await tableRef.delete()
                console.log(`  🗑️ Dropped existing table ${bqTable}`)
            }
            await dsRef.createTable(bqTable, { schema: { fields: schema }, location: 'US' })
            await new Promise(resolve => setTimeout(resolve, 3000))
            console.log(`  📋 Created table ${bqTable}`)

            // ─── Step 5: INSERT data in batches via SQL ──────────────
            const INSERT_BATCH = 150
            for (let i = 0; i < bqRows.length; i += INSERT_BATCH) {
                const batch = bqRows.slice(i, i + INSERT_BATCH)

                const insertCols = columns.map(c => `\`${c}\``).join(', ')
                const valueRows = batch.map((row: Record<string, string | null>) => {
                    const vals = columns.map(col => escapeSqlValue(row[col] ?? null))
                    return `(${vals.join(', ')})`
                }).join(',\n      ')

                const insertSQL = `
                    INSERT INTO \`${projectId}.${dataset}.${bqTable}\` (${insertCols})
                    VALUES ${valueRows}
                `

                await bq.query({ query: insertSQL, location: 'US' })
            }

            results[bqTable] = {
                total: bqRows.length,
                created: bqRows.length,
                updated: 0,
                deleted: 0,
            }
            console.log(`  ✅ ${bqTable}: inserted ${bqRows.length} rows`)
        }

        const total = Object.values(results).reduce((a, b) => a + b.total, 0)
        return {
            success: true,
            message: `Synced ${total} rows across ${Object.keys(results).length} tables`,
            details: results,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Sync levels failed: ${message}` })
    }
})

/**
 * Escape a value for use in a BigQuery SQL string literal.
 * Returns NULL for null/undefined, otherwise a properly quoted string.
 */
function escapeSqlValue(val: string | null | undefined): string {
    if (val === null || val === undefined) return 'CAST(NULL AS STRING)'
    // BigQuery uses backslash escaping (not doubled quotes)
    const escaped = val
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
    return `'${escaped}'`
}
