'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Station, stations } from './data'
import { useLabSession } from './hooks'
import {
  BibliographyPanel,
  ContraindicationGate,
  HonestyCard,
  JourneyGrid,
  LabHeader,
  OffRamp,
  PartnerSwitch,
  ReadyCheck,
  Reveal,
  SafetyGate,
} from './components'
import { getStationComponent, isStationImplemented } from './stations/registry'

type View =
  | { kind: 'gate' }
  | { kind: 'grid' }
  | { kind: 'station'; stationId: string; step: StationStep }

type StationStep =
  | 'honesty'
  | 'contra'
  | 'partnerA'
  | 'switch'
  | 'partnerB'
  | 'ready'
  | 'reveal'

export default function LabPage() {
  const {
    session,
    hydrated,
    setSafetyGatePassed,
    setPartnerNames,
    getStationState,
    replacePartnerData,
    markRevealed,
  } = useLabSession()

  const [view, setView] = useState<View>({ kind: 'gate' })

  // Wait for hydration so localStorage doesn't flicker the safety gate
  if (!hydrated) {
    return (
      <main className="min-h-screen bg-warm-cream flex items-center justify-center">
        <p className="text-warm-gray text-sm">Loading…</p>
      </main>
    )
  }

  // If session has already passed safety gate, allow returning users to start at the grid
  if (view.kind === 'gate' && session.safetyGatePassed) {
    setView({ kind: 'grid' })
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>
      <LabHeader
        onExit={view.kind !== 'gate' ? () => setView({ kind: 'grid' }) : undefined}
      />

      {view.kind === 'gate' && (
        <SafetyGate
          onPass={() => {
            setSafetyGatePassed(true)
            setView({ kind: 'grid' })
          }}
          partnerNamesA={session.partnerNames.a}
          partnerNamesB={session.partnerNames.b}
          onNamesChange={setPartnerNames}
        />
      )}

      {view.kind === 'grid' && (
        <>
          <JourneyGrid
            onPickStation={(s) => {
              setView({ kind: 'station', stationId: s.id, step: 'honesty' })
            }}
          />
          <BibliographyPanel />
        </>
      )}

      {view.kind === 'station' && (
        <StationView
          stationId={view.stationId}
          step={view.step}
          onStep={(step) => setView({ kind: 'station', stationId: view.stationId, step })}
          onExit={() => setView({ kind: 'grid' })}
          partnerNames={session.partnerNames}
          getStationState={getStationState}
          replacePartnerData={replacePartnerData}
          markRevealed={markRevealed}
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
  partnerNames,
  getStationState,
  replacePartnerData,
  markRevealed,
}: {
  stationId: string
  step: StationStep
  onStep: (s: StationStep) => void
  onExit: () => void
  partnerNames: { a: string; b: string }
  getStationState: (id: string) => any
  replacePartnerData: (id: string, p: 'a' | 'b', data: any) => void
  markRevealed: (id: string) => void
}) {
  const station = stations.find((s) => s.id === stationId)
  if (!station) return null

  const state = getStationState(stationId)
  const Component = getStationComponent(stationId)

  if (!Component || !isStationImplemented(stationId)) {
    return <NotYetImplemented station={station} onBack={onExit} />
  }

  // honesty card → contraindication gate (if any) → partner A → switch → partner B → ready → reveal
  if (step === 'honesty') {
    return (
      <HonestyCard
        station={station}
        onContinue={() => onStep(station.contraindicationKey ? 'contra' : 'partnerA')}
        onBack={onExit}
      />
    )
  }

  if (step === 'contra' && station.contraindicationKey) {
    return (
      <ContraindicationGate
        contraindicationKey={station.contraindicationKey}
        onPass={() => onStep('partnerA')}
        onBlock={onExit}
      />
    )
  }

  if (step === 'partnerA') {
    return (
      <Component
        mode="a"
        stateA={state.a}
        stateB={state.b}
        partnerNames={partnerNames}
        onUpdate={(data) => replacePartnerData(stationId, 'a', data)}
        onAdvance={() => onStep('switch')}
      />
    )
  }

  if (step === 'switch') {
    return <PartnerSwitch toName={partnerNames.b} onReady={() => onStep('partnerB')} />
  }

  if (step === 'partnerB') {
    return (
      <Component
        mode="b"
        stateA={state.a}
        stateB={state.b}
        partnerNames={partnerNames}
        onUpdate={(data) => replacePartnerData(stationId, 'b', data)}
        onAdvance={() => onStep('ready')}
      />
    )
  }

  if (step === 'ready') {
    return (
      <ReadyCheck
        onReady={() => {
          markRevealed(stationId)
          onStep('reveal')
        }}
      />
    )
  }

  // reveal
  return (
    <Reveal station={station} partnerNames={partnerNames} onDone={onExit}>
      <Component
        mode="reveal"
        stateA={state.a}
        stateB={state.b}
        partnerNames={partnerNames}
        onUpdate={(data) => replacePartnerData(stationId, 'a', data)}
        onAdvance={() => {}}
      />
    </Reveal>
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
