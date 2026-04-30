'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Sparkles, Copy, CheckCircle2, Send, Shield } from 'lucide-react'
import {
  BibliographyPanel,
  JourneyGrid,
  LabHeader,
  OffRamp,
} from './components'
import { decodeState, encodeState, LabUrlState } from './url-state'
import { Station, safetyGate, offRampResources } from './data'

export default function LabLanding() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const stateRaw = searchParams?.get('s') ?? null
  const initial = useMemo(() => decodeState(stateRaw), [stateRaw])

  // If we have valid state in URL, jump to grid view
  // Otherwise show landing → name picker → safety gate → grid
  const [step, setStep] = useState<'landing' | 'names' | 'safety' | 'grid'>(
    initial ? 'grid' : 'landing'
  )
  const [names, setNames] = useState<{ a: string; b: string }>({ a: '', b: '' })

  useEffect(() => {
    if (initial) {
      setNames(initial.names)
      setStep('grid')
    }
  }, [initial])

  function startWithNames(a: string, b: string) {
    const next: LabUrlState = { names: { a: a.trim() || 'Partner A', b: b.trim() || 'Partner B' } }
    setNames(next.names)
    // Encode minimal state in URL so back/refresh preserves names
    const s = encodeState(next)
    router.replace(`/lab?s=${s}`)
    setStep('safety')
  }

  function pickStation(station: Station) {
    const next: LabUrlState = { names }
    const s = encodeState(next)
    router.push(`/lab/${station.id}?s=${s}`)
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF9F7' }}>
      <LabHeader onExit={step === 'grid' ? () => setStep('landing') : undefined} />

      {step === 'landing' && <Intro onContinue={() => setStep('names')} />}

      {step === 'names' && (
        <Names
          initial={names}
          onContinue={({ a, b }) => startWithNames(a, b)}
          onBack={() => setStep('landing')}
        />
      )}

      {step === 'safety' && (
        <SafetyCheck
          name={names.a || 'you'}
          onPass={() => setStep('grid')}
          onBlock={() => {
            /* SafetyCheck renders its own blocked screen */
          }}
        />
      )}

      {step === 'grid' && (
        <>
          <JourneyGrid
            selfName={names.a}
            partnerName={names.b}
            statusMap={{}}
            onPickStation={pickStation}
          />
          <BibliographyPanel />
        </>
      )}

      <OffRamp />
    </main>
  )
}

function Intro({ onContinue }: { onContinue: () => void }) {
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
          <Bullet>
            Each station works like a worksheet you trade. You fill your side, send your partner a link, they fill
            theirs and send back the reveal.
          </Bullet>
          <Bullet>
            We don&apos;t store anything on a server. Your answers travel inside the link itself.
          </Bullet>
          <Bullet>Every station has an honest disclosure of what the research supports — and where it&apos;s weak.</Bullet>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition"
        >
          Start
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-primary-sage flex-shrink-0">·</span>
      <span>{children}</span>
    </div>
  )
}

function Names({
  initial,
  onContinue,
  onBack,
}: {
  initial: { a: string; b: string }
  onContinue: (n: { a: string; b: string }) => void
  onBack: () => void
}) {
  const [a, setA] = useState(initial.a)
  const [b, setB] = useState(initial.b)
  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">Names for the session</h2>
        <p className="text-sm text-warm-gray">
          Yours and your partner&apos;s. They&apos;ll see both names when you send them a station link.
        </p>
      </div>
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-warm-gray mb-2">Your name</label>
          <input
            type="text"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none"
            placeholder="Sam"
            maxLength={60}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-warm-gray mb-2">Your partner&apos;s name</label>
          <input
            type="text"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none"
            placeholder="River"
            maxLength={60}
          />
        </div>
        <button
          type="button"
          disabled={!a.trim() || !b.trim()}
          onClick={() => onContinue({ a: a.trim(), b: b.trim() })}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full text-xs text-warm-gray hover:text-text-dark transition"
        >
          Back
        </button>
      </div>
    </div>
  )
}

function SafetyCheck({
  name,
  onPass,
  onBlock,
}: {
  name: string
  onPass: () => void
  onBlock: () => void
}) {
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | undefined>>({})
  const [showBlocked, setShowBlocked] = useState(false)

  const allAnswered = safetyGate.questions.every((q) => answers[q.id] != null)
  const blocked = safetyGate.questions.some((q) => answers[q.id] === q.blocksOn)

  function answer(id: string, v: 'yes' | 'no') {
    setAnswers((a) => ({ ...a, [id]: v }))
  }
  function submit() {
    if (blocked) {
      setShowBlocked(true)
    } else {
      onPass()
    }
  }

  if (showBlocked) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-white border border-soft-rose/30 rounded-2xl p-6 md:p-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-soft-rose/15 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-soft-rose" />
            </div>
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-semibold text-text-dark mb-3">
                Let&apos;s pause here.
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
          A check before we begin{name && name !== 'you' ? `, ${name}` : ''}
        </h2>
        <p className="text-sm text-warm-gray max-w-md mx-auto">
          Five questions. Only you see your answers — they don&apos;t leave this device.
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
          Continue to the stations
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
