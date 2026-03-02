<script setup lang="ts">
import NumberFlow from '@number-flow/vue'

const { setHeader } = usePageHeader()
setHeader({ title: 'Ready to Fund Report', description: 'Finance analytics with advanced filtering', icon: 'i-lucide-badge-dollar-sign' })

// ─── Dashboard Store ────────────────────────────────
const {
  finance: financeRecords,
  userNameMap,
  projectMap,
  init,
} = useDashboardStore()
init()

// ─── Filter State ───────────────────────────────────
const reportType = ref('Fund Date')
const reportTypes = ['Fund Date', 'Loan Approved', 'Loan Signed']
const selectedCompany = ref('')
const dateFrom = ref('')
const dateTo = ref('')
const searchQuery = ref('')
const activeTab = ref('overview')
const sidebarCollapsed = ref(false)

// ─── Unique companies ──────────────────────────────
const companies = computed(() => {
  const set = new Set<string>()
  for (const r of financeRecords.value) {
    const c = r['Finance Company']
    if (c) set.add(c)
  }
  return Array.from(set).sort()
})

// ─── Parse helpers ──────────────────────────────────
function parseDate(val: any): Date | null {
  if (!val) return null
  try {
    const d = new Date(val?.value || val)
    return isNaN(d.getTime()) ? null : d
  }
  catch { return null }
}

function parseCurrency(val: any): number {
  if (!val && val !== 0) return 0
  const n = Number.parseFloat(String(val).replace(/[^0-9.-]/g, ''))
  return Number.isNaN(n) ? 0 : n
}

function formatCurrency(value: any): string {
  if (!value && value !== 0) return '—'
  const n = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ''))
  if (Number.isNaN(n)) return String(value)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function formatDate(value: any): string {
  if (!value) return '—'
  try {
    const d = new Date(value?.value || value)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  catch { return String(value) }
}

function fmt(n: number): string {
  const abs = Math.abs(n)
  if (abs >= 1_000_000) return `${n < 0 ? '-' : ''}$${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${n < 0 ? '-' : ''}$${(abs / 1_000).toFixed(0)}K`
  return `$${n.toLocaleString('en-US')}`
}

function fmtFull(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

function resolveName(email: string): string {
  if (!email) return '—'
  return userNameMap.value[email.toLowerCase()] || email
}

function getCustomerName(projectId: string): string {
  const p = projectMap.value[projectId]
  return p?.['Customer name'] || ''
}

function statusColor(status: string): string {
  const s = (status || '').toLowerCase()
  if (['completed', 'complete', 'done', 'approved', 'funded', 'rcvd', 'yes'].some(k => s.includes(k)))
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
  if (['in progress', 'active', 'ongoing', 'open'].some(k => s.includes(k)))
    return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'
  if (['pending', 'waiting', 'hold', 'new', 'submitted'].some(k => s.includes(k)))
    return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (['cancelled', 'canceled', 'rejected', 'failed', 'expired'].some(k => s.includes(k)))
    return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

// ─── Date field for report type ─────────────────────
function getDateField(type: string): string {
  switch (type) {
    case 'Fund Date': return 'Fund Date'
    case 'Loan Approved': return 'Loan Approved'
    case 'Loan Signed': return 'Loan Signed'
    default: return 'Fund Date'
  }
}

// ─── Filtered records ───────────────────────────────
const filteredRecords = computed(() => {
  let records = [...financeRecords.value]

  // Filter by finance company
  if (selectedCompany.value) {
    records = records.filter(r => r['Finance Company'] === selectedCompany.value)
  }

  // Filter by date range using selected report type
  const dateField = getDateField(reportType.value)
  if (dateFrom.value) {
    const from = new Date(dateFrom.value)
    from.setHours(0, 0, 0, 0)
    records = records.filter(r => {
      const d = parseDate(r[dateField])
      return d && d >= from
    })
  }
  if (dateTo.value) {
    const to = new Date(dateTo.value)
    to.setHours(23, 59, 59, 999)
    records = records.filter(r => {
      const d = parseDate(r[dateField])
      return d && d <= to
    })
  }

  // Search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    records = records.filter(r =>
      (r['Project ID'] || '').toLowerCase().includes(q)
      || (r['Finance Company'] || '').toLowerCase().includes(q)
      || (r['Finance Type'] || '').toLowerCase().includes(q)
      || (r['Finance Status'] || '').toLowerCase().includes(q)
      || (r['Finance Terms'] || '').toLowerCase().includes(q)
      || (getCustomerName(r['Project ID']) || '').toLowerCase().includes(q),
    )
  }

  return records
})

// ─── KPI Computations ───────────────────────────────
const kpis = computed(() => {
  const recs = filteredRecords.value
  const totalRecords = recs.length
  const totalLoanAmount = recs.reduce((s, r) => s + parseCurrency(r['Loan Amount']), 0)
  const totalNetAmount = recs.reduce((s, r) => s + parseCurrency(r['Net Loan Amount']), 0)
  const avgLoanAmount = totalRecords > 0 ? Math.round(totalLoanAmount / totalRecords) : 0
  const avgDF = totalRecords > 0
    ? Math.round(recs.reduce((s, r) => s + (parseFloat(r['DF']) || 0), 0) / totalRecords * 10) / 10
    : 0

  // Funded count
  const fundedCount = recs.filter(r => {
    const s = (r['Finance Status'] || '').toLowerCase()
    return s.includes('funded') || s.includes('completed') || s.includes('approved') || s.includes('rcvd')
  }).length
  const fundedRate = totalRecords > 0 ? Math.round((fundedCount / totalRecords) * 1000) / 10 : 0

  // RTF count
  const rtfCount = recs.filter(r => r['RTF'] && r['RTF'] !== '—' && r['RTF'] !== '').length

  // Total dealer fee amount (totalLoan - totalNet)
  const totalDealerFee = totalLoanAmount - totalNetAmount

  return [
    { label: 'Total Loan Amount', value: totalLoanAmount, prefix: '$', suffix: '', icon: 'i-lucide-banknote', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Net Loan Amount', value: totalNetAmount, prefix: '$', suffix: '', icon: 'i-lucide-wallet', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Records', value: totalRecords, prefix: '', suffix: '', icon: 'i-lucide-file-text', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Avg Loan Value', value: avgLoanAmount, prefix: '$', suffix: '', icon: 'i-lucide-bar-chart-3', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Funded Rate', value: fundedRate, prefix: '', suffix: '%', icon: 'i-lucide-check-circle', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { label: 'Avg. DF', value: avgDF, prefix: '', suffix: '%', icon: 'i-lucide-percent', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  ]
})

// ─── Loan Amount by Finance Company (bar chart) ─────
const loanByCompanyData = computed(() => {
  const groups: Record<string, number> = {}
  filteredRecords.value.forEach(r => {
    const company = r['Finance Company'] || 'Unknown'
    groups[company] = (groups[company] || 0) + parseCurrency(r['Loan Amount'])
  })
  return Object.entries(groups)
    .map(([name, value]) => ({ name, amount: Math.round(value) }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10)
})

// ─── Monthly Funding Trend ──────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const monthlyTrendData = computed(() => {
  const dateField = getDateField(reportType.value)
  const now = new Date()
  const thisYear = now.getFullYear()

  const monthlyLoan: Record<number, number> = {}
  const monthlyNet: Record<number, number> = {}
  const monthlyCount: Record<number, number> = {}

  filteredRecords.value.forEach(r => {
    const d = parseDate(r[dateField] || r['Fund Date'] || r['TimeStamp'])
    if (!d || d.getFullYear() !== thisYear) return
    const m = d.getMonth()
    monthlyLoan[m] = (monthlyLoan[m] || 0) + parseCurrency(r['Loan Amount'])
    monthlyNet[m] = (monthlyNet[m] || 0) + parseCurrency(r['Net Loan Amount'])
    monthlyCount[m] = (monthlyCount[m] || 0) + 1
  })

  return MONTHS.map((month, i) => ({
    month,
    loanAmount: Math.round(monthlyLoan[i] || 0),
    netAmount: Math.round(monthlyNet[i] || 0),
    count: monthlyCount[i] || 0,
  }))
})

// ─── Finance Type Distribution ──────────────────────
const financeTypeData = computed(() => {
  const groups: Record<string, number> = {}
  filteredRecords.value.forEach(r => {
    const type = r['Finance Type'] || 'Other'
    groups[type] = (groups[type] || 0) + parseCurrency(r['Loan Amount'])
  })
  return Object.entries(groups)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)
})

// ─── Finance Status Distribution ────────────────────
const statusDistribution = computed(() => {
  const groups: Record<string, { count: number, amount: number }> = {}
  filteredRecords.value.forEach(r => {
    const status = r['Finance Status'] || 'Unknown'
    if (!groups[status]) groups[status] = { count: 0, amount: 0 }
    groups[status].count++
    groups[status].amount += parseCurrency(r['Loan Amount'])
  })
  return Object.entries(groups)
    .map(([name, data]) => ({ name, count: data.count, amount: Math.round(data.amount) }))
    .sort((a, b) => b.amount - a.amount)
})

const statusMax = computed(() => statusDistribution.value[0]?.amount ?? 1)

// ─── Finance Terms Breakdown ────────────────────────
const termsBreakdown = computed(() => {
  const groups: Record<string, { count: number, amount: number }> = {}
  filteredRecords.value.forEach(r => {
    const terms = r['Finance Terms'] || 'Unknown'
    if (!groups[terms]) groups[terms] = { count: 0, amount: 0 }
    groups[terms].count++
    groups[terms].amount += parseCurrency(r['Loan Amount'])
  })
  return Object.entries(groups)
    .map(([name, data]) => ({ name, count: data.count, amount: Math.round(data.amount) }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8)
})

// ─── Top Projects by Loan Amount ────────────────────
const topProjects = computed(() => {
  return [...filteredRecords.value]
    .sort((a, b) => parseCurrency(b['Loan Amount']) - parseCurrency(a['Loan Amount']))
    .slice(0, 10)
    .map(r => ({
      projectId: r['Project ID'],
      customer: getCustomerName(r['Project ID']) || '—',
      company: r['Finance Company'] || '—',
      loanAmount: parseCurrency(r['Loan Amount']),
      netAmount: parseCurrency(r['Net Loan Amount']),
      df: r['DF'] || '—',
      status: r['Finance Status'] || '—',
      fundDate: r['Fund Date'] ? formatDate(r['Fund Date']) : '—',
      type: r['Finance Type'] || '—',
      terms: r['Finance Terms'] || '—',
    }))
})

// ─── DF Distribution ────────────────────────────────
const dfDistribution = computed(() => {
  const buckets = [
    { range: '0–5%', min: 0, max: 5, count: 0, amount: 0 },
    { range: '5–10%', min: 5.01, max: 10, count: 0, amount: 0 },
    { range: '10–15%', min: 10.01, max: 15, count: 0, amount: 0 },
    { range: '15–20%', min: 15.01, max: 20, count: 0, amount: 0 },
    { range: '20%+', min: 20.01, max: 999, count: 0, amount: 0 },
  ]

  filteredRecords.value.forEach(r => {
    const df = parseFloat(r['DF']) || 0
    const amount = parseCurrency(r['Loan Amount'])
    for (const b of buckets) {
      if (df >= b.min && df <= b.max) {
        b.count++
        b.amount += amount
        break
      }
    }
  })

  return buckets.map(b => ({ range: b.range, count: b.count, amount: Math.round(b.amount) }))
})

// ─── Company performance metrics ────────────────────
const companyMetrics = computed(() => {
  const groups: Record<string, { count: number, loanTotal: number, netTotal: number, dfSum: number, funded: number }> = {}
  filteredRecords.value.forEach(r => {
    const company = r['Finance Company'] || 'Unknown'
    if (!groups[company]) groups[company] = { count: 0, loanTotal: 0, netTotal: 0, dfSum: 0, funded: 0 }
    groups[company].count++
    groups[company].loanTotal += parseCurrency(r['Loan Amount'])
    groups[company].netTotal += parseCurrency(r['Net Loan Amount'])
    groups[company].dfSum += parseFloat(r['DF']) || 0
    const st = (r['Finance Status'] || '').toLowerCase()
    if (st.includes('funded') || st.includes('completed') || st.includes('approved') || st.includes('rcvd')) {
      groups[company].funded++
    }
  })
  return Object.entries(groups)
    .map(([name, d]) => ({
      name,
      count: d.count,
      loanTotal: Math.round(d.loanTotal),
      netTotal: Math.round(d.netTotal),
      avgDF: d.count > 0 ? Math.round(d.dfSum / d.count * 10) / 10 : 0,
      fundedRate: d.count > 0 ? Math.round((d.funded / d.count) * 100) : 0,
    }))
    .sort((a, b) => b.loanTotal - a.loanTotal)
})

// ─── Table columns ──────────────────────────────────
const sortKey = ref('TimeStamp')
const sortDir = ref<'asc' | 'desc'>('desc')

function toggleSort(key: string) {
  if (sortKey.value === key) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortKey.value = key; sortDir.value = 'desc' }
}

const tableColumns = [
  { key: 'Project ID', label: 'Project ID', sortable: true },
  { key: '_customer', label: 'Customer', sortable: false },
  { key: 'Finance Company', label: 'Finance Co.', sortable: true },
  { key: 'Finance Type', label: 'Type', sortable: true },
  { key: 'Finance Terms', label: 'Terms', sortable: true },
  { key: 'Loan Amount', label: 'Loan Amt', sortable: true },
  { key: 'DF', label: 'DF', sortable: true },
  { key: 'Net Loan Amount', label: 'Net Amount', sortable: true },
  { key: 'Finance Status', label: 'Status', sortable: true },
  { key: 'Fund Date', label: 'Fund Date', sortable: true },
  { key: 'RTF', label: 'RTF', sortable: true },
  { key: 'Create By', label: 'Created By', sortable: true },
]

const sortedRecords = computed(() => {
  const arr = [...filteredRecords.value]
  const key = sortKey.value
  const dir = sortDir.value === 'asc' ? 1 : -1
  return arr.sort((a, b) => {
    let av = key === '_customer' ? getCustomerName(a['Project ID']) : (a[key] ?? '')
    let bv = key === '_customer' ? getCustomerName(b['Project ID']) : (b[key] ?? '')
    if (av?.value) av = av.value
    if (bv?.value) bv = bv.value
    if (typeof av === 'string') av = av.toLowerCase()
    if (typeof bv === 'string') bv = bv.toLowerCase()
    if (av < bv) return -1 * dir
    if (av > bv) return 1 * dir
    return 0
  })
})

// ─── Infinite scroll ────────────────────────────────
const perPage = 50
const visibleCount = ref(perPage)
const visible = computed(() => sortedRecords.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < sortedRecords.value.length)

function loadMore() {
  if (hasMore.value) visibleCount.value += perPage
}

watch(() => filteredRecords.value, () => { visibleCount.value = perPage })

const sentinelRef = ref<HTMLElement | null>(null)
let _observer: IntersectionObserver | null = null

onMounted(() => {
  _observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && hasMore.value) loadMore()
  }, { rootMargin: '200px' })
})

onUnmounted(() => { _observer?.disconnect() })

watch(sentinelRef, (el) => {
  _observer?.disconnect()
  if (el) _observer?.observe(el)
})

function cellValue(rec: any, col: { key: string }): string {
  const k = col.key
  if (k === '_customer') return getCustomerName(rec['Project ID']) || '—'
  if (k === 'Loan Amount' || k === 'Net Loan Amount' || k === 'Dealer Amount') return rec[k] ? formatCurrency(rec[k]) : '—'
  if (k === 'DF') return rec[k] != null ? `${rec[k]}%` : '—'
  if (k === 'Fund Date') return rec[k] ? formatDate(rec[k]) : '—'
  if (k === 'Create By') return rec[k] ? resolveName(rec[k]) : '—'
  return rec[k] || '—'
}

// ─── Reset filters ──────────────────────────────────
function resetFilters() {
  reportType.value = 'Fund Date'
  selectedCompany.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  searchQuery.value = ''
}

const hasActiveFilters = computed(() => {
  return selectedCompany.value || dateFrom.value || dateTo.value || searchQuery.value
})

// ─── Chart colors ───────────────────────────────────
const barColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#a855f7']
const donutColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4']
const statusBarColors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444', '#06b6d4', '#84cc16']
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex">
    <!-- ═══════ SUB SIDEBAR ═══════ -->
    <div
      class="shrink-0 border-r bg-card/50 flex flex-col min-h-0 transition-all duration-300 overflow-hidden"
      :class="sidebarCollapsed ? 'w-[52px]' : 'w-[260px]'"
    >
      <!-- Collapse toggle -->
      <div class="flex items-center justify-between px-3 pt-3 pb-1">
        <p v-if="!sidebarCollapsed" class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          Filters
        </p>
        <button
          class="p-1 rounded-md hover:bg-muted transition-colors"
          @click="sidebarCollapsed = !sidebarCollapsed"
        >
          <Icon :name="sidebarCollapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'" class="size-3.5 text-muted-foreground" />
        </button>
      </div>

      <!-- Sidebar content (hidden when collapsed) -->
      <div v-if="!sidebarCollapsed" class="flex flex-col gap-4 p-3 overflow-y-auto flex-1">
        <!-- Report Type -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
            <Icon name="i-lucide-file-bar-chart" class="size-3" />
            Report Based On
          </label>
          <div class="space-y-0.5">
            <button
              v-for="type in reportTypes"
              :key="type"
              class="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all duration-150 w-full text-left"
              :class="reportType === type
                ? 'bg-primary/10 text-primary font-medium shadow-sm ring-1 ring-primary/20'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
              @click="reportType = type"
            >
              <div class="size-3.5 rounded-full border-2 flex items-center justify-center transition-colors"
                :class="reportType === type ? 'border-primary' : 'border-muted-foreground/30'"
              >
                <div v-if="reportType === type" class="size-1.5 rounded-full bg-primary" />
              </div>
              <span>{{ type }}</span>
            </button>
          </div>
        </div>

        <Separator />

        <!-- Finance Company -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
            <Icon name="i-lucide-building-2" class="size-3" />
            Finance Company
          </label>
          <select
            v-model="selectedCompany"
            class="w-full h-8 px-2.5 text-xs rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Companies</option>
            <option v-for="c in companies" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <Separator />

        <!-- Date From -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
            <Icon name="i-lucide-calendar" class="size-3" />
            Date From
          </label>
          <input
            v-model="dateFrom"
            type="date"
            class="w-full h-8 px-2.5 text-xs rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        <!-- Date To -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
            <Icon name="i-lucide-calendar-check" class="size-3" />
            Date To
          </label>
          <input
            v-model="dateTo"
            type="date"
            class="w-full h-8 px-2.5 text-xs rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        <Separator />

        <!-- Active Filters Summary -->
        <div v-if="hasActiveFilters" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Active Filters</span>
            <button class="text-[10px] text-primary hover:underline" @click="resetFilters">Clear All</button>
          </div>
          <div class="flex flex-wrap gap-1">
            <Badge v-if="selectedCompany" variant="secondary" class="text-[10px] gap-1">
              <Icon name="i-lucide-building-2" class="size-2.5" />
              {{ selectedCompany }}
              <button class="ml-0.5 hover:text-destructive" @click="selectedCompany = ''">×</button>
            </Badge>
            <Badge v-if="dateFrom" variant="secondary" class="text-[10px] gap-1">
              <Icon name="i-lucide-calendar" class="size-2.5" />
              From: {{ dateFrom }}
              <button class="ml-0.5 hover:text-destructive" @click="dateFrom = ''">×</button>
            </Badge>
            <Badge v-if="dateTo" variant="secondary" class="text-[10px] gap-1">
              <Icon name="i-lucide-calendar-check" class="size-2.5" />
              To: {{ dateTo }}
              <button class="ml-0.5 hover:text-destructive" @click="dateTo = ''">×</button>
            </Badge>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="mt-auto pt-3 space-y-2">
          <Separator />
          <div class="rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-3 space-y-2 border border-primary/10">
            <div class="flex items-center gap-2">
              <div class="size-7 rounded-lg bg-primary/15 flex items-center justify-center">
                <Icon name="i-lucide-activity" class="size-3.5 text-primary" />
              </div>
              <div>
                <p class="text-[10px] text-muted-foreground">Filtered Results</p>
                <p class="text-sm font-bold tabular-nums">{{ filteredRecords.length.toLocaleString() }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="size-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Icon name="i-lucide-dollar-sign" class="size-3.5 text-emerald-600" />
              </div>
              <div>
                <p class="text-[10px] text-muted-foreground">Total Value</p>
                <p class="text-sm font-bold tabular-nums">{{ fmt(filteredRecords.reduce((s, r) => s + parseCurrency(r['Loan Amount']), 0)) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Collapsed sidebar icons -->
      <div v-else class="flex flex-col items-center gap-2 py-3 flex-1">
        <div class="p-1.5 rounded-md" :class="reportType === 'Fund Date' ? 'bg-primary/10' : ''">
          <Icon name="i-lucide-file-bar-chart" class="size-3.5 text-muted-foreground" />
        </div>
        <div class="p-1.5 rounded-md" :class="selectedCompany ? 'bg-primary/10' : ''">
          <Icon name="i-lucide-building-2" class="size-3.5 text-muted-foreground" />
        </div>
        <div class="p-1.5 rounded-md" :class="dateFrom || dateTo ? 'bg-primary/10' : ''">
          <Icon name="i-lucide-calendar" class="size-3.5 text-muted-foreground" />
        </div>
      </div>
    </div>

    <!-- ═══════ MAIN CONTENT ═══════ -->
    <div class="flex-1 min-w-0 min-h-0 flex flex-col overflow-auto">
      <div class="flex flex-col gap-5 p-4">

        <!-- Search Bar & Tab Navigation -->
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-1 border rounded-lg p-1 bg-muted/30 w-fit">
            <button
              v-for="tab in [
                { id: 'overview', label: 'Overview', icon: 'i-lucide-layout-dashboard' },
                { id: 'analytics', label: 'Analytics', icon: 'i-lucide-bar-chart-3' },
                { id: 'data', label: 'Data Table', icon: 'i-lucide-table' },
              ]"
              :key="tab.id"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              :class="activeTab === tab.id ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
              @click="activeTab = tab.id"
            >
              <Icon :name="tab.icon" class="size-3.5" />
              {{ tab.label }}
            </button>
          </div>

          <div class="flex items-center gap-2">
            <div class="relative">
              <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50" />
              <Input
                v-model="searchQuery"
                placeholder="Search records…"
                class="h-8 pl-8 w-[220px] text-xs"
              />
            </div>
            <Badge variant="secondary" class="text-xs h-7 px-2.5">
              {{ filteredRecords.length.toLocaleString() }} records
            </Badge>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Card v-for="(kpi, i) in kpis" :key="i" class="group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <CardContent class="p-4 space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center justify-center rounded-lg p-1.5 transition-transform group-hover:scale-110" :class="kpi.bg">
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

        <!-- ════════ OVERVIEW TAB ════════ -->
        <template v-if="activeTab === 'overview'">
          <!-- Row 1: Funding Trend + Finance Type Donut -->
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card class="lg:col-span-2">
              <CardHeader class="pb-2">
                <div class="flex items-center justify-between">
                  <div>
                    <CardTitle class="text-sm font-semibold">
                      Monthly Funding Trend
                    </CardTitle>
                    <CardDescription>Loan vs Net amounts by month ({{ new Date().getFullYear() }})</CardDescription>
                  </div>
                  <Badge variant="secondary" class="text-xs">
                    <Icon name="i-lucide-trending-up" class="size-3 mr-1" />
                    {{ reportType }}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <AreaChart
                  :data="monthlyTrendData"
                  index="month"
                  :categories="['loanAmount', 'netAmount']"
                  :colors="['#8b5cf6', '#10b981']"
                  :y-formatter="(v: number | Date) => `$${(Number(v) / 1000).toFixed(0)}K`"
                  class="h-[280px]"
                  :show-legend="true"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader class="pb-2">
                <CardTitle class="text-sm font-semibold">
                  Finance Type Distribution
                </CardTitle>
                <CardDescription>Loan amount by finance type</CardDescription>
              </CardHeader>
              <CardContent class="flex flex-col items-center">
                <DonutChart
                  :data="financeTypeData"
                  index="name"
                  category="value"
                  :colors="donutColors"
                  :value-formatter="(v: number) => fmt(v)"
                  class="h-[180px]"
                />
                <div class="w-full mt-4 space-y-2">
                  <div v-for="(t, i) in financeTypeData" :key="t.name" class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <div class="size-2.5 rounded-full" :style="{ background: donutColors[i % donutColors.length] }" />
                      <span class="text-muted-foreground truncate">{{ t.name }}</span>
                    </div>
                    <span class="font-semibold tabular-nums">{{ fmt(t.value) }}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Row 2: Status Distribution + Company Performance -->
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <!-- Finance Status Pipeline -->
            <Card>
              <CardHeader class="pb-2">
                <CardTitle class="text-sm font-semibold">
                  Status Distribution
                </CardTitle>
                <CardDescription>Loan amounts by current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-3">
                  <div v-for="(stage, i) in statusDistribution" :key="stage.name" class="space-y-1.5">
                    <div class="flex items-center justify-between text-sm">
                      <div class="flex items-center gap-2">
                        <div class="size-3 rounded" :style="{ background: statusBarColors[i % statusBarColors.length] }" />
                        <span class="font-medium">{{ stage.name }}</span>
                        <Badge variant="secondary" class="text-[10px] px-1.5 py-0">{{ stage.count }}</Badge>
                      </div>
                      <span class="font-semibold tabular-nums">{{ fmt(stage.amount) }}</span>
                    </div>
                    <div class="h-6 rounded-lg overflow-hidden bg-muted/50 relative">
                      <div
                        class="h-full rounded-lg transition-all duration-1000 flex items-center px-3"
                        :style="{ width: `${Math.max((stage.amount / statusMax) * 100, 3)}%`, background: statusBarColors[i % statusBarColors.length] }"
                      >
                        <span v-if="(stage.amount / statusMax) * 100 > 10" class="text-white text-[10px] font-semibold">{{ Math.round((stage.amount / statusMax) * 100) }}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Loan Amount by Company -->
            <Card>
              <CardHeader class="pb-2">
                <CardTitle class="text-sm font-semibold">
                  Loan Amount by Company
                </CardTitle>
                <CardDescription>Top finance companies by total loan value</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  :data="loanByCompanyData"
                  index="name"
                  :categories="['amount']"
                  :colors="['#8b5cf6']"
                  :y-formatter="(v: number | Date) => `$${(Number(v) / 1000).toFixed(0)}K`"
                  :rounded-corners="6"
                  class="h-[280px]"
                />
              </CardContent>
            </Card>
          </div>

          <!-- Row 3: Top Funded Projects -->
          <Card>
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle class="text-sm font-semibold">
                    Top Projects by Loan Amount
                  </CardTitle>
                  <CardDescription>Highest value finance records</CardDescription>
                </div>
                <Badge variant="secondary" class="text-xs">
                  {{ topProjects.length }} projects
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Finance Co.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead class="text-right">Loan Amount</TableHead>
                    <TableHead class="text-right">Net Amount</TableHead>
                    <TableHead class="text-center">DF</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fund Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="(p, i) in topProjects" :key="p.projectId + i">
                    <TableCell>
                      <NuxtLink :to="`/projects/${p.projectId}`" class="text-primary hover:underline font-mono text-[11px]">
                        {{ p.projectId }}
                      </NuxtLink>
                    </TableCell>
                    <TableCell class="text-sm">{{ p.customer }}</TableCell>
                    <TableCell class="text-sm font-medium">{{ p.company }}</TableCell>
                    <TableCell class="text-sm">{{ p.type }}</TableCell>
                    <TableCell class="text-right font-semibold tabular-nums text-sm">{{ fmtFull(p.loanAmount) }}</TableCell>
                    <TableCell class="text-right tabular-nums text-sm">{{ fmtFull(p.netAmount) }}</TableCell>
                    <TableCell class="text-center tabular-nums text-sm">{{ p.df }}%</TableCell>
                    <TableCell>
                      <Badge variant="outline" :class="statusColor(p.status)" class="text-[10px]">
                        {{ p.status }}
                      </Badge>
                    </TableCell>
                    <TableCell class="text-sm tabular-nums">{{ p.fundDate }}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </template>

        <!-- ════════ ANALYTICS TAB ════════ -->
        <template v-if="activeTab === 'analytics'">
          <!-- Company Metrics Table -->
          <Card>
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle class="text-sm font-semibold">
                    Finance Company Performance
                  </CardTitle>
                  <CardDescription>Comprehensive company-level analytics</CardDescription>
                </div>
                <Badge variant="secondary" class="text-xs">
                  {{ companyMetrics.length }} companies
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead class="text-center">Records</TableHead>
                    <TableHead class="text-right">Total Loan</TableHead>
                    <TableHead class="text-right">Total Net</TableHead>
                    <TableHead class="text-center">Avg. DF</TableHead>
                    <TableHead>Funded Rate</TableHead>
                    <TableHead class="text-right">Avg. Loan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="m in companyMetrics" :key="m.name">
                    <TableCell class="font-medium text-sm">
                      <div class="flex items-center gap-2">
                        <div class="size-7 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                          {{ m.name.slice(0, 2).toUpperCase() }}
                        </div>
                        {{ m.name }}
                      </div>
                    </TableCell>
                    <TableCell class="text-center tabular-nums text-sm">{{ m.count }}</TableCell>
                    <TableCell class="text-right tabular-nums text-sm font-semibold">{{ fmtFull(m.loanTotal) }}</TableCell>
                    <TableCell class="text-right tabular-nums text-sm">{{ fmtFull(m.netTotal) }}</TableCell>
                    <TableCell class="text-center tabular-nums text-sm">{{ m.avgDF }}%</TableCell>
                    <TableCell>
                      <div class="flex items-center gap-2">
                        <div class="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            class="h-full rounded-full transition-all"
                            :class="m.fundedRate >= 80 ? 'bg-emerald-500' : m.fundedRate >= 50 ? 'bg-amber-500' : 'bg-rose-500'"
                            :style="{ width: `${m.fundedRate}%` }"
                          />
                        </div>
                        <span class="text-xs font-medium tabular-nums w-8 text-right">{{ m.fundedRate }}%</span>
                      </div>
                    </TableCell>
                    <TableCell class="text-right tabular-nums text-sm text-muted-foreground">
                      {{ m.count > 0 ? fmtFull(Math.round(m.loanTotal / m.count)) : '—' }}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <!-- Row: DF Distribution + Terms Breakdown -->
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <!-- DF Distribution -->
            <Card>
              <CardHeader class="pb-2">
                <CardTitle class="text-sm font-semibold">
                  Dealer Fee Distribution
                </CardTitle>
                <CardDescription>Loan volume by DF percentage range</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  :data="dfDistribution"
                  index="range"
                  :categories="['amount']"
                  :colors="['#10b981']"
                  :y-formatter="(v: number | Date) => `$${(Number(v) / 1000).toFixed(0)}K`"
                  :rounded-corners="6"
                  class="h-[260px]"
                />
                <div class="mt-4 space-y-1.5">
                  <div v-for="b in dfDistribution" :key="b.range" class="flex items-center justify-between text-xs">
                    <span class="text-muted-foreground">{{ b.range }}</span>
                    <div class="flex items-center gap-3">
                      <Badge variant="secondary" class="text-[10px]">{{ b.count }} records</Badge>
                      <span class="font-semibold tabular-nums">{{ fmt(b.amount) }}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Terms Breakdown -->
            <Card>
              <CardHeader class="pb-2">
                <CardTitle class="text-sm font-semibold">
                  Finance Terms Breakdown
                </CardTitle>
                <CardDescription>Loan distribution by finance terms</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-3">
                  <div v-for="(t, i) in termsBreakdown" :key="t.name" class="space-y-1.5">
                    <div class="flex items-center justify-between text-sm">
                      <div class="flex items-center gap-2">
                        <div class="size-2.5 rounded-full" :style="{ background: barColors[i % barColors.length] }" />
                        <span class="font-medium">{{ t.name }}</span>
                        <Badge variant="secondary" class="text-[10px] px-1.5 py-0">{{ t.count }}</Badge>
                      </div>
                      <span class="font-semibold tabular-nums">{{ fmt(t.amount) }}</span>
                    </div>
                    <div class="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        class="h-full rounded-full transition-all duration-700"
                        :style="{ width: `${Math.max((t.amount / (termsBreakdown[0]?.amount || 1)) * 100, 3)}%`, background: barColors[i % barColors.length] }"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Monthly Count Trend -->
          <Card>
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <div>
                  <CardTitle class="text-sm font-semibold">
                    Monthly Deal Count
                  </CardTitle>
                  <CardDescription>Number of finance records created per month</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <BarChart
                :data="monthlyTrendData"
                index="month"
                :categories="['count']"
                :colors="['#3b82f6']"
                :rounded-corners="6"
                class="h-[220px]"
              />
            </CardContent>
          </Card>
        </template>

        <!-- ════════ DATA TABLE TAB ════════ -->
        <template v-if="activeTab === 'data'">
          <Card class="flex-1">
            <CardContent class="p-0">
              <div class="flex-1 overflow-auto">
                <table class="w-full">
                  <thead class="sticky top-0 z-10">
                    <tr class="bg-muted/60 backdrop-blur-sm">
                      <th
                        v-for="col in tableColumns"
                        :key="col.key"
                        class="text-left font-semibold text-muted-foreground select-none transition-colors border-b whitespace-nowrap px-3 py-2.5 text-xs"
                        :class="col.sortable ? 'cursor-pointer hover:text-foreground' : ''"
                        @click="col.sortable && toggleSort(col.key)"
                      >
                        <div class="flex items-center gap-1">
                          <span>{{ col.label }}</span>
                          <Icon
                            v-if="sortKey === col.key"
                            :name="sortDir === 'asc' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
                            class="size-3 text-primary shrink-0"
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(rec, idx) in visible"
                      :key="rec['Record ID'] || idx"
                      class="border-b border-border/20 hover:bg-muted/15 transition-colors"
                    >
                      <td
                        v-for="col in tableColumns"
                        :key="col.key"
                        class="whitespace-nowrap px-3 py-2 text-xs"
                      >
                        <!-- Project ID as link -->
                        <NuxtLink
                          v-if="col.key === 'Project ID'"
                          :to="`/projects/${rec['Project ID']}`"
                          class="text-primary hover:underline font-mono text-[11px]"
                        >
                          {{ rec['Project ID'] }}
                        </NuxtLink>

                        <!-- Status badge -->
                        <template v-else-if="col.key === 'Finance Status'">
                          <Badge v-if="rec['Finance Status']" variant="outline" :class="statusColor(rec['Finance Status'])" class="text-[10px]">
                            {{ rec['Finance Status'] }}
                          </Badge>
                          <span v-else class="text-muted-foreground/40">—</span>
                        </template>

                        <!-- Currency columns -->
                        <span
                          v-else-if="['Loan Amount', 'Net Loan Amount'].includes(col.key)"
                          class="font-medium tabular-nums"
                        >
                          {{ cellValue(rec, col) }}
                        </span>

                        <!-- DF -->
                        <span v-else-if="col.key === 'DF'" class="tabular-nums">{{ cellValue(rec, col) }}</span>

                        <!-- Fund Date -->
                        <span v-else-if="col.key === 'Fund Date'" class="tabular-nums">{{ cellValue(rec, col) }}</span>

                        <!-- Finance Company bold -->
                        <span v-else-if="col.key === 'Finance Company'" class="font-medium">{{ cellValue(rec, col) }}</span>

                        <!-- Default -->
                        <span v-else class="truncate max-w-[150px] block">{{ cellValue(rec, col) }}</span>
                      </td>
                    </tr>

                    <!-- No results -->
                    <tr v-if="visible.length === 0">
                      <td :colspan="tableColumns.length" class="text-center py-12 text-muted-foreground">
                        <div class="flex flex-col items-center gap-2">
                          <div class="size-12 rounded-xl bg-muted/30 flex items-center justify-center">
                            <Icon name="i-lucide-search-x" class="size-6 text-muted-foreground/20" />
                          </div>
                          <p class="text-xs">No matching records found</p>
                          <Button v-if="hasActiveFilters" variant="outline" size="sm" class="text-xs mt-1" @click="resetFilters">
                            <Icon name="i-lucide-x" class="size-3 mr-1" />
                            Clear Filters
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Infinite scroll sentinel -->
                <div v-if="hasMore" ref="sentinelRef" class="flex items-center justify-center py-3 shrink-0">
                  <Icon name="i-lucide-loader-2" class="size-4 animate-spin text-muted-foreground/40" />
                  <span class="text-[10px] text-muted-foreground/40 ml-2">Loading more…</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </template>

      </div>
    </div>
  </div>
</template>
