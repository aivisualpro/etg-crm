import { d as defineEventHandler, g as getQuery, u as useRuntimeConfig, e as useBigQuery, f as useDrive, c as createError } from '../../../nitro/nitro.mjs';
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

const GCS_BUCKET = "etg-storage";
const IMAGE_COLUMNS = ["A69", "A71", "A72"];
const MAX_DURATION_MS = 5e4;
const CONCURRENCY = 5;
const syncFurnitureImages_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const startTime = Date.now();
  try {
    const query = getQuery(event);
    const partitionA7 = query.partition || "";
    const batchSize = Math.min(50, Math.max(5, Number(query.batch) || 20));
    const offset = Number(query.offset) || 0;
    const { bigquery } = useRuntimeConfig();
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const dataset = bigquery.dataset || "etg_database";
    const bq = useBigQuery();
    const fqTable = `\`${projectId}.${dataset}.etgFurniture\``;
    const conditions = [];
    const params = {};
    conditions.push(`(
            (A69 IS NOT NULL AND A69 != '' AND (A69_url IS NULL OR A69_url = ''))
            OR (A71 IS NOT NULL AND A71 != '' AND (A71_url IS NULL OR A71_url = ''))
            OR (A72 IS NOT NULL AND A72 != '' AND (A72_url IS NULL OR A72_url = ''))
        )`);
    if (partitionA7) {
      conditions.push("A7 = @partition");
      params.partition = partitionA7;
    }
    const whereClause = `WHERE ${conditions.join(" AND ")}`;
    const [countResult] = await bq.query({
      query: `SELECT COUNT(*) as total FROM ${fqTable} ${whereClause}`,
      params,
      location: "US"
    });
    const totalNeedingImages = Number(((_a = countResult[0]) == null ? void 0 : _a.total) || 0);
    if (totalNeedingImages === 0) {
      return { success: true, message: "No rows need image URLs", totalNeedingImages: 0, processed: 0, imagesCopied: 0, remaining: 0 };
    }
    const [rows] = await bq.query({
      query: `SELECT ID, A7, A8, A9, A69, A71, A72, A69_url, A71_url, A72_url 
                    FROM ${fqTable} ${whereClause}
                    ORDER BY A7, ID
                    LIMIT @batchSize OFFSET @offset`,
      params: { ...params, batchSize, offset },
      location: "US"
    });
    if (!rows.length) {
      return { success: true, message: "No more rows at this offset", totalNeedingImages, processed: 0, imagesCopied: 0, remaining: totalNeedingImages };
    }
    const drive = useDrive();
    const { uploadToGCS } = await import('../../../nitro/nitro.mjs').then(function (n) { return n.Y; });
    const ETG_FOLDER_ID = "11VajRLFO1YtFjalXkYnzJ8F75gZ1hdHJ";
    const folderRes = await drive.files.list({
      q: `'${ETG_FOLDER_ID}' in parents and name = 'Furniture_Images' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: "files(id)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    });
    const imagesFolderId = (_c = (_b = folderRes.data.files) == null ? void 0 : _b[0]) == null ? void 0 : _c.id;
    if (!imagesFolderId) {
      throw createError({ statusCode: 404, statusMessage: "Furniture_Images folder not found in Google Drive" });
    }
    const driveFileMap = /* @__PURE__ */ new Map();
    let pageToken;
    do {
      if (Date.now() - startTime > MAX_DURATION_MS) break;
      const filesRes = await drive.files.list({
        q: `'${imagesFolderId}' in parents`,
        pageSize: 1e3,
        fields: "nextPageToken, files(id, name, mimeType)",
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true
      });
      for (const f of filesRes.data.files || []) {
        driveFileMap.set(f.name, f);
      }
      pageToken = filesRes.data.nextPageToken || void 0;
    } while (pageToken);
    console.log(`  \u{1F4C2} ${driveFileMap.size} files indexed from Furniture_Images`);
    const jobs = [];
    for (const row of rows) {
      if (Date.now() - startTime > MAX_DURATION_MS) break;
      const rowId = row.ID || "";
      const a7 = row.A7 || "_";
      const a8 = row.A8 || "_";
      const a9 = row.A9 || "_";
      for (const col of IMAGE_COLUMNS) {
        const urlCol = col + "_url";
        if (row[urlCol] && row[urlCol].trim()) continue;
        const imgPath = row[col];
        if (!imgPath || !imgPath.includes("/") && !imgPath.includes(".")) continue;
        const imgFileName = imgPath.includes("/") ? imgPath.split("/").pop() || "" : imgPath;
        if (!imgFileName) continue;
        const driveFile = driveFileMap.get(imgFileName);
        if (!driveFile) continue;
        jobs.push({ rowId, a7, a8, a9, col: urlCol, imgFileName, driveFileId: driveFile.id, mimeType: driveFile.mimeType });
      }
    }
    let imagesCopied = 0;
    let imagesFailed = 0;
    const updates = [];
    async function processJob(job) {
      try {
        const dlRes = await drive.files.get(
          { fileId: job.driveFileId, alt: "media" },
          { responseType: "arraybuffer", timeout: 15e3 }
        );
        const buf = new Uint8Array(dlRes.data);
        if (buf.length > 0) {
          const ct = job.mimeType || "image/jpeg";
          const gcsPath = `furniture/${job.a7}/${job.a8}/${job.a9}/${job.imgFileName}`;
          await uploadToGCS(GCS_BUCKET, gcsPath, buf, ct);
          updates.push({ id: job.rowId, a7: job.a7, col: job.col, url: gcsPath });
          imagesCopied++;
        }
      } catch (err) {
        imagesFailed++;
        console.warn(`  \u26A0\uFE0F Failed: ${job.imgFileName}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    for (let i = 0; i < jobs.length; i += CONCURRENCY) {
      if (Date.now() - startTime > MAX_DURATION_MS) {
        console.log(`  \u23F1\uFE0F Time limit reached at image ${i}/${jobs.length}`);
        break;
      }
      const chunk = jobs.slice(i, i + CONCURRENCY);
      await Promise.all(chunk.map(processJob));
      if (imagesCopied % 10 === 0 && imagesCopied > 0) {
        console.log(`  \u{1F5BC}\uFE0F ${imagesCopied} images copied (${Math.round((Date.now() - startTime) / 1e3)}s elapsed)`);
      }
    }
    if (updates.length > 0) {
      const columnGroups = {};
      for (const u of updates) {
        if (!columnGroups[u.col]) columnGroups[u.col] = [];
        columnGroups[u.col].push({ id: u.id, a7: u.a7, url: u.url });
      }
      for (const [col, colUpdates] of Object.entries(columnGroups)) {
        const caseParts = colUpdates.map(
          (u) => `WHEN ID = '${u.id.replace(/'/g, "\\'")}' AND A7 = '${u.a7.replace(/'/g, "\\'")}' THEN '${u.url.replace(/'/g, "\\'")}'`
        ).join("\n            ");
        const idList = colUpdates.map((u) => `'${u.id.replace(/'/g, "\\'")}'`).join(",");
        try {
          await bq.query({
            query: `UPDATE ${fqTable} SET ${col} = CASE ${caseParts} ELSE ${col} END WHERE ID IN (${idList})`,
            location: "US",
            jobTimeoutMs: 3e4
          });
        } catch (err) {
          console.error(`  \u274C Failed to update ${col}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
    }
    const remaining = totalNeedingImages - offset - rows.length;
    const elapsed = Math.round((Date.now() - startTime) / 1e3);
    return {
      success: true,
      message: `Processed ${rows.length} rows, copied ${imagesCopied} images in ${elapsed}s`,
      totalNeedingImages,
      processed: rows.length,
      imagesCopied,
      imagesFailed,
      offset,
      remaining: Math.max(0, remaining),
      nextOffset: remaining > 0 ? offset + batchSize : null,
      elapsed: `${elapsed}s`
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Image sync failed:", error);
    throw createError({ statusCode: 500, statusMessage: `Image sync failed: ${message}` });
  }
});

export { syncFurnitureImages_post as default };
//# sourceMappingURL=sync-furniture-images.post.mjs.map
