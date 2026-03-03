/**
 * POST /api/bigquery/sync-users
 * Syncs all users from AppSheet → BigQuery etgusers table
 */
export default defineEventHandler(async () => {
    try {
        // ─── AppSheet Config ──────────────────────────────────────
        const APPSHEET_APP_ID = 'b7510e79-c7cf-416c-9b6c-4ee4247538c5'
        const APPSHEET_ACCESS_KEY = 'V2-rG4Pb-U8Egw-OYr5C-yqEkB-qwebd-9tCNg-hZD5U-SJtJs'
        const APPSHEET_TABLE = 'Users'
        const BQ_TABLE = 'etgusers'

        // ─── Step 1: Fetch from AppSheet ──────────────────────────
        const response = await fetch(
            `https://api.appsheet.com/api/v2/apps/${APPSHEET_APP_ID}/tables/${APPSHEET_TABLE}/Action`,
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
            const text = await response.text()
            throw new Error(`AppSheet API error (${response.status}): ${text}`)
        }

        const rows = await response.json()
        if (rows.length === 0) {
            return { success: true, message: 'No users found in AppSheet', count: 0 }
        }

        // ─── Step 2: Delete existing data & re-insert ─────────────
        const bq = useBigQuery()
        const { bigquery } = useRuntimeConfig()
        const dataset = bigquery.dataset || 'etg_database'
        const projectId = bigquery.projectId || 'flutter-5e2fd'

        // Delete all existing rows
        await bq.query({
            query: `DELETE FROM \`${projectId}.${dataset}.${BQ_TABLE}\` WHERE TRUE`,
            location: 'US',
        })

        // ─── Step 3: Build safe rows ──────────────────────────────
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

        // ─── Step 4: Insert in batches ────────────────────────────
        const table = bq.dataset(dataset).table(BQ_TABLE)
        const BATCH_SIZE = 500

        for (let i = 0; i < bqRows.length; i += BATCH_SIZE) {
            const batch = bqRows.slice(i, i + BATCH_SIZE)
            await table.insert(batch, {
                skipInvalidRows: true,
                ignoreUnknownValues: true,
            })
        }

        return {
            success: true,
            message: `Synced ${bqRows.length} users from AppSheet to BigQuery`,
            count: bqRows.length,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Sync failed: ${message}` })
    }
})
