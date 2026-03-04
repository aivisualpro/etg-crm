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

// Name resolution
const { lang } = useAppLanguage()
const { level1Map, level2Map, level3Map } = useDashboardStore()

function resolveName(key: string, map?: Record<string, any>): string {
  if (map) {
    const entry = map[key]
    if (entry) {
      return lang.value === 'ar' ? (entry.arabic || entry.eng || key) : (entry.eng || key)
    }
  }
  return key
}

function resolveLevel1(key: string) { return resolveName(key, level1Map.value as any) }
function resolveLevel2(key: string) { return resolveName(key, level2Map.value) }
function resolveLevel3(key: string) { return resolveName(key, level3Map.value) }

const pageTitle = computed(() => {
  const parts: string[] = []
  if (filterA7.value) parts.push(resolveLevel1(filterA7.value))
  if (filterA8.value) parts.push(resolveLevel2(filterA8.value))
  if (filterA9.value) parts.push(resolveLevel3(filterA9.value))
  return parts.join(' / ')
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

// View mode (shared state with index page)
const viewMode = useState<'table' | 'gallery'>('furniture-view-mode', () => 'table')

// Gallery: group by room (A9), only items with images
const galleryRooms = computed(() => {
  const roomMap: Record<string, any[]> = {}
  for (const row of sortedRows.value) {
    const hasImage = (row.A69_url && String(row.A69_url).trim())
      || (row.A71_url && String(row.A71_url).trim())
      || (row.A72_url && String(row.A72_url).trim())
    if (!hasImage) continue
    const room = row.A9 || '__unknown__'
    if (!roomMap[room]) roomMap[room] = []
    roomMap[room]!.push(row)
  }
  return Object.entries(roomMap)
    .map(([key, items]) => ({
      key,
      label: key === '__unknown__' ? 'Unknown Room' : resolveLevel3(key),
      items,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
})
const expandedRooms = ref<Set<string>>(new Set())
function toggleGalleryRoom(key: string) {
  const s = new Set(expandedRooms.value)
  if (s.has(key)) s.delete(key)
  else s.add(key)
  expandedRooms.value = s
}
// Auto-expand first room
watch(galleryRooms, (rooms) => {
  if (rooms.length > 0 && expandedRooms.value.size === 0) {
    expandedRooms.value = new Set([rooms[0]!.key])
  }
}, { immediate: true })

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

// Condition helpers
function conditionChipClass(val?: string): string {
  if (!val) return 'bg-zinc-800/70 text-zinc-300'
  if (['Good', '3', 'Excellent'].includes(val)) return 'bg-emerald-600/90 text-white'
  if (['Fair', '2', 'Average'].includes(val)) return 'bg-amber-500/90 text-white'
  if (['Poor', '1', 'Bad', 'Damaged'].includes(val)) return 'bg-red-600/90 text-white'
  return 'bg-zinc-700/80 text-zinc-200'
}
function conditionIcon(val?: string): string {
  if (!val) return 'i-lucide-help-circle'
  if (['Good', '3', 'Excellent'].includes(val)) return 'i-lucide-check-circle-2'
  if (['Fair', '2', 'Average'].includes(val)) return 'i-lucide-alert-triangle'
  if (['Poor', '1', 'Bad', 'Damaged'].includes(val)) return 'i-lucide-x-circle'
  return 'i-lucide-help-circle'
}
function formatTimestamp(val?: string): string {
  if (!val) return '—'
  try {
    return new Date(val).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch { return val }
}
const { furnitureUsersMap } = useDashboardStore()
function resolveUser(key?: string): string {
  if (!key) return ''
  const u = furnitureUsersMap.value?.[key] as any
  return u?.eng || u?.arabic || key
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-3">
      <!-- Table / Gallery toggle -->
      <div class="flex items-center rounded-lg border bg-muted/30 p-0.5">
        <button
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all"
          :class="viewMode === 'table' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
          @click="viewMode = 'table'"
        >
          <Icon name="i-lucide-table-2" class="size-3.5" /> Table
        </button>
        <button
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all"
          :class="viewMode === 'gallery' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
          @click="viewMode = 'gallery'"
        >
          <Icon name="i-lucide-layout-grid" class="size-3.5" /> Gallery
        </button>
      </div>
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

    <!-- ═══ TABLE VIEW ═══ -->
    <div v-else-if="viewMode === 'table'" class="flex-1 min-h-0 overflow-auto">
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
              <template v-else-if="col.key === 'A7'">
                <span class="text-sm whitespace-nowrap" :dir="lang === 'ar' ? 'rtl' : 'ltr'">{{ resolveLevel1(row.A7) || '—' }}</span>
              </template>
              <template v-else-if="col.key === 'A8'">
                <span class="text-sm whitespace-nowrap" :dir="lang === 'ar' ? 'rtl' : 'ltr'">{{ resolveLevel2(row.A8) || '—' }}</span>
              </template>
              <template v-else-if="col.key === 'A9'">
                <span class="text-sm whitespace-nowrap" :dir="lang === 'ar' ? 'rtl' : 'ltr'">{{ resolveLevel3(row.A9) || '—' }}</span>
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

    <!-- ═══ GALLERY VIEW ═══ -->
    <div v-else-if="viewMode === 'gallery'" class="flex-1 min-h-0 overflow-auto">
      <div class="p-4 space-y-3">
        <!-- Empty state -->
        <div v-if="galleryRooms.length === 0" class="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
          <div class="size-16 rounded-2xl bg-muted/50 flex items-center justify-center">
            <Icon name="i-lucide-image-off" class="size-8 text-muted-foreground/40" />
          </div>
          <p class="font-medium text-foreground/60">No assets with images</p>
          <p class="text-xs">No synced images found for this filter.</p>
        </div>

        <!-- Room groups -->
        <div v-for="room in galleryRooms" :key="room.key" class="rounded-xl border bg-card/50 overflow-hidden">
          <button
            class="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-muted/20"
            :class="expandedRooms.has(room.key) ? 'bg-muted/10 border-b' : ''"
            @click="toggleGalleryRoom(room.key)"
          >
            <div
              class="size-6 rounded-md flex items-center justify-center shrink-0"
              :class="expandedRooms.has(room.key) ? 'bg-violet-500/15 text-violet-500' : 'bg-muted/60 text-muted-foreground'"
            >
              <Icon name="i-lucide-door-open" class="size-3.5" />
            </div>
            <span class="flex-1 text-[13px] font-medium truncate" :dir="lang === 'ar' ? 'rtl' : 'ltr'">{{ room.label }}</span>
            <span
              class="text-[10px] tabular-nums px-1.5 py-0.5 rounded-full"
              :class="expandedRooms.has(room.key) ? 'bg-violet-500/10 text-violet-500' : 'bg-muted text-muted-foreground'"
            >
              {{ room.items.length }}
            </span>
            <Icon
              name="i-lucide-chevron-right"
              class="size-3.5 text-muted-foreground transition-transform duration-200 shrink-0"
              :class="expandedRooms.has(room.key) ? 'rotate-90' : ''"
            />
          </button>

          <!-- Room cards -->
          <div v-if="expandedRooms.has(room.key)" class="px-4 py-4 bg-muted/5">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              <div
                v-for="(item, idx) in room.items"
                :key="item.ID || idx"
                class="group rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:border-primary/20 transition-all duration-300"
              >
                <!-- Asset Image with condition chip -->
                <div class="relative aspect-[4/3] bg-muted/30 overflow-hidden">
                  <img
                    v-if="imageUrl(item, 'A69') && !isImageFailed(`${item.ID}-g-A69`)"
                    :src="imageUrl(item, 'A69')"
                    :alt="item.A70"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    @error="onImageError(`${item.ID}-g-A69`)"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <Icon name="i-lucide-image-off" class="size-8 text-muted-foreground/20" />
                  </div>
                  <!-- Condition chip -->
                  <div class="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-lg backdrop-blur-sm" :class="conditionChipClass(item.A68)">
                    <Icon :name="conditionIcon(item.A68)" class="size-3" />
                    {{ item.A68 || '—' }}
                  </div>
                  <!-- Asset code -->
                  <div v-if="item.A70" class="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-mono backdrop-blur-sm">
                    <Icon name="i-lucide-hash" class="size-2.5" />{{ item.A70 }}
                  </div>
                </div>
                <!-- Tag comparison -->
                <div class="px-3 py-2">
                  <p class="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Tag Comparison</p>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <p class="text-[8px] text-muted-foreground/60 uppercase mb-0.5">Old Tag</p>
                      <div class="aspect-[4/3] rounded-lg overflow-hidden bg-muted/30 ring-1 ring-border/30">
                        <img v-if="imageUrl(item, 'A71') && !isImageFailed(`${item.ID}-g-A71`)" :src="imageUrl(item, 'A71')" class="w-full h-full object-cover" loading="lazy" @error="onImageError(`${item.ID}-g-A71`)" />
                        <div v-else class="w-full h-full flex items-center justify-center"><Icon name="i-lucide-image-off" class="size-4 text-muted-foreground/20" /></div>
                      </div>
                    </div>
                    <div>
                      <p class="text-[8px] text-muted-foreground/60 uppercase mb-0.5">New Tag</p>
                      <div class="aspect-[4/3] rounded-lg overflow-hidden bg-muted/30 ring-1 ring-border/30">
                        <img v-if="imageUrl(item, 'A72') && !isImageFailed(`${item.ID}-g-A72`)" :src="imageUrl(item, 'A72')" class="w-full h-full object-cover" loading="lazy" @error="onImageError(`${item.ID}-g-A72`)" />
                        <div v-else class="w-full h-full flex items-center justify-center"><Icon name="i-lucide-image-off" class="size-4 text-muted-foreground/20" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Footer -->
                <div class="px-3 py-2 border-t bg-muted/10 flex items-center gap-2">
                  <div class="size-6 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center shrink-0">
                    <Icon name="i-lucide-user" class="size-3 text-blue-500" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[11px] font-medium text-foreground truncate">{{ resolveUser(item.A2) || '—' }}</p>
                    <p class="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Icon name="i-lucide-clock" class="size-2.5 shrink-0" />
                      {{ formatTimestamp(item.A213) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination (table only) -->
    <div v-if="viewMode === 'table' && totalPages > 1" class="shrink-0 border-t px-4 py-2 flex items-center justify-between gap-4">
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

    <!-- Lightbox -->
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
