import { d as defineEventHandler, g as getQuery, u as useRuntimeConfig, e as useBigQuery, c as createError, f as useDrive } from '../../../nitro/nitro.mjs';
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

const PARTITIONS = [
  { a7: "A6", sheet: "Furniture_Madinah", expected: 17134 },
  { a7: "A275", sheet: "Furniture_Hail", expected: 11622 },
  { a7: "919591d7", sheet: "Furniture_National", expected: 168 },
  { a7: "Com4", sheet: "Furniture_Com4", expected: 21933 },
  { a7: "Com5", sheet: "Furniture_Com5", expected: 25397 },
  { a7: "Com6", sheet: "Furniture_Com6", expected: 11010 },
  { a7: "Com7", sheet: "Furniture_Com7", expected: 849 },
  { a7: "Com8", sheet: "Furniture_Com8", expected: 11471 },
  { a7: "Com9", sheet: "Furniture_Com9", expected: 21964 },
  { a7: "Com10", sheet: "Furniture_Com10", expected: 9724 },
  { a7: "6691b660", sheet: "Furniture_6691b660", expected: 4636 },
  { a7: "96c8d7f4", sheet: "Furniture_96c8d7f4", expected: 46764 },
  { a7: "f5ffd16c", sheet: "Furniture_f5ffd16c", expected: 32965 },
  { a7: "73ed2936", sheet: "Furniture_73ed2936", expected: 14098 }
];
const SPREADSHEET_ID = "1EvPmbQm3mAF1gHAfGfFHb2y5PscMVTc9QwtahVdX2Ao";
const BQ_TABLE = "etgFurniture";
const COLUMNS = ["ID", "A7", "A8", "A9", "A66", "A67", "A222", "A68", "A69", "A70", "A71", "A72", "A75", "A76", "A77", "A78", "A2", "A79", "A213", "A69_url", "A71_url", "A72_url"];
const IMAGE_COLUMNS = ["A69", "A71", "A72"];
const GCS_BUCKET = "etg-storage";
const GVIZ_PAGE_SIZE = 1e4;
function csvParse(csv) {
  const rawLines = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      current += ch;
    } else if (ch === "\n" && !inQuotes) {
      rawLines.push(current);
      current = "";
    } else if (ch === "\r" && !inQuotes) ; else {
      current += ch;
    }
  }
  if (current.trim()) rawLines.push(current);
  if (rawLines.length < 2) return [];
  const headers = parseLine(rawLines[0] || "");
  const rows = [];
  for (let i = 1; i < rawLines.length; i++) {
    const line = rawLines[i];
    if (!line || !line.trim()) continue;
    const values = parseLine(line);
    const row = {};
    for (let j = 0; j < headers.length; j++) row[headers[j] || `col${j}`] = values[j] || "";
    rows.push(row);
  }
  return rows;
}
function parseLine(line) {
  const values = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else inQ = !inQ;
    } else if (ch === "," && !inQ) {
      values.push(cur);
      cur = "";
    } else cur += ch;
  }
  values.push(cur);
  return values;
}
function escapeSQL(v) {
  if (!v || v === "") return "NULL";
  return `'${v.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}
async function getSheetsToken(bigquery) {
  var _a;
  const privateKey = ((_a = bigquery.privateKey) == null ? void 0 : _a.replace(/\\n/g, "\n")) || "";
  const clientEmail = bigquery.clientEmail || "";
  const { createSign } = await import('crypto');
  const now = Math.floor(Date.now() / 1e3);
  const jwtH = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const jwtP = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  })).toString("base64url");
  const signer = createSign("RSA-SHA256");
  signer.update(`${jwtH}.${jwtP}`);
  const jwtS = signer.sign(privateKey, "base64url");
  const jwt = `${jwtH}.${jwtP}.${jwtS}`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const { access_token } = await tokenRes.json();
  return access_token;
}
async function getSheetRowCount(sheetName, token) {
  const tq = encodeURIComponent("select count(A) ");
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&tq=${tq}`;
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return -1;
    const csv = await res.text();
    const lines = csv.trim().split("\n");
    if (lines.length >= 2) {
      const countStr = (lines[1] || "").replace(/"/g, "").trim();
      return Number(countStr) || 0;
    }
    return 0;
  } catch {
    return -1;
  }
}
async function fetchSheetRows(sheetName, a7, token, startOffset = 0) {
  const rows = [];
  let offset = startOffset;
  while (true) {
    const tq = encodeURIComponent(`select * limit ${GVIZ_PAGE_SIZE} offset ${offset}`);
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}&tq=${tq}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) break;
    const pageRows = csvParse(await res.text());
    for (const row of pageRows) {
      if (!row.A7) row.A7 = a7;
    }
    rows.push(...pageRows);
    console.log(`  \u{1F4C4} Offset ${offset}: ${pageRows.length} rows (batch total: ${rows.length})`);
    if (pageRows.length < GVIZ_PAGE_SIZE) break;
    offset += GVIZ_PAGE_SIZE;
  }
  return rows;
}
function deduplicateRows(rows) {
  const seen = /* @__PURE__ */ new Set();
  const unique = [];
  for (const row of rows) {
    const key = (row.A70 || "").trim();
    if (!key) continue;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(row);
    }
  }
  return unique;
}
const syncFurniture_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const query = getQuery(event);
    const partitionIdx = query.partition;
    const syncMode = query.mode || "full";
    const syncImages = query.images === "true";
    const { bigquery } = useRuntimeConfig();
    const projectId = bigquery.projectId || "flutter-5e2fd";
    const dataset = bigquery.dataset || "etg_database";
    const bq = useBigQuery();
    const fqTable = `\`${projectId}.${dataset}.${BQ_TABLE}\``;
    if (partitionIdx === void 0 || partitionIdx === "list") {
      let bqCounts = {};
      let bqTotal = 0;
      try {
        const [countRows] = await bq.query({
          query: `SELECT A7, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7`,
          location: "US"
        });
        for (const r of countRows) {
          bqCounts[r.A7] = Number(r.cnt);
          bqTotal += Number(r.cnt);
        }
      } catch {
      }
      const token2 = await getSheetsToken(bigquery);
      const sheetCountPromises = PARTITIONS.map(async (p) => {
        const sheetCount = await getSheetRowCount(p.sheet, token2);
        return { ...p, sheetCount };
      });
      const partitionsWithCounts = await Promise.all(sheetCountPromises);
      const result = partitionsWithCounts.map((p, i) => {
        const bqCount = bqCounts[p.a7] || 0;
        const sheetCount = p.sheetCount;
        const diff = sheetCount - bqCount;
        return {
          index: i,
          a7: p.a7,
          sheet: p.sheet,
          expected: p.expected,
          sheetCount,
          // actual count from Google Sheets right now
          bqCount,
          // current count in BigQuery
          diff,
          // positive = BQ needs more, negative = BQ has extras
          status: diff === 0 ? "synced" : diff > 0 ? "behind" : "excess",
          needsSync: diff !== 0
        };
      });
      const totalSheet = result.reduce((s, r) => s + (r.sheetCount > 0 ? r.sheetCount : 0), 0);
      const needsSync = result.filter((r) => r.needsSync);
      return {
        success: true,
        partitions: result,
        total: PARTITIONS.length,
        bqTotal,
        sheetTotal: totalSheet,
        diff: totalSheet - bqTotal,
        needsSyncCount: needsSync.length,
        allSynced: needsSync.length === 0
      };
    }
    if (partitionIdx === "smart") {
      const token2 = await getSheetsToken(bigquery);
      let bqCounts = {};
      try {
        const [countRows] = await bq.query({
          query: `SELECT A7, COUNT(*) as cnt FROM ${fqTable} GROUP BY A7`,
          location: "US"
        });
        for (const r of countRows) {
          bqCounts[r.A7] = Number(r.cnt);
        }
      } catch {
      }
      const schema2 = COLUMNS.map((col) => ({ name: col, type: "STRING", mode: "NULLABLE" }));
      try {
        await bq.dataset(dataset).table(BQ_TABLE).get();
      } catch {
        await bq.dataset(dataset).createTable(BQ_TABLE, { schema: { fields: schema2 } });
      }
      const results = [];
      let totalSynced = 0;
      let skipped = 0;
      for (let i = 0; i < PARTITIONS.length; i++) {
        const p = PARTITIONS[i];
        const bqCount = bqCounts[p.a7] || 0;
        const sheetCount = await getSheetRowCount(p.sheet, token2);
        if (sheetCount === bqCount && sheetCount > 0) {
          console.log(`  \u2705 ${p.sheet}: ${bqCount} rows \u2014 in sync, SKIPPING`);
          results.push({ sheet: p.sheet, a7: p.a7, action: "skipped", sheetCount, bqCount, synced: 0 });
          skipped++;
          continue;
        }
        if (sheetCount > bqCount && bqCount > 0 && syncMode === "delta") {
          console.log(`  \u{1F4E5} ${p.sheet}: ${bqCount} \u2192 ${sheetCount} (+${sheetCount - bqCount} new rows) \u2014 DELTA SYNC`);
          const newRows = await fetchSheetRows(p.sheet, p.a7, token2, bqCount);
          const unique3 = deduplicateRows(newRows);
          if (unique3.length > 0) {
            const inserted3 = await insertRows(bq, fqTable, unique3);
            totalSynced += inserted3;
            results.push({ sheet: p.sheet, a7: p.a7, action: "delta", sheetCount, bqCount, synced: inserted3 });
          } else {
            results.push({ sheet: p.sheet, a7: p.a7, action: "delta-empty", sheetCount, bqCount, synced: 0 });
          }
          continue;
        }
        console.log(`  \u{1F504} ${p.sheet}: BQ=${bqCount} vs Sheet=${sheetCount} \u2014 FULL RESYNC`);
        const allRows = await fetchSheetRows(p.sheet, p.a7, token2);
        const unique2 = deduplicateRows(allRows);
        try {
          await bq.query({ query: `DELETE FROM ${fqTable} WHERE A7 = '${p.a7}'`, location: "US" });
        } catch {
        }
        const inserted2 = await insertRows(bq, fqTable, unique2);
        totalSynced += inserted2;
        results.push({ sheet: p.sheet, a7: p.a7, action: "full", sheetCount, bqCount, synced: inserted2 });
      }
      return {
        success: true,
        message: `Smart sync complete: ${totalSynced} rows synced, ${skipped}/${PARTITIONS.length} partitions skipped (already in sync)`,
        results,
        totalSynced,
        skipped,
        partitionsProcessed: PARTITIONS.length - skipped
      };
    }
    const idx = Number(partitionIdx);
    if (isNaN(idx) || idx < 0 || idx >= PARTITIONS.length) {
      throw createError({ statusCode: 400, statusMessage: `Invalid partition: ${partitionIdx}` });
    }
    const partition = PARTITIONS[idx];
    const token = await getSheetsToken(bigquery);
    console.log(`
\u2550\u2550\u2550 Furniture Sync: ${partition.sheet} (${idx + 1}/${PARTITIONS.length}) \u2550\u2550\u2550`);
    const schema = COLUMNS.map((col) => ({ name: col, type: "STRING", mode: "NULLABLE" }));
    try {
      await bq.dataset(dataset).table(BQ_TABLE).get();
    } catch {
      await bq.dataset(dataset).createTable(BQ_TABLE, { schema: { fields: schema } });
    }
    let currentBqCount = 0;
    try {
      const [r] = await bq.query({
        query: `SELECT COUNT(*) as cnt FROM ${fqTable} WHERE A7 = @a7`,
        params: { a7: partition.a7 },
        location: "US"
      });
      currentBqCount = Number(((_a = r[0]) == null ? void 0 : _a.cnt) || 0);
    } catch {
    }
    let rows;
    let isDelta = false;
    if (syncMode === "delta" && currentBqCount > 0) {
      console.log(`  \u{1F4E5} Delta mode: fetching rows after offset ${currentBqCount}`);
      rows = await fetchSheetRows(partition.sheet, partition.a7, token, currentBqCount);
      isDelta = true;
    } else {
      rows = await fetchSheetRows(partition.sheet, partition.a7, token);
    }
    console.log(`  \u2705 ${partition.sheet}: ${rows.length} rows fetched`);
    if (rows.length === 0 && isDelta) {
      return {
        success: true,
        message: `${partition.sheet}: already in sync (${currentBqCount} rows)`,
        partition: partition.a7,
        sheet: partition.sheet,
        count: currentBqCount,
        action: "skipped",
        index: idx,
        totalPartitions: PARTITIONS.length
      };
    }
    if (rows.length === 0) {
      return { success: true, message: `${partition.sheet}: no data`, partition: partition.a7, count: 0, index: idx, imagesCopied: 0 };
    }
    const unique = deduplicateRows(rows);
    const dupsRemoved = rows.length - unique.length;
    if (dupsRemoved > 0) {
      console.log(`  \u{1F9F9} Removed ${dupsRemoved} duplicates (${rows.length} \u2192 ${unique.length})`);
    }
    if (!isDelta) {
      try {
        await bq.query({ query: `DELETE FROM ${fqTable} WHERE A7 = '${partition.a7}'`, location: "US" });
      } catch {
      }
    }
    const inserted = await insertRows(bq, fqTable, unique);
    let imagesCopied = 0;
    if (syncImages) {
      imagesCopied = await copyImages(unique);
    }
    return {
      success: true,
      message: `${partition.sheet}: ${inserted} rows ${isDelta ? "added" : "synced"}${imagesCopied > 0 ? `, ${imagesCopied} images` : ""}`,
      partition: partition.a7,
      sheet: partition.sheet,
      count: inserted,
      action: isDelta ? "delta" : "full",
      dupsRemoved,
      imagesCopied,
      index: idx,
      totalPartitions: PARTITIONS.length
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Furniture sync failed:", error);
    throw createError({ statusCode: 500, statusMessage: `Furniture sync failed: ${message}` });
  }
});
async function insertRows(bq, fqTable, rows) {
  const BATCH_SIZE = 1e3;
  let inserted = 0;
  let failedBatches = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const valueRows = batch.map((row) => {
      const vals = COLUMNS.map((col) => escapeSQL(row[col]));
      return `(${vals.join(",")})`;
    });
    let success = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await bq.query({
          query: `INSERT INTO ${fqTable} (${COLUMNS.join(",")}) VALUES ${valueRows.join(",")}`,
          location: "US",
          jobTimeoutMs: 12e4
        });
        inserted += batch.length;
        success = true;
        break;
      } catch (batchErr) {
        const msg = batchErr instanceof Error ? batchErr.message : String(batchErr);
        if (attempt < 2) {
          console.warn(`  \u26A0\uFE0F Batch ${Math.floor(i / BATCH_SIZE) + 1} attempt ${attempt + 1} failed: ${msg}. Retrying...`);
          await new Promise((r) => setTimeout(r, 2e3 * (attempt + 1)));
        } else {
          console.error(`  \u274C Batch ${Math.floor(i / BATCH_SIZE) + 1} failed after 3 attempts: ${msg}`);
          failedBatches++;
        }
      }
    }
    if (inserted % 5e3 === 0 || i + BATCH_SIZE >= rows.length) {
      console.log(`  \u{1F4E5} ${inserted} / ${rows.length} inserted${failedBatches > 0 ? ` (${failedBatches} failed)` : ""}`);
    }
  }
  return inserted;
}
async function copyImages(rows) {
  var _a, _b;
  let imagesCopied = 0;
  try {
    const drive = useDrive();
    const { uploadToGCS } = await import('../../../nitro/nitro.mjs').then(function (n) { return n.Y; });
    const ETG_FOLDER_ID = "11VajRLFO1YtFjalXkYnzJ8F75gZ1hdHJ";
    const folderRes = await drive.files.list({
      q: `'${ETG_FOLDER_ID}' in parents and name = 'Furniture_Images' and mimeType = 'application/vnd.google-apps.folder'`,
      fields: "files(id)",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    });
    const imagesFolderId = (_b = (_a = folderRes.data.files) == null ? void 0 : _a[0]) == null ? void 0 : _b.id;
    if (!imagesFolderId) return 0;
    const driveFileMap = /* @__PURE__ */ new Map();
    let pageToken;
    do {
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
    for (const row of rows) {
      for (const col of IMAGE_COLUMNS) {
        const imgPath = row[col];
        if (!imgPath || !imgPath.includes("/")) continue;
        const imgFileName = imgPath.split("/").pop();
        if (!imgFileName) continue;
        const driveFile = driveFileMap.get(imgFileName);
        if (!driveFile) continue;
        try {
          const dlRes = await drive.files.get(
            { fileId: driveFile.id, alt: "media" },
            { responseType: "arraybuffer" }
          );
          const buf = new Uint8Array(dlRes.data);
          if (buf.length > 0) {
            const ct = driveFile.mimeType || "image/jpeg";
            const gcsPath = `furniture/${row.A7 || "_"}/${row.A8 || "_"}/${row.A9 || "_"}/${imgFileName}`;
            await uploadToGCS(GCS_BUCKET, gcsPath, buf, ct);
            row[col + "_url"] = gcsPath;
            imagesCopied++;
          }
        } catch {
        }
      }
    }
  } catch (err) {
    console.warn(`  \u26A0\uFE0F Image copy error: ${err instanceof Error ? err.message : String(err)}`);
  }
  return imagesCopied;
}

export { syncFurniture_post as default };
//# sourceMappingURL=sync-furniture.post.mjs.map
