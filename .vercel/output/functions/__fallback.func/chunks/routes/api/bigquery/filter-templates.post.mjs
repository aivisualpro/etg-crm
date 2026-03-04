import { d as defineEventHandler, r as readBody, c as createError, q as queryBigQuery } from '../../../nitro/nitro.mjs';
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

const filterTemplates_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, route, filters, userEmail, userName, isShared } = body;
    if (!name || !route || !filters || !userEmail) {
      throw createError({ statusCode: 400, statusMessage: "name, route, filters, and userEmail are required" });
    }
    const escape = (v) => (v || "").replace(/'/g, "\\'");
    const id = nanoid(12);
    const filtersJson = JSON.stringify(filters).replace(/'/g, "\\'");
    const sql = `
      INSERT INTO \`flutter-5e2fd.etg_database.FilterTemplatesNew\`
        (id, name, route, filters, user_email, user_name, is_shared, created_at, updated_at)
      VALUES (
        '${escape(id)}',
        '${escape(name)}',
        '${escape(route)}',
        '${escape(filtersJson)}',
        '${escape(userEmail)}',
        '${escape(userName || "")}',
        ${isShared ? "TRUE" : "FALSE"},
        CURRENT_TIMESTAMP(),
        CURRENT_TIMESTAMP()
      )
    `;
    await queryBigQuery(sql);
    return { success: true, message: "Filter template saved", id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to save filter template: ${message}` });
  }
});

export { filterTemplates_post as default };
//# sourceMappingURL=filter-templates.post.mjs.map
