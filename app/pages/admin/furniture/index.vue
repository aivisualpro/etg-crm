<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Furniture', icon: 'i-lucide-armchair', description: 'Asset furniture inventory' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// State
const search = ref('')
const loading = ref(true)
const page = ref(1)
const limit = ref(100)
const rows = ref<any[]>([])
const total = ref(0)
const totalPages = ref(0)

// Sync / actions state
const syncing = ref(false)
const syncAction = ref<'smart' | 'full' | 'dedup' | 'images' | ''>('')
const showActions = ref(false)
const actionsRef = ref<HTMLElement>()

// Health check state
const showHealthPanel = ref(false)
const healthLoading = ref(false)
const healthData = ref<any>(null)

// Dedup results dialog
const showDedupResults = ref(false)
const dedupResults = ref<any>(null)

// Close dropdown on outside click
const syncBtnRef = ref<any>(null)
const dropdownPos = reactive({ top: 0, right: 0 })

function toggleActions() {
  if (!showActions.value) {
    // Calculate position from the button
    const el = syncBtnRef.value?.$el || actionsRef.value
    if (el) {
      const rect = el.getBoundingClientRect()
      dropdownPos.top = rect.bottom + 6
      dropdownPos.right = window.innerWidth - rect.right
    }
  }
  showActions.value = !showActions.value
}

const dropdownStyle = computed(() => ({
  top: `${dropdownPos.top}px`,
  right: `${dropdownPos.right}px`,
}))

onMounted(() => {
  const handler = (e: MouseEvent) => {
    if (showActions.value) {
      const el = actionsRef.value
      // Check if click is inside the button or the dropdown
      const target = e.target as Node
      if (el && !el.contains(target)) {
        // Also check if clicking inside the teleported dropdown
        const dropdown = document.querySelector('[data-dropdown-sync]')
        if (!dropdown || !dropdown.contains(target)) {
          showActions.value = false
        }
      }
    }
  }
  document.addEventListener('click', handler)
  onUnmounted(() => document.removeEventListener('click', handler))
})

// Date filter tabs
const dateFilter = ref('all')
const dateCounts = ref<Record<string, number>>({})

const dateTabs = [
  { key: 'all', label: 'All' },
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'lastMonth', label: 'Last Month' },
  { key: 'year', label: 'This Year' },
]

// Fetch data
async function fetchData() {
  loading.value = true
  try {
    const params: Record<string, string | number> = { page: page.value, limit: limit.value }
    if (search.value.trim()) params.search = search.value.trim()
    if (dateFilter.value && dateFilter.value !== 'all') params.dateFilter = dateFilter.value

    const data = await $fetch<{
      success: boolean, rows: any[], total: number, totalPages: number,
      partitionCounts?: Record<string, number>, dateCounts?: Record<string, number>
    }>('/api/bigquery/furniture', { params })

    if (data.success) {
      rows.value = data.rows
      total.value = data.total
      totalPages.value = data.totalPages
      if (data.dateCounts) dateCounts.value = data.dateCounts
    }
  }
  catch (e: any) {
    if (!e.message?.includes('Not found')) toast.error('Failed to load data')
  }
  finally { loading.value = false }
}
fetchData()

// Users lookup: furniture A2 contains a number matching etgUsers.A201, display etgUsers.A2 (name)
const usersMap = ref<Record<string, string>>({})
async function fetchUsersMap() {
  try {
    const data = await $fetch<{ success: boolean, users: any[] }>('/api/bigquery/users')
    if (data.success && data.users) {
      const map: Record<string, string> = {}
      for (const u of data.users) {
        // A201 = phone/ID number (what furniture.A2 stores)
        // A2 = user name (what we want to display)
        if (u.A201) map[u.A201] = u.A2 || u.A201
      }
      usersMap.value = map
    }
  }
  catch { /* ignore */ }
}
fetchUsersMap()

// Levels lookup
const level1Map = ref<Record<string, { logo: string, eng: string, arabic: string }>>({})
const level2Map = ref<Record<string, { eng: string, arabic: string }>>({})
const level3Map = ref<Record<string, { eng: string, arabic: string }>>({})

async function fetchLevelsMap() {
  try {
    const data = await $fetch<{ success: boolean, level1: any[], level2: any[], level3: any[] }>('/api/bigquery/levels')
    if (data.success) {
      // Level 1: A7 → logo + eng/arabic
      const m1: Record<string, { logo: string, eng: string, arabic: string }> = {}
      for (const r of data.level1 || []) {
        if (r.A7) m1[r.A7] = { logo: r.image_url || r.logo || '', eng: r.eng || r.A7, arabic: r.arabic || r.A7 }
      }
      level1Map.value = m1

      // Level 2: A8 → eng/arabic
      const m2: Record<string, { eng: string, arabic: string }> = {}
      for (const r of data.level2 || []) {
        if (r.A8) m2[r.A8] = { eng: r.eng || r.A8, arabic: r.arabic || r.A8 }
      }
      level2Map.value = m2

      // Level 3: A9 → eng/arabic
      const m3: Record<string, { eng: string, arabic: string }> = {}
      for (const r of data.level3 || []) {
        if (r.A9) m3[r.A9] = { eng: r.eng || r.A9, arabic: r.arabic || r.A9 }
      }
      level3Map.value = m3
    }
  }
  catch { /* ignore */ }
}
fetchLevelsMap()

// SubCategories lookup: A66 → eng/arabic
const subCatMap = ref<Record<string, { eng: string, arabic: string }>>({})
async function fetchSubCatMap() {
  try {
    const data = await $fetch<{ success: boolean, subCategories: any[] }>('/api/bigquery/asset-categories')
    if (data.success && data.subCategories) {
      const m: Record<string, { eng: string, arabic: string }> = {}
      for (const r of data.subCategories) {
        if (r.A66) m[r.A66] = { eng: r.eng || r.A66, arabic: r.arabic || r.A66 }
      }
      subCatMap.value = m
    }
  }
  catch { /* ignore */ }
}
fetchSubCatMap()

function resolveSubCat(a66: string | undefined): string {
  if (!a66) return ''
  const entry = subCatMap.value[a66]
  if (!entry) return a66
  return appLang.value === 'ar' ? (entry.arabic || entry.eng || a66) : (entry.eng || a66)
}

function resolveLevel1Logo(a7: string | undefined): string {
  if (!a7) return ''
  const entry = level1Map.value[a7]
  if (!entry || !entry.logo) return ''
  return entry.logo.startsWith('http') ? entry.logo : `/api/gcs/${entry.logo}`
}

function resolveLevel2(a8: string | undefined): string {
  if (!a8) return ''
  const entry = level2Map.value[a8]
  if (!entry) return a8
  return appLang.value === 'ar' ? (entry.arabic || entry.eng || a8) : (entry.eng || a8)
}

function resolveLevel3(a9: string | undefined): string {
  if (!a9) return ''
  const entry = level3Map.value[a9]
  if (!entry) return a9
  return appLang.value === 'ar' ? (entry.arabic || entry.eng || a9) : (entry.eng || a9)
}
function resolveUser(a2: string | undefined): string {
  if (!a2) return ''
  return usersMap.value[a2] || a2
}

watch(page, () => fetchData())
watch(dateFilter, () => { page.value = 1; fetchData() })
let searchDebounce: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => { page.value = 1; fetchData() }, 400)
})

// Sync composable
const { runSmartSync, runFullSync, runDeduplication, runImageSync, runHealthCheck, syncState } = useSyncProgress()

// ─── Health Check ─────────────────────────────────────────
async function checkHealth() {
  showActions.value = false
  healthLoading.value = true
  showHealthPanel.value = true
  try {
    healthData.value = await runHealthCheck()
  }
  catch (e: any) {
    toast.error('Health check failed')
  }
  finally {
    healthLoading.value = false
  }
}

// ─── Smart Sync ───────────────────────────────────────────
async function smartSync() {
  syncing.value = true
  syncAction.value = 'smart'
  showActions.value = false
  showHealthPanel.value = false
  try {
    const result = await runSmartSync()
    if (result.synced === 0 && result.skipped > 0) {
      toast.success(`All ${result.skipped} partitions already in sync — nothing to do! ✨`)
    }
    else {
      toast.success(`Smart sync complete: ${result.synced?.toLocaleString()} rows synced, ${result.skipped} skipped`)
    }
    await fetchData()
  }
  catch (e: any) {
    toast.error(e?.data?.statusMessage || e?.message || 'Smart sync failed')
  }
  finally {
    syncing.value = false
    syncAction.value = ''
  }
}

// ─── Full Sync ────────────────────────────────────────────
async function fullSync() {
  syncing.value = true
  syncAction.value = 'full'
  showActions.value = false
  showHealthPanel.value = false
  try {
    await runFullSync({ images: false })
    toast.success(`Full sync complete: ${syncState.rowsFetched.toLocaleString()} rows`)
    await fetchData()
  }
  catch (e: any) {
    toast.error(e?.data?.statusMessage || 'Full sync failed')
  }
  finally {
    syncing.value = false
    syncAction.value = ''
  }
}

// ─── Deduplicate ──────────────────────────────────────────
async function deduplicate() {
  syncing.value = true
  syncAction.value = 'dedup'
  showActions.value = false
  try {
    const result = await runDeduplication()
    if (result) {
      dedupResults.value = result
      showDedupResults.value = true
      if (result.removed > 0) {
        toast.success(`Removed ${result.removed.toLocaleString()} duplicates`)
      }
      else {
        toast.success('No duplicates found — data is clean! ✨')
      }
      await fetchData()
    }
  }
  catch (e: any) {
    toast.error(e?.data?.statusMessage || e?.message || 'Deduplication failed')
  }
  finally {
    syncing.value = false
    syncAction.value = ''
  }
}

// ─── Image Sync ───────────────────────────────────────────
async function syncImages() {
  syncing.value = true
  syncAction.value = 'images'
  showActions.value = false
  try {
    const result = await runImageSync()
    toast.success(`Synced ${result.totalCopied.toLocaleString()} images to cloud storage`)
    await fetchData()
  }
  catch (e: any) {
    toast.error(e?.data?.statusMessage || e?.message || 'Image sync failed')
  }
  finally {
    syncing.value = false
    syncAction.value = ''
  }
}

// ─── Sync a single partition from health check ────────────
async function syncPartition(partIndex: number) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000)
    toast.info(`Syncing partition ${partIndex}...`)
    const result = await $fetch<{ success: boolean, count: number, sheet: string }>(
      `/api/bigquery/sync-furniture?partition=${partIndex}&mode=full&images=false`,
      { method: 'POST', signal: controller.signal },
    )
    clearTimeout(timeout)
    toast.success(`${result.sheet}: ${result.count?.toLocaleString()} rows synced`)
    await checkHealth()
    await fetchData()
  }
  catch (e: any) {
    toast.error(e?.data?.statusMessage || 'Partition sync failed')
  }
}

// Columns — labels resolved from etgLanguage based on current language
const { resolve: resolveLang, lang: appLang } = useAppLanguage()

const IMAGE_COLS = ['A69', 'A71', 'A72']
const columnDefs = [
  { key: 'A69', fallback: 'Photo 1', width: '60px', isImage: true },
  { key: 'A70', fallback: 'Asset Code', width: '120px' },
  { key: 'A7', fallback: 'Level 1', width: '50px' },
  { key: 'A8', fallback: 'Level 2', width: '150px' },
  { key: 'A9', fallback: 'Level 3', width: '140px' },
  { key: 'A66', fallback: 'Subcategory', width: '140px' },
  { key: 'A67', fallback: 'A67', width: '100px' },
  { key: 'A222', fallback: 'Description', width: '180px' },
  { key: 'A68', fallback: 'Condition', width: '120px' },
  { key: 'A71', fallback: 'Photo 2', width: '60px', isImage: true },
  { key: 'A72', fallback: 'Photo 3', width: '60px', isImage: true },
  { key: 'A75', fallback: 'A75', width: '100px' },
  { key: 'A76', fallback: 'A76', width: '100px' },
  { key: 'A77', fallback: 'A77', width: '100px' },
  { key: 'A78', fallback: 'A78', width: '100px' },
  { key: 'A2', fallback: 'User', width: '140px' },
  { key: 'A79', fallback: 'Coordinates', width: '60px' },
  { key: 'A213', fallback: 'A213', width: '100px' },
]

// Reactive columns — labels update when language toggles
const columns = computed(() =>
  columnDefs.map(def => {
    const resolved = resolveLang(def.key)
    return {
      key: def.key,
      label: resolved !== def.key ? resolved : def.fallback,
      width: def.width,
      isImage: def.isImage,
    }
  }),
)

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

// Image lightbox
const lightboxSrc = ref('')
const showLightbox = ref(false)
function openLightbox(src: string) {
  if (src) {
    lightboxSrc.value = src
    showLightbox.value = true
  }
}

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

const failedImages = ref(new Set<string>())
function onImageError(key: string) { failedImages.value.add(key) }
function isImageFailed(key: string): boolean { return failedImages.value.has(key) }

// Health helpers
function statusColor(status: string) {
  if (status === 'synced') return 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20'
  if (status === 'behind') return 'bg-blue-500/10 text-blue-500 ring-blue-500/20'
  return 'bg-red-500/10 text-red-500 ring-red-500/20'
}
function statusLabel(status: string) {
  if (status === 'synced') return '✓ Synced'
  if (status === 'behind') return '↑ Needs Rows'
  return '⚠ Excess'
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <!-- Search in header -->
        <div class="relative max-w-[200px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input v-model="search" placeholder="Search code, desc..." class="pl-8 h-8 text-xs" />
          <button
            v-if="search"
            class="absolute right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            @click="search = ''"
          >
            <Icon name="i-lucide-x" class="size-2.5 text-muted-foreground" />
          </button>
        </div>

        <!-- Total records -->
        <p v-if="!loading && total > 0" class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ total.toLocaleString() }} records
        </p>

        <!-- Health Check Button -->
        <Button
          variant="ghost"
          size="sm"
          class="h-8 gap-1.5"
          :disabled="syncing"
          @click="checkHealth"
        >
          <Icon name="i-lucide-heart-pulse" class="size-3.5" :class="healthLoading ? 'animate-pulse' : ''" />
          <span class="text-xs hidden sm:inline">Health</span>
        </Button>

        <!-- Actions dropdown -->
        <div ref="actionsRef" class="relative">
          <Button
            ref="syncBtnRef"
            variant="outline"
            size="sm"
            class="h-8 gap-1.5"
            :disabled="syncing"
            @click="toggleActions"
          >
            <Icon v-if="syncing" name="i-lucide-loader-2" class="size-3.5 animate-spin" />
            <Icon v-else name="i-lucide-zap" class="size-3.5" />
            <span class="text-xs hidden sm:inline">Sync</span>
            <Icon name="i-lucide-chevron-down" class="size-3" />
          </Button>
        </div>
      </div>
    </Teleport>

    <!-- Actions dropdown menu (teleported to body to avoid clipping) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-1"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-1"
      >
        <div
          v-if="showActions"
          class="fixed w-72 rounded-xl border bg-popover/95 backdrop-blur-xl shadow-xl shadow-black/10 z-[200] overflow-hidden"
          data-dropdown-sync
          :style="dropdownStyle"
        >
          <div class="px-3 py-2.5 border-b bg-muted/30">
            <p class="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Sync Operations</p>
          </div>
          <div class="p-1">
            <!-- Smart Sync -->
            <button
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-muted transition-colors group"
              :disabled="syncing"
              @click="smartSync"
            >
              <div class="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                <Icon name="i-lucide-zap" class="size-4 text-emerald-500" />
              </div>
              <div class="min-w-0">
                <p class="font-medium text-foreground">Smart Sync</p>
                <p class="text-[11px] text-muted-foreground leading-tight">Only syncs changed partitions — fast!</p>
              </div>
              <span class="ml-auto text-[10px] text-emerald-500 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">FAST</span>
            </button>

            <!-- Full Sync -->
            <button
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-muted transition-colors group"
              :disabled="syncing"
              @click="fullSync"
            >
              <div class="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                <Icon name="i-lucide-refresh-cw" class="size-4 text-blue-500" />
              </div>
              <div class="min-w-0">
                <p class="font-medium text-foreground">Full Re-sync</p>
                <p class="text-[11px] text-muted-foreground leading-tight">Re-fetches all 14 sheets from scratch</p>
              </div>
              <span class="ml-auto text-[10px] text-amber-500 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">SLOW</span>
            </button>

            <div class="h-px bg-border mx-2 my-1" />

            <!-- Remove Duplicates -->
            <button
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-muted transition-colors group"
              :disabled="syncing"
              @click="deduplicate"
            >
              <div class="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                <Icon name="i-lucide-copy-minus" class="size-4 text-amber-500" />
              </div>
              <div class="min-w-0">
                <p class="font-medium text-foreground">Remove Duplicates</p>
                <p class="text-[11px] text-muted-foreground leading-tight">Dedup by A70 — removes excess rows</p>
              </div>
            </button>

            <!-- Sync Images -->
            <button
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-muted transition-colors group"
              :disabled="syncing"
              @click="syncImages"
            >
              <div class="size-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
                <Icon name="i-lucide-image-plus" class="size-4 text-violet-500" />
              </div>
              <div class="min-w-0">
                <p class="font-medium text-foreground">Sync Images</p>
                <p class="text-[11px] text-muted-foreground leading-tight">Drive → Cloud Storage, updates URLs</p>
              </div>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Health Panel (slides down from top) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2 max-h-0"
      enter-to-class="opacity-100 translate-y-0 max-h-[600px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 max-h-[600px]"
      leave-to-class="opacity-0 -translate-y-2 max-h-0"
    >
      <div v-if="showHealthPanel" class="shrink-0 border-b overflow-hidden">
        <div class="bg-gradient-to-r from-card to-muted/20 p-4">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <div class="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Icon name="i-lucide-heart-pulse" class="size-4 text-blue-500" />
              </div>
              <div>
                <h3 class="text-sm font-semibold text-foreground">Data Health Check</h3>
                <p class="text-[11px] text-muted-foreground">Google Sheets vs BigQuery — live comparison</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Button v-if="healthData && !healthData.allSynced" variant="default" size="sm" class="h-7 text-xs gap-1" @click="smartSync(); showHealthPanel = false">
                <Icon name="i-lucide-zap" class="size-3" /> Sync Changes
              </Button>
              <button class="size-6 rounded-md hover:bg-muted flex items-center justify-center transition-colors" @click="showHealthPanel = false">
                <Icon name="i-lucide-x" class="size-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="healthLoading" class="flex items-center justify-center py-8">
            <div class="flex items-center gap-3 text-muted-foreground">
              <Icon name="i-lucide-loader-2" class="size-5 animate-spin" />
              <p class="text-sm">Checking partition counts...</p>
            </div>
          </div>

          <!-- Health Data -->
          <div v-else-if="healthData">
            <!-- Summary stats -->
            <div class="grid grid-cols-4 gap-3 mb-4">
              <div class="rounded-lg bg-card/80 border p-3 text-center">
                <p class="text-lg font-bold tabular-nums text-foreground">{{ healthData.sheetTotal?.toLocaleString() }}</p>
                <p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Sheets Total</p>
              </div>
              <div class="rounded-lg bg-card/80 border p-3 text-center">
                <p class="text-lg font-bold tabular-nums text-foreground">{{ healthData.bqTotal?.toLocaleString() }}</p>
                <p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">BigQuery Total</p>
              </div>
              <div class="rounded-lg bg-card/80 border p-3 text-center">
                <p
                  class="text-lg font-bold tabular-nums"
                  :class="healthData.diff === 0 ? 'text-emerald-500' : 'text-amber-500'"
                >
                  {{ healthData.diff === 0 ? '✓' : (healthData.diff > 0 ? '+' : '') + healthData.diff?.toLocaleString() }}
                </p>
                <p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Difference</p>
              </div>
              <div class="rounded-lg bg-card/80 border p-3 text-center">
                <p
                  class="text-lg font-bold tabular-nums"
                  :class="healthData.allSynced ? 'text-emerald-500' : 'text-blue-500'"
                >
                  {{ healthData.allSynced ? '✓ All' : healthData.needsSyncCount }}
                </p>
                <p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  {{ healthData.allSynced ? 'In Sync' : 'Need Sync' }}
                </p>
              </div>
            </div>

            <!-- Partition grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              <div
                v-for="p in healthData.partitions"
                :key="p.a7"
                class="rounded-lg border bg-card/60 p-2.5 hover:bg-card transition-colors group"
              >
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[10px] font-mono font-medium text-muted-foreground truncate">{{ p.sheet.replace('Furniture_', '') }}</span>
                  <span
                    class="text-[9px] font-medium px-1.5 py-0.5 rounded-full ring-1"
                    :class="statusColor(p.status)"
                  >
                    {{ statusLabel(p.status) }}
                  </span>
                </div>
                <div class="space-y-0.5">
                  <div class="flex justify-between text-[10px]">
                    <span class="text-muted-foreground">Sheet</span>
                    <span class="tabular-nums font-medium">{{ p.sheetCount?.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between text-[10px]">
                    <span class="text-muted-foreground">BQ</span>
                    <span class="tabular-nums font-medium">{{ p.bqCount?.toLocaleString() }}</span>
                  </div>
                  <div v-if="p.diff !== 0" class="flex justify-between text-[10px]">
                    <span class="text-muted-foreground">Diff</span>
                    <span
                      class="tabular-nums font-bold"
                      :class="p.diff > 0 ? 'text-blue-500' : 'text-red-500'"
                    >
                      {{ p.diff > 0 ? '+' : '' }}{{ p.diff?.toLocaleString() }}
                    </span>
                  </div>
                </div>
                <!-- Per-partition sync -->
                <button
                  v-if="p.needsSync"
                  class="w-full mt-2 text-[10px] font-medium text-blue-500 bg-blue-500/5 hover:bg-blue-500/10 rounded py-1 transition-colors opacity-0 group-hover:opacity-100"
                  @click="syncPartition(p.index)"
                >
                  Sync This
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Date filter tabs + sync progress -->
    <div class="shrink-0 border-b px-4 py-0 flex items-center gap-1 overflow-x-auto">
      <button
        v-for="tab in dateTabs" :key="tab.key"
        class="flex items-center gap-1.5 px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors"
        :class="dateFilter === tab.key
          ? 'border-primary text-primary'
          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'"
        @click="dateFilter = tab.key"
      >
        {{ tab.label }}
        <span
          v-if="dateCounts[tab.key] !== undefined"
          class="text-[10px] tabular-nums px-1.5 py-0.5 rounded-full"
          :class="dateFilter === tab.key ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'"
        >
          {{ dateCounts[tab.key]?.toLocaleString() }}
        </span>
      </button>

      <!-- Sync progress bar -->
      <div v-if="syncState.active" class="ml-auto flex items-center gap-2.5 min-w-0 shrink-0">
        <div class="flex items-center gap-1.5">
          <Icon name="i-lucide-loader-2" class="size-3 animate-spin text-blue-500 shrink-0" />
          <span class="text-[10px] text-muted-foreground capitalize whitespace-nowrap">{{ syncState.type }}</span>
        </div>
        <div class="h-1.5 w-24 sm:w-40 rounded-full bg-muted overflow-hidden shrink-0">
          <div
            class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out"
            :style="{ width: `${syncState.percent}%` }"
          />
        </div>
        <span class="text-[10px] text-muted-foreground tabular-nums whitespace-nowrap">
          {{ syncState.percent }}%
        </span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-4 text-muted-foreground">
        <div class="size-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
          <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-blue-500" />
        </div>
        <p class="text-sm font-medium">Loading furniture data...</p>
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
              :class="!col.isImage ? 'cursor-pointer select-none hover:bg-muted/50 transition-colors' : ''"
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
              <template v-else-if="col.key === 'A7'">
                <div class="flex items-center justify-center">
                  <img
                    v-if="resolveLevel1Logo(row.A7)"
                    :src="resolveLevel1Logo(row.A7)"
                    :alt="row.A7"
                    class="size-7 rounded-full object-cover ring-1 ring-border/30"
                    loading="lazy"
                  >
                  <span v-else class="text-xs text-muted-foreground">—</span>
                </div>
              </template>
              <template v-else-if="col.key === 'A8'">
                <span class="text-sm whitespace-nowrap" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ resolveLevel2(row.A8) || '—' }}</span>
              </template>
              <template v-else-if="col.key === 'A9'">
                <span class="text-sm whitespace-nowrap" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ resolveLevel3(row.A9) || '—' }}</span>
              </template>
              <template v-else-if="col.key === 'A66'">
                <span class="text-sm whitespace-nowrap" :dir="appLang === 'ar' ? 'rtl' : 'ltr'">{{ resolveSubCat(row.A66) || '—' }}</span>
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
              <template v-else-if="col.key === 'A2'">
                <span class="text-sm whitespace-nowrap flex items-center gap-1.5">
                  <Icon v-if="resolveUser(row.A2) && resolveUser(row.A2) !== row.A2" name="i-lucide-user" class="size-3 text-muted-foreground shrink-0" />
                  {{ resolveUser(row.A2) || '—' }}
                </span>
              </template>
              <template v-else-if="col.key === 'A79'">
                <a
                  v-if="row.A79 && row.A79.includes(',')"
                  :href="`https://www.google.com/maps?q=${row.A79.replace(/\s/g, '')}`"
                  target="_blank"
                  class="inline-flex items-center justify-center size-8 rounded-lg hover:bg-blue-500/10 transition-colors group/map"
                  title="Open in Google Maps"
                  @click.stop
                >
                  <Icon name="i-lucide-map-pin" class="size-4 text-blue-500 group-hover/map:scale-110 transition-transform" />
                </a>
                <span v-else class="text-muted-foreground">—</span>
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
                <div>
                  <p class="font-medium text-foreground/60">{{ total === 0 ? 'No furniture data' : 'No matching records' }}</p>
                  <p class="text-xs mt-0.5">{{ total === 0 ? 'Click sync to import data from Google Sheets.' : 'Try adjusting your search terms.' }}</p>
                </div>
                <Button v-if="total === 0" variant="outline" size="sm" class="mt-1" @click="smartSync()">
                  <Icon name="i-lucide-zap" class="size-3.5 mr-1.5" /> Smart Sync
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="shrink-0 border-t px-4 py-2 flex items-center justify-between gap-4 bg-card/50">
      <p class="text-xs text-muted-foreground tabular-nums">
        Page {{ page }} of {{ totalPages.toLocaleString() }} · {{ total.toLocaleString() }} total
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

    <!-- ═══ OVERLAYS ══════════════════════════════════════════ -->

    <!-- Image Lightbox -->
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
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-90"
            enter-to-class="opacity-100 scale-100"
          >
            <img
              v-if="showLightbox"
              :src="lightboxSrc"
              alt="Preview"
              class="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              @click.stop
            >
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Dedup Results Dialog -->
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
          v-if="showDedupResults && dedupResults"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          @click.self="showDedupResults = false"
        >
          <div class="w-full max-w-lg mx-4 rounded-2xl border bg-card shadow-2xl shadow-black/20 overflow-hidden">
            <div class="px-6 py-5 border-b bg-gradient-to-r from-emerald-500/5 to-blue-500/5">
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Icon name="i-lucide-check-circle-2" class="size-5 text-emerald-500" />
                </div>
                <div>
                  <h3 class="font-semibold text-foreground">Deduplication Complete</h3>
                  <p class="text-sm text-muted-foreground">
                    <template v-if="dedupResults.removed > 0">
                      Removed <strong class="text-emerald-500">{{ dedupResults.removed.toLocaleString() }}</strong> duplicate rows
                    </template>
                    <template v-else>
                      No duplicates found — data is clean!
                    </template>
                  </p>
                </div>
              </div>
            </div>

            <div class="px-6 py-4 grid grid-cols-3 gap-4">
              <div class="text-center">
                <p class="text-2xl font-bold tabular-nums text-red-400">{{ dedupResults.before.toLocaleString() }}</p>
                <p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Before</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold tabular-nums text-amber-400">{{ dedupResults.removed.toLocaleString() }}</p>
                <p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Removed</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold tabular-nums text-emerald-400">{{ dedupResults.after.toLocaleString() }}</p>
                <p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">After</p>
              </div>
            </div>

            <div class="px-6 pb-4">
              <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Partition Breakdown</h4>
              <div class="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                <div
                  v-for="(afterCount, key) in dedupResults.partitionCountsAfter"
                  :key="key"
                  class="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <span class="font-medium font-mono">{{ key }}</span>
                  <div class="flex items-center gap-3 tabular-nums">
                    <span v-if="dedupResults.partitionCountsBefore[key as string] !== afterCount" class="text-red-400 line-through opacity-60">
                      {{ dedupResults.partitionCountsBefore[key as string]?.toLocaleString() }}
                    </span>
                    <span class="text-emerald-500 font-medium">{{ afterCount.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-6 py-4 border-t flex justify-end">
              <Button size="sm" @click="showDedupResults = false">
                Done
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
