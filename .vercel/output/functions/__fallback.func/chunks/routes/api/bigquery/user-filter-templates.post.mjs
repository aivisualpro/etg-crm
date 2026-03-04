import { d as defineEventHandler, r as readBody, c as createError, u as useRuntimeConfig, e as useBigQuery, q as queryBigQuery } from '../../../nitro/nitro.mjs';
import { nanoid } from 'nanoid';
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

const userFilterTemplates_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const { email: rawEmail, name, route, filters } = body || {};
  const email = (rawEmail || "").toLowerCase().trim();
  if (!email || !name || !route || !filters) {
    throw createError({ statusCode: 400, statusMessage: "email, name, route, and filters are required" });
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
    let existing = [];
    if (rows.length && rows[0].filter_templates) {
      try {
        existing = JSON.parse(rows[0].filter_templates);
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }
    }
    const newTemplate = {
      id: nanoid(10),
      name,
      route,
      filters: typeof filters === "string" ? JSON.parse(filters) : filters,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    existing.push(newTemplate);
    const escaped = JSON.stringify(existing).replace(/'/g, "\\'");
    const updateSql = `UPDATE ${table} SET filter_templates = '${escaped}' WHERE LOWER(IFNULL(Email, '')) = @email`;
    await bq.query({ query: updateSql, params: { email }, location: "US" });
    return { success: true, template: newTemplate };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to save filter template: ${message}` });
  }
});

export { userFilterTemplates_post as default };
//# sourceMappingURL=user-filter-templates.post.mjs.map
