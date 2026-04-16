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
      { name: 'Individual Counseling', href: '/services/individual-therapy' },
      { name: 'Couples Counseling', href: '/services/couples-therapy' },
      { name: 'Family Counseling', href: '/services/family-therapy' },
      { name: 'Career Counseling', href: '/services/career-counseling' },
      { name: 'Substance Use Counseling', href: '/services/substance-use' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    submenu: [
      { name: 'Screening Tools', href: '/tools/screening-tools' },
      { name: 'Worksheets', href: '/resources/worksheets' },
      { name: 'Habit Trackers', href: '/resources/habit-trackers' },
      { name: 'Journaling Prompts', href: '/resources/journaling-prompts' },
      { name: 'Safety Planning', href: '/tools/safety-planning' },
      { name: 'Sound Healing', href: '/tools/sound-healing' },
    ],
  },
  {
    name: 'Professional',
    href: '/professional',
    submenu: [
      { name: 'For Clinicians', href: '/professional' },
      { name: 'Clinical Supervision', href: '/professional/supervision' },
      { name: 'Treatment Planning', href: '/tools/treatment-planning' },
      { name: 'Notes Templates', href: '/tools/notes-templates' },
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
  { name: 'Journaling Prompts', href: '/resources/journaling-prompts' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]
