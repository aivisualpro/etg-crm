<script setup lang="ts">
import { cn } from '@/lib/utils'
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()

const search = ref('')
const filterType = ref('')
const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ── Paginated data loading ──────────────────────────────────
const PAGE_SIZE = 200
const notifications = ref<any[]>([])
const totalCount = ref(0)
const loading = ref(false)
const allLoaded = ref(false)

async function fetchPage(offset: number) {
  try {
    const data = await $fetch<{ success: boolean, notifications: any[], totalCount: number }>(
      '/api/bigquery/notifications',
      { params: { offset, limit: PAGE_SIZE } },
    )
    if (data.success) {
      if (offset === 0) {
        notifications.value = data.notifications
      }
      else {
        notifications.value = [...notifications.value, ...data.notifications]
      }
      totalCount.value = data.totalCount
      if (data.notifications.length < PAGE_SIZE) {
        allLoaded.value = true
      }
    }
  }
  catch {
    toast.error('Failed to load notifications')
  }
}

// Initial load
async function initialLoad() {
  loading.value = true
  await fetchPage(0)
  loading.value = false
}

onMounted(initialLoad)

// Load more
async function loadMore() {
  if (loading.value || allLoaded.value) return
  loading.value = true
  await fetchPage(notifications.value.length)
  loading.value = false
}

// Sorting (client-side on loaded data)
const sortBy = ref('timestamp')
const sortDir = ref<'asc' | 'desc'>('desc')

function toggleSort(col: string) {
  if (sortBy.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortBy.value = col; sortDir.value = 'desc' }
}

function sortIcon(col: string) {
  if (sortBy.value !== col) return 'i-lucide-chevrons-up-down'
  return sortDir.value === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
}

// Notification types with counts (from loaded data)
const notificationTypes = computed(() => {
  const counts: Record<string, number> = {}
  for (const n of notifications.value) {
    const type = n['Notification Type'] || 'Other'
    counts[type] = (counts[type] || 0) + 1
  }
  return Object.entries(counts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
})

// Capitalize each first letter
function titleCase(str: string): string {
  return str.replace(/\b\w/g, c => c.toUpperCase())
}

// Helpers
function formatDate(value: any): string {
  if (!value) return '—'
  try {
    const v = value?.value || value
    const d = new Date(v)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
  }
  catch { return String(value) }
}

function relativeTime(value: any): string {
  if (!value) return ''
  const v = value?.value || value
  const d = new Date(v)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 1) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMs / 3600000)
  if (diffHr < 24) return `${diffHr}h ago`
  const diffDay = Math.floor(diffMs / 86400000)
  if (diffDay < 7) return `${diffDay}d ago`
  return formatDate(value)
}

function dotColor(color: string): string {
  const c = (color || '').toLowerCase()
  if (c === 'red' || c === 'error') return 'bg-red-500'
  if (c === 'yellow' || c === 'warning') return 'bg-amber-500'
  if (c === 'green' || c === 'success') return 'bg-emerald-500'
  if (c === 'blue' || c === 'info') return 'bg-blue-500'
  if (c === 'orange') return 'bg-orange-500'
  if (c === 'purple') return 'bg-purple-500'
  return 'bg-zinc-400'
}

function typeIcon(type: string): string {
  const t = (type || '').toLowerCase()
  if (t.includes('note')) return 'i-lucide-sticky-note'
  if (t.includes('chat')) return 'i-lucide-message-circle'
  if (t.includes('event')) return 'i-lucide-calendar-days'
  if (t.includes('permit')) return 'i-lucide-clipboard-check'
  if (t.includes('payment') || t.includes('finance')) return 'i-lucide-banknote'
  if (t.includes('ticket')) return 'i-lucide-ticket'
  if (t.includes('project')) return 'i-lucide-folder-kanban'
  if (t.includes('task')) return 'i-lucide-calendar-check-2'
  return 'i-lucide-bell'
}

// Filtering & sorting (client-side on loaded data)
const filteredNotifications = computed(() => {
  let list = notifications.value
  if (filterType.value) {
    list = list.filter(n => n['Notification Type'] === filterType.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(n =>
      (n['Notification Type'] || '').toLowerCase().includes(q)
      || (n.When || '').toLowerCase().includes(q)
      || (n.Header || '').toLowerCase().includes(q)
      || (n['Project Address'] || '').toLowerCase().includes(q)
      || (n['Project #'] || '').toLowerCase().includes(q)
      || (n['Notify to'] || '').toLowerCase().includes(q)
      || (n.Priority || '').toLowerCase().includes(q),
    )
  }
  return list
})

const sortedNotifications = computed(() => {
  const arr = [...filteredNotifications.value]
  return arr.sort((a, b) => {
    let av: any, bv: any
    if (sortBy.value === 'timestamp') {
      av = new Date(a['USA TimeStamp']?.value || a.TimeStamp?.value || 0).getTime()
      bv = new Date(b['USA TimeStamp']?.value || b.TimeStamp?.value || 0).getTime()
    }
    else if (sortBy.value === 'when') {
      av = (a.When || '').toLowerCase()
      bv = (b.When || '').toLowerCase()
    }
    else if (sortBy.value === 'project') {
      av = (a['Project Address'] || a['Project #'] || '').toLowerCase()
      bv = (b['Project Address'] || b['Project #'] || '').toLowerCase()
    }
    else if (sortBy.value === 'priority') {
      av = (a.Priority || '').toLowerCase()
      bv = (b.Priority || '').toLowerCase()
    }
    else {
      av = (a[sortBy.value] || '').toString().toLowerCase()
      bv = (b[sortBy.value] || '').toString().toLowerCase()
    }
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

// Render-chunking for table (show 50 at a time for DOM perf)
const RENDER_CHUNK = 50
const renderCount = ref(RENDER_CHUNK)
const visibleNotifications = computed(() => sortedNotifications.value.slice(0, renderCount.value))
const hasMoreVisible = computed(() => renderCount.value < sortedNotifications.value.length)

watch([search, filterType, sortBy, sortDir], () => { renderCount.value = RENDER_CHUNK })

// Sentinel for render-chunking + load-more
const sentinelRef = ref<HTMLElement | null>(null)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      if (hasMoreVisible.value) {
        renderCount.value += RENDER_CHUNK
      }
      else if (!allLoaded.value) {
        loadMore()
      }
    }
  }, { threshold: 0.1 })
  watch(sentinelRef, (el) => { if (el) observer.observe(el) }, { immediate: true })
  onUnmounted(() => observer.disconnect())
})

watchEffect(() => {
  const loaded = notifications.value.length
  const total = totalCount.value
  const showing = filteredNotifications.value.length
  const desc = total > loaded
    ? `${showing.toLocaleString()} of ${total.toLocaleString()} notifications`
    : `${showing.toLocaleString()} notifications`
  setHeader({ title: 'Notifications', icon: 'i-lucide-bell', description: desc })
})
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex">
    <!-- ═══ Sub-sidebar — same style as ProjectsLayout ═══ -->
    <div class="w-[220px] shrink-0 border-r bg-card/50 flex flex-col min-h-0 overflow-y-auto">
      <nav class="flex flex-col gap-0.5 p-2">
        <!-- All Types -->
        <button
          :class="cn(
            'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 w-full text-left',
            !filterType
              ? 'bg-primary/10 text-primary font-medium shadow-sm'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )"
          @click="filterType = ''"
        >
          <Icon name="i-lucide-bell" class="size-4 shrink-0" />
          <span class="truncate flex-1">All Types</span>
          <span class="text-[10px] tabular-nums opacity-60">{{ totalCount.toLocaleString() }}</span>
        </button>

        <!-- Type items -->
        <button
          v-for="t in notificationTypes"
          :key="t.type"
          :class="cn(
            'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 w-full text-left',
            filterType === t.type
              ? 'bg-primary/10 text-primary font-medium shadow-sm'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )"
          @click="filterType = filterType === t.type ? '' : t.type"
        >
          <Icon :name="typeIcon(t.type)" class="size-4 shrink-0" />
          <span class="truncate flex-1">{{ titleCase(t.type) }}</span>
          <span class="text-[10px] tabular-nums opacity-60">{{ t.count }}</span>
        </button>
      </nav>
    </div>

    <!-- ═══ Content area ═══ -->
    <div class="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
      <div class="w-full flex-1 flex flex-col min-h-0">
        <!-- Teleport search to header -->
        <Teleport v-if="isMounted" to="#header-toolbar">
          <div class="flex items-center gap-2 w-full justify-end">
            <div class="relative max-w-[220px]">
              <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input v-model="search" placeholder="Search notifications..." class="pl-8 h-8 text-sm" />
            </div>
            <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
              {{ totalCount.toLocaleString() }} total
            </p>
          </div>
        </Teleport>

        <!-- Data Table -->
        <div class="flex-1 min-h-0 overflow-auto">
          <Table>
            <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
              <TableRow class="border-b-0">
                <TableHead class="w-[40px] bg-card" />
                <TableHead class="min-w-[300px] bg-card cursor-pointer select-none whitespace-nowrap" @click="toggleSort('when')">
                  <div class="flex items-center gap-1">When <Icon :name="sortIcon('when')" class="size-3 opacity-60" /></div>
                </TableHead>
                <TableHead class="min-w-[200px] bg-card cursor-pointer select-none whitespace-nowrap" @click="toggleSort('project')">
                  <div class="flex items-center gap-1">Project <Icon :name="sortIcon('project')" class="size-3 opacity-60" /></div>
                </TableHead>
                <TableHead class="min-w-[80px] bg-card cursor-pointer select-none whitespace-nowrap" @click="toggleSort('priority')">
                  <div class="flex items-center gap-1">Priority <Icon :name="sortIcon('priority')" class="size-3 opacity-60" /></div>
                </TableHead>
                <TableHead class="min-w-[120px] bg-card cursor-pointer select-none whitespace-nowrap text-right" @click="toggleSort('timestamp')">
                  <div class="flex items-center gap-1 justify-end">Time <Icon :name="sortIcon('timestamp')" class="size-3 opacity-60" /></div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="(n, idx) in visibleNotifications"
                :key="n['Row ID'] || idx"
                class="group hover:bg-muted/50"
              >
                <!-- Color dot -->
                <TableCell class="px-3 py-2">
                  <div class="size-2.5 rounded-full shrink-0" :class="dotColor(n.Color)" />
                </TableCell>

                <!-- When -->
                <TableCell class="py-2">
                  <span class="text-sm whitespace-pre-line line-clamp-2 max-w-[400px] block">
                    {{ n.When || n.Header || '—' }}
                  </span>
                </TableCell>

                <!-- Project -->
                <TableCell class="py-2">
                  <NuxtLink
                    v-if="n['Project #']"
                    :to="`/projects/${n['Project #']}`"
                    class="text-sm text-primary hover:underline flex items-center gap-1.5 max-w-[200px]"
                    @click.stop
                  >
                    <Icon name="i-lucide-folder-kanban" class="size-3.5 shrink-0" />
                    <span class="truncate">{{ n['Project Address'] || n['Project #'] }}</span>
                  </NuxtLink>
                  <span v-else class="text-sm text-muted-foreground/40">—</span>
                </TableCell>

                <!-- Priority -->
                <TableCell class="py-2">
                  <Badge v-if="n.Priority" variant="outline" class="text-[10px] bg-red-500/10 text-red-500 border-red-500/20">
                    {{ n.Priority }}
                  </Badge>
                  <span v-else class="text-sm text-muted-foreground/40">—</span>
                </TableCell>

                <!-- Timestamp -->
                <TableCell class="py-2 text-right">
                  <span class="text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                    {{ relativeTime(n['USA TimeStamp'] || n.TimeStamp) }}
                  </span>
                </TableCell>
              </TableRow>

              <!-- Empty state -->
              <TableRow v-if="!loading && visibleNotifications.length === 0">
                <TableCell :colspan="5" class="h-32 text-center">
                  <div class="flex flex-col items-center gap-2 text-muted-foreground">
                    <Icon name="i-lucide-bell-off" class="size-8" />
                    <p>No notifications found</p>
                  </div>
                </TableCell>
              </TableRow>

              <!-- Load more / loading sentinel -->
              <tr v-if="hasMoreVisible || !allLoaded" ref="sentinelRef">
                <td :colspan="5" class="h-10 text-center text-xs text-muted-foreground">
                  <div class="flex items-center justify-center gap-2">
                    <Icon v-if="loading" name="i-lucide-loader-2" class="size-3.5 animate-spin" />
                    {{ loading ? 'Loading...' : 'Scroll for more' }}
                  </div>
                </td>
              </tr>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep([data-slot="table-container"]) {
  overflow: visible !important;
}
</style>
