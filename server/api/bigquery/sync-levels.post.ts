/**
 * POST /api/bigquery/sync-levels
 * Syncs level1, level2, level3 from AppSheet → BigQuery
 * Also uploads level1 logo images to Cloud Storage
 */
export default defineEventHandler(async () => {
    try {
        const APPSHEET_APP_ID = 'b7510e79-c7cf-416c-9b6c-4ee4247538c5'
        const APPSHEET_ACCESS_KEY = 'V2-rG4Pb-U8Egw-OYr5C-yqEkB-qwebd-9tCNg-hZD5U-SJtJs'
        const GCS_BUCKET = 'etg-crm-assets'

        const bq = useBigQuery()
        const { bigquery } = useRuntimeConfig()
        const dataset = bigquery.dataset || 'etg_database'
        const projectId = bigquery.projectId || 'flutter-5e2fd'

        // Ensure GCS bucket exists
        try {
            await ensureBucketExists(GCS_BUCKET)
        }
        catch (e: any) {
            console.warn('GCS bucket setup warning:', e.message)
        }

        const tables = [
            { appsheet: 'level1', bqTable: 'etgLevel1', hasLogo: true },
            { appsheet: 'level2', bqTable: 'etgLevel2', hasLogo: false },
            { appsheet: 'level3', bqTable: 'etgLevel3', hasLogo: false },
        ]

        const results: Record<string, number> = {}

        for (const { appsheet, bqTable, hasLogo } of tables) {
            // Fetch from AppSheet
            const response = await fetch(
                `https://api.appsheet.com/api/v2/apps/${APPSHEET_APP_ID}/tables/${appsheet}/Action`,
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
                results[bqTable] = 0
                continue
            }

            // Upload logo images for level1
            if (hasLogo) {
                for (const row of rows) {
                    if (row.logo && typeof row.logo === 'string' && row.logo.trim()) {
                        try {
                            // Download image from AppSheet using v2 File API
                            const fileName = row.logo
                            const imageUrl = `https://api.appsheet.com/api/v2/apps/${APPSHEET_APP_ID}/tables/${appsheet}/column/logo/file/${encodeURIComponent(fileName)}`
                            const controller = new AbortController()
                            const timeout = setTimeout(() => controller.abort(), 10_000)

                            const imgResponse = await fetch(imageUrl, {
                                headers: { 'ApplicationAccessKey': APPSHEET_ACCESS_KEY },
                                signal: controller.signal,
                            })
                            clearTimeout(timeout)

                            if (imgResponse.ok) {
                                const imgBuffer = new Uint8Array(await imgResponse.arrayBuffer())
                                if (imgBuffer.length > 0) {
                                    const ext = fileName.split('.').pop() || 'png'
                                    const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`
                                    const gcsPath = `logos/${bqTable}/${row.A7 || row._RowNumber}.${ext}`

                                    const publicUrl = await uploadToGCS(GCS_BUCKET, gcsPath, imgBuffer, contentType)
                                    row.logo_url = publicUrl
                                    console.log(`  ✅ Logo uploaded: ${row.eng} → ${publicUrl}`)
                                }
                            }
                            else {
                                console.warn(`  ⚠️ AppSheet returned ${imgResponse.status} for ${row.eng} logo`)
                            }
                        }
                        catch (e: any) {
                            console.warn(`  ⚠️ Logo upload failed for ${row.eng || row.A7}:`, e.message)
                        }
                    }
                }
            }

            // Build safe rows & schema
            const allKeys = new Set<string>()
            for (const row of rows) {
                for (const key of Object.keys(row)) allKeys.add(key)
            }
            if (hasLogo) allKeys.add('logo_url')

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

            // Drop and recreate table (avoids streaming buffer conflict)
            const dsRef = bq.dataset(dataset)
            const tableRef = dsRef.table(bqTable)
            const [exists] = await tableRef.exists()
            if (exists) await tableRef.delete()
            await dsRef.createTable(bqTable, { schema: { fields: schema }, location: 'US' })

            // Insert in batches
            const freshTable = dsRef.table(bqTable)
            const BATCH_SIZE = 500
            for (let i = 0; i < bqRows.length; i += BATCH_SIZE) {
                await freshTable.insert(bqRows.slice(i, i + BATCH_SIZE), {
                    skipInvalidRows: true,
                    ignoreUnknownValues: true,
                })
            }

            results[bqTable] = bqRows.length
        }

        const total = Object.values(results).reduce((a, b) => a + b, 0)
        return {
            success: true,
            message: `Synced ${total} rows across 3 level tables`,
            details: results,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Sync levels failed: ${message}` })
    }
})
