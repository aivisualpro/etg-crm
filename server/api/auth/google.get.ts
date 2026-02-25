import { google } from 'googleapis'

export default defineEventHandler((event) => {
  const { drive } = useRuntimeConfig()

  if (!drive.clientId || !drive.clientSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google OAuth not configured. Set NUXT_DRIVE_CLIENT_ID and NUXT_DRIVE_CLIENT_SECRET.',
    })
  }

  // Build the redirect URI dynamically from the incoming request
  const host = getRequestHeader(event, 'host') || 'localhost:3000'
  const protocol = getRequestHeader(event, 'x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  const redirectUri = `${protocol}://${host}/api/auth/callback`

  const oauth2Client = new google.auth.OAuth2(drive.clientId, drive.clientSecret, redirectUri)

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    prompt: 'select_account',
  })

  return sendRedirect(event, authUrl)
})
