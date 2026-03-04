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

const move_patch = defineEventHandler(async (event) => {
  var _a;
  try {
    const { fileId, newParentId, oldParentId } = await readBody(event);
    if (!fileId || !newParentId || !oldParentId) {
      throw createError({ statusCode: 400, statusMessage: "fileId, newParentId and oldParentId are required" });
    }
    const drive = useDrive();
    const res = await drive.files.update({
      fileId,
      addParents: newParentId,
      removeParents: oldParentId,
      fields: "id, name, mimeType, parents",
      supportsAllDrives: true
    });
    return { success: true, file: res.data };
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: ((_a = err.data) == null ? void 0 : _a.statusMessage) || err.message || "Failed to move file"
    });
  }
});

export { move_patch as default };
//# sourceMappingURL=move.patch.mjs.map
