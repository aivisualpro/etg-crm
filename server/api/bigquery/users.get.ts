export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const search = (query.search as string || '').trim()

    // Fetch users and language table in parallel
    let userSql = 'SELECT * FROM `flutter-5e2fd.etg_database.etgusers`'
    if (search) {
      userSql += ` WHERE LOWER(IFNULL(A2, '')) LIKE LOWER(@search)
               OR LOWER(IFNULL(A200, '')) LIKE LOWER(@search)
               OR LOWER(IFNULL(A201, '')) LIKE LOWER(@search)
               OR LOWER(IFNULL(Status, '')) LIKE LOWER(@search)`
    }

    const params = search ? { search: `%${search}%` } : undefined
    const [rows, langRows] = await Promise.all([
      queryBigQuery(userSql, params),
      queryBigQuery<{ ID: string, eng: string, arabic: string }>('SELECT ID, eng, arabic FROM `flutter-5e2fd.etg_database.etgLanguage`'),
    ])

    // Build a lookup map: code → english label
    const langMap: Record<string, string> = {}
    for (const r of langRows) {
      if (r.ID) langMap[r.ID] = r.eng || r.ID
    }

    // Resolve coded fields to readable labels
    const resolved = (rows as any[]).map(row => {
      const r = { ...row }
      // A200 = Role code → label (keep raw code for client-side language resolution)
      if (r.A200) r.A200_raw = r.A200
      if (r.A200 && langMap[r.A200]) r.A200 = langMap[r.A200]
      // A204 = Status code → label (sometimes it's already "Active"/"Inactive")
      if (r.A204 && langMap[r.A204]) r.A204 = langMap[r.A204]
      // A7, A8, A9 = Level codes → labels
      if (r.A7 && langMap[r.A7]) r.A7 = langMap[r.A7]
      if (r.A8 && langMap[r.A8]) r.A8 = langMap[r.A8]
      if (r.A9 && langMap[r.A9]) r.A9 = langMap[r.A9]
      return r
    })

    return { success: true, count: resolved.length, users: resolved }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch users: ${message}` })
  }
})
