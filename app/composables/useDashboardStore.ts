/**
 * Global Dashboard Data Store
 *
 * Prefetches and caches all shared data (projects, users, customers)
 * at app startup. Every page consumes cached data instantly — no loading spinners.
 *
 * Data is auto-refreshed every 5 minutes in the background.
 */

const _projects = ref<any[]>([])
const _users = ref<any[]>([])
const _customers = ref<any[]>([])
const _permits = ref<any[]>([])
const _roles = ref<any[]>([])

// Furniture lookup data
const _level1Map = ref<Record<string, { logo: string, eng: string, arabic: string }>>({})
const _level2Map = ref<Record<string, { eng: string, arabic: string }>>({})
const _level3Map = ref<Record<string, { eng: string, arabic: string }>>({})
const _subCatMap = ref<Record<string, { eng: string, arabic: string }>>({})
const _assetDescMap = ref<Record<string, { eng: string, arabic: string }>>({})
const _furnitureUsersMap = ref<Record<string, string>>({})

// Raw lists for admin pages
const _level1List = ref<any[]>([])
const _level2List = ref<any[]>([])
const _level3List = ref<any[]>([])
const _categories = ref<any[]>([])
const _subCategories = ref<any[]>([])
const _assetDescriptions = ref<any[]>([])
const _language = ref<any[]>([])

const _userNameMap = ref<Record<string, string>>({})
const _customerNameMap = ref<Record<string, string>>({})
const _projectMap = ref<Record<string, any>>({})

const _ready = ref(false)
const _fetching = ref(false)
const _lastFetched = ref(0)

// ─── Furniture rows cache (lazy-loaded, not at startup) ─────
const _furnitureRows = ref<any[]>([])
const _furnitureRowsReady = ref(false)
const _furnitureRowsFetching = ref(false)
const _furnitureRowsProgress = ref(0)
let _furnitureRowsRefreshTimer: ReturnType<typeof setInterval> | null = null

const FURNITURE_BATCH = 5000

async function _fetchFurnitureRows() {
    if (_furnitureRowsFetching.value) return
    _furnitureRowsFetching.value = true
    _furnitureRowsProgress.value = 0
    try {
        const first = await $fetch<{ success: boolean, rows: any[], total: number }>('/api/bigquery/furniture', { params: { limit: FURNITURE_BATCH, page: 1 } })
        const allRows: any[] = first.rows || []
        const totalRows = first.total || 0
        const totalPages = Math.ceil(totalRows / FURNITURE_BATCH)
        _furnitureRowsProgress.value = Math.round((1 / Math.max(totalPages, 1)) * 100)

        if (totalPages > 1) {
            const WAVE = 6
            for (let start = 2; start <= totalPages; start += WAVE) {
                const wave = []
                for (let p = start; p <= Math.min(start + WAVE - 1, totalPages); p++) {
                    wave.push(
                        $fetch<{ rows: any[] }>('/api/bigquery/furniture', { params: { limit: FURNITURE_BATCH, page: p } }),
                    )
                }
                const results = await Promise.all(wave)
                for (const pg of results) allRows.push(...(pg.rows || []))
                _furnitureRowsProgress.value = Math.round((Math.min(start + WAVE - 1, totalPages) / totalPages) * 100)
            }
        }

        _furnitureRows.value = allRows
        _furnitureRowsProgress.value = 100
    }
    catch (e) {
        console.error('Failed to fetch furniture rows:', e)
    }
    finally {
        _furnitureRowsFetching.value = false
        _furnitureRowsReady.value = true
    }
}

let _refreshTimer: ReturnType<typeof setInterval> | null = null

function _buildMaps() {
    // User name map — try Email-based first, fall back to AppSheet A2 (name) field
    _userNameMap.value = Object.fromEntries(
        _users.value
            .filter((u: any) => u.Email || u.A2)
            .map((u: any) => {
                const key = (u.Email || u.A2 || '').toLowerCase()
                const name = u['First Name'] && u['Last Name']
                    ? [u['First Name'], u['Last Name']].filter(Boolean).join(' ')
                    : u.A2 || u.Email || key
                return [key, name]
            }),
    )

    // Customer name map (Customer ID → display name, title-cased)
    const titleCase = (s: string) => s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    _customerNameMap.value = Object.fromEntries(
        _customers.value
            .filter((c: any) => c['Customer ID'])
            .map((c: any) => [
                c['Customer ID'],
                titleCase([c['First Name'], c['Last Name']].filter(Boolean).join(' ') || c['Customer ID']),
            ]),
    )

    // Project map (Project ID → project object)
    _projectMap.value = Object.fromEntries(
        _projects.value
            .filter((p: any) => p['Project ID'])
            .map((p: any) => [p['Project ID'], p]),
    )
}

async function _fetchAll() {
    if (_fetching.value) return
    _fetching.value = true
    try {
        const [projData, userData, custData, permitsData, rolesData, levelsData, catData, descData, langData] = await Promise.all([
            $fetch<{ success: boolean, projects: any[] }>('/api/bigquery/projects').catch(() => ({ success: false, projects: [] })),
            $fetch<{ success: boolean, users: any[] }>('/api/bigquery/users').catch(() => ({ success: false, users: [] })),
            $fetch<{ success: boolean, customers: any[] }>('/api/bigquery/customers').catch(() => ({ success: false, customers: [] })),
            $fetch<{ success: boolean, permits: any[] }>('/api/bigquery/permits').catch(() => ({ success: false, permits: [] })),
            $fetch<{ success: boolean, roles: any[] }>('/api/bigquery/roles').catch(() => ({ success: false, roles: [] })),
            $fetch<{ success: boolean, level1: any[], level2: any[], level3: any[] }>('/api/bigquery/levels').catch(() => ({ success: false, level1: [], level2: [], level3: [] })),
            $fetch<{ success: boolean, categories: any[], subCategories: any[] }>('/api/bigquery/asset-categories').catch(() => ({ success: false, categories: [], subCategories: [] })),
            $fetch<{ success: boolean, descriptions: any[] }>('/api/bigquery/asset-descriptions').catch(() => ({ success: false, descriptions: [] })),
            $fetch<{ success: boolean, language: any[] }>('/api/bigquery/language').catch(() => ({ success: false, language: [] })),
        ])
        if (projData.success) _projects.value = projData.projects
        if (userData.success) _users.value = userData.users
        if (custData.success) _customers.value = custData.customers
        if (permitsData.success) _permits.value = permitsData.permits
        if (rolesData.success) _roles.value = rolesData.roles

        // Build furniture lookup maps + store raw lists
        if (levelsData.success) {
            _level1List.value = levelsData.level1 || []
            _level2List.value = levelsData.level2 || []
            _level3List.value = levelsData.level3 || []
            const m1: Record<string, { logo: string, eng: string, arabic: string }> = {}
            for (const r of levelsData.level1 || []) {
                if (r.A7) m1[r.A7] = { logo: r.image_url || r.logo || '', eng: r.eng || r.A7, arabic: r.arabic || r.A7 }
            }
            _level1Map.value = m1
            const m2: Record<string, { eng: string, arabic: string }> = {}
            for (const r of levelsData.level2 || []) {
                if (r.A8) m2[r.A8] = { eng: r.eng || r.A8, arabic: r.arabic || r.A8 }
            }
            _level2Map.value = m2
            const m3: Record<string, { eng: string, arabic: string }> = {}
            for (const r of levelsData.level3 || []) {
                if (r.A9) m3[r.A9] = { eng: r.eng || r.A9, arabic: r.arabic || r.A9 }
            }
            _level3Map.value = m3
        }
        if (catData.success) {
            _categories.value = (catData as any).categories || []
            _subCategories.value = catData.subCategories || []
            const m: Record<string, { eng: string, arabic: string }> = {}
            for (const r of catData.subCategories || []) {
                if (r.A66) m[r.A66] = { eng: r.eng || r.A66, arabic: r.arabic || r.A66 }
            }
            _subCatMap.value = m
        }
        if (descData.success) {
            _assetDescriptions.value = descData.descriptions || []
            const m: Record<string, { eng: string, arabic: string }> = {}
            for (const r of descData.descriptions || []) {
                if (r.A67) m[r.A67] = { eng: r.eng || r.A67, arabic: r.arabic || r.A67 }
            }
            _assetDescMap.value = m
        }
        // Users map for furniture (A201 → A2)
        if (userData.success) {
            const m: Record<string, string> = {}
            for (const u of _users.value) {
                if (u.A201) m[u.A201] = u.A2 || u.A201
            }
            _furnitureUsersMap.value = m
        }
        // Language data
        if (langData.success) {
            _language.value = (langData as any).language || []
        }

        // ─── Normalize casing for consistent display ────────────
        const tc = (s: string) => s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        const normalizeFields = [
            'Project Status', 'Job Status', 'SSA Status', 'Solar Install Status',
            'MPU Installed Status', 'Battery Installed Status', 'Completion Status',
            'Final Status', 'PTO Status', 'Fire Approval Needed',
            'Branch Name', 'Project Type',
        ]
        _projects.value = _projects.value.map((p: any) => {
            const copy = { ...p }
            for (const field of normalizeFields) {
                if (copy[field] && typeof copy[field] === 'string') {
                    copy[field] = copy[field].split(',').map((part: string) => tc(part.trim())).join(', ')
                }
            }
            return copy
        })

        // Normalize customer names in raw data
        _customers.value = _customers.value.map((c: any) => {
            const copy = { ...c }
            if (copy['First Name'] && typeof copy['First Name'] === 'string') copy['First Name'] = tc(copy['First Name'])
            if (copy['Last Name'] && typeof copy['Last Name'] === 'string') copy['Last Name'] = tc(copy['Last Name'])
            return copy
        })

        _buildMaps()
        _lastFetched.value = Date.now()
    }
    catch { }
    finally {
        _fetching.value = false
        _ready.value = true
    }
}

export function useDashboardStore() {
    /**
     * Initialize the store — call once at app startup.
     * Safe to call multiple times; only the first call fetches.
     */
    function init() {
        if (_ready.value || _fetching.value) return
        _fetchAll()

        // Auto-refresh every 5 minutes (client-side only)
        if (import.meta.client && !_refreshTimer) {
            _refreshTimer = setInterval(() => {
                _fetchAll()
            }, 5 * 60 * 1000)
        }
    }

    /** Force-refresh all data */
    async function refresh() {
        _ready.value = false
        await _fetchAll()
    }

    /**
     * Ensure furniture rows are loaded (lazy — only fetches on first call).
     * Returns instantly if already cached. Call from any furniture page.
     */
    function ensureFurnitureRows() {
        if (_furnitureRowsReady.value || _furnitureRowsFetching.value) return
        _fetchFurnitureRows()

        // Auto-refresh furniture rows every 10 minutes
        if (import.meta.client && !_furnitureRowsRefreshTimer) {
            _furnitureRowsRefreshTimer = setInterval(() => {
                _fetchFurnitureRows()
            }, 10 * 60 * 1000)
        }
    }

    /** Force-refresh furniture rows */
    async function refreshFurnitureRows() {
        _furnitureRowsReady.value = false
        await _fetchFurnitureRows()
    }

    return {
        // Reactive data
        projects: readonly(_projects),
        users: readonly(_users),
        customers: readonly(_customers),
        permits: readonly(_permits),
        roles: readonly(_roles),
        userNameMap: readonly(_userNameMap),
        customerNameMap: readonly(_customerNameMap),
        projectMap: readonly(_projectMap),

        // Furniture lookup maps
        level1Map: readonly(_level1Map),
        level2Map: readonly(_level2Map),
        level3Map: readonly(_level3Map),
        subCatMap: readonly(_subCatMap),
        assetDescMap: readonly(_assetDescMap),
        furnitureUsersMap: readonly(_furnitureUsersMap),

        // Furniture rows cache (lazy-loaded)
        furnitureRows: readonly(_furnitureRows),
        furnitureRowsReady: readonly(_furnitureRowsReady),
        furnitureRowsFetching: readonly(_furnitureRowsFetching),
        furnitureRowsProgress: readonly(_furnitureRowsProgress),

        // Raw lists for admin pages
        level1List: readonly(_level1List),
        level2List: readonly(_level2List),
        level3List: readonly(_level3List),
        categories: readonly(_categories),
        subCategories: readonly(_subCategories),
        assetDescriptions: readonly(_assetDescriptions),
        language: readonly(_language),

        // State
        ready: readonly(_ready),
        fetching: readonly(_fetching),
        lastFetched: readonly(_lastFetched),

        // Actions
        init,
        refresh,
        ensureFurnitureRows,
        refreshFurnitureRows,
    }
}
