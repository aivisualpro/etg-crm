<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { TrendingDown, TrendingUp } from 'lucide-vue-next'

const { setHeader } = usePageHeader()
setHeader({ title: 'Financial Reports', description: 'Complete financial analytics and performance insights', icon: 'i-lucide-pie-chart' })

const activeTab = ref('pnl')
const loading = ref(true)
const allProjects = ref<any[]>([])

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ─── Fetch real project data ────────────────────────
async function fetchData() {
  loading.value = true
  try {
    const data = await $fetch<{ success: boolean, projects: any[] }>('/api/bigquery/projects')
    if (data.success) allProjects.value = data.projects
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
    return Number.isNaN(d.getTime()) ? null : d
  }
  catch { return null }
}

// ─── Year helpers ───────────────────────────────────
const currentYear = new Date().getFullYear()
const lastYear = currentYear - 1

function projectsForYear(year: number) {
  return allProjects.value.filter(p => {
    const d = parseDate(p.TimeStamp)
    return d && d.getFullYear() === year
  })
}

// ─── KPI Cards ──────────────────────────────────────
const kpis = computed(() => {
  const ps = allProjects.value
  const thisYearPs = projectsForYear(currentYear)
  const lastYearPs = projectsForYear(lastYear)

  const totalRevenue = thisYearPs.reduce((s, p) => s + parsePrice(p['Project Price']), 0)
  const lastRevenue = lastYearPs.reduce((s, p) => s + parsePrice(p['Project Price']), 0)

  const totalNet = thisYearPs.reduce((s, p) => s + parsePrice(p['Project Net Amount']), 0)
  const lastNet = lastYearPs.reduce((s, p) => s + parsePrice(p['Project Net Amount']), 0)

  const totalCost = thisYearPs.reduce((s, p) => s + parsePrice(p['Contract Price']), 0)
  const grossMargin = totalRevenue > 0 ? Math.round(((totalRevenue - totalCost) / totalRevenue) * 1000) / 10 : 0
  const lastCost = lastYearPs.reduce((s, p) => s + parsePrice(p['Contract Price']), 0)
  const lastGrossMargin = lastRevenue > 0 ? Math.round(((lastRevenue - lastCost) / lastRevenue) * 1000) / 10 : 0

  const opex = totalRevenue - totalNet
  const lastOpex = lastRevenue - lastNet

  // Completed projects revenue as "Cash"
  const completedRevenue = thisYearPs.filter(p => {
    const st = (p['Project Status'] || '').toLowerCase()
    return st.includes('completed') || st.includes('complete') || st.includes('done') || st.includes('closed')
  }).reduce((s, p) => s + parsePrice(p['Project Price']), 0)
  const lastCompleted = lastYearPs.filter(p => {
    const st = (p['Project Status'] || '').toLowerCase()
    return st.includes('completed') || st.includes('complete') || st.includes('done') || st.includes('closed')
  }).reduce((s, p) => s + parsePrice(p['Project Price']), 0)

  function yoyChange(cur: number, prev: number) {
    if (prev === 0) return cur > 0 ? 100 : 0
    return Math.round(((cur - prev) / Math.abs(prev)) * 1000) / 10
  }

  return [
    { label: 'Total Revenue', value: totalRevenue, prefix: '$', suffix: '', change: yoyChange(totalRevenue, lastRevenue), icon: 'i-lucide-trending-up', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Net Income', value: totalNet, prefix: '$', suffix: '', change: yoyChange(totalNet, lastNet), icon: 'i-lucide-circle-dollar-sign', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Gross Margin', value: grossMargin, prefix: '', suffix: '%', change: Math.round((grossMargin - lastGrossMargin) * 10) / 10, icon: 'i-lucide-percent', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Total Costs', value: opex, prefix: '$', suffix: '', change: yoyChange(opex, lastOpex), icon: 'i-lucide-receipt', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'EBITDA', value: totalNet, prefix: '$', suffix: '', change: yoyChange(totalNet, lastNet), icon: 'i-lucide-landmark', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { label: 'Collected Revenue', value: completedRevenue, prefix: '$', suffix: '', change: yoyChange(completedRevenue, lastCompleted), icon: 'i-lucide-wallet', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  ]
})

// ─── P&L Statement (this year vs last year) ─────────
const pnlData = computed(() => {
  const thisPs = projectsForYear(currentYear)
  const lastPs = projectsForYear(lastYear)

  // Group revenue by project type
  function revenueByType(ps: any[]) {
    const groups: Record<string, number> = {}
    ps.forEach(p => {
      const type = p['Project Type'] || 'Other'
      groups[type] = (groups[type] || 0) + parsePrice(p['Project Price'])
    })
    return groups
  }

  // Group costs by project type
  function costByType(ps: any[]) {
    const groups: Record<string, number> = {}
    ps.forEach(p => {
      const type = p['Project Type'] || 'Other'
      groups[type] = (groups[type] || 0) + parsePrice(p['Contract Price'])
    })
    return groups
  }

  const thisRevByType = revenueByType(thisPs)
  const lastRevByType = revenueByType(lastPs)
  const thisCostByType = costByType(thisPs)
  const lastCostByType = costByType(lastPs)

  // All unique types
  const allTypes = [...new Set([...Object.keys(thisRevByType), ...Object.keys(lastRevByType)])].sort()

  const revenueItems = allTypes.map(type => ({
    name: `${type} Revenue`,
    current: Math.round(thisRevByType[type] || 0),
    previous: Math.round(lastRevByType[type] || 0),
  }))

  const costItems = allTypes.map(type => ({
    name: `${type} Costs`,
    current: -Math.round(thisCostByType[type] || 0),
    previous: -Math.round(lastCostByType[type] || 0),
  })).filter(item => item.current !== 0 || item.previous !== 0)

  // Net amounts by branch as "Operating Expenses"
  function netByBranch(ps: any[]) {
    const groups: Record<string, number> = {}
    ps.forEach(p => {
      const branch = p['Branch Name'] || 'Other'
      const net = parsePrice(p['Project Net Amount'])
      const price = parsePrice(p['Project Price'])
      groups[branch] = (groups[branch] || 0) + (price - net)
    })
    return groups
  }
  const thisOpByBranch = netByBranch(thisPs)
  const lastOpByBranch = netByBranch(lastPs)
  const allBranches = [...new Set([...Object.keys(thisOpByBranch), ...Object.keys(lastOpByBranch)])].sort()

  const opexItems = allBranches.map(branch => ({
    name: `${branch} Operations`,
    current: -Math.round(thisOpByBranch[branch] || 0),
    previous: -Math.round(lastOpByBranch[branch] || 0),
  })).filter(item => item.current !== 0 || item.previous !== 0)

  return [
    { category: 'Revenue', items: revenueItems },
    { category: 'Cost of Goods Sold', items: costItems },
    { category: 'Operating Overhead', items: opexItems.length > 0 ? opexItems : [{ name: 'General Operations', current: 0, previous: 0 }] },
  ]
})

// ─── P&L Net totals ─────────────────────────────────
const pnlNetIncome = computed(() => {
  const thisPs = projectsForYear(currentYear)
  const lastPs = projectsForYear(lastYear)
  return {
    current: Math.round(thisPs.reduce((s, p) => s + parsePrice(p['Project Net Amount']), 0)),
    previous: Math.round(lastPs.reduce((s, p) => s + parsePrice(p['Project Net Amount']), 0)),
  }
})

// ─── Revenue Trend (monthly) ────────────────────────
const revenueTrend = computed(() => {
  const thisPs = projectsForYear(currentYear)
  const monthlyRev: Record<number, number> = {}
  const monthlyCost: Record<number, number> = {}

  thisPs.forEach(p => {
    const d = parseDate(p.TimeStamp)
    if (!d) return
    const m = d.getMonth()
    monthlyRev[m] = (monthlyRev[m] || 0) + parsePrice(p['Project Price'])
    monthlyCost[m] = (monthlyCost[m] || 0) + parsePrice(p['Contract Price'])
  })

  return MONTHS.map((month, i) => ({
    month,
    revenue: Math.round(monthlyRev[i] || 0),
    expenses: Math.round(monthlyCost[i] || 0),
    profit: Math.round((monthlyRev[i] || 0) - (monthlyCost[i] || 0)),
  }))
})

// ─── Expense Breakdown by Project Type ──────────────
const expenseBreakdown = computed(() => {
  const thisPs = projectsForYear(currentYear)
  const groups: Record<string, number> = {}
  thisPs.forEach(p => {
    const type = p['Project Type'] || 'Other'
    groups[type] = (groups[type] || 0) + parsePrice(p['Contract Price'])
  })
  return Object.entries(groups)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
})

// ─── Budget vs Actual by Branch ─────────────────────
const budgetData = computed(() => {
  const thisPs = projectsForYear(currentYear)
  const groups: Record<string, { contract: number, price: number }> = {}
  thisPs.forEach(p => {
    const branch = p['Branch Name'] || 'Other'
    if (!groups[branch]) groups[branch] = { contract: 0, price: 0 }
    groups[branch].contract += parsePrice(p['Contract Price'])
    groups[branch].price += parsePrice(p['Project Price'])
  })
  return Object.entries(groups)
    .map(([department, data]) => ({
      department,
      budget: Math.round(data.contract),
      actual: Math.round(data.price),
      variance: Math.round(data.contract - data.price),
    }))
    .sort((a, b) => b.actual - a.actual)
})

const budgetNetVariance = computed(() => {
  return budgetData.value.reduce((s, d) => s + d.variance, 0)
})

// ─── Cash Flow (monthly) ────────────────────────────
const cashFlowData = computed(() => {
  const thisPs = projectsForYear(currentYear)

  const monthlyOp: Record<number, number> = {}
  const monthlyInv: Record<number, number> = {}
  const monthlyFin: Record<number, number> = {}

  thisPs.forEach(p => {
    const d = parseDate(p.TimeStamp)
    if (!d) return
    const m = d.getMonth()
    const st = (p['Project Status'] || '').toLowerCase()
    const net = parsePrice(p['Project Net Amount'])
    const price = parsePrice(p['Project Price'])
    const cost = parsePrice(p['Contract Price'])

    if (st.includes('completed') || st.includes('complete') || st.includes('done') || st.includes('closed')) {
      monthlyOp[m] = (monthlyOp[m] || 0) + net
    }
    else if (st.includes('cancelled') || st.includes('canceled')) {
      monthlyFin[m] = (monthlyFin[m] || 0) - cost
    }
    else {
      monthlyInv[m] = (monthlyInv[m] || 0) - (price - net)
    }
  })

  return MONTHS.map((month, i) => ({
    month,
    operating: Math.round(monthlyOp[i] || 0),
    investing: Math.round(monthlyInv[i] || 0),
    financing: Math.round(monthlyFin[i] || 0),
  }))
})

// ─── Cash Flow Summary ──────────────────────────────
const cashFlowSummary = computed(() => {
  const op = cashFlowData.value.reduce((s, d) => s + d.operating, 0)
  const inv = cashFlowData.value.reduce((s, d) => s + d.investing, 0)
  const fin = cashFlowData.value.reduce((s, d) => s + d.financing, 0)
  return { operating: op, investing: inv, financing: fin, net: op + inv + fin }
})

// ─── Aged Receivables ───────────────────────────────
const receivablesData = computed(() => {
  const now = new Date()
  const activePs = allProjects.value.filter(p => {
    const st = (p['Project Status'] || '').toLowerCase()
    return !(st.includes('completed') || st.includes('complete') || st.includes('done') || st.includes('closed') || st.includes('cancelled') || st.includes('canceled'))
  })

  const buckets = [
    { bucket: 'Current', min: 0, max: 0, color: '#10b981' },
    { bucket: '1–30 Days', min: 1, max: 30, color: '#3b82f6' },
    { bucket: '31–60 Days', min: 31, max: 60, color: '#f59e0b' },
    { bucket: '61–90 Days', min: 61, max: 90, color: '#f97316' },
    { bucket: '90+ Days', min: 91, max: 99999, color: '#ef4444' },
  ]

  const result = buckets.map(b => ({ ...b, amount: 0, count: 0 }))

  activePs.forEach(p => {
    const start = parseDate(p['Project Start'] || p.TimeStamp)
    if (!start) return
    const daysOld = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const price = parsePrice(p['Project Price'])
    for (const r of result) {
      if (daysOld >= r.min && daysOld <= r.max) {
        r.amount += price
        r.count++
        break
      }
    }
  })

  const total = result.reduce((s, r) => s + r.amount, 0)
  return result.map(r => ({
    bucket: r.bucket,
    amount: Math.round(r.amount),
    pct: total > 0 ? Math.round((r.amount / total) * 100) : 0,
    count: r.count,
    color: r.color,
  }))
})

// ─── AR Metrics ─────────────────────────────────────
const arMetrics = computed(() => {
  const totalOutstanding = receivablesData.value.reduce((s, r) => s + r.amount, 0)
  const totalCount = receivablesData.value.reduce((s, r) => s + r.count, 0)
  const ps = allProjects.value
  const totalProjects = ps.length
  const completed = ps.filter(p => {
    const st = (p['Project Status'] || '').toLowerCase()
    return st.includes('completed') || st.includes('complete') || st.includes('done') || st.includes('closed')
  }).length
  const collectionRate = totalProjects > 0 ? Math.round((completed / totalProjects) * 1000) / 10 : 0
  const cancelled = ps.filter(p => {
    const st = (p['Project Status'] || '').toLowerCase()
    return st.includes('cancelled') || st.includes('canceled')
  }).length
  const badDebtRate = totalProjects > 0 ? Math.round((cancelled / totalProjects) * 1000) / 10 : 0

  // Average project duration for completed ones
  const durations: number[] = []
  ps.forEach(p => {
    const start = parseDate(p['Project Start'])
    const end = parseDate(p['Project End'] || p['Completion Date'])
    if (start && end && end > start) {
      durations.push(Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
    }
  })
  const avgDays = durations.length > 0 ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) : 0

  return [
    { label: 'Total Outstanding', value: fmt(totalOutstanding), icon: 'i-lucide-banknote', change: `${totalCount} projects` },
    { label: 'Avg. Project Duration', value: `${avgDays} days`, icon: 'i-lucide-clock', change: '' },
    { label: 'Collection Rate', value: `${collectionRate}%`, icon: 'i-lucide-check-circle', change: `${completed} of ${totalProjects}` },
    { label: 'Cancellation Rate', value: `${badDebtRate}%`, icon: 'i-lucide-alert-triangle', change: `${cancelled} cancelled` },
    { label: 'Active Projects', value: String(totalCount), icon: 'i-lucide-calendar', change: 'In pipeline' },
  ]
})

// ─── Financial Ratios ───────────────────────────────
const ratios = computed(() => {
  const thisPs = projectsForYear(currentYear)
  const totalRevenue = thisPs.reduce((s, p) => s + parsePrice(p['Project Price']), 0)
  const totalCost = thisPs.reduce((s, p) => s + parsePrice(p['Contract Price']), 0)
  const totalNet = thisPs.reduce((s, p) => s + parsePrice(p['Project Net Amount']), 0)

  const grossMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue * 100).toFixed(1) : '0.0'
  const netMargin = totalRevenue > 0 ? (totalNet / totalRevenue * 100).toFixed(1) : '0.0'
  const costRatio = totalRevenue > 0 ? (totalCost / totalRevenue).toFixed(2) : '0.00'
  const revenuePerProject = thisPs.length > 0 ? fmt(Math.round(totalRevenue / thisPs.length)) : '$0'
  const netPerProject = thisPs.length > 0 ? fmt(Math.round(totalNet / thisPs.length)) : '$0'

  // Pipeline coverage
  const pipeline = allProjects.value.filter(p => {
    const st = (p['Project Status'] || '').toLowerCase()
    return !(st.includes('completed') || st.includes('complete') || st.includes('done') || st.includes('closed') || st.includes('cancelled') || st.includes('canceled'))
  }).reduce((s, p) => s + parsePrice(p['Project Price']), 0)
  const coverage = totalRevenue > 0 ? (pipeline / totalRevenue).toFixed(2) : '0.00'

  const completed = thisPs.filter(p => {
    const st = (p['Project Status'] || '').toLowerCase()
    return st.includes('completed') || st.includes('complete') || st.includes('done') || st.includes('closed')
  }).length
  const completionRate = thisPs.length > 0 ? ((completed / thisPs.length) * 100).toFixed(1) : '0.0'

  return [
    { category: 'Profitability', items: [
      { name: 'Gross Profit Margin', value: `${grossMargin}%`, benchmark: '65.0%', status: Number(grossMargin) >= 65 ? 'above' : 'below' },
      { name: 'Net Profit Margin', value: `${netMargin}%`, benchmark: '12.5%', status: Number(netMargin) >= 12.5 ? 'above' : 'below' },
      { name: 'Revenue per Project', value: revenuePerProject, benchmark: '$50K', status: 'above' },
      { name: 'Net per Project', value: netPerProject, benchmark: '$10K', status: 'above' },
    ] },
    { category: 'Efficiency', items: [
      { name: 'Cost-to-Revenue Ratio', value: `${costRatio}x`, benchmark: '0.65x', status: Number(costRatio) <= 0.65 ? 'above' : 'below' },
      { name: 'Completion Rate', value: `${completionRate}%`, benchmark: '80.0%', status: Number(completionRate) >= 80 ? 'above' : 'below' },
      { name: 'Pipeline Coverage', value: `${coverage}x`, benchmark: '1.00x', status: Number(coverage) >= 1.0 ? 'above' : 'below' },
      { name: 'Total Projects (YTD)', value: String(thisPs.length), benchmark: '—', status: 'at' },
    ] },
    { category: 'Revenue Metrics', items: [
      { name: 'Total Revenue (YTD)', value: fmt(totalRevenue), benchmark: '—', status: 'above' },
      { name: 'Total Costs (YTD)', value: fmt(totalCost), benchmark: '—', status: 'at' },
      { name: 'Net Income (YTD)', value: fmt(totalNet), benchmark: '—', status: totalNet > 0 ? 'above' : 'below' },
      { name: 'Pipeline Value', value: fmt(pipeline), benchmark: '—', status: 'above' },
    ] },
  ]
})

// ── Helpers ────────────────────────────────────────
function fmt(n: number) {
  const abs = Math.abs(n)
  if (abs >= 1000000)
    return `${n < 0 ? '-' : ''}$${(abs / 1000000).toFixed(1)}M`
  if (abs >= 1000)
    return `${n < 0 ? '-' : ''}$${(abs / 1000).toFixed(0)}K`
  return `$${n.toLocaleString('en-US')}`
}

function fmtExact(n: number) {
  return `${n < 0 ? '-' : ''}$${Math.abs(n).toLocaleString('en-US')}`
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 overflow-auto">
  <div class="flex flex-col gap-5 p-1">
    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-3">
      <Icon name="i-lucide-loader-2" class="size-8 animate-spin text-muted-foreground" />
      <p class="text-sm text-muted-foreground">Loading financial data…</p>
    </div>

    <template v-else>
    <!-- Tab Navigation -->
    <div class="flex items-center gap-1 border rounded-lg p-1 bg-muted/30 w-fit">
      <button
        v-for="tab in [{ id: 'pnl', label: 'P&L Statement', icon: 'i-lucide-file-text' }, { id: 'cashflow', label: 'Cash Flow', icon: 'i-lucide-arrow-right-left' }, { id: 'budget', label: 'Contract vs Revenue', icon: 'i-lucide-target' }, { id: 'receivables', label: 'Receivables', icon: 'i-lucide-clock' }, { id: 'ratios', label: 'Ratios', icon: 'i-lucide-gauge' }]"
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
            <Badge
              variant="outline"
              :class="kpi.change > 0 ? 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-800' : 'text-rose-600 border-rose-200 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-800'"
              class="text-[10px] px-1.5 py-0"
            >
              {{ kpi.change > 0 ? '+' : '' }}{{ kpi.change }}%
            </Badge>
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

    <!-- P&L TAB -->
    <template v-if="activeTab === 'pnl'">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <!-- Revenue vs Expenses Chart -->
        <Card class="lg:col-span-2">
          <CardHeader class="pb-2">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-sm font-semibold">
                  Revenue, Expenses & Profit
                </CardTitle>
                <CardDescription>Monthly breakdown for FY {{ currentYear }}</CardDescription>
              </div>
              <Badge v-if="kpis[0]" variant="outline" :class="kpis[0].change >= 0 ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'">
                <component :is="kpis[0].change >= 0 ? TrendingUp : TrendingDown" class="size-3 mr-1" /> {{ kpis[0].change >= 0 ? '+' : '' }}{{ kpis[0].change }}% YoY
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <AreaChart
              :data="revenueTrend"
              index="month"
              :categories="['revenue', 'expenses', 'profit']"
              :colors="['#10b981', '#ef4444', '#3b82f6']"
              :y-formatter="(v: number | Date) => `$${(Number(v) / 1000).toFixed(0)}K`"
              class="h-[300px]"
            />
          </CardContent>
        </Card>

        <!-- Expense Breakdown -->
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-semibold">
              Operating Expense Mix
            </CardTitle>
            <CardDescription>Cost distribution by project type</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col items-center">
            <DonutChart
              :data="expenseBreakdown"
              index="name"
              category="value"
              :colors="['#ec4899', '#8b5cf6', '#f59e0b', '#64748b', '#06b6d4', '#10b981']"
              :value-formatter="(v: number) => fmt(v)"
              class="h-[180px]"
            />
            <div class="w-full mt-4 space-y-2">
              <div v-for="(e, i) in expenseBreakdown" :key="e.name" class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <div class="size-2.5 rounded-full" :style="{ background: ['#ec4899', '#8b5cf6', '#f59e0b', '#64748b', '#06b6d4', '#10b981'][i] }" />
                  <span class="text-muted-foreground">{{ e.name }}</span>
                </div>
                <span class="font-semibold tabular-nums">{{ fmt(e.value) }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- P&L Statement Table -->
      <Card>
        <CardHeader class="pb-2">
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-sm font-semibold">
                Income Statement
              </CardTitle>
              <CardDescription>Detailed P&L for FY {{ currentYear }} vs FY {{ lastYear }}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Line Item</TableHead>
                <TableHead class="text-right">
                  FY {{ currentYear }}
                </TableHead>
                <TableHead class="text-right">
                  FY {{ lastYear }}
                </TableHead>
                <TableHead class="text-right">
                  Variance
                </TableHead>
                <TableHead class="text-right">
                  % Change
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-for="section in pnlData" :key="section.category">
                <TableRow class="bg-muted/30">
                  <TableCell :colspan="5" class="font-bold text-sm py-2">
                    {{ section.category }}
                  </TableCell>
                </TableRow>
                <TableRow v-for="item in section.items" :key="item.name">
                  <TableCell class="pl-8 text-sm">
                    {{ item.name }}
                  </TableCell>
                  <TableCell class="text-right tabular-nums text-sm" :class="item.current < 0 ? 'text-rose-600 dark:text-rose-400' : ''">
                    {{ fmtExact(item.current) }}
                  </TableCell>
                  <TableCell class="text-right tabular-nums text-sm text-muted-foreground" :class="item.previous < 0 ? 'text-rose-500/60' : ''">
                    {{ fmtExact(item.previous) }}
                  </TableCell>
                  <TableCell class="text-right tabular-nums text-sm" :class="(item.current - item.previous) > 0 ? item.current > 0 ? 'text-emerald-600' : 'text-rose-600' : item.current > 0 ? 'text-rose-600' : 'text-emerald-600'">
                    {{ fmtExact(item.current - item.previous) }}
                  </TableCell>
                  <TableCell class="text-right tabular-nums text-sm">
                    <Badge
                      v-if="item.previous !== 0"
                      variant="outline"
                      :class="
                        (() => {
                          const pctChange = ((item.current - item.previous) / Math.abs(item.previous)) * 100
                          const isGood = item.current > 0 ? pctChange > 0 : pctChange < 0
                          return isGood ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'
                        })()
                      "
                      class="text-[10px]"
                    >
                      {{ ((item.current - item.previous) / Math.abs(item.previous) * 100).toFixed(1) }}%
                    </Badge>
                    <span v-else class="text-muted-foreground text-[10px]">—</span>
                  </TableCell>
                </TableRow>
              </template>
              <!-- Totals -->
              <TableRow class="border-t-2 font-bold">
                <TableCell class="text-sm font-bold">
                  Net Income
                </TableCell>
                <TableCell class="text-right tabular-nums text-sm font-bold" :class="pnlNetIncome.current >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                  {{ fmtExact(pnlNetIncome.current) }}
                </TableCell>
                <TableCell class="text-right tabular-nums text-muted-foreground text-sm font-bold">
                  {{ fmtExact(pnlNetIncome.previous) }}
                </TableCell>
                <TableCell class="text-right tabular-nums text-sm font-bold" :class="(pnlNetIncome.current - pnlNetIncome.previous) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                  {{ fmtExact(pnlNetIncome.current - pnlNetIncome.previous) }}
                </TableCell>
                <TableCell class="text-right">
                  <Badge v-if="pnlNetIncome.previous !== 0" variant="outline" :class="((pnlNetIncome.current - pnlNetIncome.previous) / Math.abs(pnlNetIncome.previous)) >= 0 ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'" class="text-[10px]">
                    {{ (((pnlNetIncome.current - pnlNetIncome.previous) / Math.abs(pnlNetIncome.previous)) * 100).toFixed(1) }}%
                  </Badge>
                  <span v-else class="text-muted-foreground text-[10px]">—</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </template>

    <!-- CASH FLOW TAB -->
    <template v-if="activeTab === 'cashflow'">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card class="lg:col-span-2">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-semibold">
              Cash Flow Components
            </CardTitle>
            <CardDescription>Operating, investing, and financing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              :data="cashFlowData"
              index="month"
              :categories="['operating', 'investing', 'financing']"
              :colors="['#10b981', '#8b5cf6', '#f59e0b']"
              type="grouped"
              :rounded-corners="4"
              :y-formatter="(v: number | Date) => `$${(Number(v) / 1000).toFixed(0)}K`"
              class="h-[300px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-semibold">
              Cash Flow Summary
            </CardTitle>
            <CardDescription>Annual cash flow breakdown</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="item in [
                { label: 'Operating Activities', value: cashFlowSummary.operating, icon: 'i-lucide-building-2', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { label: 'Investing Activities', value: cashFlowSummary.investing, icon: 'i-lucide-trending-up', color: 'text-violet-500', bg: 'bg-violet-500/10' },
                { label: 'Financing Activities', value: cashFlowSummary.financing, icon: 'i-lucide-banknote', color: 'text-amber-500', bg: 'bg-amber-500/10' },
              ]" :key="item.label" class="flex items-center gap-3 p-3 rounded-lg border"
            >
              <div class="flex items-center justify-center rounded-lg p-2" :class="item.bg">
                <Icon :name="item.icon" class="size-4" :class="item.color" />
              </div>
              <div class="flex-1">
                <p class="text-xs text-muted-foreground">
                  {{ item.label }}
                </p>
                <p class="text-sm font-bold tabular-nums" :class="item.value > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                  {{ fmt(item.value) }}
                </p>
              </div>
            </div>
            <Separator />
            <div class="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
              <span class="text-sm font-semibold">Net Cash Flow</span>
              <span class="text-sm font-bold tabular-nums" :class="cashFlowSummary.net >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">{{ fmt(cashFlowSummary.net) }}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- BUDGET vs ACTUAL TAB -->
    <template v-if="activeTab === 'budget'">
      <Card>
        <CardHeader class="pb-2">
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-sm font-semibold">
                Contract vs Revenue by Branch
              </CardTitle>
              <CardDescription>FY {{ currentYear }} variance analysis</CardDescription>
            </div>
            <Badge variant="outline" :class="budgetNetVariance >= 0 ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'">
              Net {{ fmt(Math.abs(budgetNetVariance)) }} {{ budgetNetVariance >= 0 ? 'Under' : 'Over' }} Contract
            </Badge>
          </div>
        </CardHeader>
        <CardContent class="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead class="text-right">
                  Contract Price
                </TableHead>
                <TableHead class="text-right">
                  Project Price
                </TableHead>
                <TableHead class="text-right">
                  Variance
                </TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="dept in budgetData" :key="dept.department">
                <TableCell class="font-medium text-sm">
                  {{ dept.department }}
                </TableCell>
                <TableCell class="text-right tabular-nums text-sm text-muted-foreground">
                  {{ fmtExact(dept.budget) }}
                </TableCell>
                <TableCell class="text-right tabular-nums text-sm font-medium">
                  {{ fmtExact(dept.actual) }}
                </TableCell>
                <TableCell class="text-right tabular-nums text-sm" :class="dept.variance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                  {{ dept.variance >= 0 ? '+' : '' }}{{ fmtExact(dept.variance) }}
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all"
                        :class="(dept.actual / dept.budget * 100) > 100 ? 'bg-rose-500' : (dept.actual / dept.budget * 100) > 95 ? 'bg-amber-500' : 'bg-emerald-500'"
                        :style="{ width: `${Math.min(dept.actual / dept.budget * 100, 100)}%` }"
                      />
                    </div>
                    <span class="text-xs tabular-nums w-10 text-right">{{ (dept.actual / dept.budget * 100).toFixed(0) }}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    :class="dept.variance >= 0 ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-500/10'"
                  >
                    {{ dept.variance >= 0 ? 'Under' : 'Over' }}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </template>

    <!-- RECEIVABLES TAB -->
    <template v-if="activeTab === 'receivables'">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card class="lg:col-span-2">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-semibold">
              Accounts Receivable Aging
            </CardTitle>
            <CardDescription>Outstanding receivables by aging bucket</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div v-for="bucket in receivablesData" :key="bucket.bucket" class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-2">
                    <div class="size-3 rounded" :style="{ background: bucket.color }" />
                    <span class="font-medium">{{ bucket.bucket }}</span>
                    <Badge variant="secondary" class="text-[10px]">
                      {{ bucket.count }} projects
                    </Badge>
                  </div>
                  <span class="font-semibold tabular-nums">{{ fmtExact(bucket.amount) }}</span>
                </div>
                <div class="h-6 rounded-lg overflow-hidden bg-muted/50 relative">
                  <div
                    class="h-full rounded-lg transition-all duration-1000 flex items-center px-3"
                    :style="{ width: `${bucket.pct}%`, background: bucket.color }"
                  >
                    <span class="text-white text-[10px] font-semibold">{{ bucket.pct }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-semibold">
              AR Metrics
            </CardTitle>
            <CardDescription>Receivables health indicators</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div
              v-for="metric in arMetrics" :key="metric.label" class="flex items-center gap-3"
            >
              <div class="flex items-center justify-center rounded-lg p-2 bg-muted/50">
                <Icon :name="metric.icon" class="size-4 text-muted-foreground" />
              </div>
              <div class="flex-1">
                <p class="text-xs text-muted-foreground">
                  {{ metric.label }}
                </p>
                <p class="text-sm font-bold tabular-nums">
                  {{ metric.value }}
                </p>
              </div>
              <span v-if="metric.change" class="text-[10px] text-emerald-600 dark:text-emerald-400">{{ metric.change }}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

    <!-- RATIOS TAB -->
    <template v-if="activeTab === 'ratios'">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card v-for="section in ratios" :key="section.category">
          <CardHeader class="pb-2">
            <CardTitle class="text-sm font-semibold">
              {{ section.category }}
            </CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ratio</TableHead>
                  <TableHead class="text-right">
                    Value
                  </TableHead>
                  <TableHead class="text-right">
                    Benchmark
                  </TableHead>
                  <TableHead class="text-center">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="r in section.items" :key="r.name">
                  <TableCell class="text-sm font-medium">
                    {{ r.name }}
                  </TableCell>
                  <TableCell class="text-right tabular-nums text-sm font-semibold">
                    {{ r.value }}
                  </TableCell>
                  <TableCell class="text-right tabular-nums text-sm text-muted-foreground">
                    {{ r.benchmark }}
                  </TableCell>
                  <TableCell class="text-center">
                    <component :is="r.status === 'above' ? TrendingUp : TrendingDown" class="size-4 mx-auto" :class="r.status === 'above' ? 'text-emerald-500' : r.status === 'below' ? 'text-rose-500' : 'text-amber-500'" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </template>
    </template>
  </div>
  </div>
</template>
