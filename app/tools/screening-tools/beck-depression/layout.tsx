import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beck Depression Inventory (BDI-II) - Free Depression Test | Instant Scoring',
  description: 'Take the free Beck Depression Inventory (BDI-II) online. 21-question validated depression assessment with instant scoring and clinical interpretation.',
  keywords: [
    'Beck Depression Inventory',
    'BDI-II',
    'BDI test',
    'depression test',
    'depression screening',
    'Beck depression test',
    'free depression assessment',
    'online depression test',
    'depression severity',
    'clinical depression assessment',
    'validated depression test',
    'BDI-II questionnaire'
  ],
  openGraph: {
    title: 'Beck Depression Inventory (BDI-II) - Free Depression Test',
    description: 'Take the free Beck Depression Inventory. 21-question validated depression assessment with instant scoring and interpretation.',
    type: 'website',
    images: [
      {
        url: '/images/og-bdi.jpg',
        width: 1200,
        height: 630,
        alt: 'Beck Depression Inventory Test'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beck Depression Inventory (BDI-II) - Free Depression Test',
    description: 'Free Beck Depression Inventory with instant scoring and clinical interpretation. Anonymous and confidential.'
  }
}

export default function BeckDepressionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
