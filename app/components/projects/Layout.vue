<script setup lang="ts">
defineProps<{
  hideSidebar?: boolean
}>()
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex flex-col overflow-hidden">
    <slot />
  </div>
</template>
