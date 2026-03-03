<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Asset Categories', icon: 'i-lucide-tags', description: 'Manage asset categories and subcategories' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ─── State ──────────────────────────────────────────────────
const activeTab = ref('categories')
const search = ref('')
const syncing = ref(false)
const loading = ref(true)

const categories = ref<any[]>([])
const subCategories = ref<any[]>([])

// ─── Fetch data ─────────────────────────────────────────────
async function fetchData() {
  loading.value = true
  try {
    const data = await $fetch<{
      success: boolean
      categories: any[]
      subCategories: any[]
    }>('/api/bigquery/asset-categories')
    if (data.success) {
      categories.value = data.categories
      subCategories.value = data.subCategories
    }
  }
  catch (e: any) {
    toast.error('Failed to load asset categories')
  }
  finally {
    loading.value = false
  }
}
fetchData()

// ─── Sync from AppSheet ─────────────────────────────────────
async function syncData() {
  syncing.value = true
  try {
    const data = await $fetch<{ success: boolean, message: string }>('/api/bigquery/sync-levels', { method: 'POST' })
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
const tabs = computed(() => [
  { key: 'categories', label: 'Categories', count: categories.value.length, icon: 'i-lucide-tag' },
  { key: 'subCategories', label: 'Sub Categories', count: subCategories.value.length, icon: 'i-lucide-tags' },
])

// ─── Column definitions per tab ─────────────────────────────
const categoryColumns = [
  { key: 'eng', label: 'Name (English)', width: '200px' },
  { key: 'arabic', label: 'Name (Arabic)', width: '200px' },
  { key: 'Related_SubCategories', label: 'Related Sub Categories', width: '300px' },
]

const subCategoryColumns = [
  { key: 'image_url', label: 'Image', width: '60px' },
  { key: 'eng', label: 'Name (English)', width: '200px' },
  { key: 'arabic', label: 'Name (Arabic)', width: '200px' },
  { key: 'A51_label', label: 'Category', width: '160px' },
  { key: 'Level_1', label: 'Level 1', width: '200px' },
]

const currentColumns = computed(() => {
  if (activeTab.value === 'categories') return categoryColumns
  return subCategoryColumns
})

const currentData = computed(() => {
  if (activeTab.value === 'categories') return categories.value
  return subCategories.value
})

// ─── Sorting ────────────────────────────────────────────────
const sortBy = ref('eng')
const sortDir = ref<'asc' | 'desc'>('asc')

function toggleSort(col: string) {
  if (col === 'image_url') return
  if (sortBy.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortBy.value = col; sortDir.value = 'asc' }
}

function sortIcon(col: string) {
  if (col === 'image_url') return ''
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
function imageUrl(row: any): string {
  if (row.image_url && typeof row.image_url === 'string') {
    if (row.image_url.startsWith('http')) return row.image_url
    return `/api/gcs/${row.image_url}`
  }
  return ''
}

function cellValue(row: any, key: string): string {
  const val = row[key]
  if (val === null || val === undefined || val === '') return '—'
  return String(val)
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[220px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input v-model="search" placeholder="Search..." class="pl-8 h-8 text-sm" />
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ filteredRows.length }} record{{ filteredRows.length !== 1 ? 's' : '' }}
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
        <p class="text-sm">Loading asset categories...</p>
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
              class="bg-card whitespace-nowrap"
              :class="col.key !== 'image_url' ? 'cursor-pointer select-none' : ''"
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
            v-for="(row, idx) in visibleRows"
            :key="row.A51 || row.A66 || idx"
            class="group"
          >
            <TableCell v-for="col in currentColumns" :key="col.key">
              <!-- Image thumbnail -->
              <template v-if="col.key === 'image_url'">
                <div class="size-8 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    v-if="imageUrl(row)"
                    :src="imageUrl(row)"
                    :alt="row.eng"
                    class="size-8 object-cover"
                    loading="lazy"
                  >
                  <Icon v-else name="i-lucide-image-off" class="size-3.5 text-muted-foreground/40" />
                </div>
              </template>

              <!-- Name (English) with icon -->
              <template v-else-if="col.key === 'eng'">
                <div class="flex items-center gap-2">
                  <div class="size-7 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center shrink-0">
                    <Icon
                      :name="activeTab === 'categories' ? 'i-lucide-tag' : 'i-lucide-tags'"
                      class="size-3.5 text-amber-600 dark:text-amber-400"
                    />
                  </div>
                  <span class="font-medium">{{ row.eng || '—' }}</span>
                </div>
              </template>

              <!-- Arabic name (RTL) -->
              <template v-else-if="col.key === 'arabic'">
                <span dir="rtl" class="text-sm text-muted-foreground">{{ row.arabic || '—' }}</span>
              </template>

              <!-- Category badge -->
              <template v-else-if="col.key === 'A51_label'">
                <Badge v-if="row.A51_label" variant="outline" class="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">
                  {{ row.A51_label }}
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
                <p>No asset categories found</p>
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
