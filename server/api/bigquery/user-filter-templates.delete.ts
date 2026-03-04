/**
 * DELETE /api/bigquery/user-filter-templates
 * Removes a filter template by ID from the user's `filter_templates` JSON column in etgusers.
 * Body: { email, id }
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email: rawEmail, id } = body || {}
    const email = (rawEmail || '').toLowerCase().trim()

    if (!email || !id) {
        throw createError({ statusCode: 400, statusMessage: 'email and id are required' })
    }

    try {
        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const table = `\`${projectId}.${dataset}.etgusers\``
        const bq = useBigQuery()

        // Read current templates
        const sql = `SELECT filter_templates FROM ${table} WHERE LOWER(IFNULL(Email, '')) = @email LIMIT 1`
        const rows = await queryBigQuery<{ filter_templates: string | null }>(sql, { email })

        let existing: any[] = []
        if (rows.length && rows[0]!.filter_templates) {
            try {
                existing = JSON.parse(rows[0]!.filter_templates)
                if (!Array.isArray(existing)) existing = []
            }
            catch { existing = [] }
        }

        // Remove the template with matching ID
        const before = existing.length
        existing = existing.filter((t: any) => t.id !== id)

        if (existing.length === before) {
            return { success: false, message: 'Template not found' }
        }

        // Write back
        const escaped = JSON.stringify(existing).replace(/'/g, "\\'")
        const updateSql = `UPDATE ${table} SET filter_templates = '${escaped}' WHERE LOWER(IFNULL(Email, '')) = @email`
        await bq.query({ query: updateSql, params: { email }, location: 'US' })

        return { success: true, message: 'Template deleted' }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to delete filter template: ${message}` })
    }
})
