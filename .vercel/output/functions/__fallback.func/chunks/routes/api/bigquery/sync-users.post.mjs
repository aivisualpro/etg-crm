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

const syncUsers_post = defineEventHandler(async () => {
  try {
    const APPSHEET_APP_ID = "b7510e79-c7cf-416c-9b6c-4ee4247538c5";
    const APPSHEET_ACCESS_KEY = "V2-rG4Pb-U8Egw-OYr5C-yqEkB-qwebd-9tCNg-hZD5U-SJtJs";
    const APPSHEET_TABLE = "Users";
    const BQ_TABLE = "etgusers";
    const KEY_COLUMN = "A2";
    const bq = useBigQuery();
    const { bigquery } = useRuntimeConfig();
    const dataset = bigquery.dataset || "etg_database";
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const response = await fetch(
      `https://api.appsheet.com/api/v2/apps/${APPSHEET_APP_ID}/tables/${APPSHEET_TABLE}/Action`,
      {
        method: "POST",
        headers: {
          "ApplicationAccessKey": APPSHEET_ACCESS_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Action: "Find",
          Properties: { Locale: "en-US", Timezone: "UTC" },
          Rows: []
        })
      }
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`AppSheet API error (${response.status}): ${text}`);
    }
    const rows = await response.json();
    if (rows.length === 0) {
      return { success: true, message: "No users found in AppSheet", count: 0 };
    }
    const allKeys = /* @__PURE__ */ new Set();
    for (const row of rows) {
      for (const key of Object.keys(row)) allKeys.add(key);
    }
    const columnMap = {};
    for (const key of allKeys) {
      columnMap[key] = key.replace(/[^a-zA-Z0-9_]/g, "_");
    }
    const schema = [...allKeys].map((name) => ({
      name: columnMap[name],
      type: "STRING",
      mode: "NULLABLE"
    }));
    const bqRows = rows.map((row) => {
      const cleaned = {};
      for (const [key, value] of Object.entries(row)) {
        const safeKey = columnMap[key];
        if (value === null || value === void 0) cleaned[safeKey] = null;
        else if (typeof value === "object") cleaned[safeKey] = JSON.stringify(value);
        else cleaned[safeKey] = String(value);
      }
      return cleaned;
    });
    const safeKeyColumn = columnMap[KEY_COLUMN];
    const columns = [...allKeys].map((k) => columnMap[k]);
    const dsRef = bq.dataset(dataset);
    const tableRef = dsRef.table(BQ_TABLE);
    const [exists] = await tableRef.exists();
    if (exists) {
      await tableRef.delete();
      console.log(`  \u{1F5D1}\uFE0F Dropped existing table ${BQ_TABLE}`);
    }
    await dsRef.createTable(BQ_TABLE, { schema: { fields: schema }, location: "US" });
    await new Promise((resolve) => setTimeout(resolve, 3e3));
    console.log(`  \u{1F4CB} Created table ${BQ_TABLE}`);
    const INSERT_BATCH = 150;
    for (let i = 0; i < bqRows.length; i += INSERT_BATCH) {
      const batch = bqRows.slice(i, i + INSERT_BATCH);
      const insertCols = columns.map((c) => `\`${c}\``).join(", ");
      const valueRows = batch.map((row) => {
        const vals = columns.map((col) => {
          var _a;
          return escapeSqlValue((_a = row[col]) != null ? _a : null);
        });
        return `(${vals.join(", ")})`;
      }).join(",\n      ");
      const insertSQL = `
                INSERT INTO \`${projectId}.${dataset}.${BQ_TABLE}\` (${insertCols})
                VALUES ${valueRows}
            `;
      await bq.query({ query: insertSQL, location: "US" });
    }
    return {
      success: true,
      message: `Synced ${bqRows.length} users from AppSheet to BigQuery`,
      count: bqRows.length
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Sync failed: ${message}` });
  }
});
function escapeSqlValue(val) {
  if (val === null || val === void 0) return "CAST(NULL AS STRING)";
  const escaped = val.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  return `'${escaped}'`;
}

export { syncUsers_post as default };
//# sourceMappingURL=sync-users.post.mjs.map
