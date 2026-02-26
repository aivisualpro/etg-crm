<script setup lang="ts">
/**
 * Reusable Tasks Table component — displays BigQuery Tasks data.
 * Works in both full-page mode (/tasks) and compact card mode.
 *
 * BigQuery schema:
 *   Task ID, Task Date, Task, Note ID, Project, Note Type,
 *   Priority, Status, Create by, TimeStamp, Remind To
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

// ─── Status filter ──────────────────────────────────────────
const statusFilter = ref('')
const statuses = computed(() => {
  const set = new Set<string>()
  props.records.forEach(r => {
    const s = r['Status']
    if (s) set.add(s)
  })
  return Array.from(set).sort()
})

// ─── Priority filter ────────────────────────────────────────
const priorityFilter = ref('')
const priorities = computed(() => {
  const set = new Set<string>()
  props.records.forEach(r => {
    const p = r['Priority']
    if (p) set.add(p)
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

function statusColor(status: string): string {
  const s = (status || '').toLowerCase()
  if (['completed', 'complete', 'done', 'closed'].some(k => s.includes(k)))
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
  if (['in progress', 'active', 'working'].some(k => s.includes(k)))
    return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'
  if (['pending', 'new', 'open', 'todo'].some(k => s.includes(k)))
    return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (['cancel', 'n/a', 'rejected', 'overdue'].some(k => s.includes(k)))
    return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

function priorityColor(priority: string): string {
  const p = (priority || '').toLowerCase()
  if (['critical', 'urgent'].some(k => p.includes(k)))
    return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  if (['high'].some(k => p.includes(k)))
    return 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400'
  if (['medium', 'normal'].some(k => p.includes(k)))
    return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (['low'].some(k => p.includes(k)))
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

function noteTypeColor(t: string): string {
  const s = (t || '').toLowerCase()
  if (s.includes('project task')) return 'bg-violet-500/10 text-violet-600 border-violet-500/20'
  if (s.includes('project note')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

// ─── Columns ────────────────────────────────────────────────
const columns = computed(() => {
  const cols = [
    { key: 'Task', label: 'Task', sortable: true },
    { key: 'Status', label: 'Status', sortable: true },
    { key: 'Priority', label: 'Priority', sortable: true },
    { key: 'Note Type', label: 'Type', sortable: true },
    ...(props.showProject
      ? [{ key: 'Project', label: 'Project', sortable: true }]
      : []),
    { key: 'Task Date', label: 'Task Date', sortable: true },
    { key: 'Create by', label: 'Created By', sortable: true },
    { key: 'Remind To', label: 'Remind To', sortable: true },
    { key: 'TimeStamp', label: 'Created', sortable: true },
  ]
  return cols
})

// ─── Filter & Sort ──────────────────────────────────────────
const effectiveSearch = computed(() => props.searchQuery || search.value)

const filtered = computed(() => {
  let rows = [...props.records]

  if (statusFilter.value) {
    rows = rows.filter(r => r['Status'] === statusFilter.value)
  }
  if (priorityFilter.value) {
    rows = rows.filter(r => r['Priority'] === priorityFilter.value)
  }

  if (effectiveSearch.value.trim()) {
    const q = effectiveSearch.value.toLowerCase()
    rows = rows.filter(r =>
      (r['Task'] || '').toLowerCase().includes(q)
      || (r['Status'] || '').toLowerCase().includes(q)
      || (r['Priority'] || '').toLowerCase().includes(q)
      || (r['Note Type'] || '').toLowerCase().includes(q)
      || (r['Project'] || '').toLowerCase().includes(q)
      || (resolveProjectAddress(r['Project']) || '').toLowerCase().includes(q)
      || (r['Create by'] || '').toLowerCase().includes(q)
      || (resolveName(r['Create by']) || '').toLowerCase().includes(q)
      || (r['Remind To'] || '').toLowerCase().includes(q)
      || (r['Task ID'] || '').toLowerCase().includes(q),
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
watch(() => statusFilter.value, () => { visibleCount.value = props.perPage })
watch(() => priorityFilter.value, () => { visibleCount.value = props.perPage })
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
  <div class="tasks-table-wrap" :class="{ 'tasks-table-compact': compact }">
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-primary" />
    </div>

    <!-- Empty -->
    <div v-else-if="records.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
      <div class="size-12 rounded-xl bg-muted/40 flex items-center justify-center mb-3">
        <Icon name="i-lucide-calendar-check-2" class="size-6 text-muted-foreground/25" />
      </div>
      <p class="text-xs text-muted-foreground/60">No tasks found</p>
    </div>

    <!-- Table -->
    <div v-else class="flex flex-col h-full">
      <!-- Filter tabs -->
      <div v-if="!compact && (statuses.length > 1 || priorities.length > 1)" class="flex items-center gap-4 px-3 pb-2 shrink-0 flex-wrap">
        <!-- Status filter -->
        <div v-if="statuses.length > 1" class="flex items-center gap-1.5">
          <span class="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium mr-0.5">Status</span>
          <button
            class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
            :class="!statusFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="statusFilter = ''"
          >
            All
          </button>
          <button
            v-for="s in statuses" :key="s"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
            :class="statusFilter === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="statusFilter = s"
          >
            {{ s }}
          </button>
        </div>
        <!-- Priority filter -->
        <div v-if="priorities.length > 1" class="flex items-center gap-1.5">
          <span class="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-medium mr-0.5">Priority</span>
          <button
            class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
            :class="!priorityFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="priorityFilter = ''"
          >
            All
          </button>
          <button
            v-for="p in priorities" :key="p"
            class="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all"
            :class="priorityFilter === p ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="priorityFilter = p"
          >
            {{ p }}
          </button>
        </div>
      </div>

      <!-- Compact filter row -->
      <div v-if="compact && (statuses.length > 1 || !hideSearch)" class="px-1 pb-2 shrink-0 space-y-1.5">
        <div v-if="statuses.length > 1" class="flex items-center gap-1 flex-wrap">
          <button
            class="px-2 py-0.5 rounded text-[9px] font-medium border transition-all"
            :class="!statusFilter ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="statusFilter = ''"
          >
            All
          </button>
          <button
            v-for="s in statuses" :key="s"
            class="px-2 py-0.5 rounded text-[9px] font-medium border transition-all"
            :class="statusFilter === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/40 text-muted-foreground border-transparent hover:bg-muted/60'"
            @click="statusFilter = s"
          >
            {{ s }}
          </button>
        </div>
        <div v-if="!hideSearch" class="relative">
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
              v-for="(rec, idx) in visible" :key="rec['Task ID'] || idx"
              class="border-b border-border/20 hover:bg-muted/15 transition-colors"
            >
              <td v-for="col in columns" :key="col.key" class="whitespace-nowrap" :class="compact ? 'px-2 py-1.5 text-[10px]' : 'px-3 py-2 text-xs'">
                <!-- Task content -->
                <template v-if="col.key === 'Task'">
                  <span class="block truncate" :class="compact ? 'max-w-[200px]' : 'max-w-[350px]'" :title="rec['Task'] || ''">
                    {{ rec['Task'] || '—' }}
                  </span>
                </template>

                <!-- Status badge -->
                <template v-else-if="col.key === 'Status'">
                  <Badge v-if="rec['Status']" variant="outline" :class="statusColor(rec['Status'])" class="text-[10px]">
                    {{ rec['Status'] }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Priority badge -->
                <template v-else-if="col.key === 'Priority'">
                  <Badge v-if="rec['Priority']" variant="outline" :class="priorityColor(rec['Priority'])" class="text-[10px]">
                    {{ rec['Priority'] }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Note Type badge -->
                <template v-else-if="col.key === 'Note Type'">
                  <Badge v-if="rec['Note Type']" variant="secondary" :class="noteTypeColor(rec['Note Type'])" class="text-[10px]">
                    {{ rec['Note Type'] }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Project → address link -->
                <template v-else-if="col.key === 'Project'">
                  <NuxtLink
                    v-if="rec['Project']"
                    :to="`/projects/${rec['Project']}`"
                    class="text-primary hover:underline block truncate max-w-[180px]"
                    :class="compact ? 'text-[10px]' : 'text-[11px]'"
                    :title="resolveProjectAddress(rec['Project']) + ' (' + rec['Project'] + ')'"
                  >
                    {{ resolveProjectAddress(rec['Project']) }}
                  </NuxtLink>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Date columns -->
                <template v-else-if="['Task Date', 'TimeStamp'].includes(col.key)">
                  <span class="tabular-nums text-muted-foreground">{{ formatDate(rec[col.key]) }}</span>
                </template>

                <!-- Created By -->
                <template v-else-if="col.key === 'Create by'">
                  <span class="truncate max-w-[120px] block">{{ resolveName(rec['Create by']) }}</span>
                </template>

                <!-- Remind To -->
                <template v-else-if="col.key === 'Remind To'">
                  <span v-if="rec['Remind To']" class="block truncate max-w-[200px]" :title="rec['Remind To']">
                    {{ rec['Remind To'].split(',').map((e: string) => resolveName(e.trim())).join(', ') }}
                  </span>
                  <span v-else class="text-muted-foreground/40">—</span>
                </template>

                <!-- Default -->
                <span v-else class="truncate max-w-[150px] block">{{ rec[col.key] || '—' }}</span>
              </td>
            </tr>

            <!-- No results -->
            <tr v-if="visible.length === 0">
              <td :colspan="columns.length" class="text-center py-8 text-muted-foreground">
                <Icon name="i-lucide-search-x" class="size-6 mx-auto mb-1.5 text-muted-foreground/15" />
                <p class="text-xs">No matching tasks</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Sentinel -->
      <div v-if="hasMore" ref="sentinelRef" class="flex items-center justify-center py-3 shrink-0">
        <Icon name="i-lucide-loader-2" class="size-4 animate-spin text-muted-foreground/40" />
        <span class="text-[10px] text-muted-foreground/40 ml-2">Loading more…</span>
      </div>

      <!-- Count -->
      <div v-if="sorted.length > 0" class="flex items-center justify-center border-t bg-card/30 shrink-0" :class="compact ? 'px-2 py-1' : 'px-4 py-2'">
        <span class="text-muted-foreground" :class="compact ? 'text-[9px]' : 'text-[11px]'">
          Showing {{ Math.min(visibleCount, sorted.length).toLocaleString() }} of {{ sorted.length.toLocaleString() }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tasks-table-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
