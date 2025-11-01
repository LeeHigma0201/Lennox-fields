import type { Metadata } from 'next'
import { Inter, Playfair_Display, Quicksand } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lennox Fields Clinical Mental Health Services',
  description: 'Evidence-based mental health care with compassion at its core. Individual therapy, couples counseling, career guidance, and professional resources.',
  keywords: [
    'mental health',
    'therapy',
    'counseling',
    'LPCA',
    'clinical mental health',
    'career counseling',
    'couples therapy',
    'North Carolina',
    'Indiana',
    'Tamara Walls'
  ],
  authors: [{ name: 'Tamara Walls, M.Ed, LPCA' }],
  openGraph: {
    title: 'Lennox Fields Clinical Mental Health Services',
    description: 'Evidence-based mental health care with compassion at its core',
    type: 'website',
    locale: 'en_US',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${quicksand.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
