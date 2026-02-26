<script setup lang="ts">
const { setHeader } = usePageHeader()
setHeader({ title: 'Payments', icon: 'i-lucide-credit-card' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

const {
  payments,
  userNameMap,
  projectMap,
  init,
} = useDashboardStore()
init()

const search = ref('')

const totalAmount = computed(() =>
  payments.value.reduce((sum, p) => sum + (Number(p.Amount) || 0), 0),
)
</script>

<template>
  <div class="w-full flex-1 flex flex-col min-h-0">
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2">
        <div class="relative">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50" />
          <Input v-model="search" placeholder="Search payments…" class="h-8 pl-8 w-[220px] text-xs" />
        </div>
        <Badge variant="secondary" class="text-xs h-7 px-2.5">
          {{ payments.length.toLocaleString() }} records
        </Badge>
        <Badge variant="outline" class="text-xs h-7 px-2.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
          {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalAmount) }} total
        </Badge>
      </div>
    </Teleport>

    <PaymentsTable
      :records="payments"
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
