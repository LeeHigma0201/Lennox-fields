import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Mental Health Screening Tools - Depression, Anxiety & PTSD Tests | Validated',
  description: 'Take free, validated mental health assessments including PHQ-9, GAD-7, and PCL-5. Instant results with clinical interpretation. Anonymous screening tools.',
  keywords: [
    'mental health screening',
    'depression screening',
    'anxiety assessment',
    'PHQ-9 questionnaire',
    'GAD-7 test',
    'PTSD screening',
    'PCL-5 assessment',
    'free mental health test',
    'depression test online',
    'anxiety screening tool',
    'Beck Depression Inventory',
    'ASAM criteria',
    'substance use assessment',
    'mental health assessment tools',
    'validated screening tools'
  ],
  openGraph: {
    title: 'Free Mental Health Screening Tools - Depression, Anxiety & PTSD Tests',
    description: 'Take free, validated mental health assessments including PHQ-9, GAD-7, and PCL-5. Instant results with clinical interpretation.',
    type: 'website',
    images: [
      {
        url: '/images/og-screening-tools.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Mental Health Screening Tools'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mental Health Screening Tools - Depression, Anxiety & PTSD Tests',
    description: 'Take free, validated assessments including PHQ-9, GAD-7, and PCL-5. Get instant results with clinical interpretation.'
  }
}

export default function ScreeningToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
