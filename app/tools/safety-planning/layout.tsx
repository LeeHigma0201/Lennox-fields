import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Safety Plan Template - Crisis Planning for Mental Health | Suicide Prevention',
  description: 'Create a personalized safety plan for mental health crises. Free template with warning signs, coping strategies, and emergency contacts. Evidence-based crisis intervention.',
  keywords: [
    'safety plan template',
    'crisis plan',
    'suicide prevention plan',
    'mental health crisis plan',
    'safety planning',
    'crisis intervention',
    'emergency mental health plan',
    'free safety plan',
    'suicide safety plan',
    'self-harm prevention',
    'crisis coping strategies',
    'mental health emergency plan',
    'safety plan worksheet',
    'crisis support plan'
  ],
  openGraph: {
    title: 'Free Safety Plan Template - Crisis Planning for Mental Health',
    description: 'Create a personalized safety plan for mental health crises. Free template with warning signs, coping strategies, and emergency contacts.',
    type: 'website',
    images: [
      {
        url: '/images/og-safety-planning.jpg',
        width: 1200,
        height: 630,
        alt: 'Mental Health Safety Plan Template'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Safety Plan Template - Crisis Planning for Mental Health',
    description: 'Create a personalized safety plan for mental health crises with warning signs, coping strategies, and emergency contacts.'
  }
}

export default function SafetyPlanningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
