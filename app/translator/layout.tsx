import type { Metadata } from 'next'

// Private side project. Not part of the public Lennox Fields catalog —
// hidden from search engines and absent from sitemap/navigation.
export const metadata: Metadata = {
  title: 'Feelings Translator',
  description: 'Private translator for Jason + Tamara.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default function TranslatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
