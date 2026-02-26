/**
 * GET /api/bigquery/payments
 * Fetches project payments from `ProjectPayments` BigQuery table.
 * Optionally filter by `projectId` query param.
 * Caches unfiltered results for 5 minutes.
 */

let _cache: { data: any[], timestamp: number } | null = null
const CACHE_TTL = 300_000 // 5 minutes

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const projectId = (query.projectId as string || '').trim()

        // Return cached data if fresh and no filter
        if (!projectId && _cache && Date.now() - _cache.timestamp < CACHE_TTL) {
            return { success: true, count: _cache.data.length, payments: _cache.data, cached: true }
        }

        const whereClause = projectId
            ? ` WHERE \`Project ID\` = '${projectId.replace(/'/g, "\\'")}'`
            : ''

        const rows = await queryBigQuery(
            `SELECT * FROM \`appsheet-417200.SWSCRMV4.ProjectPayments\`${whereClause}`,
        )

        // Cache unfiltered results
        if (!projectId) {
            _cache = { data: rows, timestamp: Date.now() }
        }

        return {
            success: true,
            count: rows.length,
            payments: rows,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch payments: ${message}` })
    }
})
