/**
 * GET /api/bigquery/chats
 * Fetches chat data from both `Chat` and `ChatClosed` BigQuery tables.
 * Combines active and closed chats into a single response.
 * Caches results for 5 minutes.
 */

let _cache: { data: { active: any[], closed: any[] }, timestamp: number } | null = null
const CACHE_TTL = 300_000 // 5 minutes

export default defineEventHandler(async () => {
    try {
        // Return cached data if fresh
        if (_cache && Date.now() - _cache.timestamp < CACHE_TTL) {
            return {
                success: true,
                active: _cache.data.active,
                closed: _cache.data.closed,
                activeCount: _cache.data.active.length,
                closedCount: _cache.data.closed.length,
                cached: true,
            }
        }

        const [activeRows, closedRows] = await Promise.all([
            queryBigQuery('SELECT * FROM `appsheet-417200.SWSCRMV4.Chat` ORDER BY `TimeStamp` DESC'),
            queryBigQuery('SELECT * FROM `appsheet-417200.SWSCRMV4.ChatClosed` ORDER BY `TimeStamp` DESC'),
        ])

        _cache = { data: { active: activeRows, closed: closedRows }, timestamp: Date.now() }

        return {
            success: true,
            active: activeRows,
            closed: closedRows,
            activeCount: activeRows.length,
            closedCount: closedRows.length,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch chats: ${message}` })
    }
})
