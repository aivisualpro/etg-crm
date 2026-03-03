#!/usr/bin/env node
/**
 * Migrate Users from AppSheet → BigQuery
 *
 * Usage:
 *   node scripts/migrate-appsheet-users.mjs
 *
 * Prerequisites:
 *   - .env must have NUXT_BIGQUERY_* credentials configured
 *   - The service account needs BigQuery Data Editor + Job User roles
 */

import { BigQuery } from '@google-cloud/bigquery'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ─── Load .env manually (no dotenv dependency) ──────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx)
    let value = trimmed.slice(eqIdx + 1)
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
    }
    process.env[key] = value
}

// ─── AppSheet Config ────────────────────────────────────────
const APPSHEET_APP_ID = 'b7510e79-c7cf-416c-9b6c-4ee4247538c5'
const APPSHEET_ACCESS_KEY = 'V2-rG4Pb-U8Egw-OYr5C-yqEkB-qwebd-9tCNg-hZD5U-SJtJs'
const APPSHEET_TABLE = 'Users'

// ─── BigQuery Config ────────────────────────────────────────
const BQ_PROJECT_ID = process.env.NUXT_BIGQUERY_PROJECT_ID
const BQ_DATASET = process.env.NUXT_BIGQUERY_DATASET || 'etg_database'
const BQ_TABLE = 'etgusers'
const BQ_CLIENT_EMAIL = process.env.NUXT_BIGQUERY_CLIENT_EMAIL
const BQ_PRIVATE_KEY = (process.env.NUXT_BIGQUERY_PRIVATE_KEY || '').replace(/\\n/g, '\n')

if (!BQ_PROJECT_ID || !BQ_CLIENT_EMAIL || !BQ_PRIVATE_KEY) {
    console.error('❌ Missing BigQuery credentials in .env')
    process.exit(1)
}

console.log(`\n🔧 Config:`)
console.log(`   GCP Project:  ${BQ_PROJECT_ID}`)
console.log(`   Dataset:      ${BQ_DATASET}`)
console.log(`   Target Table: ${BQ_TABLE}`)
console.log(`   AppSheet App: ${APPSHEET_APP_ID}`)
console.log(`   AppSheet Tbl: ${APPSHEET_TABLE}\n`)

// ─── Step 1: Fetch all Users from AppSheet ──────────────────
console.log('📡 Fetching users from AppSheet...')

const appsheetUrl = `https://api.appsheet.com/api/v2/apps/${APPSHEET_APP_ID}/tables/${APPSHEET_TABLE}/Action`

const response = await fetch(appsheetUrl, {
    method: 'POST',
    headers: {
        'ApplicationAccessKey': APPSHEET_ACCESS_KEY,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        Action: 'Find',
        Properties: {
            Locale: 'en-US',
            Timezone: 'UTC',
        },
        Rows: [],
    }),
})

if (!response.ok) {
    const text = await response.text()
    console.error(`❌ AppSheet API error (${response.status}): ${text}`)
    process.exit(1)
}

const rows = await response.json()
console.log(`✅ Fetched ${rows.length} users from AppSheet\n`)

if (rows.length === 0) {
    console.log('⚠️  No rows to migrate. Exiting.')
    process.exit(0)
}

// Show first row keys for debugging
console.log('📋 Columns detected:', Object.keys(rows[0]).join(', '), '\n')

// ─── Step 2: Initialize BigQuery ────────────────────────────
const bigquery = new BigQuery({
    projectId: BQ_PROJECT_ID,
    credentials: {
        client_email: BQ_CLIENT_EMAIL,
        private_key: BQ_PRIVATE_KEY,
    },
})

const dataset = bigquery.dataset(BQ_DATASET)

// ─── Step 3: Build schema from AppSheet data ────────────────
// Infer schema from the first row — all fields as STRING (safest for AppSheet data)
const allKeys = new Set()
for (const row of rows) {
    for (const key of Object.keys(row)) {
        allKeys.add(key)
    }
}

const schema = [...allKeys].map(name => ({
    name: name.replace(/[^a-zA-Z0-9_]/g, '_'), // BigQuery-safe column names
    type: 'STRING',
    mode: 'NULLABLE',
}))

// Build a mapping from original AppSheet key → BigQuery-safe column name
const columnMap = {}
for (const key of allKeys) {
    columnMap[key] = key.replace(/[^a-zA-Z0-9_]/g, '_')
}

console.log('📐 Schema fields:', schema.map(s => s.name).join(', '), '\n')

// ─── Step 4: Create (or replace) the BigQuery table ─────────
console.log(`🗂️  Creating table ${BQ_DATASET}.${BQ_TABLE}...`)

const table = dataset.table(BQ_TABLE)
const [tableExists] = await table.exists()

if (tableExists) {
    console.log('   Table already exists — deleting and recreating...')
    await table.delete()
}

await dataset.createTable(BQ_TABLE, {
    schema: { fields: schema },
    location: 'US',
})
console.log('✅ Table created\n')

// ─── Step 5: Transform rows for BigQuery ────────────────────
// Convert all values to strings (BigQuery STRING columns)
const bqRows = rows.map(row => {
    const cleaned = {}
    for (const [key, value] of Object.entries(row)) {
        const safeKey = columnMap[key]
        if (value === null || value === undefined) {
            cleaned[safeKey] = null
        } else if (typeof value === 'object') {
            cleaned[safeKey] = JSON.stringify(value)
        } else {
            cleaned[safeKey] = String(value)
        }
    }
    return cleaned
})

// ─── Step 6: Insert rows in batches ─────────────────────────
const BATCH_SIZE = 500
const totalBatches = Math.ceil(bqRows.length / BATCH_SIZE)

console.log(`📤 Inserting ${bqRows.length} rows in ${totalBatches} batch(es)...`)

const freshTable = dataset.table(BQ_TABLE)

for (let i = 0; i < bqRows.length; i += BATCH_SIZE) {
    const batch = bqRows.slice(i, i + BATCH_SIZE)
    const batchNum = Math.floor(i / BATCH_SIZE) + 1

    try {
        await freshTable.insert(batch, {
            skipInvalidRows: true,
            ignoreUnknownValues: true,
        })
        console.log(`   ✅ Batch ${batchNum}/${totalBatches}: ${batch.length} rows inserted`)
    } catch (err) {
        if (err.name === 'PartialFailureError') {
            const failCount = err.errors?.length || 0
            const successCount = batch.length - failCount
            console.log(`   ⚠️  Batch ${batchNum}/${totalBatches}: ${successCount} inserted, ${failCount} failed`)
            // Show first few errors for debugging
            for (const e of (err.errors || []).slice(0, 3)) {
                console.log(`      Error: ${JSON.stringify(e.errors)}`)
            }
        } else {
            console.error(`   ❌ Batch ${batchNum} failed:`, err.message)
            throw err
        }
    }
}

console.log(`\n🎉 Migration complete! ${bqRows.length} users migrated to ${BQ_PROJECT_ID}.${BQ_DATASET}.${BQ_TABLE}`)
console.log(`\n📌 You can verify in BigQuery Console:`)
console.log(`   https://console.cloud.google.com/bigquery?project=${BQ_PROJECT_ID}&d=${BQ_DATASET}&t=${BQ_TABLE}&page=table\n`)
