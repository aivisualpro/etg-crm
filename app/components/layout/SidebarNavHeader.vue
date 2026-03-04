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
          <div class="logo-shine-wrapper">
            <div class="logo-shine-border" />
            <div class="logo-shine-content">
              <img src="/logo-192.png" alt="ETG CRM" class="size-8 object-cover group-hover/brand:scale-105 transition-transform duration-300" />
            </div>
          </div>
          <div class="grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden">
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

<style scoped>
.logo-shine-wrapper {
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.logo-shine-border {
  position: absolute;
  inset: -1.5px;
  border-radius: 0.6rem;
  background: conic-gradient(
    from var(--shine-angle, 0deg),
    transparent 0%,
    transparent 70%,
    hsl(var(--primary) / 0.6) 78%,
    hsl(var(--primary) / 0.9) 82%,
    white 85%,
    hsl(var(--primary) / 0.9) 88%,
    hsl(var(--primary) / 0.6) 92%,
    transparent 100%
  );
  animation: shine-rotate 3s linear infinite;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.group\/brand:hover .logo-shine-border {
  opacity: 1;
  animation-duration: 2s;
}

.logo-shine-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  background: hsl(var(--background));
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes shine-rotate {
  from {
    --shine-angle: 0deg;
  }
  to {
    --shine-angle: 360deg;
  }
}

@property --shine-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
</style>
