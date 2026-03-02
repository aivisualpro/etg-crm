<script setup lang="ts">
const props = defineProps<{
  roles?: string[]
  activeRole?: string
}>()

const emit = defineEmits<{
  'update:activeRole': [role: string]
}>()

const route = useRoute()

const staticTabs = [
  { key: '', label: 'All Users', href: '/admin/users' },
]
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col">
    <!-- Horizontal tabs bar -->
    <div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
      <!-- Static tabs -->
      <NuxtLink
        v-for="tab in staticTabs"
        :key="tab.key"
        :to="tab.href"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
        :class="route.path === tab.href && !activeRole ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="emit('update:activeRole', '')"
      >
        {{ tab.label }}
      </NuxtLink>

      <!-- Separator -->
      <div v-if="roles && roles.length > 0" class="w-px h-5 bg-border shrink-0 mx-1" />

      <!-- Role filter tabs -->
      <button
        v-for="role in roles"
        :key="role"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
        :class="activeRole === role ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'"
        @click="emit('update:activeRole', activeRole === role ? '' : role)"
      >
        {{ role }}
      </button>
    </div>

    <!-- Content area -->
    <div class="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
      <slot />
    </div>
  </div>
</template>
