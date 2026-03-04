/**
 * POST /api/bigquery/users/update
 * Updates a single user row in etgusers table (only allowed fields).
 * Body: { key: string, field: string, value: string }
 *   - key: the user's A2 value (name) which is the unique key
 *   - field: the column to update (only 'email' allowed for now)
 *   - value: the new value
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { key, field, value } = body || {}

    if (!key || !field) {
        throw createError({ statusCode: 400, statusMessage: 'Missing key or field' })
    }

    // Whitelist of editable fields
    const ALLOWED_FIELDS = ['email']
    if (!ALLOWED_FIELDS.includes(field)) {
        throw createError({ statusCode: 400, statusMessage: `Field '${field}' is not editable` })
    }

    try {
        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const table = `\`${projectId}.${dataset}.etgusers\``

        // Check if email column exists, if not add it
        const bq = useBigQuery()
        try {
            const checkSQL = `SELECT email FROM ${table} LIMIT 1`
            await bq.query({ query: checkSQL, location: 'US' })
        }
        catch (e: any) {
            if (e.message?.includes('Unrecognized name') || e.message?.includes('not found')) {
                // Column doesn't exist — add it
                const alterSQL = `ALTER TABLE ${table} ADD COLUMN email STRING`
                await bq.query({ query: alterSQL, location: 'US' })
                console.log('Added email column to etgusers')
            }
        }

        // Escape value
        const escaped = (value || '').replace(/'/g, "\\'")

        const updateSQL = `
            UPDATE ${table}
            SET ${field} = '${escaped}'
            WHERE A2 = @key
        `
        await bq.query({
            query: updateSQL,
            params: { key },
            location: 'US',
        })

        return { success: true, message: `Updated ${field} for user '${key}'` }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Update failed: ${message}` })
    }
})
