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

const createFolder_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const { parentId, name } = await readBody(event);
    if (!parentId || !(name == null ? void 0 : name.trim())) {
      throw createError({ statusCode: 400, statusMessage: "parentId and name are required" });
    }
    const drive = useDrive();
    const res = await drive.files.create({
      requestBody: {
        name: name.trim(),
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentId]
      },
      fields: "id, name, mimeType",
      supportsAllDrives: true
    });
    return { success: true, folder: res.data };
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: ((_a = err.data) == null ? void 0 : _a.statusMessage) || err.message || "Failed to create folder"
    });
  }
});

export { createFolder_post as default };
//# sourceMappingURL=create-folder.post.mjs.map
