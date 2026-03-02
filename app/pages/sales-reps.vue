<script setup lang="ts">
const { setHeader } = usePageHeader()
const { salesReps, vendors, init } = useDashboardStore()
init()

const search = ref('')
const activeVendorTab = ref('')
const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// Build vendor ID → name map for fast lookups
const vendorMap = computed(() => {
  const map: Record<string, string> = {}
  for (const v of vendors.value) {
    if (v['Row ID']) map[v['Row ID']] = v['Vendor Name'] || v['Row ID']
  }
  return map
})

// Resolve comma-separated vendor IDs to names
function resolveVendors(raw: string): string[] {
  if (!raw) return []
  return raw.split(',').map(id => {
    const trimmed = id.trim()
    return vendorMap.value[trimmed] || trimmed
  }).filter(Boolean)
}

function resolveVendorDisplay(raw: string): string {
  const names = resolveVendors(raw)
  return names.length ? names.join(', ') : '—'
}

// Unique vendor names for tabs (resolved from all sales reps)
const vendorTabs = computed(() => {
  const names = new Set<string>()
  for (const rep of salesReps.value) {
    for (const name of resolveVendors(rep.Vendor)) {
      names.add(name)
    }
  }
  return Array.from(names).sort()
})

// Filter by vendor tab + search
const filteredReps = computed(() => {
  let recs = [...salesReps.value]

  // Vendor tab filter
  if (activeVendorTab.value) {
    recs = recs.filter(r => resolveVendors(r.Vendor).includes(activeVendorTab.value))
  }

  // Search filter
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    recs = recs.filter(r =>
      (r['First Name'] || '').toLowerCase().includes(q)
      || (r['Last Name'] || '').toLowerCase().includes(q)
      || (r.Email || '').toLowerCase().includes(q)
      || (r.Phone || '').toLowerCase().includes(q)
      || resolveVendorDisplay(r.Vendor).toLowerCase().includes(q),
    )
  }

  return recs
})

watchEffect(() => {
  setHeader({ title: 'Sales Reps', icon: 'i-lucide-user-round-search', description: `${filteredReps.value.length} reps` })
})

const columns = [
  { key: 'First Name', label: 'First Name', width: '160px' },
  { key: 'Last Name', label: 'Last Name', width: '160px' },
  { key: 'Email', label: 'Email', width: '280px' },
  { key: 'Phone', label: 'Phone', width: '160px' },
  { key: 'Vendor', label: 'Vendor', width: '' },
]
</script>

<template>
  <div class="flex flex-col h-[calc(100dvh-54px)]">
    <!-- Teleport search to header -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[220px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input v-model="search" placeholder="Search sales reps..." class="pl-8 h-8 text-sm" />
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ filteredReps.length }} record{{ filteredReps.length !== 1 ? 's' : '' }}
        </p>
      </div>
    </Teleport>

    <!-- Vendor Tabs -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
      <button
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
        :class="!activeVendorTab ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="activeVendorTab = ''"
      >
        All Vendors
        <Badge variant="secondary" class="ml-1.5 text-[9px] px-1 py-0">{{ salesReps.length }}</Badge>
      </button>
      <button
        v-for="vendor in vendorTabs"
        :key="vendor"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
        :class="activeVendorTab === vendor ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="activeVendorTab = vendor"
      >
        {{ vendor }}
      </button>
    </div>

    <!-- Table -->
    <div class="flex-1 min-h-0 overflow-auto">
      <Table>
        <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
          <TableRow>
            <TableHead v-for="col in columns" :key="col.key" :style="col.width ? { width: col.width, minWidth: col.width } : {}" class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {{ col.label }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(rep, idx) in filteredReps" :key="rep['Row ID'] || idx" class="hover:bg-muted/30 transition-colors">
            <TableCell v-for="col in columns" :key="col.key">
              <template v-if="col.key === 'Email' && rep.Email">
                <a :href="`mailto:${rep.Email}`" class="text-primary hover:underline text-xs">{{ rep.Email }}</a>
              </template>
              <template v-else-if="col.key === 'Phone' && rep.Phone">
                <a :href="`tel:${rep.Phone}`" class="text-primary hover:underline text-xs">{{ rep.Phone }}</a>
              </template>
              <template v-else-if="col.key === 'Vendor'">
                <div class="flex flex-wrap gap-1">
                  <Badge v-for="name in resolveVendors(rep.Vendor)" :key="name" variant="outline" class="text-[10px]">{{ name }}</Badge>
                  <span v-if="!resolveVendors(rep.Vendor).length" class="text-muted-foreground/40 text-xs">—</span>
                </div>
              </template>
              <template v-else>
                <span class="text-xs font-medium" :class="rep[col.key] ? '' : 'text-muted-foreground/40'">{{ rep[col.key] || '—' }}</span>
              </template>
            </TableCell>
          </TableRow>
          <TableRow v-if="filteredReps.length === 0">
            <TableCell :colspan="columns.length" class="text-center py-12">
              <Icon name="i-lucide-user-round-search" class="size-8 text-muted-foreground/20 mb-2 mx-auto" />
              <p class="text-sm text-muted-foreground">No sales reps found</p>
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
