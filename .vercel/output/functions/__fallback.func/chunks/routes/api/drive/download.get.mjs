import { d as defineEventHandler, g as getQuery, c as createError, f as useDrive, j as setHeader, k as sendStream } from '../../../nitro/nitro.mjs';
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

const download_get = defineEventHandler(async (event) => {
  try {
    const { fileId } = getQuery(event);
    if (!fileId) throw createError({ statusCode: 400, statusMessage: "fileId is required" });
    const drive = useDrive();
    const meta = await drive.files.get({
      fileId,
      fields: "name, mimeType",
      supportsAllDrives: true
    });
    const res = await drive.files.get({
      fileId,
      alt: "media",
      supportsAllDrives: true
    }, { responseType: "stream" });
    setHeader(event, "Content-Type", meta.data.mimeType || "application/octet-stream");
    setHeader(event, "Content-Disposition", `attachment; filename="${encodeURIComponent(meta.data.name || "download")}"`);
    return sendStream(event, res.data);
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.message || "Failed to download file"
    });
  }
});

export { download_get as default };
//# sourceMappingURL=download.get.mjs.map
