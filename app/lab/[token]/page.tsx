'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Station, stations } from '../data'
import { useLabSessionByToken, useStationState, rememberToken } from '../hooks'
import {
  BibliographyPanel,
  ContraindicationGate,
  HonestyCard,
  JourneyGrid,
  LabHeader,
  OffRamp,
  Reveal,
  SafetyGate,
  ShareLinkScreen,
  StationStatusMap,
  WaitForPartner,
} from '../components'
import { getStationComponent, isStationImplemented } from '../stations/registry'

type View =
  | { kind: 'gate' }
  | { kind: 'share' }
  | { kind: 'grid' }
  | { kind: 'station'; stationId: string; step: 'honesty' | 'contra' | 'flow' }

export default function PartnerLabPage() {
  const params = useParams<{ token: string }>()
  const search = useSearchParams()
  const token = params.token

  const { session, loading, error, patchSession, refresh } = useLabSessionByToken(token)
  const [view, setView] = useState<View>({ kind: 'gate' })

  // Remember token on this device for "resume" UX
  useEffect(() => {
    if (token) rememberToken(token)
  }, [token])

  // First-time view selection: if welcome=1 and partner A, show share screen first.
  useEffect(() => {
    if (!session) return
    if (view.kind !== 'gate') return // already navigated
    const isWelcome = search?.get('welcome') === '1'
    if (isWelcome && session.role === 'a') {
      setView({ kind: 'share' })
    } else if (session.selfSafetyOk) {
      setView({ kind: 'grid' })
    } else {
      setView({ kind: 'gate' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.id])

  if (loading || !session) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F7' }}>
        {error ? (
          <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-warm-gray/15 text-center">
            <p className="text-text-dark mb-2">Hmm.</p>
            <p className="text-sm text-warm-gray">{error}</p>
          </div>
        ) : (
          <p className="text-warm-gray text-sm">Loading…</p>
        )}
      </main>
    )
  }

  const partnerLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/lab/${session.partnerToken}`

  const statusMap: StationStatusMap = {}
  session.stationStates.forEach((s) => {
    statusMap[s.stationId] = {
      selfSubmittedAt: s.selfSubmittedAt,
      partnerSubmittedAt: s.partnerSubmittedAt,
      revealedAt: s.revealedAt,
    }
  })

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>
      <LabHeader onExit={view.kind !== 'grid' ? () => setView({ kind: 'grid' }) : undefined} />

      {view.kind === 'share' && (
        <ShareLinkScreen
          partnerName={session.partnerName}
          partnerLink={partnerLink}
          onDismiss={() =>
            setView(session.selfSafetyOk ? { kind: 'grid' } : { kind: 'gate' })
          }
        />
      )}

      {view.kind === 'gate' && (
        <SafetyGate
          selfName={session.selfName}
          onPass={async () => {
            await patchSession({ safetyOk: true })
            setView({ kind: 'grid' })
          }}
          onBlock={() => {
            // No-op; SafetyGate's blocked screen renders therapist resources directly
          }}
        />
      )}

      {view.kind === 'grid' && (
        <>
          {session.role === 'a' && (
            <div className="max-w-3xl mx-auto px-4 pt-2 pb-4 text-xs text-warm-gray flex flex-wrap items-center gap-2 justify-center">
              <span className="opacity-70">{session.partnerName}'s link:</span>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(partnerLink)
                  } catch {}
                }}
                className="underline underline-offset-2 hover:text-primary-sage"
              >
                copy & send
              </button>
              <span className="opacity-70">·</span>
              <button
                type="button"
                onClick={() => setView({ kind: 'share' })}
                className="underline underline-offset-2 hover:text-primary-sage"
              >
                show again
              </button>
            </div>
          )}
          <JourneyGrid
            selfName={session.selfName}
            partnerName={session.partnerName}
            statusMap={statusMap}
            onPickStation={(s) => setView({ kind: 'station', stationId: s.id, step: 'honesty' })}
          />
          <BibliographyPanel />
        </>
      )}

      {view.kind === 'station' && (
        <StationView
          stationId={view.stationId}
          step={view.step}
          onStep={(step) => setView({ kind: 'station', stationId: view.stationId, step })}
          onExit={() => {
            refresh()
            setView({ kind: 'grid' })
          }}
          token={token}
          myRole={session.role}
          selfName={session.selfName}
          partnerName={session.partnerName}
        />
      )}

      <OffRamp />
    </main>
  )
}

function StationView({
  stationId,
  step,
  onStep,
  onExit,
  token,
  myRole,
  selfName,
  partnerName,
}: {
  stationId: string
  step: 'honesty' | 'contra' | 'flow'
  onStep: (s: 'honesty' | 'contra' | 'flow') => void
  onExit: () => void
  token: string
  myRole: 'a' | 'b'
  selfName: string
  partnerName: string
}) {
  const station = stations.find((s) => s.id === stationId)
  const { state, save, reset, refresh } = useStationState(stationId, token)

  if (!station) return null

  const Component = getStationComponent(stationId)

  if (!Component || !isStationImplemented(stationId)) {
    return <NotYetImplemented station={station} onBack={onExit} />
  }

  if (step === 'honesty') {
    return (
      <HonestyCard
        station={station}
        onContinue={() => onStep(station.contraindicationKey ? 'contra' : 'flow')}
        onBack={onExit}
      />
    )
  }

  if (step === 'contra' && station.contraindicationKey) {
    return (
      <ContraindicationGate
        contraindicationKey={station.contraindicationKey}
        onPass={() => onStep('flow')}
        onBlock={onExit}
      />
    )
  }

  // Flow phase
  if (!state) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F7' }}>
        <p className="text-warm-gray text-sm">Loading station…</p>
      </main>
    )
  }

  const both = !!state.selfSubmittedAt && !!state.partnerSubmittedAt
  const waiting = !!state.selfSubmittedAt && !state.partnerSubmittedAt && !both

  if (waiting) {
    return (
      <WaitForPartner
        partnerName={partnerName}
        onBack={onExit}
        onResubmit={async () => {
          await reset()
          await refresh()
        }}
      />
    )
  }

  if (both) {
    return (
      <Reveal station={station} onDone={onExit}>
        <Component
          station={station}
          selfName={selfName}
          partnerName={partnerName}
          selfData={state.selfData}
          partnerData={state.partnerData}
          sharedMetadata={state.sharedMetadata}
          myRole={myRole}
          asymmetricRole={state.asymmetricRole}
          selfSubmitted={!!state.selfSubmittedAt}
          partnerSubmitted={!!state.partnerSubmittedAt}
          onSave={save as any}
          onBack={onExit}
        />
      </Reveal>
    )
  }

  // Fill phase
  return (
    <Component
      station={station}
      selfName={selfName}
      partnerName={partnerName}
      selfData={state.selfData}
      partnerData={state.partnerData}
      sharedMetadata={state.sharedMetadata}
      myRole={myRole}
      asymmetricRole={state.asymmetricRole}
      selfSubmitted={!!state.selfSubmittedAt}
      partnerSubmitted={!!state.partnerSubmittedAt}
      onSave={save as any}
      onBack={onExit}
    />
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
