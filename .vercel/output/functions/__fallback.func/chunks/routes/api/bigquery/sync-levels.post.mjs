import { d as defineEventHandler, e as useBigQuery, u as useRuntimeConfig, f as useDrive, c as createError } from '../../../nitro/nitro.mjs';
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

const syncLevels_post = defineEventHandler(async () => {
  var _a, _b;
  try {
    const APPSHEET_APP_ID = "b7510e79-c7cf-416c-9b6c-4ee4247538c5";
    const APPSHEET_ACCESS_KEY = "V2-rG4Pb-U8Egw-OYr5C-yqEkB-qwebd-9tCNg-hZD5U-SJtJs";
    const GCS_BUCKET = "etg-storage";
    const bq = useBigQuery();
    const { bigquery } = useRuntimeConfig();
    const dataset = bigquery.dataset || "etg_database";
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const tables = [
      { appsheet: "level1", bqTable: "etgLevel1", keyColumn: "A7", imageColumn: "logo", imageDriveFolder: "level1_Images", excludeColumns: [] },
      { appsheet: "level2", bqTable: "etgLevel2", keyColumn: "A8", imageColumn: "", imageDriveFolder: "", excludeColumns: [] },
      { appsheet: "level3", bqTable: "etgLevel3", keyColumn: "A9", imageColumn: "", imageDriveFolder: "", excludeColumns: [] },
      { appsheet: "Asset Category", bqTable: "etgAssetCategory", keyColumn: "A51", imageColumn: "", imageDriveFolder: "", excludeColumns: ["Label", "Related SubCategories"] },
      { appsheet: "SubCategories", bqTable: "etgSubCategories", keyColumn: "A66", imageColumn: "Image", imageDriveFolder: "SubCategories_Images", excludeColumns: ["_RowNumber", "Label", "Related Equipments", "Related Vehicles", "Related Furnitures"] },
      { appsheet: "Asset Description", bqTable: "etgAssetDescription", keyColumn: "A67", imageColumn: "Image", imageDriveFolder: "Asset Description_Images", excludeColumns: ["_RowNumber", "Label", "Related Equipments", "Related Vehicles", "Related Furnitures"] }
    ];
    const results = {};
    for (const { appsheet, bqTable, keyColumn, imageColumn, imageDriveFolder, excludeColumns } of tables) {
      const response = await fetch(
        `https://api.appsheet.com/api/v2/apps/${APPSHEET_APP_ID}/tables/${encodeURIComponent(appsheet)}/Action`,
        {
          method: "POST",
          headers: {
            "ApplicationAccessKey": APPSHEET_ACCESS_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Action: "Find",
            Properties: { Locale: "en-US", Timezone: "UTC" },
            Rows: []
          })
        }
      );
      if (!response.ok) {
        throw new Error(`AppSheet error for ${appsheet}: ${response.status}`);
      }
      const rows = await response.json();
      if (rows.length === 0) {
        results[bqTable] = { total: 0, created: 0, updated: 0, deleted: 0 };
        continue;
      }
      if (imageColumn && imageDriveFolder) {
        const drive = useDrive();
        const { uploadToGCS } = await import('../../../nitro/nitro.mjs').then(function (n) { return n.Y; });
        const ETG_FOLDER_ID = "11VajRLFO1YtFjalXkYnzJ8F75gZ1hdHJ";
        const folderRes = await drive.files.list({
          q: `'${ETG_FOLDER_ID}' in parents and name = '${imageDriveFolder}' and mimeType = 'application/vnd.google-apps.folder'`,
          fields: "files(id)",
          supportsAllDrives: true,
          includeItemsFromAllDrives: true
        });
        const imagesFolderId = (_b = (_a = folderRes.data.files) == null ? void 0 : _a[0]) == null ? void 0 : _b.id;
        if (!imagesFolderId) {
          console.warn(`  \u26A0\uFE0F ${imageDriveFolder} folder not found in Drive`);
        }
        let driveFiles = [];
        if (imagesFolderId) {
          const filesRes = await drive.files.list({
            q: `'${imagesFolderId}' in parents`,
            pageSize: 1e3,
            fields: "files(id, name, mimeType)",
            supportsAllDrives: true,
            includeItemsFromAllDrives: true
          });
          driveFiles = filesRes.data.files || [];
          console.log(`  \u{1F4C2} Found ${driveFiles.length} files in ${imageDriveFolder}`);
        }
        for (const row of rows) {
          const imgPath = row[imageColumn];
          if (!imgPath || typeof imgPath !== "string" || !imgPath.trim()) continue;
          const entityId = row[keyColumn];
          if (!entityId) continue;
          const imgFileName = imgPath.split("/").pop();
          if (!imgFileName) continue;
          const driveFile = driveFiles.find((f) => f.name === imgFileName);
          if (!driveFile) {
            console.warn(`  \u26A0\uFE0F Image not found in Drive: ${imgFileName} (${row.eng || entityId})`);
            continue;
          }
          try {
            const downloadRes = await drive.files.get(
              { fileId: driveFile.id, alt: "media" },
              { responseType: "arraybuffer" }
            );
            const imgBuffer = new Uint8Array(downloadRes.data);
            if (imgBuffer.length > 0) {
              const ext = imgFileName.split(".").pop() || "png";
              const contentType = driveFile.mimeType || (ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`);
              const gcsPath = `images/${bqTable}/${entityId}/image.${ext}`;
              await uploadToGCS(GCS_BUCKET, gcsPath, imgBuffer, contentType);
              row.image_url = gcsPath;
              console.log(`  \u2705 Image: ${row.eng || entityId} \u2192 ${gcsPath}`);
            }
          } catch (e) {
            console.warn(`  \u26A0\uFE0F Image copy failed for ${row.eng || entityId}: ${e.message}`);
          }
        }
      }
      const allKeys = /* @__PURE__ */ new Set();
      for (const row of rows) {
        for (const key of Object.keys(row)) allKeys.add(key);
      }
      if (imageColumn) allKeys.add("image_url");
      for (const col of excludeColumns) {
        allKeys.delete(col);
      }
      const columnMap = {};
      for (const key of allKeys) {
        columnMap[key] = key.replace(/[^a-zA-Z0-9_]/g, "_");
      }
      const schema = [...allKeys].map((name) => ({
        name: columnMap[name],
        type: "STRING",
        mode: "NULLABLE"
      }));
      const bqRows = rows.map((row) => {
        const cleaned = {};
        for (const [key, value] of Object.entries(row)) {
          const safeKey = columnMap[key];
          if (value === null || value === void 0) cleaned[safeKey] = null;
          else if (typeof value === "object") cleaned[safeKey] = JSON.stringify(value);
          else cleaned[safeKey] = String(value);
        }
        return cleaned;
      });
      const safeKeyColumn = columnMap[keyColumn];
      const columns = [...allKeys].map((k) => columnMap[k]);
      const dsRef = bq.dataset(dataset);
      const tableRef = dsRef.table(bqTable);
      const [exists] = await tableRef.exists();
      if (exists) {
        await tableRef.delete();
        console.log(`  \u{1F5D1}\uFE0F Dropped existing table ${bqTable}`);
      }
      await dsRef.createTable(bqTable, { schema: { fields: schema }, location: "US" });
      await new Promise((resolve) => setTimeout(resolve, 3e3));
      console.log(`  \u{1F4CB} Created table ${bqTable}`);
      const INSERT_BATCH = 150;
      for (let i = 0; i < bqRows.length; i += INSERT_BATCH) {
        const batch = bqRows.slice(i, i + INSERT_BATCH);
        const insertCols = columns.map((c) => `\`${c}\``).join(", ");
        const valueRows = batch.map((row) => {
          const vals = columns.map((col) => {
            var _a2;
            return escapeSqlValue((_a2 = row[col]) != null ? _a2 : null);
          });
          return `(${vals.join(", ")})`;
        }).join(",\n      ");
        const insertSQL = `
                    INSERT INTO \`${projectId}.${dataset}.${bqTable}\` (${insertCols})
                    VALUES ${valueRows}
                `;
        await bq.query({ query: insertSQL, location: "US" });
      }
      results[bqTable] = {
        total: bqRows.length,
        created: bqRows.length,
        updated: 0,
        deleted: 0
      };
      console.log(`  \u2705 ${bqTable}: inserted ${bqRows.length} rows`);
    }
    const total = Object.values(results).reduce((a, b) => a + b.total, 0);
    return {
      success: true,
      message: `Synced ${total} rows across ${Object.keys(results).length} tables`,
      details: results
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Sync levels failed: ${message}` });
  }
});
function escapeSqlValue(val) {
  if (val === null || val === void 0) return "CAST(NULL AS STRING)";
  const escaped = val.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r");
  return `'${escaped}'`;
}

export { syncLevels_post as default };
//# sourceMappingURL=sync-levels.post.mjs.map
