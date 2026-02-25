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

    // ── Upsert user into BigQuery Users table ──
    // First check if user already exists by email
    const checkSql = `SELECT Email FROM \`appsheet-417200.SWSCRMV4.Users\` WHERE Email = @email LIMIT 1`
    const existingRows = await queryBigQuery(checkSql, { email })

    if (existingRows.length > 0) {
      // Update existing user: set Status = TRUE and update GoogleId
      const updateSql = `
        UPDATE \`appsheet-417200.SWSCRMV4.Users\`
        SET Status = TRUE
        WHERE Email = @email
      `
      await queryBigQuery(updateSql, { email })
    }
    else {
      // Insert new user with Status = TRUE
      const nameParts = name.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      const escape = (v: string) => (v || '').replace(/'/g, "\\'")

      const insertSql = `
        INSERT INTO \`appsheet-417200.SWSCRMV4.Users\`
          (\`First Name\`, \`Last Name\`, Email, Phone, Role, \`Secondary Role\`, Vendors, Department, Branch, Status, Location, UTC)
        VALUES (
          '${escape(firstName)}',
          '${escape(lastName)}',
          '${escape(email)}',
          '',
          '',
          '',
          '',
          '',
          '',
          TRUE,
          '',
          0
        )
      `
      await queryBigQuery(insertSql)
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
