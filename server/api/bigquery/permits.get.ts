/**
 * GET /api/bigquery/permits
 * Fetches permits from both `ProjectPermits` and `ProjectPermitsClosed` BigQuery tables,
 * merges them together with a `_source` marker.
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
            return { success: true, count: _cache.data.length, permits: _cache.data, cached: true }
        }

        const whereClause = projectId
            ? ` WHERE \`Project ID\` = '${projectId.replace(/'/g, "\\'")}'`
            : ''

        const [activeRows, closedRows] = await Promise.all([
            queryBigQuery(`SELECT * FROM \`appsheet-417200.SWSCRMV4.ProjectPermits\`${whereClause}`),
            queryBigQuery(`SELECT * FROM \`appsheet-417200.SWSCRMV4.ProjectPermitsClosed\`${whereClause}`),
        ])

        // Tag each row with its source
        const active = activeRows.map((r: any) => ({ ...r, _source: 'active' }))
        const closed = closedRows.map((r: any) => ({ ...r, _source: 'closed' }))

        // Find the timestamp key dynamically
        function getTs(row: any): number {
            const val = row['Time Stamp'] || row['TimeStamp'] || row['Timestamp'] || row['Application Date'] || 0
            const raw = val?.value || val
            return new Date(raw).getTime() || 0
        }

        // Merge & sort by timestamp descending
        const merged = [...active, ...closed].sort((a: any, b: any) => getTs(b) - getTs(a))

        // Cache unfiltered results
        if (!projectId) {
            _cache = { data: merged, timestamp: Date.now() }
        }

        return {
            success: true,
            count: merged.length,
            permits: merged,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch permits: ${message}` })
    }
})
