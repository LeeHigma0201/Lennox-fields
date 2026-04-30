'use client'

import { useState, useEffect } from 'react'
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
  ExternalLink,
  Sparkles,
  Copy,
  CheckCircle2,
  Clock,
  Send,
  Hourglass,
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
// LandingHero — the public /lab page that creates sessions
// =====================================================================

export function LandingHero({
  onStart,
  onResume,
  recentToken,
}: {
  onStart: (names: { a: string; b: string }) => Promise<void>
  onResume?: () => void
  recentToken?: string | null
}) {
  const [step, setStep] = useState<'intro' | 'names'>('intro')
  const [nameA, setNameA] = useState('')
  const [nameB, setNameB] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
              <span>You'll start a session, then send your partner a link. Each of you uses your own device.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-sage flex-shrink-0">·</span>
              <span>Most stations are async — answer when you can. The reveal opens once you both finish.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary-sage flex-shrink-0">·</span>
              <span>Every station has an honest disclosure of what the research supports — and where it's weak.</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStep('names')}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition"
          >
            Start a new Lab session
            <ArrowRight className="w-4 h-4" />
          </button>
          {recentToken && onResume && (
            <button
              type="button"
              onClick={onResume}
              className="w-full text-sm text-primary-sage underline underline-offset-2 hover:no-underline"
            >
              Resume your most recent session
            </button>
          )}
        </div>
      </div>
    )
  }

  // names step
  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">Names for the session</h2>
        <p className="text-sm text-warm-gray">
          Yours, and your partner's. They can change theirs when they open the link.
        </p>
      </div>
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-warm-gray mb-2">Your name</label>
          <input
            type="text"
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none"
            placeholder="Sam"
            maxLength={60}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-warm-gray mb-2">Your partner's name</label>
          <input
            type="text"
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none"
            placeholder="River"
            maxLength={60}
          />
        </div>
        <button
          type="button"
          disabled={submitting || !nameA.trim() || !nameB.trim()}
          onClick={async () => {
            setSubmitting(true)
            try {
              await onStart({ a: nameA.trim(), b: nameB.trim() })
            } catch (e) {
              setSubmitting(false)
            }
          }}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {submitting ? 'Creating session…' : 'Create session'}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
        <button
          type="button"
          onClick={() => setStep('intro')}
          className="w-full text-xs text-warm-gray hover:text-text-dark transition"
        >
          Back
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// ShareLinkScreen — partner A sees this once after session creation
// =====================================================================

export function ShareLinkScreen({
  partnerName,
  partnerLink,
  onDismiss,
}: {
  partnerName: string
  partnerLink: string
  onDismiss: () => void
}) {
  const [copied, setCopied] = useState(false)
  const smsBody = encodeURIComponent(
    `Hey — I started a couples exercise thing. It's pass-and-play but on separate devices. Open this when you're ready: ${partnerLink}`
  )
  const smsHref = `sms:&body=${smsBody}`

  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-8">
        <Send className="w-8 h-8 mx-auto text-primary-sage mb-4" />
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">
          Send {partnerName} their link
        </h2>
        <p className="text-sm text-warm-gray max-w-md mx-auto">
          They open this link on their own phone or laptop. You'll each answer on your own device. The reveal
          becomes available when you both finish.
        </p>
      </div>

      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 space-y-5">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">{partnerName}'s link</p>
          <div className="bg-warm-cream rounded-lg p-3 border border-warm-gray/15 break-all text-xs text-text-dark font-mono">
            {partnerLink}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(partnerLink)
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
          Keep this link private. Anyone with it can answer on {partnerName}'s behalf.
        </p>

        <button
          type="button"
          onClick={onDismiss}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-warm-cream text-text-dark hover:bg-primary-sage/10 transition"
        >
          Continue to my view
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// SafetyGate — per-partner, server-stored
// =====================================================================

export function SafetyGate({
  selfName,
  onPass,
  onBlock,
}: {
  selfName: string
  onPass: () => Promise<void>
  onBlock: () => void
}) {
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | undefined>>({})
  const [step, setStep] = useState<'gate' | 'blocked'>('gate')
  const [submitting, setSubmitting] = useState(false)

  const allAnswered = safetyGate.questions.every((q) => answers[q.id] != null)
  const blocked = safetyGate.questions.some((q) => answers[q.id] === q.blocksOn)

  function answer(id: string, v: 'yes' | 'no') {
    setAnswers((a) => ({ ...a, [id]: v }))
  }

  async function submit() {
    if (blocked) {
      setStep('blocked')
      return
    }
    setSubmitting(true)
    try {
      await onPass()
    } finally {
      setSubmitting(false)
    }
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
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">
          A check before we begin, {selfName}
        </h2>
        <p className="text-sm text-warm-gray max-w-md mx-auto">
          Five questions. Only you see your answers. Your partner answers their own version.
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
          disabled={!allAnswered || submitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {submitting ? 'Saving…' : 'Continue'}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// JourneyGrid — 7 journeys + 25 station cards with per-station status
// =====================================================================

export type StationStatusMap = Record<
  string,
  {
    selfSubmittedAt: string | null
    partnerSubmittedAt: string | null
    revealedAt: string | null
  }
>

export function JourneyGrid({
  selfName,
  partnerName,
  onPickStation,
  statusMap,
}: {
  selfName: string
  partnerName: string
  onPickStation: (s: Station) => void
  statusMap: StationStatusMap
}) {
  const [activeJourney, setActiveJourney] = useState<Journey | 'all'>('all')

  const visibleStations =
    activeJourney === 'all' ? stations : stations.filter((s) => s.journey === activeJourney)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark mb-3">
          Pick where you are, {selfName}
        </h2>
        <p className="text-sm text-warm-gray max-w-xl mx-auto">
          Twenty-five stations, organized by what they ask of you. Whatever you start, {partnerName} can pick up
          on their own device.
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
            className="px-4 py-2 rounded-full text-sm transition"
            style={{
              borderColor: activeJourney === key ? j.color : 'rgba(107,101,96,0.2)',
              backgroundColor: activeJourney === key ? j.color : 'white',
              color: activeJourney === key ? 'white' : '#6B6560',
              borderWidth: 1,
              borderStyle: 'solid',
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
          const status = statusMap[s.id]
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
              <StationStatusBadge status={status} partnerName={partnerName} />
              {s.contraindicationKey && !status?.selfSubmittedAt && (
                <p className="text-[10px] text-soft-rose mt-2 flex items-center gap-1">
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

function StationStatusBadge({
  status,
  partnerName,
}: {
  status?: { selfSubmittedAt: string | null; partnerSubmittedAt: string | null; revealedAt: string | null }
  partnerName: string
}) {
  if (!status) return null
  const { selfSubmittedAt, partnerSubmittedAt, revealedAt } = status
  if (revealedAt) {
    return (
      <p className="text-[10px] text-earth-green mt-2 flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" />
        Both finished — reveal available
      </p>
    )
  }
  if (selfSubmittedAt && !partnerSubmittedAt) {
    return (
      <p className="text-[10px] text-warm-sand mt-2 flex items-center gap-1">
        <Hourglass className="w-3 h-3" />
        Waiting on {partnerName}
      </p>
    )
  }
  if (!selfSubmittedAt && partnerSubmittedAt) {
    return (
      <p className="text-[10px] text-soft-rose mt-2 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {partnerName} is waiting on you
      </p>
    )
  }
  return null
}

// =====================================================================
// HonestyCard — first screen of every station (unchanged from v1)
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
// ContraindicationGate — per-station check (unchanged)
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
// WaitForPartner — shown after self submits, before partner finishes
// =====================================================================

export function WaitForPartner({
  partnerName,
  onBack,
  onResubmit,
}: {
  partnerName: string
  onBack: () => void
  onResubmit?: () => void
}) {
  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-16">
      <div className="bg-white border border-warm-sand/30 rounded-2xl p-8 text-center space-y-6">
        <Hourglass className="w-10 h-10 mx-auto text-warm-sand" />
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-dark mb-3">
            Your part is in. Waiting on {partnerName}.
          </h3>
          <p className="text-sm text-warm-gray leading-relaxed">
            They'll see you've finished when they open their link. The reveal opens for both of you once they're done.
          </p>
          <p className="text-xs text-warm-gray italic mt-3">
            We auto-refresh every few seconds. You can come back to this page anytime.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-5 py-2.5 rounded-full bg-warm-cream text-text-dark hover:bg-primary-sage/10 transition text-sm"
          >
            Back to grid
          </button>
          {onResubmit && (
            <button
              type="button"
              onClick={onResubmit}
              className="flex-1 px-5 py-2.5 rounded-full border border-warm-gray/30 text-warm-gray hover:border-primary-sage hover:text-primary-sage transition text-sm"
            >
              Edit my answers
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// =====================================================================
// Reveal — paired side-by-side container (unchanged from v1)
// =====================================================================

// =====================================================================
// ReadyCheck — gate before opening the reveal of difficult material.
// Source: RESEARCH-BRIEF.md Part 3, "Reading without containment."
// "A reveal of difficult material when one partner is at work / driving /
//  in an argument with a colleague is harmful. Build a ready check…"
// =====================================================================

export function ReadyCheck({
  station,
  partnerName,
  onReady,
  onLater,
}: {
  station: Station
  partnerName: string
  onReady: () => void
  onLater: () => void
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <Shield className="w-8 h-8 mx-auto text-primary-sage mb-4" />
        <p className="text-[10px] uppercase tracking-wider text-primary-sage mb-2">A check before you open this</p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">
          Are you ready to read this carefully?
        </h2>
        <p className="text-sm text-warm-gray max-w-md mx-auto leading-relaxed">
          {partnerName} just finished their side of <em>{station.name}</em>. The next screen pairs both of your answers.
          Reading what your partner wrote in a hurry — between meetings, while driving, mid-argument with someone else —
          tends to make things worse, not better.
        </p>
      </div>

      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 space-y-5">
        <p className="text-base text-text-dark leading-relaxed">
          Do you have <strong>15 minutes alone</strong>, somewhere private, where you can read this carefully?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onLater}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-warm-gray/40 text-text-dark hover:bg-warm-cream transition text-sm font-medium"
          >
            Not yet — later today
          </button>
          <button
            type="button"
            onClick={onReady}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-sage text-white hover:bg-primary-sage/90 transition text-sm font-medium"
          >
            I'm ready — open it
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-warm-gray italic text-center pt-2 border-t border-warm-gray/15">
          If you tap "later," the link stays valid. Come back when you have the space.
        </p>
      </div>
    </div>
  )
}

export function Reveal({
  station,
  children,
  synthesisPrompt,
  onDone,
}: {
  station: Station
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
  selfName,
  partnerName,
  selfFirst,
  partnerFirst,
}: {
  selfName: string
  partnerName: string
  selfFirst: React.ReactNode
  partnerFirst: React.ReactNode
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      <div className="space-y-4">
        <div className="text-center pb-3 border-b border-warm-gray/15">
          <p className="text-[10px] uppercase tracking-wider text-primary-sage">{selfName}</p>
        </div>
        <div className="space-y-4">{selfFirst}</div>
      </div>
      <div className="space-y-4">
        <div className="text-center pb-3 border-b border-warm-gray/15">
          <p className="text-[10px] uppercase tracking-wider text-soft-rose">{partnerName}</p>
        </div>
        <div className="space-y-4">{partnerFirst}</div>
      </div>
    </div>
  )
}

// =====================================================================
// FillFlow — wraps the per-partner input UI with a submit footer
// =====================================================================

export function FillFlow({
  selfName,
  children,
  canSubmit,
  onSubmit,
  saving,
  submitLabel,
  subtitle,
}: {
  selfName: string
  children: React.ReactNode
  canSubmit: boolean
  onSubmit: () => void
  saving?: boolean
  submitLabel?: string
  subtitle?: string
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Your turn</p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark">{selfName}</h2>
        {subtitle && <p className="text-sm text-warm-gray mt-2 max-w-md mx-auto">{subtitle}</p>}
      </div>
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 md:p-8 space-y-6">
        {children}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || saving}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {saving ? 'Saving…' : submitLabel || 'Submit my answers'}
          {!saving && <ArrowRight className="w-4 h-4" />}
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
