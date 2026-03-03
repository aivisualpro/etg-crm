<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Furniture', icon: 'i-lucide-armchair', description: 'Asset furniture inventory' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ─── State ──────────────────────────────────────────────────
const activeTab = ref('all')
const search = ref('')
const syncing = ref(false)
const loading = ref(true)
const page = ref(1)
const limit = ref(100)

const rows = ref<any[]>([])
const total = ref(0)
const totalPages = ref(0)
const partitionCounts = ref<Record<string, number>>({})
const level1Map = ref<Record<string, string>>({})

// ─── Fetch level1 entities for tab labels ───────────────────
async function fetchLevel1() {
  try {
    const data = await $fetch<{ success: boolean, level1: any[] }>('/api/bigquery/levels')
    if (data.success && data.level1) {
      for (const r of data.level1) {
        if (r.A7) level1Map.value[r.A7] = r.eng || r.arabic || r.A7
      }
    }
  }
  catch { /* ignore */ }
}
fetchLevel1()

// ─── Fetch furniture data ───────────────────────────────────
async function fetchData() {
  loading.value = true
  try {
    const params: Record<string, string | number> = {
      page: page.value,
      limit: limit.value,
    }
    if (activeTab.value !== 'all') params.a7 = activeTab.value
    if (search.value.trim()) params.search = search.value.trim()

    const data = await $fetch<{
      success: boolean
      rows: any[]
      total: number
      totalPages: number
      partitionCounts: Record<string, number>
    }>('/api/bigquery/furniture', { params })

    if (data.success) {
      rows.value = data.rows
      total.value = data.total
      totalPages.value = data.totalPages
      if (data.partitionCounts && Object.keys(data.partitionCounts).length > 0) {
        partitionCounts.value = data.partitionCounts
      }
    }
  }
  catch (e: any) {
    if (!e.message?.includes('Not found')) {
      toast.error('Failed to load furniture data')
    }
  }
  finally {
    loading.value = false
  }
}
fetchData()

// Re-fetch on tab/page/search change
let searchDebounce: ReturnType<typeof setTimeout>
watch([activeTab], () => { page.value = 1; fetchData() })
watch(page, () => fetchData())
watch(search, () => {
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => { page.value = 1; fetchData() }, 400)
})

// ─── Sync ───────────────────────────────────────────────────
const syncMode = ref<'full' | 'incremental'>('full')

async function syncData() {
  syncing.value = true
  try {
    const data = await $fetch<{ success: boolean, message: string, details: any }>(
      `/api/bigquery/sync-furniture?mode=${syncMode.value}&images=false`,
      { method: 'POST' },
    )
    toast.success(data.message || 'Synced successfully')
    await fetchData()
  }
  catch (e: any) {
    toast.error(e.data?.statusMessage || 'Sync failed')
  }
  finally {
    syncing.value = false
  }
}

// ─── Tabs ───────────────────────────────────────────────────
const tabs = computed(() => {
  const totalAll = Object.values(partitionCounts.value).reduce((a, b) => a + b, 0)
  const result = [
    { key: 'all', label: 'All', count: totalAll || total.value, icon: 'i-lucide-layers' },
  ]

  // Sort partitions by count descending
  const sorted = Object.entries(partitionCounts.value)
    .sort((a, b) => b[1] - a[1])

  for (const [a7, count] of sorted) {
    result.push({
      key: a7,
      label: level1Map.value[a7] || a7,
      count,
      icon: 'i-lucide-building-2',
    })
  }

  return result
})

// ─── Column definitions ─────────────────────────────────────
const columns = [
  { key: 'A69_url', label: 'Photo', width: '60px' },
  { key: 'A70', label: 'Asset Code', width: '140px' },
  { key: 'A222', label: 'Description', width: '200px' },
  { key: 'A68', label: 'Condition', width: '120px' },
  { key: 'A7_label', label: 'Level 1', width: '140px' },
  { key: 'A75', label: 'Status', width: '100px' },
  { key: 'A76', label: 'Location', width: '140px' },
  { key: 'A71_url', label: 'Photo 2', width: '60px' },
  { key: 'A72_url', label: 'Photo 3', width: '60px' },
]

// ─── Sorting ────────────────────────────────────────────────
const sortBy = ref('A70')
const sortDir = ref<'asc' | 'desc'>('asc')

function toggleSort(col: string) {
  if (['A69_url', 'A71_url', 'A72_url'].includes(col)) return
  if (sortBy.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortBy.value = col; sortDir.value = 'asc' }
}

function sortIcon(col: string) {
  if (['A69_url', 'A71_url', 'A72_url'].includes(col)) return ''
  if (sortBy.value !== col) return 'i-lucide-chevrons-up-down'
  return sortDir.value === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
}

// ─── Local sort (client-side for current page) ──────────────
const sortedRows = computed(() => {
  const arr = [...rows.value]
  const col = sortBy.value
  return arr.sort((a, b) => {
    const av = String(a[col] ?? '').toLowerCase()
    const bv = String(b[col] ?? '').toLowerCase()
    const cmp = av.localeCompare(bv)
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

// ─── Helpers ────────────────────────────────────────────────
function imageUrl(row: any, col: string): string {
  const path = row[col]
  if (path && typeof path === 'string') {
    if (path.startsWith('http')) return path
    return `/api/gcs/${path}`
  }
  return ''
}

function entityLabel(a7: string): string {
  return level1Map.value[a7] || a7
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[220px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input v-model="search" placeholder="Search code, desc..." class="pl-8 h-8 text-sm" />
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ total.toLocaleString() }} record{{ total !== 1 ? 's' : '' }}
        </p>
        <Button variant="ghost" size="sm" class="h-8" :disabled="syncing" @click="syncData()">
          <Icon
            name="i-lucide-refresh-cw"
            class="size-3.5"
            :class="syncing ? 'animate-spin' : ''"
          />
          <span v-if="syncing" class="ml-1 text-xs">Syncing...</span>
        </Button>
      </div>
    </Teleport>

    <!-- Tabs (Level1 entities) -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5"
        :class="activeTab === tab.key
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="activeTab = tab.key"
      >
        <Icon :name="tab.icon" class="size-3.5" />
        {{ tab.label }}
        <span
          class="ml-0.5 text-[10px] tabular-nums"
          :class="activeTab === tab.key ? 'opacity-80' : 'opacity-50'"
        >
          {{ tab.count.toLocaleString() }}
        </span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-3 text-muted-foreground">
        <Icon name="i-lucide-loader-2" class="size-8 animate-spin" />
        <p class="text-sm">Loading furniture data...</p>
      </div>
    </div>

    <!-- Data Table -->
    <div v-else class="flex-1 min-h-0 overflow-auto">
      <Table>
        <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
          <TableRow class="border-b-0">
            <TableHead
              v-for="col in columns"
              :key="col.key"
              class="bg-card whitespace-nowrap"
              :class="!['A69_url', 'A71_url', 'A72_url'].includes(col.key) ? 'cursor-pointer select-none' : ''"
              :style="{ minWidth: col.width }"
              @click="toggleSort(col.key)"
            >
              <div class="flex items-center gap-1">
                {{ col.label }}
                <Icon v-if="sortIcon(col.key)" :name="sortIcon(col.key)" class="size-3 opacity-60" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-for="(row, idx) in sortedRows"
            :key="row.ID || idx"
            class="group"
          >
            <TableCell v-for="col in columns" :key="col.key">
              <!-- Image columns -->
              <template v-if="['A69_url', 'A71_url', 'A72_url'].includes(col.key)">
                <div class="size-8 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    v-if="imageUrl(row, col.key)"
                    :src="imageUrl(row, col.key)"
                    :alt="row.A70"
                    class="size-8 object-cover"
                    loading="lazy"
                  >
                  <Icon v-else name="i-lucide-image-off" class="size-3.5 text-muted-foreground/40" />
                </div>
              </template>

              <!-- Asset Code -->
              <template v-else-if="col.key === 'A70'">
                <span class="font-medium font-mono text-xs">{{ row.A70 || '—' }}</span>
              </template>

              <!-- Level 1 label -->
              <template v-else-if="col.key === 'A7_label'">
                <Badge variant="outline" class="bg-primary/10 text-primary border-primary/20 text-[10px]">
                  {{ entityLabel(row.A7) }}
                </Badge>
              </template>

              <!-- Status -->
              <template v-else-if="col.key === 'A75'">
                <Badge
                  v-if="row.A75"
                  variant="outline"
                  :class="row.A75 === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                    row.A75 === 'Inactive' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                      'bg-amber-500/10 text-amber-600 border-amber-500/20'"
                  class="text-[10px]"
                >
                  {{ row.A75 }}
                </Badge>
                <span v-else class="text-muted-foreground/40">—</span>
              </template>

              <!-- Description (Arabic) -->
              <template v-else-if="col.key === 'A222'">
                <span dir="rtl" class="text-sm">{{ row.A222 || '—' }}</span>
              </template>

              <!-- Default -->
              <template v-else>
                <span class="text-sm">{{ row[col.key] || '—' }}</span>
              </template>
            </TableCell>
          </TableRow>

          <!-- Empty State -->
          <TableRow v-if="sortedRows.length === 0 && !loading">
            <TableCell :colspan="columns.length" class="h-32 text-center">
              <div class="flex flex-col items-center gap-2 text-muted-foreground">
                <Icon name="i-lucide-inbox" class="size-8" />
                <p>{{ total === 0 ? 'No furniture data. Click sync to import from AppSheet.' : 'No matching records' }}</p>
                <Button v-if="total === 0" variant="outline" size="sm" @click="syncData()">
                  <Icon name="i-lucide-refresh-cw" class="size-3.5 mr-1" />
                  Sync Now
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="shrink-0 border-t px-4 py-2 flex items-center justify-between gap-4">
      <p class="text-xs text-muted-foreground tabular-nums">
        Page {{ page }} of {{ totalPages }} · {{ total.toLocaleString() }} total
      </p>
      <div class="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          class="h-7 px-2 text-xs"
          :disabled="page <= 1"
          @click="page--"
        >
          <Icon name="i-lucide-chevron-left" class="size-3.5" />
          Prev
        </Button>

        <!-- Page numbers -->
        <template v-for="p in Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const start = Math.max(1, Math.min(page - 2, totalPages - 4))
          return start + i
        })" :key="p">
          <Button
            :variant="p === page ? 'default' : 'outline'"
            size="sm"
            class="h-7 w-7 p-0 text-xs"
            @click="page = p"
          >
            {{ p }}
          </Button>
        </template>

        <Button
          variant="outline"
          size="sm"
          class="h-7 px-2 text-xs"
          :disabled="page >= totalPages"
          @click="page++"
        >
          Next
          <Icon name="i-lucide-chevron-right" class="size-3.5" />
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep([data-slot="table-container"]) {
  overflow: visible !important;
}
</style>
