<script setup lang="ts">
const { setHeader } = usePageHeader()
setHeader({ title: 'Finance PTO Report', icon: 'i-lucide-calculator' })
</script>

<template>
  <div class="w-full flex-1 min-h-0 overflow-auto">
    <div class="max-w-5xl mx-auto p-6 flex flex-col items-center justify-center py-24 text-center">
      <div class="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon name="i-lucide-calculator" class="size-8 text-primary" />
      </div>
      <h2 class="text-lg font-semibold mb-1">Finance PTO Report</h2>
      <p class="text-sm text-muted-foreground">Coming soon</p>
    </div>
  </div>
</template>
