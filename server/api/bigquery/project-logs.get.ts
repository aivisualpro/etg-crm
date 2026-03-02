/**
 * GET /api/bigquery/project-logs?projectId=XXX
 * Fetches change logs for a specific project from BigQuery `ProjectLogs` table.
 */
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const projectId = query.projectId as string

    if (!projectId) {
        throw createError({ statusCode: 400, statusMessage: 'projectId is required' })
    }

    try {
        const sql = `SELECT * FROM \`appsheet-417200.SWSCRMV4.ProjectLogs\` WHERE \`Project ID\` = '${projectId.replace(/'/g, "\\'")}' ORDER BY \`TimeStamp\` DESC`
        const rows = await queryBigQuery(sql)

        return {
            success: true,
            count: rows.length,
            logs: rows,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch project logs: ${message}`,
        })
    }
})
