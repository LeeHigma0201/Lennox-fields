import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Therapy Journal Prompts - Guided Mental Health Journaling | Lennox Fields',
  description: 'Access 50+ free therapeutic journal prompts for anxiety, trauma, self-discovery, and emotional healing. Evidence-based journaling exercises from a licensed therapist.',
  keywords: [
    'therapy journal prompts',
    'mental health journaling',
    'therapeutic writing prompts',
    'anxiety journal prompts',
    'trauma journaling',
    'self-discovery journal',
    'emotional healing journal',
    'guided journaling',
    'free journal prompts',
    'mental wellness journaling',
    'CBT journaling',
    'reflective writing prompts',
    'healing journal prompts',
    'mindfulness journaling'
  ],
  openGraph: {
    title: 'Free Therapy Journal Prompts - Guided Mental Health Journaling',
    description: 'Access 50+ free therapeutic journal prompts for anxiety, trauma, self-discovery, and emotional healing. Evidence-based exercises from a licensed therapist.',
    type: 'website',
    images: [
      {
        url: '/images/og-journals.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Therapeutic Journal Prompts'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Therapy Journal Prompts - Guided Mental Health Journaling',
    description: 'Access 50+ free therapeutic journal prompts for anxiety, trauma, self-discovery, and emotional healing from a licensed therapist.'
  }
}

export default function JournalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
