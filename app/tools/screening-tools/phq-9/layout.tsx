import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PHQ-9 Depression Test - Free Online Depression Screening Tool | Instant Results',
  description: 'Take the free PHQ-9 depression questionnaire online. 9-question validated screening tool with instant scoring and clinical interpretation. Anonymous and confidential.',
  keywords: [
    'PHQ-9',
    'PHQ-9 test',
    'depression test',
    'depression screening',
    'Patient Health Questionnaire',
    'free depression test',
    'online depression screening',
    'depression assessment',
    'PHQ-9 questionnaire',
    'depression severity',
    'clinical depression test',
    'validated depression screening'
  ],
  openGraph: {
    title: 'PHQ-9 Depression Test - Free Online Depression Screening',
    description: 'Take the free PHQ-9 depression questionnaire. 9-question validated screening tool with instant scoring and interpretation.',
    type: 'website',
    images: [
      {
        url: '/images/og-phq9.jpg',
        width: 1200,
        height: 630,
        alt: 'PHQ-9 Depression Screening Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHQ-9 Depression Test - Free Online Depression Screening',
    description: 'Free PHQ-9 depression questionnaire with instant scoring and clinical interpretation. Anonymous and confidential.'
  }
}

export default function PHQ9Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
