import { GitCommit, LucideIcon, Logs, User, LayoutDashboard, Gift, Mail, Users } from 'lucide-react'

export const HIDDEN_PATHS = [
  '/member/',
  '/donate',
  '/admin',
  '/auth',
  '/login',
  '/terms',
  '/privacy',
  '/order-confirmation',
  '/super'
]

const isStringInPath = (path: string, str: string) => path.includes(str)

interface IAdminNavLink {
  title: string
  items: { icon: LucideIcon; label: string; path: string; description: string; active: boolean; isDrawer?: boolean }[]
}

export const adminNavigationLinkData = (path: string, isSuperUser: boolean): IAdminNavLink[] => {
  const userGroup = [
    {
      icon: User,
      label: 'Member Portal',
      path: '/member/portal',
      description: 'View your profile & donations',
      active: isStringInPath(path, 'member/portal')
    }
  ]

  const dashboardGroup = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin/dashboard',
      description: 'Dashboard',
      active: isStringInPath(path, 'dashboard')
    }
  ]

  const operationsGroup = [
    {
      icon: Gift,
      label: 'Donations',
      path: '/admin/donations',
      description: 'Manage stripe transactions',
      active: isStringInPath(path, 'donations')
    },
    {
      icon: Mail, // or MessageSquare
      label: 'Contact Submissions',
      path: '/admin/contact-submissions',
      description: 'View contact form submissions',
      active: isStringInPath(path, 'contact-submissions')
    }
  ]

  const managementGroup = [
    {
      icon: Users,
      label: 'Users',
      path: '/admin/users',
      description: 'Manage user accounts',
      active: isStringInPath(path, 'users')
    }
  ]

  const systemGroup = [
    {
      icon: GitCommit,
      label: 'Changelog',
      path: '/admin/changelog',
      description: 'Version History & Updates',
      active: isStringInPath(path, 'changelog')
    },
    ...(isSuperUser
      ? [
          {
            icon: Logs,
            label: 'Logs',
            path: '/admin/logs',
            description: 'System details',
            active: isStringInPath(path, 'logs')
          }
        ]
      : [])
  ]

  return [
    { title: 'Dashboard', items: dashboardGroup },
    { title: 'User', items: userGroup },
    { title: 'Operations', items: operationsGroup },
    { title: 'Management', items: managementGroup },
    { title: 'System', items: systemGroup }
  ]
}

export const headerNavLinks = (pathname: string) => [
  { textKey: 'Home', linkKey: '/', isActive: pathname === '/' },
  {
    textKey: 'Who We Are',
    linkKey: '/who-we-are',
    isActive: pathname.startsWith('/who-we-are'),
    dropdown: [
      { label: 'About ECF', linkKey: '/who-we-are/about', isActive: pathname === '/who-we-are/about' },
      {
        label: 'Executive Advocacy Committee',
        linkKey: '/who-we-are/committee',
        isActive: pathname === '/who-we-are/committee'
      },
      { label: 'History', linkKey: '/who-we-are/history', isActive: pathname === '/who-we-are/history' }
    ]
  },
  {
    textKey: 'Our Work',
    linkKey: '/our-work',
    isActive: pathname.startsWith('/our-work'),
    dropdown: [
      { label: 'Impact', linkKey: '/our-work/impact', isActive: pathname === '/our-work/impact' },
      { label: 'Math', linkKey: '/our-work/math', isActive: pathname === '/our-work/math' },
      { label: 'Success Stories', linkKey: '/our-work/success', isActive: pathname === '/our-work/success' },
      { label: 'Reading', linkKey: '/our-work/reading', isActive: pathname === '/our-work/reading' }
    ]
  },
  {
    textKey: 'Advocates',
    linkKey: '/advocates',
    isActive: pathname === '/advocates',
    dropdown: [
      { label: 'Partners', linkKey: '/advocates/partners', isActive: pathname === '/advocates/impact' },
      { label: 'Community', linkKey: '/advocates/community', isActive: pathname === '/advocates/community' }
    ]
  },
  { textKey: 'Contact', linkKey: '/contact', isActive: pathname === '/contact' },
  { textKey: 'Get Involved', linkKey: '/get-involved', isActive: pathname === '/get-involved' }
]
