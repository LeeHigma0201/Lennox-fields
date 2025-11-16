import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clinical Supervision Tracker - Free Hours Tracking for LPCA & Therapists',
  description: 'Free clinical supervision hours tracker for LPCA candidates and mental health professionals. Track supervision hours, requirements, and progress toward licensure.',
  keywords: [
    'clinical supervision tracker',
    'supervision hours tracker',
    'LPCA supervision',
    'therapist supervision tracker',
    'clinical supervision hours',
    'licensure supervision',
    'supervision log',
    'free supervision tracker',
    'mental health supervision',
    'counselor supervision tracker',
    'therapy supervision hours',
    'clinical training tracker'
  ],
  openGraph: {
    title: 'Clinical Supervision Tracker - Free Hours Tracking for LPCA & Therapists',
    description: 'Free clinical supervision hours tracker for mental health professionals. Track supervision hours and progress toward licensure.',
    type: 'website',
    images: [
      {
        url: '/images/og-supervision.jpg',
        width: 1200,
        height: 630,
        alt: 'Clinical Supervision Tracker'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Supervision Tracker - Free Hours Tracking for LPCA & Therapists',
    description: 'Free clinical supervision hours tracker for mental health professionals pursuing licensure.'
  }
}

export default function SupervisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
