import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Clinical Supervision & Professional Resources for Therapists | Lennox Fields',
  description: 'Download free clinical supervision trackers, treatment planning templates, and professional development tools for mental health clinicians and therapists.',
  keywords: [
    'clinical supervision tracker',
    'supervision hours tracker',
    'LPCA supervision',
    'therapist resources',
    'clinical supervision tools',
    'mental health professional resources',
    'free therapy templates',
    'treatment planning templates',
    'clinical documentation',
    'therapy session notes',
    'counselor resources',
    'professional development tools',
    'therapy practice management',
    'clinical training resources'
  ],
  openGraph: {
    title: 'Free Clinical Supervision & Professional Resources for Therapists',
    description: 'Download free clinical supervision trackers, treatment planning templates, and professional development tools for mental health clinicians.',
    type: 'website',
    images: [
      {
        url: '/images/og-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Resources for Therapists'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Clinical Supervision & Professional Resources for Therapists',
    description: 'Download free clinical supervision trackers, treatment planning templates, and tools for mental health professionals.'
  }
}

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
