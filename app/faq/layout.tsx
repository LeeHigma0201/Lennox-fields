import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Therapy FAQ - Common Questions About Counseling & Mental Health Services',
  description: 'Get answers to common therapy questions about fees, insurance, confidentiality, what to expect, and more. Learn about starting therapy in North Carolina and Indiana.',
  keywords: [
    'therapy FAQ',
    'therapy questions',
    'counseling FAQ',
    'how does therapy work',
    'therapy cost',
    'therapy insurance',
    'what to expect in therapy',
    'therapy confidentiality',
    'starting therapy',
    'first therapy session',
    'how long is therapy',
    'therapy pricing',
    'online therapy',
    'telehealth therapy',
    'therapy cancellation policy'
  ],
  openGraph: {
    title: 'Therapy FAQ - Common Questions About Counseling & Mental Health Services',
    description: 'Get answers to common therapy questions about fees, insurance, confidentiality, what to expect, and more.',
    type: 'website',
    images: [
      {
        url: '/images/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'Therapy Frequently Asked Questions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Therapy FAQ - Common Questions About Counseling & Mental Health Services',
    description: 'Get answers to common therapy questions about fees, insurance, confidentiality, what to expect, and more.'
  }
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
