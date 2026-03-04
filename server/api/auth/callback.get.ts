import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  const { drive } = useRuntimeConfig()
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    throw createError({ statusCode: 400, statusMessage: 'Missing authorization code' })
  }

  // Build redirect URI to match what was used in the initial auth request
  const host = getRequestHeader(event, 'host') || 'localhost:3000'
  const protocol = getRequestHeader(event, 'x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  const redirectUri = `${protocol}://${host}/api/auth/callback`

  const oauth2Client = new google.auth.OAuth2(drive.clientId, drive.clientSecret, redirectUri)

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Fetch user profile
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
    const { data: profile } = await oauth2.userinfo.get()

    if (!profile.id || !profile.email) {
      throw createError({ statusCode: 400, statusMessage: 'Could not retrieve Google profile' })
    }

    const googleId = profile.id
    const email = profile.email
    const name = profile.name || ''
    const picture = profile.picture || ''

    // ── Super admin bypass — always allowed to sign in ──
    const SUPER_ADMINS = ['admin@aivisualpro.com']
    const isSuperAdmin = SUPER_ADMINS.includes(email.toLowerCase())

    if (!isSuperAdmin) {
      // ── Check if user exists in the etgUsers table ──
      try {
        const { bigquery: bqConfig } = useRuntimeConfig()
        const dataset = bqConfig.dataset || 'etg_database'
        const project = bqConfig.projectId || 'flutter-5e2fd'

        // First check if the email exists at all
        const checkSql = `SELECT Email, Status FROM \`${project}.${dataset}.etgUsers\` WHERE LOWER(Email) = LOWER(@email) LIMIT 1`
        const existingRows = await queryBigQuery<{ Email: string, Status: boolean | string }>(checkSql, { email })

        if (existingRows.length === 0) {
          // Email NOT in the system at all
          const errorMsg = encodeURIComponent(email)
          return sendRedirect(event, `/login?error=unauthorized&email=${errorMsg}`)
        }

        // Check if user's Status is active
        const userRow = existingRows[0]
        const status = userRow.Status
        const isActive = status === true || status === 'true' || status === 'Active' || status === 'active'

        if (!isActive) {
          // User exists but is inactive — redirect with specific error
          const errorMsg = encodeURIComponent(email)
          return sendRedirect(event, `/login?error=inactive&email=${errorMsg}`)
        }
      }
      catch (err: unknown) {
        console.error('[Auth] User lookup failed:', err)
        const errorMsg = encodeURIComponent(email)
        return sendRedirect(event, `/login?error=unauthorized&email=${errorMsg}`)
      }
    }

    // ── Set auth cookie ──
    setCookie(event, 'auth_user', JSON.stringify({
      googleId,
      email,
      name,
      picture,
    }), {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
      sameSite: 'lax',
      httpOnly: false, // readable by client JS
    })

    // Redirect to dashboard
    return sendRedirect(event, '/')
  }
  catch (error: unknown) {
    console.error('[Auth Callback Error]', error)
    const message = error instanceof Error ? error.message : 'Authentication failed'
    throw createError({ statusCode: 500, statusMessage: message })
  }
})
