/**
 * GET /api/gcs/logos/etgLevel1/{entityId}/logo.png
 * Proxies GCS objects through the server, avoiding public bucket requirements.
 * Uses service account credentials to fetch from private GCS bucket.
 */
export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, 'path')
    if (!path) {
        throw createError({ statusCode: 400, statusMessage: 'Missing file path' })
    }

    const GCS_BUCKET = 'etg-storage'

    // Get a service account access token
    const { bigquery } = useRuntimeConfig()
    const { createSign } = await import('crypto')

    const privateKey = bigquery.privateKey?.replace(/\\n/g, '\n') || ''
    const clientEmail = bigquery.clientEmail || ''

    const now = Math.floor(Date.now() / 1000)
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
    const payload = Buffer.from(JSON.stringify({
        iss: clientEmail,
        scope: 'https://www.googleapis.com/auth/devstorage.read_only',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
    })).toString('base64url')

    const sign = createSign('RSA-SHA256')
    sign.update(`${header}.${payload}`)
    const signature = sign.sign(privateKey, 'base64url')
    const jwt = `${header}.${payload}.${signature}`

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    })
    const tokenData = await tokenRes.json() as { access_token: string }

    // Fetch the object from GCS
    const encodedPath = path.split('/').map(encodeURIComponent).join('/')
    const gcsRes = await fetch(
        `https://storage.googleapis.com/storage/v1/b/${GCS_BUCKET}/o/${encodeURIComponent(path)}?alt=media`,
        { headers: { Authorization: `Bearer ${tokenData.access_token}` } },
    )

    if (!gcsRes.ok) {
        throw createError({ statusCode: gcsRes.status, statusMessage: `GCS: ${gcsRes.statusText}` })
    }

    // Determine content type from extension
    const ext = path.split('.').pop()?.toLowerCase()
    const contentTypes: Record<string, string> = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        webp: 'image/webp',
        svg: 'image/svg+xml',
    }

    setResponseHeader(event, 'Content-Type', contentTypes[ext || ''] || 'application/octet-stream')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=86400') // Cache for 24h

    // Stream the response body
    return gcsRes.body
})
