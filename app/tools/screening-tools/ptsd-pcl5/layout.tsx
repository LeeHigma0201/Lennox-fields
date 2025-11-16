import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PCL-5 PTSD Test - Free PTSD Screening Tool | Post-Traumatic Stress Assessment',
  description: 'Take the free PCL-5 PTSD screening test online. 20-question validated assessment for post-traumatic stress disorder with instant results and interpretation.',
  keywords: [
    'PCL-5',
    'PTSD test',
    'PTSD screening',
    'post-traumatic stress test',
    'trauma screening',
    'free PTSD test',
    'online PTSD screening',
    'PTSD assessment',
    'PCL-5 questionnaire',
    'trauma assessment',
    'PTSD symptoms test',
    'validated PTSD screening'
  ],
  openGraph: {
    title: 'PCL-5 PTSD Test - Free PTSD Screening Tool',
    description: 'Take the free PCL-5 PTSD screening test. 20-question validated assessment with instant results and clinical interpretation.',
    type: 'website',
    images: [
      {
        url: '/images/og-pcl5.jpg',
        width: 1200,
        height: 630,
        alt: 'PCL-5 PTSD Screening Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PCL-5 PTSD Test - Free PTSD Screening Tool',
    description: 'Free PCL-5 PTSD screening with instant results and clinical interpretation. Anonymous and confidential.'
  }
}

export default function PCL5Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
