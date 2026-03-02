<script setup lang="ts">
const { setHeader } = usePageHeader()
const { vendors, init } = useDashboardStore()
init()

const search = ref('')
const activeBranch = ref('')
const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// Unique branches for tabs
const branchTabs = computed(() => {
  const branches = new Set<string>()
  for (const v of vendors.value) {
    const raw = v.Branch || ''
    raw.split(',').forEach((b: string) => { const t = b.trim(); if (t) branches.add(t) })
  }
  return Array.from(branches).sort()
})

const filteredVendors = computed(() => {
  let recs = [...vendors.value]

  // Branch tab filter
  if (activeBranch.value) {
    recs = recs.filter(v => {
      const branches = (v.Branch || '').split(',').map((b: string) => b.trim())
      return branches.includes(activeBranch.value)
    })
  }

  // Search filter
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    recs = recs.filter(v =>
      (v['Vendor Name'] || '').toLowerCase().includes(q)
      || (v.Branch || '').toLowerCase().includes(q)
      || (v['Vendor Email'] || '').toLowerCase().includes(q)
      || (v['Vendor Phone'] || '').toLowerCase().includes(q)
      || (v['Vendor Contact Person'] || '').toLowerCase().includes(q),
    )
  }

  return recs
})

watchEffect(() => {
  setHeader({ title: 'Vendors', icon: 'i-lucide-building-2', description: `${filteredVendors.value.length} vendors` })
})

const columns = [
  { key: 'Vendor Name', label: 'Vendor Name', width: '250px' },
  { key: 'Branch', label: 'Branch', width: '160px' },
  { key: 'Vendor Contact Person', label: 'Contact Person', width: '200px' },
  { key: 'Vendor Email', label: 'Email', width: '250px' },
  { key: 'Vendor Phone', label: 'Phone', width: '160px' },
]
</script>

<template>
  <div class="flex flex-col h-[calc(100dvh-54px)]">
    <!-- Teleport search to header -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[220px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input v-model="search" placeholder="Search vendors..." class="pl-8 h-8 text-sm" />
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ filteredVendors.length }} record{{ filteredVendors.length !== 1 ? 's' : '' }}
        </p>
      </div>
    </Teleport>

    <!-- Branch Tabs -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
      <button
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
        :class="!activeBranch ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="activeBranch = ''"
      >
        All Branches
        <Badge variant="secondary" class="ml-1.5 text-[9px] px-1 py-0">{{ vendors.length }}</Badge>
      </button>
      <button
        v-for="branch in branchTabs"
        :key="branch"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
        :class="activeBranch === branch ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="activeBranch = branch"
      >
        {{ branch }}
      </button>
    </div>

    <!-- Table -->
    <div class="flex-1 min-h-0 overflow-auto">
      <Table>
        <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
          <TableRow>
            <TableHead v-for="col in columns" :key="col.key" :style="{ width: col.width, minWidth: col.width }" class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {{ col.label }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(vendor, idx) in filteredVendors" :key="vendor['Row ID'] || idx" class="hover:bg-muted/30 transition-colors">
            <TableCell v-for="col in columns" :key="col.key">
              <template v-if="col.key === 'Vendor Email' && vendor[col.key]">
                <a :href="`mailto:${vendor[col.key]}`" class="text-primary hover:underline text-xs">{{ vendor[col.key] }}</a>
              </template>
              <template v-else-if="col.key === 'Vendor Phone' && vendor[col.key]">
                <a :href="`tel:${vendor[col.key]}`" class="text-primary hover:underline text-xs">{{ vendor[col.key] }}</a>
              </template>
              <template v-else-if="col.key === 'Branch' && vendor[col.key]">
                <div class="flex flex-wrap gap-1">
                  <Badge v-for="b in vendor[col.key].split(',')" :key="b" variant="outline" class="text-[9px]">{{ b.trim() }}</Badge>
                </div>
              </template>
              <template v-else>
                <span class="text-xs" :class="vendor[col.key] ? '' : 'text-muted-foreground/40'">{{ vendor[col.key] || '—' }}</span>
              </template>
            </TableCell>
          </TableRow>
          <TableRow v-if="filteredVendors.length === 0">
            <TableCell :colspan="columns.length" class="text-center py-12">
              <Icon name="i-lucide-building-2" class="size-8 text-muted-foreground/20 mb-2 mx-auto" />
              <p class="text-sm text-muted-foreground">No vendors found</p>
            </TableCell>
          </TableRow>
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
