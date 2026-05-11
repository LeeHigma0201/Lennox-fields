// ============================================================
// SITE CONFIGURATION
// Edit this file to change your business info, contact details,
// social media links, and SEO settings.
// ============================================================

export const siteConfig = {
  // --- Business Info ---
  businessName: 'Lennox Fields',
  businessFullName: 'Lennox Fields Clinical Mental Health Services',
  legalName: 'Lennox Fields Clinical Mental Health Services LLC',
  tagline: 'Clinical Mental Health Services',
  // Brand voice: Tamara's approved hero subheadline — used in meta descriptions,
  // OG card body, and footer. The previous "slow on purpose, and yours all the way
  // through" line was retired per Tamara's 2026-05-04 direction.
  description:
    'Evidence-based mental health care with compassion at its core',
  url: 'https://lennoxfields.com',

  // --- Owner / Therapist Info ---
  owner: {
    name: 'Tamara Walls',
    credentials: 'LPCA',
    fullTitle: 'Tamara Walls, LPCA',
    role: 'Licensed Professional Counselor Associate',
    specializations: 'LPCA, C-DBT, TCM',
    licensedStates: ['Kentucky'],
    licensedStatesShort: ['KY'],
  },

  // --- Contact Info ---
  // Update these with your real contact details.
  // No email is listed publicly — the lennoxfields.com mailbox isn't set up,
  // so contact runs through the form (/contact) and phone only. Re-add an
  // `email` field here once a real, monitored mailbox exists.
  contact: {
    phone: '(502) 627-0781',
    phoneLink: 'tel:+15026270781', // used for click-to-call links
    location: 'Licensed in Kentucky',
    officeHours: 'Mon-Fri 9am-5pm EST',
    calendlyUrl: 'https://calendly.com/tamara-lennoxfields',
  },

  // --- Social Media Links ---
  // Set to '' (empty string) to hide a social link
  social: {
    linkedin: '', // e.g. 'https://linkedin.com/in/tamara-walls'
    facebook: '', // e.g. 'https://facebook.com/lennoxfields'
    instagram: '', // e.g. 'https://instagram.com/lennoxfields'
    twitter: '', // e.g. 'https://twitter.com/lennoxfields'
  },

  // --- Logo ---
  // Lotus mark from the Lennox Fields Design System.
  // For wordmark + lotus combinations, prefer the dedicated SVGs in /images/brand.
  logo: {
    src: '/images/brand/lotus-mark.svg',
    alt: 'Lennox Fields lotus mark',
  },

  // --- SEO Keywords ---
  // These help people find your site on Google
  keywords: [
    'mental health',
    'therapy',
    'counseling',
    'LPCA',
    'clinical mental health',
    'career counseling',
    'couples therapy',
    'ADHD',
    'autism',
    'CPTSD',
    'DBT',
    'Kentucky',
    'Tamara Walls',
  ],

  // --- Crisis Info ---
  // This appears in the footer - do not remove
  crisis: {
    message: 'If you or someone you know is in crisis, please call the National Suicide Prevention Lifeline at',
    phone: '988',
    suffix: 'or visit your nearest emergency room.',
  },
}
