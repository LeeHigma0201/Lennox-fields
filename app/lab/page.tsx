'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LabHeader, LandingHero, OffRamp } from './components'
import { createLabSession, recallToken, rememberToken } from './hooks'

export default function LabLanding() {
  const router = useRouter()
  const [recent, setRecent] = useState<string | null>(null)

  useEffect(() => {
    setRecent(recallToken())
  }, [])

  async function handleStart(names: { a: string; b: string }) {
    const session = await createLabSession(names.a, names.b)
    rememberToken(session.partnerAToken)
    router.push(`/lab/${session.partnerAToken}?welcome=1`)
  }

  function handleResume() {
    if (recent) router.push(`/lab/${recent}`)
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>
      <LabHeader />
      <LandingHero onStart={handleStart} onResume={recent ? handleResume : undefined} recentToken={recent} />
      <OffRamp />
    </main>
  )
}
