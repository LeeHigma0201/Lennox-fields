'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Heart, X, ChevronLeft, Minus, Plus, RotateCcw,
  Sparkles, BookOpen, Wind, Phone,
} from 'lucide-react'

// ============================================================================
// ComfortCorner — a neurodiversity-affirming "comfort & access" companion.
//
// Two functions, one calm floating presence on every page:
//   1. "Adjust this page" — sensory/accessibility controls (text size, calm
//      mode, easier-reading spacing/font, reduce motion). Persisted so the
//      site remembers how a person needs it, every visit.
//   2. "Take a moment" — instant box-breathing + 5-4-3-2-1 grounding from any
//      page, with a gentle hand-off to crisis support.
//
// Settings are applied as data attributes on <html> and read by globals.css.
// Client-side only: nothing is sent anywhere, no account, no tracking.
// A tiny inline script in layout.tsx applies saved settings before paint
// (no flash). This component is the UI + the live updates.
// ============================================================================

type View = 'menu' | 'adjust' | 'ground'
type TextSize = 'normal' | 'large' | 'xlarge'

interface Settings {
  text: TextSize
  calm: boolean
  readable: boolean
  motion: 'full' | 'reduced'
}

const STORAGE_KEY = 'lf-comfort'
const DEFAULTS: Settings = { text: 'normal', calm: false, readable: false, motion: 'full' }
const TEXT_STEPS: TextSize[] = ['normal', 'large', 'xlarge']
const TEXT_LABEL: Record<TextSize, string> = { normal: 'Default', large: 'Large', xlarge: 'Largest' }

function applySettings(s: Settings) {
  if (typeof document === 'undefined') return
  const el = document.documentElement
  el.setAttribute('data-lf-text', s.text)
  el.setAttribute('data-lf-calm', s.calm ? 'on' : 'off')
  el.setAttribute('data-lf-readable', s.readable ? 'on' : 'off')
  el.setAttribute('data-lf-motion', s.motion)
}

// Box-breathing phases (4-4-4-4). "expand" drives the circle size.
const PHASES = [
  { label: 'Breathe in', secs: 4, expand: true },
  { label: 'Hold', secs: 4, expand: true },
  { label: 'Breathe out', secs: 4, expand: false },
  { label: 'Hold', secs: 4, expand: false },
]

const GROUNDING = [
  { n: 5, sense: 'things you can see', hint: 'Look slowly around the room.' },
  { n: 4, sense: 'things you can feel', hint: 'Your feet, the chair, a soft texture.' },
  { n: 3, sense: 'things you can hear', hint: 'Near sounds, then far ones.' },
  { n: 2, sense: 'things you can smell', hint: 'Or two scents you like.' },
  { n: 1, sense: 'thing you can taste', hint: 'Or one slow, deep breath.' },
]

export default function ComfortCorner() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<View>('menu')
  const [settings, setSettings] = useState<Settings>(DEFAULTS)

  const [phaseIdx, setPhaseIdx] = useState(0)
  const [count, setCount] = useState(PHASES[0].secs)

  const launcherRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Load saved settings once on mount.
  useEffect(() => {
    setMounted(true)
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      const merged = { ...DEFAULTS, ...saved }
      setSettings(merged)
      applySettings(merged)
    } catch {
      /* ignore — defaults already applied by the inline script */
    }
  }, [])

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      applySettings(next)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* storage may be unavailable; settings still apply for this session */
      }
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    applySettings(DEFAULTS)
    setSettings(DEFAULTS)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
  }, [])

  // Escape closes the panel and returns focus to the launcher.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open, view])

  // Drive the breathing cycle only while the grounding view is showing.
  useEffect(() => {
    if (!open || view !== 'ground') return
    let pi = 0
    let c = PHASES[0].secs
    setPhaseIdx(0)
    setCount(c)
    const id = setInterval(() => {
      c -= 1
      if (c <= 0) {
        pi = (pi + 1) % PHASES.length
        c = PHASES[pi].secs
        setPhaseIdx(pi)
      }
      setCount(c)
    }, 1000)
    return () => clearInterval(id)
  }, [open, view])

  // Avoid hydration flicker: render nothing until mounted (launcher appears post-hydrate).
  if (!mounted) return null

  const phase = PHASES[phaseIdx]

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => {
          setView('menu')
          setOpen((o) => !o)
        }}
        aria-expanded={open}
        aria-controls="comfort-panel"
        aria-label="Open comfort and accessibility options"
        className="no-print fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary-sage px-4 py-3 text-white shadow-strong transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-sage"
      >
        <Heart className="h-5 w-5" aria-hidden="true" />
        <span className="hidden text-sm font-medium sm:inline">Comfort &amp; access</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="no-print fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6"
          aria-hidden={false}
        >
          {/* Click-away backdrop (transparent; the panel itself is the focus) */}
          <button
            type="button"
            aria-label="Close comfort options"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-text-dark/10"
            tabIndex={-1}
          />

          <div
            ref={panelRef}
            id="comfort-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Comfort and accessibility options"
            tabIndex={-1}
            className="animate-slide-up relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-strong focus:outline-none"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {view !== 'menu' && (
                  <button
                    type="button"
                    onClick={() => setView('menu')}
                    aria-label="Back to comfort menu"
                    className="rounded-lg p-1 text-warm-gray hover:bg-warm-cream hover:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-sage"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
                <h2 className="font-heading text-lg font-bold text-text-dark">
                  {view === 'menu' && 'Comfort & access'}
                  {view === 'adjust' && 'Adjust this page'}
                  {view === 'ground' && 'Take a moment'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-lg p-1 text-warm-gray hover:bg-warm-cream hover:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-sage"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* MENU */}
            {view === 'menu' && (
              <div className="space-y-3">
                <p className="text-sm text-warm-gray">
                  This space is yours. Make the page easier to take in, or pause for a moment of calm.
                </p>
                <button
                  type="button"
                  onClick={() => setView('adjust')}
                  className="flex w-full items-center gap-3 rounded-xl border-2 border-warm-gray/15 p-4 text-left transition-colors hover:border-primary-sage/50 hover:bg-primary-sage/5 focus:outline-none focus:ring-2 focus:ring-primary-sage"
                >
                  <span className="rounded-lg bg-primary-sage/10 p-2 text-primary-sage">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-text-dark">Adjust this page</span>
                    <span className="block text-sm text-warm-gray">Text size, calmer colors, easier reading, less motion</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setView('ground')}
                  className="flex w-full items-center gap-3 rounded-xl border-2 border-warm-gray/15 p-4 text-left transition-colors hover:border-primary-sage/50 hover:bg-primary-sage/5 focus:outline-none focus:ring-2 focus:ring-primary-sage"
                >
                  <span className="rounded-lg bg-soft-rose/15 p-2 text-soft-rose">
                    <Wind className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-text-dark">Take a moment</span>
                    <span className="block text-sm text-warm-gray">Guided breathing &amp; grounding, right now</span>
                  </span>
                </button>
              </div>
            )}

            {/* ADJUST */}
            {view === 'adjust' && (
              <div className="space-y-5">
                {/* Text size */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-text-dark">Text size</span>
                    <span className="text-sm text-warm-gray">{TEXT_LABEL[settings.text]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Smaller text"
                      disabled={settings.text === 'normal'}
                      onClick={() => {
                        const i = TEXT_STEPS.indexOf(settings.text)
                        if (i > 0) update({ text: TEXT_STEPS[i - 1] })
                      }}
                      className="btn btn-outline flex-1 justify-center disabled:opacity-40"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Larger text"
                      disabled={settings.text === 'xlarge'}
                      onClick={() => {
                        const i = TEXT_STEPS.indexOf(settings.text)
                        if (i < TEXT_STEPS.length - 1) update({ text: TEXT_STEPS[i + 1] })
                      }}
                      className="btn btn-primary flex-1 justify-center disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <ToggleRow
                  label="Calm mode"
                  hint="Softer, less saturated colors"
                  on={settings.calm}
                  onChange={(v) => update({ calm: v })}
                />
                <ToggleRow
                  label="Easier reading"
                  hint="More spacing and a plain, legible font"
                  on={settings.readable}
                  onChange={(v) => update({ readable: v })}
                />
                <ToggleRow
                  label="Reduce motion"
                  hint="Turn off animations and movement"
                  on={settings.motion === 'reduced'}
                  onChange={(v) => update({ motion: v ? 'reduced' : 'full' })}
                />

                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex items-center gap-2 text-sm font-medium text-warm-gray hover:text-text-dark focus:outline-none focus:underline"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Reset to default
                </button>

                <p className="border-t border-warm-gray/15 pt-3 text-xs text-warm-gray">
                  Your choices are saved on this device only. Nothing is sent anywhere.
                </p>
              </div>
            )}

            {/* GROUND */}
            {view === 'ground' && (
              <div className="space-y-5">
                <div className="flex flex-col items-center py-2">
                  <div
                    className="relative flex h-40 w-40 items-center justify-center"
                    role="img"
                    aria-label={`Breathing guide: ${phase.label}`}
                  >
                    <span
                      className="absolute inline-flex rounded-full bg-gradient-to-br from-primary-sage to-earth-green opacity-90"
                      style={{
                        height: '10rem',
                        width: '10rem',
                        transform: `scale(${phase.expand ? 1 : 0.55})`,
                        transition: `transform ${phase.secs}s ease-in-out`,
                      }}
                    />
                    <span className="relative text-center text-white">
                      <span className="block text-lg font-semibold">{phase.label}</span>
                      <span className="block text-3xl font-bold tabular-nums" aria-hidden="true">{count}</span>
                    </span>
                  </div>
                  <p className="mt-3 text-center text-sm text-warm-gray">
                    Follow the circle. In for four, hold, out for four, hold. There&apos;s no wrong way to do this.
                  </p>
                </div>

                <div className="rounded-xl bg-warm-cream p-4">
                  <h3 className="mb-2 flex items-center gap-2 font-semibold text-text-dark">
                    <BookOpen className="h-4 w-4 text-primary-sage" aria-hidden="true" />
                    Or try 5-4-3-2-1 grounding
                  </h3>
                  <ul className="space-y-1.5">
                    {GROUNDING.map((g) => (
                      <li key={g.n} className="text-sm text-text-dark">
                        <span className="font-bold text-primary-sage">{g.n}</span> {g.sense}
                        <span className="text-warm-gray"> — {g.hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-soft-rose/30 bg-soft-rose/10 p-4 text-sm text-text-dark">
                  If you need more than a moment, you are not alone.{' '}
                  <a href="tel:988" className="font-semibold text-soft-rose underline decoration-soft-rose/40 hover:decoration-soft-rose">
                    Call or text 988
                  </a>
                  , <a href="sms:741741" className="font-semibold text-soft-rose underline decoration-soft-rose/40 hover:decoration-soft-rose">text HOME to 741741</a>, or{' '}
                  <Phone className="inline h-3.5 w-3.5" aria-hidden="true" /> reach out through our{' '}
                  <a href="/contact" className="font-semibold text-primary-sage underline">contact page</a>.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function ToggleRow({
  label, hint, on, onChange,
}: { label: string; hint: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>
        <span className="block font-medium text-text-dark">{label}</span>
        <span className="block text-sm text-warm-gray">{hint}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => onChange(!on)}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-sage ${
          on ? 'bg-primary-sage' : 'bg-warm-gray/30'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            on ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
