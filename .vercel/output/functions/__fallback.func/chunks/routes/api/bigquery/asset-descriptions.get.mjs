import { d as defineEventHandler, q as queryBigQuery, c as createError } from '../../../nitro/nitro.mjs';
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

const assetDescriptions_get = defineEventHandler(async () => {
  try {
    const [descriptions, subCategories, categories] = await Promise.all([
      queryBigQuery("SELECT * FROM `flutter-5e2fd.etg_database.etgAssetDescription` ORDER BY eng"),
      queryBigQuery("SELECT A66, eng FROM `flutter-5e2fd.etg_database.etgSubCategories`"),
      queryBigQuery("SELECT A51, eng FROM `flutter-5e2fd.etg_database.etgAssetCategory`")
    ]);
    const subCatMap = {};
    for (const r of subCategories) {
      if (r.A66) subCatMap[r.A66] = r.eng || r.A66;
    }
    const catMap = {};
    for (const r of categories) {
      if (r.A51) catMap[r.A51] = r.eng || r.A51;
    }
    const resolved = descriptions.map((row) => {
      const subCatIds = (row.A66 || "").split(",").map((s) => s.trim()).filter(Boolean);
      const subCatLabels = subCatIds.map((id) => subCatMap[id] || id).join(", ");
      return {
        ...row,
        A66_label: subCatLabels || row.A66 || ""
      };
    });
    return {
      success: true,
      descriptions: resolved,
      total: resolved.length
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch asset descriptions: ${message}` });
  }
});

export { assetDescriptions_get as default };
//# sourceMappingURL=asset-descriptions.get.mjs.map
