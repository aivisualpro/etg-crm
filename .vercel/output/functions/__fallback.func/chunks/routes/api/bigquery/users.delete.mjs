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

const users_delete = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.email) {
      throw createError({ statusCode: 400, statusMessage: "Email is required to delete a user" });
    }
    const escape = (v) => (v || "").replace(/'/g, "\\'");
    const sql = `DELETE FROM \`flutter-5e2fd.etg_database.Users\` WHERE Email = '${escape(body.email)}'`;
    await queryBigQuery(sql);
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to delete user: ${message}` });
  }
});

export { users_delete as default };
//# sourceMappingURL=users.delete.mjs.map
