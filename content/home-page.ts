// ============================================================
// HOME PAGE CONTENT
// Edit this file to update the content shown on your homepage:
// hero section, trust badges, book section, professional tools,
// resources, and call-to-action.
// ============================================================

// --- Hero Section ---
// Voice: warm but professionally authoritative — seasoned clinician, not life coach.
// Per content overhaul 2026-05-11: tone tightened, "we'll" replaced with clinical phrasing.
export const hero = {
  // The main headline. Words listed in highlightWords get a sage/sand color accent.
  headline: 'Therapy that meets you where you are',
  highlightWords: ['meets', 'are'],
  subheadline: 'Evidence-based mental health care with compassion at its core',

  // Personal message — clinical voice (revised 2026-05-11).
  personalMessage:
    'Clinical support for experiences that feel too big to name. Sessions move at the pace your nervous system can hold, in an order that fits your life.',
  personalMessageLink: { text: 'More about how I work', href: '/about' },

  // Call-to-action buttons
  primaryButton: { text: 'Schedule a free consultation', href: '/contact' },
  secondaryButton: { text: 'Browse free resources', href: '/resources' },
}

// --- Trust Indicators ---
// These are the 4 badges shown below the hero.
export const trustIndicators = [
  { label: 'Licensed in Kentucky', icon: 'Shield' as const },
  { label: 'LPCA, C-DBT, TCM', icon: 'Stethoscope' as const },
  { label: 'Evidence-Based', icon: 'Heart' as const },
  { label: 'Client-Centered', icon: 'Users' as const },
]

// --- Children's Books Section ---
export const booksSection = {
  title: "Children's Mental Health Books",
  description:
    'Engaging, therapeutic books that help children understand and cope with tough topics. Perfect for parents, therapists, and educators.',
  buttonText: 'Browse Book Collection',
  buttonHref: '/books',
}

// --- Professional Resources Section ---
export const professionalSection = {
  title: 'For Mental Health Professionals',
  description:
    'Access comprehensive professional tools including supervision tracking, billing management, treatment plan generators, and state-specific licensing guides.',
  buttonText: 'Explore Professional Tools',
  buttonHref: '/professional',
  columns: [
    {
      title: 'Clinical Tools',
      items: [
        'Treatment plan generator',
        'Progress notes templates',
        'Assessment scoring',
        'Safety planning tools',
      ],
    },
    {
      title: 'Practice Management',
      items: [
        'Supervision hours tracker',
        'Billing and invoicing',
        'Client portal access',
        'Document storage',
      ],
    },
    {
      title: 'Development',
      items: [
        'Licensing guides (KY)',
        'Theoretical orientation tools',
        'Community resources',
        'Continuing education',
      ],
    },
  ],
}

// --- Free Resources Section ---
// The "icon" field accepts: "Brain", "FileText", "CheckSquare", "BookOpen", "Shield"
// The "color" field accepts Tailwind background color classes.
export const resources = [
  {
    icon: 'Brain' as const,
    title: 'Free Screening Tools',
    description:
      'Self-assessments for depression, anxiety, Attention-Deficit/Hyperactivity Disorder (ADHD), Autism Spectrum Disorder (ASD), and Post-Traumatic Stress Disorder (PTSD) with instant scoring and interpretation.',
    href: '/tools/screening-tools',
    color: 'bg-clinical-blue',
  },
  {
    icon: 'FileText' as const,
    title: 'Therapeutic Worksheets',
    description:
      'Downloadable worksheets for Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), mindfulness, and more. Useful for clients and clinicians.',
    href: '/resources/worksheets',
    color: 'bg-primary-sage',
  },
  {
    icon: 'CheckSquare' as const,
    title: 'Habit Trackers',
    description:
      'Customizable trackers for mood, sleep, exercise, and self-care routines.',
    href: '/resources/habit-trackers',
    color: 'bg-earth-green',
  },
  {
    icon: 'BookOpen' as const,
    title: 'Journal Prompts',
    description:
      'Guided journaling for gratitude, self-discovery, trauma processing, and personal growth.',
    href: '/resources/journaling-prompts',
    color: 'bg-soft-rose',
  },
  {
    icon: 'Shield' as const,
    title: 'Safety Planning',
    description:
      'Comprehensive crisis and safety planning tools for mental health emergencies.',
    href: '/tools/safety-planning',
    color: 'bg-alert-red',
  },
  {
    icon: 'Brain' as const,
    title: 'Treatment Planning',
    description:
      'Professional-grade treatment plan generator with measurable goals and evidence-based interventions.',
    href: '/tools/treatment-planning',
    color: 'bg-accent-gold',
  },
]

// --- Call to Action Section ---
export const ctaSection = {
  title: 'When you’re ready, we’re here',
  description:
    "Starting therapy is a real thing — uncertainty included. A free 15-minute consultation is just a conversation, no pressure to commit. We can talk about what's been hard, and whether we're the right fit.",
  primaryButton: { text: 'Schedule a free consultation', href: '/contact' },
  secondaryButton: { text: 'Browse free resources', href: '/resources' },
  footnote:
    'Currently accepting new clients in Kentucky. Telehealth and in-person options available.',
}
