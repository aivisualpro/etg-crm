<script setup lang="ts">
import { toast } from 'vue-sonner'

/**
 * Filtered Furniture view — catches:
 *   /admin/furniture/:a7
 *   /admin/furniture/:a7/:a8
 *   /admin/furniture/:a7/:a8/:a9
 */
const route = useRoute()
const slugParts = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s : (s ? [s] : [])
})

const filterA7 = computed(() => slugParts.value[0] || '')
const filterA8 = computed(() => slugParts.value[1] || '')
const filterA9 = computed(() => slugParts.value[2] || '')

const pageTitle = computed(() => {
  if (filterA9.value) return `${filterA7.value} / ${filterA8.value} / ${filterA9.value}`
  if (filterA8.value) return `${filterA7.value} / ${filterA8.value}`
  return filterA7.value
})

const { setHeader } = usePageHeader()
setHeader({ title: 'Furniture', icon: 'i-lucide-armchair', description: pageTitle.value })
watch(pageTitle, (t) => setHeader({ title: 'Furniture', icon: 'i-lucide-armchair', description: t }))

// State
const loading = ref(true)
const search = ref('')
const page = ref(1)
const limit = ref(100)
const rows = ref<any[]>([])
const total = ref(0)
const totalPages = ref(0)

// Fetch data with filters
async function fetchData() {
  loading.value = true
  try {
    const params: Record<string, string | number> = { page: page.value, limit: limit.value }
    if (filterA7.value) params.a7 = filterA7.value
    if (filterA8.value) params.a8 = filterA8.value
    if (filterA9.value) params.a9 = filterA9.value
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

// Re-fetch on route/page/search change
watch(() => route.params.slug, () => { page.value = 1; fetchData() })
watch(page, () => fetchData())
let searchDebounce: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => { page.value = 1; fetchData() }, 400)
})

// Column definitions
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

// Image helper
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

// Image lightbox
const lightboxSrc = ref('')
const showLightbox = ref(false)
function openLightbox(src: string) {
  if (src) {
    lightboxSrc.value = src
    showLightbox.value = true
  }
}

// Image loading errors
const failedImages = ref(new Set<string>())
function onImageError(key: string) {
  failedImages.value.add(key)
}
function isImageFailed(key: string): boolean {
  return failedImages.value.has(key)
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-3">
      <div class="relative max-w-[220px]">
        <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input v-model="search" placeholder="Search..." class="pl-8 h-8 text-sm" />
      </div>
      <p class="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
        {{ total.toLocaleString() }} record{{ total !== 1 ? 's' : '' }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-3 text-muted-foreground">
        <Icon name="i-lucide-loader-2" class="size-8 animate-spin" />
        <p class="text-sm">Loading...</p>
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
          <TableRow v-for="(row, idx) in sortedRows" :key="row.ID || idx" class="group hover:bg-muted/30 transition-colors">
            <TableCell v-for="col in columns" :key="col.key">
              <template v-if="col.isImage">
                <div
                  class="size-9 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center ring-1 ring-border/50 cursor-pointer hover:ring-primary/50 transition-all hover:scale-105"
                  @click="openLightbox(imageUrl(row, col.key))"
                >
                  <img
                    v-if="imageUrl(row, col.key) && !isImageFailed(`${row.ID}-${col.key}`)"
                    :src="imageUrl(row, col.key)"
                    :alt="row.A70"
                    class="size-9 object-cover"
                    loading="lazy"
                    @error="onImageError(`${row.ID}-${col.key}`)"
                  >
                  <Icon v-else name="i-lucide-image-off" class="size-3.5 text-muted-foreground/30" />
                </div>
              </template>
              <template v-else-if="col.key === 'A70'">
                <span class="font-medium font-mono text-xs">{{ row.A70 || '—' }}</span>
              </template>
              <template v-else-if="col.key === 'A222'">
                <span dir="rtl" class="text-sm">{{ row.A222 || '—' }}</span>
              </template>
              <template v-else-if="col.key === 'A68'">
                <span
                  v-if="row.A68"
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                  :class="{
                    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400': row.A68 === 'Good' || row.A68 === '3',
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400': row.A68 === 'Fair' || row.A68 === '2',
                    'bg-red-500/10 text-red-600 dark:text-red-400': row.A68 === 'Poor' || row.A68 === '1',
                    'bg-muted text-muted-foreground': !['Good', 'Fair', 'Poor', '1', '2', '3'].includes(row.A68)
                  }"
                >
                  {{ row.A68 }}
                </span>
                <span v-else class="text-sm text-muted-foreground">—</span>
              </template>
              <template v-else>
                <span class="text-sm whitespace-nowrap">{{ row[col.key] || '—' }}</span>
              </template>
            </TableCell>
          </TableRow>
          <TableRow v-if="sortedRows.length === 0 && !loading">
            <TableCell :colspan="columns.length" class="h-40 text-center">
              <div class="flex flex-col items-center gap-3 text-muted-foreground">
                <div class="size-16 rounded-2xl bg-muted/50 flex items-center justify-center">
                  <Icon name="i-lucide-inbox" class="size-8 text-muted-foreground/40" />
                </div>
                <p class="font-medium text-foreground/60">No matching records</p>
                <p class="text-xs">Try adjusting your search terms.</p>
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
    <!-- Lightbox (image preview) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showLightbox && lightboxSrc"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          @click="showLightbox = false"
        >
          <button
            class="absolute top-4 right-4 size-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            @click.stop="showLightbox = false"
          >
            <Icon name="i-lucide-x" class="size-5 text-white" />
          </button>
          <img
            :src="lightboxSrc"
            alt="Preview"
            class="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            @click.stop
          >
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
