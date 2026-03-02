/**
 * DELETE /api/bigquery/filter-templates
 * Deletes a filter template by ID.
 */
export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { id } = body

        if (!id) {
            throw createError({ statusCode: 400, statusMessage: 'id is required' })
        }

        const escape = (v: string) => (v || '').replace(/'/g, "\\'")

        const sql = `
      DELETE FROM \`appsheet-417200.SWSCRMV4.FilterTemplatesNew\`
      WHERE id = '${escape(id)}'
    `

        await queryBigQuery(sql)
        return { success: true, message: 'Filter template deleted' }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to delete filter template: ${message}` })
    }
})
