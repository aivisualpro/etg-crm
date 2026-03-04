import { d as defineEventHandler, g as getQuery, u as useRuntimeConfig, e as useBigQuery, c as createError } from '../../../nitro/nitro.mjs';
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

const furniture_get = defineEventHandler(async (event) => {
  var _a;
  try {
    const query = getQuery(event);
    const a7 = query.a7 || "";
    const a8 = query.a8 || "";
    const a9 = query.a9 || "";
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(1e4, Math.max(10, Number(query.limit) || 100));
    const search = (query.search || "").trim();
    const offset = (page - 1) * limit;
    const { bigquery } = useRuntimeConfig();
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const dataset = bigquery.dataset || "etg_database";
    const table = `\`${projectId}.${dataset}.etgFurniture\``;
    const conditions = [];
    const params = {};
    if (a7) {
      conditions.push("A7 = @a7");
      params.a7 = a7;
    }
    if (a8) {
      conditions.push("A8 = @a8");
      params.a8 = a8;
    }
    if (a9) {
      conditions.push("A9 = @a9");
      params.a9 = a9;
    }
    const dateFilter = (query.dateFilter || "").trim();
    if (search) {
      conditions.push("(LOWER(ID) LIKE @search OR LOWER(A70) LIKE @search OR LOWER(A75) LIKE @search OR LOWER(A222) LIKE @search OR LOWER(A68) LIKE @search)");
      params.search = `%${search.toLowerCase()}%`;
    }
    if (dateFilter && dateFilter !== "all") {
      const dateCond = buildDateCondition(dateFilter);
      if (dateCond) conditions.push(dateCond);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const baseConds = conditions.filter((c) => !c.includes("PARSE_TIMESTAMP"));
    const baseWhere = baseConds.length > 0 ? `WHERE ${baseConds.join(" AND ")}` : "";
    const countSQL = `SELECT COUNT(*) as total FROM ${table} ${whereClause}`;
    const [countResult] = await useBigQuery().query({ query: countSQL, params, location: "US" });
    const total = Number(((_a = countResult[0]) == null ? void 0 : _a.total) || 0);
    const dataSQL = `SELECT * FROM ${table} ${whereClause} ORDER BY A7, A70 LIMIT @limit OFFSET @offset`;
    const [rows] = await useBigQuery().query({
      query: dataSQL,
      params: { ...params, limit, offset },
      location: "US"
    });
    let partitionCounts = {};
    if (!a7) {
      const countsSQL = `SELECT A7, COUNT(*) as cnt FROM ${table} GROUP BY A7 ORDER BY cnt DESC`;
      const [countRows] = await useBigQuery().query({ query: countsSQL, location: "US" });
      for (const r of countRows) {
        partitionCounts[r.A7] = Number(r.cnt);
      }
    }
    let dateCounts = {};
    try {
      const dateCountSQL = `
                WITH parsed AS (
                    SELECT SAFE.PARSE_TIMESTAMP('%m/%d/%Y %H:%M:%S', A213) AS ts
                    FROM ${table} ${baseWhere}
                )
                SELECT
                    COUNT(*) as total,
                    COUNTIF(ts >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY)) as today,
                    COUNTIF(ts >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), ISOWEEK)) as week,
                    COUNTIF(ts >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), MONTH)) as month,
                    COUNTIF(CAST(ts AS DATE) >= DATE_TRUNC(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH), MONTH)
                        AND CAST(ts AS DATE) < DATE_TRUNC(CURRENT_DATE(), MONTH)) as lastMonth,
                    COUNTIF(ts >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), YEAR)) as year
                FROM parsed
            `;
      const [dcResult] = await useBigQuery().query({ query: dateCountSQL, params, location: "US" });
      if (dcResult == null ? void 0 : dcResult[0]) {
        const r = dcResult[0];
        dateCounts = {
          all: Number(r.total || 0),
          today: Number(r.today || 0),
          week: Number(r.week || 0),
          month: Number(r.month || 0),
          lastMonth: Number(r.lastMonth || 0),
          year: Number(r.year || 0)
        };
      }
    } catch (e) {
      console.error("Date counts query failed:", e instanceof Error ? e.message : e);
    }
    return {
      success: true,
      rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      partitionCounts,
      dateCounts
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message.includes("Not found")) {
      return { success: true, rows: [], total: 0, page: 1, limit: 100, totalPages: 0, partitionCounts: {}, dateCounts: {} };
    }
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch furniture: ${message}` });
  }
});
function buildDateCondition(filter) {
  const ts = `SAFE.PARSE_TIMESTAMP('%m/%d/%Y %H:%M:%S', A213)`;
  switch (filter) {
    case "today":
      return `${ts} >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY)`;
    case "week":
      return `${ts} >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), ISOWEEK)`;
    case "month":
      return `${ts} >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), MONTH)`;
    case "lastMonth":
      return `CAST(${ts} AS DATE) >= DATE_TRUNC(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH), MONTH) AND CAST(${ts} AS DATE) < DATE_TRUNC(CURRENT_DATE(), MONTH)`;
    case "year":
      return `${ts} >= TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), YEAR)`;
    default:
      return null;
  }
}

export { furniture_get as default };
//# sourceMappingURL=furniture.get.mjs.map
