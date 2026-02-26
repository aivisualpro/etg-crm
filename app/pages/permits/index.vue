<script setup lang="ts">
const { setHeader } = usePageHeader()
setHeader({ title: 'Permits', icon: 'i-lucide-clipboard-check' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ─── Use the global prefetched data store ───────────────────
const {
  permits,
  userNameMap,
  projectMap,
  init,
} = useDashboardStore()

// Ensure store is initialized
init()

// ─── Search ─────────────────────────────────────────────────
const search = ref('')

// ─── Stats ──────────────────────────────────────────────────
const activeCount = computed(() => permits.value.filter(p => p._source === 'active').length)
const closedCount = computed(() => permits.value.filter(p => p._source === 'closed').length)
</script>

<template>
  <div class="w-full flex-1 flex flex-col min-h-0">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2">
        <div class="relative">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50" />
          <Input
            v-model="search"
            placeholder="Search permits…"
            class="h-8 pl-8 w-[220px] text-xs"
          />
        </div>
        <Badge variant="secondary" class="text-xs h-7 px-2.5">
          {{ permits.length.toLocaleString() }} total
        </Badge>
        <Badge variant="outline" class="text-xs h-7 px-2.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          {{ activeCount }} active
        </Badge>
        <Badge variant="outline" class="text-xs h-7 px-2.5 bg-zinc-500/10 text-zinc-500 border-zinc-500/20">
          {{ closedCount }} closed
        </Badge>
      </div>
    </Teleport>

    <!-- Permits Table -->
    <PermitsTable
      :records="permits"
      :loading="false"
      :user-name-map="userNameMap"
      :project-map="projectMap"
      :show-project="true"
      :compact="false"
      :per-page="50"
      :search-query="search"
      :hide-search="true"
    />
  </div>
</template>
