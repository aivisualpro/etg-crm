<script setup lang="ts">
import type { NavGroup, NavLink, NavSectionTitle } from '~/types/nav'
import type { TranslationKey } from '~/composables/useLocale'
import { navMenu, navMenuBottom } from '~/constants/menus'

function resolveNavItemComponent(item: NavLink | NavGroup | NavSectionTitle): any {
  if ('children' in item)
    return resolveComponent('LayoutSidebarNavGroup')

  return resolveComponent('LayoutSidebarNavLink')
}

const { t } = useLocale()

function getHeading(nav: { heading: string, headingKey?: string }) {
  return nav.headingKey ? t(nav.headingKey as TranslationKey) : nav.heading
}

const teams: {
  name: string
  logo: string
  plan: string
}[] = [
  {
    name: 'ETG CRM',
    logo: 'i-lucide-gallery-vertical-end',
    plan: 'Enterprise',
  },
  {
    name: 'Full Stack CRM',
    logo: 'i-lucide-audio-waveform',
    plan: 'Professional',
  },
  {
    name: 'Demo Workspace',
    logo: 'i-lucide-command',
    plan: 'Free',
  },
]

const { user: authUser } = useAuth()
const store = useDashboardStore()
store.init()
const { resolve: resolveLang } = useAppLanguage()

const userRole = computed(() => {
  const email = (authUser.value?.email || '').toLowerCase()
  if (!email) return ''
  const found = store.users.value.find((u: any) => (u.Email || '').toLowerCase() === email)
  if (!found) return ''
  // Use the raw A200 code for language-aware resolution
  const rawCode = found.A200_raw || found.A200
  return rawCode ? resolveLang(rawCode) : ''
})

const user = computed(() => ({
  name: authUser.value?.name || 'User',
  email: authUser.value?.email || '',
  role: userRole.value,
  avatar: authUser.value?.picture || '/avatars/default.png',
}))

const { sidebar } = useAppSettings()

// Language switcher
const { lang: appLang, setLang, init: initLang } = useAppLanguage()
initLang()

function setAppLang(l: 'en' | 'ar') {
  setLang(l)
}
</script>

<template>
  <Sidebar :collapsible="sidebar?.collapsible" :side="sidebar?.side" :variant="sidebar?.variant">
    <SidebarHeader>
      <LayoutSidebarNavHeader :teams="teams" />
      <Search />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-for="(nav, indexGroup) in navMenu" :key="indexGroup">
        <SidebarGroupLabel v-if="nav.heading">
          {{ getHeading(nav) }}
        </SidebarGroupLabel>
        <component :is="resolveNavItemComponent(item)" v-for="(item, index) in nav.items" :key="index" :item="item" />
      </SidebarGroup>
      <SidebarGroup class="mt-auto">
        <!-- Language toggle -->
        <div class="px-3 py-2">
          <div class="relative flex rounded-lg bg-muted/60 p-1 ring-1 ring-border/40">
            <!-- Sliding indicator -->
            <div
              class="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-card shadow-sm ring-1 ring-border/50 transition-all duration-300 ease-out"
              :class="appLang === 'ar' ? 'left-[calc(50%+2px)]' : 'left-1'"
            />
            <button
              class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
              :class="appLang === 'en' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'"
              @click="setAppLang('en')"
            >
              <span class="text-base leading-none">🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              class="relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
              :class="appLang === 'ar' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'"
              @click="setAppLang('ar')"
            >
              <span class="text-base leading-none">🇸🇦</span>
              <span>AR</span>
            </button>
          </div>
        </div>
        <component :is="resolveNavItemComponent(item)" v-for="(item, index) in navMenuBottom" :key="index" :item="item" size="sm" />
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <LayoutSidebarNavFooter :user="user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
