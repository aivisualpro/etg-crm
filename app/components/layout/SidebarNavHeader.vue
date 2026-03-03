<script setup lang="ts">
defineProps<{
  teams: { name: string, logo: string, plan: string }[]
}>()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" as-child>
        <NuxtLink to="/" class="flex items-center gap-2 group/brand">
          <div class="aspect-square size-8 flex items-center justify-center rounded-lg overflow-hidden ring-1 ring-border/50 shadow-sm group-hover/brand:shadow-md group-hover/brand:ring-primary/20 transition-all duration-300">
            <img src="/logo-192.png" alt="ETG CRM" class="size-8 object-cover group-hover/brand:scale-105 transition-transform duration-300" />
          </div>
          <div class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <div class="flex items-center gap-1.5">
              <span class="truncate font-bold tracking-tight">ETG CRM</span>
              <span class="text-[8px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full leading-none">v1.0</span>
            </div>
            <span class="text-[10px] text-muted-foreground truncate">Enterprise Platform</span>
          </div>
        </NuxtLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
