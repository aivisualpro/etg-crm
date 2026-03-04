import { d as defineEventHandler, b as setCookie, s as sendRedirect } from '../../../nitro/nitro.mjs';
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

const logout_get = defineEventHandler((event) => {
  setCookie(event, "auth_user", "", {
    maxAge: 0,
    path: "/"
  });
  return sendRedirect(event, "/login");
});

export { logout_get as default };
//# sourceMappingURL=logout.get.mjs.map
