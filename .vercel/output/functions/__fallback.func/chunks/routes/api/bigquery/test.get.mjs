import { d as defineEventHandler, u as useRuntimeConfig, h as useBigQueryDataset, c as createError } from '../../../nitro/nitro.mjs';
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

const test_get = defineEventHandler(async () => {
  try {
    const { bigquery: bqConfig } = useRuntimeConfig();
    if (!bqConfig.projectId || !bqConfig.clientEmail || !bqConfig.privateKey) {
      return {
        success: false,
        error: "Missing BigQuery credentials in runtimeConfig",
        debug: {
          projectId: bqConfig.projectId || "(empty)",
          dataset: bqConfig.dataset || "(empty)",
          clientEmail: bqConfig.clientEmail || "(empty)",
          privateKeyPresent: !!bqConfig.privateKey
        }
      };
    }
    const dataset = useBigQueryDataset();
    const [tables] = await dataset.getTables();
    return {
      success: true,
      project: bqConfig.projectId,
      dataset: bqConfig.dataset,
      tableCount: tables.length,
      tables: tables.map((t) => t.id)
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw createError({
      statusCode: 500,
      statusMessage: `BigQuery connection failed: ${message}`
    });
  }
});

export { test_get as default };
//# sourceMappingURL=test.get.mjs.map
