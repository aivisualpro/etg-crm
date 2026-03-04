<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Categories', icon: 'i-lucide-tags', description: 'Asset categories, subcategories & descriptions' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

const { resolve: resolveLang, lang: appLang } = useAppLanguage()

// ─── Global prefetched store (instant) ──────────────────────
const store = useDashboardStore()
store.init()

const loading = computed(() => !store.ready.value)
const categories = computed(() => [...store.categories.value])
const allSubCategories = computed(() => [...store.subCategories.value])
const allDescriptions = computed(() => [...store.assetDescriptions.value])

// ─── State ──────────────────────────────────────────────────
const selectedCatId = ref('')
const selectedSubCatId = ref('')
const search = ref('')
const syncing = ref(false)

function lang(row: any): string {
  if (!row) return ''
  return appLang.value === 'ar' ? (row.arabic || row.eng || '') : (row.eng || row.arabic || '')
}

// ─── Auto-select first category ─────────────────────────────
watchEffect(() => {
  if (categories.value.length && !selectedCatId.value) {
    selectedCatId.value = categories.value[0].A51
  }
})

// ─── SubCategories for the selected category ────────────────
const filteredSubCategories = computed(() => {
  if (!selectedCatId.value) return []
  return allSubCategories.value.filter(s => s.A51 === selectedCatId.value)
})

// Auto-select "All" when category changes
watch(selectedCatId, () => {
  selectedSubCatId.value = ''
})

// ─── Asset Descriptions ─────────────────────────────────────
const filteredDescriptions = computed(() => {
  const q = search.value.toLowerCase()
  let descs = allDescriptions.value

  if (selectedSubCatId.value) {
    descs = descs.filter(d => d.A66 === selectedSubCatId.value)
  } else if (selectedCatId.value) {
    const subIds = new Set(filteredSubCategories.value.map(s => s.A66))
    descs = descs.filter(d => subIds.has(d.A66))
  }

  if (q) {
    descs = descs.filter(d =>
      (d.eng || '').toLowerCase().includes(q) ||
      (d.arabic || '').toLowerCase().includes(q) ||
      (d.A67 || '').toLowerCase().includes(q),
    )
  }

  return descs
})

// ─── Counts ────────────────────────────────────────────────
function subCountForCategory(catId: string): number {
  return allSubCategories.value.filter(s => s.A51 === catId).length
}

function descCountForSub(subId: string): number {
  return allDescriptions.value.filter(d => d.A66 === subId).length
}

function totalDescsForCategory(): number {
  const subIds = new Set(filteredSubCategories.value.map(s => s.A66))
  return allDescriptions.value.filter(d => subIds.has(d.A66)).length
}

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

const sortedDescriptions = computed(() => {
  const col = sortBy.value
  return [...filteredDescriptions.value].sort((a, b) => {
    const av = String(a[col] ?? '').toLowerCase()
    const bv = String(b[col] ?? '').toLowerCase()
    const cmp = av.localeCompare(bv)
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

// ─── Sync ──────────────────────────────────────────────────
async function syncData() {
  syncing.value = true
  try {
    const data = await $fetch<{ success: boolean, message: string }>('/api/bigquery/sync-levels', { method: 'POST' })
    toast.success(data.message || 'Synced successfully')
    await store.refresh()
  }
  catch (e: any) {
    toast.error(e.data?.statusMessage || 'Sync failed')
  }
  finally {
    syncing.value = false
  }
}

// ─── Infinite scroll ───────────────────────────────────────
const CHUNK_SIZE = 60
const visibleCount = ref(CHUNK_SIZE)
watch([selectedSubCatId, selectedCatId, search], () => { visibleCount.value = CHUNK_SIZE })

const visibleRows = computed(() => sortedDescriptions.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < sortedDescriptions.value.length)

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
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar in header -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[220px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input v-model="search" placeholder="Search descriptions..." class="pl-8 h-8 text-sm" />
          <button
            v-if="search"
            class="absolute right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            @click="search = ''"
          >
            <Icon name="i-lucide-x" class="size-2.5 text-muted-foreground" />
          </button>
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ filteredDescriptions.length.toLocaleString() }} record{{ filteredDescriptions.length !== 1 ? 's' : '' }}
        </p>
        <Button variant="ghost" size="sm" class="h-8" :disabled="syncing" @click="syncData()">
          <Icon name="i-lucide-refresh-cw" class="size-3.5" :class="syncing ? 'animate-spin' : ''" />
          <span v-if="syncing" class="ml-1 text-xs">Syncing...</span>
        </Button>
      </div>
    </Teleport>

    <!-- Category pill tabs -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
      <button
        v-for="cat in categories"
        :key="cat.A51"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5"
        :class="selectedCatId === cat.A51
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="selectedCatId = cat.A51"
      >
        {{ lang(cat) }}
        <span
          class="ml-0.5 text-[10px] tabular-nums px-1.5 py-0.5 rounded-full"
          :class="selectedCatId === cat.A51 ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-foreground/60'"
        >
          {{ subCountForCategory(cat.A51) }}
        </span>
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-3 text-muted-foreground">
        <Icon name="i-lucide-loader-2" class="size-8 animate-spin" />
        <p class="text-sm">Loading categories...</p>
      </div>
    </div>

    <!-- Main: Sidebar + Table -->
    <div v-else class="flex-1 min-h-0 flex">

      <!-- SubCategory sidebar (left-aligned for EN, right-aligned for AR) -->
      <div
        class="w-[300px] shrink-0 border-r flex flex-col min-h-0 bg-card"
        :class="appLang === 'ar' ? 'order-2 border-r-0 border-l' : ''"
      >
        <!-- "All" item -->
        <button
          class="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b transition-colors"
          :class="!selectedSubCatId
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'"
          @click="selectedSubCatId = ''"
        >
          <Icon name="i-lucide-layers" class="size-3.5 shrink-0" />
          <span class="flex-1" :class="appLang === 'ar' ? 'text-right' : 'text-left'">
            {{ appLang === 'ar' ? 'عرض الكل' : 'All' }}
          </span>
          <span class="text-[10px] tabular-nums px-1.5 py-0.5 rounded-full bg-muted text-foreground/70">{{ totalDescsForCategory() }}</span>
        </button>

        <!-- Subcategory list -->
        <div class="flex-1 overflow-y-auto scrollbar-thin">
          <button
            v-for="sub in filteredSubCategories"
            :key="sub.A66"
            class="w-full flex items-center gap-2 px-4 py-2 text-[13px] transition-colors border-b border-border/30"
            :class="selectedSubCatId === sub.A66
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'"
            @click="selectedSubCatId = sub.A66"
          >
            <Icon
              name="i-lucide-chevron-right"
              class="size-3 shrink-0 transition-transform"
              :class="[
                selectedSubCatId === sub.A66 ? 'text-primary rotate-90' : 'text-muted-foreground',
                appLang === 'ar' ? 'rotate-180' : '',
              ]"
            />
            <span class="truncate flex-1" :class="appLang === 'ar' ? 'text-right' : 'text-left'">
              {{ lang(sub) || sub.A66 }}
            </span>
            <span
              class="text-[10px] tabular-nums shrink-0 px-1.5 py-0.5 rounded-full"
              :class="selectedSubCatId === sub.A66 ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground/70'"
            >
              {{ descCountForSub(sub.A66) }}
            </span>
          </button>

          <!-- Empty -->
          <div v-if="filteredSubCategories.length === 0" class="py-8 text-center text-muted-foreground">
            <Icon name="i-lucide-folder-open" class="size-6 mx-auto mb-2 opacity-40" />
            <p class="text-xs">No subcategories</p>
          </div>
        </div>
      </div>

      <!-- Descriptions table (just the Description column) -->
      <div class="flex-1 min-h-0 overflow-auto" :class="appLang === 'ar' ? 'order-1' : ''">
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
            <TableRow class="border-b-0">
              <TableHead
                class="bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors"
                @click="toggleSort(appLang === 'ar' ? 'arabic' : 'eng')"
              >
                <div class="flex items-center gap-1">
                  {{ appLang === 'ar' ? 'الوصف' : 'Description' }}
                  <Icon :name="sortIcon(appLang === 'ar' ? 'arabic' : 'eng')" class="size-3 opacity-60" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow
              v-for="(desc, idx) in visibleRows"
              :key="desc.A67 || idx"
              class="group hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <span
                  class="text-sm"
                  :dir="appLang === 'ar' ? 'rtl' : 'ltr'"
                >{{ lang(desc) || '—' }}</span>
              </TableCell>
            </TableRow>

            <!-- Empty state -->
            <TableRow v-if="visibleRows.length === 0">
              <TableCell class="h-32 text-center">
                <div class="flex flex-col items-center gap-2 text-muted-foreground">
                  <Icon name="i-lucide-inbox" class="size-8" />
                  <p>{{ appLang === 'ar' ? 'لا توجد نتائج' : 'No descriptions found' }}</p>
                </div>
              </TableCell>
            </TableRow>

            <!-- Infinite scroll sentinel -->
            <tr v-if="hasMore" ref="sentinelRef">
              <td class="h-10 text-center text-xs text-muted-foreground">
                Loading more…
              </td>
            </tr>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep([data-slot="table-container"]) {
  overflow: visible !important;
}
</style>
