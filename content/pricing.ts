// PROPOSED pricing tiers — clearly marked as pending Tamara's review.
// Final price points, tier names, and feature lists must be confirmed before launch.

export interface PricingTier {
  id: string
  name: string
  price: string
  priceNote: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
  priceId?: string // Stripe Price ID env-var name (not the actual ID)
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    priceNote: 'forever',
    description: 'Get started with core self-assessment tools at no cost.',
    features: [
      'PHQ-9 depression screening',
      'GAD-7 anxiety screening',
      '1 guided breathing exercise',
      '1 journaling prompt set',
      'Safety planning template',
      'Kids coin reward tracker',
    ],
    cta: 'Get started free',
    highlighted: false,
  },
  {
    id: 'toolkit',
    name: 'Toolkit',
    price: '$9',
    priceNote: '/mo · or $79/yr',
    description:
      'Everything you need for self-directed mental wellness, including the full worksheet library.',
    features: [
      'All worksheets (49+ neurodivergent & family)',
      'Full tool suite (CBT, safety planning, sound healing, etc.)',
      'Tethered Together family task app',
      'Kids coin tracker',
      'All screening tools (PCL-5, PHQ-9, GAD-7)',
      'Journaling prompts library',
    ],
    cta: 'Start Toolkit',
    highlighted: true,
    priceId: 'STRIPE_CONSUMER_PRICE_ID',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    priceNote: '/mo',
    description:
      'Built for therapists and counselors who want to extend tools to their clients.',
    features: [
      'Everything in Toolkit',
      'Niche clinical worksheet library',
      'Print-ready PDFs',
      'Send-to-client private links',
      'Client response dashboard',
      'Quarterly new clinical tools',
    ],
    cta: 'Start Pro',
    highlighted: false,
    priceId: 'STRIPE_PRO_PRICE_ID',
  },
]
