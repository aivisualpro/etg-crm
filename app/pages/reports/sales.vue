<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { TrendingUp } from 'lucide-vue-next'

const { setHeader } = usePageHeader()
setHeader({ title: 'Sales Reports', description: 'Comprehensive sales analytics and performance insights', icon: 'i-lucide-trending-up' })

const activeTab = ref('overview')
const loading = ref(true)
const allProjects = ref<any[]>([])
const customerNameMap = ref<Record<string, string>>({})

// ─── Fetch real project data ────────────────────────
async function fetchData() {
  loading.value = true
  try {
    const [projectData, customerData] = await Promise.all([
      $fetch<{ success: boolean, projects: any[] }>('/api/bigquery/projects'),
      $fetch<{ success: boolean, customers: any[] }>('/api/bigquery/customers').catch(() => ({ success: false, customers: [] })),
    ])
    if (projectData.success) allProjects.value = projectData.projects
    if (customerData.success) {
      customerNameMap.value = Object.fromEntries(
        customerData.customers
          .filter((c: any) => c['Customer ID'])
          .map((c: any) => [
            c['Customer ID'],
            [c['First Name'], c['Last Name']].filter(Boolean).join(' ') || c['Customer ID'],
          ]),
      )
    }
  }
  catch {}
  finally {
    loading.value = false
  }
}
onMounted(fetchData)

// ─── Parse helpers ──────────────────────────────────
function parsePrice(val: any): number {
  if (!val) return 0
  const n = Number.parseFloat(String(val).replace(/[^0-9.-]/g, ''))
  return Number.isNaN(n) ? 0 : n
}

function parseDate(val: any): Date | null {
  if (!val) return null
  try {
    const d = new Date(val?.value || val)
    return isNaN(d.getTime()) ? null : d
  }
  catch { return null }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ─── KPI Cards (computed from real data) ────────────
const kpis = computed(() => {
  const ps = allProjects.value
  const totalRevenue = ps.reduce((s, p) => s + parsePrice(p['Project Price']), 0)
  const totalDeals = ps.length
  const avgDeal = totalDeals > 0 ? Math.round(totalRevenue / totalDeals) : 0

  // Completed projects count
  const completed = ps.filter(p => {
    const s = (p['Project Status'] || '').toLowerCase()
    return s.includes('completed') || s.includes('complete') || s.includes('done') || s.includes('closed')
  }).length

  const winRate = totalDeals > 0 ? Math.round((completed / totalDeals) * 1000) / 10 : 0

  // Pipeline = contract price of non-completed projects
  const pipeline = ps.filter(p => {
    const s = (p['Project Status'] || '').toLowerCase()
    return !(s.includes('completed') || s.includes('complete') || s.includes('done') || s.includes('closed') || s.includes('cancelled') || s.includes('canceled'))
  }).reduce((s, p) => s + parsePrice(p['Contract Price'] || p['Project Price']), 0)

  // Average project duration in days
  const durations: number[] = []
  ps.forEach(p => {
    const start = parseDate(p['Project Start'])
    const end = parseDate(p['Project End'] || p['Completion Date'])
    if (start && end && end > start) {
      durations.push(Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
    }
  })
  const avgCycle = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0

  return [
    { label: 'Total Revenue', value: totalRevenue, prefix: '$', suffix: '', change: 0, icon: 'i-lucide-dollar-sign', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Total Projects', value: totalDeals, prefix: '', suffix: '', change: 0, icon: 'i-lucide-handshake', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Avg. Project Value', value: avgDeal, prefix: '$', suffix: '', change: 0, icon: 'i-lucide-bar-chart-3', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Completion Rate', value: winRate, prefix: '', suffix: '%', change: 0, icon: 'i-lucide-trophy', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Pipeline Value', value: pipeline, prefix: '$', suffix: '', change: 0, icon: 'i-lucide-layers', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { label: 'Avg. Duration', value: avgCycle, prefix: '', suffix: ' days', change: 0, icon: 'i-lucide-clock', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  ]
})

// ─── Revenue Trend (monthly) ────────────────────────
const revenueData = computed(() => {
  const now = new Date()
  const thisYear = now.getFullYear()
  const lastYear = thisYear - 1

  const monthlyThis: Record<number, number> = {}
  const monthlyLast: Record<number, number> = {}

  allProjects.value.forEach(p => {
    const d = parseDate(p.TimeStamp)
    const price = parsePrice(p['Project Price'])
    if (!d) return
    if (d.getFullYear() === thisYear) {
      monthlyThis[d.getMonth()] = (monthlyThis[d.getMonth()] || 0) + price
    }
    else if (d.getFullYear() === lastYear) {
      monthlyLast[d.getMonth()] = (monthlyLast[d.getMonth()] || 0) + price
    }
  })

  return MONTHS.map((m, i) => ({
    month: m,
    revenue: Math.round(monthlyThis[i] || 0),
    lastYear: Math.round(monthlyLast[i] || 0),
  }))
})

// ─── Pipeline by Status ─────────────────────────────
const pipelineData = computed(() => {
  const groups: Record<string, number> = {}
  allProjects.value.forEach(p => {
    const status = p['Project Status'] || 'Unknown'
    groups[status] = (groups[status] || 0) + parsePrice(p['Project Price'])
  })
  return Object.entries(groups)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
})

const pipelineMax = computed(() => pipelineData.value[0]?.value ?? 1)
const funnelColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#84cc16'] as const

// ─── Revenue by Project Type ────────────────────────
const productData = computed(() => {
  const groups: Record<string, number> = {}
  allProjects.value.forEach(p => {
    const type = p['Project Type'] || 'Other'
    groups[type] = (groups[type] || 0) + parsePrice(p['Project Price'])
  })
  return Object.entries(groups)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
})

// ─── Monthly Deals Breakdown ────────────────────────
const dealsData = computed(() => {
  const now = new Date()
  const thisYear = now.getFullYear()

  const monthly: Record<number, { completed: number, cancelled: number, active: number }> = {}
  MONTHS.forEach((_, i) => { monthly[i] = { completed: 0, cancelled: 0, active: 0 } })

  allProjects.value.forEach(p => {
    const d = parseDate(p.TimeStamp)
    if (!d || d.getFullYear() !== thisYear) return
    const m = d.getMonth()
    if (!monthly[m]) return
    const s = (p['Project Status'] || '').toLowerCase()
    if (s.includes('completed') || s.includes('complete') || s.includes('done')) {
      monthly[m].completed++
    }
    else if (s.includes('cancelled') || s.includes('canceled')) {
      monthly[m].cancelled++
    }
    else {
      monthly[m].active++
    }
  })

  return MONTHS.map((month, i) => ({
    month,
    completed: monthly[i]?.completed ?? 0,
    cancelled: monthly[i]?.cancelled ?? 0,
    active: monthly[i]?.active ?? 0,
  }))
})

// ─── Top Sales Reps / Project Managers ──────────────
const topReps = computed(() => {
  const groups: Record<string, { revenue: number, deals: number, completed: number }> = {}

  allProjects.value.forEach(p => {
    const rep = p['Sales Rep'] || p['Project Manager'] || ''
    if (!rep) return
    if (!groups[rep]) groups[rep] = { revenue: 0, deals: 0, completed: 0 }
    groups[rep].revenue += parsePrice(p['Project Price'])
    groups[rep].deals++
    const s = (p['Project Status'] || '').toLowerCase()
    if (s.includes('completed') || s.includes('complete') || s.includes('done')) {
      groups[rep].completed++
    }
  })

  return Object.entries(groups)
    .map(([name, data]) => ({
      name,
      revenue: Math.round(data.revenue),
      deals: data.deals,
      quota: data.deals > 0 ? Math.round((data.completed / data.deals) * 100) : 0,
      avatar: name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase(),
      role: 'Project Manager',
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)
})

// ─── Top Clients ────────────────────────────────────
const topClients = computed(() => {
  const groups: Record<string, { revenue: number, deals: number, statuses: Set<string> }> = {}

  allProjects.value.forEach(p => {
    const rawName = p['Customer name'] || p['Customer ID'] || ''
    if (!rawName) return
    const name = customerNameMap.value[rawName] || customerNameMap.value[p['Customer ID']] || rawName
    if (!groups[name]) groups[name] = { revenue: 0, deals: 0, statuses: new Set() }
    groups[name].revenue += parsePrice(p['Project Price'])
    groups[name].deals++
    if (p['Project Status']) groups[name].statuses.add(p['Project Status'])
  })

  return Object.entries(groups)
    .map(([name, data]) => {
      const statuses = [...data.statuses].map(s => s.toLowerCase())
      let status = 'Active'
      if (statuses.every(s => s.includes('completed') || s.includes('complete') || s.includes('done'))) status = 'Completed'
      else if (statuses.some(s => s.includes('cancelled') || s.includes('canceled'))) status = 'At Risk'
      return { name, lifetime: Math.round(data.revenue), deals: data.deals, status }
    })
    .sort((a, b) => b.lifetime - a.lifetime)
    .slice(0, 8)
})

// ─── Revenue by Branch ──────────────────────────────
const regionData = computed(() => {
  const groups: Record<string, number> = {}
  let total = 0
  allProjects.value.forEach(p => {
    const branch = p['Branch Name'] || 'Other'
    const price = parsePrice(p['Project Price'])
    groups[branch] = (groups[branch] || 0) + price
    total += price
  })

  return Object.entries(groups)
    .map(([region, revenue]) => ({
      region,
      revenue: Math.round(revenue),
      pct: total > 0 ? Math.round((revenue / total) * 100) : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6)
})

// ─── Quarterly Forecast ─────────────────────────────
const forecastData = computed(() => {
  const now = new Date()
  const year = now.getFullYear()

  const quarters = [
    { label: `Q1 ${year}`, start: new Date(year, 0, 1), end: new Date(year, 2, 31, 23, 59, 59) },
    { label: `Q2 ${year}`, start: new Date(year, 3, 1), end: new Date(year, 5, 30, 23, 59, 59) },
    { label: `Q3 ${year}`, start: new Date(year, 6, 1), end: new Date(year, 8, 30, 23, 59, 59) },
    { label: `Q4 ${year}`, start: new Date(year, 9, 1), end: new Date(year, 11, 31, 23, 59, 59) },
  ]

  return quarters.map((q, i) => {
    const qProjects = allProjects.value.filter(p => {
      const d = parseDate(p.TimeStamp)
      return d && d >= q.start && d <= q.end
    })
    const actual = qProjects.reduce((s, p) => s + parsePrice(p['Project Price']), 0)
    const isPast = now > q.end
    const isCurrent = now >= q.start && now <= q.end
    return {
      quarter: q.label,
      actual: Math.round(actual) || null,
      forecast: Math.round(actual * (isPast ? 1 : isCurrent ? 1.15 : 1.2 + (i * 0.05))),
      confidence: isPast ? 100 : isCurrent ? 85 : Math.max(60, 80 - (i * 10)),
    }
  })
})

// ─── Pipeline Metrics ───────────────────────────────
const pipelineMetrics = computed(() => {
  const ps = allProjects.value
  const totalRevenue = ps.reduce((s, p) => s + parsePrice(p['Project Price']), 0)
  const completed = ps.filter(p => {
    const s = (p['Project Status'] || '').toLowerCase()
    return s.includes('completed') || s.includes('complete') || s.includes('done')
  })
  const completedRevenue = completed.reduce((s, p) => s + parsePrice(p['Project Price']), 0)

  const pipeline = ps.filter(p => {
    const s = (p['Project Status'] || '').toLowerCase()
    return !(s.includes('completed') || s.includes('complete') || s.includes('done') || s.includes('cancelled') || s.includes('canceled'))
  })
  const pipelineVal = pipeline.reduce((s, p) => s + parsePrice(p['Project Price']), 0)
  const coverage = completedRevenue > 0 ? (pipelineVal / completedRevenue).toFixed(1) : '0'
  const convRate = ps.length > 0 ? ((completed.length / ps.length) * 100).toFixed(1) : '0'
  const cancelled = ps.filter(p => {
    const s = (p['Project Status'] || '').toLowerCase()
    return s.includes('cancelled') || s.includes('canceled')
  }).length

  // Average durations
  const durations: number[] = []
  ps.forEach(p => {
    const start = parseDate(p['Project Start'])
    const end = parseDate(p['Project End'] || p['Completion Date'])
    if (start && end && end > start) {
      durations.push(Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
    }
  })
  const avgDuration = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0

  return [
    { label: 'Pipeline Coverage', value: `${coverage}x`, desc: `${pipeline.length} active projects`, good: Number(coverage) >= 1 },
    { label: 'Avg. Project Duration', value: `${avgDuration} days`, desc: `Based on ${durations.length} projects`, good: true },
    { label: 'Completion Rate', value: `${convRate}%`, desc: `${completed.length} of ${ps.length} projects`, good: Number(convRate) > 50 },
    { label: 'Cancelled Projects', value: String(cancelled), desc: `Out of ${ps.length} total`, good: cancelled < ps.length * 0.1 },
    { label: 'Active Pipeline', value: fmt(pipelineVal), desc: `${pipeline.length} ongoing projects`, good: true },
    { label: 'Total Revenue', value: fmt(totalRevenue), desc: 'All-time project value', good: true },
  ]
})

// ─── Helpers ────────────────────────────────────────
function fmt(n: number) {
  if (n >= 1000000)
    return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000)
    return `$${(n / 1000).toFixed(0)}K`
  return `$${n.toLocaleString()}`
}

function fmtFull(n: number) {
  return `$${n.toLocaleString('en-US')}`
}

const avatarColors = [
  'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  'bg-pink-500/15 text-pink-600 dark:text-pink-400',
  'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
  'bg-rose-500/15 text-rose-600 dark:text-rose-400',
  'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
]
</script>

<template>
  <div class="w-full flex-1 min-h-0 overflow-auto">
  <div class="flex flex-col gap-5 p-1">
    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-3">
      <Icon name="i-lucide-loader-2" class="size-8 animate-spin text-muted-foreground" />
      <p class="text-sm text-muted-foreground">Loading sales data…</p>
    </div>

    <template v-else>
      <!-- Tab Navigation -->
      <div class="flex items-center gap-1 border rounded-lg p-1 bg-muted/30 w-fit">
        <button
          v-for="tab in [{ id: 'overview', label: 'Overview', icon: 'i-lucide-layout-dashboard' }, { id: 'pipeline', label: 'Pipeline', icon: 'i-lucide-funnel' }, { id: 'team', label: 'Team', icon: 'i-lucide-users' }, { id: 'forecast', label: 'Forecast', icon: 'i-lucide-brain' }]"
          :key="tab.id"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all" :class="[
            activeTab === tab.id ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="activeTab = tab.id"
        >
          <Icon :name="tab.icon" class="size-3.5" />
          {{ tab.label }}
        </button>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Card v-for="(kpi, i) in kpis" :key="i">
          <CardContent class="p-4 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-center rounded-lg p-1.5" :class="kpi.bg">
                <Icon :name="kpi.icon" class="size-3.5" :class="kpi.color" />
              </div>
            </div>
            <div>
              <p class="text-xl font-bold tabular-nums leading-tight">
                {{ kpi.prefix }}<NumberFlow :value="kpi.value" :format="{ notation: kpi.value > 99999 ? 'compact' : 'standard', maximumFractionDigits: 1 }" />{{ kpi.suffix }}
              </p>
              <p class="text-[10px] text-muted-foreground mt-0.5">
                {{ kpi.label }}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- OVERVIEW TAB -->
      <template v-if="activeTab === 'overview'">
        <!-- Revenue Trend + Product Mix -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card class="lg:col-span-2">
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle class="text-sm font-semibold">
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Monthly revenue: this year vs last year</CardDescription>
                </div>
                <Badge variant="secondary" class="text-xs">
                  {{ allProjects.length }} projects
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <AreaChart
                :data="revenueData"
                index="month"
                :categories="['revenue', 'lastYear']"
                :colors="['#10b981', '#94a3b8']"
                :y-formatter="(v: number | Date) => `$${(Number(v) / 1000).toFixed(0)}K`"
                class="h-[280px]"
                :show-legend="true"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-semibold">
                Revenue by Project Type
              </CardTitle>
              <CardDescription>Project type contribution to total revenue</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-col items-center">
              <DonutChart
                :data="productData"
                index="name"
                category="value"
                :colors="['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4']"
                :value-formatter="(v: number) => fmt(v)"
                class="h-[180px]"
              />
              <div class="w-full mt-4 space-y-2">
                <div v-for="(p, i) in productData" :key="p.name" class="flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <div class="size-2.5 rounded-full" :style="{ background: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'][i] }" />
                    <span class="text-muted-foreground">{{ p.name }}</span>
                  </div>
                  <span class="font-semibold tabular-nums">{{ fmt(p.value) }}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Deals Breakdown + Branch Revenue -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-semibold">
                Projects Breakdown
              </CardTitle>
              <CardDescription>Monthly completed, cancelled, and active projects (this year)</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                :data="dealsData"
                index="month"
                :categories="['completed', 'cancelled', 'active']"
                :colors="['#10b981', '#ef4444', '#f59e0b']"
                type="stacked"
                :rounded-corners="4"
                class="h-[260px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-semibold">
                Revenue by Branch
              </CardTitle>
              <CardDescription>Branch-level revenue distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div v-for="r in regionData" :key="r.region" class="space-y-1.5">
                  <div class="flex items-center justify-between text-sm">
                    <span class="font-medium">{{ r.region }}</span>
                    <span class="text-muted-foreground tabular-nums">{{ fmt(r.revenue) }} <span class="text-[10px]">({{ r.pct }}%)</span></span>
                  </div>
                  <div class="h-2 rounded-full bg-muted overflow-hidden">
                    <div class="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-1000" :style="{ width: `${r.pct}%` }" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Top Clients Table -->
        <Card>
          <CardHeader class="pb-2">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-sm font-semibold">
                  Top Customers
                </CardTitle>
                <CardDescription>Highest revenue generating customers</CardDescription>
              </div>
              <Badge variant="secondary" class="text-xs">
                {{ topClients.length }} customers
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead class="text-right">
                    Total Revenue
                  </TableHead>
                  <TableHead class="text-center">
                    Projects
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(c, i) in topClients" :key="c.name">
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <div class="flex items-center justify-center rounded-full size-7 text-[10px] font-bold" :class="avatarColors[i % avatarColors.length]">
                        {{ c.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2) }}
                      </div>
                      <span class="font-medium text-sm">{{ c.name }}</span>
                    </div>
                  </TableCell>
                  <TableCell class="text-right font-semibold tabular-nums">
                    {{ fmtFull(c.lifetime) }}
                  </TableCell>
                  <TableCell class="text-center tabular-nums">
                    {{ c.deals }}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      :class="c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : c.status === 'At Risk' ? 'bg-amber-500/10 text-amber-600 border-amber-200' : 'bg-blue-500/10 text-blue-600 border-blue-200'"
                    >
                      {{ c.status }}
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </template>

      <!-- PIPELINE TAB -->
      <template v-if="activeTab === 'pipeline'">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card class="lg:col-span-2">
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-semibold">
                Pipeline by Project Status
              </CardTitle>
              <CardDescription>Revenue value at each project status</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div v-for="(stage, i) in pipelineData" :key="stage.name" class="space-y-1.5">
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center gap-2">
                      <div class="size-3 rounded" :style="{ background: funnelColors[i % funnelColors.length] }" />
                      <span class="font-medium">{{ stage.name }}</span>
                    </div>
                    <span class="font-semibold tabular-nums">{{ fmt(stage.value) }}</span>
                  </div>
                  <div class="h-8 rounded-lg overflow-hidden bg-muted/50 relative">
                    <div
                      class="h-full rounded-lg transition-all duration-1000 flex items-center px-3"
                      :style="{ width: `${(stage.value / pipelineMax) * 100}%`, background: funnelColors[i % funnelColors.length] }"
                    >
                      <span class="text-white text-xs font-semibold">{{ Math.round((stage.value / pipelineMax) * 100) }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-semibold">
                Pipeline Metrics
              </CardTitle>
              <CardDescription>Key pipeline health indicators</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div
                v-for="metric in pipelineMetrics" :key="metric.label" class="flex items-center justify-between"
              >
                <div>
                  <p class="text-sm font-medium">
                    {{ metric.label }}
                  </p>
                  <p class="text-[10px] text-muted-foreground">
                    {{ metric.desc }}
                  </p>
                </div>
                <span class="text-sm font-bold tabular-nums" :class="metric.good ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                  {{ metric.value }}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <!-- TEAM TAB -->
      <template v-if="activeTab === 'team'">
        <Card>
          <CardHeader class="pb-2">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-sm font-semibold">
                  Project Manager Leaderboard
                </CardTitle>
                <CardDescription>Performance ranking by revenue managed</CardDescription>
              </div>
              <Badge variant="secondary" class="text-xs">
                {{ topReps.length }} managers
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-12">
                    Rank
                  </TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead class="text-right">
                    Revenue
                  </TableHead>
                  <TableHead class="text-center">
                    Projects
                  </TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead class="text-right">
                    Avg. Project
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(rep, i) in topReps" :key="rep.name">
                  <TableCell>
                    <div class="flex items-center justify-center size-6 rounded-full text-[10px] font-bold" :class="i < 3 ? 'bg-amber-500/15 text-amber-600' : 'bg-muted text-muted-foreground'">
                      {{ i + 1 }}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2.5">
                      <div class="flex items-center justify-center rounded-full size-8 text-xs font-bold" :class="avatarColors[i % avatarColors.length]">
                        {{ rep.avatar }}
                      </div>
                      <div>
                        <p class="text-sm font-medium">
                          {{ rep.name }}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell class="text-right font-semibold tabular-nums">
                    {{ fmtFull(rep.revenue) }}
                  </TableCell>
                  <TableCell class="text-center tabular-nums">
                    {{ rep.deals }}
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div class="h-full rounded-full transition-all" :class="rep.quota >= 85 ? 'bg-emerald-500' : rep.quota >= 70 ? 'bg-amber-500' : 'bg-rose-500'" :style="{ width: `${rep.quota}%` }" />
                      </div>
                      <span class="text-xs font-medium tabular-nums w-8 text-right">{{ rep.quota }}%</span>
                    </div>
                  </TableCell>
                  <TableCell class="text-right tabular-nums text-sm text-muted-foreground">
                    {{ rep.deals > 0 ? fmt(Math.round(rep.revenue / rep.deals)) : '—' }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </template>

      <!-- FORECAST TAB -->
      <template v-if="activeTab === 'forecast'">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-semibold">
                Quarterly Revenue
              </CardTitle>
              <CardDescription>Actual revenue vs forecast by quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                :data="forecastData"
                index="quarter"
                :categories="['actual', 'forecast']"
                :colors="['#10b981', '#94a3b8']"
                type="grouped"
                :rounded-corners="6"
                :y-formatter="(v: number | Date) => v ? `$${(Number(v) / 1000).toFixed(0)}K` : '—'"
                class="h-[280px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm font-semibold">
                Forecast Confidence
              </CardTitle>
              <CardDescription>Prediction confidence by quarter</CardDescription>
            </CardHeader>
            <CardContent class="space-y-5">
              <div v-for="f in forecastData" :key="f.quarter" class="space-y-2">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-semibold">
                      {{ f.quarter }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                      Forecast: {{ fmt(f.forecast) }}
                      <template v-if="f.actual">
                        • Actual: {{ fmt(f.actual) }}
                      </template>
                    </p>
                  </div>
                  <Badge variant="outline" :class="f.confidence >= 90 ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : f.confidence >= 80 ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10' : 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10'">
                    {{ f.confidence }}% confidence
                  </Badge>
                </div>
                <div class="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-700" :class="f.confidence >= 90 ? 'bg-emerald-500' : f.confidence >= 80 ? 'bg-blue-500' : 'bg-amber-500'" :style="{ width: `${f.confidence}%` }" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </template>
  </div>
  </div>
</template>
