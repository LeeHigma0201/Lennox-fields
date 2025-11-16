import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Family Therapy in North Carolina & Indiana - Family Counseling Services',
  description: 'Evidence-based family therapy to improve communication, resolve conflicts, and strengthen family bonds. Experienced family therapist offering in-person and online sessions.',
  keywords: [
    'family therapy',
    'family counseling',
    'family therapist',
    'family counselor',
    'family therapy North Carolina',
    'family therapy Indiana',
    'family conflict resolution',
    'parent-child therapy',
    'blended family therapy',
    'family communication',
    'systemic family therapy',
    'family mental health',
    'family counseling services',
    'family relationship therapy'
  ],
  openGraph: {
    title: 'Family Therapy in North Carolina & Indiana - Family Counseling Services',
    description: 'Evidence-based family therapy to improve communication, resolve conflicts, and strengthen family bonds. In-person and online sessions available.',
    type: 'website',
    images: [
      {
        url: '/images/og-family-therapy.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Therapy Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Therapy in North Carolina & Indiana - Family Counseling Services',
    description: 'Evidence-based family therapy to improve communication, resolve conflicts, and strengthen family bonds.'
  }
}

export default function FamilyTherapyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
