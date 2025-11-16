import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Treatment Planning Tools - Goal Setting & Progress Tracking for Therapy | Free Templates',
  description: 'Free treatment planning templates with SMART goals, progress tracking, and outcome measures. Evidence-based tools for therapists and clients to track therapy progress.',
  keywords: [
    'treatment plan template',
    'therapy goals',
    'SMART goals therapy',
    'treatment planning',
    'therapy progress tracking',
    'mental health goals',
    'therapy outcomes',
    'treatment plan worksheet',
    'goal setting therapy',
    'therapy progress notes',
    'clinical treatment planning',
    'mental health treatment plan',
    'therapy goal tracker',
    'free treatment plan template'
  ],
  openGraph: {
    title: 'Treatment Planning Tools - Goal Setting & Progress Tracking for Therapy',
    description: 'Free treatment planning templates with SMART goals, progress tracking, and outcome measures. Evidence-based tools for therapists and clients.',
    type: 'website',
    images: [
      {
        url: '/images/og-treatment-planning.jpg',
        width: 1200,
        height: 630,
        alt: 'Therapy Treatment Planning Tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treatment Planning Tools - Goal Setting & Progress Tracking for Therapy',
    description: 'Free treatment planning templates with SMART goals, progress tracking, and outcome measures for therapy.'
  }
}

export default function TreatmentPlanningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
