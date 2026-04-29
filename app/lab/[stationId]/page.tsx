'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Copy, CheckCircle2, Send, ArrowRight, Sparkles, Hourglass } from 'lucide-react'
import { Station, stations } from '../data'
import {
  BibliographyPanel,
  ContraindicationGate,
  HonestyCard,
  LabHeader,
  OffRamp,
  Reveal,
} from '../components'
import { getStationComponent, isStationImplemented } from '../stations/registry'
import { buildStationUrl, decodeState, encodeState, LabUrlState } from '../url-state'

type Phase =
  | { kind: 'honesty' }
  | { kind: 'contra' }
  | { kind: 'fill' }
  | { kind: 'share'; nextRole: 'a' | 'b' | null; revealUrl?: string }
  | { kind: 'reveal' }

export default function StationPage() {
  const params = useParams<{ stationId: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const stationId = params.stationId

  const stateRaw = searchParams?.get('s') ?? null
  const initialState = useMemo(() => decodeState(stateRaw), [stateRaw])

  const [state, setState] = useState<LabUrlState | null>(initialState)
  const [phase, setPhase] = useState<Phase>(() => initialPhase(initialState))

  // If the page is opened without state, redirect to /lab to create one
  useEffect(() => {
    if (!state) {
      router.replace('/lab')
    }
  }, [state, router])

  const station = stations.find((s) => s.id === stationId)
  if (!station) return <NotFound onBack={() => router.push('/lab')} />

  const Component = getStationComponent(stationId)

  if (!state) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F7' }}>
        <p className="text-warm-gray text-sm">Loading…</p>
      </main>
    )
  }

  const myRole: 'a' | 'b' = computeMyRole(state, phase)
  const selfName = myRole === 'a' ? state.names.a : state.names.b
  const partnerName = myRole === 'a' ? state.names.b : state.names.a
  const selfData = myRole === 'a' ? state.a : state.b
  const partnerData = myRole === 'a' ? state.b : state.a
  const asymmetricRole: 'a' | 'b' | null = state.meta?.asymmetricRole ?? null

  function gridUrl(): string {
    const s = encodeState({ names: state!.names })
    return `/lab?s=${s}`
  }

  function commitFill(data: any, opts?: { sharedMetadata?: any; asymmetricRole?: 'a' | 'b' }) {
    if (!state) return
    const next: LabUrlState = { ...state }
    if (opts?.asymmetricRole !== undefined) {
      next.meta = { ...(next.meta || {}), asymmetricRole: opts.asymmetricRole }
    }
    if (opts?.sharedMetadata) {
      next.meta = { ...(next.meta || {}), ...opts.sharedMetadata }
    }
    if (myRole === 'a') {
      next.a = data
    } else {
      next.b = data
    }
    setState(next)

    // Determine what comes next
    const aDone = next.a != null
    const bDone = next.b != null
    if (aDone && bDone) {
      setPhase({ kind: 'reveal' })
      return
    }
    // We just filled either A or B. The next person to fill is the other one.
    const nextRole: 'a' | 'b' = myRole === 'a' ? 'b' : 'a'
    setPhase({ kind: 'share', nextRole })
  }

  // ─── PHASES ─────────────────────────────────────────────────────────

  if (phase.kind === 'honesty') {
    return (
      <Page>
        <HonestyCard
          station={station}
          onContinue={() => setPhase({ kind: station.contraindicationKey ? 'contra' : 'fill' })}
          onBack={() => router.push(gridUrl())}
        />
      </Page>
    )
  }

  if (phase.kind === 'contra' && station.contraindicationKey) {
    return (
      <Page>
        <ContraindicationGate
          contraindicationKey={station.contraindicationKey}
          onPass={() => setPhase({ kind: 'fill' })}
          onBlock={() => router.push(gridUrl())}
        />
      </Page>
    )
  }

  if (phase.kind === 'fill') {
    if (!Component || !isStationImplemented(stationId)) {
      return (
        <Page>
          <NotYetImplemented station={station} onBack={() => router.push(gridUrl())} />
        </Page>
      )
    }
    return (
      <Page>
        <Component
          station={station}
          selfName={selfName}
          partnerName={partnerName}
          selfData={selfData}
          partnerData={partnerData}
          sharedMetadata={state.meta || null}
          myRole={myRole}
          asymmetricRole={asymmetricRole}
          selfSubmitted={false}
          partnerSubmitted={!!partnerData}
          onSave={async (data: any, opts?: any) => {
            commitFill(data, opts)
          }}
          onBack={() => router.push(gridUrl())}
        />
      </Page>
    )
  }

  if (phase.kind === 'share') {
    return (
      <Page>
        <ShareScreen
          station={station}
          state={state}
          nextRole={phase.nextRole}
          onBack={() => router.push(gridUrl())}
        />
      </Page>
    )
  }

  // reveal
  if (!Component || !isStationImplemented(stationId)) {
    return (
      <Page>
        <NotYetImplemented station={station} onBack={() => router.push(gridUrl())} />
      </Page>
    )
  }
  return (
    <Page>
      <Reveal station={station} onDone={() => router.push(gridUrl())}>
        <Component
          station={station}
          selfName={selfName}
          partnerName={partnerName}
          selfData={selfData}
          partnerData={partnerData}
          sharedMetadata={state.meta || null}
          myRole={myRole}
          asymmetricRole={asymmetricRole}
          selfSubmitted={true}
          partnerSubmitted={true}
          onSave={async () => {}}
          onBack={() => router.push(gridUrl())}
        />
      </Reveal>
    </Page>
  )
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>
      <LabHeader />
      {children}
      <OffRamp />
    </main>
  )
}

function initialPhase(state: LabUrlState | null): Phase {
  if (!state) return { kind: 'honesty' }
  const aDone = state.a != null
  const bDone = state.b != null
  if (aDone && bDone) return { kind: 'reveal' }
  return { kind: 'honesty' }
}

function computeMyRole(state: LabUrlState, phase: Phase): 'a' | 'b' {
  // In fill phase: if a is empty → I'm a; else I'm b
  // In reveal: doesn't matter, default to 'a'
  if (phase.kind === 'fill') {
    return state.a == null ? 'a' : 'b'
  }
  if (phase.kind === 'share' && phase.nextRole) {
    // After someone just submitted, "myRole" is who just submitted (the page they're seeing)
    return phase.nextRole === 'a' ? 'b' : 'a'
  }
  return 'a'
}

function ShareScreen({
  station,
  state,
  nextRole,
  onBack,
}: {
  station: Station
  state: LabUrlState
  nextRole: 'a' | 'b' | null
  onBack: () => void
}) {
  const [copied, setCopied] = useState(false)
  const isReveal = state.a != null && state.b != null
  const nextName = nextRole === 'a' ? state.names.a : nextRole === 'b' ? state.names.b : ''
  const url =
    typeof window !== 'undefined'
      ? buildStationUrl(window.location.origin, station.id, state)
      : ''
  const smsBody = encodeURIComponent(
    isReveal
      ? `We both finished "${station.name}". Reveal here: ${url}`
      : `Your turn for "${station.name}". Open this on your phone: ${url}`
  )
  const smsHref = `sms:&body=${smsBody}`

  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <Send className="w-8 h-8 mx-auto text-primary-sage mb-4" />
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">
          {isReveal
            ? 'You both finished — share the reveal'
            : nextName
              ? `Send this to ${nextName}`
              : 'Share this link'}
        </h2>
        <p className="text-sm text-warm-gray max-w-md mx-auto">
          {isReveal
            ? "Send this link to your partner. Opening it shows the paired reveal for both of you."
            : `Your part is in. Open this link on ${nextName}'s phone — they'll see what they need to fill out next.`}
        </p>
      </div>

      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 space-y-5">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Share link</p>
          <div className="bg-warm-cream rounded-lg p-3 border border-warm-gray/15 break-all text-xs text-text-dark font-mono max-h-32 overflow-y-auto">
            {url}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              } catch {}
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-primary-sage text-primary-sage hover:bg-primary-sage/10 transition text-sm font-medium"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy link'}
          </button>
          <a
            href={smsHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-sage text-white hover:bg-primary-sage/90 transition text-sm font-medium"
          >
            <Send className="w-4 h-4" />
            Send via Messages
          </a>
        </div>
        <p className="text-xs text-warm-gray italic text-center pt-2 border-t border-warm-gray/15">
          {isReveal
            ? 'Anyone with the link can see your paired answers. Send it only to your partner.'
            : 'The link contains your draft. Keep it private.'}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-warm-cream text-text-dark hover:bg-primary-sage/10 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to grid
        </button>
      </div>

      <div className="mt-6 max-w-md mx-auto bg-warm-cream/60 border border-warm-sand/20 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <Hourglass className="w-4 h-4 text-warm-sand mt-0.5 flex-shrink-0" />
          <p className="text-xs text-warm-gray leading-relaxed">
            <strong>How this works:</strong> the link contains your draft. When {nextName || 'your partner'} opens
            it on their phone, they see what they need next. When they finish, they'll send a final link back to
            you — that's the reveal.
          </p>
        </div>
      </div>
    </div>
  )
}

function NotYetImplemented({ station, onBack }: { station: Station; onBack: () => void }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-warm-gray hover:text-text-dark mb-6 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to grid
      </button>
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-8 text-center space-y-4">
        <p className="text-[10px] uppercase tracking-wider text-warm-sand">Coming in Phase 1B</p>
        <h2 className="font-heading text-2xl font-semibold text-text-dark">{station.name}</h2>
        <p className="text-sm text-warm-gray italic">{station.framework}</p>
        <p className="text-sm text-warm-gray leading-relaxed pt-4 border-t border-warm-gray/15">
          {station.introCopy}
        </p>
        <p className="text-xs text-warm-gray pt-4">
          This station's interactive flow is built next. The clinical content (above) is finalized and reviewed.
        </p>
      </div>
    </div>
  )
}

function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>
      <LabHeader />
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-warm-gray mb-4">Station not found.</p>
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2 rounded-full bg-primary-sage text-white text-sm"
        >
          Back to The Lab
        </button>
      </div>
    </main>
  )
}
