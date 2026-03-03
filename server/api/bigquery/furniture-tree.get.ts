/**
 * GET /api/bigquery/furniture-tree
 *
 * Returns the hierarchical tree of Furniture entities:
 *   A7 (Level 1) → A8 (Level 2) → A9 (Level 3)
 * with counts at each level.
 */
export default defineEventHandler(async () => {
    try {
        const bq = useBigQuery()
        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const fqTable = `\`${projectId}.${dataset}.etgFurniture\``

        // Get distinct A7, A8, A9 with counts
        const [rows] = await bq.query({
            query: `SELECT A7, A8, A9, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7, A8, A9 ORDER BY A7, A8, A9`,
            location: 'US',
        })

        // Build tree: A7 → A8 → A9
        const tree: Record<string, {
            count: number
            children: Record<string, {
                count: number
                children: Record<string, number>
            }>
        }> = {}

        let totalCount = 0

        for (const row of rows as Array<{ A7: string, A8: string, A9: string, cnt: number }>) {
            const a7 = row.A7 || '_unknown'
            const a8 = row.A8 || '_unknown'
            const a9 = row.A9 || '_unknown'
            const count = Number(row.cnt) || 0
            totalCount += count

            if (!tree[a7]) tree[a7] = { count: 0, children: {} }
            tree[a7].count += count

            if (!tree[a7].children[a8]) tree[a7].children[a8] = { count: 0, children: {} }
            tree[a7].children[a8].count += count

            tree[a7].children[a8].children[a9] = (tree[a7].children[a8].children[a9] || 0) + count
        }

        return {
            success: true,
            total: totalCount,
            tree,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        throw createError({ statusCode: 500, statusMessage: `Failed to load tree: ${message}` })
    }
})
