<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Furniture', icon: 'i-lucide-armchair', description: 'Asset furniture inventory' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// State
const search = ref('')
const syncing = ref(false)
const loading = ref(true)
const page = ref(1)
const limit = ref(100)
const rows = ref<any[]>([])
const total = ref(0)
const totalPages = ref(0)

// Fetch data
async function fetchData() {
  loading.value = true
  try {
    const params: Record<string, string | number> = { page: page.value, limit: limit.value }
    if (search.value.trim()) params.search = search.value.trim()

    const data = await $fetch<{
      success: boolean, rows: any[], total: number, totalPages: number
    }>('/api/bigquery/furniture', { params })

    if (data.success) {
      rows.value = data.rows
      total.value = data.total
      totalPages.value = data.totalPages
    }
  }
  catch (e: any) {
    if (!e.message?.includes('Not found')) toast.error('Failed to load data')
  }
  finally { loading.value = false }
}
fetchData()

watch(page, () => fetchData())
let searchDebounce: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => { page.value = 1; fetchData() }, 400)
})

// Sync (one partition at a time) — uses global progress bar in header
const { runFurnitureSync, syncState } = useSyncProgress()

async function syncData() {
  syncing.value = true
  try {
    await runFurnitureSync({ images: false })
    toast.success(`Sync complete: ${syncState.rowsFetched.toLocaleString()} rows`)
    await fetchData()
  }
  catch (e: any) {
    toast.error(e.data?.statusMessage || 'Sync failed')
  }
  finally {
    syncing.value = false
  }
}

// Columns
const IMAGE_COLS = ['A69', 'A71', 'A72']
const columns = [
  { key: 'A69', label: 'Photo 1', width: '60px', isImage: true },
  { key: 'ID', label: 'ID', width: '90px' },
  { key: 'A70', label: 'Asset Code', width: '120px' },
  { key: 'A7', label: 'Level 1', width: '120px' },
  { key: 'A8', label: 'Level 2', width: '100px' },
  { key: 'A9', label: 'Level 3', width: '100px' },
  { key: 'A66', label: 'A66', width: '100px' },
  { key: 'A67', label: 'A67', width: '100px' },
  { key: 'A222', label: 'Description', width: '180px' },
  { key: 'A68', label: 'Condition', width: '120px' },
  { key: 'A71', label: 'Photo 2', width: '60px', isImage: true },
  { key: 'A72', label: 'Photo 3', width: '60px', isImage: true },
  { key: 'A75', label: 'A75', width: '100px' },
  { key: 'A76', label: 'A76', width: '100px' },
  { key: 'A77', label: 'A77', width: '100px' },
  { key: 'A78', label: 'A78', width: '100px' },
  { key: 'A2', label: 'A2', width: '100px' },
  { key: 'A79', label: 'A79', width: '100px' },
  { key: 'A213', label: 'A213', width: '100px' },
]

// Sorting
const sortBy = ref('A70')
const sortDir = ref<'asc' | 'desc'>('asc')
function toggleSort(col: string) {
  if (IMAGE_COLS.includes(col)) return
  if (sortBy.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortBy.value = col; sortDir.value = 'asc' }
}
function sortIcon(col: string) {
  if (IMAGE_COLS.includes(col)) return ''
  if (sortBy.value !== col) return 'i-lucide-chevrons-up-down'
  return sortDir.value === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
}
const sortedRows = computed(() => {
  const arr = [...rows.value]
  const col = sortBy.value
  return arr.sort((a, b) => {
    const cmp = String(a[col] ?? '').toLowerCase().localeCompare(String(b[col] ?? '').toLowerCase())
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

function imageUrl(row: any, col: string): string {
  const gcsPath = row[col + '_url']
  if (gcsPath && typeof gcsPath === 'string' && gcsPath.trim()) {
    return gcsPath.startsWith('http') ? gcsPath : `/api/gcs/${gcsPath}`
  }
  const rawPath = row[col]
  if (rawPath && typeof rawPath === 'string' && rawPath.includes('/')) {
    return `/api/gcs/${rawPath}`
  }
  return ''
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ total.toLocaleString() }} record{{ total !== 1 ? 's' : '' }}
        </p>
        <Button variant="ghost" size="sm" class="h-8" :disabled="syncing" @click="syncData()">
          <Icon name="i-lucide-refresh-cw" class="size-3.5" :class="syncing ? 'animate-spin' : ''" />
          <span v-if="syncing" class="ml-1 text-xs">Syncing...</span>
        </Button>
      </div>
    </Teleport>

    <!-- Search bar -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-3">
      <div class="relative max-w-[220px]">
        <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input v-model="search" placeholder="Search code, desc..." class="pl-8 h-8 text-sm" />
      </div>
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
              v-for="col in columns" :key="col.key"
              class="bg-card whitespace-nowrap"
              :class="!col.isImage ? 'cursor-pointer select-none' : ''"
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
          <TableRow v-for="(row, idx) in sortedRows" :key="row.ID || idx" class="group">
            <TableCell v-for="col in columns" :key="col.key">
              <template v-if="col.isImage">
                <div class="size-8 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  <img v-if="imageUrl(row, col.key)" :src="imageUrl(row, col.key)" :alt="row.A70" class="size-8 object-cover" loading="lazy">
                  <Icon v-else name="i-lucide-image-off" class="size-3.5 text-muted-foreground/40" />
                </div>
              </template>
              <template v-else-if="col.key === 'A70'">
                <span class="font-medium font-mono text-xs">{{ row.A70 || '—' }}</span>
              </template>
              <template v-else-if="col.key === 'A222'">
                <span dir="rtl" class="text-sm">{{ row.A222 || '—' }}</span>
              </template>
              <template v-else>
                <span class="text-sm whitespace-nowrap">{{ row[col.key] || '—' }}</span>
              </template>
            </TableCell>
          </TableRow>
          <TableRow v-if="sortedRows.length === 0 && !loading">
            <TableCell :colspan="columns.length" class="h-32 text-center">
              <div class="flex flex-col items-center gap-2 text-muted-foreground">
                <Icon name="i-lucide-inbox" class="size-8" />
                <p>{{ total === 0 ? 'No furniture data. Click sync to import.' : 'No matching records' }}</p>
                <Button v-if="total === 0" variant="outline" size="sm" @click="syncData()">
                  <Icon name="i-lucide-refresh-cw" class="size-3.5 mr-1" /> Sync Now
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
        <Button variant="outline" size="sm" class="h-7 px-2 text-xs" :disabled="page <= 1" @click="page--">
          <Icon name="i-lucide-chevron-left" class="size-3.5" /> Prev
        </Button>
        <template v-for="p in Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const start = Math.max(1, Math.min(page - 2, totalPages - 4))
          return start + i
        })" :key="p">
          <Button :variant="p === page ? 'default' : 'outline'" size="sm" class="h-7 w-7 p-0 text-xs" @click="page = p">{{ p }}</Button>
        </template>
        <Button variant="outline" size="sm" class="h-7 px-2 text-xs" :disabled="page >= totalPages" @click="page++">
          Next <Icon name="i-lucide-chevron-right" class="size-3.5" />
        </Button>
      </div>
    </div>
  </div>
</template>
