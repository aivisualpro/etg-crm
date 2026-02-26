<script setup lang="ts">
/**
 * Reusable Payments Table component — displays BigQuery ProjectPayments data.
 *
 * BigQuery schema:
 *   Record ID, Project ID, Payment Date, Payment RCVD, Finance Company,
 *   Amount, Check #, Dealer Fee, Transfer Fee %, Transfer Fee,
 *   CC Type, CC Fee %, CC Fee, Fees on Customer, Payment Description,
 *   Create By, TimeStamp, Finance Custom Fees
 */
const props = withDefaults(defineProps<{
  records: readonly any[]
  loading?: boolean
  userNameMap?: Record<string, string>
  projectMap?: Record<string, any>
  showProject?: boolean
  compact?: boolean
  perPage?: number
  hideSearch?: boolean
  searchQuery?: string
}>(), {
  loading: false,
  userNameMap: () => ({}),
  projectMap: () => ({}),
  showProject: true,
  compact: false,
  perPage: 50,
  hideSearch: false,
  searchQuery: '',
})

// ─── Payment type filter ────────────────────────────────────
const paymentTypeFilter = ref('')
const paymentTypes = computed(() => {
  const set = new Set<string>()
  props.records.forEach(r => {
    const t = r['Payment RCVD']
    if (t) set.add(t)
  })
  return Array.from(set).sort()
})

// ─── Search & Sort ──────────────────────────────────────────
const search = ref('')
const sortKey = ref('TimeStamp')
const sortDir = ref<'asc' | 'desc'>('desc')

function toggleSort(key: string) {
  if (sortKey.value === key) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortKey.value = key; sortDir.value = 'desc' }
}

// ─── Helpers ────────────────────────────────────────────────
function resolveName(email: string): string {
  if (!email) return '—'
  return props.userNameMap[email.toLowerCase()] || email
}

function resolveProjectAddress(projectId: string): string {
  if (!projectId) return '—'
  const p = props.projectMap[projectId]
  if (!p) return projectId
  return p['Customer Address'] || p['Project Address'] || p['Address'] || projectId
}

function formatDate(value: any): string {
  if (!value) return '—'
  try {
    const d = new Date(value?.value || value)
    if (Number.isNaN(d.getTime())) return String(value)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  catch { return String(value) }
}

function formatCurrency(value: any): string {
  if (value === null || value === undefined || value === '') return '—'
  const n = Number(value)
  if (Number.isNaN(n)) return String(value)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n)
}

function formatPercent(value: any): string {
  if (value === null || value === undefined || value === '' || value === 0) return '—'
  return `${value}%`
}

// ─── Columns ────────────────────────────────────────────────
const columns = computed(() => {
  const cols = [
    ...(props.showProject
      ? [{ key: 'Project ID', label: 'Project', sortable: true }]
      : []),
    { key: 'Payment Date', label: 'Payment Date', sortable: true },
    { key: 'Payment RCVD', label: 'Payment Type', sortable: true },
    { key: 'Finance Company', label: 'Finance Co.', sortable: true },
    { key: 'Amount', label: 'Amount', sortable: true },
    { key: 'Check #', label: 'Check #', sortable: true },
    { key: 'Dealer Fee', label: 'Dealer Fee', sortable: true },
    { key: 'Transfer Fee', label: 'Transfer Fee', sortable: true },
    { key: 'CC Fee', label: 'CC Fee', sortable: true },
    { key: 'Payment Description', label: 'Description', sortable: true },
    { key: 'Create By', label: 'Created By', sortable: true },
    { key: 'TimeStamp', label: 'Created', sortable: true },
  ]
  return cols
})

// ─── Filter & Sort ──────────────────────────────────────────
const effectiveSearch = computed(() => props.searchQuery || search.value)

const filtered = computed(() => {
  let rows = [...props.records]

  if (paymentTypeFilter.value) {
    rows = rows.filter(r => r['Payment RCVD'] === paymentTypeFilter.value)
  }

  if (effectiveSearch.value.trim()) {
    const q = effectiveSearch.value.toLowerCase()
    rows = rows.filter(r =>
      (r['Project ID'] || '').toLowerCase().includes(q)
      || (resolveProjectAddress(r['Project ID']) || '').toLowerCase().includes(q)
      || (r['Payment RCVD'] || '').toLowerCase().includes(q)
      || (r['Finance Company'] || '').toLowerCase().includes(q)
      || (r['Payment Description'] || '').toLowerCase().includes(q)
      || (r['Check #'] || '').toString().toLowerCase().includes(q)
      || (r['Create By'] || '').toLowerCase().includes(q)
      || (resolveName(r['Create By']) || '').toLowerCase().includes(q)
      || String(r['Amount'] ?? '').includes(q),
    )
  }

  return rows
})

const sorted = computed(() => {
  const arr = [...filtered.value]
  const key = sortKey.value
  const dir = sortDir.value === 'asc' ? 1 : -1
  return arr.sort((a, b) => {
    let av = a[key] ?? ''
    let bv = b[key] ?? ''
    if (av?.value) av = av.value
    if (bv?.value) bv = bv.value
    if (typeof av === 'string') av = av.toLowerCase()
    if (typeof bv === 'string') bv = bv.toLowerCase()
    if (av < bv) return -1 * dir
    if (av > bv) return 1 * dir
    return 0
  })
})

// ─── Infinite scroll ────────────────────────────────────────
const visibleCount = ref(props.perPage)
const visible = computed(() => sorted.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < sorted.value.length)

function loadMore() {
  if (hasMore.value) visibleCount.value += props.perPage
}

watch(() => effectiveSearch.value, () => { visibleCount.value = props.perPage })
watch(() => paymentTypeFilter.value, () => { visibleCount.value = props.perPage })
watch(() => props.records, () => { visibleCount.value = props.perPage })

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
</script>

<template>
  <div class="payments-table-wrap" :class="{ 'payments-table-compact': compact }">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-primary" />
    </div>

    <!-- Empty -->
    <div v-else-if="records.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
      <div class="size-12 rounded-xl bg-muted/40 flex items-center justify-center mb-3">
        <Icon name="i-lucide-credit-card" class="size-6 text-muted-foreground/25" />
      </div>
      <p class="text-xs text-muted-foreground/60">No payments found</p>
    </div>

    <!-- Table -->
    <div v-else class="flex flex-col h-full">
      <!-- Filter tabs -->
      <div v-if="!compact && paymentTypes.length > 1" class="flex items-center gap-2 px-3 pb-2 shrink-0 flex-wrap">
        <button
          class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
          :class="!paymentTypeFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
          @click="paymentTypeFilter = ''"
        >
          All
        </button>
        <button
          v-for="pt in paymentTypes" :key="pt"
          class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
          :class="paymentTypeFilter === pt ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
          @click="paymentTypeFilter = pt"
        >
          {{ pt }}
        </button>
      </div>

      <!-- Compact filter -->
      <div v-if="compact && (paymentTypes.length > 1 || (!hideSearch && records.length > 1))" class="px-1 pb-2 shrink-0 space-y-1.5">
        <div v-if="paymentTypes.length > 1" class="flex items-center gap-1 flex-wrap">
          <button
            class="px-2 py-0.5 rounded text-[9px] font-medium border transition-all"
            :class="!paymentTypeFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="paymentTypeFilter = ''"
          >
            All
          </button>
          <button
            v-for="pt in paymentTypes" :key="pt"
            class="px-2 py-0.5 rounded text-[9px] font-medium border transition-all"
            :class="paymentTypeFilter === pt ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="paymentTypeFilter = pt"
          >
            {{ pt }}
          </button>
        </div>
        <div v-if="!hideSearch && records.length > 1" class="relative">
          <Icon name="i-lucide-search" class="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/40" />
          <input v-model="search" placeholder="Search…" class="w-full h-7 pl-7 pr-2 text-[11px] rounded-md border bg-background/50 outline-none focus:ring-1 focus:ring-primary/30 transition-all" />
        </div>
      </div>

      <!-- Scrollable table -->
      <div class="flex-1 overflow-auto">
        <table class="w-full">
          <thead class="sticky top-0 z-10">
            <tr class="bg-muted/60 backdrop-blur-sm">
              <th
                v-for="col in columns" :key="col.key"
                class="text-left font-semibold text-muted-foreground select-none transition-colors border-b whitespace-nowrap"
                :class="[compact ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2.5 text-xs', col.sortable ? 'cursor-pointer hover:text-foreground' : '']"
                @click="col.sortable && toggleSort(col.key)"
              >
                <div class="flex items-center gap-1">
                  <span>{{ col.label }}</span>
                  <Icon v-if="sortKey === col.key" :name="sortDir === 'asc' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'" class="size-3 text-primary shrink-0" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(rec, idx) in visible" :key="rec['Record ID'] || idx"
              class="border-b border-border/20 hover:bg-muted/15 transition-colors"
            >
              <td v-for="col in columns" :key="col.key" class="whitespace-nowrap" :class="compact ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2 text-xs'">
                <!-- Project ID → address link -->
                <template v-if="col.key === 'Project ID'">
                  <NuxtLink
                    v-if="rec['Project ID']"
                    :to="`/projects/${rec['Project ID']}`"
                    class="text-primary hover:underline block truncate max-w-[180px]"
                    :class="compact ? 'text-[10px]' : 'text-[11px]'"
                    :title="resolveProjectAddress(rec['Project ID']) + ' (' + rec['Project ID'] + ')'"
                  >
                    {{ resolveProjectAddress(rec['Project ID']) }}
                  </NuxtLink>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Date columns -->
                <template v-else-if="['Payment Date', 'TimeStamp'].includes(col.key)">
                  <span class="tabular-nums text-muted-foreground">{{ formatDate(rec[col.key]) }}</span>
                </template>

                <!-- Payment Type badge -->
                <template v-else-if="col.key === 'Payment RCVD'">
                  <Badge v-if="rec['Payment RCVD']" variant="secondary" class="text-[10px]">
                    {{ rec['Payment RCVD'] }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Finance Company -->
                <template v-else-if="col.key === 'Finance Company'">
                  <span class="font-medium">{{ rec['Finance Company'] || '—' }}</span>
                </template>

                <!-- Currency columns -->
                <template v-else-if="['Amount', 'Dealer Fee', 'Transfer Fee', 'CC Fee'].includes(col.key)">
                  <span class="font-medium tabular-nums">{{ formatCurrency(rec[col.key]) }}</span>
                </template>

                <!-- Description -->
                <template v-else-if="col.key === 'Payment Description'">
                  <span class="block truncate" :class="compact ? 'max-w-[150px]' : 'max-w-[250px]'" :title="rec['Payment Description'] || ''">
                    {{ rec['Payment Description'] || '—' }}
                  </span>
                </template>

                <!-- Created By -->
                <template v-else-if="col.key === 'Create By'">
                  <span class="truncate max-w-[120px] block">{{ resolveName(rec['Create By']) }}</span>
                </template>

                <!-- Check # -->
                <template v-else-if="col.key === 'Check #'">
                  <span v-if="rec['Check #']" class="font-mono" :class="compact ? 'text-[10px]' : 'text-[11px]'">{{ rec['Check #'] }}</span>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Default -->
                <span v-else class="truncate max-w-[150px] block">{{ rec[col.key] ?? '—' }}</span>
              </td>
            </tr>

            <!-- No results -->
            <tr v-if="visible.length === 0">
              <td :colspan="columns.length" class="text-center py-8 text-muted-foreground">
                <Icon name="i-lucide-search-x" class="size-6 mx-auto mb-1.5 text-muted-foreground/15" />
                <p class="text-xs">No matching payments</p>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Sentinel -->
        <div v-if="hasMore" ref="sentinelRef" class="flex items-center justify-center py-3 shrink-0">
          <Icon name="i-lucide-loader-2" class="size-4 animate-spin text-muted-foreground/40" />
          <span class="text-[10px] text-muted-foreground/40 ml-2">Loading more…</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.payments-table-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
