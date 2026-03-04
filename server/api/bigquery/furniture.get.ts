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
        const a8 = query.a8 as string || ''
        const a9 = query.a9 as string || ''
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

        if (a8) {
            conditions.push('A8 = @a8')
            params.a8 = a8
        }

        if (a9) {
            conditions.push('A9 = @a9')
            params.a9 = a9
        }

        const dateFilter = (query.dateFilter as string || '').trim()

        if (search) {
            conditions.push('(LOWER(ID) LIKE @search OR LOWER(A70) LIKE @search OR LOWER(A75) LIKE @search OR LOWER(A222) LIKE @search OR LOWER(A68) LIKE @search)')
            params.search = `%${search.toLowerCase()}%`
        }

        // Date filter on A213 (format: M/D/YYYY HH:mm:ss)
        if (dateFilter && dateFilter !== 'all') {
            const dateCond = buildDateCondition(dateFilter)
            if (dateCond) conditions.push(dateCond)
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

        // Build base WHERE without date filter for date counts
        const baseConds = conditions.filter(c => !c.includes('PARSE_TIMESTAMP'))
        const baseWhere = baseConds.length > 0 ? `WHERE ${baseConds.join(' AND ')}` : ''

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
            const countsSQL = `SELECT A7, COUNT(*) as cnt FROM ${table} GROUP BY A7 ORDER BY cnt DESC`
            const [countRows] = await useBigQuery().query({ query: countsSQL, location: 'US' })
            for (const r of countRows) {
                partitionCounts[r.A7 as string] = Number(r.cnt)
            }
        }

        // Date counts — count rows per date range in a single query
        let dateCounts: Record<string, number> = {}
        try {
            const dateCountSQL = `
                WITH parsed AS (
                    SELECT SAFE.PARSE_TIMESTAMP('%m/%d/%Y %H:%M:%S', A213) AS ts
                    FROM ${table} ${baseWhere}
                )
                SELECT
                    COUNT(*) as total,
                    COUNTIF(ts >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY)) as today,
                    COUNTIF(ts >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), ISOWEEK)) as week,
                    COUNTIF(ts >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), MONTH)) as month,
                    COUNTIF(CAST(ts AS DATE) >= DATE_TRUNC(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH), MONTH)
                        AND CAST(ts AS DATE) < DATE_TRUNC(CURRENT_DATE(), MONTH)) as lastMonth,
                    COUNTIF(ts >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), YEAR)) as year
                FROM parsed
            `
            const [dcResult] = await useBigQuery().query({ query: dateCountSQL, params, location: 'US' })
            if (dcResult?.[0]) {
                const r = dcResult[0]
                dateCounts = {
                    all: Number(r.total || 0),
                    today: Number(r.today || 0),
                    week: Number(r.week || 0),
                    month: Number(r.month || 0),
                    lastMonth: Number(r.lastMonth || 0),
                    year: Number(r.year || 0),
                }
            }
        }
        catch (e) {
            console.error('Date counts query failed:', e instanceof Error ? e.message : e)
        }

        return {
            success: true,
            rows: rows as any[],
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            partitionCounts,
            dateCounts,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        if (message.includes('Not found')) {
            return { success: true, rows: [], total: 0, page: 1, limit: 100, totalPages: 0, partitionCounts: {}, dateCounts: {} }
        }
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch furniture: ${message}` })
    }
})

/**
 * Build a date filter condition for A213 (timestamp string in M/D/YYYY HH:mm:ss format)
 */
function buildDateCondition(filter: string): string | null {
    const ts = `SAFE.PARSE_TIMESTAMP('%m/%d/%Y %H:%M:%S', A213)`
    switch (filter) {
        case 'today':
            return `${ts} >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY)`
        case 'week':
            return `${ts} >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), ISOWEEK)`
        case 'month':
            return `${ts} >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), MONTH)`
        case 'lastMonth':
            return `CAST(${ts} AS DATE) >= DATE_TRUNC(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH), MONTH) AND CAST(${ts} AS DATE) < DATE_TRUNC(CURRENT_DATE(), MONTH)`
        case 'year':
            return `${ts} >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), YEAR)`
        default:
            return null
    }
}
