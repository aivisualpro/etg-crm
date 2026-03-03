/**
 * POST /api/bigquery/sync-furniture-images
 *
 * Syncs furniture images from Google Drive → GCS (Cloud Storage)
 * and updates BigQuery records with proper GCS URLs.
 *
 * Process:
 * 1. Reads rows from BigQuery that have image paths but no _url
 * 2. Downloads images from Google Drive Furniture_Images folder
 * 3. Uploads to GCS at: furniture/{A7}/{A8}/{A9}/{filename}
 * 4. Updates BigQuery rows with the GCS URL
 *
 * Query params:
 *  - partition: A7 value to process (optional, processes all if not specified)
 *  - batch: batch size (default: 100)
 *  - offset: starting offset (default: 0)
 */
const GCS_BUCKET = 'etg-storage'
const IMAGE_COLUMNS = ['A69', 'A71', 'A72']

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const partitionA7 = (query.partition as string) || ''
        const batchSize = Math.min(500, Math.max(10, Number(query.batch) || 100))
        const offset = Number(query.offset) || 0

        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const bq = useBigQuery()
        const fqTable = `\`${projectId}.${dataset}.etgFurniture\``

        // Step 1: Find rows that need image URLs
        const conditions: string[] = []
        const params: Record<string, any> = {}

        // Only rows that have image values but no GCS URL yet
        conditions.push(`(
            (A69 IS NOT NULL AND A69 != '' AND (A69_url IS NULL OR A69_url = ''))
            OR (A71 IS NOT NULL AND A71 != '' AND (A71_url IS NULL OR A71_url = ''))
            OR (A72 IS NOT NULL AND A72 != '' AND (A72_url IS NULL OR A72_url = ''))
        )`)

        if (partitionA7) {
            conditions.push('A7 = @partition')
            params.partition = partitionA7
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

        // Get total count of rows needing images
        const [countResult] = await bq.query({
            query: `SELECT COUNT(*) as total FROM ${fqTable} ${whereClause}`,
            params,
            location: 'US',
        })
        const totalNeedingImages = Number(countResult[0]?.total || 0)

        if (totalNeedingImages === 0) {
            return {
                success: true,
                message: 'No rows need image URLs',
                totalNeedingImages: 0,
                processed: 0,
                imagesCopied: 0,
                remaining: 0,
            }
        }

        // Get batch of rows
        const [rows] = await bq.query({
            query: `SELECT ID, A7, A8, A9, A69, A71, A72, A69_url, A71_url, A72_url 
                    FROM ${fqTable} ${whereClause}
                    ORDER BY A7, ID
                    LIMIT @batchSize OFFSET @offset`,
            params: { ...params, batchSize, offset },
            location: 'US',
        })

        if (!rows.length) {
            return {
                success: true,
                message: 'No more rows to process at this offset',
                totalNeedingImages,
                processed: 0,
                imagesCopied: 0,
                remaining: totalNeedingImages,
            }
        }

        // Step 2: Get Google Drive access
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

        if (!imagesFolderId) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Furniture_Images folder not found in Google Drive',
            })
        }

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

        // Step 3: Process each row — download from Drive, upload to GCS, collect updates
        let imagesCopied = 0
        let rowsProcessed = 0
        const updates: { id: string, a7: string, col: string, url: string }[] = []

        for (const row of rows as Array<Record<string, string>>) {
            const rowId = row.ID || ''
            const a7 = row.A7 || '_'
            const a8 = row.A8 || '_'
            const a9 = row.A9 || '_'

            for (const col of IMAGE_COLUMNS) {
                const urlCol = col + '_url'
                // Skip if already has URL
                if (row[urlCol] && row[urlCol].trim()) continue

                const imgPath = row[col]
                if (!imgPath || (!imgPath.includes('/') && !imgPath.includes('.'))) continue

                // Extract filename from path (could be "folder/filename.jpg" or just "filename.jpg")
                const imgFileName = imgPath.includes('/') ? (imgPath.split('/').pop() || '') : imgPath
                if (!imgFileName) continue

                // Try to find in Drive
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
                        // GCS path: furniture/A7/A8/A9/filename
                        const gcsPath = `furniture/${a7}/${a8}/${a9}/${imgFileName}`
                        await uploadToGCS(GCS_BUCKET, gcsPath, buf, ct)
                        updates.push({ id: rowId, a7, col: urlCol, url: gcsPath })
                        imagesCopied++
                        if (imagesCopied % 50 === 0) console.log(`  🖼️ ${imagesCopied} images copied...`)
                    }
                }
                catch (err) {
                    // Skip failed downloads
                    console.warn(`  ⚠️ Failed to download ${imgFileName}: ${err instanceof Error ? err.message : String(err)}`)
                }
            }
            rowsProcessed++
        }

        // Step 4: Batch update BigQuery with URLs – use DML UPDATE
        if (updates.length > 0) {
            // Group updates by column for more efficient SQL
            const columnGroups: Record<string, { id: string, a7: string, url: string }[]> = {}
            for (const u of updates) {
                if (!columnGroups[u.col]) columnGroups[u.col] = []
                columnGroups[u.col]!.push({ id: u.id, a7: u.a7, url: u.url })
            }

            for (const [col, colUpdates] of Object.entries(columnGroups)) {
                // Build a CASE statement for bulk update
                const caseParts = colUpdates.map(u =>
                    `WHEN ID = '${u.id.replace(/'/g, "\\'")}' AND A7 = '${u.a7.replace(/'/g, "\\'")}' THEN '${u.url.replace(/'/g, "\\'")}'`,
                ).join('\n            ')

                const idList = colUpdates.map(u =>
                    `'${u.id.replace(/'/g, "\\'")}'`,
                ).join(',')

                try {
                    await bq.query({
                        query: `
                            UPDATE ${fqTable}
                            SET ${col} = CASE
                                ${caseParts}
                                ELSE ${col}
                            END
                            WHERE ID IN (${idList})
                        `,
                        location: 'US',
                        jobTimeoutMs: 120000,
                    })
                }
                catch (err) {
                    console.error(`  ❌ Failed to update ${col}: ${err instanceof Error ? err.message : String(err)}`)
                }
            }
        }

        const remaining = totalNeedingImages - offset - rowsProcessed

        return {
            success: true,
            message: `Processed ${rowsProcessed} rows, copied ${imagesCopied} images`,
            totalNeedingImages,
            processed: rowsProcessed,
            imagesCopied,
            offset,
            remaining: Math.max(0, remaining),
            nextOffset: remaining > 0 ? offset + batchSize : null,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        console.error('Image sync failed:', error)
        throw createError({ statusCode: 500, statusMessage: `Image sync failed: ${message}` })
    }
})
