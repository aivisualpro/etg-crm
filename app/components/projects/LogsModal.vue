<script setup lang="ts">
const props = defineProps<{
  projectId: string
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [val: boolean]
}>()

const logs = ref<any[]>([])
const loading = ref(false)
const expandedIdx = ref<number | null>(null)

watch(() => props.open, async (val) => {
  if (val && props.projectId) {
    loading.value = true
    expandedIdx.value = null
    try {
      const data = await $fetch<{ success: boolean, logs: any[] }>('/api/bigquery/project-logs', {
        query: { projectId: props.projectId },
      })
      if (data.success) logs.value = data.logs
    }
    catch { logs.value = [] }
    finally { loading.value = false }
  }
})

function formatDate(val: any): string {
  if (!val) return '—'
  try {
    const d = new Date(val?.value || val)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }
  catch { return String(val) }
}

// Compute diff between two log entries — highlight fields that changed
function getChanges(log: any, idx: number): { field: string, oldVal: string, newVal: string }[] {
  const next = logs.value[idx + 1] // older entry
  if (!next) return [] // oldest log, no comparison

  const changes: { field: string, oldVal: string, newVal: string }[] = []
  const skipFields = new Set(['Row ID', 'TimeStamp', 'Row Number', '_RowNumber'])

  const allKeys = new Set([...Object.keys(log), ...Object.keys(next)])
  for (const key of allKeys) {
    if (skipFields.has(key)) continue
    const newV = String(log[key]?.value ?? log[key] ?? '').trim()
    const oldV = String(next[key]?.value ?? next[key] ?? '').trim()
    if (newV !== oldV) {
      changes.push({ field: key, oldVal: oldV || '(empty)', newVal: newV || '(empty)' })
    }
  }
  return changes
}

function changeCount(idx: number): number {
  return getChanges(logs.value[idx], idx).length
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[700px] max-h-[85vh] flex flex-col p-0 gap-0">
      <!-- Header -->
      <div class="px-6 py-4 border-b shrink-0">
        <DialogHeader>
          <DialogTitle class="flex items-center gap-2.5">
            <div class="size-9 rounded-xl bg-gradient-to-br from-violet-500/15 to-indigo-500/15 flex items-center justify-center">
              <Icon name="i-lucide-history" class="size-4.5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p class="text-sm font-semibold">Change History</p>
              <p class="text-xs text-muted-foreground font-normal">Project {{ projectId }}</p>
            </div>
          </DialogTitle>
          <DialogDescription class="sr-only">Change log history for this project</DialogDescription>
        </DialogHeader>
        <div v-if="!loading" class="mt-2 flex items-center gap-2">
          <Badge variant="secondary" class="text-[10px]">{{ logs.length }} log{{ logs.length !== 1 ? 's' : '' }}</Badge>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-h-0 overflow-y-auto">
        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-16 gap-3">
          <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-muted-foreground/40" />
          <p class="text-sm text-muted-foreground">Loading change history…</p>
        </div>

        <!-- Empty -->
        <div v-else-if="logs.length === 0" class="flex flex-col items-center justify-center py-16 gap-3">
          <div class="size-12 rounded-2xl bg-muted/50 flex items-center justify-center">
            <Icon name="i-lucide-file-x" class="size-6 text-muted-foreground/30" />
          </div>
          <p class="text-sm text-muted-foreground">No change logs found</p>
        </div>

        <!-- Timeline -->
        <div v-else class="relative px-6 py-4">
          <!-- Vertical timeline line -->
          <div class="absolute left-[39px] top-6 bottom-6 w-px bg-border" />

          <div
            v-for="(log, idx) in logs"
            :key="idx"
            class="relative flex gap-4 group"
            :class="idx < logs.length - 1 ? 'pb-4' : ''"
          >
            <!-- Timeline dot -->
            <div class="shrink-0 relative z-10">
              <div
                class="size-7 rounded-full flex items-center justify-center transition-all duration-200"
                :class="idx === 0
                  ? 'bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/25'
                  : 'bg-card border-2 border-muted-foreground/20 group-hover:border-primary/40'"
              >
                <Icon
                  :name="idx === 0 ? 'i-lucide-sparkles' : 'i-lucide-pencil'"
                  class="size-3"
                  :class="idx === 0 ? 'text-white' : 'text-muted-foreground/60'"
                />
              </div>
            </div>

            <!-- Log entry -->
            <div class="flex-1 min-w-0 pb-1">
              <button
                class="w-full text-left rounded-xl border p-3 transition-all duration-200 hover:shadow-md hover:border-primary/30"
                :class="[
                  expandedIdx === idx ? 'bg-primary/[0.03] border-primary/20 shadow-sm' : 'bg-card hover:bg-muted/30',
                  idx === 0 ? 'ring-1 ring-violet-500/10' : '',
                ]"
                @click="expandedIdx = expandedIdx === idx ? null : idx"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="text-xs text-muted-foreground whitespace-nowrap">{{ formatDate(log['TimeStamp']) }}</span>
                    <Badge v-if="idx === 0" class="text-[9px] px-1.5 py-0 bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400" variant="outline">Latest</Badge>
                  </div>
                  <div class="flex items-center gap-1.5 shrink-0">
                    <Badge v-if="changeCount(idx) > 0" variant="secondary" class="text-[9px] px-1.5 py-0 tabular-nums">
                      {{ changeCount(idx) }} change{{ changeCount(idx) !== 1 ? 's' : '' }}
                    </Badge>
                    <Badge v-else-if="idx === logs.length - 1" variant="outline" class="text-[9px] px-1.5 py-0 text-emerald-600 bg-emerald-500/10 border-emerald-500/20">Initial</Badge>
                    <Icon
                      :name="expandedIdx === idx ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="size-3.5 text-muted-foreground/50 transition-transform duration-200"
                    />
                  </div>
                </div>

                <!-- Changed by info -->
                <p v-if="log['Create By'] || log['Updated By']" class="text-[11px] text-muted-foreground mt-1 truncate">
                  By {{ log['Updated By'] || log['Create By'] || '—' }}
                </p>
              </button>

              <!-- Expanded diff view -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[2000px]"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 max-h-[2000px]"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="expandedIdx === idx" class="mt-2 overflow-hidden">
                  <!-- Changes diff -->
                  <div v-if="getChanges(log, idx).length > 0" class="rounded-lg border overflow-hidden">
                    <div class="bg-muted/30 px-3 py-1.5 border-b">
                      <p class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Changes from Previous</p>
                    </div>
                    <div class="divide-y">
                      <div
                        v-for="change in getChanges(log, idx)"
                        :key="change.field"
                        class="px-3 py-2 hover:bg-muted/20 transition-colors"
                      >
                        <p class="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{{ change.field }}</p>
                        <div class="flex items-start gap-2 text-xs">
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-1 mb-0.5">
                              <div class="size-1.5 rounded-full bg-red-400 shrink-0" />
                              <span class="text-[9px] text-muted-foreground/60 uppercase">Before</span>
                            </div>
                            <p class="bg-red-500/5 text-red-700 dark:text-red-400 rounded px-2 py-1 break-all font-mono text-[11px] border border-red-500/10">{{ change.oldVal }}</p>
                          </div>
                          <Icon name="i-lucide-arrow-right" class="size-3 text-muted-foreground/40 mt-5 shrink-0" />
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-1 mb-0.5">
                              <div class="size-1.5 rounded-full bg-emerald-400 shrink-0" />
                              <span class="text-[9px] text-muted-foreground/60 uppercase">After</span>
                            </div>
                            <p class="bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 rounded px-2 py-1 break-all font-mono text-[11px] border border-emerald-500/10">{{ change.newVal }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Initial entry (no diff) -->
                  <div v-else class="rounded-lg border bg-muted/20 px-3 py-3 text-center">
                    <Icon name="i-lucide-plus-circle" class="size-4 text-emerald-500 mx-auto mb-1" />
                    <p class="text-xs text-muted-foreground">Initial record — no previous version to compare</p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
