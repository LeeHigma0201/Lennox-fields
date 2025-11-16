import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Habit Trackers - Mood, Sleep & Medication Logs | Mental Health Tools',
  description: 'Download free printable habit trackers for mental health. Track mood, sleep, medications, symptoms, and self-care habits. Evidence-based tools by a licensed therapist.',
  keywords: [
    'free habit tracker',
    'mood tracker',
    'sleep tracker',
    'medication tracker',
    'mental health tracker',
    'symptom tracker',
    'self-care tracker',
    'daily mood log',
    'printable habit tracker',
    'therapy tracking tools',
    'mental wellness tracker',
    'anxiety tracker',
    'depression tracker',
    'habit tracking worksheet'
  ],
  openGraph: {
    title: 'Free Habit Trackers - Mood, Sleep & Medication Logs',
    description: 'Download free printable habit trackers for mental health. Track mood, sleep, medications, symptoms, and self-care habits. Evidence-based tools by a licensed therapist.',
    type: 'website',
    images: [
      {
        url: '/images/og-habit-trackers.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Mental Health Habit Trackers'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Habit Trackers - Mood, Sleep & Medication Logs',
    description: 'Download free printable habit trackers for mental health. Track mood, sleep, medications, and symptoms with evidence-based tools.'
  }
}

export default function HabitTrackersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
