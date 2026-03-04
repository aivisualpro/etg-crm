import { d as defineEventHandler, g as getQuery, q as queryBigQuery, c as createError } from '../../../nitro/nitro.mjs';
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

const users_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const search = (query.search || "").trim();
    let userSql = "SELECT * FROM `flutter-5e2fd.etg_database.etgusers`";
    if (search) {
      userSql += ` WHERE LOWER(IFNULL(A2, '')) LIKE LOWER(@search)
               OR LOWER(IFNULL(A200, '')) LIKE LOWER(@search)
               OR LOWER(IFNULL(A201, '')) LIKE LOWER(@search)
               OR LOWER(IFNULL(Status, '')) LIKE LOWER(@search)`;
    }
    const params = search ? { search: `%${search}%` } : void 0;
    const [rows, langRows] = await Promise.all([
      queryBigQuery(userSql, params),
      queryBigQuery("SELECT ID, eng, arabic FROM `flutter-5e2fd.etg_database.etgLanguage`")
    ]);
    const langMap = {};
    for (const r of langRows) {
      if (r.ID) langMap[r.ID] = r.eng || r.ID;
    }
    const resolved = rows.map((row) => {
      const r = { ...row };
      if (r.A200) r.A200_raw = r.A200;
      if (r.A200 && langMap[r.A200]) r.A200 = langMap[r.A200];
      if (r.A204 && langMap[r.A204]) r.A204 = langMap[r.A204];
      if (r.A7 && langMap[r.A7]) r.A7 = langMap[r.A7];
      if (r.A8 && langMap[r.A8]) r.A8 = langMap[r.A8];
      if (r.A9 && langMap[r.A9]) r.A9 = langMap[r.A9];
      return r;
    });
    return { success: true, count: resolved.length, users: resolved };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch users: ${message}` });
  }
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
