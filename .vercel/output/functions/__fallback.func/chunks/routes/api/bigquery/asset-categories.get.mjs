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

const assetCategories_get = defineEventHandler(async () => {
  try {
    const [categories, subCategories] = await Promise.all([
      queryBigQuery("SELECT * FROM `flutter-5e2fd.etg_database.etgAssetCategory` ORDER BY eng"),
      queryBigQuery("SELECT * FROM `flutter-5e2fd.etg_database.etgSubCategories` ORDER BY eng")
    ]);
    const categoryMap = {};
    for (const r of categories) {
      if (r.A51) categoryMap[r.A51] = r.eng || r.arabic || r.A51;
    }
    const resolvedSubCategories = subCategories.map((row) => ({
      ...row,
      A51_label: categoryMap[row.A51] || row.A51 || ""
    }));
    return {
      success: true,
      categories,
      subCategories: resolvedSubCategories
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch asset categories: ${message}` });
  }
});

export { assetCategories_get as default };
//# sourceMappingURL=asset-categories.get.mjs.map
