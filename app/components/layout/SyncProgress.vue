<script setup lang="ts">
const { syncState } = useSyncProgress()

const elapsed = ref('')
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    if (syncState.active && syncState.startedAt) {
      const sec = Math.floor((Date.now() - syncState.startedAt) / 1000)
      const m = Math.floor(sec / 60)
      const s = sec % 60
      elapsed.value = m > 0 ? `${m}m ${s}s` : `${s}s`
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const statusIcon = computed(() => {
  if (syncState.error) return 'i-lucide-alert-triangle'
  if (syncState.percent >= 100) return 'i-lucide-check-circle-2'
  return 'i-lucide-loader'
})

const statusColor = computed(() => {
  if (syncState.error) return 'text-red-500'
  if (syncState.percent >= 100) return 'text-emerald-500'
  return 'text-blue-500'
})

const barColor = computed(() => {
  if (syncState.error) return 'bg-red-500'
  if (syncState.percent >= 100) return 'bg-emerald-500'
  return 'bg-blue-500'
})
</script>

<template>
  <Transition name="sync-slide">
    <div
      v-if="syncState.active"
      class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border bg-card/80 backdrop-blur-sm shadow-sm max-w-md"
    >
      <!-- Spinner / Status icon -->
      <Icon
        :name="statusIcon"
        class="size-4 shrink-0"
        :class="[statusColor, { 'animate-spin': !syncState.error && syncState.percent < 100 }]"
      />

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5">
          <span class="text-[11px] font-semibold truncate">
            {{ syncState.currentStep + 1 }}/{{ syncState.totalSteps }}: {{ syncState.currentLabel }}
          </span>
          <span class="text-[10px] font-bold tabular-nums shrink-0" :class="statusColor">
            {{ syncState.percent }}%
          </span>
        </div>

        <!-- Progress bar -->
        <div class="h-1 bg-muted rounded-full overflow-hidden mt-1 w-full min-w-[120px]">
          <div
            class="h-full rounded-full transition-all duration-500 ease-out"
            :class="barColor"
            :style="{ width: `${syncState.percent}%` }"
          />
        </div>

        <!-- Sub info -->
        <div class="flex items-center gap-2 mt-0.5">
          <span class="text-[9px] text-muted-foreground tabular-nums">
            {{ syncState.rowsFetched.toLocaleString() }} rows
          </span>
          <span v-if="elapsed" class="text-[9px] text-muted-foreground/60 tabular-nums">
            {{ elapsed }}
          </span>
          <span v-if="syncState.error" class="text-[9px] text-red-500 truncate">
            {{ syncState.error }}
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.sync-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.sync-slide-leave-active {
  transition: all 0.3s ease-in;
}
.sync-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
.sync-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
