/**
 * GET /api/bigquery/notes
 * Fetches notes from both `Notes` and `NotesClosed` BigQuery tables,
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
            return { success: true, count: _cache.data.length, notes: _cache.data, cached: true }
        }

        const whereClause = projectId
            ? ` WHERE \`ProjectId\` = '${projectId.replace(/'/g, "\\'")}'`
            : ''

        const [activeRows, closedRows] = await Promise.all([
            queryBigQuery(`SELECT * FROM \`appsheet-417200.SWSCRMV4.Notes\`${whereClause} ORDER BY \`Time Stamp\` DESC`),
            queryBigQuery(`SELECT * FROM \`appsheet-417200.SWSCRMV4.NotesClosed\`${whereClause} ORDER BY \`Time Stamp\` DESC`),
        ])

        // Tag each row with its source
        const active = activeRows.map((r: any) => ({ ...r, _source: 'active' }))
        const closed = closedRows.map((r: any) => ({ ...r, _source: 'closed' }))

        // Merge & sort by timestamp descending
        const merged = [...active, ...closed].sort((a: any, b: any) => {
            const ta = new Date(a['Time Stamp']?.value || a['Time Stamp'] || 0).getTime()
            const tb = new Date(b['Time Stamp']?.value || b['Time Stamp'] || 0).getTime()
            return tb - ta
        })

        // Cache unfiltered results
        if (!projectId) {
            _cache = { data: merged, timestamp: Date.now() }
        }

        return {
            success: true,
            count: merged.length,
            notes: merged,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch notes: ${message}` })
    }
})
