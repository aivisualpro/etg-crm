<script setup lang="ts">
/**
 * Furniture layout wrapper — shows sub-sidebar + child page content.
 * All /admin/furniture/* routes render inside this layout.
 */
</script>

<template>
  <div class="flex flex-1 min-h-0 -m-4 overflow-hidden">
    <!-- Sub-sidebar with accordion tree -->
    <FurnitureSidebar />

    <!-- Page content (child route) -->
    <div class="flex-1 min-h-0 flex flex-col overflow-hidden">
      <NuxtPage />
    </div>
  </div>
</template>
