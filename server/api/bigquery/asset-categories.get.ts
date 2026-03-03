/**
 * GET /api/bigquery/asset-categories
 * Returns asset categories and subcategories from BigQuery
 */
export default defineEventHandler(async () => {
    try {
        const [categories, subCategories] = await Promise.all([
            queryBigQuery('SELECT * FROM `flutter-5e2fd.etg_database.etgAssetCategory` ORDER BY eng'),
            queryBigQuery('SELECT * FROM `flutter-5e2fd.etg_database.etgSubCategories` ORDER BY eng'),
        ])

        // Build category lookup (A51 → name)
        const categoryMap: Record<string, string> = {}
        for (const r of categories as any[]) {
            if (r.A51) categoryMap[r.A51] = r.eng || r.arabic || r.A51
        }

        // Resolve subcategory rows: A51 → category name
        const resolvedSubCategories = (subCategories as any[]).map(row => ({
            ...row,
            A51_label: categoryMap[row.A51] || row.A51 || '',
        }))

        return {
            success: true,
            categories: categories as any[],
            subCategories: resolvedSubCategories,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch asset categories: ${message}` })
    }
})
