import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Therapy Notes Templates - Clinical Documentation for Therapists',
  description: 'Download free therapy notes templates including progress notes, intake forms, and clinical documentation. HIPAA-compliant templates for mental health professionals.',
  keywords: [
    'therapy notes templates',
    'clinical notes templates',
    'progress notes template',
    'therapy documentation',
    'clinical documentation',
    'therapist notes template',
    'free therapy forms',
    'mental health notes',
    'SOAP notes template',
    'therapy session notes',
    'counseling notes template',
    'clinical progress notes'
  ],
  openGraph: {
    title: 'Free Therapy Notes Templates - Clinical Documentation for Therapists',
    description: 'Download free therapy notes templates including progress notes, intake forms, and clinical documentation for mental health professionals.',
    type: 'website',
    images: [
      {
        url: '/images/og-notes-templates.jpg',
        width: 1200,
        height: 630,
        alt: 'Therapy Notes Templates'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Therapy Notes Templates - Clinical Documentation for Therapists',
    description: 'Download free therapy notes templates and clinical documentation for mental health professionals.'
  }
}

export default function NotesTemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
