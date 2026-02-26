/**
 * GET /api/bigquery/notifications
 * Paginated endpoint. Supports `offset` and `limit` query params.
 * Default: offset=0, limit=200
 * Also returns `totalCount` on every request (cached separately).
 * Caches pages for 2 minutes.
 */

let _countCache: { count: number, timestamp: number } | null = null
const _pageCache = new Map<string, { data: any[], timestamp: number }>()
const CACHE_TTL = 120_000

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const offset = Math.max(Number(query.offset) || 0, 0)
    const limit = Math.min(Math.max(Number(query.limit) || 200, 1), 500)
    const cacheKey = `${offset}-${limit}`

    const bq = useBigQuery()
    const { bigquery } = useRuntimeConfig()
    const dataset = bigquery.dataset || 'SWSCRMV4'

    // ── Total count (cached) ─────────────────────────────────
    let totalCount = _countCache?.count ?? 0
    if (!_countCache || Date.now() - _countCache.timestamp > CACHE_TTL) {
        try {
            const [countRows] = await bq.query({
                query: `SELECT COUNT(*) as cnt FROM \`${dataset}.Notifications\``,
                location: 'US',
            })
            totalCount = Number(countRows[0]?.cnt ?? 0)
            _countCache = { count: totalCount, timestamp: Date.now() }
        }
        catch { /* keep old count */ }
    }

    // ── Paginated rows (cached) ──────────────────────────────
    const cached = _pageCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return { success: true, notifications: cached.data, totalCount }
    }

    try {
        const [rows] = await bq.query({
            query: `SELECT * FROM \`${dataset}.Notifications\` ORDER BY \`USA TimeStamp\` DESC LIMIT ${limit} OFFSET ${offset}`,
            location: 'US',
        })

        _pageCache.set(cacheKey, { data: rows, timestamp: Date.now() })
        return { success: true, notifications: rows, totalCount }
    }
    catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: msg })
    }
})
