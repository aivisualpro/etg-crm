import { d as defineEventHandler, g as getQuery, c as createError, u as useRuntimeConfig, e as useBigQuery, q as queryBigQuery } from '../../../nitro/nitro.mjs';
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

const userFilterTemplates_get = defineEventHandler(async (event) => {
  var _a, _b;
  const query = getQuery(event);
  const email = (query.email || "").toLowerCase().trim();
  const route = query.route || "";
  if (!email) {
    throw createError({ statusCode: 400, statusMessage: "email is required" });
  }
  try {
    const { bigquery } = useRuntimeConfig();
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const dataset = bigquery.dataset || "etg_database";
    const table = `\`${projectId}.${dataset}.etgusers\``;
    const bq = useBigQuery();
    try {
      await bq.query({ query: `SELECT filter_templates FROM ${table} LIMIT 1`, location: "US" });
    } catch (e) {
      if (((_a = e.message) == null ? void 0 : _a.includes("Unrecognized name")) || ((_b = e.message) == null ? void 0 : _b.includes("not found"))) {
        await bq.query({ query: `ALTER TABLE ${table} ADD COLUMN filter_templates STRING`, location: "US" });
      }
    }
    const sql = `SELECT filter_templates FROM ${table} WHERE LOWER(IFNULL(Email, '')) = @email LIMIT 1`;
    const rows = await queryBigQuery(sql, { email });
    if (!rows.length || !rows[0].filter_templates) {
      return { success: true, templates: [] };
    }
    let allTemplates = [];
    try {
      allTemplates = JSON.parse(rows[0].filter_templates);
      if (!Array.isArray(allTemplates)) allTemplates = [];
    } catch {
      allTemplates = [];
    }
    const templates = route ? allTemplates.filter((t) => t.route === route) : allTemplates;
    return { success: true, templates };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch filter templates: ${message}` });
  }
});

export { userFilterTemplates_get as default };
//# sourceMappingURL=user-filter-templates.get.mjs.map
