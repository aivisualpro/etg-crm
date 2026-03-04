import { d as defineEventHandler, r as readBody, c as createError, q as queryBigQuery } from '../../../nitro/nitro.mjs';
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

const filterTemplates_delete = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { id } = body;
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "id is required" });
    }
    const escape = (v) => (v || "").replace(/'/g, "\\'");
    const sql = `
      DELETE FROM \`flutter-5e2fd.etg_database.FilterTemplatesNew\`
      WHERE id = '${escape(id)}'
    `;
    await queryBigQuery(sql);
    return { success: true, message: "Filter template deleted" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to delete filter template: ${message}` });
  }
});

export { filterTemplates_delete as default };
//# sourceMappingURL=filter-templates.delete.mjs.map
