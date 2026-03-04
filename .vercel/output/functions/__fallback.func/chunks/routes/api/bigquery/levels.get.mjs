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

const levels_get = defineEventHandler(async () => {
  try {
    const [level1, level2, level3, langRows] = await Promise.all([
      queryBigQuery("SELECT * FROM `flutter-5e2fd.etg_database.etgLevel1` ORDER BY eng"),
      queryBigQuery("SELECT * FROM `flutter-5e2fd.etg_database.etgLevel2` ORDER BY eng"),
      queryBigQuery("SELECT * FROM `flutter-5e2fd.etg_database.etgLevel3` ORDER BY eng"),
      queryBigQuery("SELECT ID, eng, arabic FROM `flutter-5e2fd.etg_database.etgLanguage`")
    ]);
    const langMap = {};
    for (const r of langRows) {
      if (r.ID) langMap[r.ID] = r.eng || r.ID;
    }
    const level1Map = {};
    for (const r of level1) {
      if (r.A7) level1Map[r.A7] = r.eng || r.A7;
    }
    const level2Map = {};
    for (const r of level2) {
      if (r.A8) level2Map[r.A8] = r.eng || r.A8;
    }
    const resolvedLevel2 = level2.map((row) => ({
      ...row,
      A7_label: level1Map[row.A7] || langMap[row.A7] || row.A7 || ""
    }));
    const resolvedLevel3 = level3.map((row) => ({
      ...row,
      A7_label: level1Map[row.A7] || langMap[row.A7] || row.A7 || "",
      A8_label: level2Map[row.A8] || langMap[row.A8] || row.A8 || ""
    }));
    return {
      success: true,
      level1,
      level2: resolvedLevel2,
      level3: resolvedLevel3
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch levels: ${message}` });
  }
});

export { levels_get as default };
//# sourceMappingURL=levels.get.mjs.map
