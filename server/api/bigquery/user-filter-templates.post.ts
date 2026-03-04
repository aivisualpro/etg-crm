/**
 * POST /api/bigquery/user-filter-templates
 * Saves a new filter template into the user's `filter_templates` JSON column in etgusers.
 * Body: { email, name, route, filters }
 * Appends the new template (with a generated ID) to the user's existing array.
 */
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email: rawEmail, name, route, filters } = body || {}
    const email = (rawEmail || '').toLowerCase().trim()

    if (!email || !name || !route || !filters) {
        throw createError({ statusCode: 400, statusMessage: 'email, name, route, and filters are required' })
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

        // Create new template
        const newTemplate = {
            id: nanoid(10),
            name,
            route,
            filters: typeof filters === 'string' ? JSON.parse(filters) : filters,
            createdAt: new Date().toISOString(),
        }

        existing.push(newTemplate)

        // Write back
        const escaped = JSON.stringify(existing).replace(/'/g, "\\'")
        const updateSql = `UPDATE ${table} SET filter_templates = '${escaped}' WHERE LOWER(IFNULL(Email, '')) = @email`
        await bq.query({ query: updateSql, params: { email }, location: 'US' })

        return { success: true, template: newTemplate }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to save filter template: ${message}` })
    }
})
