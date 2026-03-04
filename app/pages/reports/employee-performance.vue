<script setup lang="ts">
import NumberFlow from '@number-flow/vue'

const { setHeader } = usePageHeader()
setHeader({ title: 'Employee Performance', icon: 'i-lucide-trophy', description: 'Track productivity & asset coverage' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

const { resolve: resolveLang, lang: appLang } = useAppLanguage()

const {
  users, level1Map, level2Map, subCatMap, assetDescMap,
  furnitureUsersMap: usersMap, init,
  furnitureRows, furnitureRowsReady, furnitureRowsFetching, furnitureRowsProgress,
  ensureFurnitureRows,
} = useDashboardStore()
init()
ensureFurnitureRows()

const loading = computed(() => furnitureRowsFetching.value && !furnitureRowsReady.value)
const rows = computed(() => furnitureRows.value)

// ─── Helpers ────────────────────────────────────────────────
function rl(map: Record<string, { eng: string, arabic: string }>, key: string): string {
  const entry = map[key]
  if (!entry) return key
  return appLang.value === 'ar' ? (entry.arabic || entry.eng || key) : (entry.eng || key)
}
function resolveL1(key: string) { return rl(level1Map.value, key) }
function resolveUser(key: string) { return usersMap.value[key] || key }

function parseTS(val: string | undefined): Date | null {
  if (!val) return null
  const parts = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/)
  if (!parts) return null
  return new Date(+parts[3]!, +parts[1]! - 1, +parts[2]!, +parts[4]!, +parts[5]!, +parts[6]!)
}

// ─── Date Range Filter ──────────────────────────────────────
const dateFrom = ref('')
const dateTo = ref('')
const searchQuery = ref('')
const selectedUser = ref('')

const filteredRows = computed(() => {
  let recs = [...rows.value]
  if (selectedUser.value) recs = recs.filter(r => r.A2 === selectedUser.value)
  if (dateFrom.value) { const f = new Date(dateFrom.value); recs = recs.filter(r => { const d = parseTS(r.A213); return d && d >= f }) }
  if (dateTo.value) { const t = new Date(dateTo.value); t.setHours(23, 59, 59, 999); recs = recs.filter(r => { const d = parseTS(r.A213); return d && d <= t }) }
  return recs
})

// ─── Employee Performance Data ──────────────────────────────
interface EmployeeStats {
  id: string
  name: string
  totalAssets: number
  locations: Set<string>
  conditions: Record<string, number>
  dailyCounts: Record<string, number>
  firstActivity: Date | null
  lastActivity: Date | null
  activeDays: Set<string>
  subcategories: Set<string>
}

const employeeStats = computed(() => {
  const statsMap: Record<string, EmployeeStats> = {}

  for (const r of filteredRows.value) {
    const userId = r.A2
    if (!userId) continue

    if (!statsMap[userId]) {
      statsMap[userId] = {
        id: userId,
        name: resolveUser(userId),
        totalAssets: 0,
        locations: new Set(),
        conditions: {},
        dailyCounts: {},
        firstActivity: null,
        lastActivity: null,
        activeDays: new Set(),
        subcategories: new Set(),
      }
    }

    const stat = statsMap[userId]!
    stat.totalAssets++
    if (r.A7) stat.locations.add(r.A7)
    if (r.A66) stat.subcategories.add(r.A66)

    if (r.A75) {
      const cond = resolveLang(r.A75)
      stat.conditions[cond] = (stat.conditions[cond] || 0) + 1
    }

    const ts = parseTS(r.A213)
    if (ts) {
      const dateKey = ts.toISOString().slice(0, 10)
      stat.dailyCounts[dateKey] = (stat.dailyCounts[dateKey] || 0) + 1
      stat.activeDays.add(dateKey)
      if (!stat.firstActivity || ts < stat.firstActivity) stat.firstActivity = ts
      if (!stat.lastActivity || ts > stat.lastActivity) stat.lastActivity = ts
    }
  }

  return Object.values(statsMap).sort((a, b) => b.totalAssets - a.totalAssets)
})

// ─── Global KPIs ────────────────────────────────────────────
const totalEmployees = computed(() => employeeStats.value.length)
const totalAssetsProcessed = computed(() => filteredRows.value.length)
const avgPerEmployee = computed(() =>
  totalEmployees.value > 0 ? Math.round(totalAssetsProcessed.value / totalEmployees.value) : 0,
)
const topPerformer = computed(() => employeeStats.value[0] || null)
const totalLocations = computed(() => {
  const s = new Set<string>()
  for (const e of employeeStats.value) e.locations.forEach(l => s.add(l))
  return s.size
})

// ─── Leaderboard (top 10) ───────────────────────────────────
const leaderboard = computed(() => employeeStats.value.slice(0, 10))
const maxAssets = computed(() => leaderboard.value[0]?.totalAssets || 1)

// ─── Activity Heatmap (last 12 weeks) ───────────────────────
const heatmapData = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of filteredRows.value) {
    const ts = parseTS(r.A213)
    if (ts) {
      const key = ts.toISOString().slice(0, 10)
      counts[key] = (counts[key] || 0) + 1
    }
  }

  // Generate last 84 days (12 weeks)
  const days: { date: string, count: number, dayOfWeek: number, weekIdx: number }[] = []
  const today = new Date()
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const dayOfWeek = d.getDay()
    const weekIdx = Math.floor((83 - i) / 7)
    days.push({ date: key, count: counts[key] || 0, dayOfWeek, weekIdx })
  }
  return days
})

const heatmapMax = computed(() => Math.max(...heatmapData.value.map(d => d.count), 1))

function heatmapColor(count: number): string {
  if (count === 0) return 'bg-muted/40'
  const ratio = count / heatmapMax.value
  if (ratio < 0.25) return 'bg-emerald-500/20'
  if (ratio < 0.5) return 'bg-emerald-500/40'
  if (ratio < 0.75) return 'bg-emerald-500/60'
  return 'bg-emerald-500/90'
}

// ─── Condition Distribution (pie-like summary) ──────────────
const conditionSummary = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of filteredRows.value) {
    if (r.A75) {
      const label = resolveLang(r.A75)
      counts[label] = (counts[label] || 0) + 1
    }
  }
  const total = Object.values(counts).reduce((s, c) => s + c, 0) || 1
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
})

function condBadgeClass(label: string) {
  const l = label.toLowerCase()
  if (l === 'good' || l === 'excellent' || l === '3') return 'bg-emerald-500 text-white'
  if (l === 'fair' || l === '2') return 'bg-amber-500 text-white'
  if (l === 'poor' || l === 'damaged' || l === '1') return 'bg-red-500 text-white'
  return 'bg-zinc-500 text-white'
}

function condRingClass(label: string) {
  const l = label.toLowerCase()
  if (l === 'good' || l === 'excellent' || l === '3') return 'text-emerald-500'
  if (l === 'fair' || l === '2') return 'text-amber-500'
  if (l === 'poor' || l === 'damaged' || l === '1') return 'text-red-500'
  return 'text-zinc-500'
}

// ─── Daily Trend (last 30 days) ─────────────────────────────
const dailyTrend = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of filteredRows.value) {
    const ts = parseTS(r.A213)
    if (ts) {
      const key = ts.toISOString().slice(0, 10)
      counts[key] = (counts[key] || 0) + 1
    }
  }
  const days: { date: string, label: string, count: number }[] = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    days.push({
      date: key,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: counts[key] || 0,
    })
  }
  return days
})

const trendMax = computed(() => Math.max(...dailyTrend.value.map(d => d.count), 1))

// ─── User options for filter ────────────────────────────────
const userOptions = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of rows.value) {
    if (r.A2) counts[r.A2] = (counts[r.A2] || 0) + 1
  }
  return Object.entries(counts)
    .map(([id, count]) => ({ id, name: resolveUser(id), count }))
    .sort((a, b) => a.name.localeCompare(b.name))
})

// ─── Selected employee details ──────────────────────────────
const selectedStats = computed(() => {
  if (!selectedUser.value) return null
  return employeeStats.value.find(e => e.id === selectedUser.value) || null
})

// ─── Entrance animation ─────────────────────────────────────
const entered = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { entered.value = true })
})

function clearFilters() {
  dateFrom.value = ''
  dateTo.value = ''
  selectedUser.value = ''
  searchQuery.value = ''
}

const hasFilters = computed(() => dateFrom.value || dateTo.value || selectedUser.value)

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
</script>

<template>
  <div class="w-full flex-1 min-h-0 overflow-auto">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[180px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input v-model="searchQuery" placeholder="Search..." class="pl-8 h-8 text-xs" />
        </div>
        <Input v-model="dateFrom" type="date" class="h-8 text-xs w-[130px]" placeholder="From" />
        <Input v-model="dateTo" type="date" class="h-8 text-xs w-[130px]" placeholder="To" />
        <select
          v-model="selectedUser"
          class="h-8 rounded-md border bg-card px-2 text-xs min-w-[140px] text-foreground outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All Employees</option>
          <option v-for="u in userOptions" :key="u.id" :value="u.id">{{ u.name }} ({{ u.count }})</option>
        </select>
        <Button v-if="hasFilters" variant="ghost" size="sm" class="h-8 text-xs gap-1" @click="clearFilters">
          <Icon name="i-lucide-x" class="size-3" /> Clear
        </Button>
      </div>
    </Teleport>

    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-40">
      <div class="flex flex-col items-center gap-4 text-muted-foreground">
        <div class="size-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
          <Icon name="i-lucide-loader-2" class="size-7 animate-spin text-amber-500" />
        </div>
        <p class="text-sm font-medium">Loading performance data...</p>
        <div v-if="furnitureRowsProgress > 0" class="flex flex-col items-center gap-2">
          <div class="h-1.5 w-48 rounded-full bg-muted overflow-hidden">
            <div
              class="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out"
              :style="{ width: `${furnitureRowsProgress}%` }"
            />
          </div>
          <p class="text-xs tabular-nums text-muted-foreground">{{ furnitureRowsProgress }}%</p>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="max-w-7xl mx-auto px-4 md:px-6 py-5 space-y-5">

        <!-- ═══ KPI HERO CARDS ═══ -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div
            v-for="(kpi, idx) in [
              { label: 'Employees', value: totalEmployees, icon: 'i-lucide-users', gradient: 'from-blue-500/15 to-transparent', iconBg: 'bg-blue-500/15', iconColor: 'text-blue-500', border: 'border-blue-500/10' },
              { label: 'Assets Processed', value: totalAssetsProcessed, icon: 'i-lucide-box', gradient: 'from-violet-500/15 to-transparent', iconBg: 'bg-violet-500/15', iconColor: 'text-violet-500', border: 'border-violet-500/10' },
              { label: 'Avg per Employee', value: avgPerEmployee, icon: 'i-lucide-bar-chart-3', gradient: 'from-emerald-500/15 to-transparent', iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-500', border: 'border-emerald-500/10' },
              { label: 'Locations Covered', value: totalLocations, icon: 'i-lucide-map-pin', gradient: 'from-amber-500/15 to-transparent', iconBg: 'bg-amber-500/15', iconColor: 'text-amber-500', border: 'border-amber-500/10' },
              { label: 'Top Performer', value: topPerformer?.totalAssets || 0, icon: 'i-lucide-trophy', gradient: 'from-orange-500/15 to-transparent', iconBg: 'bg-orange-500/15', iconColor: 'text-orange-500', border: 'border-orange-500/10', sub: topPerformer?.name || '—' },
            ]"
            :key="kpi.label"
            class="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
            :class="[kpi.border, entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']"
            :style="{ transitionDelay: `${100 + idx * 80}ms` }"
          >
            <div class="absolute inset-0 bg-gradient-to-br opacity-60" :class="kpi.gradient" />
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{{ kpi.label }}</span>
                <div class="flex items-center justify-center size-7 rounded-lg transition-transform group-hover:scale-110" :class="kpi.iconBg">
                  <Icon :name="kpi.icon" class="size-3.5" :class="kpi.iconColor" />
                </div>
              </div>
              <div class="text-2xl font-bold tabular-nums tracking-tight">
                <NumberFlow :value="kpi.value" :animated="true" />
              </div>
              <p v-if="(kpi as any).sub" class="text-[10px] text-muted-foreground mt-0.5 truncate">{{ (kpi as any).sub }}</p>
            </div>
          </div>
        </div>

        <!-- ═══ MAIN GRID ═══ -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <!-- LEFT: Leaderboard (2/3) -->
          <div
            class="lg:col-span-2 rounded-xl border bg-card overflow-hidden transition-all duration-600"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '500ms' }"
          >
            <div class="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-amber-500/5 to-orange-500/5">
              <div class="flex items-center gap-2.5">
                <div class="flex items-center justify-center size-8 rounded-lg bg-amber-500/10">
                  <Icon name="i-lucide-trophy" class="size-4 text-amber-500" />
                </div>
                <div>
                  <h3 class="text-sm font-semibold">Performance Leaderboard</h3>
                  <p class="text-[10px] text-muted-foreground">Top performers by assets inventoried</p>
                </div>
              </div>
              <Badge variant="outline" class="text-[10px] tabular-nums">{{ employeeStats.length }} employees</Badge>
            </div>

            <div class="divide-y">
              <div
                v-for="(emp, idx) in leaderboard"
                :key="emp.id"
                class="flex items-center gap-4 px-5 py-3 hover:bg-muted/30 transition-colors group"
              >
                <!-- Rank -->
                <div class="flex items-center justify-center size-8 rounded-full shrink-0"
                  :class="idx === 0 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/20'
                    : idx === 1 ? 'bg-gradient-to-br from-zinc-300 to-zinc-400 text-white dark:from-zinc-500 dark:to-zinc-600'
                    : idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                    : 'bg-muted text-muted-foreground'"
                >
                  <span class="text-xs font-bold">{{ idx + 1 }}</span>
                </div>

                <!-- Name & info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-semibold truncate">{{ emp.name }}</p>
                    <Icon v-if="idx === 0" name="i-lucide-crown" class="size-3.5 text-amber-500 shrink-0" />
                  </div>
                  <div class="flex items-center gap-3 mt-0.5">
                    <span class="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Icon name="i-lucide-map-pin" class="size-2.5" />
                      {{ emp.locations.size }} locations
                    </span>
                    <span class="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Icon name="i-lucide-calendar" class="size-2.5" />
                      {{ emp.activeDays.size }} active days
                    </span>
                    <span class="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Icon name="i-lucide-tags" class="size-2.5" />
                      {{ emp.subcategories.size }} categories
                    </span>
                  </div>
                </div>

                <!-- Bar + count -->
                <div class="flex items-center gap-3 w-[220px] shrink-0">
                  <div class="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-1000 ease-out"
                      :class="idx === 0 ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                        : idx === 1 ? 'bg-gradient-to-r from-zinc-400 to-zinc-500'
                        : idx === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700'
                        : 'bg-primary/60'"
                      :style="{ width: entered ? `${(emp.totalAssets / maxAssets) * 100}%` : '0%' }"
                    />
                  </div>
                  <span class="text-sm font-bold tabular-nums w-16 text-right">
                    {{ emp.totalAssets.toLocaleString() }}
                  </span>
                </div>
              </div>

              <div v-if="leaderboard.length === 0" class="py-12 text-center">
                <Icon name="i-lucide-users" class="size-10 text-muted-foreground/20 mx-auto mb-3" />
                <p class="text-sm text-muted-foreground">No employee data</p>
              </div>
            </div>
          </div>

          <!-- RIGHT: Side panels -->
          <div class="space-y-4">

            <!-- Activity Heatmap -->
            <div
              class="rounded-xl border bg-card p-4 transition-all duration-600 hover:shadow-md"
              :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '550ms' }"
            >
              <div class="flex items-center gap-2 mb-3">
                <div class="flex items-center justify-center size-6 rounded-md bg-emerald-500/10">
                  <Icon name="i-lucide-activity" class="size-3.5 text-emerald-500" />
                </div>
                <h3 class="text-xs font-semibold">Activity Heatmap</h3>
                <span class="text-[9px] text-muted-foreground ml-auto">Last 12 weeks</span>
              </div>
              <div class="flex gap-0.5">
                <!-- Day labels -->
                <div class="flex flex-col gap-0.5 mr-1">
                  <div v-for="(day, i) in weekDays" :key="i" class="size-3 flex items-center justify-center">
                    <span class="text-[7px] text-muted-foreground/60 leading-none">{{ i % 2 === 1 ? day : '' }}</span>
                  </div>
                </div>
                <!-- Grid -->
                <div class="flex gap-0.5 flex-1 overflow-hidden">
                  <div v-for="week in 12" :key="week" class="flex flex-col gap-0.5">
                    <div
                      v-for="day in 7"
                      :key="`${week}-${day}`"
                      class="size-3 rounded-[2px] transition-colors duration-300"
                      :class="heatmapColor(heatmapData[(week - 1) * 7 + (day - 1)]?.count || 0)"
                      :title="`${heatmapData[(week - 1) * 7 + (day - 1)]?.date || ''}: ${heatmapData[(week - 1) * 7 + (day - 1)]?.count || 0} assets`"
                    />
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-end gap-1 mt-2">
                <span class="text-[8px] text-muted-foreground/50">Less</span>
                <div class="size-2.5 rounded-[2px] bg-muted/40" />
                <div class="size-2.5 rounded-[2px] bg-emerald-500/20" />
                <div class="size-2.5 rounded-[2px] bg-emerald-500/40" />
                <div class="size-2.5 rounded-[2px] bg-emerald-500/60" />
                <div class="size-2.5 rounded-[2px] bg-emerald-500/90" />
                <span class="text-[8px] text-muted-foreground/50">More</span>
              </div>
            </div>

            <!-- Condition Distribution -->
            <div
              class="rounded-xl border bg-card p-4 transition-all duration-600 hover:shadow-md"
              :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '650ms' }"
            >
              <div class="flex items-center gap-2 mb-3">
                <div class="flex items-center justify-center size-6 rounded-md bg-violet-500/10">
                  <Icon name="i-lucide-heart-pulse" class="size-3.5 text-violet-500" />
                </div>
                <h3 class="text-xs font-semibold">Condition Breakdown</h3>
              </div>
              <div class="space-y-2.5">
                <div v-for="cond in conditionSummary" :key="cond.label" class="flex items-center gap-2.5">
                  <div class="flex items-center justify-center size-5 rounded-md" :class="condBadgeClass(cond.label)">
                    <span class="text-[8px] font-bold">{{ cond.pct }}%</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-0.5">
                      <span class="text-[11px] font-medium truncate">{{ cond.label }}</span>
                      <span class="text-[10px] tabular-nums text-muted-foreground">{{ cond.count.toLocaleString() }}</span>
                    </div>
                    <div class="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-1000"
                        :class="condRingClass(cond.label).replace('text-', 'bg-')"
                        :style="{ width: `${cond.pct}%`, opacity: 0.7 }"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="conditionSummary.length === 0" class="py-4 text-center text-[11px] text-muted-foreground">No data</div>
              </div>
            </div>

            <!-- Location Coverage -->
            <div
              class="rounded-xl border bg-card p-4 transition-all duration-600 hover:shadow-md"
              :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '750ms' }"
            >
              <div class="flex items-center gap-2 mb-3">
                <div class="flex items-center justify-center size-6 rounded-md bg-blue-500/10">
                  <Icon name="i-lucide-map-pin" class="size-3.5 text-blue-500" />
                </div>
                <h3 class="text-xs font-semibold">Location Coverage</h3>
              </div>
              <div class="space-y-1">
                <div
                  v-for="emp in leaderboard.slice(0, 5)"
                  :key="emp.id"
                  class="flex items-center gap-2 py-1"
                >
                  <span class="text-[10px] font-medium w-24 truncate shrink-0">{{ emp.name }}</span>
                  <div class="flex-1 flex flex-wrap gap-0.5">
                    <span
                      v-for="loc in [...emp.locations].slice(0, 4)"
                      :key="loc"
                      class="inline-flex items-center px-1 py-0.5 rounded text-[8px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    >{{ resolveL1(loc) }}</span>
                    <span
                      v-if="emp.locations.size > 4"
                      class="inline-flex items-center px-1 py-0.5 rounded text-[8px] font-medium bg-muted text-muted-foreground"
                    >+{{ emp.locations.size - 4 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══ DAILY TREND CHART ═══ -->
        <div
          class="rounded-xl border bg-card overflow-hidden transition-all duration-600"
          :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: '800ms' }"
        >
          <div class="flex items-center gap-2.5 px-5 py-4 border-b">
            <div class="flex items-center justify-center size-7 rounded-lg bg-cyan-500/10">
              <Icon name="i-lucide-trending-up" class="size-4 text-cyan-500" />
            </div>
            <div>
              <h3 class="text-sm font-semibold">Daily Productivity</h3>
              <p class="text-[10px] text-muted-foreground">Assets processed per day — last 30 days</p>
            </div>
          </div>
          <div class="px-5 pt-4 pb-5">
            <div class="flex items-end gap-[3px] h-[120px]">
              <div
                v-for="(day, idx) in dailyTrend"
                :key="day.date"
                class="flex-1 group relative flex flex-col items-center justify-end"
              >
                <div
                  class="w-full rounded-t transition-all duration-700 ease-out cursor-pointer hover:opacity-80"
                  :class="day.count > 0 ? 'bg-gradient-to-t from-cyan-500/60 to-cyan-400/80' : 'bg-muted/30'"
                  :style="{ height: entered ? `${Math.max(day.count > 0 ? 4 : 2, (day.count / trendMax) * 100)}%` : '0%', transitionDelay: `${idx * 15}ms` }"
                />
                <!-- Tooltip -->
                <div class="absolute bottom-full mb-2 px-2 py-1 rounded-md bg-popover border shadow-lg text-[9px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 tabular-nums">
                  {{ day.label }}: {{ day.count.toLocaleString() }} assets
                </div>
              </div>
            </div>
            <!-- X-axis labels: show every 5th day -->
            <div class="flex gap-[3px] mt-1.5">
              <div v-for="(day, idx) in dailyTrend" :key="'lbl-'+day.date" class="flex-1 text-center">
                <span v-if="idx % 5 === 0" class="text-[8px] text-muted-foreground/50 tabular-nums">{{ day.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ═══ FULL TABLE ═══ -->
        <div
          class="rounded-xl border bg-card overflow-hidden transition-all duration-600"
          :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: '900ms' }"
        >
          <div class="flex items-center gap-2.5 px-5 py-4 border-b">
            <div class="flex items-center justify-center size-7 rounded-lg bg-violet-500/10">
              <Icon name="i-lucide-table" class="size-4 text-violet-500" />
            </div>
            <div>
              <h3 class="text-sm font-semibold">Detailed Breakdown</h3>
              <p class="text-[10px] text-muted-foreground">All employees with full performance metrics</p>
            </div>
          </div>
          <div class="overflow-auto max-h-[400px]">
            <Table>
              <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
                <TableRow class="border-b-0">
                  <TableHead class="bg-card text-[11px] w-[40px]">#</TableHead>
                  <TableHead class="bg-card text-[11px] w-[160px]">Employee</TableHead>
                  <TableHead class="bg-card text-[11px] w-[100px] text-right">Assets</TableHead>
                  <TableHead class="bg-card text-[11px] w-[80px] text-right">Locations</TableHead>
                  <TableHead class="bg-card text-[11px] w-[90px] text-right">Active Days</TableHead>
                  <TableHead class="bg-card text-[11px] w-[90px] text-right">Categories</TableHead>
                  <TableHead class="bg-card text-[11px] w-[100px] text-right">Avg/Day</TableHead>
                  <TableHead class="bg-card text-[11px] w-[120px]">Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="(emp, idx) in (searchQuery
                    ? employeeStats.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    : employeeStats
                  )"
                  :key="emp.id"
                  class="hover:bg-muted/30 transition-colors"
                >
                  <TableCell class="tabular-nums text-xs text-muted-foreground font-medium">{{ idx + 1 }}</TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <Avatar class="size-6 shrink-0">
                        <AvatarFallback class="text-[8px] font-bold bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300">
                          {{ emp.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() }}
                        </AvatarFallback>
                      </Avatar>
                      <span class="text-xs font-medium truncate">{{ emp.name }}</span>
                      <Icon v-if="idx === 0" name="i-lucide-crown" class="size-3 text-amber-500 shrink-0" />
                    </div>
                  </TableCell>
                  <TableCell class="text-right text-xs font-semibold tabular-nums">{{ emp.totalAssets.toLocaleString() }}</TableCell>
                  <TableCell class="text-right text-xs tabular-nums">{{ emp.locations.size }}</TableCell>
                  <TableCell class="text-right text-xs tabular-nums">{{ emp.activeDays.size }}</TableCell>
                  <TableCell class="text-right text-xs tabular-nums">{{ emp.subcategories.size }}</TableCell>
                  <TableCell class="text-right">
                    <span class="text-xs font-medium tabular-nums">
                      {{ emp.activeDays.size > 0 ? Math.round(emp.totalAssets / emp.activeDays.size).toLocaleString() : '—' }}
                    </span>
                  </TableCell>
                  <TableCell class="text-[11px] text-muted-foreground tabular-nums">
                    {{ emp.lastActivity ? emp.lastActivity.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' }}
                  </TableCell>
                </TableRow>
                <TableRow v-if="employeeStats.length === 0">
                  <TableCell colspan="8" class="h-32 text-center">
                    <div class="flex flex-col items-center gap-2 text-muted-foreground">
                      <Icon name="i-lucide-users" class="size-8 text-muted-foreground/40" />
                      <p class="font-medium">No employee data</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>
