/**
 * GET /api/bigquery/asset-descriptions
 * Returns asset descriptions from BigQuery with resolved category/subcategory labels
 */
export default defineEventHandler(async () => {
    try {
        const [descriptions, subCategories, categories] = await Promise.all([
            queryBigQuery('SELECT * FROM `flutter-5e2fd.etg_database.etgAssetDescription` ORDER BY eng'),
            queryBigQuery<{ A66: string, eng: string }>('SELECT A66, eng FROM `flutter-5e2fd.etg_database.etgSubCategories`'),
            queryBigQuery<{ A51: string, eng: string }>('SELECT A51, eng FROM `flutter-5e2fd.etg_database.etgAssetCategory`'),
        ])

        // Build subcategory lookup (A66 → name)
        const subCatMap: Record<string, string> = {}
        for (const r of subCategories) {
            if (r.A66) subCatMap[r.A66] = r.eng || r.A66
        }

        // Build category lookup (A51 → name)
        const catMap: Record<string, string> = {}
        for (const r of categories) {
            if (r.A51) catMap[r.A51] = r.eng || r.A51
        }

        // Resolve: A66 → subcategory names (comma-separated IDs)
        const resolved = (descriptions as any[]).map(row => {
            // A66 may hold comma-separated subcategory IDs
            const subCatIds = (row.A66 || '').split(',').map((s: string) => s.trim()).filter(Boolean)
            const subCatLabels = subCatIds.map((id: string) => subCatMap[id] || id).join(', ')

            return {
                ...row,
                A66_label: subCatLabels || row.A66 || '',
            }
        })

        return {
            success: true,
            descriptions: resolved,
            total: resolved.length,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch asset descriptions: ${message}` })
    }
})
