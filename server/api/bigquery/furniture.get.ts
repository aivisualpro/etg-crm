/**
 * GET /api/bigquery/furniture
 * Returns furniture data from BigQuery, optionally filtered by A7 (level1).
 * Uses pagination for large datasets.
 *
 * Query params:
 *  - a7: filter by level1 entity key (optional)
 *  - page: page number, 1-indexed (default: 1)
 *  - limit: rows per page (default: 100, max 500)
 *  - search: full-text search across key columns
 */
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const a7 = query.a7 as string || ''
        const page = Math.max(1, Number(query.page) || 1)
        const limit = Math.min(500, Math.max(10, Number(query.limit) || 100))
        const search = (query.search as string || '').trim()
        const offset = (page - 1) * limit

        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const table = `\`${projectId}.${dataset}.etgFurniture\``

        // Build WHERE clauses
        const conditions: string[] = []
        const params: Record<string, string> = {}

        if (a7) {
            conditions.push('A7 = @a7')
            params.a7 = a7
        }

        if (search) {
            conditions.push('(LOWER(ID) LIKE @search OR LOWER(A70) LIKE @search OR LOWER(A222) LIKE @search OR LOWER(A68) LIKE @search)')
            params.search = `%${search.toLowerCase()}%`
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

        // Get total count
        const countSQL = `SELECT COUNT(*) as total FROM ${table} ${whereClause}`
        const [countResult] = await useBigQuery().query({ query: countSQL, params, location: 'US' })
        const total = Number(countResult[0]?.total || 0)

        // Get paginated data
        const dataSQL = `SELECT * FROM ${table} ${whereClause} ORDER BY A7, A70 LIMIT @limit OFFSET @offset`
        const [rows] = await useBigQuery().query({
            query: dataSQL,
            params: { ...params, limit, offset },
            location: 'US',
        })

        // Get partition counts (for tab badges)
        let partitionCounts: Record<string, number> = {}
        if (!a7) {
            // Only fetch counts when showing all tabs
            const countsSQL = `SELECT A7, COUNT(*) as cnt FROM ${table} GROUP BY A7 ORDER BY cnt DESC`
            const [countRows] = await useBigQuery().query({ query: countsSQL, location: 'US' })
            for (const r of countRows) {
                partitionCounts[r.A7 as string] = Number(r.cnt)
            }
        }

        return {
            success: true,
            rows: rows as any[],
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            partitionCounts,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        // If table doesn't exist yet, return empty
        if (message.includes('Not found')) {
            return { success: true, rows: [], total: 0, page: 1, limit: 100, totalPages: 0, partitionCounts: {} }
        }
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch furniture: ${message}` })
    }
})
