<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Entities', icon: 'i-lucide-building-2', description: 'Manage organizational levels' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

const { resolve: resolveLang, lang: appLang } = useAppLanguage()

// ─── Global prefetched store (instant) ──────────────────────
const store = useDashboardStore()
store.init()

const loading = computed(() => !store.ready.value)
const level1 = computed(() => [...store.level1List.value])
const level2 = computed(() => [...store.level2List.value])
const level3 = computed(() => [...store.level3List.value])

// ─── State ──────────────────────────────────────────────────
const selectedLevel1Id = ref('')
const search = ref('')
const syncing = ref(false)
const expandedLevel2 = ref<Set<string>>(new Set())

/** Resolve name based on current app language */
function lang(row: any): string {
  if (!row) return ''
  return appLang.value === 'ar' ? (row.arabic || row.eng || '') : (row.eng || row.arabic || '')
}

// ─── Auto-select first level1 ───────────────────────────────
watchEffect(() => {
  if (level1.value.length && !selectedLevel1Id.value) {
    selectedLevel1Id.value = level1.value[0].A7
  }
})

// ─── Level 2s for the selected Level 1 ─────────────────────
const filteredLevel2 = computed(() => {
  if (!selectedLevel1Id.value) return []
  return level2.value.filter(l2 => l2.A7 === selectedLevel1Id.value)
})

// Reset expanded accordion when Level 1 changes
watch(selectedLevel1Id, () => {
  expandedLevel2.value = new Set()
})

// ─── Level 3s grouped by Level 2 ───────────────────────────
const level3ByLevel2 = computed(() => {
  const map: Record<string, any[]> = {}
  for (const l3 of level3.value) {
    if (!map[l3.A8]) map[l3.A8] = []
    map[l3.A8]!.push(l3)
  }
  return map
})

function level3ForLevel2(l2Id: string): any[] {
  return level3ByLevel2.value[l2Id] || []
}

// ─── Counts ────────────────────────────────────────────────
function level2CountForLevel1(l1Id: string): number {
  return level2.value.filter(l2 => l2.A7 === l1Id).length
}

function level3CountForLevel2(l2Id: string): number {
  return (level3ByLevel2.value[l2Id] || []).length
}

function totalLevel2ForSelectedLevel1(): number {
  if (!selectedLevel1Id.value) return 0
  return filteredLevel2.value.length
}

// ─── Search / Filter ───────────────────────────────────────
const searchedLevel2 = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return filteredLevel2.value
  return filteredLevel2.value.filter(l2 =>
    (l2.eng || '').toLowerCase().includes(q)
    || (l2.arabic || '').toLowerCase().includes(q)
    || (l2.A8 || '').toLowerCase().includes(q),
  )
})

// ─── Accordion Toggle ──────────────────────────────────────
function toggleLevel2(l2Id: string) {
  const newSet = new Set(expandedLevel2.value)
  if (newSet.has(l2Id)) newSet.delete(l2Id)
  else newSet.add(l2Id)
  expandedLevel2.value = newSet
}

function isExpanded(l2Id: string): boolean {
  return expandedLevel2.value.has(l2Id)
}

// ─── Sync from AppSheet ─────────────────────────────────────
async function syncLevels() {
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

// ─── Logo helper ────────────────────────────────────────────
function logoUrl(row: any): string {
  if (row.image_url && typeof row.image_url === 'string') {
    if (row.image_url.startsWith('http')) return row.image_url
    return `/api/gcs/${row.image_url}`
  }
  return ''
}
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar in header -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[220px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input v-model="search" placeholder="Search level 2..." class="pl-8 h-8 text-sm" />
          <button
            v-if="search"
            class="absolute right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            @click="search = ''"
          >
            <Icon name="i-lucide-x" class="size-2.5 text-muted-foreground" />
          </button>
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ searchedLevel2.length }} record{{ searchedLevel2.length !== 1 ? 's' : '' }}
        </p>
        <Button variant="ghost" size="sm" class="h-8" :disabled="syncing" @click="syncLevels()">
          <Icon name="i-lucide-refresh-cw" class="size-3.5" :class="syncing ? 'animate-spin' : ''" />
          <span v-if="syncing" class="ml-1 text-xs">Syncing...</span>
        </Button>
      </div>
    </Teleport>

    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-3 text-muted-foreground">
        <Icon name="i-lucide-loader-2" class="size-8 animate-spin" />
        <p class="text-sm">Loading entities...</p>
      </div>
    </div>

    <!-- Main: Sidebar + Table -->
    <div v-else class="flex-1 min-h-0 flex">

      <!-- Level 1 sidebar -->
      <div
        class="w-[300px] shrink-0 border-r flex flex-col min-h-0 bg-card"
        :class="appLang === 'ar' ? 'order-2 border-r-0 border-l' : ''"
      >
        <!-- Header -->
        <div class="px-4 py-3 border-b">
          <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {{ appLang === 'ar' ? 'المستوى الأول' : 'Level 1' }}
          </p>
        </div>

        <!-- Level 1 list -->
        <div class="flex-1 overflow-y-auto scrollbar-thin">
          <button
            v-for="l1 in level1"
            :key="l1.A7"
            class="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors border-b border-border/30"
            :class="selectedLevel1Id === l1.A7
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'"
            @click="selectedLevel1Id = l1.A7"
          >
            <!-- Logo -->
            <div class="size-7 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0">
              <img
                v-if="logoUrl(l1)"
                :src="logoUrl(l1)"
                :alt="l1.eng"
                class="size-7 object-contain"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />
              <Icon v-else name="i-lucide-building-2" class="size-3.5 text-muted-foreground/40" />
            </div>

            <!-- Name -->
            <span class="truncate flex-1" :class="appLang === 'ar' ? 'text-right' : 'text-left'">
              {{ lang(l1) || l1.A7 }}
            </span>

            <!-- Count badge -->
            <span
              class="text-[10px] tabular-nums shrink-0 px-1.5 py-0.5 rounded-full"
              :class="selectedLevel1Id === l1.A7 ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground/70'"
            >
              {{ level2CountForLevel1(l1.A7) }}
            </span>
          </button>

          <!-- Empty -->
          <div v-if="level1.length === 0" class="py-8 text-center text-muted-foreground">
            <Icon name="i-lucide-building-2" class="size-6 mx-auto mb-2 opacity-40" />
            <p class="text-xs">{{ appLang === 'ar' ? 'لا يوجد مستوى أول' : 'No Level 1 entities' }}</p>
          </div>
        </div>
      </div>

      <!-- Level 2 table with Level 3 accordion -->
      <div class="flex-1 min-h-0 overflow-auto" :class="appLang === 'ar' ? 'order-1' : ''">
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
            <TableRow class="border-b-0">
              <TableHead class="bg-card w-10" />
              <TableHead class="bg-card">
                {{ appLang === 'ar' ? 'المستوى الثاني' : 'Level 2 Name' }}
              </TableHead>
              <TableHead class="bg-card text-center w-[100px]">
                {{ appLang === 'ar' ? 'المستوى الثالث' : 'Level 3s' }}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <template v-for="l2 in searchedLevel2" :key="l2.A8">
              <!-- Level 2 Row -->
              <TableRow
                class="group cursor-pointer transition-colors"
                :class="isExpanded(l2.A8) ? 'bg-primary/5' : 'hover:bg-muted/30'"
                @click="toggleLevel2(l2.A8)"
              >
                <!-- Expand chevron -->
                <TableCell class="w-10 px-3">
                  <div
                    class="size-6 rounded-md flex items-center justify-center transition-all"
                    :class="isExpanded(l2.A8)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground group-hover:bg-muted'"
                  >
                    <Icon
                      name="i-lucide-chevron-right"
                      class="size-3.5 transition-transform duration-200"
                      :class="isExpanded(l2.A8) ? 'rotate-90' : ''"
                    />
                  </div>
                </TableCell>

                <!-- Name -->
                <TableCell>
                  <div class="flex items-center gap-2.5">
                    <div class="size-7 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center shrink-0">
                      <Icon name="i-lucide-building" class="size-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span
                      class="font-medium text-sm"
                      :dir="appLang === 'ar' ? 'rtl' : 'ltr'"
                    >{{ lang(l2) || l2.A8 }}</span>
                  </div>
                </TableCell>

                <!-- Level 3 count -->
                <TableCell class="text-center">
                  <Badge
                    v-if="level3CountForLevel2(l2.A8) > 0"
                    variant="outline"
                    class="bg-violet-500/10 text-violet-600 border-violet-500/20 text-[10px] tabular-nums"
                  >
                    {{ level3CountForLevel2(l2.A8) }}
                  </Badge>
                  <span v-else class="text-muted-foreground/40 text-xs">0</span>
                </TableCell>
              </TableRow>

              <!-- Level 3 Accordion Content -->
              <TableRow v-if="isExpanded(l2.A8) && level3ForLevel2(l2.A8).length > 0" class="bg-muted/20">
                <TableCell :colspan="3" class="p-0">
                  <div class="border-l-2 border-primary/30 mx-6 my-2">
                    <div
                      v-for="(l3, idx) in level3ForLevel2(l2.A8)"
                      :key="l3.A9 || idx"
                      class="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-muted/50"
                      :class="idx !== level3ForLevel2(l2.A8).length - 1 ? 'border-b border-border/20' : ''"
                    >
                      <div class="size-6 rounded-md bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center shrink-0">
                        <Icon name="i-lucide-map" class="size-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span
                        class="text-foreground/80"
                        :dir="appLang === 'ar' ? 'rtl' : 'ltr'"
                      >{{ lang(l3) || l3.A9 }}</span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>

              <!-- No Level 3s message -->
              <TableRow v-else-if="isExpanded(l2.A8)" class="bg-muted/20">
                <TableCell :colspan="3" class="py-4">
                  <div class="flex items-center justify-center gap-2 text-muted-foreground/60 text-xs">
                    <Icon name="i-lucide-inbox" class="size-4" />
                    {{ appLang === 'ar' ? 'لا يوجد مستوى ثالث' : 'No Level 3 records' }}
                  </div>
                </TableCell>
              </TableRow>
            </template>

            <!-- Empty state -->
            <TableRow v-if="searchedLevel2.length === 0">
              <TableCell :colspan="3" class="h-32 text-center">
                <div class="flex flex-col items-center gap-2 text-muted-foreground">
                  <Icon name="i-lucide-inbox" class="size-8" />
                  <p>{{ appLang === 'ar' ? 'لا توجد نتائج' : 'No Level 2 entities found' }}</p>
                </div>
              </TableCell>
            </TableRow>
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
