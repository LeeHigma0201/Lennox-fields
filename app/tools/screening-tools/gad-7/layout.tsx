import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GAD-7 Anxiety Test - Free Generalized Anxiety Disorder Screening | Instant Results',
  description: 'Take the free GAD-7 anxiety test online. 7-question validated screening tool for generalized anxiety disorder with instant scoring and clinical interpretation.',
  keywords: [
    'GAD-7',
    'GAD-7 test',
    'anxiety test',
    'anxiety screening',
    'generalized anxiety disorder',
    'free anxiety test',
    'online anxiety screening',
    'anxiety assessment',
    'GAD-7 questionnaire',
    'anxiety severity',
    'clinical anxiety test',
    'validated anxiety screening'
  ],
  openGraph: {
    title: 'GAD-7 Anxiety Test - Free Generalized Anxiety Disorder Screening',
    description: 'Take the free GAD-7 anxiety test. 7-question validated screening tool with instant scoring and clinical interpretation.',
    type: 'website',
    images: [
      {
        url: '/images/og-gad7.jpg',
        width: 1200,
        height: 630,
        alt: 'GAD-7 Anxiety Screening Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GAD-7 Anxiety Test - Free Generalized Anxiety Disorder Screening',
    description: 'Free GAD-7 anxiety test with instant scoring and clinical interpretation. Anonymous and confidential.'
  }
}

export default function GAD7Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
