import { d as defineEventHandler, g as getQuery, c as createError, u as useRuntimeConfig, i as getRequestURL } from '../../../nitro/nitro.mjs';
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

const oauthCallback_get = defineEventHandler(async (event) => {
  const { code } = getQuery(event);
  if (!code) {
    throw createError({ statusCode: 400, statusMessage: "Missing auth code" });
  }
  const { drive } = useRuntimeConfig();
  const redirectUri = `${getRequestURL(event).origin}/api/drive/oauth-callback`;
  const oauth2Client = new google.auth.OAuth2(drive.clientId, drive.clientSecret, redirectUri);
  const { tokens } = await oauth2Client.getToken(code);
  return {
    message: "\u2705 Authorization successful! Copy the refresh_token below to your .env.local file.",
    instruction: "Add this line to .env.local: NUXT_DRIVE_REFRESH_TOKEN=<paste token>",
    refresh_token: tokens.refresh_token,
    note: "You only need to do this once. Then restart the dev server."
  };
});

export { oauthCallback_get as default };
//# sourceMappingURL=oauth-callback.get.mjs.map
