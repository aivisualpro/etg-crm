<script setup lang="ts">
import NumberFlow from '@number-flow/vue'

const { setHeader } = usePageHeader()
setHeader({ title: 'Home', icon: 'i-lucide-layout-dashboard', description: 'Overview of your operations' })

// ─── Use the global prefetched data store ───────────────────
const {
  users,
  ready,
  init,
  furnitureRows,
  furnitureRowsReady,
  furnitureRowsFetching,
  furnitureRowsProgress,
  ensureFurnitureRows,
  level1Map,
  level2Map,
  level3Map,
} = useDashboardStore()

// Ensure store is initialized
init()
ensureFurnitureRows()

// ─── Greeting ───────────────────────────────────────────────
const { user: authUser } = useAuth()
const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
})
const firstName = computed(() => {
  const name = authUser.value?.name || ''
  return name.split(' ')[0] || 'there'
})

// ─── KPIs ───────────────────────────────────────────────────
const totalAssets = computed(() => furnitureRows.value.length)
const totalUsers = computed(() => users.value.length)
const totalLocations = computed(() => Object.keys(level1Map.value).length)
const totalFloors = computed(() => Object.keys(level2Map.value).length)

const kpiCards = computed(() => [
  {
    label: 'Total Assets',
    value: totalAssets.value,
    icon: 'i-lucide-box',
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/10',
  },
  {
    label: 'Locations',
    value: totalLocations.value,
    icon: 'i-lucide-map-pin',
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/10',
  },
  {
    label: 'Floors',
    value: totalFloors.value,
    icon: 'i-lucide-layers',
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/10',
  },
  {
    label: 'Users',
    value: totalUsers.value,
    icon: 'i-lucide-users',
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/10',
  },
])

// ─── Quick Links ────────────────────────────────────────────
const quickLinks = computed(() => [
  { label: 'Furniture Report', count: totalAssets.value, icon: 'i-lucide-clipboard-list', link: '/reports/furniture', color: 'text-blue-500', bg: 'bg-blue-500/10', hoverBg: 'hover:bg-blue-500/15' },
  { label: 'Admin Furniture', count: null, icon: 'i-lucide-settings', link: '/admin/furniture', color: 'text-violet-500', bg: 'bg-violet-500/10', hoverBg: 'hover:bg-violet-500/15' },
  { label: 'Categories', count: null, icon: 'i-lucide-tag', link: '/admin/categories', color: 'text-amber-500', bg: 'bg-amber-500/10', hoverBg: 'hover:bg-amber-500/15' },
  { label: 'Users', count: totalUsers.value, icon: 'i-lucide-users', link: '/admin/users', color: 'text-cyan-500', bg: 'bg-cyan-500/10', hoverBg: 'hover:bg-cyan-500/15' },
])

// ─── Location breakdown ─────────────────────────────────────
const locationBreakdown = computed(() => {
  const counts: Record<string, number> = {}
  furnitureRows.value.forEach((r: any) => {
    const loc = r.A7 || 'Unknown'
    counts[loc] = (counts[loc] || 0) + 1
  })
  return Object.entries(counts)
    .map(([id, count]) => ({
      id,
      name: level1Map.value[id]?.eng || id,
      count,
      pct: totalAssets.value > 0 ? ((count / totalAssets.value) * 100).toFixed(1) : '0',
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
})

const maxLocationCount = computed(() => Math.max(...locationBreakdown.value.map(i => i.count), 1))

// ─── Entrance animation ────────────────────────────────────
const entered = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    entered.value = true
  })
})
</script>

<template>
  <div class="w-full flex-1 min-h-0 overflow-auto">
    <div class="max-w-7xl mx-auto px-4 md:px-6 py-5 space-y-5">

      <!-- ═══ WELCOME HERO ═══ -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/8 via-primary/3 to-transparent border border-primary/10 p-5 md:p-6 transition-all duration-700"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
      >
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/8 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

        <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-xl md:text-2xl font-bold tracking-tight">
              {{ greeting }}, {{ firstName }} 👋
            </h2>
            <p class="text-sm text-muted-foreground mt-1">
              Here's what's happening across your assets today.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <NuxtLink to="/reports/furniture">
              <Button variant="outline" size="sm" class="gap-1.5 shadow-sm hover:shadow-md transition-shadow">
                <Icon name="i-lucide-clipboard-list" class="size-3.5" />
                Furniture Report
              </Button>
            </NuxtLink>
            <NuxtLink to="/admin/furniture">
              <Button size="sm" class="gap-1.5 shadow-sm hover:shadow-md transition-shadow">
                <Icon name="i-lucide-settings" class="size-3.5" />
                Manage Assets
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ═══ FURNITURE LOADING PROGRESS ═══ -->
      <div
        v-if="furnitureRowsFetching && !furnitureRowsReady"
        class="rounded-xl border bg-card p-4 transition-all duration-500"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
      >
        <div class="flex items-center gap-3 mb-2">
          <Icon name="i-lucide-loader-2" class="size-4 text-primary animate-spin" />
          <span class="text-sm font-medium">Loading furniture data…</span>
          <span class="text-xs text-muted-foreground tabular-nums ml-auto">{{ furnitureRowsProgress }}%</span>
        </div>
        <div class="h-2 rounded-full bg-muted overflow-hidden">
          <div
            class="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
            :style="{ width: `${furnitureRowsProgress}%` }"
          />
        </div>
      </div>

      <!-- ═══ KPI CARDS ═══ -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          v-for="(kpi, idx) in kpiCards"
          :key="kpi.label"
          class="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          :class="[kpi.border, entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4']"
          :style="{ transitionDelay: `${150 + idx * 80}ms` }"
        >
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br opacity-60" :class="kpi.gradient" />

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{{ kpi.label }}</span>
              <div class="flex items-center justify-center size-8 rounded-lg transition-transform group-hover:scale-110" :class="kpi.iconBg">
                <Icon :name="kpi.icon" class="size-4" :class="kpi.iconColor" />
              </div>
            </div>
            <div class="text-2xl font-bold tracking-tight tabular-nums">
              <NumberFlow :value="kpi.value" :animated="true" />
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ QUICK ACCESS ═══ -->
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-2.5 transition-all duration-600"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        :style="{ transitionDelay: '500ms' }"
      >
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.label"
          :to="link.link"
          class="flex items-center gap-3 p-3.5 rounded-xl border bg-card hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5"
          :class="link.hoverBg"
        >
          <div class="flex items-center justify-center size-10 rounded-xl shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3" :class="link.bg">
            <Icon :name="link.icon" class="size-5" :class="link.color" />
          </div>
          <div class="min-w-0">
            <p class="text-xs font-semibold truncate">{{ link.label }}</p>
            <p v-if="link.count !== null" class="text-[10px] text-muted-foreground tabular-nums mt-0.5">
              <NumberFlow :value="link.count" :animated="true" class="inline" /> items
            </p>
          </div>
          <Icon name="i-lucide-chevron-right" class="ml-auto size-3.5 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
        </NuxtLink>
      </div>

      <!-- ═══ MAIN GRID ═══ -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <!-- LEFT COLUMN (2/3) -->
        <div class="lg:col-span-2 space-y-4">

          <!-- Location Breakdown -->
          <Card
            class="transition-all duration-600 hover:shadow-md"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '600ms' }"
          >
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-semibold flex items-center gap-2">
                <div class="flex items-center justify-center size-6 rounded-md bg-blue-500/10">
                  <Icon name="i-lucide-map-pin" class="size-3.5 text-blue-500" />
                </div>
                Assets by Location
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-2.5 px-4 pb-4">
              <div v-for="item in locationBreakdown" :key="item.id" class="group flex items-center gap-3">
                <span class="text-xs font-medium w-28 truncate shrink-0" :title="item.name">{{ item.name }}</span>
                <div class="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-out"
                    :style="{ width: entered ? `${(item.count / maxLocationCount) * 100}%` : '0%', opacity: 0.7 }"
                  />
                </div>
                <span class="text-xs font-bold tabular-nums w-12 text-right">{{ item.count }}</span>
              </div>
              <div v-if="locationBreakdown.length === 0 && furnitureRowsReady" class="py-8 text-center">
                <Icon name="i-lucide-inbox" class="size-8 text-muted-foreground/20 mx-auto mb-2" />
                <p class="text-xs text-muted-foreground">No asset data available</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- RIGHT COLUMN (1/3) -->
        <div class="space-y-4">

          <!-- Today's date card -->
          <div
            class="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-4 transition-all duration-600"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '650ms' }"
          >
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <Icon name="i-lucide-calendar-days" class="size-5 text-primary" />
              </div>
              <div>
                <p class="text-xs text-muted-foreground font-medium">Today</p>
                <p class="text-sm font-bold">
                  {{ new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) }}
                </p>
              </div>
            </div>
          </div>

          <!-- System status -->
          <Card
            class="transition-all duration-600 hover:shadow-md"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '750ms' }"
          >
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-semibold flex items-center gap-2">
                <div class="flex items-center justify-center size-6 rounded-md bg-emerald-500/10">
                  <Icon name="i-lucide-activity" class="size-3.5 text-emerald-500" />
                </div>
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3 px-4 pb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="size-2 rounded-full" :class="ready ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'" />
                  <span class="text-xs">Dashboard Store</span>
                </div>
                <Badge variant="outline" :class="ready ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'" class="text-[10px]">
                  {{ ready ? 'Ready' : 'Loading' }}
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="size-2 rounded-full" :class="furnitureRowsReady ? 'bg-emerald-500' : furnitureRowsFetching ? 'bg-amber-500 animate-pulse' : 'bg-zinc-400'" />
                  <span class="text-xs">Furniture Data</span>
                </div>
                <Badge variant="outline" :class="furnitureRowsReady ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'" class="text-[10px]">
                  {{ furnitureRowsReady ? 'Cached' : furnitureRowsFetching ? `${furnitureRowsProgress}%` : 'Idle' }}
                </Badge>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="size-2 rounded-full bg-emerald-500" />
                  <span class="text-xs">Users Loaded</span>
                </div>
                <Badge variant="outline" class="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  {{ users.length }}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  </div>
</template>
