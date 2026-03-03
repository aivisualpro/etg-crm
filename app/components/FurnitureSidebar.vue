<script setup lang="ts">
/**
 * Sub-sidebar for Furniture pages.
 * Shows hierarchical accordion: All → A7 → A8 → A9
 */
const route = useRoute()

interface TreeNode {
  count: number
  children: Record<string, { count: number, children: Record<string, number> }>
}

// Fetch tree data
const { data: treeData } = await useFetch<{
  success: boolean
  total: number
  tree: Record<string, TreeNode>
}>('/api/bigquery/furniture-tree')

// Fetch level1 labels
const level1Map = ref<Record<string, string>>({})
async function fetchLevel1() {
  try {
    const data = await $fetch<{ success: boolean, level1: any[] }>('/api/bigquery/levels')
    if (data.success && data.level1) {
      for (const r of data.level1) {
        if (r.A7) level1Map.value[r.A7] = r.eng || r.arabic || r.A7
      }
    }
  }
  catch { /* ignore */ }
}
fetchLevel1()

function getLabel(key: string): string {
  return level1Map.value[key] || key
}

const total = computed(() => treeData.value?.total || 0)
const tree = computed(() => treeData.value?.tree || {})

// Sorted A7 keys by count desc
const a7Keys = computed(() =>
  Object.entries(tree.value)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([key]) => key),
)

// Track open accordion states
const openA7 = ref<Record<string, boolean>>({})
const openA8 = ref<Record<string, boolean>>({})

// Auto-open based on route
watch(() => route.path, (path) => {
  const parts = path.replace('/admin/furniture/', '').split('/')
  if (parts[0] && parts[0] !== '') openA7.value[parts[0]] = true
  if (parts[0] && parts[1]) openA8.value[`${parts[0]}/${parts[1]}`] = true
}, { immediate: true })

function isActive(path: string): boolean {
  return route.path === path || route.path === path + '/'
}

function toggleA7(key: string) {
  openA7.value[key] = !openA7.value[key]
}

function toggleA8(key: string) {
  openA8.value[key] = !openA8.value[key]
}
</script>

<template>
  <div class="w-56 shrink-0 border-r bg-card/50 overflow-y-auto flex flex-col">
    <!-- Header -->
    <div class="px-3 py-3 border-b">
      <h3 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Furniture</h3>
    </div>

    <nav class="flex-1 overflow-y-auto py-1.5 space-y-0.5 text-sm">
      <!-- All -->
      <NuxtLink
        to="/admin/furniture"
        class="flex items-center gap-2 px-3 py-1.5 rounded-md mx-1.5 transition-colors"
        :class="isActive('/admin/furniture') ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'"
      >
        <Icon name="i-lucide-layers" class="size-3.5 shrink-0" />
        <span class="truncate">All</span>
        <span class="ml-auto text-[10px] tabular-nums opacity-70">{{ total.toLocaleString() }}</span>
      </NuxtLink>

      <!-- A7 Level 1 accordion -->
      <div v-for="a7 in a7Keys" :key="a7" class="mx-1.5">
        <!-- A7 trigger -->
        <button
          class="w-full flex items-center gap-1.5 px-3 py-1.5 rounded-md text-left transition-colors"
          :class="route.path.includes(`/admin/furniture/${a7}`) ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'"
          @click="toggleA7(a7)"
        >
          <Icon
            name="i-lucide-chevron-right"
            class="size-3 shrink-0 transition-transform duration-200"
            :class="openA7[a7] ? 'rotate-90' : ''"
          />
          <Icon name="i-lucide-building-2" class="size-3.5 shrink-0" />
          <span class="truncate text-xs">{{ getLabel(a7) }}</span>
          <span class="ml-auto text-[10px] tabular-nums opacity-50">{{ tree[a7]?.count.toLocaleString() }}</span>
        </button>

        <!-- A7 link (view all for this A7) -->
        <NuxtLink
          v-if="openA7[a7]"
          :to="`/admin/furniture/${a7}`"
          class="flex items-center gap-1.5 pl-8 pr-3 py-1 rounded-md text-xs transition-colors"
          :class="isActive(`/admin/furniture/${a7}`) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
        >
          <Icon name="i-lucide-list" class="size-3 shrink-0" />
          <span>All</span>
        </NuxtLink>

        <!-- A8 Level 2 children -->
        <div v-if="openA7[a7]" class="space-y-0.5">
          <div v-for="(a8Data, a8Key) in tree[a7]?.children" :key="a8Key">
            <button
              class="w-full flex items-center gap-1.5 pl-7 pr-3 py-1 rounded-md text-left text-xs transition-colors"
              :class="route.path.includes(`/admin/furniture/${a7}/${a8Key}`) ? 'text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
              @click="toggleA8(`${a7}/${a8Key}`)"
            >
              <Icon
                name="i-lucide-chevron-right"
                class="size-2.5 shrink-0 transition-transform duration-200"
                :class="openA8[`${a7}/${a8Key}`] ? 'rotate-90' : ''"
              />
              <span class="truncate">{{ a8Key }}</span>
              <span class="ml-auto text-[10px] tabular-nums opacity-50">{{ a8Data.count.toLocaleString() }}</span>
            </button>

            <!-- A8 "All" link -->
            <NuxtLink
              v-if="openA8[`${a7}/${a8Key}`]"
              :to="`/admin/furniture/${a7}/${a8Key}`"
              class="flex items-center gap-1.5 pl-12 pr-3 py-1 rounded-md text-xs transition-colors"
              :class="isActive(`/admin/furniture/${a7}/${a8Key}`) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
            >
              <Icon name="i-lucide-list" class="size-3 shrink-0" />
              <span>All</span>
            </NuxtLink>

            <!-- A9 Level 3 children -->
            <div v-if="openA8[`${a7}/${a8Key}`]" class="space-y-0.5">
              <NuxtLink
                v-for="(a9Count, a9Key) in a8Data.children"
                :key="a9Key"
                :to="`/admin/furniture/${a7}/${a8Key}/${a9Key}`"
                class="flex items-center gap-1.5 pl-14 pr-3 py-1 rounded-md text-xs transition-colors"
                :class="isActive(`/admin/furniture/${a7}/${a8Key}/${a9Key}`) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
              >
                <span class="truncate">{{ a9Key }}</span>
                <span class="ml-auto text-[10px] tabular-nums opacity-50">{{ a9Count.toLocaleString() }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
