<script setup lang="ts">

const props = defineProps<{
  activeFilter: string
  companies: string[]
}>()

const emit = defineEmits<{
  'update:activeFilter': [filter: string]
}>()

const allFilters = computed(() => [
  { key: '', label: 'All Finances' },
  ...props.companies.map(c => ({
    key: c,
    label: c,
  })),
])
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Tabs bar -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
      <button
        v-for="f in allFilters"
        :key="f.key"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
        :class="activeFilter === f.key ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="emit('update:activeFilter', f.key)"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Content area -->
    <div class="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
      <slot />
    </div>
  </div>
</template>
