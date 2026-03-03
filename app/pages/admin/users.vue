<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Users', icon: 'i-lucide-user-cog' })

// ─── State ──────────────────────────────────────────────────
const search = ref('')
const CHUNK_SIZE = 30
const visibleCount = ref(CHUNK_SIZE)
const activeRole = ref('')
const syncing = ref(false)

// Teleport mount check
const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// ─── Use global prefetched store ────────────────────────────
const { users, init, refresh } = useDashboardStore()
init()

// ─── Column Mapping (AppSheet code → Language label) ────────
// Based on etgLanguage table: ID → eng
const columnDefs = [
  { key: 'A2', label: 'User', width: '180px' },
  { key: 'A200', label: 'Role', width: '130px' },
  { key: 'A201', label: 'Phone', width: '140px' },
  { key: 'A203', label: 'Preferred Language', width: '140px' },
  { key: 'Status', label: 'Status', width: '100px' },
  { key: 'A7', label: 'Level 1', width: '140px' },
  { key: 'A8', label: 'Level 2', width: '140px' },
  { key: 'A9', label: 'Level 3', width: '140px' },
  { key: 'A209', label: 'Home', width: '130px' },
  { key: 'A205', label: 'Module Permissions', width: '160px' },
  { key: 'A206', label: 'Furniture Control', width: '130px' },
  { key: 'A207', label: 'Equipment Control', width: '130px' },
  { key: 'A208', label: 'Vehicles Control', width: '130px' },
  { key: 'A84', label: 'Language', width: '100px' },
]

// ─── Sync from AppSheet ─────────────────────────────────────
async function syncUsers() {
  syncing.value = true
  try {
    const data = await $fetch<{ success: boolean, count: number, message: string }>('/api/bigquery/sync-users', { method: 'POST' })
    toast.success(data.message || `Synced ${data.count} users`)
    await refresh()
  }
  catch (e: any) {
    toast.error(e.data?.statusMessage || 'Sync failed')
  }
  finally {
    syncing.value = false
  }
}

// ─── Sorting ───────────────────────────────────────────────
const sortBy = ref('A2')
const sortDir = ref<'asc' | 'desc'>('asc')

function toggleSort(col: string) {
  if (sortBy.value === col) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else { sortBy.value = col; sortDir.value = 'asc' }
}

function sortIcon(col: string) {
  if (sortBy.value !== col) return 'i-lucide-chevrons-up-down'
  return sortDir.value === 'asc' ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'
}

// ─── Computed ───────────────────────────────────────────────
// Extract unique roles from A200 field
const uniqueRoles = computed(() => {
  const rolesSet = new Set<string>()
  users.value.forEach((u: any) => {
    if (u.A200) rolesSet.add(u.A200)
  })
  return [...rolesSet].sort()
})

const filteredUsers = computed(() => {
  let result = users.value

  // Filter by active role (A200)
  if (activeRole.value) {
    result = result.filter((u: any) => u.A200 === activeRole.value)
  }

  // Filter by search
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter((u: any) => {
      return [u.A2, u.A200, u.A201, u.Status, u.A7, u.A8, u.A9]
        .filter(Boolean)
        .some(val => String(val).toLowerCase().includes(q))
    })
  }

  return result
})

const sortedUsers = computed(() => {
  const arr = [...filteredUsers.value]
  const col = sortBy.value
  return arr.sort((a, b) => {
    const av = String(a[col] ?? '').toLowerCase()
    const bv = String(b[col] ?? '').toLowerCase()
    const cmp = av.localeCompare(bv)
    return sortDir.value === 'asc' ? cmp : -cmp
  })
})

const visibleUsers = computed(() => sortedUsers.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < sortedUsers.value.length)

watch(search, () => { visibleCount.value = CHUNK_SIZE })
watch(activeRole, () => { visibleCount.value = CHUNK_SIZE })

// Infinite scroll
const sentinelRef = ref<HTMLElement | null>(null)
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && hasMore.value) {
        visibleCount.value += CHUNK_SIZE
      }
    },
    { threshold: 0.1 },
  )
  watch(sentinelRef, (el) => {
    if (el) observer.observe(el)
  }, { immediate: true })
  onUnmounted(() => observer.disconnect())
})

// ─── Helpers ────────────────────────────────────────────────
function getInitials(name?: string): string {
  if (!name) return '??'
  const parts = name.trim().split(/\s+/)
  return parts.map(p => p[0]).slice(0, 2).join('').toUpperCase()
}

function statusColor(status?: string) {
  const s = (status || '').toLowerCase()
  if (s === 'active' || s === 'true') return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
  if (s === 'inactive' || s === 'false') return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
  return 'bg-muted text-muted-foreground'
}

function statusLabel(status?: string) {
  const s = (status || '').toLowerCase()
  if (s === 'active' || s === 'true') return 'Active'
  if (s === 'inactive' || s === 'false') return 'Inactive'
  return status || '—'
}

// Resolve language/role codes to readable labels from etgLanguage
// For now, we display raw values; the language API can enhance this later
function cellValue(row: any, key: string): string {
  const val = row[key]
  if (val === null || val === undefined || val === '') return '—'
  return String(val)
}
</script>

<template>
  <AdminLayout :roles="uniqueRoles" v-model:active-role="activeRole">
    <div class="w-full flex-1 flex flex-col min-h-0">
      <!-- Teleport search + actions to header -->
      <Teleport v-if="isMounted" to="#header-toolbar">
        <div class="flex items-center gap-2 w-full justify-end">
          <div class="relative max-w-[220px]">
            <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input v-model="search" placeholder="Search users..." class="pl-8 h-8 text-sm" />
          </div>
          <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
            {{ filteredUsers.length }} record{{ filteredUsers.length !== 1 ? 's' : '' }}
          </p>
          <Button variant="ghost" size="sm" class="h-8" :disabled="syncing" @click="syncUsers()">
            <Icon
              name="i-lucide-refresh-cw"
              class="size-3.5"
              :class="syncing ? 'animate-spin' : ''"
            />
            <span v-if="syncing" class="ml-1 text-xs">Syncing...</span>
          </Button>
        </div>
      </Teleport>

      <!-- Data Table -->
      <div class="flex-1 min-h-0 overflow-auto">
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
            <TableRow class="border-b-0">
              <TableHead
                v-for="col in columnDefs"
                :key="col.key"
                class="bg-card cursor-pointer select-none whitespace-nowrap"
                :style="{ minWidth: col.width }"
                @click="toggleSort(col.key)"
              >
                <div class="flex items-center gap-1">
                  {{ col.label }}
                  <Icon :name="sortIcon(col.key)" class="size-3 opacity-60" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="(user, idx) in visibleUsers"
              :key="user.A2 || idx"
              class="group"
            >
              <TableCell v-for="col in columnDefs" :key="col.key">
                <!-- User name with avatar -->
                <template v-if="col.key === 'A2'">
                  <div class="flex items-center gap-2">
                    <Avatar class="size-7 border shrink-0">
                      <AvatarFallback class="text-[10px] font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300">
                        {{ getInitials(user.A2) }}
                      </AvatarFallback>
                    </Avatar>
                    <span class="font-medium">{{ user.A2 || '—' }}</span>
                  </div>
                </template>

                <!-- Role badge -->
                <template v-else-if="col.key === 'A200'">
                  <Badge v-if="user.A200" variant="outline" class="bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]">
                    {{ user.A200 }}
                  </Badge>
                  <span v-else class="text-muted-foreground">—</span>
                </template>

                <!-- Status badge -->
                <template v-else-if="col.key === 'Status'">
                  <Badge variant="outline" :class="statusColor(user.Status)" class="text-[10px]">
                    {{ statusLabel(user.Status) }}
                  </Badge>
                </template>

                <!-- Default text -->
                <template v-else>
                  <span class="text-sm whitespace-nowrap">{{ cellValue(user, col.key) }}</span>
                </template>
              </TableCell>
            </TableRow>

            <!-- Empty State -->
            <TableRow v-if="visibleUsers.length === 0">
              <TableCell :colspan="columnDefs.length" class="h-32 text-center">
                <div class="flex flex-col items-center gap-2 text-muted-foreground">
                  <Icon name="i-lucide-inbox" class="size-8" />
                  <p>No users found</p>
                </div>
              </TableCell>
            </TableRow>

            <!-- Infinite scroll sentinel -->
            <tr v-if="hasMore" ref="sentinelRef">
              <td :colspan="columnDefs.length" class="h-10 text-center text-xs text-muted-foreground">
                Loading more…
              </td>
            </tr>
          </TableBody>
        </Table>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
:deep([data-slot="table-container"]) {
  overflow: visible !important;
}
</style>
