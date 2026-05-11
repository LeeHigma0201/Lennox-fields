// ============================================================
// SERVICES
// Edit this file to update your therapy services, descriptions,
// pricing, and details shown on the Services page.
// ============================================================

export const servicesPageHeader = {
  title: 'Our Services',
  subtitle:
    'Comprehensive mental health services tailored to your unique needs. All services available via telehealth for clients in Kentucky.',
}

// Each service needs: title, slug (URL-friendly name), description, details (bullet points), and price.
// The "icon" field accepts: "Heart", "Users", "Home", "Sprout", "Briefcase", "Brain", "Shield"
export const services = [
  {
    icon: 'Heart' as const,
    title: 'Individual Counseling',
    slug: 'individual-therapy',
    description:
      'Individualized clinical work for adults navigating neurodivergent presentations, complex trauma, and co-occurring conditions. Neurodiversity-affirming and trauma-informed.',
    details: [
      'Comprehensive clinical intake and treatment planning',
      'Evidence-based modalities including Dialectical Behavior Therapy (DBT), Trauma-Focused Cognitive Behavioral Therapy (TF-CBT), and Internal Family Systems (IFS)-informed parts work',
      'Specialization in Attention-Deficit/Hyperactivity Disorder (ADHD), Autism Spectrum Disorder (ASD), and Complex Post-Traumatic Stress Disorder (C-PTSD)',
      'Telehealth sessions for Kentucky clients',
    ],
    price: '$150 per session',
  },
  {
    icon: 'Users' as const,
    title: 'Couples Counseling',
    slug: 'couples-therapy',
    description:
      'Strengthen your relationship through improved communication and connection.',
    details: [
      'Communication skills development',
      'Conflict resolution strategies',
      'Attachment-based therapy',
      'Pre-marital counseling available',
    ],
    price: '$200 per session',
  },
  {
    icon: 'Home' as const,
    title: 'Family Counseling',
    slug: 'family-therapy',
    description:
      'Navigate family dynamics and build healthier relationships together.',
    details: [
      'Systems-based approach',
      'Parent-child relationship support',
      'Blended family counseling',
      'Family crisis intervention',
    ],
    price: '$200 per session',
  },
  {
    icon: 'Briefcase' as const,
    title: 'Career Counseling',
    slug: 'career-counseling',
    description:
      'Discover your professional path with comprehensive career guidance.',
    details: [
      'Career assessments (Strong, MBTI)',
      'Job search and interview prep',
      'Career transition support',
      'Professional development planning',
    ],
    price: '$125 per session',
  },
  {
    icon: 'Brain' as const,
    title: 'Substance Use Disorder Counseling',
    slug: 'substance-use',
    description:
      'Compassionate, evidence-based treatment using ASAM criteria.',
    details: [
      'ASAM level of care assessment',
      'Harm reduction approach',
      'Relapse prevention planning',
      'Family education and support',
    ],
    price: 'Contact for pricing',
  },
]

// --- Home page services overview ---
// These are the services shown in the grid on the homepage.
// Each entry links to a service page.
// The "color" field accepts Tailwind text color classes.
export const servicesOverview = [
  {
    icon: 'Heart' as const,
    title: 'Individual Counseling',
    description:
      'Individualized clinical work for adults navigating neurodivergent presentations, complex trauma, and co-occurring conditions. Evidence-based modalities sequenced to clinical presentation.',
    href: '/services/individual-therapy',
    color: 'text-primary-sage',
  },
  {
    icon: 'Users' as const,
    title: 'Couples Counseling',
    description:
      'Strengthen your relationship through improved communication, conflict resolution, and deeper connection.',
    href: '/services/couples-therapy',
    color: 'text-soft-rose',
  },
  {
    icon: 'Home' as const,
    title: 'Family Counseling',
    description:
      'Navigate family dynamics with a systems-based approach. Support for blended families, parent-child relationships, and family transitions.',
    href: '/services/family-therapy',
    color: 'text-earth-green',
  },
  {
    icon: 'Briefcase' as const,
    title: 'Career Counseling',
    description:
      'Discover your path with career assessments, transition support, and professional development guidance.',
    href: '/services/career-counseling',
    color: 'text-accent-gold',
  },
  {
    icon: 'Brain' as const,
    title: 'Substance Use Counseling',
    description:
      'Compassionate, evidence-based treatment using ASAM criteria for appropriate level of care assessment.',
    href: '/services/substance-use',
    color: 'text-clinical-blue',
  },
]

// --- Insurance & Payment Info ---
export const paymentInfo = {
  paymentOptions: [
    'Credit/debit cards accepted',
    'HSA/FSA eligible',
    'Payment plans available',
    'Sliding scale for qualified clients',
  ],
  insuranceNote:
    'We are currently working on insurance credentialing. In the meantime:',
  insuranceDetails: [
    'Superbills provided for out-of-network reimbursement',
    'Contact your insurance to verify benefits',
    'Insurance paperwork support provided',
  ],
}

// --- Pricing quick reference (shown on Contact page) ---
export const pricingQuickRef = [
  { service: 'Intake Session', price: '$250 (60–90 min)' },
  { service: 'Individual Therapy', price: '$150/session' },
  { service: 'Monthly Continuity — Individual', price: '$500 (4 sessions)' },
  { service: 'Couples Therapy', price: '$200/session' },
  { service: 'Couples Intensive', price: '$575 (half-day)' },
  { service: 'Family Therapy', price: '$200/session' },
  { service: 'Career Counseling', price: '$125/session' },
]

export const paymentMethods = [
  'Credit/Debit cards accepted',
  'HSA/FSA eligible',
  'Monthly packages available',
  'Superbills for insurance reimbursement',
  'Sliding scale for qualified clients',
]
