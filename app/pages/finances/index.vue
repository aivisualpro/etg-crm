<script setup lang="ts">
const { setHeader } = usePageHeader()
setHeader({ title: 'Finances', icon: 'i-lucide-banknote' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ─── Use global prefetched store ────────────────────────────
const {
  finance: financeRecords,
  userNameMap,
  projectMap,
  customerNameMap,
  init,
} = useDashboardStore()
init()

// ─── State ──────────────────────────────────────────────────
const search = ref('')
const activeFilter = ref('')

// ─── Unique companies ───────────────────────────────────────
const companies = computed(() => {
  const set = new Set<string>()
  for (const r of financeRecords.value) {
    const c = r['Finance Company']
    if (c) set.add(c)
  }
  return Array.from(set).sort()
})

// ─── Filtered by sidebar ────────────────────────────────────
const filteredRecords = computed(() => {
  if (!activeFilter.value) return financeRecords.value
  return financeRecords.value.filter(r => r['Finance Company'] === activeFilter.value)
})
</script>

<template>
  <FinancesLayout :active-filter="activeFilter" :companies="companies" @update:active-filter="activeFilter = $event">
    <div class="w-full flex-1 flex flex-col min-h-0">
      <!-- Toolbar -->
      <Teleport v-if="isMounted" to="#header-toolbar">
        <div class="flex items-center gap-2">
          <div class="relative">
            <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50" />
            <Input
              v-model="search"
              placeholder="Search finances…"
              class="h-8 pl-8 w-[220px] text-xs"
            />
          </div>
          <Badge variant="secondary" class="text-xs h-7 px-2.5">
            {{ filteredRecords.length.toLocaleString() }} records
          </Badge>
        </div>
      </Teleport>

      <!-- Shared Finance Table Component -->
      <FinancesTable
        :records="filteredRecords"
        :loading="false"
        :user-name-map="userNameMap"
        :project-map="projectMap"
        :customer-name-map="customerNameMap"
        :show-project="true"
        :compact="false"
        :per-page="50"
        :search-query="search"
      />
    </div>
  </FinancesLayout>
</template>
