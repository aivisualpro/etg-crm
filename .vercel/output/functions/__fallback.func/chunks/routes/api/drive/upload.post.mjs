import { d as defineEventHandler, l as readMultipartFormData, c as createError, f as useDrive } from '../../../nitro/nitro.mjs';
import { Readable } from 'node:stream';
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

const FOLDER_MIME = "application/vnd.google-apps.folder";
const upload_post = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const formData = await readMultipartFormData(event);
    if (!formData || formData.length === 0) {
      throw createError({ statusCode: 400, statusMessage: "No file provided" });
    }
    const folderIdField = formData.find((f) => f.name === "folderId");
    const folderId = (_a = folderIdField == null ? void 0 : folderIdField.data) == null ? void 0 : _a.toString();
    if (!folderId) {
      throw createError({ statusCode: 400, statusMessage: "folderId is required" });
    }
    const drive = useDrive();
    const folderCache = { "": folderId };
    async function ensureFolder(relativePath) {
      if (folderCache[relativePath]) return folderCache[relativePath];
      const parts = relativePath.split("/");
      let builtPath = "";
      for (const part of parts) {
        const parentPath = builtPath;
        builtPath = builtPath ? `${builtPath}/${part}` : part;
        if (!folderCache[builtPath]) {
          const parentId = folderCache[parentPath];
          const res = await drive.files.create({
            requestBody: { name: part, mimeType: FOLDER_MIME, parents: [parentId] },
            fields: "id",
            supportsAllDrives: true
          });
          folderCache[builtPath] = res.data.id;
        }
      }
      return folderCache[relativePath];
    }
    const fileFields = formData.filter((f) => f.name === "files" && f.filename);
    const relativePathsField = formData.find((f) => f.name === "relativePaths");
    const relativePaths = relativePathsField ? JSON.parse(relativePathsField.data.toString()) : fileFields.map(() => "");
    const uploaded = [];
    for (let i = 0; i < fileFields.length; i++) {
      const file = fileFields[i];
      const relPath = relativePaths[i] || "";
      const parts = relPath.split("/");
      const folderParts = parts.slice(0, -1);
      const targetFolderId = folderParts.length > 0 ? await ensureFolder(folderParts.join("/")) : folderId;
      const stream = new Readable();
      stream.push(file.data);
      stream.push(null);
      const res = await drive.files.create({
        requestBody: {
          name: file.filename || parts[parts.length - 1] || "Untitled",
          parents: [targetFolderId]
        },
        media: {
          mimeType: file.type || "application/octet-stream",
          body: stream
        },
        fields: "id, name, mimeType",
        supportsAllDrives: true
      });
      if (res.data.id) {
        uploaded.push({
          id: res.data.id,
          name: res.data.name || file.filename || "Untitled",
          mimeType: res.data.mimeType || file.type || ""
        });
      }
    }
    return { success: true, uploaded, count: uploaded.length };
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: ((_b = err.data) == null ? void 0 : _b.statusMessage) || err.message || "Failed to upload files"
    });
  }
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
