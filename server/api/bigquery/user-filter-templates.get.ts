/**
 * GET /api/bigquery/user-filter-templates?email=...&route=...
 * Fetches saved filter templates from the user's `filter_templates` JSON column in etgusers.
 * Returns an array of { id, name, route, filters } objects.
 */
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const email = (query.email as string || '').toLowerCase().trim()
    const route = query.route as string || ''

    if (!email) {
        throw createError({ statusCode: 400, statusMessage: 'email is required' })
    }

    try {
        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const table = `\`${projectId}.${dataset}.etgusers\``
        const bq = useBigQuery()

        // Ensure column exists
        try {
            await bq.query({ query: `SELECT filter_templates FROM ${table} LIMIT 1`, location: 'US' })
        }
        catch (e: any) {
            if (e.message?.includes('Unrecognized name') || e.message?.includes('not found')) {
                await bq.query({ query: `ALTER TABLE ${table} ADD COLUMN filter_templates STRING`, location: 'US' })
            }
        }

        // Fetch the JSON string
        const sql = `SELECT filter_templates FROM ${table} WHERE LOWER(IFNULL(Email, '')) = @email LIMIT 1`
        const rows = await queryBigQuery<{ filter_templates: string | null }>(sql, { email })

        if (!rows.length || !rows[0]!.filter_templates) {
            return { success: true, templates: [] }
        }

        let allTemplates: any[] = []
        try {
            allTemplates = JSON.parse(rows[0]!.filter_templates)
            if (!Array.isArray(allTemplates)) allTemplates = []
        }
        catch { allTemplates = [] }

        // Filter by route if provided
        const templates = route
            ? allTemplates.filter((t: any) => t.route === route)
            : allTemplates

        return { success: true, templates }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch filter templates: ${message}` })
    }
})
