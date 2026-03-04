import { d as defineEventHandler, g as getQuery, c as createError, f as useDrive } from '../../../nitro/nitro.mjs';
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

const files_get = defineEventHandler(async (event) => {
  try {
    const { folderId } = getQuery(event);
    if (!folderId) throw createError({ statusCode: 400, statusMessage: "folderId is required" });
    const drive = useDrive();
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, size, modifiedTime, thumbnailLink, iconLink, webViewLink, webContentLink)",
      orderBy: "folder,name",
      pageSize: 200,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    });
    return {
      success: true,
      files: res.data.files || []
    };
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.message || "Failed to list Drive files"
    });
  }
});

export { files_get as default };
//# sourceMappingURL=files.get.mjs.map
