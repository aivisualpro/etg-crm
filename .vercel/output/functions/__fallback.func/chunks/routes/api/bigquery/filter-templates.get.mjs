import { d as defineEventHandler, g as getQuery, c as createError, q as queryBigQuery } from '../../../nitro/nitro.mjs';
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

const filterTemplates_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const route = query.route;
    const userEmail = query.userEmail;
    if (!route || !userEmail) {
      throw createError({ statusCode: 400, statusMessage: "route and userEmail are required" });
    }
    const escape = (v) => (v || "").replace(/'/g, "\\'");
    const sql = `
      SELECT id, name, route, filters, user_email, user_name, created_at, updated_at
      FROM \`flutter-5e2fd.etg_database.FilterTemplatesNew\`
      WHERE route = '${escape(route)}'
        AND (user_email = '${escape(userEmail)}' OR is_shared = TRUE)
      ORDER BY updated_at DESC
    `;
    const rows = await queryBigQuery(sql);
    return { success: true, templates: rows };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch filter templates: ${message}` });
  }
});

export { filterTemplates_get as default };
//# sourceMappingURL=filter-templates.get.mjs.map
