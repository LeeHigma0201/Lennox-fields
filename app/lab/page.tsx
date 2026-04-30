import { Suspense } from 'react'
import LabLandingClient from './LabLandingClient'
import { LabHeader } from './components'

// Server component wrapper. The Lab UI uses useSearchParams, which forces a
// client-side rendering bailout if not wrapped in <Suspense>. Wrapping it here
// lets Next.js render the layout chrome + a sage spinner during SSR, then
// hydrates the real UI on the client. Without this, /lab ships only a 2.7 kB
// shell to crawlers and visitors briefly see a 404 RSC fallback flash before
// hydration.
export default function LabLandingPage() {
  return (
    <Suspense fallback={<LabFallback />}>
      <LabLandingClient />
    </Suspense>
  )
}

function LabFallback() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>
      <LabHeader />
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary-sage/20 border-t-primary-sage rounded-full animate-spin mx-auto mb-4" />
        <p className="text-warm-gray text-sm">Loading The Lab…</p>
      </div>
    </main>
  )
}
