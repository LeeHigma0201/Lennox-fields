import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/content/site-config'

// The site is retired — every route is rewritten to the /unavailable holding
// page by middleware.ts, so this shell renders nothing but that page. The
// header, footer, analytics, and MedicalBusiness structured data have been
// removed along with the marketing metadata.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'Lennox Fields',
  description: 'This site is no longer available.',
  openGraph: {
    title: 'Lennox Fields',
    description: 'This site is no longer available.',
    url: siteConfig.url,
    type: 'website',
    locale: 'en_US',
    siteName: 'Lennox Fields',
    images: [
      {
        url: '/og-image.png?v=20260806',
        width: 1200,
        height: 630,
        alt: 'Lennox Fields',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lennox Fields',
    description: 'This site is no longer available.',
    images: ['/og-image.png?v=20260806'],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
