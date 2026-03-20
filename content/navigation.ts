// ============================================================
// NAVIGATION
// Edit this file to change the navigation menu items.
// To add a submenu, add a "submenu" array with { name, href } items.
// To add a simple top-level link, just use { name, href }.
// ============================================================

export const navigation = [
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'Individual Therapy', href: '/services/individual-therapy' },
      { name: 'Couples Therapy', href: '/services/couples-therapy' },
      { name: 'Family Therapy', href: '/services/family-therapy' },
      { name: 'Teen & Adolescent', href: '/services/teen-adolescent' },
      { name: 'Career Counseling', href: '/services/career-counseling' },
      { name: 'Substance Use', href: '/services/substance-use' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    submenu: [
      { name: 'Screening Tools', href: '/tools/screening-tools' },
      { name: 'Worksheets', href: '/resources/worksheets' },
      { name: 'Habit Trackers', href: '/resources/habit-trackers' },
      { name: 'Journals', href: '/resources/journals' },
      { name: 'Safety Planning', href: '/tools/safety-planning' },
    ],
  },
  {
    name: 'Professional Tools',
    href: '/professional',
    submenu: [
      { name: 'Clinical Supervision', href: '/professional/supervision' },
      { name: 'Treatment Planning', href: '/tools/treatment-planning' },
      { name: 'Notes Templates', href: '/tools/notes-templates' },
      { name: 'Billing Tracker', href: '/professional/billing-tracker' },
      { name: 'Licensing Guides', href: '/professional/licensing-guides' },
    ],
  },
  { name: 'Books', href: '/books' },
  { name: 'About', href: '/about' },
]

// --- Footer Quick Links ---
export const footerQuickLinks = [
  { name: 'Services', href: '/services' },
  { name: 'About Tamara', href: '/about' },
  { name: 'Free Screening Tools', href: '/tools/screening-tools' },
  { name: "Children's Books", href: '/books' },
  { name: 'Professional Resources', href: '/professional' },
]

// --- Footer Resource Links ---
export const footerResourceLinks = [
  { name: 'Worksheets', href: '/resources/worksheets' },
  { name: 'Habit Trackers', href: '/resources/habit-trackers' },
  { name: 'Journals', href: '/resources/journals' },
  { name: 'Client Portal', href: '/portal/login' },
  { name: 'FAQ', href: '/faq' },
]
