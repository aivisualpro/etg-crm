<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  activeFilter?: string
}>()

const emit = defineEmits<{
  'update:activeFilter': [filter: string]
}>()

const filters = [
  { key: '', label: 'All', icon: 'i-lucide-users' },
  { key: 'this-week', label: 'This Week', icon: 'i-lucide-calendar-days' },
  { key: 'this-month', label: 'This Month', icon: 'i-lucide-calendar' },
  { key: 'last-month', label: 'Last Month', icon: 'i-lucide-calendar-minus' },
  { key: 'this-quarter', label: 'This Quarter', icon: 'i-lucide-calendar-range' },
  { key: 'this-year', label: 'This Year', icon: 'i-lucide-calendar-check' },
  { key: 'last-year', label: 'Last Year', icon: 'i-lucide-calendar-clock' },
]
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Tabs bar -->
    <div v-if="activeFilter !== undefined" class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
      <button
        v-for="f in filters"
        :key="f.key"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
        :class="activeFilter === f.key ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="emit('update:activeFilter', f.key)"
      >
        <Icon :name="f.icon" class="size-3.5 shrink-0" />
        <span>{{ f.label }}</span>
      </button>
    </div>

    <!-- Content area -->
    <div class="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
      <slot />
    </div>
  </div>
</template>
