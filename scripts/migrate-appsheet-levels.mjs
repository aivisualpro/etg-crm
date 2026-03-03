#!/usr/bin/env node
/**
 * Migrate level1, level2, level3 from AppSheet → BigQuery
 *
 * Usage:  node scripts/migrate-appsheet-levels.mjs
 */

import { BigQuery } from '@google-cloud/bigquery'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ─── Load .env ──────────────────────────────────────────────
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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
    }
    process.env[key] = value
}

const APPSHEET_APP_ID = 'b7510e79-c7cf-416c-9b6c-4ee4247538c5'
const APPSHEET_ACCESS_KEY = 'V2-rG4Pb-U8Egw-OYr5C-yqEkB-qwebd-9tCNg-hZD5U-SJtJs'
const BQ_PROJECT_ID = process.env.NUXT_BIGQUERY_PROJECT_ID
const BQ_DATASET = process.env.NUXT_BIGQUERY_DATASET || 'etg_database'
const BQ_CLIENT_EMAIL = process.env.NUXT_BIGQUERY_CLIENT_EMAIL
const BQ_PRIVATE_KEY = (process.env.NUXT_BIGQUERY_PRIVATE_KEY || '').replace(/\\n/g, '\n')

if (!BQ_PROJECT_ID || !BQ_CLIENT_EMAIL || !BQ_PRIVATE_KEY) {
    console.error('❌ Missing BigQuery credentials in .env')
    process.exit(1)
}

const bigquery = new BigQuery({
    projectId: BQ_PROJECT_ID,
    credentials: { client_email: BQ_CLIENT_EMAIL, private_key: BQ_PRIVATE_KEY },
})
const dataset = bigquery.dataset(BQ_DATASET)

// ─── Tables to migrate ──────────────────────────────────────
const tables = [
    { appsheetTable: 'level1', bqTable: 'etgLevel1' },
    { appsheetTable: 'level2', bqTable: 'etgLevel2' },
    { appsheetTable: 'level3', bqTable: 'etgLevel3' },
]

async function fetchFromAppSheet(tableName) {
    const url = `https://api.appsheet.com/api/v2/apps/${APPSHEET_APP_ID}/tables/${tableName}/Action`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'ApplicationAccessKey': APPSHEET_ACCESS_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Action: 'Find',
            Properties: { Locale: 'en-US', Timezone: 'UTC' },
            Rows: [],
        }),
    })
    if (!response.ok) {
        const text = await response.text()
        throw new Error(`AppSheet API error (${response.status}): ${text}`)
    }
    return response.json()
}

async function migrateTable(appsheetTable, bqTable) {
    console.log(`\n${'═'.repeat(60)}`)
    console.log(`📡 Migrating: ${appsheetTable} → ${bqTable}`)
    console.log('═'.repeat(60))

    // Fetch from AppSheet
    const rows = await fetchFromAppSheet(appsheetTable)
    console.log(`✅ Fetched ${rows.length} rows from AppSheet`)

    if (rows.length === 0) {
        console.log('⚠️  No rows. Skipping.')
        return
    }

    console.log('📋 Columns:', Object.keys(rows[0]).join(', '))

    // Build schema
    const allKeys = new Set()
    for (const row of rows) {
        for (const key of Object.keys(row)) allKeys.add(key)
    }

    const columnMap = {}
    for (const key of allKeys) {
        columnMap[key] = key.replace(/[^a-zA-Z0-9_]/g, '_')
    }

    const schema = [...allKeys].map(name => ({
        name: columnMap[name],
        type: 'STRING',
        mode: 'NULLABLE',
    }))

    // Create table
    const table = dataset.table(bqTable)
    const [exists] = await table.exists()
    if (exists) {
        console.log('   Table exists — deleting...')
        await table.delete()
    }
    await dataset.createTable(bqTable, { schema: { fields: schema }, location: 'US' })
    console.log('✅ Table created')

    // Transform rows
    const bqRows = rows.map(row => {
        const cleaned = {}
        for (const [key, value] of Object.entries(row)) {
            const safeKey = columnMap[key]
            if (value === null || value === undefined) cleaned[safeKey] = null
            else if (typeof value === 'object') cleaned[safeKey] = JSON.stringify(value)
            else cleaned[safeKey] = String(value)
        }
        return cleaned
    })

    // Insert in batches
    const BATCH_SIZE = 500
    const freshTable = dataset.table(bqTable)
    for (let i = 0; i < bqRows.length; i += BATCH_SIZE) {
        const batch = bqRows.slice(i, i + BATCH_SIZE)
        try {
            await freshTable.insert(batch, { skipInvalidRows: true, ignoreUnknownValues: true })
            console.log(`   ✅ Inserted ${batch.length} rows`)
        } catch (err) {
            if (err.name === 'PartialFailureError') {
                console.log(`   ⚠️  ${batch.length - (err.errors?.length || 0)} inserted, ${err.errors?.length || 0} failed`)
            } else {
                throw err
            }
        }
    }

    console.log(`🎉 ${bqTable}: ${bqRows.length} rows migrated`)
}

// ─── Run all migrations ─────────────────────────────────────
console.log(`\n🔧 GCP Project: ${BQ_PROJECT_ID} | Dataset: ${BQ_DATASET}\n`)

for (const { appsheetTable, bqTable } of tables) {
    await migrateTable(appsheetTable, bqTable)
}

console.log(`\n${'═'.repeat(60)}`)
console.log('🎉 All level tables migrated successfully!')
console.log('═'.repeat(60) + '\n')
