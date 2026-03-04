import { d as defineEventHandler, r as readBody, c as createError, u as useRuntimeConfig, e as useBigQuery } from '../../../../nitro/nitro.mjs';
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

const update_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const { key, field, value } = body || {};
  if (!key || !field) {
    throw createError({ statusCode: 400, statusMessage: "Missing key or field" });
  }
  const ALLOWED_FIELDS = ["email"];
  if (!ALLOWED_FIELDS.includes(field)) {
    throw createError({ statusCode: 400, statusMessage: `Field '${field}' is not editable` });
  }
  try {
    const { bigquery } = useRuntimeConfig();
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const dataset = bigquery.dataset || "etg_database";
    const table = `\`${projectId}.${dataset}.etgusers\``;
    const bq = useBigQuery();
    try {
      const checkSQL = `SELECT email FROM ${table} LIMIT 1`;
      await bq.query({ query: checkSQL, location: "US" });
    } catch (e) {
      if (((_a = e.message) == null ? void 0 : _a.includes("Unrecognized name")) || ((_b = e.message) == null ? void 0 : _b.includes("not found"))) {
        const alterSQL = `ALTER TABLE ${table} ADD COLUMN email STRING`;
        await bq.query({ query: alterSQL, location: "US" });
        console.log("Added email column to etgusers");
      }
    }
    const escaped = (value || "").replace(/'/g, "\\'");
    const updateSQL = `
            UPDATE ${table}
            SET ${field} = '${escaped}'
            WHERE A2 = @key
        `;
    await bq.query({
      query: updateSQL,
      params: { key },
      location: "US"
    });
    return { success: true, message: `Updated ${field} for user '${key}'` };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Update failed: ${message}` });
  }
});

export { update_post as default };
//# sourceMappingURL=update.post.mjs.map
