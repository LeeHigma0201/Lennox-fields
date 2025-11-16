import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ASAM Criteria Assessment - Free Substance Use Disorder Screening | Level of Care',
  description: 'Take the free ASAM criteria assessment to determine appropriate level of care for substance use treatment. Comprehensive addiction screening with instant results.',
  keywords: [
    'ASAM criteria',
    'ASAM assessment',
    'substance use assessment',
    'addiction screening',
    'level of care assessment',
    'substance use disorder test',
    'addiction treatment assessment',
    'ASAM level of care',
    'substance abuse screening',
    'addiction evaluation',
    'treatment placement assessment',
    'substance use screening tool'
  ],
  openGraph: {
    title: 'ASAM Criteria Assessment - Free Substance Use Disorder Screening',
    description: 'Take the free ASAM criteria assessment to determine appropriate level of care for substance use treatment.',
    type: 'website',
    images: [
      {
        url: '/images/og-asam.jpg',
        width: 1200,
        height: 630,
        alt: 'ASAM Criteria Assessment Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASAM Criteria Assessment - Free Substance Use Disorder Screening',
    description: 'Free ASAM criteria assessment to determine appropriate level of care for substance use treatment.'
  }
}

export default function ASAMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
