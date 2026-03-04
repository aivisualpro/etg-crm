/**
 * GET /api/bigquery/levels
 * Returns all three level tables with resolved parent names
 */
export default defineEventHandler(async () => {
    try {
        const [level1, level2, level3, langRows] = await Promise.all([
            queryBigQuery('SELECT * FROM `flutter-5e2fd.etg_database.etgLevel1` ORDER BY eng'),
            queryBigQuery('SELECT * FROM `flutter-5e2fd.etg_database.etgLevel2` ORDER BY eng'),
            queryBigQuery('SELECT * FROM `flutter-5e2fd.etg_database.etgLevel3` ORDER BY eng'),
            queryBigQuery<{ ID: string, eng: string, arabic: string }>('SELECT ID, eng, arabic FROM `flutter-5e2fd.etg_database.etgLanguage`'),
        ])

        // Build language lookup
        const langMap: Record<string, string> = {}
        for (const r of langRows) {
            if (r.ID) langMap[r.ID] = r.eng || r.ID
        }

        // Build level1 lookup by A7 (internal ID → eng name)
        const level1Map: Record<string, string> = {}
        for (const r of level1 as any[]) {
            if (r.A7) level1Map[r.A7] = r.eng || r.A7
        }

        // Build level2 lookup by A8 (internal ID → eng name)
        const level2Map: Record<string, string> = {}
        for (const r of level2 as any[]) {
            if (r.A8) level2Map[r.A8] = r.eng || r.A8
        }

        // Resolve level2 rows: A7 → level1 name
        const resolvedLevel2 = (level2 as any[]).map(row => ({
            ...row,
            A7_label: level1Map[row.A7] || langMap[row.A7] || row.A7 || '',
        }))

        // Resolve level3 rows: A7 → level1 name, A8 → level2 name
        const resolvedLevel3 = (level3 as any[]).map(row => ({
            ...row,
            A7_label: level1Map[row.A7] || langMap[row.A7] || row.A7 || '',
            A8_label: level2Map[row.A8] || langMap[row.A8] || row.A8 || '',
        }))

        return {
            success: true,
            level1: level1 as any[],
            level2: resolvedLevel2,
            level3: resolvedLevel3,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch levels: ${message}` })
    }
})
