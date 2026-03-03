/**
 * GET /api/bigquery/project-log-counts
 * Returns { projectId: count } for all projects that have logs.
 * This avoids making individual API calls per project.
 */

let _cache: { data: Record<string, number>, timestamp: number } | null = null
const CACHE_TTL = 300_000 // 5 min

export default defineEventHandler(async () => {
    try {
        if (_cache && Date.now() - _cache.timestamp < CACHE_TTL) {
            return { success: true, counts: _cache.data, cached: true }
        }

        const sql = `SELECT \`Project ID\`, COUNT(*) as cnt FROM \`flutter-5e2fd.etg_database.ProjectLogs\` GROUP BY \`Project ID\``
        const rows = await queryBigQuery(sql)

        const counts: Record<string, number> = {}
        for (const row of rows) {
            const id = String(row['Project ID'] || '')
            const cnt = Number(row.cnt) || 0
            if (id && cnt > 0) counts[id] = cnt
        }

        _cache = { data: counts, timestamp: Date.now() }

        return { success: true, counts }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch log counts: ${message}`,
        })
    }
})
