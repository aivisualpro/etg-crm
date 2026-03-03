<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Entities', icon: 'i-lucide-building-2', description: 'Manage organizational levels' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ─── State ──────────────────────────────────────────────────
const activeTab = ref('level1')
const search = ref('')
const syncing = ref(false)
const loading = ref(true)

const level1 = ref<any[]>([])
const level2 = ref<any[]>([])
const level3 = ref<any[]>([])

// ─── Fetch data ─────────────────────────────────────────────
async function fetchLevels() {
  loading.value = true
  try {
    const data = await $fetch<{
      success: boolean
      level1: any[]
      level2: any[]
      level3: any[]
    }>('/api/bigquery/levels')
    if (data.success) {
      level1.value = data.level1
      level2.value = data.level2
      level3.value = data.level3
    }
  }
  catch (e: any) {
    toast.error('Failed to load entities')
  }
  finally {
    loading.value = false
  }
}
fetchLevels()

// ─── Sync from AppSheet ─────────────────────────────────────
async function syncLevels() {
  syncing.value = true
  try {
    const data = await $fetch<{ success: boolean, message: string }>('/api/bigquery/sync-levels', { method: 'POST' })
    toast.success(data.message || 'Synced successfully')
    await fetchLevels()
  }
  catch (e: any) {
    toast.error(e.data?.statusMessage || 'Sync failed')
  }
  finally {
    syncing.value = false
  }
}

// ─── Tabs ───────────────────────────────────────────────────
const tabs = computed(() => [
  { key: 'level1', label: 'Level 1', count: level1.value.length, icon: 'i-lucide-map-pin' },
  { key: 'level2', label: 'Level 2', count: level2.value.length, icon: 'i-lucide-building' },
  { key: 'level3', label: 'Level 3', count: level3.value.length, icon: 'i-lucide-map' },
])

// ─── Column definitions per tab ─────────────────────────────
const level1Columns = [
  { key: 'eng', label: 'Name (English)', width: '200px' },
  { key: 'arabic', label: 'Name (Arabic)', width: '200px' },
  { key: 'A276', label: 'Verified', width: '100px' },
  { key: 'A15', label: 'Activity Report', width: '120px' },
  { key: 'Related_level2s', label: 'Related Level 2', width: '200px' },
]

const level2Columns = [
  { key: 'eng', label: 'Name (English)', width: '200px' },
  { key: 'arabic', label: 'Name (Arabic)', width: '200px' },
  { key: 'A7', label: 'Level 1', width: '160px' },
  { key: 'Manager_Name', label: 'Manager', width: '160px' },
  { key: 'A276', label: 'Verified', width: '100px' },
  { key: 'Related_Level3s', label: 'Related Level 3', width: '200px' },
]

const level3Columns = [
  { key: 'eng', label: 'Name (English)', width: '200px' },
  { key: 'arabic', label: 'Name (Arabic)', width: '200px' },
  { key: 'A7', label: 'Level 1', width: '160px' },
  { key: 'A8', label: 'Level 2', width: '160px' },
  { key: 'A276', label: 'Verified', width: '100px' },
  { key: 'Counts', label: 'Asset Counts', width: '220px' },
]

const currentColumns = computed(() => {
  if (activeTab.value === 'level1') return level1Columns
  if (activeTab.value === 'level2') return level2Columns
  return level3Columns
})

const currentData = computed(() => {
  if (activeTab.value === 'level1') return level1.value
  if (activeTab.value === 'level2') return level2.value
  return level3.value
})

// ─── Sorting ────────────────────────────────────────────────
const sortBy = ref('eng')
const sortDir = ref<'asc' | 'desc'>('asc')

function toggleSort(col: string) {
  if (sortBy.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortBy.value = col; sortDir.value = 'asc' }
}

function sortIcon(col: string) {
  if (sortBy.value !== col) return 'i-lucide-chevrons-up-down'
  return sortDir.value === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
}

// ─── Filtered & sorted ─────────────────────────────────────
const CHUNK_SIZE = 50
const visibleCount = ref(CHUNK_SIZE)

watch([activeTab, search], () => { visibleCount.value = CHUNK_SIZE })

const filteredRows = computed(() => {
  let rows = currentData.value
  if (search.value) {
    const q = search.value.toLowerCase()
    rows = rows.filter((r: any) =>
      Object.values(r).some(v => v && String(v).toLowerCase().includes(q)),
    )
  }
  return rows
})

const sortedRows = computed(() => {
  const arr = [...filteredRows.value]
  const col = sortBy.value
  return arr.sort((a, b) => {
    const av = String(a[col] ?? '').toLowerCase()
    const bv = String(b[col] ?? '').toLowerCase()
    const cmp = av.localeCompare(bv)
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

const visibleRows = computed(() => sortedRows.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < sortedRows.value.length)

// Infinite scroll
const sentinelRef = ref<HTMLElement | null>(null)
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && hasMore.value) {
        visibleCount.value += CHUNK_SIZE
      }
    },
    { threshold: 0.1 },
  )
  watch(sentinelRef, (el) => {
    if (el) observer.observe(el)
  }, { immediate: true })
  onUnmounted(() => observer.disconnect())
})

// ─── Helpers ────────────────────────────────────────────────
function cellValue(row: any, key: string): string {
  const val = row[key]
  if (val === null || val === undefined || val === '') return '—'
  return String(val)
}

function verifiedColor(val?: string) {
  const s = (val || '').toLowerCase()
  if (s === 'true' || s === 'verified' || s === 'yes') return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
  if (s === 'false' || s === 'no') return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
  return 'bg-muted text-muted-foreground'
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[220px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input v-model="search" placeholder="Search entities..." class="pl-8 h-8 text-sm" />
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ filteredRows.length }} record{{ filteredRows.length !== 1 ? 's' : '' }}
        </p>
        <Button variant="ghost" size="sm" class="h-8" :disabled="syncing" @click="syncLevels()">
          <Icon
            name="i-lucide-refresh-cw"
            class="size-3.5"
            :class="syncing ? 'animate-spin' : ''"
          />
          <span v-if="syncing" class="ml-1 text-xs">Syncing...</span>
        </Button>
      </div>
    </Teleport>

    <!-- Tabs -->
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
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-3 text-muted-foreground">
        <Icon name="i-lucide-loader-2" class="size-8 animate-spin" />
        <p class="text-sm">Loading entities...</p>
      </div>
    </div>

    <!-- Data Table -->
    <div v-else class="flex-1 min-h-0 overflow-auto">
      <Table>
        <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
          <TableRow class="border-b-0">
            <TableHead
              v-for="col in currentColumns"
              :key="col.key"
              class="bg-card cursor-pointer select-none whitespace-nowrap"
              :style="{ minWidth: col.width }"
              @click="toggleSort(col.key)"
            >
              <div class="flex items-center gap-1">
                {{ col.label }}
                <Icon :name="sortIcon(col.key)" class="size-3 opacity-60" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
            v-for="(row, idx) in visibleRows"
            :key="row.A7 || row.A8 || row.A9 || idx"
            class="group"
          >
            <TableCell v-for="col in currentColumns" :key="col.key">
              <!-- Name (English) with icon -->
              <template v-if="col.key === 'eng'">
                <div class="flex items-center gap-2">
                  <div class="size-7 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center shrink-0">
                    <Icon
                      :name="activeTab === 'level1' ? 'i-lucide-map-pin' : activeTab === 'level2' ? 'i-lucide-building' : 'i-lucide-map'"
                      class="size-3.5 text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <span class="font-medium">{{ row.eng || '—' }}</span>
                </div>
              </template>

              <!-- Arabic name (RTL) -->
              <template v-else-if="col.key === 'arabic'">
                <span dir="rtl" class="text-sm text-muted-foreground">{{ row.arabic || '—' }}</span>
              </template>

              <!-- Verified badge -->
              <template v-else-if="col.key === 'A276'">
                <Badge v-if="row.A276" variant="outline" :class="verifiedColor(row.A276)" class="text-[10px]">
                  {{ row.A276 === 'true' || row.A276 === 'Verified' ? 'Verified' : row.A276 }}
                </Badge>
                <span v-else class="text-muted-foreground/40">—</span>
              </template>

              <!-- Level 1 reference (show resolved label if available) -->
              <template v-else-if="col.key === 'A7' && activeTab !== 'level1'">
                <Badge v-if="row.A7_label || row.A7" variant="outline" class="bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]">
                  {{ row.A7_label || row.A7 }}
                </Badge>
                <span v-else class="text-muted-foreground/40">—</span>
              </template>

              <!-- Level 2 reference -->
              <template v-else-if="col.key === 'A8' && activeTab === 'level3'">
                <Badge v-if="row.A8_label || row.A8" variant="outline" class="bg-violet-500/10 text-violet-600 border-violet-500/20 text-[10px]">
                  {{ row.A8_label || row.A8 }}
                </Badge>
                <span v-else class="text-muted-foreground/40">—</span>
              </template>

              <!-- Default text -->
              <template v-else>
                <span class="text-sm whitespace-nowrap">{{ cellValue(row, col.key) }}</span>
              </template>
            </TableCell>
          </TableRow>

          <!-- Empty State -->
          <TableRow v-if="visibleRows.length === 0 && !loading">
            <TableCell :colspan="currentColumns.length" class="h-32 text-center">
              <div class="flex flex-col items-center gap-2 text-muted-foreground">
                <Icon name="i-lucide-inbox" class="size-8" />
                <p>No entities found</p>
              </div>
            </TableCell>
          </TableRow>

          <!-- Infinite scroll sentinel -->
          <tr v-if="hasMore" ref="sentinelRef">
            <td :colspan="currentColumns.length" class="h-10 text-center text-xs text-muted-foreground">
              Loading more…
            </td>
          </tr>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped>
:deep([data-slot="table-container"]) {
  overflow: visible !important;
}
</style>
