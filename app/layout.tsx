import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { siteConfig } from '@/content/site-config'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.businessFullName,
  description: `${siteConfig.description}. Individual therapy, couples counseling, career guidance, and professional resources.`,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.owner.fullTitle }],
  openGraph: {
    title: siteConfig.businessFullName,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: siteConfig.logo.src,
        width: 1200,
        height: 630,
        alt: siteConfig.businessFullName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.businessFullName,
    description: siteConfig.description,
    images: [siteConfig.logo.src],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip Navigation for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-sage focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
