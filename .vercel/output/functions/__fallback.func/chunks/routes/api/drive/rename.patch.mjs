import { d as defineEventHandler, r as readBody, c as createError, f as useDrive } from '../../../nitro/nitro.mjs';
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

const rename_patch = defineEventHandler(async (event) => {
  var _a;
  try {
    const { fileId, name } = await readBody(event);
    if (!fileId || !(name == null ? void 0 : name.trim())) {
      throw createError({ statusCode: 400, statusMessage: "fileId and name are required" });
    }
    const drive = useDrive();
    const res = await drive.files.update({
      fileId,
      requestBody: { name: name.trim() },
      fields: "id, name, mimeType",
      supportsAllDrives: true
    });
    return { success: true, file: res.data };
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: ((_a = err.data) == null ? void 0 : _a.statusMessage) || err.message || "Failed to rename"
    });
  }
});

export { rename_patch as default };
//# sourceMappingURL=rename.patch.mjs.map
