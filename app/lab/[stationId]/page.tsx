import { Suspense } from 'react'
import StationClient from './StationClient'
import { LabHeader } from '../components'

// Server component wrapper. StationClient uses useSearchParams + useParams,
// which would force a client-side rendering bailout if not wrapped in
// <Suspense>. See ../page.tsx for the same pattern on /lab.
export default function StationPage() {
  return (
    <Suspense fallback={<StationFallback />}>
      <StationClient />
    </Suspense>
  )
}

function StationFallback() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>
      <LabHeader />
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary-sage/20 border-t-primary-sage rounded-full animate-spin mx-auto mb-4" />
        <p className="text-warm-gray text-sm">Loading…</p>
      </div>
    </main>
  )
}
