import { d as defineEventHandler, r as readBody, c as createError, u as useRuntimeConfig, e as useBigQuery, q as queryBigQuery } from '../../../nitro/nitro.mjs';
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

const userFilterTemplates_delete = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email: rawEmail, id } = body || {};
  const email = (rawEmail || "").toLowerCase().trim();
  if (!email || !id) {
    throw createError({ statusCode: 400, statusMessage: "email and id are required" });
  }
  try {
    const { bigquery } = useRuntimeConfig();
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const dataset = bigquery.dataset || "etg_database";
    const table = `\`${projectId}.${dataset}.etgusers\``;
    const bq = useBigQuery();
    const sql = `SELECT filter_templates FROM ${table} WHERE LOWER(IFNULL(Email, '')) = @email LIMIT 1`;
    const rows = await queryBigQuery(sql, { email });
    let existing = [];
    if (rows.length && rows[0].filter_templates) {
      try {
        existing = JSON.parse(rows[0].filter_templates);
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }
    }
    const before = existing.length;
    existing = existing.filter((t) => t.id !== id);
    if (existing.length === before) {
      return { success: false, message: "Template not found" };
    }
    const escaped = JSON.stringify(existing).replace(/'/g, "\\'");
    const updateSql = `UPDATE ${table} SET filter_templates = '${escaped}' WHERE LOWER(IFNULL(Email, '')) = @email`;
    await bq.query({ query: updateSql, params: { email }, location: "US" });
    return { success: true, message: "Template deleted" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to delete filter template: ${message}` });
  }
});

export { userFilterTemplates_delete as default };
//# sourceMappingURL=user-filter-templates.delete.mjs.map
