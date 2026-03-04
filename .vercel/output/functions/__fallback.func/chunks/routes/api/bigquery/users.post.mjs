import { d as defineEventHandler, r as readBody, q as queryBigQuery, c as createError } from '../../../nitro/nitro.mjs';
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

const users_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const escape = (v) => (v || "").replace(/'/g, "\\'");
    const sql = `
      INSERT INTO \`flutter-5e2fd.etg_database.Users\`
        (\`First Name\`, \`Last Name\`, Email, Phone, Role, \`Secondary Role\`, Vendors, Department, Branch, Status, Location, UTC)
      VALUES (
        '${escape(body.firstName)}',
        '${escape(body.lastName)}',
        '${escape(body.email)}',
        '${escape(body.phone)}',
        '${escape(body.role)}',
        '${escape(body.secondaryRole)}',
        '${escape(body.vendors)}',
        '${escape(body.department)}',
        '${escape(body.branch)}',
        ${body.status === "true" || body.status === true ? "TRUE" : "FALSE"},
        '${escape(body.location)}',
        ${body.utc ? Number(body.utc) : 0}
      )
    `;
    await queryBigQuery(sql);
    return { success: true, message: "User created successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to create user: ${message}` });
  }
});

export { users_post as default };
//# sourceMappingURL=users.post.mjs.map
