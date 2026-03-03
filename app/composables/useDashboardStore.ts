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

const _userNameMap = ref<Record<string, string>>({})
const _customerNameMap = ref<Record<string, string>>({})
const _projectMap = ref<Record<string, any>>({})

const _ready = ref(false)
const _fetching = ref(false)
const _lastFetched = ref(0)

let _refreshTimer: ReturnType<typeof setInterval> | null = null

function _buildMaps() {
    // User name map (email → display name)
    _userNameMap.value = Object.fromEntries(
        _users.value
            .filter((u: any) => u.Email)
            .map((u: any) => [
                u.Email.toLowerCase(),
                [u['First Name'], u['Last Name']].filter(Boolean).join(' ') || u.Email,
            ]),
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
        const [projData, userData, custData, permitsData, rolesData] = await Promise.all([
            $fetch<{ success: boolean, projects: any[] }>('/api/bigquery/projects').catch(() => ({ success: false, projects: [] })),
            $fetch<{ success: boolean, users: any[] }>('/api/bigquery/users').catch(() => ({ success: false, users: [] })),
            $fetch<{ success: boolean, customers: any[] }>('/api/bigquery/customers').catch(() => ({ success: false, customers: [] })),
            $fetch<{ success: boolean, permits: any[] }>('/api/bigquery/permits').catch(() => ({ success: false, permits: [] })),
            $fetch<{ success: boolean, roles: any[] }>('/api/bigquery/roles').catch(() => ({ success: false, roles: [] })),
        ])
        if (projData.success) _projects.value = projData.projects
        if (userData.success) _users.value = userData.users
        if (custData.success) _customers.value = custData.customers
        if (permitsData.success) _permits.value = permitsData.permits
        if (rolesData.success) _roles.value = rolesData.roles

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

        // State
        ready: readonly(_ready),
        fetching: readonly(_fetching),
        lastFetched: readonly(_lastFetched),

        // Actions
        init,
        refresh,
    }
}
