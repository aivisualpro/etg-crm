import { d as defineEventHandler, e as useBigQuery, u as useRuntimeConfig, c as createError } from '../../../nitro/nitro.mjs';
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

const furnitureTree_get = defineEventHandler(async () => {
  try {
    const bq = useBigQuery();
    const { bigquery } = useRuntimeConfig();
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const dataset = bigquery.dataset || "etg_database";
    const fqTable = `\`${projectId}.${dataset}.etgFurniture\``;
    const [rows] = await bq.query({
      query: `SELECT A7, A8, A9, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7, A8, A9 ORDER BY A7, A8, A9`,
      location: "US"
    });
    const tree = {};
    let totalCount = 0;
    for (const row of rows) {
      const a7 = row.A7 || "_unknown";
      const a8 = row.A8 || "_unknown";
      const a9 = row.A9 || "_unknown";
      const count = Number(row.cnt) || 0;
      totalCount += count;
      if (!tree[a7]) tree[a7] = { count: 0, children: {} };
      tree[a7].count += count;
      if (!tree[a7].children[a8]) tree[a7].children[a8] = { count: 0, children: {} };
      tree[a7].children[a8].count += count;
      tree[a7].children[a8].children[a9] = (tree[a7].children[a8].children[a9] || 0) + count;
    }
    return {
      success: true,
      total: totalCount,
      tree
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw createError({ statusCode: 500, statusMessage: `Failed to load tree: ${message}` });
  }
});

export { furnitureTree_get as default };
//# sourceMappingURL=furniture-tree.get.mjs.map
