'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

export default function NewSessionPage() {
  const router = useRouter()
  const [partner1Label, setPartner1Label] = useState('')
  const [partner2Label, setPartner2Label] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate() {
    if (!partner1Label.trim() || !partner2Label.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/tether/couple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partner1Label: partner1Label.trim(),
          partner2Label: partner2Label.trim(),
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.error === 'DB_UNAVAILABLE') {
          setError('Database not yet configured. Ask your developer to set DATABASE_URL in Vercel environment variables.')
        } else {
          setError('Something went wrong. Please try again.')
        }
        return
      }

      router.push(`/tethered-together/therapist/${data.therapistToken}`)
    } catch {
      setError('Could not connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isReady = partner1Label.trim().length > 0 && partner2Label.trim().length > 0

  return (
    <div className="min-h-screen gradient-warm-bg py-16">
      <div className="container-custom max-w-lg">
        <Link
          href="/tethered-together"
          className="inline-flex items-center space-x-2 text-warm-gray hover:text-primary-sage text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-medium p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <TetherMark />
            <h1 className="font-heading text-3xl font-bold text-text-dark mb-2">
              Create a Couple Session
            </h1>
            <p className="text-warm-gray text-sm">
              Enter labels for each partner. These appear in your therapist dashboard
              and in session activity — not in partner-facing URLs.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start space-x-3 bg-alert-red/5 border border-alert-red/20 rounded-xl p-4 mb-6">
              <AlertTriangle className="w-4 h-4 text-alert-red shrink-0 mt-0.5" />
              <p className="text-sm text-alert-red">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="label" htmlFor="p1">
                Partner 1 Label
              </label>
              <input
                id="p1"
                type="text"
                className="input"
                placeholder="e.g., Partner A  or  Alex"
                value={partner1Label}
                onChange={(e) => setPartner1Label(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && isReady && handleCreate()}
              />
            </div>

            <div>
              <label className="label" htmlFor="p2">
                Partner 2 Label
              </label>
              <input
                id="p2"
                type="text"
                className="input"
                placeholder="e.g., Partner B  or  Jordan"
                value={partner2Label}
                onChange={(e) => setPartner2Label(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && isReady && handleCreate()}
              />
            </div>

            <button
              onClick={handleCreate}
              disabled={!isReady || loading}
              className="btn btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating…' : 'Create Session'}
            </button>
          </div>

          <p className="mt-6 text-xs text-warm-gray/60 text-center">
            You&apos;ll receive a private therapist dashboard link. Partner links
            are generated separately for each list you create.
          </p>
        </div>
      </div>
    </div>
  )
}

function TetherMark() {
  return (
    <div className="flex items-center justify-center mb-5">
      <div className="h-px w-12 bg-primary-sage/30" />
      <div className="mx-3 w-9 h-9 rounded-full border-2 border-primary-sage/50 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-primary-sage/50" />
      </div>
      <div className="h-px w-12 bg-primary-sage/30" />
    </div>
  )
}
