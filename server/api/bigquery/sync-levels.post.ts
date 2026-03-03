/**
 * POST /api/bigquery/sync-levels
 * Syncs level1, level2, level3 from AppSheet → BigQuery
 */
export default defineEventHandler(async () => {
    try {
        const APPSHEET_APP_ID = 'b7510e79-c7cf-416c-9b6c-4ee4247538c5'
        const APPSHEET_ACCESS_KEY = 'V2-rG4Pb-U8Egw-OYr5C-yqEkB-qwebd-9tCNg-hZD5U-SJtJs'

        const bq = useBigQuery()
        const { bigquery } = useRuntimeConfig()
        const dataset = bigquery.dataset || 'etg_database'
        const projectId = bigquery.projectId || 'flutter-5e2fd'

        const tables = [
            { appsheet: 'level1', bqTable: 'etgLevel1' },
            { appsheet: 'level2', bqTable: 'etgLevel2' },
            { appsheet: 'level3', bqTable: 'etgLevel3' },
        ]

        const results: Record<string, number> = {}

        for (const { appsheet, bqTable } of tables) {
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

            // Delete existing data
            await bq.query({
                query: `DELETE FROM \`${projectId}.${dataset}.${bqTable}\` WHERE TRUE`,
                location: 'US',
            })

            // Build safe rows
            const allKeys = new Set<string>()
            for (const row of rows) {
                for (const key of Object.keys(row)) allKeys.add(key)
            }
            const columnMap: Record<string, string> = {}
            for (const key of allKeys) {
                columnMap[key] = key.replace(/[^a-zA-Z0-9_]/g, '_')
            }

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

            // Insert in batches
            const table = bq.dataset(dataset).table(bqTable)
            const BATCH_SIZE = 500
            for (let i = 0; i < bqRows.length; i += BATCH_SIZE) {
                await table.insert(bqRows.slice(i, i + BATCH_SIZE), {
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
