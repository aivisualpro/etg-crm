<script setup lang="ts">
const { setHeader } = usePageHeader()
setHeader({ title: 'Notes', icon: 'i-lucide-sticky-note' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ─── Use the global prefetched data store ───────────────────
const {
  notes,
  userNameMap,
  projectMap,
  customerNameMap,
  init,
} = useDashboardStore()

// Ensure store is initialized
init()

// ─── Search ─────────────────────────────────────────────────
const search = ref('')

// ─── Stats ──────────────────────────────────────────────────
const activeCount = computed(() => notes.value.filter(n => n._source === 'active').length)
const closedCount = computed(() => notes.value.filter(n => n._source === 'closed').length)
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
            placeholder="Search notes…"
            class="h-8 pl-8 w-[220px] text-xs"
          />
        </div>
        <Badge variant="secondary" class="text-xs h-7 px-2.5">
          {{ notes.length.toLocaleString() }} total
        </Badge>
        <Badge variant="outline" class="text-xs h-7 px-2.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          {{ activeCount }} active
        </Badge>
        <Badge variant="outline" class="text-xs h-7 px-2.5 bg-zinc-500/10 text-zinc-500 border-zinc-500/20">
          {{ closedCount }} closed
        </Badge>
      </div>
    </Teleport>

    <!-- Notes Table -->
    <NotesTable
      :records="notes"
      :loading="false"
      :user-name-map="userNameMap"
      :project-map="projectMap"
      :customer-map="customerNameMap"
      :show-project="true"
      :compact="false"
      :per-page="50"
      :search-query="search"
      :hide-search="true"
    />
  </div>
</template>
