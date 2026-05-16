'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Copy,
  MessageSquare,
  RefreshCw,
  Send,
  Shield,
  Sparkles,
  Wind,
  X,
} from 'lucide-react'
import NotTherapyDisclaimer from '@/components/NotTherapyDisclaimer'
import {
  FRAMEWORKS,
  FRAMEWORK_INSTRUCTIONS,
  Framework,
  FrameworkId,
  PHONE,
  REPAIRS,
  Role,
  SHARED_RULES,
  Thread,
  ThreadMessage,
  containsPartnerDiagnosis,
  containsSafety,
  decodeThread,
  encodeThread,
  frameworkBlurb,
  smsUrl,
} from './constants'

// =====================================================================
// State machine
// =====================================================================

type BodyState = 'calm' | 'activated' | 'flooded' | null
type Direction = 'send' | 'receive' | null
type Intent = 'heard' | 'win' | null
type View = 'compose' | 'inbox' | 'paste'

type PrimaryEmotionResult =
  | { blocked: true; tentativePhrasing: string }
  | {
      blocked?: false
      secondaryEmotionsObserved?: string[]
      probablePrimaryEmotion?: string
      tentativePhrasing?: string
    }
  | null

type TranslationResult = {
  translation?: string
  frameworkNotes?: string
  guardrailFlag?: string | null
} | null

export default function TranslatorClient() {
  // Persistent across the journey
  const [role, setRole] = useState<Role | null>(null)
  const [view, setView] = useState<View>('compose')
  const [thread, setThread] = useState<Thread>([])
  const [onboardOpen, setOnboardOpen] = useState(false)

  // Per-message state (cleared between sends)
  const [bodyState, setBodyState] = useState<BodyState>(null)
  const [direction, setDirection] = useState<Direction>(null)
  const [rawInput, setRawInput] = useState('')
  const [context, setContext] = useState('')
  const [rawSubmitted, setRawSubmitted] = useState(false)
  const [primaryEmotion, setPrimaryEmotion] = useState<PrimaryEmotionResult>(null)
  const [primaryConfirmed, setPrimaryConfirmed] = useState(false)
  const [primaryOverride, setPrimaryOverride] = useState('')
  const [intent, setIntent] = useState<Intent>(null)
  const [framework, setFramework] = useState<FrameworkId | null>(null)
  const [translation, setTranslation] = useState<TranslationResult>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<'safety' | string | null>(null)
  const [refineCount, setRefineCount] = useState(0)
  const [appended, setAppended] = useState('')
  const [floodEndsAt, setFloodEndsAt] = useState<number | null>(null)
  const [floodTick, setFloodTick] = useState(0) // forces re-render each second
  const [primaryLoading, setPrimaryLoading] = useState(false)

  // Boot: decode #ft1:... from URL hash
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    const incoming = decodeThread(hash)
    if (incoming && incoming.length) {
      setThread(incoming)
      const last = incoming[incoming.length - 1]
      const nextRole: Role = last.from === 'jason' ? 'tamara' : 'jason'
      setRole(nextRole)
      setView('inbox')
      if (nextRole === 'tamara') setOnboardOpen(true)
    }
  }, [])

  // Flood timer
  useEffect(() => {
    if (bodyState !== 'flooded' || !floodEndsAt) return
    const id = setInterval(() => setFloodTick((n) => n + 1), 1000)
    return () => clearInterval(id)
  }, [bodyState, floodEndsAt])

  const resetMessage = useCallback(() => {
    setBodyState(null)
    setDirection(null)
    setRawInput('')
    setContext('')
    setRawSubmitted(false)
    setPrimaryEmotion(null)
    setPrimaryConfirmed(false)
    setPrimaryOverride('')
    setIntent(null)
    setFramework(null)
    setTranslation(null)
    setRefineCount(0)
    setAppended('')
    setError(null)
    setFloodEndsAt(null)
  }, [])

  const switchUser = useCallback(() => {
    setRole(null)
    setView('compose')
    setOnboardOpen(false)
    resetMessage()
  }, [resetMessage])

  // ===================================================================
  // Model calls
  // ===================================================================

  async function askClaude(prompt: string): Promise<string> {
    const r = await fetch('/api/translator', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    if (!r.ok) {
      const e = await r.json().catch(() => ({}))
      throw new Error((e as { error?: string }).error || `HTTP ${r.status}`)
    }
    const data = (await r.json()) as { text?: string }
    return data.text || ''
  }

  function parseJsonish<T>(raw: string): T {
    let s = (raw || '').trim()
    s = s.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
    const i = s.indexOf('{')
    const j = s.lastIndexOf('}')
    if (i >= 0 && j > i) s = s.slice(i, j + 1)
    return JSON.parse(s) as T
  }

  async function runPrimaryCheck() {
    setPrimaryEmotion(null)
    setPrimaryConfirmed(false)
    setPrimaryOverride('')
    setError(null)

    if (containsPartnerDiagnosis(rawInput) && direction === 'send') {
      setPrimaryEmotion({
        blocked: true,
        tentativePhrasing:
          "Before we can find what's underneath, can you rewrite this focused on what's happening inside you, not what you think your partner is doing? (We caught language like \"you always,\" \"you're a…\" or a clinical label aimed at them.)",
      })
      return
    }

    setPrimaryLoading(true)
    const speaker = role === 'jason' ? 'Jason' : 'Tamara'
    const prompt = `Read the speaker's raw input. Identify ONLY the probable primary emotion underneath the surface (Sue Johnson EFT framework). Do NOT translate. Do NOT advise. Do NOT name parts.

Primary emotions: fear, sadness, hurt, longing, shame, grief, loneliness, helplessness, joy, tenderness.
Secondary emotions (NOT primary): anger, contempt, frustration, irritation, anxiety, defensiveness, numbness, shutdown.

If the input contains diagnosis of the partner (e.g. "you're a narcissist," "you're gaslighting"), set probablePrimaryEmotion to "blocked" and tentativePhrasing to: "Before we can find what's underneath, can you rewrite this focused on what's happening inside you, not what you think your partner is doing?"

SPEAKER: ${speaker}
DIRECTION: ${direction === 'receive' ? "speaker is decoding partner's words; identify primary emotion in the PARTNER'S words as relayed" : "speaker is expressing their own feelings"}
CONTEXT: ${context || '(none)'}
RAW INPUT:
${rawInput}

Output strict JSON ONLY (no code fences, no prose). Schema:
{ "secondaryEmotionsObserved": ["..."], "probablePrimaryEmotion": "single word", "tentativePhrasing": "one gentle sentence offered to the speaker" }
DO NOT OUTPUT ANYTHING OTHER THAN VALID JSON.`

    try {
      const raw = await askClaude(prompt)
      const obj = parseJsonish<{
        probablePrimaryEmotion?: string
        tentativePhrasing?: string
        secondaryEmotionsObserved?: string[]
      }>(raw)
      if (obj.probablePrimaryEmotion === 'blocked') {
        setPrimaryEmotion({ blocked: true, tentativePhrasing: obj.tentativePhrasing || '' })
      } else {
        setPrimaryEmotion(obj)
      }
    } catch (e) {
      setError('The translator hiccuped on the primary-emotion check. Try again in a moment.')
      setPrimaryEmotion({ blocked: true, tentativePhrasing: "Couldn't reach the model. Try again." })
    } finally {
      setPrimaryLoading(false)
    }
  }

  async function runTranslation(isRefine = false, fwOverride?: FrameworkId) {
    const fw = fwOverride ?? framework
    if (!fw) return
    setLoading(true)
    setTranslation(null)
    setError(null)
    setAppended('')

    const speaker = role === 'jason' ? 'Jason' : 'Tamara'
    const listener =
      role === 'jason'
        ? 'Tamara (a licensed therapist; trained in NVC, Gottman, EFT, IFS, Polyvagal, attachment theory, bibliotherapy)'
        : 'Jason (non-therapist, ADHD, plain-language preferred)'
    const primary =
      primaryOverride.trim() ||
      (primaryEmotion && !primaryEmotion.blocked
        ? (primaryEmotion as { probablePrimaryEmotion?: string }).probablePrimaryEmotion || ''
        : '')

    const refineNote = isRefine
      ? "\nThe previous translation didn't feel right to the speaker. Try a fresher angle. Be more concrete and less polished. Closer to the speaker's actual voice."
      : ''

    let threadContext = ''
    if (thread.length) {
      threadContext =
        '\nTHREAD HISTORY (most recent last) — use only as context for continuity, do not quote or reference directly:\n' +
        thread.map((m) => `[${m.from}, ${m.framework}]: ${m.translation}`).join('\n')
    }

    const prompt = `${SHARED_RULES}

FRAMEWORK INSTRUCTIONS:
${FRAMEWORK_INSTRUCTIONS[fw]}

SPEAKER: ${speaker}
LISTENER: ${listener}
DIRECTION: ${direction === 'send' ? "translate speaker's raw words INTO the framework register for the listener" : "translate the partner's clinical/raw words INTO plain language for the speaker"}
CONFIRMED PRIMARY EMOTION: ${primary || '(unknown)'}
CONTEXT: ${context || '(none)'}${threadContext}
RAW INPUT:
${rawInput}${refineNote}

Output strict JSON ONLY (no code fences, no prose, no explanation). Schema:
{
  "translation": "the translation — under 120 words, natural, specific",
  "frameworkNotes": "one sentence on which framework move you applied",
  "guardrailFlag": null
}
If the input violates a non-negotiable rule (diagnoses partner, asks listener to do clinical labor, etc.), set translation to "" and guardrailFlag to a short string explaining why.
DO NOT OUTPUT ANYTHING OTHER THAN VALID JSON. DO NOT INCLUDE BACKTICKS OR CODE FENCES.`

    try {
      const raw = await askClaude(prompt)
      const obj = parseJsonish<TranslationResult>(raw)
      setTranslation(obj)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Network error.'
      setError(
        msg.includes('GOOGLE_API_KEY')
          ? 'The translator needs GOOGLE_API_KEY in Vercel env (same key as ChargeRight/InspectRight). Set it and redeploy.'
          : 'The translator is having a moment. Take a breath and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // ===================================================================
  // View dispatcher
  // ===================================================================

  const accentClass = role === 'tamara' ? 'soft-rose' : 'primary-sage'

  let body: React.ReactNode = null
  if (view === 'paste') {
    body = (
      <PasteReceive
        onDecoded={(t) => {
          setThread(t)
          const last = t[t.length - 1]
          const nextRole: Role = last.from === 'jason' ? 'tamara' : 'jason'
          setRole(nextRole)
          setView('inbox')
          setOnboardOpen(nextRole === 'tamara' && t.length === 1)
        }}
        onBack={() => setView('compose')}
      />
    )
  } else if (view === 'inbox') {
    body = (
      <Inbox_
        role={role!}
        thread={thread}
        onboardOpen={onboardOpen}
        onDismissOnboard={() => setOnboardOpen(false)}
        onReply={() => {
          setView('compose')
          setDirection('send')
          resetMessage()
        }}
      />
    )
  } else if (!role) {
    body = (
      <RoleGate
        onPickJason={() => {
          setRole('jason')
          setDirection('send')
        }}
        onPickTamara={() => {
          setRole('tamara')
          setDirection('send')
          setFramework('plain')
        }}
        onPaste={() => setView('paste')}
      />
    )
  } else if (bodyState === 'flooded') {
    body = (
      <FloodLock
        floodEndsAt={floodEndsAt}
        tick={floodTick}
        onBack={() => {
          setBodyState('activated')
          setFloodEndsAt(null)
        }}
      />
    )
  } else if (!bodyState) {
    body = (
      <BodyCheck
        onPick={(s) => {
          setBodyState(s)
          if (s === 'flooded') setFloodEndsAt(Date.now() + 20 * 60 * 1000)
        }}
      />
    )
  } else if (!direction) {
    body = (
      <DirectionPick
        onSend={() => setDirection('send')}
        onReceive={() => {
          setDirection('receive')
          setFramework('plain')
        }}
      />
    )
  } else if (!rawSubmitted || error === 'safety') {
    body = (
      <RawInput
        isReceive={direction === 'receive'}
        rawValue={rawInput}
        contextValue={context}
        onRawChange={setRawInput}
        onContextChange={setContext}
        showSafety={error === 'safety'}
        onClearSafety={() => setError(null)}
        onContinue={() => {
          if (!rawInput.trim()) return
          if (containsSafety(rawInput)) {
            setError('safety')
            return
          }
          setRawSubmitted(true)
          runPrimaryCheck()
        }}
      />
    )
  } else if (primaryEmotion === null || primaryLoading) {
    body = <PrimaryLoading />
  } else if (primaryEmotion.blocked) {
    body = (
      <BlockedDiagnosis
        message={primaryEmotion.tentativePhrasing}
        onEdit={() => {
          setPrimaryEmotion(null)
          setRawSubmitted(false)
        }}
      />
    )
  } else if (!primaryConfirmed) {
    body = (
      <PrimaryCheck
        rawInput={rawInput}
        primary={primaryEmotion as { secondaryEmotionsObserved?: string[]; probablePrimaryEmotion?: string; tentativePhrasing?: string }}
        override={primaryOverride}
        onOverride={setPrimaryOverride}
        onConfirm={() => setPrimaryConfirmed(true)}
        onEdit={() => {
          setPrimaryEmotion(null)
          setPrimaryConfirmed(false)
          setRawSubmitted(false)
        }}
      />
    )
  } else if (!intent) {
    body = (
      <IntentGate
        onHeard={() => setIntent('heard')}
        onWin={() => setIntent('win')}
      />
    )
  } else if (intent === 'win') {
    body = (
      <WinRefuse
        onLater={() => setIntent(null)}
        onActually={() => setIntent('heard')}
      />
    )
  } else if (!framework) {
    body = (
      <FrameworkPicker
        isReceive={direction === 'receive'}
        onPick={(id) => {
          setFramework(id)
          runTranslation(false, id)
        }}
      />
    )
  } else {
    body = (
      <TranslationView
        role={role}
        framework={framework}
        rawInput={rawInput}
        context={context}
        loading={loading}
        translation={translation}
        error={error && error !== 'safety' ? error : null}
        appended={appended}
        refineCount={refineCount}
        thread={thread}
        primaryEmotion={primaryEmotion as { probablePrimaryEmotion?: string } | null}
        primaryOverride={primaryOverride}
        onAppendRepair={(r) => setAppended(r)}
        onClearAppend={() => setAppended('')}
        onSent={(finalThread) => setThread(finalThread)}
        onRefine={() => {
          setRefineCount((c) => c + 1)
          runTranslation(true)
        }}
        onSwitchFramework={() => {
          setFramework(null)
          setTranslation(null)
          setAppended('')
        }}
        onStartOver={() => {
          resetMessage()
          if (direction === 'receive') {
            setDirection('receive')
            setFramework('plain')
          }
        }}
      />
    )
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <Header
        role={role}
        view={view}
        threadLen={thread.length}
        onSwitch={switchUser}
        onBackToThread={() => setView('inbox')}
      />

      <div className="max-w-2xl mx-auto px-4 pb-24 pt-2 md:pt-4">{body}</div>

      <div className="max-w-2xl mx-auto px-4 pb-12">
        <NotTherapyDisclaimer variant="inline" />
      </div>
    </main>
  )
}

// =====================================================================
// Header — eyebrow + role chip + switch
// =====================================================================

function Header({
  role,
  view,
  threadLen,
  onSwitch,
  onBackToThread,
}: {
  role: Role | null
  view: View
  threadLen: number
  onSwitch: () => void
  onBackToThread: () => void
}) {
  return (
    <header className="px-4 md:px-8 pt-6 pb-2">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-primary-sage" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary-sage font-medium">
            Feelings Translator · Lennox Fields
          </span>
        </div>
        <div className="flex items-center gap-2">
          {role && (
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${
                role === 'tamara'
                  ? 'bg-soft-rose/15 text-soft-rose'
                  : 'bg-primary-sage/15 text-primary-sage'
              }`}
            >
              {role === 'jason' ? "I'm Jason" : "I'm Tamara"}
            </span>
          )}
          {threadLen > 0 && view !== 'inbox' && (
            <button
              type="button"
              onClick={onBackToThread}
              className="text-xs text-warm-gray hover:text-text-dark transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Thread
            </button>
          )}
          {role && (
            <button
              type="button"
              onClick={onSwitch}
              className="text-xs text-warm-gray hover:text-text-dark transition"
            >
              Switch
            </button>
          )}
        </div>
      </div>
      <div className="max-w-2xl mx-auto pt-4">
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-text-dark leading-tight">
          Be heard, not right.
        </h1>
        <p className="text-sm text-warm-gray mt-1">
          Primary-emotion first. We translate your interior, not your partner's.
        </p>
      </div>
    </header>
  )
}

// =====================================================================
// Card wrapper
// =====================================================================

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-warm-gray/15 rounded-2xl p-6 md:p-7 ${className}`}>
      {children}
    </div>
  )
}

function CardHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string
  title: string
  sub?: string
}) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.22em] text-primary-sage font-medium mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-xl md:text-2xl font-semibold text-text-dark leading-tight">
        {title}
      </h2>
      {sub && <p className="text-sm text-warm-gray mt-2 leading-relaxed">{sub}</p>}
    </div>
  )
}

// =====================================================================
// Role gate
// =====================================================================

function RoleGate({
  onPickJason,
  onPickTamara,
  onPaste,
}: {
  onPickJason: () => void
  onPickTamara: () => void
  onPaste: () => void
}) {
  return (
    <div className="py-8 md:py-12">
      <Card>
        <CardHeading
          title="Who are you right now?"
          sub="Pick one. We'll default the direction and language register for you."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onPickJason}
            className="px-5 py-4 rounded-2xl bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            I'm Jason
          </button>
          <button
            type="button"
            onClick={onPickTamara}
            className="px-5 py-4 rounded-2xl bg-soft-rose text-white font-medium hover:bg-soft-rose/90 transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            I'm Tamara
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-warm-gray/15">
          <p className="text-sm text-warm-gray mb-3">Or — receiving a message from your partner?</p>
          <button
            type="button"
            onClick={onPaste}
            className="w-full px-5 py-3 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage hover:bg-primary-sage/5 transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Clipboard className="w-4 h-4" />
            Paste an incoming message
          </button>
        </div>

        <p className="text-xs text-warm-gray italic mt-5 text-center">
          No accounts. No storage. Nothing leaves this window unless you copy it or send it.
        </p>
      </Card>
    </div>
  )
}

// =====================================================================
// Paste-receive
// =====================================================================

function PasteReceive({
  onDecoded,
  onBack,
}: {
  onDecoded: (t: Thread) => void
  onBack: () => void
}) {
  const [text, setText] = useState('')
  const [err, setErr] = useState<string | null>(null)

  function decode() {
    const t = decodeThread(text)
    if (!t || !t.length) {
      setErr("Couldn't find a valid translator token. Make sure the ft1:… part is included.")
      return
    }
    onDecoded(t)
  }

  return (
    <div className="py-8">
      <Card>
        <CardHeading
          title="Paste the iMessage from your partner"
          sub="Drop the whole message (or just the ft1:… token at the end). We'll decode the thread."
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the full iMessage here. The receipt token starts with ft1: at the end."
          rows={6}
          className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none resize-y font-mono text-sm"
        />
        {err && <p className="text-sm text-crisis-clay mt-2">{err}</p>}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            type="button"
            onClick={decode}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition flex-1"
          >
            Decode
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3 rounded-full text-warm-gray hover:text-text-dark transition text-sm"
          >
            Back
          </button>
        </div>
      </Card>
    </div>
  )
}

// =====================================================================
// Inbox (thread view + onboarding banner)
// =====================================================================

function Inbox_({
  role,
  thread,
  onboardOpen,
  onDismissOnboard,
  onReply,
}: {
  role: Role
  thread: Thread
  onboardOpen: boolean
  onDismissOnboard: () => void
  onReply: () => void
}) {
  return (
    <div className="py-6 md:py-8 space-y-4">
      {role === 'tamara' && onboardOpen && <TamaraOnboard onDismiss={onDismissOnboard} />}
      <Card>
        <CardHeading
          eyebrow={role === 'tamara' ? 'A message from Jason' : 'A message from Tamara'}
          title="The thread so far"
        />
        <div className="space-y-3">
          {thread.map((m, i) => (
            <Bubble key={i} m={m} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-6 pt-5 border-t border-warm-gray/15">
          <button
            type="button"
            onClick={onReply}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium transition flex-1 ${
              role === 'tamara'
                ? 'bg-soft-rose hover:bg-soft-rose/90'
                : 'bg-primary-sage hover:bg-primary-sage/90'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Reply through the translator
          </button>
          <button
            type="button"
            className="px-5 py-3 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
            onClick={() => { /* explicit no-op; close the tab if you like */ }}
          >
            Just read for now
          </button>
        </div>
      </Card>
    </div>
  )
}

function Bubble({ m }: { m: ThreadMessage }) {
  const [open, setOpen] = useState(false)
  const isJason = m.from === 'jason'
  const fwLabel = FRAMEWORKS.find((f) => f.id === m.framework)?.label || m.framework
  return (
    <div
      className={`p-4 rounded-2xl border ${
        isJason
          ? 'bg-primary-sage/8 border-primary-sage/20 mr-6'
          : 'bg-soft-rose/8 border-soft-rose/25 ml-6'
      }`}
      style={{ backgroundColor: isJason ? 'rgba(117,133,111,0.08)' : 'rgba(192,145,145,0.08)' }}
    >
      <p
        className={`text-[10px] uppercase tracking-[0.18em] font-medium mb-1 ${
          isJason ? 'text-primary-sage' : 'text-soft-rose'
        }`}
      >
        {isJason ? 'Jason' : 'Tamara'} · {fwLabel}
      </p>
      <p className="text-sm text-text-dark whitespace-pre-wrap leading-relaxed">{m.translation}</p>
      {m.raw && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-xs text-warm-gray hover:text-text-dark transition flex items-center gap-1"
          >
            {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {open ? 'Hide the raw version' : 'Show the raw version'}
          </button>
          {open && (
            <div className="mt-2 p-3 rounded-lg bg-paper text-sm text-warm-gray whitespace-pre-wrap leading-relaxed">
              {m.raw}
            </div>
          )}
        </>
      )}
      {(m.primary || m.context) && (
        <p className="mt-2 text-[11px] text-warm-gray italic">
          {m.primary && <>Primary: {m.primary}</>}
          {m.primary && m.context && ' · '}
          {m.context && <>Context: {m.context}</>}
        </p>
      )}
    </div>
  )
}

function TamaraOnboard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="bg-soft-rose/8 border border-soft-rose/25 rounded-2xl p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-soft-rose font-medium mb-2">
            For Tam, first time here
          </p>
          <h3 className="font-heading text-lg font-semibold text-text-dark mb-2">
            Jason built this. Here's what's under the hood.
          </h3>
          <p className="text-sm text-text-dark leading-relaxed">
            It runs whatever raw thing he'd normally text you through a translator that surfaces the
            primary emotion underneath (Sue Johnson / EFT) and rewrites it in NVC, Gottman
            soft-startup, IFS, polyvagal, or plain language — whichever fits the moment.
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="text-warm-gray hover:text-text-dark flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <details className="mt-4">
        <summary className="text-xs text-warm-gray cursor-pointer hover:text-text-dark">
          What it refuses to do
        </summary>
        <ul className="mt-2 ml-4 text-xs text-warm-gray space-y-1 list-disc">
          <li>Diagnose you ("you're avoidant" — blocked at the regex layer before the model is called)</li>
          <li>Translate while he's flooded (20-min hard lock per Gottman's DPA rule)</li>
          <li>Help him "win" an argument (intent gate refuses)</li>
          <li>Pretend to be a couples therapist — it's a translator, not a substitute for EFT work together</li>
        </ul>
      </details>
      <details className="mt-2">
        <summary className="text-xs text-warm-gray cursor-pointer hover:text-text-dark">
          What you can do here
        </summary>
        <ul className="mt-2 ml-4 text-xs text-warm-gray space-y-1 list-disc">
          <li>Tap "Show the raw version" on his message to see what he actually said before translation.</li>
          <li>Reply through the same tool if you want — your default framework is plain language.</li>
          <li>Or just close this and respond however you want. No obligation.</li>
        </ul>
      </details>
    </div>
  )
}

// =====================================================================
// Body check + flood lock
// =====================================================================

function BodyCheck({ onPick }: { onPick: (s: BodyState) => void }) {
  return (
    <div className="py-8">
      <Card>
        <CardHeading
          eyebrow="Step one"
          title="Body check"
          sub="Gottman's rule: above 100 BPM your prefrontal cortex can't hear your partner. We respect that."
        />
        <div className="grid grid-cols-1 gap-2">
          <PickBtn label="Calm enough to think" onClick={() => onPick('calm')} />
          <PickBtn label="Activated, but functional" onClick={() => onPick('activated')} />
          <PickBtn
            label="Flooded — too much"
            onClick={() => onPick('flooded')}
            tone="warn"
          />
        </div>
      </Card>
    </div>
  )
}

function FloodLock({
  floodEndsAt,
  tick,
  onBack,
}: {
  floodEndsAt: number | null
  tick: number
  onBack: () => void
}) {
  void tick // forces re-render
  const remaining = Math.max(0, (floodEndsAt || 0) - Date.now())
  const m = Math.floor(remaining / 60000)
  const s = Math.floor((remaining % 60000) / 1000)
  const done = remaining <= 0
  return (
    <div className="py-8">
      <div className="bg-white border border-warm-sand/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-3 mb-5">
          <Wind className="w-5 h-5 text-warm-sand flex-shrink-0 mt-1" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-warm-sand font-medium mb-1">
              Pause · 20 minutes
            </p>
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-text-dark">
              Your nervous system needs the time.
            </h2>
            <p className="text-sm text-warm-gray mt-2 leading-relaxed">
              About 20 minutes for norepinephrine to clear. Translation is locked until then. Not punishment — the
              same hard rule Gottman gives every couple.
            </p>
          </div>
        </div>
        <div className="text-5xl font-mono tabular-nums text-center text-text-dark py-4 border-y border-warm-gray/15">
          {m}:{String(s).padStart(2, '0')}
        </div>
        <h3 className="font-heading text-base font-semibold text-text-dark mt-5 mb-2">
          While you wait — actually self-soothe
        </h3>
        <ul className="text-sm text-text-dark space-y-1 list-disc ml-5">
          <li>Slow exhale longer than inhale (4 in, 8 out) for two minutes</li>
          <li>Walk somewhere neutral. No phone scrolling about the fight.</li>
          <li>Drink water. Wash your face with cool water.</li>
          <li><strong>Do not rehearse the argument in your head.</strong> That keeps you flooded.</li>
          <li>Notice five things you can see in the room.</li>
        </ul>
        <button
          type="button"
          onClick={onBack}
          disabled={!done}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          I'm back
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// Direction
// =====================================================================

function DirectionPick({ onSend, onReceive }: { onSend: () => void; onReceive: () => void }) {
  return (
    <div className="py-8">
      <Card>
        <CardHeading
          eyebrow="Step two"
          title="Which direction?"
          sub="Send = your raw words → your partner's register. Receive = their words → plain English."
        />
        <div className="grid grid-cols-1 gap-2">
          <PickBtn label="→ Translate my words for them" onClick={onSend} />
          <PickBtn label="← Translate their words for me" onClick={onReceive} />
        </div>
      </Card>
    </div>
  )
}

// =====================================================================
// Raw input + safety panel
// =====================================================================

function RawInput({
  isReceive,
  rawValue,
  contextValue,
  onRawChange,
  onContextChange,
  showSafety,
  onClearSafety,
  onContinue,
}: {
  isReceive: boolean
  rawValue: string
  contextValue: string
  onRawChange: (s: string) => void
  onContextChange: (s: string) => void
  showSafety: boolean
  onClearSafety: () => void
  onContinue: () => void
}) {
  if (showSafety) return <SafetyPanel onBack={onClearSafety} />
  return (
    <div className="py-8">
      <Card>
        <CardHeading
          eyebrow="Step three"
          title={isReceive ? 'Paste what they said' : 'Write the unfiltered version'}
          sub={
            isReceive
              ? "Paste their words exactly. We'll strip the clinical layer and surface what's underneath."
              : "Whatever comes out. Swearing is fine. Don't edit. The point is to start from the truth."
          }
        />
        <textarea
          value={rawValue}
          onChange={(e) => onRawChange(e.target.value)}
          placeholder={
            isReceive
              ? 'e.g. "I notice I\'m feeling some dysregulation around our co-regulation patterns and a part of me…"'
              : 'e.g. "I am so f***ing tired of feeling like I don\'t matter in this house…"'
          }
          rows={5}
          className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none resize-y text-sm leading-relaxed"
        />
        <label className="block text-xs uppercase tracking-wider text-warm-gray mt-4 mb-2">
          Optional: what just happened? (one sentence)
        </label>
        <input
          type="text"
          value={contextValue}
          onChange={(e) => onContextChange(e.target.value)}
          placeholder='e.g. "We were arguing about the dishes 30 min ago"'
          className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none text-sm"
        />
        <button
          type="button"
          onClick={onContinue}
          disabled={!rawValue.trim()}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </Card>
    </div>
  )
}

function SafetyPanel({ onBack }: { onBack: () => void }) {
  return (
    <div className="py-8">
      <div className="bg-white border border-crisis-clay/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-5 h-5 text-crisis-clay flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-heading text-xl font-semibold text-text-dark mb-2">
              Pause — we're stopping here.
            </h2>
            <p className="text-sm text-warm-gray leading-relaxed">
              What you wrote includes language about safety or self-harm. This translator is not the right tool
              right now. Please reach out to a human:
            </p>
          </div>
        </div>
        <ul className="space-y-2 mb-5">
          <li className="p-3 rounded-lg bg-warm-cream">
            <strong className="text-text-dark text-sm">988</strong>
            <span className="text-xs text-warm-gray block mt-0.5">Suicide &amp; Crisis Lifeline (call or text, US)</span>
          </li>
          <li className="p-3 rounded-lg bg-warm-cream">
            <strong className="text-text-dark text-sm">1-800-799-7233</strong>
            <span className="text-xs text-warm-gray block mt-0.5">National Domestic Violence Hotline</span>
          </li>
          <li className="p-3 rounded-lg bg-warm-cream">
            <strong className="text-text-dark text-sm">911</strong>
            <span className="text-xs text-warm-gray block mt-0.5">If you're in immediate danger</span>
          </li>
        </ul>
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
        >
          Back to edit
        </button>
      </div>
    </div>
  )
}

// =====================================================================
// Primary emotion check
// =====================================================================

function PrimaryLoading() {
  return (
    <div className="py-8">
      <Card>
        <CardHeading
          title="Looking under the surface…"
          sub='Sue Johnson would call this "affect assembly." Anger is rarely the bottom floor.'
        />
        <div className="flex items-center gap-3 py-3">
          <div className="w-5 h-5 border-2 border-primary-sage/30 border-t-primary-sage rounded-full animate-spin" />
          <p className="text-sm text-warm-gray">Working…</p>
        </div>
      </Card>
    </div>
  )
}

function BlockedDiagnosis({ message, onEdit }: { message: string; onEdit: () => void }) {
  return (
    <div className="py-8">
      <div className="bg-white border border-warm-sand/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-3 mb-3">
          <Shield className="w-5 h-5 text-warm-sand flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-heading text-xl font-semibold text-text-dark mb-2">
              Let's try that again
            </h2>
            <p className="text-sm font-medium text-text-dark mb-2">
              This translator only models YOUR feelings.
            </p>
            <p className="text-sm text-warm-gray leading-relaxed">{message}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition"
        >
          Edit my words
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function PrimaryCheck({
  rawInput,
  primary,
  override,
  onOverride,
  onConfirm,
  onEdit,
}: {
  rawInput: string
  primary: { secondaryEmotionsObserved?: string[]; probablePrimaryEmotion?: string; tentativePhrasing?: string }
  override: string
  onOverride: (s: string) => void
  onConfirm: () => void
  onEdit: () => void
}) {
  return (
    <div className="py-8">
      <Card>
        <CardHeading
          eyebrow="What's underneath"
          title="Does this land?"
        />
        <div className="bg-paper rounded-lg p-3 text-sm text-warm-gray whitespace-pre-wrap leading-relaxed mb-4">
          {rawInput}
        </div>
        <p className="text-base text-text-dark leading-relaxed mb-3">
          {primary.tentativePhrasing}
        </p>
        {primary.secondaryEmotionsObserved && primary.secondaryEmotionsObserved.length > 0 && (
          <p className="text-xs text-warm-gray mb-4">
            On the surface: {primary.secondaryEmotionsObserved.join(', ')}. Underneath (best guess):{' '}
            <strong className="text-text-dark">{primary.probablePrimaryEmotion}</strong>.
          </p>
        )}
        <label className="block text-xs uppercase tracking-wider text-warm-gray mb-2">
          Or override with one word
        </label>
        <input
          type="text"
          value={override}
          onChange={(e) => onOverride(e.target.value)}
          placeholder="e.g. lonely, scared, ashamed, longing, grief"
          className="w-full p-3 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none text-sm"
        />
        <div className="flex flex-col sm:flex-row gap-2 mt-5">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition flex-1"
          >
            Yes, that's it
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="px-5 py-3 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
          >
            Edit my words
          </button>
        </div>
      </Card>
    </div>
  )
}

// =====================================================================
// Intent gate
// =====================================================================

function IntentGate({ onHeard, onWin }: { onHeard: () => void; onWin: () => void }) {
  return (
    <div className="py-8">
      <Card>
        <CardHeading
          eyebrow="One more honest question"
          title="What do you actually want here?"
          sub="No wrong answer. The tool will only work for one of these."
        />
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={onHeard}
            className="px-5 py-4 rounded-2xl bg-primary-sage text-white font-medium hover:bg-primary-sage/90 transition text-left"
          >
            I want to be heard.
          </button>
          <button
            type="button"
            onClick={onWin}
            className="px-5 py-4 rounded-2xl bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-left"
          >
            I want to win this argument.
          </button>
        </div>
      </Card>
    </div>
  )
}

function WinRefuse({ onLater, onActually }: { onLater: () => void; onActually: () => void }) {
  return (
    <div className="py-8">
      <div className="bg-white border border-warm-sand/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-5 h-5 text-warm-sand flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-heading text-xl font-semibold text-text-dark mb-2">
              Come back when you want to be understood.
            </h2>
            <p className="text-sm text-text-dark leading-relaxed">
              This tool is for being heard. If you're trying to win, the translation will land as contempt — the
              most divorce-predictive thing in Gottman's 30 years of data. Walk it off. Come back.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onLater}
            className="px-5 py-2.5 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
          >
            I'll come back later
          </button>
          <button
            type="button"
            onClick={onActually}
            className="px-5 py-2.5 rounded-full bg-primary-sage text-white hover:bg-primary-sage/90 transition text-sm"
          >
            Actually — I want to be heard
          </button>
        </div>
      </div>
    </div>
  )
}

// =====================================================================
// Framework picker
// =====================================================================

function FrameworkPicker({
  isReceive,
  onPick,
}: {
  isReceive: boolean
  onPick: (id: FrameworkId) => void
}) {
  return (
    <div className="py-8">
      <Card>
        <CardHeading
          eyebrow="Step four"
          title="Which register?"
          sub={
            isReceive
              ? 'Default for receive mode is plain language. You can override.'
              : 'Pick the one that fits the moment. You can refine after.'
          }
        />
        <div className="flex flex-wrap gap-2">
          {FRAMEWORKS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onPick(f.id)}
              title={f.hint}
              className="px-4 py-2 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage hover:bg-primary-sage/5 text-sm transition"
            >
              {f.label}
              {f.caveat && <span className="ml-1 text-warm-sand">⚠</span>}
            </button>
          ))}
        </div>
        <div className="mt-5 pt-5 border-t border-warm-gray/15 space-y-2">
          {FRAMEWORKS.map((f) => (
            <div key={f.id} className="text-xs text-warm-gray leading-relaxed">
              <strong className="text-text-dark">{f.label}</strong> — {f.hint}
              {f.caveat && (
                <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-warm-sand/10 text-warm-sand text-[10px] uppercase tracking-wider">
                  contested science
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// =====================================================================
// Translation view + send / share / repair
// =====================================================================

function TranslationView({
  role,
  framework,
  rawInput,
  context,
  loading,
  translation,
  error,
  appended,
  refineCount,
  thread,
  primaryEmotion,
  primaryOverride,
  onAppendRepair,
  onClearAppend,
  onSent,
  onRefine,
  onSwitchFramework,
  onStartOver,
}: {
  role: Role | null
  framework: FrameworkId
  rawInput: string
  context: string
  loading: boolean
  translation: TranslationResult
  error: string | null
  appended: string
  refineCount: number
  thread: Thread
  primaryEmotion: { probablePrimaryEmotion?: string } | null
  primaryOverride: string
  onAppendRepair: (r: string) => void
  onClearAppend: () => void
  onSent: (t: Thread) => void
  onRefine: () => void
  onSwitchFramework: () => void
  onStartOver: () => void
}) {
  const [copyState, setCopyState] = useState<'idle' | 'msg' | 'tx' | 'link'>('idle')

  const fwLabel = FRAMEWORKS.find((f) => f.id === framework)?.label || framework
  const guarded = translation?.guardrailFlag
  const txText = translation?.translation || ''
  const finalText = txText + (appended ? `\n\n${appended}` : '')

  const newMsg: ThreadMessage | null =
    role && txText
      ? {
          from: role,
          raw: rawInput,
          translation: finalText,
          framework,
          primary:
            primaryOverride.trim() || primaryEmotion?.probablePrimaryEmotion || '',
          context,
          ts: Date.now(),
        }
      : null

  const nextThread = useMemo(
    () => (newMsg ? [...thread, newMsg] : thread),
    [newMsg, thread]
  )
  const token = useMemo(() => (newMsg ? encodeThread(nextThread) : ''), [newMsg, nextThread])

  const partnerName = role === 'jason' ? 'Tam' : 'Jason'
  const partnerPhone = role === 'jason' ? PHONE.tamara : PHONE.jason
  const fromLabel = role === 'jason' ? '— J' : '— T'

  const webLink =
    typeof window !== 'undefined' && token
      ? `${window.location.origin}${window.location.pathname}#ft1:${token}`
      : ''

  const smsBody = `${finalText}\n\n${fromLabel}\n\n🪞 Open the thread: ${webLink}\n\nOr paste this token into your translator: ft1:${token}`

  async function copy(text: string, key: 'msg' | 'tx' | 'link') {
    try {
      await navigator.clipboard.writeText(text)
      setCopyState(key)
      setTimeout(() => setCopyState('idle'), 1600)
    } catch {
      /* ignore */
    }
  }

  function send() {
    if (!newMsg) return
    onSent(nextThread)
    try {
      const opened = window.open(smsUrl(partnerPhone, smsBody), '_blank')
      if (!opened) window.location.href = smsUrl(partnerPhone, smsBody)
    } catch {
      window.location.href = smsUrl(partnerPhone, smsBody)
    }
  }

  return (
    <div className="py-6 md:py-8 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-warm-gray/15 rounded-2xl p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-warm-gray font-medium mb-2">
            What you actually said
          </p>
          <div className="bg-paper rounded-lg p-3 text-sm text-warm-gray whitespace-pre-wrap leading-relaxed">
            {rawInput}
          </div>
          {context && (
            <p className="text-xs text-warm-gray italic mt-3">Context: {context}</p>
          )}
        </div>

        <div className="bg-white border border-warm-gray/15 rounded-2xl p-5">
          <p
            className={`text-[10px] uppercase tracking-[0.22em] font-medium mb-2 ${
              role === 'tamara' ? 'text-soft-rose' : 'text-primary-sage'
            }`}
          >
            {fwLabel} version
          </p>
          {loading ? (
            <div className="flex items-center gap-2 py-3">
              <div className="w-4 h-4 border-2 border-primary-sage/30 border-t-primary-sage rounded-full animate-spin" />
              <span className="text-sm text-warm-gray">Translating…</span>
            </div>
          ) : guarded ? (
            <div className="bg-warm-sand/10 border border-warm-sand/30 rounded-lg p-3">
              <p className="text-sm text-text-dark">
                <strong>Translation refused:</strong> {guarded}
              </p>
            </div>
          ) : (
            <>
              <div className="bg-warm-cream rounded-lg p-3 text-sm text-text-dark whitespace-pre-wrap leading-relaxed">
                {finalText}
              </div>
              {translation?.frameworkNotes && (
                <p className="text-xs text-warm-gray italic mt-3">{translation.frameworkNotes}</p>
              )}
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-warm-sand/10 border border-warm-sand/30 rounded-lg p-3">
          <p className="text-sm text-text-dark">{error}</p>
        </div>
      )}

      {translation && !guarded && !loading && (
        <Card>
          <p className="text-[10px] uppercase tracking-[0.22em] text-warm-gray font-medium mb-3">
            Optional · Gottman repair attempt
          </p>
          <div className="flex flex-wrap gap-2">
            {REPAIRS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onAppendRepair(r)}
                className={`px-3 py-1.5 rounded-full text-xs transition ${
                  appended === r
                    ? 'bg-primary-sage text-white'
                    : 'bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage'
                }`}
              >
                {r}
              </button>
            ))}
            {appended && (
              <button
                type="button"
                onClick={onClearAppend}
                className="px-3 py-1.5 rounded-full text-xs text-warm-gray hover:text-text-dark transition"
              >
                × clear
              </button>
            )}
          </div>

          <div className="mt-5 pt-5 border-t border-warm-gray/15 flex flex-col gap-2">
            <button
              type="button"
              onClick={send}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium transition ${
                role === 'tamara'
                  ? 'bg-soft-rose hover:bg-soft-rose/90'
                  : 'bg-primary-sage hover:bg-primary-sage/90'
              }`}
            >
              <Send className="w-4 h-4" />
              Open iMessage to {partnerName}
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => copy(smsBody, 'msg')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                {copyState === 'msg' ? 'Copied' : 'Copy full iMessage'}
              </button>
              <button
                type="button"
                onClick={() => copy(finalText, 'tx')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                {copyState === 'tx' ? 'Copied' : 'Copy translation'}
              </button>
              <button
                type="button"
                onClick={() => copy(webLink, 'link')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                {copyState === 'link' ? 'Copied' : 'Copy thread link'}
              </button>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRefine}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {refineCount >= 4 ? "Refine (you've refined a lot)" : 'Not quite — refine'}
          </button>
          <button
            type="button"
            onClick={onSwitchFramework}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage transition text-sm"
          >
            Try a different framework
          </button>
          <button
            type="button"
            onClick={onStartOver}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-warm-gray hover:text-text-dark transition text-sm"
          >
            Start over
          </button>
        </div>
        {refineCount >= 5 && (
          <p className="mt-3 text-xs text-warm-sand italic leading-relaxed">
            You've refined this 5+ times. Sometimes the truest version is the first or second. Want to try
            saying it raw, in your own words?
          </p>
        )}
        <details className="mt-4">
          <summary className="text-xs text-warm-gray cursor-pointer hover:text-text-dark">
            What this is built on
          </summary>
          <p className="text-xs text-warm-gray mt-2 leading-relaxed">{frameworkBlurb(framework)}</p>
        </details>
      </Card>
    </div>
  )
}

// =====================================================================
// Small reusable button
// =====================================================================

function PickBtn({
  label,
  onClick,
  tone = 'neutral',
}: {
  label: string
  onClick: () => void
  tone?: 'neutral' | 'warn'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-4 rounded-2xl text-left transition font-medium ${
        tone === 'warn'
          ? 'bg-warm-cream border border-warm-sand/30 text-text-dark hover:border-warm-sand hover:bg-warm-sand/5'
          : 'bg-warm-cream border border-warm-gray/20 text-text-dark hover:border-primary-sage hover:bg-primary-sage/5'
      }`}
    >
      {label}
    </button>
  )
}
