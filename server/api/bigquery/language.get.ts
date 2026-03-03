/**
 * GET /api/bigquery/language
 * Returns the etgLanguage table for column label lookups
 */
export default defineEventHandler(async () => {
    try {
        const rows = await queryBigQuery('SELECT * FROM `flutter-5e2fd.etg_database.etgLanguage`')
        return { success: true, count: rows.length, language: rows }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch language: ${message}` })
    }
})
