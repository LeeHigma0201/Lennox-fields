import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Therapy Worksheets - CBT, DBT & Mental Health Resources | Lennox Fields',
  description: 'Download 15+ free therapy worksheets for anxiety, depression, DBT, and CBT. Evidence-based mental health tools designed by a licensed therapist. Print-ready PDFs.',
  keywords: [
    'free therapy worksheets',
    'CBT worksheets',
    'DBT worksheets',
    'anxiety worksheets',
    'depression worksheets',
    'mental health worksheets',
    'therapy homework',
    'thought record worksheet',
    'emotion regulation worksheets',
    'coping skills worksheets',
    'printable therapy worksheets',
    'free mental health resources',
    'behavioral activation worksheet',
    'grounding techniques worksheet'
  ],
  openGraph: {
    title: 'Free Therapy Worksheets - CBT, DBT & Mental Health Resources',
    description: 'Download 15+ free therapy worksheets for anxiety, depression, DBT, and CBT. Evidence-based mental health tools designed by a licensed therapist.',
    type: 'website',
    images: [
      {
        url: '/images/og-worksheets.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Therapy Worksheets Collection'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Therapy Worksheets - CBT, DBT & Mental Health Resources',
    description: 'Download 15+ free therapy worksheets for anxiety, depression, DBT, and CBT. Evidence-based tools designed by a licensed therapist.'
  }
}

export default function WorksheetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
