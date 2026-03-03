import type { NavMenu, NavMenuItems } from '~/types/nav'

export const navMenu: NavMenu[] = [
  {
    heading: 'General',
    headingKey: 'nav.general',
    items: [
      {
        title: 'Home',
        titleKey: 'nav.dashboard',
        icon: 'i-lucide-layout-dashboard',
        link: '/',
      },
    ],
  },
  {
    heading: 'Administration',
    headingKey: 'nav.administration',
    items: [
      {
        title: 'Users',
        titleKey: 'nav.users',
        icon: 'i-lucide-user-cog',
        link: '/admin/users',
      },
      {
        title: 'Entities',
        icon: 'i-lucide-building-2',
        link: '/admin/entities',
      },
      {
        title: 'Roles & Permissions',
        titleKey: 'nav.rolesPermissions',
        icon: 'i-lucide-shield-check',
        link: '/admin/roles',
      },
    ],
  },
  {
    heading: 'Project Management',
    headingKey: 'nav.projectManagement',
    items: [
      {
        title: 'Customers',
        titleKey: 'nav.customers',
        icon: 'i-lucide-users',
        link: '/customers',
      },
      {
        title: 'Projects',
        titleKey: 'nav.projects',
        icon: 'i-lucide-folder-kanban',
        children: [
          {
            title: 'All Projects',
            link: '/projects/all-projects',
          },
          {
            title: 'Open Projects',
            link: '/projects/my-open',
          },
          {
            title: 'Closed Projects',
            link: '/projects/my-closed',
          },
          {
            title: 'Cancelled Projects',
            link: '/projects/my-cancelled',
          },
        ],
      },
      {
        title: 'Permits',
        icon: 'i-lucide-clipboard-check',
        link: '/permits',
      },
    ],
  },
  // Kanban Board hidden from sidebar — component preserved at /kanban
  {
    heading: 'Reports',
    headingKey: 'nav.reports',
    items: [
      {
        title: 'General',
        icon: 'i-lucide-clipboard-list',
        link: '/reports/general',
      },
      {
        title: 'PM Weekly',
        icon: 'i-lucide-calendar-range',
        link: '/reports/pm-weekly',
      },
    ],
  },
]

export const navMenuBottom: NavMenuItems = [
  {
    title: 'Support',
    icon: 'i-lucide-life-buoy',
    link: '/support/tickets',
  },
  {
    title: 'Remote Assistance',
    icon: 'i-lucide-circle-help',
    link: '/remote-assistance',
  },
]
