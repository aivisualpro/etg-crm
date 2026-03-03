/**
 * GET /api/bigquery/filter-templates?route=/reports/general&userEmail=...
 * Fetches saved filter templates for a specific route and user from BigQuery.
 */
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const route = query.route as string
        const userEmail = query.userEmail as string

        if (!route || !userEmail) {
            throw createError({ statusCode: 400, statusMessage: 'route and userEmail are required' })
        }

        const escape = (v: string) => (v || '').replace(/'/g, "\\'")

        const sql = `
      SELECT id, name, route, filters, user_email, user_name, created_at, updated_at
      FROM \`flutter-5e2fd.etg_database.FilterTemplatesNew\`
      WHERE route = '${escape(route)}'
        AND (user_email = '${escape(userEmail)}' OR is_shared = TRUE)
      ORDER BY updated_at DESC
    `

        const rows = await queryBigQuery(sql)
        return { success: true, templates: rows }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch filter templates: ${message}` })
    }
})
