<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Furniture Report', icon: 'i-lucide-bar-chart-3', description: 'Furniture analytics & insights' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

const { resolve: resolveLang, lang: appLang } = useAppLanguage()

// ─── Global prefetched store (instant lookups) ──────────────
const {
  level1Map, level2Map, level3Map, subCatMap, assetDescMap,
  furnitureUsersMap: usersMap, init,
} = useDashboardStore()
init()

// ─── Data ──────────────────────────────────────────────────
const loading = ref(true)
const rows = ref<any[]>([])
const searchQuery = ref('')
const sidebarCollapsed = ref(false)

// Filter selections
const selLevel1 = ref<string[]>([])
const selLevel2 = ref<string[]>([])
const selLevel3 = ref<string[]>([])
const selSubCat = ref<string[]>([])
const selCondition = ref<string[]>([])
const selUser = ref<string[]>([])
const dateFrom = ref('')
const dateTo = ref('')

// Per-filter search
const filterSearch = reactive({ level1: '', level2: '', level3: '', subCat: '', condition: '', user: '' })

// ─── Fetch furniture rows (report needs ALL rows) ───────────
const BATCH = 5000
const loadProgress = ref(0) // 0-100

async function fetchAll() {
  loading.value = true
  loadProgress.value = 0
  try {
    // First request to get total count + first batch
    const first = await $fetch<{ success: boolean, rows: any[], total: number, totalPages: number }>('/api/bigquery/furniture', { params: { limit: BATCH, page: 1 } })
    rows.value = first.rows || []
    const totalRows = first.total || 0
    const totalPages = Math.ceil(totalRows / BATCH)
    loadProgress.value = Math.round((1 / totalPages) * 100)

    if (totalPages > 1) {
      // Fetch remaining pages in parallel waves of 6
      const WAVE_SIZE = 6
      for (let start = 2; start <= totalPages; start += WAVE_SIZE) {
        const wave = []
        for (let p = start; p <= Math.min(start + WAVE_SIZE - 1, totalPages); p++) {
          wave.push(
            $fetch<{ rows: any[] }>('/api/bigquery/furniture', { params: { limit: BATCH, page: p } }),
          )
        }
        const results = await Promise.all(wave)
        for (const pg of results) {
          rows.value.push(...(pg.rows || []))
        }
        loadProgress.value = Math.round((Math.min(start + WAVE_SIZE - 1, totalPages) / totalPages) * 100)
      }
    }
    loadProgress.value = 100
  }
  catch (e: any) {
    toast.error('Failed to load report data')
  }
  finally { loading.value = false }
}
fetchAll()

// ─── Resolve helpers ────────────────────────────────────────
function rl(map: Record<string, { eng: string, arabic: string }>, key: string): string {
  const entry = map[key]
  if (!entry) return key
  return appLang.value === 'ar' ? (entry.arabic || entry.eng || key) : (entry.eng || key)
}
function resolveL1(key: string) { return rl(level1Map.value, key) }
function resolveL2(key: string) { return rl(level2Map.value, key) }
function resolveL3(key: string) { return rl(level3Map.value, key) }
function resolveSC(key: string) { return rl(subCatMap.value, key) }
function resolveAD(key: string) { return rl(assetDescMap.value, key) }
function resolveUser(key: string) { return usersMap.value[key] || key }

// ─── Filter logic ───────────────────────────────────────────
// Level 2: merge by resolved name (multiple IDs can share the same name)
const level2NameToIds = computed(() => {
  const map: Record<string, Set<string>> = {}
  for (const r of rows.value) {
    const id = r.A8; if (!id) continue
    const name = resolveL2(id)
    if (!map[name]) map[name] = new Set()
    map[name].add(id)
  }
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, [...v]]))
})

function filterExcluding(excludeKey: string): any[] {
  let recs = [...rows.value]
  if (excludeKey !== 'level1' && selLevel1.value.length) recs = recs.filter(r => selLevel1.value.includes(r.A7))
  if (excludeKey !== 'level2' && selLevel2.value.length) {
    const ids = new Set<string>()
    for (const name of selLevel2.value) {
      for (const id of (level2NameToIds.value[name] || [])) ids.add(id)
    }
    recs = recs.filter(r => ids.has(r.A8))
  }
  if (excludeKey !== 'level3' && selLevel3.value.length) recs = recs.filter(r => selLevel3.value.includes(r.A9))
  if (excludeKey !== 'subCat' && selSubCat.value.length) recs = recs.filter(r => selSubCat.value.includes(r.A66))
  if (excludeKey !== 'condition' && selCondition.value.length) recs = recs.filter(r => selCondition.value.includes(r.A75))
  if (excludeKey !== 'user' && selUser.value.length) recs = recs.filter(r => selUser.value.includes(r.A2))
  return recs
}

function countSorted(recs: any[], field: string, resolverMap?: Record<string, { eng: string, arabic: string }>): { value: string, label: string, count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of recs) {
    const v = r[field]; if (!v) continue
    counts[v] = (counts[v] || 0) + 1
  }
  return Object.entries(counts)
    .map(([value, count]) => ({
      value,
      label: resolverMap ? rl(resolverMap, value) : value,
      count,
    }))
    .sort((a, b) => b.count - a.count)
}

function userCountSorted(recs: any[]): { value: string, label: string, count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of recs) {
    const v = r.A2; if (!v) continue
    counts[v] = (counts[v] || 0) + 1
  }
  return Object.entries(counts)
    .map(([value, count]) => ({ value, label: resolveUser(value), count }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Computed filter options
const level1Opts = computed(() => countSorted(filterExcluding('level1'), 'A7', level1Map.value))
// Level 2: group by resolved name so duplicates merge
const level2Opts = computed(() => {
  const recs = filterExcluding('level2')
  const nameCounts: Record<string, number> = {}
  for (const r of recs) {
    const v = r.A8; if (!v) continue
    const name = resolveL2(v)
    nameCounts[name] = (nameCounts[name] || 0) + 1
  }
  return Object.entries(nameCounts)
    .map(([label, count]) => ({ value: label, label, count }))
    .sort((a, b) => b.count - a.count)
})
const level3Opts = computed(() => countSorted(filterExcluding('level3'), 'A9', level3Map.value))
const subCatOpts = computed(() => countSorted(filterExcluding('subCat'), 'A66', subCatMap.value))
const conditionOpts = computed(() => {
  const recs = filterExcluding('condition')
  const counts: Record<string, number> = {}
  for (const r of recs) {
    const v = r.A75; if (!v) continue
    counts[v] = (counts[v] || 0) + 1
  }
  return Object.entries(counts)
    .map(([value, count]) => ({ value, label: resolveLang(value), count }))
    .sort((a, b) => b.count - a.count)
})
const userOpts = computed(() => userCountSorted(filterExcluding('user')))

// Toggle filter
const filterRefs: Record<string, Ref<string[]>> = {
  level1: selLevel1, level2: selLevel2, level3: selLevel3, subCat: selSubCat, condition: selCondition, user: selUser,
}
function toggleFilter(key: string, val: string) {
  const arr = filterRefs[key]
  if (!arr) return
  const idx = arr.value.indexOf(val)
  if (idx >= 0) arr.value.splice(idx, 1)
  else arr.value.push(val)
}
function clearFilter(key: string) {
  const arr = filterRefs[key]
  if (arr) arr.value = []
}

function clearAllFilters() {
  selLevel1.value = []; selLevel2.value = []; selLevel3.value = []; selSubCat.value = []
  selCondition.value = []; selUser.value = []; dateFrom.value = ''; dateTo.value = ''; searchQuery.value = ''
}

const hasFilters = computed(() =>
  selLevel1.value.length || selLevel2.value.length || selLevel3.value.length ||
  selSubCat.value.length || selCondition.value.length || selUser.value.length ||
  dateFrom.value || dateTo.value || searchQuery.value.trim(),
)

function filteredSearchOpts(opts: { value: string, label: string, count: number }[], search: string) {
  if (!search.trim()) return opts
  const q = search.toLowerCase()
  return opts.filter(o => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
}

// ─── Filtered data ──────────────────────────────────────────
function parseTS(val: string | undefined): Date | null {
  if (!val) return null
  const parts = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/)
  if (!parts) return null
  return new Date(+parts[3]!, +parts[1]! - 1, +parts[2]!, +parts[4]!, +parts[5]!, +parts[6]!)
}

const filtered = computed(() => {
  let recs = [...rows.value]
  if (selLevel1.value.length) recs = recs.filter(r => selLevel1.value.includes(r.A7))
  if (selLevel2.value.length) {
    const ids = new Set<string>()
    for (const name of selLevel2.value) {
      for (const id of (level2NameToIds.value[name] || [])) ids.add(id)
    }
    recs = recs.filter(r => ids.has(r.A8))
  }
  if (selLevel3.value.length) recs = recs.filter(r => selLevel3.value.includes(r.A9))
  if (selSubCat.value.length) recs = recs.filter(r => selSubCat.value.includes(r.A66))
  if (selCondition.value.length) recs = recs.filter(r => selCondition.value.includes(r.A75))
  if (selUser.value.length) recs = recs.filter(r => selUser.value.includes(r.A2))
  if (dateFrom.value) { const f = new Date(dateFrom.value); recs = recs.filter(r => { const d = parseTS(r.A213); return d && d >= f }) }
  if (dateTo.value) { const t = new Date(dateTo.value); t.setHours(23, 59, 59, 999); recs = recs.filter(r => { const d = parseTS(r.A213); return d && d <= t }) }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    recs = recs.filter(r => [r.A70, r.A222, r.A77].filter(Boolean).some(v => String(v).toLowerCase().includes(q)))
  }
  return recs
})

// ─── KPIs ───────────────────────────────────────────────────
const kpis = computed(() => {
  const recs = filtered.value
  const total = recs.length
  const conditions: Record<string, number> = {}
  const entities: Set<string> = new Set()
  const users: Set<string> = new Set()
  for (const r of recs) {
    if (r.A75) conditions[r.A75] = (conditions[r.A75] || 0) + 1
    if (r.A7) entities.add(r.A7)
    if (r.A2) users.add(r.A2)
  }
  const goodCount = (conditions['Good'] || 0) + (conditions['3'] || 0)
  const fairCount = (conditions['Fair'] || 0) + (conditions['2'] || 0)
  const poorCount = (conditions['Poor'] || 0) + (conditions['1'] || 0)
  return { total, goodCount, fairCount, poorCount, entityCount: entities.size, userCount: users.size }
})

// ─── Top subcategories chart ────────────────────────────────
const topSubCats = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of filtered.value) {
    if (r.A66) {
      const label = resolveSC(r.A66)
      counts[label] = (counts[label] || 0) + 1
    }
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10)
  const max = sorted[0]?.[1] || 1
  return sorted.map(([name, count]) => ({ name, count, pct: Math.round((count / max) * 100) }))
})

// ─── By entity breakdown ────────────────────────────────────
const byEntity = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of filtered.value) {
    if (r.A7) {
      const label = resolveL1(r.A7)
      counts[label] = (counts[label] || 0) + 1
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }))
})

// Condition color
function condColor(c: string) {
  if (c === 'Good' || c === '3') return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20'
  if (c === 'Fair' || c === '2') return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20'
  if (c === 'Poor' || c === '1') return 'bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20'
  return 'bg-muted text-muted-foreground ring-border'
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[200px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input v-model="searchQuery" placeholder="Search assets..." class="pl-8 h-8 text-xs" />
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ filtered.length.toLocaleString() }} of {{ rows.length.toLocaleString() }}
        </p>
        <Button v-if="hasFilters" variant="ghost" size="sm" class="h-8 text-xs gap-1" @click="clearAllFilters">
          <Icon name="i-lucide-x" class="size-3" /> Clear
        </Button>
        <Button variant="ghost" size="sm" class="h-8" @click="sidebarCollapsed = !sidebarCollapsed">
          <Icon :name="sidebarCollapsed ? 'i-lucide-panel-right-open' : 'i-lucide-panel-right-close'" class="size-3.5" />
        </Button>
      </div>
    </Teleport>

    <!-- Filter Sidebar -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="w-0 opacity-0"
      enter-to-class="w-[260px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="w-[260px] opacity-100"
      leave-to-class="w-0 opacity-0"
    >
      <aside v-if="!sidebarCollapsed" class="w-[260px] shrink-0 border-r overflow-y-auto overflow-x-hidden bg-card/50">
        <div class="p-3 space-y-3">
          <!-- Date range -->
          <div>
            <h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">Date Range</h4>
            <div class="grid grid-cols-2 gap-1.5">
              <Input v-model="dateFrom" type="date" class="h-7 text-[11px]" />
              <Input v-model="dateTo" type="date" class="h-7 text-[11px]" />
            </div>
          </div>

          <!-- Filter sections -->
          <template v-for="section in [
            { key: 'level1', title: 'Entity', opts: level1Opts, sel: selLevel1 },
            { key: 'level2', title: 'Level 2', opts: level2Opts, sel: selLevel2 },
            { key: 'level3', title: 'Level 3', opts: level3Opts, sel: selLevel3 },
            { key: 'subCat', title: 'Subcategory', opts: subCatOpts, sel: selSubCat },
            { key: 'condition', title: 'Condition', opts: conditionOpts, sel: selCondition },
            { key: 'user', title: 'User', opts: userOpts, sel: selUser },
          ]" :key="section.key">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">{{ section.title }}</h4>
                <button
                  v-if="section.sel.length"
                  class="text-[9px] text-primary hover:underline"
                  @click="clearFilter(section.key)"
                >
                  Clear ({{ section.sel.length }})
                </button>
              </div>
              <div v-if="section.opts.length > 6" class="mb-1">
                <Input v-model="filterSearch[section.key as keyof typeof filterSearch]" placeholder="Filter..." class="h-6 text-[10px]" />
              </div>
              <div class="max-h-[140px] overflow-y-auto space-y-0.5 custom-scrollbar">
                <button
                  v-for="opt in filteredSearchOpts(section.opts, filterSearch[section.key as keyof typeof filterSearch] || '')"
                  :key="opt.value"
                  class="w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] transition-colors"
                  :class="section.sel.includes(opt.value)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-muted text-foreground/80'"
                  @click="toggleFilter(section.key, opt.value)"
                >
                  <div
                    class="size-3 rounded border shrink-0 flex items-center justify-center transition-colors"
                    :class="section.sel.includes(opt.value) ? 'bg-primary border-primary' : 'border-border'"
                  >
                    <Icon v-if="section.sel.includes(opt.value)" name="i-lucide-check" class="size-2 text-primary-foreground" />
                  </div>
                  <span class="truncate flex-1">{{ opt.label }}</span>
                  <span class="text-[9px] tabular-nums text-muted-foreground shrink-0">{{ opt.count.toLocaleString() }}</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </aside>
    </Transition>

    <!-- Main content -->
    <div class="flex-1 min-w-0 overflow-y-auto">
      <!-- Loading -->
      <div v-if="loading" class="flex-1 flex items-center justify-center py-40">
        <div class="flex flex-col items-center gap-4 text-muted-foreground">
          <div class="size-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
            <Icon name="i-lucide-loader-2" class="size-7 animate-spin text-blue-500" />
          </div>
          <p class="text-sm font-medium">Loading furniture report...</p>
          <div v-if="loadProgress > 0" class="flex flex-col items-center gap-2">
            <div class="h-1.5 w-48 rounded-full bg-muted overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out"
                :style="{ width: `${loadProgress}%` }"
              />
            </div>
            <p class="text-xs tabular-nums text-muted-foreground">{{ rows.length.toLocaleString() }} rows loaded · {{ loadProgress }}%</p>
          </div>
        </div>
      </div>

      <template v-else>
        <!-- KPI Cards -->
        <div class="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div class="rounded-xl border bg-card p-4 space-y-1">
            <p class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Total Assets</p>
            <NumberFlow :value="kpis.total" class="text-2xl font-bold tabular-nums" />
          </div>
          <div class="rounded-xl border bg-card p-4 space-y-1">
            <p class="text-[10px] font-medium text-emerald-500 uppercase tracking-wider">Good</p>
            <NumberFlow :value="kpis.goodCount" class="text-2xl font-bold tabular-nums text-emerald-600" />
          </div>
          <div class="rounded-xl border bg-card p-4 space-y-1">
            <p class="text-[10px] font-medium text-amber-500 uppercase tracking-wider">Fair</p>
            <NumberFlow :value="kpis.fairCount" class="text-2xl font-bold tabular-nums text-amber-600" />
          </div>
          <div class="rounded-xl border bg-card p-4 space-y-1">
            <p class="text-[10px] font-medium text-red-500 uppercase tracking-wider">Poor</p>
            <NumberFlow :value="kpis.poorCount" class="text-2xl font-bold tabular-nums text-red-600" />
          </div>
          <div class="rounded-xl border bg-card p-4 space-y-1">
            <p class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Entities</p>
            <NumberFlow :value="kpis.entityCount" class="text-2xl font-bold tabular-nums" />
          </div>
          <div class="rounded-xl border bg-card p-4 space-y-1">
            <p class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Users</p>
            <NumberFlow :value="kpis.userCount" class="text-2xl font-bold tabular-nums" />
          </div>
        </div>

        <!-- Charts row -->
        <div class="px-4 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Top Subcategories bar chart -->
          <div class="rounded-xl border bg-card p-4">
            <h3 class="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="i-lucide-bar-chart-3" class="size-3.5 text-blue-500" />
              Top Subcategories
            </h3>
            <div class="space-y-2">
              <div v-for="item in topSubCats" :key="item.name" class="flex items-center gap-3">
                <span class="text-[11px] text-muted-foreground w-[140px] truncate shrink-0" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ item.name }}</span>
                <div class="flex-1 h-5 bg-muted/50 rounded overflow-hidden">
                  <div
                    class="h-full rounded bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700 ease-out flex items-center justify-end pr-1.5"
                    :style="{ width: `${item.pct}%` }"
                  >
                    <span v-if="item.pct > 20" class="text-[9px] font-medium text-white tabular-nums">{{ item.count.toLocaleString() }}</span>
                  </div>
                </div>
                <span v-if="item.pct <= 20" class="text-[10px] font-medium tabular-nums text-muted-foreground shrink-0">{{ item.count.toLocaleString() }}</span>
              </div>
              <p v-if="topSubCats.length === 0" class="text-xs text-muted-foreground text-center py-4">No data</p>
            </div>
          </div>

          <!-- By Entity breakdown -->
          <div class="rounded-xl border bg-card p-4">
            <h3 class="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="i-lucide-building-2" class="size-3.5 text-violet-500" />
              By Entity
            </h3>
            <div class="space-y-1.5 max-h-[280px] overflow-y-auto custom-scrollbar">
              <div
                v-for="item in byEntity" :key="item.name"
                class="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <span class="text-[11px] font-medium truncate flex-1" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ item.name }}</span>
                <span class="text-[11px] font-semibold tabular-nums text-foreground ml-3">{{ item.count.toLocaleString() }}</span>
              </div>
              <p v-if="byEntity.length === 0" class="text-xs text-muted-foreground text-center py-4">No data</p>
            </div>
          </div>
        </div>

        <!-- Data table -->
        <div class="px-4 pb-4">
          <div class="rounded-xl border bg-card overflow-hidden">
            <div class="overflow-auto max-h-[400px]">
              <Table>
                <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
                  <TableRow class="border-b-0">
                    <TableHead class="bg-card text-[11px] w-[100px]">Asset Code</TableHead>
                    <TableHead class="bg-card text-[11px] w-[50px]">Entity</TableHead>
                    <TableHead class="bg-card text-[11px] w-[140px]">Level 2</TableHead>
                    <TableHead class="bg-card text-[11px] w-[120px]">Level 3</TableHead>
                    <TableHead class="bg-card text-[11px] w-[130px]">Subcategory</TableHead>
                    <TableHead class="bg-card text-[11px] w-[150px]">Asset Description</TableHead>
                    <TableHead class="bg-card text-[11px] w-[90px]">Condition</TableHead>
                    <TableHead class="bg-card text-[11px] w-[120px]">User</TableHead>
                    <TableHead class="bg-card text-[11px] w-[100px]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="(row, idx) in filtered.slice(0, 100)" :key="row.ID || idx" class="hover:bg-muted/30 transition-colors">
                    <TableCell class="font-mono text-xs font-medium text-muted-foreground">{{ row.A70 || '—' }}</TableCell>
                    <TableCell>
                      <template v-if="level1Map[row.A7]?.logo">
                        <img
                          :src="level1Map[row.A7]!.logo!.startsWith('http') ? level1Map[row.A7]!.logo : `/api/gcs/${level1Map[row.A7]!.logo}`"
                          class="size-6 rounded-full object-cover ring-1 ring-border/30"
                          loading="lazy"
                        >
                      </template>
                      <span v-else class="text-xs text-muted-foreground">—</span>
                    </TableCell>
                    <TableCell class="text-[11px]" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ resolveL2(row.A8) }}</TableCell>
                    <TableCell class="text-[11px]" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ resolveL3(row.A9) }}</TableCell>
                    <TableCell class="text-[11px]" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ resolveSC(row.A66) }}</TableCell>
                    <TableCell class="text-[11px]" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ resolveAD(row.A67) }}</TableCell>
                    <TableCell>
                      <span
                        v-if="row.A68"
                        class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium ring-1"
                        :class="condColor(row.A68)"
                      >{{ resolveLang(row.A68) }}</span>
                      <span v-else class="text-muted-foreground text-[11px]">—</span>
                    </TableCell>
                    <TableCell class="text-[11px]">{{ resolveUser(row.A2) || '—' }}</TableCell>
                    <TableCell class="text-[11px] text-muted-foreground tabular-nums">{{ row.A213 ? row.A213.split(' ')[0] : '—' }}</TableCell>
                  </TableRow>
                  <TableRow v-if="filtered.length === 0">
                    <TableCell colspan="9" class="h-32 text-center">
                      <div class="flex flex-col items-center gap-2 text-muted-foreground">
                        <Icon name="i-lucide-search-x" class="size-8 text-muted-foreground/40" />
                        <p class="font-medium">No matching assets</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div v-if="filtered.length > 100" class="border-t px-4 py-2 text-xs text-muted-foreground">
              Showing 100 of {{ filtered.length.toLocaleString() }} results. Use filters to narrow down.
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 9999px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
