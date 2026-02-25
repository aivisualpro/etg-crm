/**
 * GET /api/bigquery/chats
 * Fetches chat data from both `Chat` and `ChatClosed` BigQuery tables.
 * Supports date filtering via `from` and `to` query params (ISO date strings).
 * Defaults to current week if no dates provided (for performance).
 * Caches results per date range for 5 minutes.
 */

const _cache = new Map<string, { data: { active: any[], closed: any[] }, timestamp: number }>()
const CACHE_TTL = 300_000 // 5 minutes

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)

        // Default to current week (Mon–Sun)
        const now = new Date()
        const dayOfWeek = now.getDay()
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
        const monday = new Date(now)
        monday.setDate(now.getDate() + mondayOffset)
        monday.setHours(0, 0, 0, 0)
        const sunday = new Date(monday)
        sunday.setDate(monday.getDate() + 6)
        sunday.setHours(23, 59, 59, 999)

        const from = (query.from as string) || monday.toISOString().split('T')[0]!
        const to = (query.to as string) || sunday.toISOString().split('T')[0]!

        const cacheKey = `${from}_${to}`

        // Return cached data if fresh
        const cached = _cache.get(cacheKey)
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return {
                success: true,
                active: cached.data.active,
                closed: cached.data.closed,
                activeCount: cached.data.active.length,
                closedCount: cached.data.closed.length,
                from,
                to,
                cached: true,
            }
        }

        const whereClause = `WHERE \`TimeStamp\` >= TIMESTAMP('${from}') AND \`TimeStamp\` <= TIMESTAMP('${to} 23:59:59')`

        const [activeRows, closedRows] = await Promise.all([
            queryBigQuery(`SELECT * FROM \`appsheet-417200.SWSCRMV4.Chat\` ${whereClause} ORDER BY \`TimeStamp\` DESC`),
            queryBigQuery(`SELECT * FROM \`appsheet-417200.SWSCRMV4.ChatClosed\` ${whereClause} ORDER BY \`TimeStamp\` DESC`),
        ])

        _cache.set(cacheKey, { data: { active: activeRows, closed: closedRows }, timestamp: Date.now() })

        return {
            success: true,
            active: activeRows,
            closed: closedRows,
            activeCount: activeRows.length,
            closedCount: closedRows.length,
            from,
            to,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch chats: ${message}` })
    }
})
