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

const language_get = defineEventHandler(async () => {
  try {
    const rows = await queryBigQuery("SELECT * FROM `flutter-5e2fd.etg_database.etgLanguage`");
    return { success: true, count: rows.length, language: rows };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch language: ${message}` });
  }
});

export { language_get as default };
//# sourceMappingURL=language.get.mjs.map
