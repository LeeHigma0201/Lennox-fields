import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Couples Therapy in North Carolina & Indiana - Marriage Counseling | Lennox Fields',
  description: 'Expert couples therapy using EFT and Gottman methods. Rebuild trust, improve communication, and strengthen your relationship. In-person and online counseling available.',
  keywords: [
    'couples therapy',
    'marriage counseling',
    'couples counseling',
    'relationship therapy',
    'marriage therapy',
    'couples therapy North Carolina',
    'couples therapy Indiana',
    'emotionally focused therapy',
    'Gottman method',
    'relationship counseling',
    'marriage counselor',
    'couples therapist',
    'save my marriage',
    'relationship problems',
    'communication in relationships'
  ],
  openGraph: {
    title: 'Couples Therapy in North Carolina & Indiana - Marriage Counseling',
    description: 'Expert couples therapy using EFT and Gottman methods. Rebuild trust, improve communication, and strengthen your relationship.',
    type: 'website',
    images: [
      {
        url: '/images/og-couples-therapy.jpg',
        width: 1200,
        height: 630,
        alt: 'Couples Therapy Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Couples Therapy in North Carolina & Indiana - Marriage Counseling',
    description: 'Expert couples therapy using EFT and Gottman methods. Rebuild trust, improve communication, and strengthen relationships.'
  }
}

export default function CouplesTherapyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
