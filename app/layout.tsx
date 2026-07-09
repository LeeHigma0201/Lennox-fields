import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ComfortCorner from '@/components/ComfortCorner'
import { siteConfig } from '@/content/site-config'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.businessFullName,
  description: `Neurodiversity-affirming therapy specializing in ADHD, autism, and trauma. ${siteConfig.owner.fullTitle} — individual, couples, and family counseling in Kentucky.`,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.owner.fullTitle }],
  openGraph: {
    title: siteConfig.businessFullName,
    description: `${siteConfig.description}. ${siteConfig.owner.fullTitle} — Neurodiversity-affirming therapy specializing in ADHD, autism, and trauma in Kentucky.`,
    url: siteConfig.url,
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.businessFullName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lennox Fields Clinical Mental Health Services — Tamara Walls, LPCA',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.businessFullName,
    description: `${siteConfig.description}. ${siteConfig.owner.fullTitle} — Neurodiversity-affirming therapy specializing in ADHD, autism, and trauma in Kentucky.`,
    images: ['/og-image.png'],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: siteConfig.businessFullName,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.contact.phone,
              email: siteConfig.contact.email,
              areaServed: { '@type': 'State', name: 'Kentucky' },
              founder: {
                '@type': 'Person',
                name: siteConfig.owner.name,
                jobTitle: siteConfig.owner.role,
              },
              availableService: [
                { '@type': 'MedicalTherapy', name: 'Individual Counseling' },
                { '@type': 'MedicalTherapy', name: 'Couples Counseling' },
                { '@type': 'MedicalTherapy', name: 'Family Counseling' },
                { '@type': 'MedicalTherapy', name: 'Career Counseling' },
              ],
            }),
          }}
        />
        {/* Apply saved Comfort & Access settings before paint (no flash of unstyled page) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('lf-comfort')||'{}');var e=document.documentElement;if(s.text)e.setAttribute('data-lf-text',s.text);if(s.calm)e.setAttribute('data-lf-calm','on');if(s.readable)e.setAttribute('data-lf-readable','on');if(s.motion)e.setAttribute('data-lf-motion',s.motion);}catch(_){}})();`,
          }}
        />
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
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <ComfortCorner />
        <Analytics />
      </body>
    </html>
  )
}
