<script setup lang="ts">
/**
 * Reusable Permits Table component.
 * Works in both full-page mode (/permits) and compact card mode (project detail).
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

// ─── Permit type filter ─────────────────────────────────────
const permitTypeFilter = ref('')
const permitTypes = computed(() => {
  const set = new Set<string>()
  props.records.forEach(r => {
    const t = r['Permit Type']
    if (t) set.add(t)
  })
  return Array.from(set).sort()
})

// ─── Search & Sort ──────────────────────────────────────────
const search = ref('')
const sortKey = ref('_ts')
const sortDir = ref<'asc' | 'desc'>('desc')

// Dynamic timestamp key resolver
function getTs(rec: any): any {
  return rec['Time Stamp'] || rec['TimeStamp'] || rec['Timestamp'] || rec['Application Date'] || ''
}

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

function sourceColor(source: string): string {
  if (source === 'closed') return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
  return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
}

function statusColor(status: string): string {
  const s = (status || '').toLowerCase()
  if (['completed', 'complete', 'done', 'approved', 'rcvd', 'received'].some(k => s.includes(k)))
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
  if (['in progress', 'active', 'submitted', 'applied'].some(k => s.includes(k)))
    return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'
  if (['pending', 'new', 'tbd', 'hold', 'requested', 'waiting'].some(k => s.includes(k)))
    return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (['cancel', 'n/a', 'rejected', 'denied', 'expired'].some(k => s.includes(k)))
    return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

// ─── Columns ────────────────────────────────────────────────
const columns = computed(() => {
  const cols = [
    ...(props.showProject
      ? [{ key: 'Project ID', label: 'Project', sortable: true }]
      : []),
    { key: 'Permit Type', label: 'Permit Type', sortable: true },
    { key: 'Permit Status', label: 'Status', sortable: true },
    { key: 'Permit Number', label: 'Permit #', sortable: true },
    { key: 'Application Date', label: 'Applied', sortable: true },
    { key: 'Approval Date', label: 'Approved', sortable: true },
    { key: 'Permit Note', label: 'Note', sortable: true },
    { key: 'Create By', label: 'Created By', sortable: true },
    { key: '_ts', label: 'Date', sortable: true },
    { key: '_source', label: 'Record', sortable: true },
  ]
  return cols
})

// ─── Filter, Sort, Paginate ─────────────────────────────────
const effectiveSearch = computed(() => props.searchQuery || search.value)

const filtered = computed(() => {
  let rows = [...props.records]

  // Permit type filter
  if (permitTypeFilter.value) {
    rows = rows.filter(r => r['Permit Type'] === permitTypeFilter.value)
  }

  // Text search
  if (effectiveSearch.value.trim()) {
    const q = effectiveSearch.value.toLowerCase()
    rows = rows.filter(r =>
      (r['Project ID'] || '').toLowerCase().includes(q)
      || (resolveProjectAddress(r['Project ID']) || '').toLowerCase().includes(q)
      || (r['Permit Type'] || '').toLowerCase().includes(q)
      || (r['Permit Status'] || '').toLowerCase().includes(q)
      || (r['Permit Number'] || '').toLowerCase().includes(q)
      || (r['Permit Note'] || '').toLowerCase().includes(q)
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
    let av = key === '_ts' ? getTs(a) : (a[key] ?? '')
    let bv = key === '_ts' ? getTs(b) : (b[key] ?? '')
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
watch(() => permitTypeFilter.value, () => { visibleCount.value = props.perPage })
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
  <div class="permits-table-wrap" :class="{ 'permits-table-compact': compact }">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-primary" />
    </div>

    <!-- Empty -->
    <div v-else-if="records.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
      <div class="size-12 rounded-xl bg-muted/40 flex items-center justify-center mb-3">
        <Icon name="i-lucide-clipboard-check" class="size-6 text-muted-foreground/25" />
      </div>
      <p class="text-xs text-muted-foreground/60">No permits found</p>
    </div>

    <!-- Table -->
    <div v-else class="flex flex-col h-full">
      <!-- Toolbar: filters -->
      <div v-if="!compact && permitTypes.length > 1" class="flex items-center gap-2 px-3 pb-2 shrink-0 flex-wrap">
        <button
          class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
          :class="!permitTypeFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
          @click="permitTypeFilter = ''"
        >
          All
        </button>
        <button
          v-for="pt in permitTypes"
          :key="pt"
          class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
          :class="permitTypeFilter === pt ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
          @click="permitTypeFilter = pt"
        >
          {{ pt }}
        </button>
      </div>

      <!-- Compact mode: inline filter + search -->
      <div v-if="compact && (permitTypes.length > 1 || (!hideSearch && records.length > 1))" class="px-1 pb-2 shrink-0 space-y-1.5">
        <div v-if="permitTypes.length > 1" class="flex items-center gap-1 flex-wrap">
          <button
            class="px-2 py-0.5 rounded text-[9px] font-medium border transition-all"
            :class="!permitTypeFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="permitTypeFilter = ''"
          >
            All
          </button>
          <button
            v-for="pt in permitTypes"
            :key="pt"
            class="px-2 py-0.5 rounded text-[9px] font-medium border transition-all"
            :class="permitTypeFilter === pt ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="permitTypeFilter = pt"
          >
            {{ pt }}
          </button>
        </div>
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
              :key="rec['Permit ID'] || idx"
              class="border-b border-border/20 hover:bg-muted/15 transition-colors"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                class="whitespace-nowrap"
                :class="compact ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2 text-xs'"
              >
                <!-- Project ID → show address with link -->
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

                <!-- Permit Type badge -->
                <template v-else-if="col.key === 'Permit Type'">
                  <Badge v-if="rec['Permit Type']" variant="secondary" class="text-[10px]">
                    {{ rec['Permit Type'] }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Permit Status badge -->
                <template v-else-if="col.key === 'Permit Status'">
                  <Badge v-if="rec['Permit Status']" variant="outline" :class="statusColor(rec['Permit Status'])" class="text-[10px]">
                    {{ rec['Permit Status'] }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Permit Number -->
                <template v-else-if="col.key === 'Permit Number'">
                  <span v-if="rec['Permit Number']" class="font-mono" :class="compact ? 'text-[10px]' : 'text-[11px]'">
                    {{ rec['Permit Number'] }}
                  </span>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Date columns -->
                <template v-else-if="['Application Date', 'Approval Date', '_ts'].includes(col.key)">
                  <span class="tabular-nums text-muted-foreground">
                    {{ formatDate(col.key === '_ts' ? getTs(rec) : rec[col.key]) }}
                  </span>
                </template>

                <!-- Note content -->
                <template v-else-if="col.key === 'Permit Note'">
                  <span class="block max-w-[250px] truncate" :title="rec['Permit Note'] || ''">
                    {{ rec['Permit Note'] || '—' }}
                  </span>
                </template>

                <!-- Created By -->
                <template v-else-if="col.key === 'Create By'">
                  <span class="truncate max-w-[120px] block">{{ resolveName(rec['Create By']) }}</span>
                </template>

                <!-- Source badge -->
                <template v-else-if="col.key === '_source'">
                  <Badge variant="outline" :class="sourceColor(rec._source)" class="text-[10px]">
                    {{ rec._source === 'closed' ? 'Closed' : 'Active' }}
                  </Badge>
                </template>

                <!-- Default -->
                <span v-else class="truncate max-w-[150px] block">{{ rec[col.key] || '—' }}</span>
              </td>
            </tr>

            <!-- No results -->
            <tr v-if="visible.length === 0">
              <td :colspan="columns.length" class="text-center py-8 text-muted-foreground">
                <Icon name="i-lucide-search-x" class="size-6 mx-auto mb-1.5 text-muted-foreground/15" />
                <p class="text-xs">No matching permits</p>
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
.permits-table-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
