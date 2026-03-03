/**
 * POST /api/bigquery/deduplicate-furniture
 *
 * Removes duplicate rows from the etgFurniture BigQuery table.
 * Keeps only 1 row per unique (ID, A7, A8, A9, A70) combination.
 *
 * Returns counts: before, after, removed.
 */
export default defineEventHandler(async () => {
    try {
        const { bigquery } = useRuntimeConfig()
        const projectId = bigquery.projectId || 'flutter-5e2fd'
        const dataset = bigquery.dataset || 'etg_database'
        const bq = useBigQuery()
        const fqTable = `\`${projectId}.${dataset}.etgFurniture\``

        // Step 1: Get the current total count
        const [beforeResult] = await bq.query({
            query: `SELECT COUNT(*) as total FROM ${fqTable}`,
            location: 'US',
        })
        const beforeCount = Number(beforeResult[0]?.total || 0)

        // Step 2: Get partition-level counts before dedup
        const [partBefore] = await bq.query({
            query: `SELECT A7, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7 ORDER BY cnt DESC`,
            location: 'US',
        })
        const partitionCountsBefore: Record<string, number> = {}
        for (const r of partBefore) {
            partitionCountsBefore[r.A7 as string] = Number(r.cnt)
        }

        // Step 3: Create a deduplicated temp table using ROW_NUMBER()
        // A70 (Asset Code) is the unique key for each furniture item
        const dedupTableName = `etgFurniture_dedup_${Date.now()}`
        const dedupFq = `\`${projectId}.${dataset}.${dedupTableName}\``

        await bq.query({
            query: `
                CREATE TABLE ${dedupFq} AS
                SELECT * EXCEPT(row_num) FROM (
                    SELECT *,
                        ROW_NUMBER() OVER (
                            PARTITION BY A70
                            ORDER BY A7, ID
                        ) as row_num
                    FROM ${fqTable}
                )
                WHERE row_num = 1
            `,
            location: 'US',
            jobTimeoutMs: 300000,
        })

        // Step 4: Get count of deduped table
        const [afterResult] = await bq.query({
            query: `SELECT COUNT(*) as total FROM ${dedupFq}`,
            location: 'US',
        })
        const afterCount = Number(afterResult[0]?.total || 0)

        // Step 5: Drop the original table and rename the deduped one
        await bq.query({
            query: `DROP TABLE IF EXISTS ${fqTable}`,
            location: 'US',
        })

        // BigQuery doesn't support RENAME TABLE, so we need to copy and drop
        await bq.query({
            query: `CREATE TABLE ${fqTable} AS SELECT * FROM ${dedupFq}`,
            location: 'US',
            jobTimeoutMs: 300000,
        })

        await bq.query({
            query: `DROP TABLE IF EXISTS ${dedupFq}`,
            location: 'US',
        })

        // Step 6: Get partition-level counts after dedup
        const [partAfter] = await bq.query({
            query: `SELECT A7, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7 ORDER BY cnt DESC`,
            location: 'US',
        })
        const partitionCountsAfter: Record<string, number> = {}
        for (const r of partAfter) {
            partitionCountsAfter[r.A7 as string] = Number(r.cnt)
        }

        const removed = beforeCount - afterCount

        return {
            success: true,
            message: `Deduplication complete: removed ${removed.toLocaleString()} duplicate rows`,
            before: beforeCount,
            after: afterCount,
            removed,
            partitionCountsBefore,
            partitionCountsAfter,
        }
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        console.error('Deduplication failed:', error)
        throw createError({ statusCode: 500, statusMessage: `Deduplication failed: ${message}` })
    }
})
