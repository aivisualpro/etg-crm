<script setup lang="ts">
import NumberFlow from '@number-flow/vue'

const { setHeader } = usePageHeader()
setHeader({ title: 'Home', icon: 'i-lucide-layout-dashboard', description: 'Overview of your operations' })

// ─── Use the global prefetched data store ───────────────────
const {
  projects,
  userNameMap,
  customerNameMap,
  ready,
  init,
} = useDashboardStore()

// Ensure store is initialized
init()

// ─── Helpers ────────────────────────────────────────────────
function parsePrice(val: any): number {
  if (!val) return 0
  return Number.parseFloat(String(val).replace(/[^0-9.-]/g, '')) || 0
}

function parseDate(val: any): Date | null {
  if (!val) return null
  const v = val?.value || val
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? null : d
}

function resolveName(email: string): string {
  if (!email) return ''
  return userNameMap.value[email.toLowerCase()] || email.split('@')[0] || email
}

function resolveCustomer(id: string): string {
  if (!id) return '—'
  return customerNameMap.value[id] || id
}

function fmtCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n.toFixed(0)}`
}

function statusColor(status: string): string {
  const s = (status || '').toLowerCase()
  if (['completed', 'complete', 'done', 'rcvd', 'closed'].some(k => s.includes(k)))
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
  if (['in progress', 'active', 'open', 'started'].some(k => s.includes(k)))
    return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'
  if (['pending', 'new', 'tbd', 'hold', 'submitted', 'requested'].some(k => s.includes(k)))
    return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (['cancel', 'n/a', 'rejected'].some(k => s.includes(k)))
    return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

function statusDotColor(status: string): string {
  const s = (status || '').toLowerCase()
  if (['completed', 'complete', 'done', 'rcvd', 'closed'].some(k => s.includes(k)))
    return 'bg-emerald-500'
  if (['in progress', 'active', 'open', 'started'].some(k => s.includes(k)))
    return 'bg-blue-500'
  if (['pending', 'new', 'tbd', 'hold', 'submitted', 'requested'].some(k => s.includes(k)))
    return 'bg-amber-500'
  if (['cancel', 'n/a', 'rejected'].some(k => s.includes(k)))
    return 'bg-red-500'
  return 'bg-zinc-400'
}

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
const totalProjects = computed(() => projects.value.length)
const activeProjects = computed(() => projects.value.filter(p => (p['Job Status'] || '').toLowerCase() === 'in progress').length)
const completedProjects = computed(() => projects.value.filter(p => (p['Job Status'] || '').toLowerCase() === 'closed').length)
const totalRevenue = computed(() => projects.value.reduce((sum, p) => sum + parsePrice(p['Project Price']), 0))

const kpiCards = computed(() => [
  {
    label: 'Total Projects',
    value: totalProjects.value,
    icon: 'i-lucide-folder-kanban',
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/10',
  },
  {
    label: 'Active Projects',
    value: activeProjects.value,
    icon: 'i-lucide-activity',
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/10',
  },
  {
    label: 'Completed',
    value: completedProjects.value,
    icon: 'i-lucide-check-circle-2',
    gradient: 'from-violet-500/20 via-violet-500/5 to-transparent',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/10',
  },
  {
    label: 'Total Revenue',
    value: totalRevenue.value,
    isCurrency: true,
    icon: 'i-lucide-dollar-sign',
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/10',
  },
])

// ─── Quick Links ────────────────────────────────────────────
const quickLinks = computed(() => [
  { label: 'All Projects', count: totalProjects.value, icon: 'i-lucide-folder-kanban', link: '/projects/all-projects', color: 'text-blue-500', bg: 'bg-blue-500/10', hoverBg: 'hover:bg-blue-500/15' },
  { label: 'Customers', count: Object.keys(customerNameMap.value).length, icon: 'i-lucide-users', link: '/customers', color: 'text-amber-500', bg: 'bg-amber-500/10', hoverBg: 'hover:bg-amber-500/15' },
  { label: 'Permits', count: null, icon: 'i-lucide-clipboard-check', link: '/permits', color: 'text-violet-500', bg: 'bg-violet-500/10', hoverBg: 'hover:bg-violet-500/15' },
  { label: 'General Report', count: null, icon: 'i-lucide-clipboard-list', link: '/reports/general', color: 'text-cyan-500', bg: 'bg-cyan-500/10', hoverBg: 'hover:bg-cyan-500/15' },
])

// ─── Project status breakdown ───────────────────────────────
const projectStatusBreakdown = computed(() => {
  const counts: Record<string, number> = {}
  projects.value.forEach(p => {
    const s = p['Job Status'] || 'Unknown'
    counts[s] = (counts[s] || 0) + 1
  })
  return Object.entries(counts)
    .map(([status, count]) => ({ status, count, pct: totalProjects.value > 0 ? ((count / totalProjects.value) * 100).toFixed(1) : '0' }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
})

// Bar chart max for scaling
const maxStatusCount = computed(() => Math.max(...projectStatusBreakdown.value.map(i => i.count), 1))

// ─── Recent Projects (last 14 days) ─────────────────────────
const recentProjects = computed(() => {
  const now = new Date()
  const twoWeeksAgo = new Date(now.getTime() - 14 * 86400000)
  return projects.value
    .map(p => {
      const d = parseDate(p.TimeStamp)
      return { ...p, _date: d }
    })
    .filter(p => p._date && p._date >= twoWeeksAgo)
    .sort((a, b) => b._date!.getTime() - a._date!.getTime())
    .slice(0, 8)
})

// ─── Project Type breakdown ─────────────────────────────────
const projectTypeBreakdown = computed(() => {
  const counts: Record<string, number> = {}
  projects.value.forEach(p => {
    const t = p['Project Type'] || 'Other'
    counts[t] = (counts[t] || 0) + 1
  })
  return Object.entries(counts)
    .map(([type, count]) => ({ type, count, pct: totalProjects.value > 0 ? ((count / totalProjects.value) * 100) : 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

const typeColors = ['bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500', 'bg-rose-500']
const typeTextColors = ['text-blue-600 dark:text-blue-400', 'text-violet-600 dark:text-violet-400', 'text-amber-600 dark:text-amber-400', 'text-emerald-600 dark:text-emerald-400', 'text-rose-600 dark:text-rose-400']

// ─── Branch breakdown ───────────────────────────────────────
const branchBreakdown = computed(() => {
  const counts: Record<string, { count: number, revenue: number }> = {}
  projects.value.forEach(p => {
    const b = p['Branch Name'] || 'Other'
    if (!counts[b]) counts[b] = { count: 0, revenue: 0 }
    counts[b]!.count++
    counts[b]!.revenue += parsePrice(p['Project Price'])
  })
  return Object.entries(counts)
    .map(([branch, data]) => ({ branch, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
})

const maxBranchRevenue = computed(() => Math.max(...branchBreakdown.value.map(i => i.revenue), 1))

// ─── Notifications / Alerts ────────────────────────────────
const notifications = computed(() => {
  const items: { category: string, label: string, count: number, icon: string, color: string, bgColor: string }[] = []

  const ptoPending = projects.value.filter(p => {
    const s = (p['PTO Status'] || '').toLowerCase()
    return s === 'new' || s === 'requested' || s === 'submitted'
  }).length
  if (ptoPending > 0) items.push({ category: 'PTO', label: 'PTO Pending / Submitted', count: ptoPending, icon: 'i-lucide-clock', color: 'text-amber-500', bgColor: 'bg-amber-500/10' })

  const incomplete = projects.value.filter(p => {
    const s = (p['Completion Status'] || '').toLowerCase()
    return s === 'incomplete' || s === 'pending'
  }).length
  if (incomplete > 0) items.push({ category: 'Projects', label: 'Incomplete / Pending', count: incomplete, icon: 'i-lucide-alert-circle', color: 'text-red-500', bgColor: 'bg-red-500/10' })

  const newJobs = projects.value.filter(p => (p['Project Status'] || '').toLowerCase() === 'new job').length
  if (newJobs > 0) items.push({ category: 'Projects', label: 'New Jobs Awaiting Action', count: newJobs, icon: 'i-lucide-plus-circle', color: 'text-blue-500', bgColor: 'bg-blue-500/10' })

  const onHold = projects.value.filter(p => (p['Project Status'] || '').toLowerCase() === 'on hold').length
  if (onHold > 0) items.push({ category: 'Projects', label: 'Projects On Hold', count: onHold, icon: 'i-lucide-pause-circle', color: 'text-orange-500', bgColor: 'bg-orange-500/10' })

  const noApproval = projects.value.filter(p => (p['Project Status'] || '').toLowerCase() === 'no approval').length
  if (noApproval > 0) items.push({ category: 'Projects', label: 'No Approval', count: noApproval, icon: 'i-lucide-shield-alert', color: 'text-red-500', bgColor: 'bg-red-500/10' })

  return items
})

// ─── Entrance animation ────────────────────────────────────
const entered = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    entered.value = true
  })
})

// ─── Date formatting ────────────────────────────────────────
function timeAgo(date: Date | null): string {
  if (!date) return ''
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
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
              Here's what's happening across your projects today.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <NuxtLink to="/projects/all-projects">
              <Button variant="outline" size="sm" class="gap-1.5 shadow-sm hover:shadow-md transition-shadow">
                <Icon name="i-lucide-folder-kanban" class="size-3.5" />
                View Projects
              </Button>
            </NuxtLink>
            <NuxtLink to="/reports/general">
              <Button size="sm" class="gap-1.5 shadow-sm hover:shadow-md transition-shadow">
                <Icon name="i-lucide-bar-chart-3" class="size-3.5" />
                Reports
              </Button>
            </NuxtLink>
          </div>
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
              <template v-if="kpi.isCurrency">
                {{ fmtCurrency(kpi.value) }}
              </template>
              <NumberFlow v-else :value="kpi.value" :animated="true" />
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

          <!-- Project Status + Branch Revenue -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <!-- Job Status Chart -->
            <Card
              class="transition-all duration-600 hover:shadow-md"
              :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '600ms' }"
            >
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-semibold flex items-center gap-2">
                  <div class="flex items-center justify-center size-6 rounded-md bg-blue-500/10">
                    <Icon name="i-lucide-activity" class="size-3.5 text-blue-500" />
                  </div>
                  Project Status
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-2.5 px-4 pb-4">
                <div v-for="item in projectStatusBreakdown" :key="item.status" class="group flex items-center gap-3">
                  <Badge variant="outline" :class="statusColor(item.status)" class="text-[10px] w-24 justify-center shrink-0 font-medium">
                    {{ item.status }}
                  </Badge>
                  <div class="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-1000 ease-out"
                      :class="statusDotColor(item.status)"
                      :style="{ width: entered ? `${(item.count / maxStatusCount) * 100}%` : '0%', opacity: 0.7 }"
                    />
                  </div>
                  <span class="text-xs font-bold tabular-nums w-8 text-right">{{ item.count }}</span>
                </div>
              </CardContent>
            </Card>

            <!-- Branch Revenue -->
            <Card
              class="transition-all duration-600 hover:shadow-md"
              :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '700ms' }"
            >
              <CardHeader class="pb-3">
                <CardTitle class="text-sm font-semibold flex items-center gap-2">
                  <div class="flex items-center justify-center size-6 rounded-md bg-violet-500/10">
                    <Icon name="i-lucide-building-2" class="size-3.5 text-violet-500" />
                  </div>
                  Revenue by Branch
                </CardTitle>
              </CardHeader>
              <CardContent class="space-y-2 px-4 pb-4">
                <div v-for="(item, idx) in branchBreakdown" :key="item.branch" class="group">
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="size-2 rounded-full shrink-0" :class="typeColors[idx % typeColors.length]" />
                      <span class="text-xs font-medium truncate">{{ item.branch }}</span>
                    </div>
                    <div class="flex items-center gap-2.5 shrink-0">
                      <span class="text-[10px] text-muted-foreground tabular-nums">{{ item.count }} proj</span>
                      <span class="text-xs font-bold tabular-nums">{{ fmtCurrency(item.revenue) }}</span>
                    </div>
                  </div>
                  <div class="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-1000 ease-out opacity-60"
                      :class="typeColors[idx % typeColors.length]"
                      :style="{ width: entered ? `${(item.revenue / maxBranchRevenue) * 100}%` : '0%' }"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Recent Projects -->
          <Card
            class="transition-all duration-600 hover:shadow-md"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '800ms' }"
          >
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <CardTitle class="text-sm font-semibold flex items-center gap-2">
                  <div class="flex items-center justify-center size-6 rounded-md bg-cyan-500/10">
                    <Icon name="i-lucide-clock" class="size-3.5 text-cyan-500" />
                  </div>
                  Recent Projects
                  <Badge variant="outline" class="text-[9px] ml-1 font-normal">Last 14 days</Badge>
                </CardTitle>
                <NuxtLink to="/projects/all-projects" class="text-xs text-primary hover:underline flex items-center gap-1 group">
                  View all
                  <Icon name="i-lucide-arrow-right" class="size-3 group-hover:translate-x-0.5 transition-transform" />
                </NuxtLink>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <div class="divide-y">
                <div
                  v-for="(p, idx) in recentProjects"
                  :key="p['Project ID']"
                  class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/50 transition-all duration-200 group"
                  @click="navigateTo(`/projects/${p['Project ID']}`)"
                >
                  <Avatar class="size-9 border shrink-0 shadow-sm">
                    <AvatarFallback class="text-[10px] font-semibold bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                      {{ resolveCustomer(p['Customer ID']).substring(0, 2).toUpperCase() }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <p class="text-xs font-semibold truncate group-hover:text-primary transition-colors">{{ resolveCustomer(p['Customer ID']) }}</p>
                    </div>
                    <div class="flex items-center gap-2 mt-0.5">
                      <span class="text-[10px] text-muted-foreground font-mono">{{ p['Project ID'] }}</span>
                      <span class="text-[10px] text-muted-foreground/50">·</span>
                      <span class="text-[10px] text-muted-foreground">{{ timeAgo(p._date) }}</span>
                    </div>
                  </div>
                  <Badge variant="outline" :class="statusColor(p['Project Status'])" class="text-[9px] shrink-0 hidden sm:flex">
                    {{ p['Project Status'] || '—' }}
                  </Badge>
                  <span class="text-xs font-bold tabular-nums shrink-0">{{ fmtCurrency(parsePrice(p['Project Price'])) }}</span>
                  <Icon name="i-lucide-chevron-right" class="size-3.5 text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
              <div v-if="recentProjects.length === 0" class="py-12 text-center">
                <Icon name="i-lucide-inbox" class="size-10 text-muted-foreground/20 mx-auto mb-3" />
                <p class="text-sm text-muted-foreground">No recent projects</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- RIGHT COLUMN (1/3) -->
        <div class="space-y-4">

          <!-- Notifications / Alerts -->
          <Card
            class="transition-all duration-600 hover:shadow-md"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '650ms' }"
          >
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-semibold flex items-center gap-2">
                <div class="flex items-center justify-center size-6 rounded-md bg-red-500/10">
                  <Icon name="i-lucide-bell" class="size-3.5 text-red-500" />
                </div>
                Alerts
                <Badge v-if="notifications.length > 0" class="ml-auto text-[9px] bg-red-500/10 text-red-500 border-red-500/20 animate-pulse" variant="outline">
                  {{ notifications.length }}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-1 px-3 pb-3">
              <div
                v-for="(n, i) in notifications"
                :key="i"
                class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-all duration-200 group cursor-default"
              >
                <div class="flex items-center justify-center size-8 rounded-lg shrink-0" :class="n.bgColor">
                  <Icon :name="n.icon" class="size-4" :class="n.color" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium truncate">{{ n.label }}</p>
                  <p class="text-[10px] text-muted-foreground">{{ n.category }}</p>
                </div>
                <Badge variant="outline" class="text-[10px] tabular-nums shrink-0 font-bold">
                  {{ n.count }}
                </Badge>
              </div>
              <div v-if="notifications.length === 0" class="py-8 text-center">
                <div class="flex items-center justify-center size-12 rounded-full bg-emerald-500/10 mx-auto mb-3">
                  <Icon name="i-lucide-check-circle" class="size-6 text-emerald-500" />
                </div>
                <p class="text-xs font-medium text-emerald-600 dark:text-emerald-400">All clear!</p>
                <p class="text-[10px] text-muted-foreground mt-0.5">No pending alerts</p>
              </div>
            </CardContent>
          </Card>

          <!-- Project Type Distribution -->
          <Card
            class="transition-all duration-600 hover:shadow-md"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '750ms' }"
          >
            <CardHeader class="pb-3">
              <CardTitle class="text-sm font-semibold flex items-center gap-2">
                <div class="flex items-center justify-center size-6 rounded-md bg-amber-500/10">
                  <Icon name="i-lucide-layers" class="size-3.5 text-amber-500" />
                </div>
                Project Types
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3 px-4 pb-4">
              <!-- Mini pie-chart visual -->
              <div class="flex items-center gap-2 h-3 rounded-full overflow-hidden bg-muted">
                <div
                  v-for="(item, idx) in projectTypeBreakdown"
                  :key="item.type"
                  class="h-full transition-all duration-1000 ease-out first:rounded-l-full last:rounded-r-full"
                  :class="typeColors[idx % typeColors.length]"
                  :style="{ width: entered ? `${item.pct}%` : '0%', opacity: 0.8 }"
                />
              </div>

              <div class="space-y-2">
                <div v-for="(item, idx) in projectTypeBreakdown" :key="item.type" class="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="size-2.5 rounded-full shrink-0" :class="typeColors[idx % typeColors.length]" />
                    <Icon
                      :name="item.type === 'Solar' ? 'i-lucide-sun' : item.type === 'R&R' ? 'i-lucide-rotate-ccw' : 'i-lucide-box'"
                      class="size-3.5 shrink-0"
                      :class="typeTextColors[idx % typeTextColors.length]"
                    />
                    <span class="text-xs font-medium truncate">{{ item.type }}</span>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="text-[10px] text-muted-foreground tabular-nums">{{ item.pct.toFixed(0) }}%</span>
                    <span class="text-xs font-bold tabular-nums">{{ item.count.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Today's date card -->
          <div
            class="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-4 transition-all duration-600"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: '850ms' }"
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
        </div>
      </div>

    </div>
  </div>
</template>
