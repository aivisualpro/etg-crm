import { d as defineEventHandler, m as getRouterParam, c as createError, u as useRuntimeConfig, n as setResponseStatus, o as setResponseHeader } from '../../../nitro/nitro.mjs';
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

const ____path__get = defineEventHandler(async (event) => {
  var _a, _b;
  const path = getRouterParam(event, "path");
  if (!path) {
    throw createError({ statusCode: 400, statusMessage: "Missing file path" });
  }
  const GCS_BUCKET = "etg-storage";
  const { bigquery } = useRuntimeConfig();
  const { createSign } = await import('crypto');
  const privateKey = ((_a = bigquery.privateKey) == null ? void 0 : _a.replace(/\\n/g, "\n")) || "";
  const clientEmail = bigquery.clientEmail || "";
  const now = Math.floor(Date.now() / 1e3);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/devstorage.read_only",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  })).toString("base64url");
  const sign = createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(privateKey, "base64url");
  const jwt = `${header}.${payload}.${signature}`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`
  });
  const tokenData = await tokenRes.json();
  path.split("/").map(encodeURIComponent).join("/");
  const gcsRes = await fetch(
    `https://storage.googleapis.com/storage/v1/b/${GCS_BUCKET}/o/${encodeURIComponent(path)}?alt=media`,
    { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
  );
  if (!gcsRes.ok) {
    setResponseStatus(event, gcsRes.status);
    setResponseHeader(event, "Cache-Control", "public, max-age=3600");
    return "";
  }
  const ext = (_b = path.split(".").pop()) == null ? void 0 : _b.toLowerCase();
  const contentTypes = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml"
  };
  setResponseHeader(event, "Content-Type", contentTypes[ext || ""] || "application/octet-stream");
  setResponseHeader(event, "Cache-Control", "public, max-age=86400");
  return gcsRes.body;
});

export { ____path__get as default };
//# sourceMappingURL=_...path_.get.mjs.map
