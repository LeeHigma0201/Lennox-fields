import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teen & Adolescent Therapy - Youth Mental Health Counseling | NC & Indiana',
  description: 'Specialized therapy for teens struggling with anxiety, depression, identity issues, and peer relationships. Safe space for adolescents aged 13-18 to heal and grow.',
  keywords: [
    'teen therapy',
    'adolescent therapy',
    'teen counseling',
    'youth mental health',
    'teen therapist',
    'adolescent counseling',
    'teen anxiety therapy',
    'teen depression',
    'teenage mental health',
    'therapy for teens',
    'adolescent mental health',
    'teen counselor',
    'high school counseling',
    'teenage therapy',
    'youth counseling'
  ],
  openGraph: {
    title: 'Teen & Adolescent Therapy - Youth Mental Health Counseling',
    description: 'Specialized therapy for teens struggling with anxiety, depression, identity issues, and peer relationships. Safe space for adolescents aged 13-18.',
    type: 'website',
    images: [
      {
        url: '/images/og-teen-therapy.jpg',
        width: 1200,
        height: 630,
        alt: 'Teen and Adolescent Therapy Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teen & Adolescent Therapy - Youth Mental Health Counseling',
    description: 'Specialized therapy for teens struggling with anxiety, depression, identity issues, and peer relationships.'
  }
}

export default function TeenAdolescentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
