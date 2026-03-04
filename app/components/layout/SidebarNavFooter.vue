<script setup lang="ts">
import { useSidebar } from '~/components/ui/sidebar'

defineProps<{
  user: {
    name: string
    email: string
    role: string
    avatar: string
  }
}>()

const { isMobile, setOpenMobile } = useSidebar()
const { logout } = useAuth()

function handleLogout() {
  logout()
}

const showModalTheme = ref(false)
</script>

<template>
  <SidebarMenu>
    <!-- Theme button in sidebar bottom -->
    <SidebarMenuItem>
      <SidebarMenuButton size="sm" @click="showModalTheme = true" class="text-muted-foreground hover:text-foreground">
        <Icon name="i-lucide-paintbrush" class="size-4" />
        <span>Theme</span>
      </SidebarMenuButton>
    </SidebarMenuItem>

    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg">
                {{ user.name.split(' ').map((n) => n[0]).join('') }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span v-if="user.role" class="truncate text-[10px] text-muted-foreground">{{ user.role }}</span>
              <span v-else class="truncate text-[10px] text-muted-foreground">{{ user.email }}</span>
            </div>
            <Icon name="i-lucide-chevrons-up-down" class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg">
                  {{ user.name.split(' ').map((n) => n[0]).join('') }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs text-muted-foreground">{{ user.email }}</span>
                <span v-if="user.role" class="truncate text-[10px] text-muted-foreground/70">{{ user.role }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <Icon name="i-lucide-log-out" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>

  <Dialog v-model:open="showModalTheme">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Customize</DialogTitle>
        <DialogDescription class="text-xs text-muted-foreground">
          Customize & Preview in Real Time
        </DialogDescription>
      </DialogHeader>
      <ThemeCustomize />
    </DialogContent>
  </Dialog>
</template>
