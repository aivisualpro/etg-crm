/**
 * POST /api/bigquery/filter-templates
 * Creates a new filter template in BigQuery.
 */
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, route, filters, userEmail, userName, isShared } = body

    if (!name || !route || !filters || !userEmail) {
      throw createError({ statusCode: 400, statusMessage: 'name, route, filters, and userEmail are required' })
    }

    const escape = (v: string) => (v || '').replace(/'/g, "\\'")
    const id = nanoid(12)
    const filtersJson = JSON.stringify(filters).replace(/'/g, "\\'")

    const sql = `
      INSERT INTO \`appsheet-417200.SWSCRMV4.FilterTemplatesNew\`
        (id, name, route, filters, user_email, user_name, is_shared, created_at, updated_at)
      VALUES (
        '${escape(id)}',
        '${escape(name)}',
        '${escape(route)}',
        '${escape(filtersJson)}',
        '${escape(userEmail)}',
        '${escape(userName || '')}',
        ${isShared ? 'TRUE' : 'FALSE'},
        CURRENT_TIMESTAMP(),
        CURRENT_TIMESTAMP()
      )
    `

    await queryBigQuery(sql)
    return { success: true, message: 'Filter template saved', id }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw createError({ statusCode: 500, statusMessage: `Failed to save filter template: ${message}` })
  }
})
