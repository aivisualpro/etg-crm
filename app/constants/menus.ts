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
      {
        title: 'Language',
        icon: 'i-lucide-languages',
        link: '/admin/language',
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
        title: 'Categories',
        icon: 'i-lucide-tags',
        link: '/admin/categories',
      },
      {
        title: 'Furniture',
        icon: 'i-lucide-armchair',
        link: '/admin/furniture',
      },
      {
        title: 'Entities',
        icon: 'i-lucide-building-2',
        link: '/admin/entities',
      },
    ],
  },
  {
    heading: 'Reports',
    headingKey: 'nav.reports',
    items: [
      {
        title: 'Furniture',
        icon: 'i-lucide-armchair',
        link: '/reports/furniture',
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
