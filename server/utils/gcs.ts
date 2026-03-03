/**
 * Google Cloud Storage utility using REST API
 * Uses the same service account credentials as BigQuery
 * Leverages google-auth-library (transitive dep from @google-cloud/bigquery)
 */

let _cachedToken: string = ''
let _tokenExpiry = 0

async function getAccessToken(): Promise<string> {
    if (_cachedToken && Date.now() < _tokenExpiry - 60_000) {
        return _cachedToken
    }

    const { bigquery } = useRuntimeConfig()
    const privateKey = bigquery.privateKey?.replace(/\\n/g, '\n') || ''
    const clientEmail = bigquery.clientEmail || ''

    // Create a JWT and exchange for access token using Google's OAuth2 endpoint
    const { createSign } = await import('crypto')

    const now = Math.floor(Date.now() / 1000)
    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
    const payload = Buffer.from(JSON.stringify({
        iss: clientEmail,
        scope: 'https://www.googleapis.com/auth/devstorage.read_write',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
    })).toString('base64url')

    const signInput = `${header}.${payload}`
    const sign = createSign('RSA-SHA256')
    sign.update(signInput)
    const signature = sign.sign(privateKey, 'base64url')

    const jwt = `${signInput}.${signature}`

    // Exchange JWT for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    })

    if (!tokenRes.ok) {
        throw new Error(`Token exchange failed: ${await tokenRes.text()}`)
    }

    const tokenData = await tokenRes.json() as { access_token: string }
    _cachedToken = tokenData.access_token
    _tokenExpiry = Date.now() + 3600_000
    return _cachedToken
}

/**
 * Upload a file buffer to GCS
 */
export async function uploadToGCS(
    bucket: string,
    filePath: string,
    buffer: Uint8Array,
    contentType = 'application/octet-stream',
): Promise<string> {
    const token = await getAccessToken()
    const encodedPath = encodeURIComponent(filePath)

    const res = await fetch(
        `https://storage.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${encodedPath}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': contentType,
            },
            body: buffer as any,
        },
    )

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`GCS upload failed (${res.status}): ${text}`)
    }

    // Return public URL
    return `https://storage.googleapis.com/${bucket}/${filePath}`
}

/**
 * Ensure a GCS bucket exists and is publicly readable
 */
export async function ensureBucketExists(bucket: string): Promise<void> {
    const token = await getAccessToken()
    const { bigquery } = useRuntimeConfig()

    // Check if bucket exists
    const checkRes = await fetch(
        `https://storage.googleapis.com/storage/v1/b/${bucket}`,
        { headers: { Authorization: `Bearer ${token}` } },
    )

    if (checkRes.status === 404) {
        // Create bucket
        const createRes = await fetch(
            `https://storage.googleapis.com/storage/v1/b?project=${bigquery.projectId}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: bucket,
                    location: 'US',
                    uniformBucketLevelAccess: { enabled: true },
                }),
            },
        )

        if (!createRes.ok) {
            const text = await createRes.text()
            throw new Error(`Failed to create bucket: ${text}`)
        }

        // Make bucket publicly readable
        const iamRes = await fetch(
            `https://storage.googleapis.com/storage/v1/b/${bucket}/iam`,
            { headers: { Authorization: `Bearer ${token}` } },
        )
        const iam = await iamRes.json() as { bindings: Array<{ role: string, members: string[] }> }

        iam.bindings = iam.bindings || []
        iam.bindings.push({
            role: 'roles/storage.objectViewer',
            members: ['allUsers'],
        })

        await fetch(
            `https://storage.googleapis.com/storage/v1/b/${bucket}/iam`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(iam),
            },
        )
    }
}
