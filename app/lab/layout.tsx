import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Lab — Lennox Fields',
  description:
    'Evidence-based couples exercises. Each one names its framework and what the science actually supports. Pass-and-play, no account required.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'The Lab — Lennox Fields',
    description:
      'Evidence-based couples exercises drawing from EFT, Gottman, IFS, NVC, and more. Honest about what the research supports.',
    type: 'website',
  },
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
