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
 *  - batch: batch size (default: 20, max: 50)
 *  - offset: starting offset (default: 0)
 */
const GCS_BUCKET = 'etg-storage'
const IMAGE_COLUMNS = ['A69', 'A71', 'A72']
const MAX_DURATION_MS = 55_000 // Stop at 55s to leave room for cleanup (Vercel 60s limit)
const INDEX_MAX_MS = 45_000   // Max time to spend indexing Drive files
const CONCURRENCY = 5          // Download/upload this many images in parallel

export default defineEventHandler(async (event) => {
    const startTime = Date.now()
    try {
        const query = getQuery(event)
        const partitionA7 = (query.partition as string) || ''
        const batchSize = Math.min(50, Math.max(5, Number(query.batch) || 20))
        const offset = Number(query.offset) || 0

        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const bq = useBigQuery()
        const fqTable = `\`${projectId}.${dataset}.etgFurniture\``

        // Step 1: Find rows that need image URLs
        const conditions: string[] = []
        const params: Record<string, any> = {}

        conditions.push(`(
            (A69 IS NOT NULL AND A69 != '' AND (A69_url IS NULL OR A69_url = ''))
            OR (A71 IS NOT NULL AND A71 != '' AND (A71_url IS NULL OR A71_url = ''))
            OR (A72 IS NOT NULL AND A72 != '' AND (A72_url IS NULL OR A72_url = ''))
        )`)

        if (partitionA7) {
            conditions.push('A7 = @partition')
            params.partition = partitionA7
        }

        const whereClause = `WHERE ${conditions.join(' AND ')}`

        // Get total count
        const [countResult] = await bq.query({
            query: `SELECT COUNT(*) as total FROM ${fqTable} ${whereClause}`,
            params,
            location: 'US',
        })
        const totalNeedingImages = Number(countResult[0]?.total || 0)

        if (totalNeedingImages === 0) {
            return { success: true, message: 'No rows need image URLs', totalNeedingImages: 0, processed: 0, imagesCopied: 0, remaining: 0 }
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
            return { success: true, message: 'No more rows at this offset', totalNeedingImages, processed: 0, imagesCopied: 0, remaining: totalNeedingImages }
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
            throw createError({ statusCode: 404, statusMessage: 'Furniture_Images folder not found in Google Drive' })
        }

        // Index ONLY the files we actually need (by looking up filenames from rows)
        // Instead of scanning 25k+ files, look up specific files by name
        const driveFileMap = new Map<string, { id: string, name: string, mimeType: string }>()

        // Collect all filenames we need to find
        const neededFiles = new Set<string>()
        for (const row of rows as Array<Record<string, string>>) {
            for (const col of IMAGE_COLUMNS) {
                const urlCol = col + '_url'
                if (row[urlCol] && row[urlCol].trim()) continue
                const imgPath = row[col]
                if (!imgPath || (!imgPath.includes('/') && !imgPath.includes('.'))) continue
                const imgFileName = imgPath.includes('/') ? (imgPath.split('/').pop() || '') : imgPath
                if (imgFileName) neededFiles.add(imgFileName)
            }
        }

        if (neededFiles.size > 0) {
            // If we need few files, search by name directly (much faster than indexing all)
            if (neededFiles.size <= 50) {
                const fileNames = Array.from(neededFiles)
                // Search in batches of 10 (Drive API) 
                for (let i = 0; i < fileNames.length; i += 10) {
                    if (Date.now() - startTime > INDEX_MAX_MS) break
                    const batch = fileNames.slice(i, i + 10)
                    const nameQuery = batch.map(n => `name = '${n.replace(/'/g, "\\'")}'`).join(' or ')
                    const searchRes = await drive.files.list({
                        q: `'${imagesFolderId}' in parents and (${nameQuery})`,
                        pageSize: 100,
                        fields: 'files(id, name, mimeType)',
                        supportsAllDrives: true,
                        includeItemsFromAllDrives: true,
                    })
                    for (const f of (searchRes.data.files || []) as Array<{ id: string, name: string, mimeType: string }>) {
                        driveFileMap.set(f.name, f)
                    }
                }
            } else {
                // Too many files needed — do a full scan like before but with index time limit
                let pageToken: string | undefined
                do {
                    if (Date.now() - startTime > INDEX_MAX_MS) break
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
            }
        }

        const indexTime = Math.round((Date.now() - startTime) / 1000)
        console.log(`  📂 ${driveFileMap.size} files indexed from Furniture_Images (needed: ${neededFiles.size}, took ${indexTime}s)`)

        // Step 3: Build list of images to process
        interface ImageJob {
            rowId: string; a7: string; a8: string; a9: string
            col: string; imgFileName: string; driveFileId: string; mimeType: string
        }
        const jobs: ImageJob[] = []

        for (const row of rows as Array<Record<string, string>>) {
            if (Date.now() - startTime > MAX_DURATION_MS) break
            const rowId = row.ID || ''
            const a7 = row.A7 || '_'
            const a8 = row.A8 || '_'
            const a9 = row.A9 || '_'

            for (const col of IMAGE_COLUMNS) {
                const urlCol = col + '_url'
                if (row[urlCol] && row[urlCol].trim()) continue

                const imgPath = row[col]
                if (!imgPath || (!imgPath.includes('/') && !imgPath.includes('.'))) continue

                const imgFileName = imgPath.includes('/') ? (imgPath.split('/').pop() || '') : imgPath
                if (!imgFileName) continue

                const driveFile = driveFileMap.get(imgFileName)
                if (!driveFile) continue

                jobs.push({ rowId, a7, a8, a9, col: urlCol, imgFileName, driveFileId: driveFile.id, mimeType: driveFile.mimeType })
            }
        }

        // Step 4: Process jobs with concurrency and time guard
        let imagesCopied = 0
        let imagesFailed = 0
        const updates: { id: string, a7: string, col: string, url: string }[] = []

        async function processJob(job: ImageJob): Promise<void> {
            try {
                const dlRes = await drive.files.get(
                    { fileId: job.driveFileId, alt: 'media' },
                    { responseType: 'arraybuffer', timeout: 15000 },
                )
                const buf = new Uint8Array(dlRes.data as ArrayBuffer)
                if (buf.length > 0) {
                    const ct = job.mimeType || 'image/jpeg'
                    const gcsPath = `furniture/${job.a7}/${job.a8}/${job.a9}/${job.imgFileName}`
                    await uploadToGCS(GCS_BUCKET, gcsPath, buf, ct)
                    updates.push({ id: job.rowId, a7: job.a7, col: job.col, url: gcsPath })
                    imagesCopied++
                }
            }
            catch (err) {
                imagesFailed++
                console.warn(`  ⚠️ Failed: ${job.imgFileName}: ${err instanceof Error ? err.message : String(err)}`)
            }
        }

        // Process in chunks of CONCURRENCY
        for (let i = 0; i < jobs.length; i += CONCURRENCY) {
            if (Date.now() - startTime > MAX_DURATION_MS) {
                console.log(`  ⏱️ Time limit reached at image ${i}/${jobs.length}`)
                break
            }
            const chunk = jobs.slice(i, i + CONCURRENCY)
            await Promise.all(chunk.map(processJob))
            if (imagesCopied % 10 === 0 && imagesCopied > 0) {
                console.log(`  🖼️ ${imagesCopied} images copied (${Math.round((Date.now() - startTime) / 1000)}s elapsed)`)
            }
        }

        // Step 5: Batch update BigQuery with URLs
        if (updates.length > 0) {
            const columnGroups: Record<string, { id: string, a7: string, url: string }[]> = {}
            for (const u of updates) {
                if (!columnGroups[u.col]) columnGroups[u.col] = []
                columnGroups[u.col]!.push({ id: u.id, a7: u.a7, url: u.url })
            }

            for (const [col, colUpdates] of Object.entries(columnGroups)) {
                const caseParts = colUpdates.map(u =>
                    `WHEN ID = '${u.id.replace(/'/g, "\\'")}' AND A7 = '${u.a7.replace(/'/g, "\\'")}' THEN '${u.url.replace(/'/g, "\\'")}'`,
                ).join('\n            ')

                const idList = colUpdates.map(u => `'${u.id.replace(/'/g, "\\'")}'`).join(',')

                try {
                    await bq.query({
                        query: `UPDATE ${fqTable} SET ${col} = CASE ${caseParts} ELSE ${col} END WHERE ID IN (${idList})`,
                        location: 'US',
                        jobTimeoutMs: 30000,
                    })
                }
                catch (err) {
                    console.error(`  ❌ Failed to update ${col}: ${err instanceof Error ? err.message : String(err)}`)
                }
            }
        }

        const remaining = totalNeedingImages - offset - (rows as any[]).length
        const elapsed = Math.round((Date.now() - startTime) / 1000)

        return {
            success: true,
            message: `Processed ${(rows as any[]).length} rows, copied ${imagesCopied} images in ${elapsed}s`,
            totalNeedingImages,
            processed: (rows as any[]).length,
            imagesCopied,
            imagesFailed,
            offset,
            remaining: Math.max(0, remaining),
            nextOffset: remaining > 0 ? offset + batchSize : null,
            elapsed: `${elapsed}s`,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        console.error('Image sync failed:', error)
        throw createError({ statusCode: 500, statusMessage: `Image sync failed: ${message}` })
    }
})
