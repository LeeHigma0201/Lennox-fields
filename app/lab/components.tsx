'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  Heart,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Pause,
  ExternalLink,
  Sparkles,
  Hand,
} from 'lucide-react'
import {
  bibliography,
  contraindications,
  ContraindicationKey,
  journeys,
  Journey,
  offRampResources,
  safetyGate,
  Station,
  stations,
} from './data'

// =====================================================================
// LabHeader — eyebrow + minimal exit
// =====================================================================

export function LabHeader({ onExit, subtle = false }: { onExit?: () => void; subtle?: boolean }) {
  return (
    <header className={`relative ${subtle ? 'py-4' : 'py-6'} px-4 md:px-8`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-primary-sage" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary-sage font-medium">
            The Lab · Lennox Fields
          </span>
        </div>
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs text-warm-gray hover:text-text-dark transition"
          >
            <X className="w-3.5 h-3.5" />
            Exit
          </button>
        )}
      </div>
    </header>
  )
}

// =====================================================================
// OffRamp — pinned floating rail
// =====================================================================

export function OffRamp() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-soft-rose/40 shadow-medium hover:shadow-strong text-sm text-text-dark transition group"
        aria-label="Talk to a therapist or step away"
      >
        <Heart className="w-4 h-4 text-soft-rose" />
        <span className="hidden md:inline">Step away · find a therapist</span>
        <span className="md:hidden">Step away</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-text-dark/40 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-t-2xl md:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-strong"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-warm-gray/10 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold text-text-dark">If this is too much</h3>
                <p className="text-xs text-warm-gray">There's no wrong move here.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-warm-gray hover:text-text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm text-warm-gray leading-relaxed mb-4">
                Structured exercises become harmful when used to bypass a more fundamental need for stabilization or
                professional support. If something here brought up more than you can hold together, please reach out.
              </p>
              {offRampResources.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel={r.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`block p-4 rounded-xl border transition ${
                    r.primary
                      ? 'bg-primary-sage/5 border-primary-sage/30 hover:bg-primary-sage/10'
                      : 'bg-warm-cream border-warm-gray/15 hover:border-primary-sage/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-text-dark text-sm">{r.label}</p>
                      <p className="text-xs text-warm-gray mt-1">{r.detail}</p>
                    </div>
                    {r.href.startsWith('http') && <ExternalLink className="w-3.5 h-3.5 text-warm-gray flex-shrink-0 mt-1" />}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// =====================================================================
// SafetyGate — opening 5 questions
// =====================================================================

export function SafetyGate({
  onPass,
  partnerNamesA,
  partnerNamesB,
  onNamesChange,
}: {
  onPass: () => void
  partnerNamesA: string
  partnerNamesB: string
  onNamesChange: (names: { a: string; b: string }) => void
}) {
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | undefined>>({})
  const [step, setStep] = useState<'intro' | 'names' | 'gate' | 'blocked'>('intro')
  const [nameA, setNameA] = useState(partnerNamesA)
  const [nameB, setNameB] = useState(partnerNamesB)

  const allAnswered = safetyGate.questions.every((q) => answers[q.id] != null)
  const blocked = safetyGate.questions.some((q) => answers[q.id] === q.blocksOn)

  function answer(id: string, v: 'yes' | 'no') {
    setAnswers((a) => ({ ...a, [id]: v }))
  }

  function submit() {
    if (blocked) {
      setStep('blocked')
    } else {
      onPass()
    }
  }

  if (step === 'intro') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10">
          <Sparkles className="w-8 h-8 mx-auto text-primary-sage mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-4 leading-tight">
            The Lab
          </h1>
          <p className="text-warm-gray text-lg leading-relaxed max-w-xl mx-auto">
            Evidence-based exercises for couples. Each one names its framework and what the research actually
            supports — including where the popular wellness internet has overrun the science.
          </p>
        </div>

        <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 md:p-8 space-y-5">
          <div>
            <h2 className="font-heading text-xl font-semibold text-text-dark mb-2">Before we begin</h2>
            <p className="text-sm text-warm-gray leading-relaxed">
              These exercises are structured prompts and conversation scaffolds. They are not therapy and are not a
              substitute for it. They work when both partners are willing, basically regulated, and not in crisis.
            </p>
          </div>
          <div className="space-y-2 text-sm text-warm-gray">
            <div className="flex items-start gap-2">
              <span className="text-primary-sage flex-shrink-0">·</span>
              <span>Designed for pass-and-play on one device. Both of you take turns.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-sage flex-shrink-0">·</span>
              <span>Your answers stay in this browser. We don't store them on a server.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-sage flex-shrink-0">·</span>
              <span>Every station has a "this isn't right for us right now" exit.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStep('names')}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  if (step === 'names') {
    return (
      <div className="max-w-md mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">What should we call you?</h2>
          <p className="text-sm text-warm-gray">First names or whatever you want to be called.</p>
        </div>
        <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-warm-gray mb-2">Partner A</label>
            <input
              type="text"
              value={nameA}
              onChange={(e) => setNameA(e.target.value)}
              className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none"
              placeholder="Partner A"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-warm-gray mb-2">Partner B</label>
            <input
              type="text"
              value={nameB}
              onChange={(e) => setNameB(e.target.value)}
              className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none"
              placeholder="Partner B"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              onNamesChange({ a: nameA.trim() || 'Partner A', b: nameB.trim() || 'Partner B' })
              setStep('gate')
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  if (step === 'blocked') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white border border-soft-rose/30 rounded-2xl p-6 md:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-soft-rose/15 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-soft-rose" />
            </div>
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-semibold text-text-dark mb-3">
                Let's pause here.
              </h2>
              <p className="text-sm text-warm-gray leading-relaxed">{safetyGate.blockedCopy}</p>
            </div>
          </div>
          <div className="space-y-2 pt-4 border-t border-warm-gray/15">
            {offRampResources
              .filter((r) => r.primary || /988|Hotline|Psychology Today/.test(r.label))
              .map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel={r.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block p-4 rounded-xl bg-warm-cream hover:bg-primary-sage/10 transition"
                >
                  <p className="font-medium text-text-dark text-sm">{r.label}</p>
                  <p className="text-xs text-warm-gray mt-1">{r.detail}</p>
                </a>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">A check before we begin</h2>
        <p className="text-sm text-warm-gray max-w-md mx-auto">
          Five questions. Your answers stay here — we don't send them anywhere.
        </p>
      </div>
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 md:p-8 space-y-6">
        {safetyGate.questions.map((q, i) => (
          <div key={q.id} className="space-y-3">
            <p className="font-body text-base text-text-dark leading-snug">
              <span className="text-warm-gray text-xs uppercase tracking-wider mr-2">{i + 1}.</span>
              {q.q}
            </p>
            <div className="flex gap-2">
              {(['yes', 'no'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => answer(q.id, v)}
                  className={`px-5 py-2 rounded-full text-sm transition ${
                    answers[q.id] === v
                      ? 'bg-primary-sage text-white'
                      : 'bg-warm-cream border border-warm-gray/20 text-warm-gray hover:border-primary-sage'
                  }`}
                >
                  {v === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={submit}
          disabled={!allAnswered}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// JourneyGrid — 7 journeys + station cards
// =====================================================================

export function JourneyGrid({ onPickStation }: { onPickStation: (s: Station) => void }) {
  const [activeJourney, setActiveJourney] = useState<Journey | 'all'>('all')

  const visibleStations =
    activeJourney === 'all' ? stations : stations.filter((s) => s.journey === activeJourney)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark mb-3">
          Pick where you are
        </h2>
        <p className="text-sm text-warm-gray max-w-xl mx-auto">
          Twenty-five stations, organized by what they ask of you. Browse all, or pick a journey.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          type="button"
          onClick={() => setActiveJourney('all')}
          className={`px-4 py-2 rounded-full text-sm transition ${
            activeJourney === 'all'
              ? 'bg-text-dark text-white'
              : 'bg-white border border-warm-gray/20 text-warm-gray hover:border-text-dark'
          }`}
        >
          Browse all
        </button>
        {(Object.entries(journeys) as Array<[Journey, typeof journeys[Journey]]>).map(([key, j]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveJourney(key)}
            className="px-4 py-2 rounded-full text-sm transition bg-white border text-warm-gray hover:border-text-dark"
            style={{
              borderColor: activeJourney === key ? j.color : 'rgba(107,101,96,0.2)',
              backgroundColor: activeJourney === key ? j.color : 'white',
              color: activeJourney === key ? 'white' : '#6B6560',
            }}
          >
            {j.title}
          </button>
        ))}
      </div>

      {activeJourney !== 'all' && (
        <div className="text-center mb-8">
          <p className="text-base text-warm-gray italic">{journeys[activeJourney].subtitle}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleStations.map((s) => {
          const j = journeys[s.journey]
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onPickStation(s)}
              className="text-left p-5 rounded-2xl bg-white border border-warm-gray/15 hover:border-primary-sage/40 hover:shadow-medium transition group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="font-heading text-3xl text-primary-sage/30 leading-none">{s.number}</span>
                <span
                  className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{ backgroundColor: j.color + '15', color: j.color }}
                >
                  {j.title}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-dark mb-1.5 group-hover:text-primary-sage transition">
                {s.name}
              </h3>
              <p className="text-xs text-warm-gray italic mb-3">{s.framework}</p>
              <div className="flex items-center justify-between text-xs text-warm-gray">
                <div className="flex gap-1.5">
                  {s.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-warm-cream"
                    >
                      {ing === 'slowing' ? 'slow' : ing === 'softening' ? 'soft' : 'understand'}
                    </span>
                  ))}
                </div>
                <span>~{s.estMinutes} min</span>
              </div>
              {s.contraindicationKey && (
                <p className="text-[10px] text-soft-rose mt-3 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Has a check before entry
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// =====================================================================
// HonestyCard — first screen of every station
// =====================================================================

export function HonestyCard({
  station,
  onContinue,
  onBack,
}: {
  station: Station
  onContinue: () => void
  onBack: () => void
}) {
  const j = journeys[station.journey]
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-warm-gray hover:text-text-dark mb-6 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to journey grid
      </button>
      <div className="text-center mb-8">
        <span
          className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mb-4"
          style={{ backgroundColor: j.color + '15', color: j.color }}
        >
          {j.title}
        </span>
        <div className="flex items-baseline justify-center gap-3 mb-2">
          <span className="font-heading text-4xl text-primary-sage/40">{station.number}</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-dark">{station.name}</h1>
        </div>
        <p className="text-sm text-warm-gray italic">{station.framework}</p>
      </div>

      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 md:p-8 space-y-6">
        <p className="text-base md:text-lg text-text-dark leading-relaxed">{station.introCopy}</p>

        <div className="border-t border-warm-gray/15 pt-6 space-y-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-warm-sand flex-shrink-0 mt-1" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-warm-sand mb-1">An honest claim</p>
              <p className="text-sm font-medium text-text-dark leading-snug">{station.honestyClaim}</p>
            </div>
          </div>
          <p className="text-sm text-warm-gray leading-relaxed pl-7">{station.honestyDetail}</p>
        </div>

        <div className="flex items-center justify-between pt-4 text-xs text-warm-gray">
          <span>~{station.estMinutes} minutes total</span>
          <div className="flex gap-1.5">
            {station.ingredients.map((ing) => (
              <span key={ing} className="px-2 py-0.5 rounded bg-warm-cream uppercase tracking-wider">
                {ing}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition"
        >
          I understand. Continue.
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// ContraindicationGate — per-station check before entry
// =====================================================================

export function ContraindicationGate({
  contraindicationKey,
  onPass,
  onBlock,
}: {
  contraindicationKey: ContraindicationKey
  onPass: () => void
  onBlock: () => void
}) {
  const cfg = contraindications[contraindicationKey]
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | undefined>>({})
  const [showBlocked, setShowBlocked] = useState(false)

  const allAnswered = cfg.questions.every((q) => answers[q.id] != null)
  const blocked = cfg.questions.some((q) => answers[q.id] === q.blocksOn)

  function submit() {
    if (blocked) setShowBlocked(true)
    else onPass()
  }

  if (showBlocked) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white border border-soft-rose/30 rounded-2xl p-6 md:p-8 space-y-5">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-soft-rose flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-heading text-xl font-semibold text-text-dark mb-2">Let's not do this one today.</h3>
              <p className="text-sm text-warm-gray leading-relaxed">{cfg.redirectCopy}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={onBlock}
              className="flex-1 px-5 py-2.5 rounded-full bg-warm-cream text-warm-gray hover:bg-primary-sage/10 transition text-sm"
            >
              Back to grid
            </button>
            <Link
              href="/contact"
              className="flex-1 px-5 py-2.5 rounded-full bg-primary-sage text-white hover:bg-primary-sage/90 transition text-sm text-center"
            >
              Reach out to Tamara
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white border border-warm-sand/30 rounded-2xl p-6 md:p-8 space-y-5">
        <h3 className="font-heading text-xl font-semibold text-text-dark">{cfg.title}</h3>
        {cfg.questions.map((q) => (
          <div key={q.id} className="space-y-2.5">
            <p className="text-base text-text-dark leading-snug">{q.q}</p>
            <div className="flex gap-2">
              {(['yes', 'no'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: v }))}
                  className={`px-5 py-2 rounded-full text-sm transition ${
                    answers[q.id] === v
                      ? 'bg-primary-sage text-white'
                      : 'bg-warm-cream border border-warm-gray/20 text-warm-gray hover:border-primary-sage'
                  }`}
                >
                  {v === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={submit}
          disabled={!allAnswered}
          className="w-full px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// PartnerSwitch — full-screen "hand the device" cover
// =====================================================================

export function PartnerSwitch({
  toName,
  onReady,
}: {
  toName: string
  onReady: () => void
}) {
  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-20">
      <div
        className="bg-gradient-to-br from-primary-sage to-earth-green text-white rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-strong"
      >
        <Hand className="w-12 h-12 mx-auto opacity-80" />
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            Hand the device to {toName}
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            They'll only see their own prompts — you won't see what they write until you both finish.
          </p>
        </div>
        <button
          type="button"
          onClick={onReady}
          className="w-full px-6 py-3 rounded-full bg-white text-primary-sage font-medium hover:bg-warm-cream transition"
        >
          {toName.split(' ')[0]} is ready
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// ReadyCheck — pre-reveal containment check
// =====================================================================

export function ReadyCheck({ onReady }: { onReady: () => void }) {
  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-20">
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-8 text-center space-y-6">
        <Pause className="w-10 h-10 mx-auto text-primary-sage" />
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-dark mb-3">Ready to read together?</h3>
          <p className="text-sm text-warm-gray leading-relaxed">
            Do you both have fifteen minutes — somewhere private, no kids interrupting, phones face-down? What
            comes next is meant to be received with attention.
          </p>
        </div>
        <button
          type="button"
          onClick={onReady}
          className="w-full px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition"
        >
          We're ready
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// Reveal — paired side-by-side container
// =====================================================================

export function Reveal({
  station,
  partnerNames,
  children,
  synthesisPrompt,
  onDone,
}: {
  station: Station
  partnerNames: { a: string; b: string }
  children: React.ReactNode
  synthesisPrompt?: string
  onDone: () => void
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-wider text-primary-sage">Together now</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark mt-2">{station.name}</h2>
      </div>

      {children}

      <div className="mt-10 max-w-2xl mx-auto bg-warm-cream border border-warm-sand/30 rounded-2xl p-6 md:p-8 space-y-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-warm-sand flex-shrink-0 mt-1" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-warm-sand mb-2">The 24-hour bridge</p>
            <p className="text-base text-text-dark leading-relaxed">
              {synthesisPrompt ||
                "Talk about this in person within the next 24 hours. Most of the change happens in the conversation that follows what you just read — not in the reading itself."}
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-warm-gray italic mt-6 max-w-md mx-auto">
        This structure is for understanding, not for scoring. If you find yourself using a framework term to win — pause.
      </p>

      <div className="text-center mt-8">
        <button
          type="button"
          onClick={onDone}
          className="px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition inline-flex items-center gap-2"
        >
          Back to grid
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function PairedColumns({
  partnerNames,
  left,
  right,
}: {
  partnerNames: { a: string; b: string }
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      <div className="space-y-4">
        <div className="text-center pb-3 border-b border-warm-gray/15">
          <p className="text-[10px] uppercase tracking-wider text-primary-sage">{partnerNames.a}</p>
        </div>
        <div className="space-y-4">{left}</div>
      </div>
      <div className="space-y-4">
        <div className="text-center pb-3 border-b border-warm-gray/15">
          <p className="text-[10px] uppercase tracking-wider text-soft-rose">{partnerNames.b}</p>
        </div>
        <div className="space-y-4">{right}</div>
      </div>
    </div>
  )
}

// =====================================================================
// PartnerFlow — wraps a station's per-partner input UI
// =====================================================================

export function PartnerFlow({
  partnerName,
  isFirst,
  children,
  canSubmit,
  onSubmit,
  submitLabel,
}: {
  partnerName: string
  isFirst: boolean
  children: React.ReactNode
  canSubmit: boolean
  onSubmit: () => void
  submitLabel?: string
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">
          {isFirst ? 'Going first' : 'Now you'}
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark">{partnerName}</h2>
      </div>
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 md:p-8 space-y-6">
        {children}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {submitLabel || (isFirst ? "I'm done — hand to my partner" : 'Show us both')}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// BibliographyPanel — collapsible source list
// =====================================================================

export function BibliographyPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className="max-w-3xl mx-auto px-4 pb-12">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-white border border-warm-gray/15 hover:border-primary-sage/40 transition"
      >
        <span className="flex items-center gap-2 text-sm text-text-dark">
          <BookOpen className="w-4 h-4 text-primary-sage" />
          Sources cited in The Lab
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-warm-gray" /> : <ChevronDown className="w-4 h-4 text-warm-gray" />}
      </button>
      {open && (
        <div className="mt-2 p-6 bg-white border border-warm-gray/15 rounded-xl space-y-3 text-xs text-warm-gray leading-relaxed max-h-[60vh] overflow-y-auto">
          {bibliography.map((b) => (
            <p key={b.id}>{b.cite}</p>
          ))}
        </div>
      )}
    </div>
  )
}
