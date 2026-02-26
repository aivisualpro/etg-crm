<script setup lang="ts">
/**
 * Reusable Notes Table component.
 * Works in both full-page mode (/notes) and compact card mode (project detail).
 */
const props = withDefaults(defineProps<{
  records: readonly any[]
  loading?: boolean
  userNameMap?: Record<string, string>
  projectMap?: Record<string, any>
  customerMap?: Record<string, string>
  showProject?: boolean
  compact?: boolean
  perPage?: number
  hideSearch?: boolean
  searchQuery?: string
}>(), {
  loading: false,
  userNameMap: () => ({}),
  projectMap: () => ({}),
  customerMap: () => ({}),
  showProject: true,
  compact: false,
  perPage: 50,
  hideSearch: false,
  searchQuery: '',
})

// ─── Note type filter ───────────────────────────────────────
const noteTypeFilter = ref('')
const noteTypes = computed(() => {
  const set = new Set<string>()
  props.records.forEach(r => {
    const t = r['Note Type']
    if (t) set.add(t)
  })
  return Array.from(set).sort()
})

// ─── Search & Sort ──────────────────────────────────────────
const search = ref('')
const sortKey = ref('Time Stamp')
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

function resolveCustomerName(customerId: string): string {
  if (!customerId) return '—'
  return props.customerMap[customerId] || customerId
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

function sourceColor(source: string): string {
  if (source === 'closed') return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
  return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
}

function noteTypeColor(type: string): string {
  const t = (type || '').toLowerCase()
  if (t.includes('customer')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'
  if (t.includes('project')) return 'bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400'
  if (t.includes('event')) return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (t.includes('ticket')) return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

function priorityColor(priority: string): string {
  const p = (priority || '').toLowerCase()
  if (p === 'high' || p === 'urgent') return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  if (p === 'medium' || p === 'normal') return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (p === 'low') return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

// ─── Columns ────────────────────────────────────────────────
const columns = computed(() => {
  const cols = [
    { key: 'Note Type', label: 'Type', sortable: true },
    { key: 'Priority', label: 'Priority', sortable: true },
    ...(props.showProject
      ? [{ key: 'Project ID', label: 'Project', sortable: true }]
      : []),
    { key: 'Ticket ID', label: 'Ticket ID', sortable: true },
    { key: 'Customer', label: 'Customer', sortable: true },
    { key: 'Note', label: 'Note', sortable: true },
    { key: 'Department', label: 'Department', sortable: true },
    { key: 'Time Stamp', label: 'Date', sortable: true },
    { key: 'Last Edit', label: 'Last Edit', sortable: true },
    { key: 'Create By', label: 'Created By', sortable: true },
    { key: '_source', label: 'Status', sortable: true },
  ]
  return cols
})

// ─── Filter, Sort, Paginate ─────────────────────────────────
const effectiveSearch = computed(() => props.searchQuery || search.value)

const filtered = computed(() => {
  let rows = props.records

  // Note type filter
  if (noteTypeFilter.value) {
    rows = rows.filter(r => r['Note Type'] === noteTypeFilter.value)
  }

  // Text search
  if (effectiveSearch.value.trim()) {
    const q = effectiveSearch.value.toLowerCase()
    rows = rows.filter(r =>
      (r['Project ID'] || '').toLowerCase().includes(q)
      || (resolveProjectAddress(r['Project ID']) || '').toLowerCase().includes(q)
      || (r.Note || '').toLowerCase().includes(q)
      || (r['Note Type'] || '').toLowerCase().includes(q)
      || (r['Note Category'] || '').toLowerCase().includes(q)
      || (r.Priority || '').toLowerCase().includes(q)
      || (r.Department || '').toLowerCase().includes(q)
      || (r['Ticket ID'] || '').toLowerCase().includes(q)
      || (r.Customer || '').toLowerCase().includes(q)
      || (resolveCustomerName(r.Customer) || '').toLowerCase().includes(q)
      || (r['Create By'] || '').toLowerCase().includes(q)
      || (resolveName(r['Create By']) || '').toLowerCase().includes(q)
      || (r._source || '').toLowerCase().includes(q),
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
  if (hasMore.value) {
    visibleCount.value += props.perPage
  }
}

// Reset on search/filter change
watch(() => effectiveSearch.value, () => { visibleCount.value = props.perPage })
watch(() => noteTypeFilter.value, () => { visibleCount.value = props.perPage })
watch(() => props.records, () => { visibleCount.value = props.perPage })

// IntersectionObserver for auto-loading
const sentinelRef = ref<HTMLElement | null>(null)
let _observer: IntersectionObserver | null = null

onMounted(() => {
  _observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && hasMore.value) {
      loadMore()
    }
  }, { rootMargin: '200px' })
})

onUnmounted(() => {
  _observer?.disconnect()
})

watch(sentinelRef, (el) => {
  _observer?.disconnect()
  if (el) _observer?.observe(el)
})
</script>

<template>
  <div class="notes-table-wrap" :class="{ 'notes-table-compact': compact }">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-primary" />
    </div>

    <!-- Empty -->
    <div v-else-if="records.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
      <div class="size-12 rounded-xl bg-muted/40 flex items-center justify-center mb-3">
        <Icon name="i-lucide-sticky-note" class="size-6 text-muted-foreground/25" />
      </div>
      <p class="text-xs text-muted-foreground/60">No notes found</p>
    </div>

    <!-- Table -->
    <div v-else class="flex flex-col h-full">
      <!-- Toolbar: filters + search -->
      <div v-if="!compact" class="flex items-center gap-2 px-3 pb-2 shrink-0 flex-wrap">
        <!-- Note Type Filter Tabs -->
        <button
          class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
          :class="!noteTypeFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
          @click="noteTypeFilter = ''"
        >
          All
        </button>
        <button
          v-for="nt in noteTypes"
          :key="nt"
          class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
          :class="noteTypeFilter === nt ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
          @click="noteTypeFilter = nt"
        >
          {{ nt }}
        </button>
      </div>

      <!-- Compact mode: inline filter + search -->
      <div v-if="compact && (noteTypes.length > 1 || (!hideSearch && records.length > 1))" class="px-1 pb-2 shrink-0 space-y-1.5">
        <!-- Filter chips -->
        <div v-if="noteTypes.length > 1" class="flex items-center gap-1 flex-wrap">
          <button
            class="px-2 py-0.5 rounded text-[9px] font-medium border transition-all"
            :class="!noteTypeFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="noteTypeFilter = ''"
          >
            All
          </button>
          <button
            v-for="nt in noteTypes"
            :key="nt"
            class="px-2 py-0.5 rounded text-[9px] font-medium border transition-all"
            :class="noteTypeFilter === nt ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="noteTypeFilter = nt"
          >
            {{ nt }}
          </button>
        </div>
        <!-- Search -->
        <div v-if="!hideSearch && records.length > 1" class="relative">
          <Icon name="i-lucide-search" class="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/40" />
          <input
            v-model="search"
            placeholder="Search…"
            class="w-full h-7 pl-7 pr-2 text-[11px] rounded-md border bg-background/50 outline-none focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      <!-- Scrollable table -->
      <div class="flex-1 overflow-auto">
        <table class="w-full">
          <thead class="sticky top-0 z-10">
            <tr class="bg-muted/60 backdrop-blur-sm">
              <th
                v-for="col in columns"
                :key="col.key"
                class="text-left font-semibold text-muted-foreground select-none transition-colors border-b whitespace-nowrap"
                :class="[
                  compact ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2.5 text-xs',
                  col.sortable ? 'cursor-pointer hover:text-foreground' : '',
                ]"
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
              :key="rec['Note ID'] || idx"
              class="border-b border-border/20 hover:bg-muted/15 transition-colors"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                class="whitespace-nowrap"
                :class="compact ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2 text-xs'"
              >
                <!-- Note Type badge -->
                <template v-if="col.key === 'Note Type'">
                  <Badge v-if="rec['Note Type']" variant="outline" :class="noteTypeColor(rec['Note Type'])" class="text-[10px]">
                    {{ rec['Note Type'] }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Priority badge -->
                <template v-else-if="col.key === 'Priority'">
                  <Badge v-if="rec.Priority" variant="outline" :class="priorityColor(rec.Priority)" class="text-[10px]">
                    {{ rec.Priority }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Project ID → show address with link -->
                <template v-else-if="col.key === 'Project ID'">
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

                <!-- Customer → show name with link -->
                <template v-else-if="col.key === 'Customer'">
                  <NuxtLink
                    v-if="rec.Customer"
                    :to="`/customers/${rec.Customer}`"
                    class="text-primary hover:underline block truncate max-w-[150px]"
                    :class="compact ? 'text-[10px]' : 'text-[11px]'"
                    :title="resolveCustomerName(rec.Customer)"
                  >
                    {{ resolveCustomerName(rec.Customer) }}
                  </NuxtLink>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Ticket ID -->
                <template v-else-if="col.key === 'Ticket ID'">
                  <span v-if="rec['Ticket ID']" class="font-mono" :class="compact ? 'text-[10px]' : 'text-[11px]'">
                    {{ rec['Ticket ID'] }}
                  </span>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Status badge -->
                <template v-else-if="col.key === '_source'">
                  <Badge variant="outline" :class="sourceColor(rec._source)" class="text-[10px]">
                    {{ rec._source === 'closed' ? 'Closed' : 'Active' }}
                  </Badge>
                </template>

                <!-- Note content -->
                <span
                  v-else-if="col.key === 'Note'"
                  class="block max-w-[300px] truncate"
                  :title="rec.Note || ''"
                >
                  {{ rec.Note || '—' }}
                </span>

                <!-- Department badge -->
                <template v-else-if="col.key === 'Department'">
                  <Badge v-if="rec.Department" variant="secondary" class="text-[10px]">
                    {{ rec.Department }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Date columns -->
                <template v-else-if="col.key === 'Time Stamp' || col.key === 'Last Edit'">
                  <span class="tabular-nums text-muted-foreground">
                    {{ formatDate(rec[col.key]) }}
                  </span>
                </template>

                <!-- Created By -->
                <template v-else-if="col.key === 'Create By'">
                  <span class="truncate max-w-[120px] block">{{ resolveName(rec['Create By']) }}</span>
                </template>

                <!-- Default -->
                <span v-else class="truncate max-w-[150px] block">{{ rec[col.key] || '—' }}</span>
              </td>
            </tr>

            <!-- No results -->
            <tr v-if="visible.length === 0">
              <td :colspan="columns.length" class="text-center py-8 text-muted-foreground">
                <Icon name="i-lucide-search-x" class="size-6 mx-auto mb-1.5 text-muted-foreground/15" />
                <p class="text-xs">No matching notes</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Infinite scroll sentinel -->
      <div v-if="hasMore" ref="sentinelRef" class="flex items-center justify-center py-3 shrink-0">
        <Icon name="i-lucide-loader-2" class="size-4 animate-spin text-muted-foreground/40" />
        <span class="text-[10px] text-muted-foreground/40 ml-2">Loading more…</span>
      </div>

      <!-- Count indicator -->
      <div v-if="sorted.length > 0" class="flex items-center justify-center border-t bg-card/30 shrink-0" :class="compact ? 'px-2 py-1' : 'px-4 py-2'">
        <span class="text-muted-foreground" :class="compact ? 'text-[9px]' : 'text-[11px]'">
          Showing {{ Math.min(visibleCount, sorted.length).toLocaleString() }} of {{ sorted.length.toLocaleString() }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notes-table-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
