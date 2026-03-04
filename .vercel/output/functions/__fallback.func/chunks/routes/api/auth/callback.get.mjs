import { d as defineEventHandler, u as useRuntimeConfig, g as getQuery, c as createError, a as getRequestHeader, q as queryBigQuery, s as sendRedirect, b as setCookie } from '../../../nitro/nitro.mjs';
import { google } from 'googleapis';
import '@google-cloud/bigquery';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';

const callback_get = defineEventHandler(async (event) => {
  const { drive } = useRuntimeConfig();
  const query = getQuery(event);
  const code = query.code;
  if (!code) {
    throw createError({ statusCode: 400, statusMessage: "Missing authorization code" });
  }
  const host = getRequestHeader(event, "host") || "localhost:3000";
  const protocol = getRequestHeader(event, "x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const redirectUri = `${protocol}://${host}/api/auth/callback`;
  const oauth2Client = new google.auth.OAuth2(drive.clientId, drive.clientSecret, redirectUri);
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: profile } = await oauth2.userinfo.get();
    if (!profile.id || !profile.email) {
      throw createError({ statusCode: 400, statusMessage: "Could not retrieve Google profile" });
    }
    const googleId = profile.id;
    const email = profile.email;
    const name = profile.name || "";
    const picture = profile.picture || "";
    const SUPER_ADMINS = ["admin@aivisualpro.com"];
    const isSuperAdmin = SUPER_ADMINS.includes(email.toLowerCase());
    if (!isSuperAdmin) {
      try {
        const { bigquery: bqConfig } = useRuntimeConfig();
        const dataset = bqConfig.dataset || "etg_database";
        const project = bqConfig.projectId || "flutter-5e2fd";
        const checkSql = `SELECT email, Status FROM \`${project}.${dataset}.etgusers\` WHERE LOWER(email) = LOWER(@email) LIMIT 1`;
        const existingRows = await queryBigQuery(checkSql, { email });
        if (existingRows.length === 0) {
          const errorMsg = encodeURIComponent(email);
          return sendRedirect(event, `/login?error=unauthorized&email=${errorMsg}`);
        }
        const userRow = existingRows[0];
        const status = userRow.Status;
        const isActive = status === true || status === "true" || status === "Active" || status === "active";
        if (!isActive) {
          const errorMsg = encodeURIComponent(email);
          return sendRedirect(event, `/login?error=inactive&email=${errorMsg}`);
        }
      } catch (err) {
        console.error("[Auth] User lookup failed:", err);
        const errorMsg = encodeURIComponent(email);
        return sendRedirect(event, `/login?error=unauthorized&email=${errorMsg}`);
      }
    }
    setCookie(event, "auth_user", JSON.stringify({
      googleId,
      email,
      name,
      picture
    }), {
      maxAge: 60 * 60 * 24 * 30,
      // 30 days
      path: "/",
      sameSite: "lax",
      httpOnly: false
      // readable by client JS
    });
    return sendRedirect(event, "/");
  } catch (error) {
    console.error("[Auth Callback Error]", error);
    const message = error instanceof Error ? error.message : "Authentication failed";
    throw createError({ statusCode: 500, statusMessage: message });
  }
});

export { callback_get as default };
//# sourceMappingURL=callback.get.mjs.map
