<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Language', icon: 'i-lucide-languages', description: 'etgLanguage reference table' })

// State
const loading = ref(true)
const search = ref('')
const rows = ref<any[]>([])
const editingRow = ref<any>(null)
const editDialog = ref(false)

// Fetch etgLanguage data
async function fetchLanguage() {
  loading.value = true
  try {
    const data = await $fetch<{ success: boolean, language: any[] }>('/api/bigquery/language')
    if (data.success) {
      rows.value = data.language || []
    }
  }
  catch (e: any) {
    toast.error('Failed to load language data')
  }
  finally {
    loading.value = false
  }
}
fetchLanguage()

// Search filter
const filteredRows = computed(() => {
  if (!search.value.trim()) return rows.value
  const q = search.value.toLowerCase()
  return rows.value.filter(r =>
    (r.ID || '').toLowerCase().includes(q) ||
    (r.eng || '').toLowerCase().includes(q) ||
    (r.arabic || '').toLowerCase().includes(q),
  )
})

// Sorting
const sortBy = ref('ID')
const sortDir = ref<'asc' | 'desc'>('asc')
function toggleSort(col: string) {
  if (sortBy.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortBy.value = col; sortDir.value = 'asc' }
}
function sortIcon(col: string) {
  if (sortBy.value !== col) return 'i-lucide-chevrons-up-down'
  return sortDir.value === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
}
const sortedRows = computed(() => {
  const col = sortBy.value
  return [...filteredRows.value].sort((a, b) => {
    const cmp = String(a[col] ?? '').localeCompare(String(b[col] ?? ''))
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

// Edit
function openEdit(row: any) {
  editingRow.value = { ...row }
  editDialog.value = true
}

// Pagination
const page = ref(1)
const pageSize = 50
const totalPages = computed(() => Math.ceil(sortedRows.value.length / pageSize))
const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize
  return sortedRows.value.slice(start, start + pageSize)
})
watch(search, () => { page.value = 1 })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <p v-if="!loading" class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ rows.length.toLocaleString() }} entries
        </p>
        <Button variant="ghost" size="sm" class="h-8 gap-1.5" @click="fetchLanguage">
          <Icon name="i-lucide-refresh-cw" class="size-3.5" :class="loading ? 'animate-spin' : ''" />
          <span class="text-xs hidden sm:inline">Refresh</span>
        </Button>
      </div>
    </Teleport>

    <!-- Search -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-3">
      <div class="relative max-w-[260px]">
        <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        <Input v-model="search" placeholder="Search ID, English, Arabic..." class="pl-8 h-8 text-sm" />
        <button
          v-if="search"
          class="absolute right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
          @click="search = ''"
        >
          <Icon name="i-lucide-x" class="size-2.5 text-muted-foreground" />
        </button>
      </div>
      <p class="text-xs text-muted-foreground tabular-nums">
        {{ filteredRows.length.toLocaleString() }} of {{ rows.length.toLocaleString() }}
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="flex flex-col items-center gap-4 text-muted-foreground">
        <div class="size-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
          <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-blue-500" />
        </div>
        <p class="text-sm font-medium">Loading language entries...</p>
      </div>
    </div>

    <!-- Data Table -->
    <div v-else class="flex-1 min-h-0 overflow-auto">
      <Table>
        <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
          <TableRow class="border-b-0">
            <TableHead
              class="bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors w-[200px]"
              @click="toggleSort('ID')"
            >
              <div class="flex items-center gap-1">
                ID
                <Icon :name="sortIcon('ID')" class="size-3 opacity-60" />
              </div>
            </TableHead>
            <TableHead
              class="bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors"
              @click="toggleSort('eng')"
            >
              <div class="flex items-center gap-1">
                <span class="text-base leading-none mr-0.5">🇬🇧</span> English
                <Icon :name="sortIcon('eng')" class="size-3 opacity-60" />
              </div>
            </TableHead>
            <TableHead
              class="bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors"
              @click="toggleSort('arabic')"
            >
              <div class="flex items-center gap-1">
                <span class="text-base leading-none mr-0.5">🇸🇦</span> Arabic
                <Icon :name="sortIcon('arabic')" class="size-3 opacity-60" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(row, idx) in pagedRows"
            :key="row.ID || idx"
            class="group hover:bg-muted/30 transition-colors cursor-pointer"
            @click="openEdit(row)"
          >
            <TableCell class="font-mono text-xs font-medium text-muted-foreground">
              {{ row.ID || '—' }}
            </TableCell>
            <TableCell class="text-sm">
              {{ row.eng || '—' }}
            </TableCell>
            <TableCell class="text-sm" dir="rtl">
              {{ row.arabic || '—' }}
            </TableCell>
          </TableRow>
          <TableRow v-if="pagedRows.length === 0 && !loading">
            <TableCell colspan="3" class="h-40 text-center">
              <div class="flex flex-col items-center gap-3 text-muted-foreground">
                <Icon name="i-lucide-search-x" class="size-8 text-muted-foreground/40" />
                <p class="font-medium">No matching entries</p>
                <p class="text-xs">Try adjusting your search terms.</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="shrink-0 border-t px-4 py-2 flex items-center justify-between gap-4 bg-card/50">
      <p class="text-xs text-muted-foreground tabular-nums">
        Page {{ page }} of {{ totalPages }} · {{ filteredRows.length.toLocaleString() }} entries
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

    <!-- Edit Dialog -->
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
          v-if="editDialog && editingRow"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          @click.self="editDialog = false"
        >
          <div class="w-full max-w-md mx-4 rounded-2xl border bg-card shadow-2xl overflow-hidden">
            <div class="px-6 py-5 border-b bg-gradient-to-r from-blue-500/5 to-violet-500/5">
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Icon name="i-lucide-languages" class="size-5 text-blue-500" />
                </div>
                <div>
                  <h3 class="font-semibold text-foreground">Language Entry</h3>
                  <p class="text-xs text-muted-foreground font-mono">{{ editingRow.ID }}</p>
                </div>
              </div>
            </div>
            <div class="px-6 py-5 space-y-4">
              <div>
                <label class="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <span class="text-sm">🇬🇧</span> English
                </label>
                <Input v-model="editingRow.eng" class="h-9" />
              </div>
              <div>
                <label class="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <span class="text-sm">🇸🇦</span> Arabic
                </label>
                <Input v-model="editingRow.arabic" dir="rtl" class="h-9" />
              </div>
            </div>
            <div class="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" size="sm" @click="editDialog = false">Close</Button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
