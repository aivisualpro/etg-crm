/**
 * GET /api/bigquery/events
 * Fetches events from BigQuery `Events` table.
 * Caches results for 5 minutes to avoid repeated BQ queries.
 */

let _cache: { data: any[], timestamp: number } | null = null
const CACHE_TTL = 300_000 // 5 minutes

const COLUMNS = [
  'Event  ID', 'Event Type', 'Event Status', 'Event Description',
  'Start Date', 'End Date', 'Project ID', 'Category', 'Branch',
  'Customer Address', 'Event Address', 'Customer Phone', 'Customer Mobile', 'Customer Email',
  'Event Confirmed', 'Vendor', 'Event Note', 'Reason of Change',
  'Installers', 'Technicians', 'SSA Technician', 'Electrician Crew', 'Troubleshooting Tech',
  'Create By', 'Secondary Summary',
]

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const search = (query.search as string || '').trim()
    const category = (query.category as string || '').trim()

    // Return cached data if fresh and no filters applied
    if (!search && !category && _cache && Date.now() - _cache.timestamp < CACHE_TTL) {
      return { success: true, count: _cache.data.length, events: _cache.data, cached: true }
    }

    const colList = COLUMNS.map(c => `\`${c}\``).join(', ')
    let sql = `SELECT ${colList} FROM \`appsheet-417200.SWSCRMV4.Events\``
    const conditions: string[] = []

    if (search) {
      conditions.push(`(
        LOWER(IFNULL(\`Event  ID\`, '')) LIKE LOWER(@search)
        OR LOWER(IFNULL(\`Event Type\`, '')) LIKE LOWER(@search)
        OR LOWER(IFNULL(\`Event Status\`, '')) LIKE LOWER(@search)
        OR LOWER(IFNULL(\`Event Description\`, '')) LIKE LOWER(@search)
        OR LOWER(IFNULL(\`Customer Address\`, '')) LIKE LOWER(@search)
        OR LOWER(IFNULL(\`Project ID\`, '')) LIKE LOWER(@search)
        OR LOWER(IFNULL(\`Create By\`, '')) LIKE LOWER(@search)
        OR LOWER(IFNULL(Branch, '')) LIKE LOWER(@search)
      )`)
    }

    if (category) {
      conditions.push(`LOWER(IFNULL(Category, '')) = LOWER(@category)`)
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`
    }

    sql += ' ORDER BY `Start Date` DESC'

    const params: Record<string, string> = {}
    if (search) params.search = `%${search}%`
    if (category) params.category = category

    const rows = await queryBigQuery(sql, Object.keys(params).length > 0 ? params : undefined)

    // Cache unfiltered results
    if (!search && !category) {
      _cache = { data: rows, timestamp: Date.now() }
    }

    return { success: true, count: rows.length, events: rows }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch events: ${message}` })
  }
})
