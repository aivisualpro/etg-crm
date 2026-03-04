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

const users_put = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.email) {
      throw createError({ statusCode: 400, statusMessage: "Email is required to update a user" });
    }
    const escape = (v) => (v || "").replace(/'/g, "\\'");
    const sql = `
      UPDATE \`flutter-5e2fd.etg_database.Users\`
      SET
        \`First Name\` = '${escape(body.firstName)}',
        \`Last Name\` = '${escape(body.lastName)}',
        Phone = '${escape(body.phone)}',
        Role = '${escape(body.role)}',
        \`Secondary Role\` = '${escape(body.secondaryRole)}',
        Vendors = '${escape(body.vendors)}',
        Department = '${escape(body.department)}',
        Branch = '${escape(body.branch)}',
        Status = ${body.status === "true" || body.status === true ? "TRUE" : "FALSE"},
        Location = '${escape(body.location)}',
        UTC = ${body.utc ? Number(body.utc) : 0}
      WHERE Email = '${escape(body.email)}'
    `;
    await queryBigQuery(sql);
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to update user: ${message}` });
  }
});

export { users_put as default };
//# sourceMappingURL=users.put.mjs.map
