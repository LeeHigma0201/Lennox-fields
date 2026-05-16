import { Suspense } from 'react'
import TranslatorClient from './TranslatorClient'

export default function TranslatorPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <TranslatorClient />
    </Suspense>
  )
}

function Fallback() {
  return (
    <main className="min-h-screen bg-warm-cream">
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-primary-sage/20 border-t-primary-sage rounded-full animate-spin mx-auto mb-4" />
        <p className="text-warm-gray text-sm">Loading…</p>
      </div>
    </main>
  )
}
