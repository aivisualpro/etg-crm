import { d as defineEventHandler, u as useRuntimeConfig, e as useBigQuery, c as createError } from '../../../nitro/nitro.mjs';
import '@google-cloud/bigquery';
import 'googleapis';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';

const deduplicateFurniture_post = defineEventHandler(async () => {
  var _a, _b;
  try {
    const { bigquery } = useRuntimeConfig();
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const dataset = bigquery.dataset || "etg_database";
    const bq = useBigQuery();
    const fqTable = `\`${projectId}.${dataset}.etgFurniture\``;
    const [beforeResult] = await bq.query({
      query: `SELECT COUNT(*) as total FROM ${fqTable}`,
      location: "US"
    });
    const beforeCount = Number(((_a = beforeResult[0]) == null ? void 0 : _a.total) || 0);
    const [partBefore] = await bq.query({
      query: `SELECT A7, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7 ORDER BY cnt DESC`,
      location: "US"
    });
    const partitionCountsBefore = {};
    for (const r of partBefore) {
      partitionCountsBefore[r.A7] = Number(r.cnt);
    }
    const dedupTableName = `etgFurniture_dedup_${Date.now()}`;
    const dedupFq = `\`${projectId}.${dataset}.${dedupTableName}\``;
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
      location: "US",
      jobTimeoutMs: 3e5
    });
    const [afterResult] = await bq.query({
      query: `SELECT COUNT(*) as total FROM ${dedupFq}`,
      location: "US"
    });
    const afterCount = Number(((_b = afterResult[0]) == null ? void 0 : _b.total) || 0);
    await bq.query({
      query: `DROP TABLE IF EXISTS ${fqTable}`,
      location: "US"
    });
    await bq.query({
      query: `CREATE TABLE ${fqTable} AS SELECT * FROM ${dedupFq}`,
      location: "US",
      jobTimeoutMs: 3e5
    });
    await bq.query({
      query: `DROP TABLE IF EXISTS ${dedupFq}`,
      location: "US"
    });
    const [partAfter] = await bq.query({
      query: `SELECT A7, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7 ORDER BY cnt DESC`,
      location: "US"
    });
    const partitionCountsAfter = {};
    for (const r of partAfter) {
      partitionCountsAfter[r.A7] = Number(r.cnt);
    }
    const removed = beforeCount - afterCount;
    return {
      success: true,
      message: `Deduplication complete: removed ${removed.toLocaleString()} duplicate rows`,
      before: beforeCount,
      after: afterCount,
      removed,
      partitionCountsBefore,
      partitionCountsAfter
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Deduplication failed:", error);
    throw createError({ statusCode: 500, statusMessage: `Deduplication failed: ${message}` });
  }
});

export { deduplicateFurniture_post as default };
//# sourceMappingURL=deduplicate-furniture.post.mjs.map
