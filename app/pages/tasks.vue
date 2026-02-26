<script setup lang="ts">
const { setHeader } = usePageHeader()
setHeader({ title: 'Tasks', icon: 'i-lucide-calendar-check-2' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ─── Use global prefetched store ────────────────────────────
const {
  tasks,
  userNameMap,
  projectMap,
  init,
} = useDashboardStore()
init()

// ─── Search ─────────────────────────────────────────────────
const search = ref('')

// ─── Stats ──────────────────────────────────────────────────
const pendingCount = computed(() => tasks.value.filter(t => (t.Status || '').toLowerCase() === 'pending').length)
const completedCount = computed(() => tasks.value.filter(t => ['completed', 'done', 'closed'].some(s => (t.Status || '').toLowerCase().includes(s))).length)
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
            placeholder="Search tasks…"
            class="h-8 pl-8 w-[220px] text-xs"
          />
        </div>
        <Badge variant="secondary" class="text-xs h-7 px-2.5">
          {{ tasks.length.toLocaleString() }} total
        </Badge>
        <Badge variant="outline" class="text-xs h-7 px-2.5 bg-amber-500/10 text-amber-600 border-amber-500/20">
          {{ pendingCount }} pending
        </Badge>
        <Badge variant="outline" class="text-xs h-7 px-2.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          {{ completedCount }} completed
        </Badge>
      </div>
    </Teleport>

    <!-- Tasks Table -->
    <TasksBqTable
      :records="tasks"
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
