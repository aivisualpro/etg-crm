/**
 * GET /api/bigquery/project-chats
 * Fetches chat messages for a specific project from both Chat and ChatClosed tables.
 * Requires `projectId` query param.
 * Caches per project for 5 minutes.
 */

const _cache = new Map<string, { data: any[], timestamp: number }>()
const CACHE_TTL = 300_000 // 5 minutes

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const projectId = query.projectId as string

    if (!projectId) {
        throw createError({ statusCode: 400, statusMessage: 'projectId query param is required' })
    }

    try {
        // Return cached data if fresh
        const cached = _cache.get(projectId)
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return {
                success: true,
                messages: cached.data,
                count: cached.data.length,
                cached: true,
            }
        }

        // Query both tables filtered by Project ID
        const [activeRows, closedRows] = await Promise.all([
            queryBigQuery(
                `SELECT * FROM \`appsheet-417200.SWSCRMV4.Chat\` WHERE \`Project ID\` = '${projectId.replace(/'/g, "\\'")}' ORDER BY \`TimeStamp\` ASC`,
            ),
            queryBigQuery(
                `SELECT * FROM \`appsheet-417200.SWSCRMV4.ChatClosed\` WHERE \`Project ID\` = '${projectId.replace(/'/g, "\\'")}' ORDER BY \`TimeStamp\` ASC`,
            ),
        ])

        // Tag and combine
        const messages = [
            ...activeRows.map((m: any) => ({ ...m, _source: 'active' })),
            ...closedRows.map((m: any) => ({ ...m, _source: 'closed' })),
        ].sort((a, b) => {
            const ta = new Date(a.TimeStamp?.value || a.TimeStamp || 0).getTime()
            const tb = new Date(b.TimeStamp?.value || b.TimeStamp || 0).getTime()
            return ta - tb
        })

        _cache.set(projectId, { data: messages, timestamp: Date.now() })

        return {
            success: true,
            messages,
            count: messages.length,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch project chats: ${message}` })
    }
})
