<script setup lang="ts">
const { setHeader } = usePageHeader()
setHeader({ title: 'Tickets', icon: 'i-lucide-ticket' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

const {
  tickets,
  userNameMap,
  projectMap,
  init,
} = useDashboardStore()
init()

const search = ref('')

const openCount = computed(() => tickets.value.filter(t => (t.Status || '').toUpperCase() === 'OPEN').length)
const closedCount = computed(() => tickets.value.filter(t => (t.Status || '').toUpperCase() === 'CLOSED').length)
</script>

<template>
  <div class="w-full flex-1 flex flex-col min-h-0">
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2">
        <div class="relative">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50" />
          <Input v-model="search" placeholder="Search tickets…" class="h-8 pl-8 w-[220px] text-xs" />
        </div>
        <Badge variant="secondary" class="text-xs h-7 px-2.5">
          {{ tickets.length.toLocaleString() }} total
        </Badge>
        <Badge v-if="openCount" variant="outline" class="text-xs h-7 px-2.5 bg-amber-500/10 text-amber-600 border-amber-500/20">
          {{ openCount }} open
        </Badge>
        <Badge v-if="closedCount" variant="outline" class="text-xs h-7 px-2.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          {{ closedCount }} closed
        </Badge>
      </div>
    </Teleport>

    <TicketsTable
      :records="tickets"
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
