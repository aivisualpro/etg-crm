import { d as defineEventHandler, u as useRuntimeConfig, c as createError, i as getRequestURL, s as sendRedirect } from '../../../nitro/nitro.mjs';
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

const auth_get = defineEventHandler(async (event) => {
  const { drive } = useRuntimeConfig();
  if (!drive.clientId || !drive.clientSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Set NUXT_DRIVE_CLIENT_ID and NUXT_DRIVE_CLIENT_SECRET in .env.local first"
    });
  }
  const redirectUri = `${getRequestURL(event).origin}/api/drive/oauth-callback`;
  const oauth2Client = new google.auth.OAuth2(drive.clientId, drive.clientSecret, redirectUri);
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/drive"]
  });
  return sendRedirect(event, authUrl);
});

export { auth_get as default };
//# sourceMappingURL=auth.get.mjs.map
