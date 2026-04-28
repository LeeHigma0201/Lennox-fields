'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import {
  ecrS,
  emotionGranularity,
  ifsParts,
  nvcFeelingsMet,
  nvcFeelingsUnmet,
  nvcNeeds,
  toneBands,
  valueWords,
  yesNoMaybeItems,
} from './data'

// =====================================================================
// PrimitiveSentenceStem — stem prompt + textarea + "is there more?"
// =====================================================================

export function SentenceStem({
  stem,
  value,
  onChange,
  followUpValue,
  onFollowUpChange,
  showFollowUp = true,
}: {
  stem: string
  value: string
  onChange: (v: string) => void
  followUpValue?: string
  onFollowUpChange?: (v: string) => void
  showFollowUp?: boolean
}) {
  const [showMore, setShowMore] = useState(!!followUpValue)

  return (
    <div className="space-y-3">
      <p className="font-heading text-lg md:text-xl text-text-dark leading-snug">{stem}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full p-4 rounded-lg border border-warm-gray/20 bg-white focus:border-primary-sage focus:outline-none focus:ring-1 focus:ring-primary-sage/30 transition resize-none font-body text-base"
        placeholder="Take your time."
      />
      {showFollowUp && value.trim().length > 0 && onFollowUpChange && (
        <div>
          {!showMore ? (
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="text-sm italic text-primary-sage hover:underline underline-offset-2"
            >
              Is there more?
            </button>
          ) : (
            <textarea
              value={followUpValue || ''}
              onChange={(e) => onFollowUpChange(e.target.value)}
              rows={2}
              className="w-full p-4 rounded-lg border border-warm-gray/20 bg-warm-cream focus:border-primary-sage focus:outline-none focus:ring-1 focus:ring-primary-sage/30 transition resize-none font-body text-sm italic"
              placeholder="And what else?"
            />
          )}
        </div>
      )}
    </div>
  )
}

// =====================================================================
// PrimitiveSlider — felt-sense 1–10 with anchor labels
// =====================================================================

export function FeltSlider({
  label,
  leftAnchor,
  rightAnchor,
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  label: string
  leftAnchor: string
  rightAnchor: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-warm-gray">{label}</p>
      <div className="flex items-center gap-4">
        <span className="text-xs text-warm-gray flex-shrink-0 max-w-[80px]">{leftAnchor}</span>
        <div className="flex-grow relative">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-primary-sage h-2"
          />
          <div className="flex justify-between text-[10px] text-warm-gray/60 mt-1 px-1">
            {Array.from({ length: max - min + 1 }, (_, i) => (
              <span key={i}>{min + i}</span>
            ))}
          </div>
        </div>
        <span className="text-xs text-warm-gray flex-shrink-0 max-w-[80px] text-right">{rightAnchor}</span>
      </div>
      <div className="text-center">
        <span className="font-heading text-2xl text-primary-sage">{value}</span>
      </div>
    </div>
  )
}

// =====================================================================
// PrimitiveBodyMap — SVG body silhouette + paintable regions
// =====================================================================

const bodyRegions = [
  { id: 'head', label: 'head', cx: 150, cy: 50, r: 30 },
  { id: 'throat', label: 'throat', cx: 150, cy: 95, r: 14 },
  { id: 'chest', label: 'chest', cx: 150, cy: 140, r: 35 },
  { id: 'belly', label: 'belly', cx: 150, cy: 200, r: 30 },
  { id: 'pelvis', label: 'pelvis/hips', cx: 150, cy: 250, r: 32 },
  { id: 'left-shoulder', label: 'left shoulder', cx: 105, cy: 115, r: 18 },
  { id: 'right-shoulder', label: 'right shoulder', cx: 195, cy: 115, r: 18 },
  { id: 'left-arm', label: 'left arm', cx: 80, cy: 180, r: 18 },
  { id: 'right-arm', label: 'right arm', cx: 220, cy: 180, r: 18 },
  { id: 'left-hand', label: 'left hand', cx: 65, cy: 240, r: 14 },
  { id: 'right-hand', label: 'right hand', cx: 235, cy: 240, r: 14 },
  { id: 'left-thigh', label: 'left thigh', cx: 130, cy: 310, r: 20 },
  { id: 'right-thigh', label: 'right thigh', cx: 170, cy: 310, r: 20 },
  { id: 'left-foot', label: 'left foot', cx: 130, cy: 400, r: 16 },
  { id: 'right-foot', label: 'right foot', cx: 170, cy: 400, r: 16 },
] as const

const qualityColors = {
  warm: '#C09191',
  cool: '#4A90A4',
  expanding: '#C5A87D',
  contracting: '#7A6E44',
  dense: '#3f3f3f',
  diffuse: '#75856f',
  empty: 'transparent',
}

export type BodyMapValue = {
  regions: Record<string, keyof typeof qualityColors>
  description: string
  emotion: string
}

export function BodyMap({
  value,
  onChange,
  readonly = false,
}: {
  value: BodyMapValue
  onChange?: (v: BodyMapValue) => void
  readonly?: boolean
}) {
  const [activeQuality, setActiveQuality] = useState<keyof typeof qualityColors>('warm')

  function paint(regionId: string) {
    if (readonly || !onChange) return
    const next = { ...value.regions }
    if (next[regionId] === activeQuality) {
      delete next[regionId]
    } else {
      next[regionId] = activeQuality
    }
    onChange({ ...value, regions: next })
  }

  return (
    <div className="space-y-4">
      {!readonly && (
        <>
          <input
            type="text"
            value={value.emotion}
            onChange={(e) => onChange?.({ ...value, emotion: e.target.value })}
            placeholder="What are you carrying right now? (one word or short phrase)"
            className="w-full p-3 rounded-lg border border-warm-gray/20 bg-white focus:border-primary-sage focus:outline-none text-sm"
          />
          <div>
            <p className="text-xs text-warm-gray mb-2">Pick a quality, then tap regions where you feel it. Tap again to clear.</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(qualityColors) as Array<keyof typeof qualityColors>)
                .filter((k) => k !== 'empty')
                .map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setActiveQuality(q)}
                    className={`px-3 py-1.5 rounded-full text-xs capitalize transition ${
                      activeQuality === q
                        ? 'ring-2 ring-offset-1 ring-primary-sage text-white'
                        : 'border border-warm-gray/30 text-warm-gray hover:border-primary-sage'
                    }`}
                    style={activeQuality === q ? { background: qualityColors[q] } : {}}
                  >
                    {q}
                  </button>
                ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center">
        <svg viewBox="0 0 300 440" className="w-full max-w-[260px] h-auto">
          {/* Body outline — minimal silhouette */}
          <path
            d="M 150 20 C 165 20 180 35 180 55 C 180 70 173 82 168 88 L 168 100 C 195 105 215 120 215 145 L 215 175 C 230 175 245 195 245 220 L 245 250 C 245 260 240 265 230 265 L 222 265 L 220 290 L 220 380 C 220 395 215 410 200 410 L 180 410 L 168 320 C 168 300 162 290 155 290 L 145 290 C 138 290 132 300 132 320 L 120 410 L 100 410 C 85 410 80 395 80 380 L 80 290 L 78 265 L 70 265 C 60 265 55 260 55 250 L 55 220 C 55 195 70 175 85 175 L 85 145 C 85 120 105 105 132 100 L 132 88 C 127 82 120 70 120 55 C 120 35 135 20 150 20 Z"
            fill="#FAF9F7"
            stroke="#75856f"
            strokeWidth="1"
            opacity={0.8}
          />
          {bodyRegions.map((region) => {
            const quality = value.regions[region.id]
            const fill = quality ? qualityColors[quality] : 'rgba(117, 133, 111, 0.05)'
            const opacity = quality ? 0.6 : 0.4
            return (
              <circle
                key={region.id}
                cx={region.cx}
                cy={region.cy}
                r={region.r}
                fill={fill}
                opacity={opacity}
                stroke={quality ? qualityColors[quality] : 'rgba(117, 133, 111, 0.2)'}
                strokeWidth="1"
                className={readonly ? '' : 'cursor-pointer hover:opacity-80 transition'}
                onClick={() => paint(region.id)}
              >
                <title>{region.label}</title>
              </circle>
            )
          })}
        </svg>
      </div>

      {!readonly && (
        <textarea
          value={value.description}
          onChange={(e) => onChange?.({ ...value, description: e.target.value })}
          rows={2}
          placeholder="One sentence — what does it feel like? It feels like…"
          className="w-full p-3 rounded-lg border border-warm-gray/20 bg-white focus:border-primary-sage focus:outline-none resize-none text-sm"
        />
      )}
      {readonly && value.description && (
        <p className="text-sm italic text-warm-gray text-center">&ldquo;{value.description}&rdquo;</p>
      )}
      {readonly && value.emotion && (
        <p className="text-xs text-warm-gray text-center uppercase tracking-wider">{value.emotion}</p>
      )}
    </div>
  )
}

// =====================================================================
// PrimitiveAttachmentPlot — 2D anxiety × avoidance plot driven by ECR-S
// =====================================================================

export type ECRAnswers = Record<number, number> // item id -> 1-7

export function scoreECR(answers: ECRAnswers): { anxiety: number; avoidance: number } {
  let anxiety = 0
  let anxietyCount = 0
  let avoidance = 0
  let avoidanceCount = 0
  ecrS.forEach((item) => {
    const raw = answers[item.id]
    if (raw == null) return
    const value = item.reverse ? 8 - raw : raw
    if (item.dim === 'anxiety') {
      anxiety += value
      anxietyCount++
    } else {
      avoidance += value
      avoidanceCount++
    }
  })
  return {
    anxiety: anxietyCount ? anxiety / anxietyCount : 0,
    avoidance: avoidanceCount ? avoidance / avoidanceCount : 0,
  }
}

export function ECRItems({
  answers,
  onChange,
}: {
  answers: ECRAnswers
  onChange: (a: ECRAnswers) => void
}) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-warm-gray uppercase tracking-wider">
        For each statement, how true is this for you in close relationships?
      </p>
      {ecrS.map((item) => (
        <div key={item.id} className="space-y-2">
          <p className="font-body text-base text-text-dark">{item.text}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-warm-gray w-20 flex-shrink-0">Strongly disagree</span>
            <div className="flex-grow flex justify-between gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange({ ...answers, [item.id]: n })}
                  className={`flex-1 h-9 rounded-md text-sm transition ${
                    answers[item.id] === n
                      ? 'bg-primary-sage text-white'
                      : 'bg-white border border-warm-gray/20 text-warm-gray hover:border-primary-sage'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-warm-gray w-20 flex-shrink-0 text-right">Strongly agree</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AttachmentPlot({
  partnerA,
  partnerB,
  partnerAName = 'A',
  partnerBName = 'B',
}: {
  partnerA: { anxiety: number; avoidance: number }
  partnerB?: { anxiety: number; avoidance: number }
  partnerAName?: string
  partnerBName?: string
}) {
  // Plot: x = anxiety (1-7), y = avoidance (1-7). Origin at center (4,4).
  const size = 320
  const padding = 30
  const plotSize = size - padding * 2
  const toX = (a: number) => padding + ((a - 1) / 6) * plotSize
  const toY = (a: number) => padding + ((a - 1) / 6) * plotSize

  return (
    <div className="space-y-3">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px] mx-auto">
        {/* Quadrant background tint */}
        <rect x={padding} y={padding} width={plotSize / 2} height={plotSize / 2} fill="#75856f" opacity="0.04" />
        <rect x={padding + plotSize / 2} y={padding} width={plotSize / 2} height={plotSize / 2} fill="#C5A87D" opacity="0.04" />
        <rect x={padding} y={padding + plotSize / 2} width={plotSize / 2} height={plotSize / 2} fill="#C09191" opacity="0.04" />
        <rect x={padding + plotSize / 2} y={padding + plotSize / 2} width={plotSize / 2} height={plotSize / 2} fill="#7A6E44" opacity="0.05" />

        {/* Quadrant labels */}
        <text x={padding + plotSize / 4} y={padding + plotSize / 4} fontSize="9" fill="#6B6560" textAnchor="middle">
          secure-leaning
        </text>
        <text x={padding + 3 * plotSize / 4} y={padding + plotSize / 4} fontSize="9" fill="#6B6560" textAnchor="middle">
          anxious
        </text>
        <text x={padding + plotSize / 4} y={padding + 3 * plotSize / 4 + 4} fontSize="9" fill="#6B6560" textAnchor="middle">
          avoidant
        </text>
        <text x={padding + 3 * plotSize / 4} y={padding + 3 * plotSize / 4 + 4} fontSize="9" fill="#6B6560" textAnchor="middle">
          fearful
        </text>

        {/* Axes */}
        <line x1={padding + plotSize / 2} y1={padding} x2={padding + plotSize / 2} y2={size - padding} stroke="#75856f" strokeWidth="1" opacity="0.3" />
        <line x1={padding} y1={padding + plotSize / 2} x2={size - padding} y2={padding + plotSize / 2} stroke="#75856f" strokeWidth="1" opacity="0.3" />
        <rect x={padding} y={padding} width={plotSize} height={plotSize} fill="none" stroke="#75856f" strokeWidth="1" opacity="0.4" />

        {/* Axis labels */}
        <text x={padding} y={size - 8} fontSize="10" fill="#6B6560">low anxiety</text>
        <text x={size - padding} y={size - 8} fontSize="10" fill="#6B6560" textAnchor="end">high anxiety</text>
        <text x={8} y={padding + 4} fontSize="10" fill="#6B6560">low avoid.</text>
        <text x={8} y={size - padding} fontSize="10" fill="#6B6560">high avoid.</text>

        {/* Partner A point */}
        <circle cx={toX(partnerA.anxiety)} cy={toY(partnerA.avoidance)} r="10" fill="#75856f" opacity="0.85" />
        <text x={toX(partnerA.anxiety)} y={toY(partnerA.avoidance) + 4} fontSize="11" fill="white" textAnchor="middle" fontWeight="600">
          {partnerAName.charAt(0).toUpperCase()}
        </text>

        {/* Partner B point */}
        {partnerB && (
          <>
            <line
              x1={toX(partnerA.anxiety)}
              y1={toY(partnerA.avoidance)}
              x2={toX(partnerB.anxiety)}
              y2={toY(partnerB.avoidance)}
              stroke="#C09191"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            <circle cx={toX(partnerB.anxiety)} cy={toY(partnerB.avoidance)} r="10" fill="#C09191" opacity="0.85" />
            <text x={toX(partnerB.anxiety)} y={toY(partnerB.avoidance) + 4} fontSize="11" fill="white" textAnchor="middle" fontWeight="600">
              {partnerBName.charAt(0).toUpperCase()}
            </text>
          </>
        )}
      </svg>
      <p className="text-xs text-warm-gray text-center italic px-4">
        Dimensional, not categorical. This is a snapshot of patterns under stress, not a personality type. Attachment is malleable.
      </p>
    </div>
  )
}

// =====================================================================
// PrimitiveCardSort — used by Values + Yes/No/Maybe
// =====================================================================

export function CardSort({
  items,
  buckets,
  values,
  onChange,
  forceTopN,
  topRanks,
  onTopRanksChange,
}: {
  items: { id: string; label: string }[]
  buckets: { id: string; label: string }[]
  values: Record<string, string>
  onChange: (v: Record<string, string>) => void
  forceTopN?: number
  topRanks?: string[]
  onTopRanksChange?: (ranks: string[]) => void
}) {
  function setBucket(itemId: string, bucketId: string) {
    onChange({ ...values, [itemId]: bucketId })
  }

  const sortedTier = forceTopN
    ? items.filter((i) => values[i.id] === buckets[0].id)
    : []

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-white border border-warm-gray/15"
          >
            <span className="flex-grow font-body text-sm text-text-dark">{item.label}</span>
            <div className="flex gap-1.5">
              {buckets.map((bucket) => (
                <button
                  key={bucket.id}
                  type="button"
                  onClick={() => setBucket(item.id, bucket.id)}
                  className={`px-2.5 py-1 rounded-md text-xs transition ${
                    values[item.id] === bucket.id
                      ? 'bg-primary-sage text-white'
                      : 'bg-warm-cream text-warm-gray hover:bg-primary-sage/10'
                  }`}
                >
                  {bucket.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {forceTopN && onTopRanksChange && sortedTier.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-warm-gray/15">
          <p className="text-xs text-warm-gray uppercase tracking-wider">
            Now force-rank your top {forceTopN}
          </p>
          {Array.from({ length: forceTopN }).map((_, i) => {
            const choices = sortedTier.filter((c) => !topRanks?.includes(c.id) || topRanks[i] === c.id)
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="text-warm-gray text-sm w-6">{i + 1}.</span>
                <select
                  value={topRanks?.[i] || ''}
                  onChange={(e) => {
                    const next = [...(topRanks || [])]
                    next[i] = e.target.value
                    onTopRanksChange(next)
                  }}
                  className="flex-grow p-2 rounded border border-warm-gray/20 bg-white text-sm"
                >
                  <option value="">— pick one —</option>
                  {choices.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// =====================================================================
// PrimitiveCanvas — multi-quadrant shared input
// =====================================================================

export function Canvas({
  quadrants,
  values,
  onChange,
  readonly = false,
}: {
  quadrants: { id: string; label: string; placeholder: string }[]
  values: Record<string, string>
  onChange?: (v: Record<string, string>) => void
  readonly?: boolean
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quadrants.map((q) => (
        <div key={q.id} className="p-5 rounded-xl bg-white border border-warm-gray/15">
          <h4 className="font-heading text-base font-semibold text-text-dark mb-3">{q.label}</h4>
          {readonly ? (
            <p className="text-sm text-warm-gray whitespace-pre-wrap">{values[q.id] || <em className="opacity-40">(empty)</em>}</p>
          ) : (
            <textarea
              value={values[q.id] || ''}
              onChange={(e) => onChange?.({ ...values, [q.id]: e.target.value })}
              placeholder={q.placeholder}
              rows={4}
              className="w-full p-3 rounded-lg bg-warm-cream/60 border border-warm-gray/15 focus:border-primary-sage focus:outline-none resize-none text-sm"
            />
          )}
        </div>
      ))}
    </div>
  )
}

// =====================================================================
// PrimitiveTone — Web Audio API sine wave with onset envelope
// =====================================================================

export function Tone() {
  const [activeBand, setActiveBand] = useState<string | null>(null)
  const [pickedBand, setPickedBand] = useState<string | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function start(hz: number, bandId: string) {
    stop()
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const ctx = audioContextRef.current
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = hz
    gain.gain.value = 0
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    // 250ms attack envelope to avoid harsh click
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.25)
    oscRef.current = osc
    gainRef.current = gain
    setActiveBand(bandId)
  }

  function stop() {
    const osc = oscRef.current
    const gain = gainRef.current
    const ctx = audioContextRef.current
    if (osc && gain && ctx) {
      try {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2)
        osc.stop(ctx.currentTime + 0.22)
      } catch {}
      oscRef.current = null
      gainRef.current = null
    }
    setActiveBand(null)
  }

  function pick(bandId: string) {
    setPickedBand(bandId)
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-warm-gray uppercase tracking-wider">
        Hold to listen. Tap "this one" if a tone matches what you feel.
      </p>
      <div className="space-y-3">
        {toneBands.map((band) => (
          <div
            key={band.id}
            className={`p-4 rounded-xl border transition ${
              pickedBand === band.id
                ? 'border-primary-sage bg-primary-sage/5'
                : activeBand === band.id
                  ? 'border-primary-sage/60 bg-warm-cream'
                  : 'border-warm-gray/15 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h4 className="font-heading text-base font-semibold text-text-dark">{band.label}</h4>
                <p className="text-xs text-warm-gray mt-1">{band.description}</p>
              </div>
              <span className="text-[10px] text-warm-gray uppercase tracking-wider whitespace-nowrap">
                ~{band.hz} Hz
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onMouseDown={() => start(band.hz, band.id)}
                onMouseUp={stop}
                onMouseLeave={stop}
                onTouchStart={() => start(band.hz, band.id)}
                onTouchEnd={stop}
                className="flex-grow px-3 py-2 rounded-md text-xs bg-warm-cream hover:bg-primary-sage/10 text-warm-gray transition"
              >
                {activeBand === band.id ? '◉ playing' : 'Hold to listen'}
              </button>
              <button
                type="button"
                onClick={() => pick(band.id)}
                className={`px-3 py-2 rounded-md text-xs transition ${
                  pickedBand === band.id
                    ? 'bg-primary-sage text-white'
                    : 'border border-primary-sage text-primary-sage hover:bg-primary-sage/10'
                }`}
              >
                {pickedBand === band.id ? '✓ this one' : 'this one'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div data-picked={pickedBand || ''} className="hidden" />
    </div>
  )
}

// =====================================================================
// PrimitiveShape — ambiguous SVG stimulus (replaces inkblot)
// =====================================================================

const shapes = {
  'shape-a': (
    <g>
      <path
        d="M 150 60 C 200 50 240 90 230 140 C 270 150 280 210 240 240 C 260 280 220 320 170 310 C 160 350 100 350 90 310 C 50 320 20 280 50 240 C 10 210 30 150 80 140 C 70 90 100 50 150 60 Z"
        fill="#3f3f3f"
        opacity="0.85"
      />
    </g>
  ),
  'shape-b': (
    <g>
      <path
        d="M 80 200 C 100 100 200 100 220 200 C 240 280 180 320 150 280 C 120 320 60 280 80 200 Z M 110 160 C 110 140 130 130 150 140 M 190 160 C 190 140 170 130 150 140"
        fill="#3f3f3f"
        opacity="0.85"
      />
    </g>
  ),
  'shape-c': (
    <g>
      <path
        d="M 60 100 Q 150 60 240 100 Q 270 150 240 200 Q 220 250 170 270 Q 130 290 110 270 Q 70 250 60 200 Q 30 150 60 100 Z"
        fill="#3f3f3f"
        opacity="0.85"
      />
      <circle cx="120" cy="160" r="12" fill="#FAF9F7" opacity="0.5" />
      <circle cx="180" cy="160" r="12" fill="#FAF9F7" opacity="0.5" />
    </g>
  ),
}

export function Shape({ shapeId }: { shapeId: keyof typeof shapes }) {
  return (
    <div className="flex justify-center py-4">
      <svg viewBox="0 0 300 360" className="w-full max-w-[300px] h-auto">
        {shapes[shapeId]}
      </svg>
    </div>
  )
}

// =====================================================================
// PrimitiveEmotionPicker — granularity menu / NVC feelings
// =====================================================================

export function EmotionPicker({
  value,
  onChange,
  source = 'granularity',
}: {
  value: string | null
  onChange: (v: string) => void
  source?: 'granularity' | 'nvc-met' | 'nvc-unmet' | 'nvc-needs'
}) {
  const groups = useMemo(() => {
    if (source === 'granularity') {
      return [
        { label: 'High energy / pleasant', words: emotionGranularity.highValenceHighArousal },
        { label: 'Low energy / pleasant', words: emotionGranularity.highValenceLowArousal },
        { label: 'High energy / unpleasant', words: emotionGranularity.lowValenceHighArousal },
        { label: 'Low energy / unpleasant', words: emotionGranularity.lowValenceLowArousal },
        { label: 'Mixed / ambivalent', words: emotionGranularity.ambivalent },
      ]
    }
    if (source === 'nvc-met') return [{ label: 'When needs are met', words: nvcFeelingsMet }]
    if (source === 'nvc-unmet') return [{ label: 'When needs are not met', words: nvcFeelingsUnmet }]
    return [{ label: 'Universal needs', words: nvcNeeds }]
  }, [source])

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="text-[10px] text-warm-gray uppercase tracking-wider mb-2">{group.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {group.words.map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => onChange(w)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  value === w
                    ? 'bg-primary-sage text-white'
                    : 'bg-white border border-warm-gray/20 text-warm-gray hover:border-primary-sage'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// =====================================================================
// PrimitiveYesNoMaybe — grid checkbox sort
// =====================================================================

export type YNMValue = Record<string, 'yes' | 'no' | 'maybe' | undefined>

export function YesNoMaybe({
  value,
  onChange,
}: {
  value: YNMValue
  onChange: (v: YNMValue) => void
}) {
  return (
    <div className="space-y-1.5">
      {yesNoMaybeItems.map((item) => (
        <div key={item.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-warm-gray/10">
          <span className="flex-grow text-sm text-text-dark">{item.label}</span>
          <div className="flex gap-1">
            {(['yes', 'maybe', 'no'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ ...value, [item.id]: value[item.id] === opt ? undefined : opt })}
                className={`px-2.5 py-1 rounded text-[11px] uppercase tracking-wider transition ${
                  value[item.id] === opt
                    ? opt === 'yes'
                      ? 'bg-earth-green text-white'
                      : opt === 'maybe'
                        ? 'bg-accent-gold text-white'
                        : 'bg-warm-gray text-white'
                    : 'bg-warm-cream text-warm-gray hover:bg-primary-sage/10'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// =====================================================================
// PartsDiagram — IFS three-layer visualization
// =====================================================================

export function PartsDiagram({
  selected,
}: {
  selected: 'manager' | 'firefighter' | 'exile' | null
}) {
  const layers: Array<'manager' | 'firefighter' | 'exile'> = ['manager', 'firefighter', 'exile']
  return (
    <div className="space-y-2">
      {layers.map((part, i) => {
        const data = ifsParts[part]
        const isSelected = selected === part
        return (
          <div
            key={part}
            className={`p-4 rounded-xl border transition ${
              isSelected ? 'border-primary-sage bg-primary-sage/5' : 'border-warm-gray/15 bg-white opacity-60'
            }`}
            style={{ marginLeft: `${i * 16}px`, marginRight: `${i * 16}px` }}
          >
            <h4 className="font-heading text-base font-semibold text-text-dark">{data.label}</h4>
            <p className="text-xs text-warm-gray mt-1 italic">{data.examples}</p>
            <p className="text-xs text-warm-gray mt-2">{data.role}</p>
          </div>
        )
      })}
    </div>
  )
}
