'use client'

import { useState } from 'react'
import { sentenceStems, Station } from '../data'
import {
  AttachmentPlot,
  ECRAnswers,
  ECRItems,
  FeltSlider,
  SentenceStem,
  scoreECR,
} from '../primitives'
import { FillFlow, PairedColumns } from '../components'

export type StationProps = {
  station: Station
  selfName: string
  partnerName: string
  selfData: any | null
  partnerData: any | null
  sharedMetadata: any | null
  myRole: 'a' | 'b'
  asymmetricRole: 'a' | 'b' | null
  selfSubmitted: boolean
  partnerSubmitted: boolean
  onSave: (
    data: any,
    options?: { submit?: boolean; asymmetricRole?: 'a' | 'b'; sharedMetadata?: any }
  ) => Promise<void>
  onBack: () => void
}

// =====================================================================
// 01 — STATE OF THE UNION (Gottman) — symmetric
// =====================================================================

type SoUState = {
  appreciations: string[]
  appreciationFollowUps: string[]
  concern: string
  repair: string
  lookForward: string
}

const soUEmpty: SoUState = {
  appreciations: ['', '', '', '', ''],
  appreciationFollowUps: ['', '', '', '', ''],
  concern: '',
  repair: '',
  lookForward: '',
}

export function StateOfUnion(props: StationProps) {
  const { selfData, partnerData, selfSubmitted, partnerSubmitted, selfName, partnerName, onSave } = props
  const both = selfSubmitted && partnerSubmitted

  if (both) {
    const a: SoUState = (props.myRole === 'a' ? selfData : partnerData) || soUEmpty
    const b: SoUState = (props.myRole === 'a' ? partnerData : selfData) || soUEmpty
    const aName = props.myRole === 'a' ? selfName : partnerName
    const bName = props.myRole === 'a' ? partnerName : selfName
    return <StateOfUnionReveal a={a} b={b} aName={aName} bName={bName} />
  }

  return <StateOfUnionFill {...props} />
}

function StateOfUnionFill({ selfData, selfName, onSave }: StationProps) {
  const [data, setData] = useState<SoUState>(selfData || soUEmpty)
  const [saving, setSaving] = useState(false)

  function update(patch: Partial<SoUState>) {
    setData((d) => ({ ...d, ...patch }))
  }
  function setAppreciation(i: number, v: string) {
    setData((d) => {
      const next = [...d.appreciations]
      next[i] = v
      return { ...d, appreciations: next }
    })
  }
  function setAppreciationFollowUp(i: number, v: string) {
    setData((d) => {
      const next = [...d.appreciationFollowUps]
      next[i] = v
      return { ...d, appreciationFollowUps: next }
    })
  }

  const filled = data.appreciations.filter((a) => a.trim().length > 0).length
  const canSubmit =
    filled >= 3 && data.concern.trim().length > 0 && data.repair.trim().length > 0

  async function submit() {
    setSaving(true)
    try {
      await onSave(data, { submit: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FillFlow selfName={selfName} canSubmit={canSubmit} onSubmit={submit} saving={saving}>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">
          Five appreciations from this week
        </p>
        <p className="text-xs text-warm-gray italic mb-4">
          Specific behavior + what it meant. "When you brought me coffee Tuesday, I felt cared about because…"
        </p>
        <div className="space-y-4">
          {data.appreciations.map((a, i) => (
            <SentenceStem
              key={i}
              stem={`${i + 1}. Something I appreciated this week was…`}
              value={a}
              onChange={(v) => setAppreciation(i, v)}
              followUpValue={data.appreciationFollowUps[i]}
              onFollowUpChange={(v) => setAppreciationFollowUp(i, v)}
            />
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-warm-gray/15">
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">
          One concern — gentle startup
        </p>
        <p className="text-xs text-warm-gray italic mb-4">
          "I feel ___ about ___ (situational, not character) and I need ___." No "you always," no character indictments.
        </p>
        <SentenceStem
          stem="The concern I want to raise this week is…"
          value={data.concern}
          onChange={(v) => update({ concern: v })}
          showFollowUp={false}
        />
      </div>

      <div className="pt-6 border-t border-warm-gray/15">
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">One repair request</p>
        <SentenceStem
          stem="What I'm asking for, specifically, is…"
          value={data.repair}
          onChange={(v) => update({ repair: v })}
          showFollowUp={false}
        />
      </div>

      <div className="pt-6 border-t border-warm-gray/15">
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">
          One thing to look forward to
        </p>
        <SentenceStem
          stem="Something I want us to do together this week is…"
          value={data.lookForward}
          onChange={(v) => update({ lookForward: v })}
          showFollowUp={false}
        />
      </div>
    </FillFlow>
  )
}

function StateOfUnionReveal({
  a,
  b,
  aName,
  bName,
}: {
  a: SoUState
  b: SoUState
  aName: string
  bName: string
}) {
  function renderColumn(s: SoUState) {
    return (
      <>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Appreciations</p>
          <ul className="space-y-2 text-sm text-text-dark">
            {s.appreciations
              .map((a, i) => ({ a, fu: s.appreciationFollowUps[i] }))
              .filter((x) => x.a.trim().length > 0)
              .map((x, i) => (
                <li key={i} className="p-3 bg-warm-cream rounded-lg">
                  <p className="leading-relaxed">{x.a}</p>
                  {x.fu && <p className="text-xs italic text-warm-gray mt-2">{x.fu}</p>}
                </li>
              ))}
          </ul>
        </div>
        {s.concern && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Concern</p>
            <p className="p-3 bg-warm-cream rounded-lg text-sm leading-relaxed">{s.concern}</p>
          </div>
        )}
        {s.repair && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Repair request</p>
            <p className="p-3 bg-warm-cream rounded-lg text-sm leading-relaxed">{s.repair}</p>
          </div>
        )}
        {s.lookForward && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Looking forward</p>
            <p className="p-3 bg-warm-cream rounded-lg text-sm leading-relaxed">{s.lookForward}</p>
          </div>
        )}
      </>
    )
  }

  return (
    <PairedColumns
      selfName={aName}
      partnerName={bName}
      selfFirst={renderColumn(a)}
      partnerFirst={renderColumn(b)}
    />
  )
}

// =====================================================================
// 02 — STRESS-REDUCING CONVERSATION (Gottman) — asymmetric
// =====================================================================

type SRSenderState = {
  stressor: string
  feeling: string
  needType: 'vent' | 'advice' | 'distraction' | 'affection' | ''
  feltHeard?: number
}
type SRReceiverState = {
  interest: string
  understanding: string
  takeSide: string
  weAgainst: string
  affection: string
  validation: string
}

const srSenderEmpty: SRSenderState = { stressor: '', feeling: '', needType: '' }
const srReceiverEmpty: SRReceiverState = {
  interest: '',
  understanding: '',
  takeSide: '',
  weAgainst: '',
  affection: '',
  validation: '',
}

const needTypeOptions: Array<{ id: SRSenderState['needType']; label: string }> = [
  { id: 'vent', label: 'To vent — just listen' },
  { id: 'advice', label: 'Advice — I want input' },
  { id: 'distraction', label: 'Distraction — change the subject' },
  { id: 'affection', label: 'Affection — physical closeness' },
]

function labelForNeed(t: SRSenderState['needType']) {
  return {
    '': '—',
    vent: 'to vent',
    advice: 'advice',
    distraction: 'distraction',
    affection: 'affection',
  }[t]
}

export function StressReducing(props: StationProps) {
  const {
    asymmetricRole,
    myRole,
    selfData,
    partnerData,
    selfSubmitted,
    partnerSubmitted,
    selfName,
    partnerName,
    onSave,
  } = props

  const both = selfSubmitted && partnerSubmitted

  // Reveal phase
  if (both) {
    const senderRole = asymmetricRole
    const senderData: SRSenderState =
      senderRole === myRole ? selfData : partnerData
    const receiverData: SRReceiverState =
      senderRole === myRole ? partnerData : selfData
    const senderName = senderRole === myRole ? selfName : partnerName
    const receiverName = senderRole === myRole ? partnerName : selfName
    return (
      <StressReducingReveal
        sender={senderData}
        receiver={receiverData}
        senderName={senderName}
        receiverName={receiverName}
        myRole={myRole}
        senderRole={senderRole}
        onSave={onSave}
      />
    )
  }

  // Role-picker phase (only partner A picks)
  if (asymmetricRole === null) {
    if (myRole === 'a') {
      return <StressReducingRolePicker {...props} />
    }
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center text-warm-gray">
        <p className="text-base">
          Waiting for {partnerName} to set up this exercise.
        </p>
        <p className="text-xs italic mt-2">
          One of you names a stressor; the other listens. {partnerName} chooses who's which.
        </p>
      </div>
    )
  }

  // Sender / receiver fill phases
  const isSender = asymmetricRole === myRole
  if (isSender) {
    return <StressReducingSender {...props} />
  }
  return <StressReducingReceiver {...props} />
}

function StressReducingRolePicker({ selfName, partnerName, onSave, myRole }: StationProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-12 md:py-16">
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6 md:p-8 space-y-5 text-center">
        <h3 className="font-heading text-xl font-semibold text-text-dark">Who's having the hard day?</h3>
        <p className="text-sm text-warm-gray">
          One of you names something stressful from outside the relationship. The other listens.
        </p>
        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={() => onSave(null, { asymmetricRole: 'a' })}
            className="p-4 rounded-lg bg-primary-sage/10 border border-primary-sage/30 hover:bg-primary-sage/20 transition text-left"
          >
            <p className="font-medium text-text-dark">{selfName} talks · {partnerName} listens</p>
            <p className="text-xs text-warm-gray mt-1">You'll go first; share something stressful from outside the relationship.</p>
          </button>
          <button
            type="button"
            onClick={() => onSave(null, { asymmetricRole: 'b' })}
            className="p-4 rounded-lg bg-soft-rose/10 border border-soft-rose/30 hover:bg-soft-rose/20 transition text-left"
          >
            <p className="font-medium text-text-dark">{partnerName} talks · {selfName} listens</p>
            <p className="text-xs text-warm-gray mt-1">{partnerName} will share first; you'll listen and respond.</p>
          </button>
        </div>
      </div>
    </div>
  )
}

function StressReducingSender({ selfData, selfName, onSave }: StationProps) {
  const [data, setData] = useState<SRSenderState>(
    selfData && (selfData as any).stressor !== undefined ? (selfData as SRSenderState) : srSenderEmpty
  )
  const [saving, setSaving] = useState(false)

  const canSubmit =
    data.stressor.trim().length > 0 && data.feeling.trim().length > 0 && data.needType !== ''

  async function submit() {
    setSaving(true)
    try {
      await onSave(data, { submit: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FillFlow
      selfName={selfName}
      canSubmit={canSubmit}
      onSubmit={submit}
      saving={saving}
      subtitle="You're the one sharing the stressful thing today."
    >
      <div className="bg-warm-cream/60 p-4 rounded-lg text-xs text-warm-gray italic leading-relaxed">
        This is for stress from <em>outside</em> the relationship — work, family-of-origin, the world. Not about
        something between the two of you. The Gottmans are clear: this format collapses if you use it for
        relationship grievances.
      </div>
      <SentenceStem
        stem="The stressful thing I want to share is…"
        value={data.stressor}
        onChange={(v) => setData((d) => ({ ...d, stressor: v }))}
        showFollowUp={false}
      />
      <SentenceStem
        stem="What I'm feeling about it is…"
        value={data.feeling}
        onChange={(v) => setData((d) => ({ ...d, feeling: v }))}
        showFollowUp={false}
      />
      <div>
        <p className="font-body text-base text-text-dark mb-3">What I need right now is…</p>
        <div className="grid grid-cols-2 gap-2">
          {needTypeOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setData((d) => ({ ...d, needType: opt.id }))}
              className={`p-3 rounded-lg border text-sm text-left transition ${
                data.needType === opt.id
                  ? 'bg-primary-sage text-white border-primary-sage'
                  : 'bg-warm-cream border-warm-gray/20 hover:border-primary-sage'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </FillFlow>
  )
}

function StressReducingReceiver({
  selfData,
  partnerData,
  selfName,
  partnerName,
  partnerSubmitted,
  onSave,
}: StationProps) {
  const [data, setData] = useState<SRReceiverState>(
    selfData && (selfData as any).interest !== undefined ? (selfData as SRReceiverState) : srReceiverEmpty
  )
  const [saving, setSaving] = useState(false)

  // Wait for sender to send if not yet
  if (!partnerData) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center text-warm-gray">
        <p className="text-base">Waiting for {partnerName} to share their stressor.</p>
        <p className="text-xs italic mt-2">When they finish, you'll see what they wrote and can respond here.</p>
      </div>
    )
  }

  const senderData = partnerData as SRSenderState

  const canSubmit =
    data.interest.trim().length > 0 &&
    data.understanding.trim().length > 0 &&
    data.takeSide.trim().length > 0 &&
    data.weAgainst.trim().length > 0 &&
    data.affection.trim().length > 0 &&
    data.validation.trim().length > 0

  async function submit() {
    setSaving(true)
    try {
      await onSave(data, { submit: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FillFlow
      selfName={selfName}
      canSubmit={canSubmit}
      onSubmit={submit}
      saving={saving}
      subtitle="You're the listener today. Six rules — Gottman's structure. No advice unless they asked for it."
    >
      <div className="bg-warm-cream rounded-xl p-4 mb-2">
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">{partnerName} shared</p>
        <p className="text-sm text-text-dark italic leading-relaxed mb-2">{senderData.stressor}</p>
        <p className="text-xs text-warm-gray">
          They&apos;re feeling: <strong>{senderData.feeling}</strong>
        </p>
        <p className="text-xs text-warm-gray">
          What they need: <strong>{labelForNeed(senderData.needType)}</strong>
        </p>
      </div>
      <SentenceStem
        stem="Show genuine interest. What's a question that says you want to understand?"
        value={data.interest}
        onChange={(v) => setData((d) => ({ ...d, interest: v }))}
        showFollowUp={false}
      />
      <SentenceStem
        stem='Communicate understanding. "It makes sense that you feel ___ because ___."'
        value={data.understanding}
        onChange={(v) => setData((d) => ({ ...d, understanding: v }))}
        showFollowUp={false}
      />
      <SentenceStem
        stem="Take their side, even when they're partly wrong. Whose side are you on?"
        value={data.takeSide}
        onChange={(v) => setData((d) => ({ ...d, takeSide: v }))}
        showFollowUp={false}
      />
      <SentenceStem
        stem='"We against the world." What does this look like as something the two of you face together?'
        value={data.weAgainst}
        onChange={(v) => setData((d) => ({ ...d, weAgainst: v }))}
        showFollowUp={false}
      />
      <SentenceStem
        stem="Express affection. What's the warmth you want them to feel from you?"
        value={data.affection}
        onChange={(v) => setData((d) => ({ ...d, affection: v }))}
        showFollowUp={false}
      />
      <SentenceStem
        stem={'Validate the emotion. "Anyone in your shoes would feel this. You\'re not crazy for feeling this."'}
        value={data.validation}
        onChange={(v) => setData((d) => ({ ...d, validation: v }))}
        showFollowUp={false}
      />
    </FillFlow>
  )
}

function StressReducingReveal({
  sender,
  receiver,
  senderName,
  receiverName,
  myRole,
  senderRole,
  onSave,
}: {
  sender: SRSenderState
  receiver: SRReceiverState
  senderName: string
  receiverName: string
  myRole: 'a' | 'b'
  senderRole: 'a' | 'b' | null
  onSave: StationProps['onSave']
}) {
  const iAmSender = senderRole === myRole
  const [feltHeard, setFeltHeard] = useState<number>(sender.feltHeard ?? 5)

  async function persistFeltHeard(v: number) {
    setFeltHeard(v)
    if (iAmSender) {
      await onSave({ ...sender, feltHeard: v })
    }
  }

  return (
    <div>
      <PairedColumns
        selfName={senderName}
        partnerName={receiverName}
        selfFirst={
          <>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Stressor</p>
              <p className="p-3 bg-warm-cream rounded-lg text-sm">{sender.stressor}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Feeling</p>
              <p className="p-3 bg-warm-cream rounded-lg text-sm">{sender.feeling}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">What I needed</p>
              <p className="p-3 bg-warm-cream rounded-lg text-sm">{labelForNeed(sender.needType)}</p>
            </div>
          </>
        }
        partnerFirst={
          <>
            {[
              ['Genuine interest', receiver.interest],
              ['Understanding', receiver.understanding],
              ['Taking my side', receiver.takeSide],
              ['We-against-the-world', receiver.weAgainst],
              ['Affection', receiver.affection],
              ['Validation', receiver.validation],
            ].map(([label, val]) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">{label}</p>
                <p className="p-3 bg-warm-cream rounded-lg text-sm">{val}</p>
              </div>
            ))}
          </>
        }
      />
      {iAmSender && (
        <div className="mt-8 max-w-md mx-auto bg-white border border-warm-gray/15 rounded-2xl p-6">
          <FeltSlider
            label={`${senderName}, how heard do you feel?`}
            leftAnchor="Not at all"
            rightAnchor="Completely"
            value={feltHeard}
            onChange={persistFeltHeard}
          />
        </div>
      )}
    </div>
  )
}

// =====================================================================
// 25 — SENTENCE STEMS — symmetric, but with shared-metadata theme
// =====================================================================

type StemTheme = keyof typeof sentenceStems
type StemsState = {
  answers: Record<number, string>
  followUps: Record<number, string>
}

const stemsEmpty: StemsState = { answers: {}, followUps: {} }

export function SentenceStemsStation(props: StationProps) {
  const { selfData, partnerData, sharedMetadata, selfSubmitted, partnerSubmitted, selfName, partnerName, onSave } =
    props
  const both = selfSubmitted && partnerSubmitted
  const theme: StemTheme | undefined = sharedMetadata?.theme

  if (both && theme) {
    const a: StemsState = (props.myRole === 'a' ? selfData : partnerData) || stemsEmpty
    const b: StemsState = (props.myRole === 'a' ? partnerData : selfData) || stemsEmpty
    const aName = props.myRole === 'a' ? selfName : partnerName
    const bName = props.myRole === 'a' ? partnerName : selfName
    return <SentenceStemsReveal a={a} b={b} aName={aName} bName={bName} theme={theme} />
  }

  // Theme picker if not yet chosen
  if (!theme) {
    return <SentenceStemsThemePicker {...props} />
  }

  return <SentenceStemsFill {...props} theme={theme} />
}

function SentenceStemsThemePicker({ selfName, partnerName, onSave, myRole }: StationProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">
          Pick a theme
        </h2>
        <p className="text-sm text-warm-gray">
          Whichever of you opens this first chooses. Both of you will answer the same set.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {(Object.entries(sentenceStems) as Array<[StemTheme, typeof sentenceStems[StemTheme]]>).map(
          ([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => onSave(null, { sharedMetadata: { theme: key } })}
              className="p-4 rounded-lg bg-warm-cream border border-warm-gray/20 hover:border-primary-sage hover:bg-primary-sage/5 text-left transition"
            >
              <p className="font-medium text-text-dark text-sm">{value.label}</p>
              <p className="text-xs text-warm-gray mt-1">{value.stems.length} stems</p>
            </button>
          )
        )}
      </div>
    </div>
  )
}

function SentenceStemsFill({
  selfData,
  selfName,
  onSave,
  theme,
}: StationProps & { theme: StemTheme }) {
  const [data, setData] = useState<StemsState>(selfData || stemsEmpty)
  const [saving, setSaving] = useState(false)
  const themeData = sentenceStems[theme]

  function setAnswer(i: number, v: string) {
    setData((d) => ({ ...d, answers: { ...d.answers, [i]: v } }))
  }
  function setFollowUp(i: number, v: string) {
    setData((d) => ({ ...d, followUps: { ...d.followUps, [i]: v } }))
  }

  const filled = Object.values(data.answers).filter((a) => a && a.trim().length > 0).length
  const canSubmit = filled >= 2

  async function submit() {
    setSaving(true)
    try {
      await onSave(data, { submit: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FillFlow
      selfName={selfName}
      canSubmit={canSubmit}
      onSubmit={submit}
      saving={saving}
      subtitle={`Theme: ${themeData.label}. Answer at least two. Skip any that don't fit.`}
    >
      <p className="text-xs text-warm-gray italic">
        The second answer is often deeper than the first.
      </p>
      <div className="space-y-5">
        {themeData.stems.map((stem, i) => (
          <SentenceStem
            key={i}
            stem={stem}
            value={data.answers[i] || ''}
            onChange={(v) => setAnswer(i, v)}
            followUpValue={data.followUps[i]}
            onFollowUpChange={(v) => setFollowUp(i, v)}
          />
        ))}
      </div>
    </FillFlow>
  )
}

function SentenceStemsReveal({
  a,
  b,
  aName,
  bName,
  theme,
}: {
  a: StemsState
  b: StemsState
  aName: string
  bName: string
  theme: StemTheme
}) {
  const themeData = sentenceStems[theme]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-wider text-primary-sage">Theme</p>
        <p className="font-heading text-xl text-text-dark mt-1">{themeData.label}</p>
      </div>
      <div className="space-y-6">
        {themeData.stems.map((stem, i) => {
          const aAns = a.answers[i]
          const bAns = b.answers[i]
          if (!aAns && !bAns) return null
          return (
            <div key={i} className="bg-white rounded-xl border border-warm-gray/15 p-5">
              <p className="font-heading text-base text-text-dark mb-4 italic">{stem}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary-sage mb-2">{aName}</p>
                  {aAns ? (
                    <>
                      <p className="text-sm text-text-dark leading-relaxed">{aAns}</p>
                      {a.followUps[i] && (
                        <p className="text-xs text-warm-gray italic mt-2">{a.followUps[i]}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-warm-gray italic opacity-60">(skipped)</p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-soft-rose mb-2">{bName}</p>
                  {bAns ? (
                    <>
                      <p className="text-sm text-text-dark leading-relaxed">{bAns}</p>
                      {b.followUps[i] && (
                        <p className="text-xs text-warm-gray italic mt-2">{b.followUps[i]}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-warm-gray italic opacity-60">(skipped)</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// =====================================================================
// 06 — ATTACHMENT MAP (ECR-S 12-item) — symmetric
// =====================================================================

type AttachmentState = { answers: ECRAnswers }
const attachmentEmpty: AttachmentState = { answers: {} }

export function AttachmentMap(props: StationProps) {
  const { selfData, partnerData, selfSubmitted, partnerSubmitted, selfName, partnerName } = props
  const both = selfSubmitted && partnerSubmitted

  if (both) {
    const a: AttachmentState = (props.myRole === 'a' ? selfData : partnerData) || attachmentEmpty
    const b: AttachmentState = (props.myRole === 'a' ? partnerData : selfData) || attachmentEmpty
    const aName = props.myRole === 'a' ? selfName : partnerName
    const bName = props.myRole === 'a' ? partnerName : selfName
    return <AttachmentReveal a={a} b={b} aName={aName} bName={bName} />
  }

  return <AttachmentFill {...props} />
}

function AttachmentFill({ selfData, selfName, onSave }: StationProps) {
  const [data, setData] = useState<AttachmentState>(selfData || attachmentEmpty)
  const [saving, setSaving] = useState(false)
  const canSubmit = Object.keys(data.answers).length === 12

  async function submit() {
    setSaving(true)
    try {
      await onSave(data, { submit: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <FillFlow
      selfName={selfName}
      canSubmit={canSubmit}
      onSubmit={submit}
      saving={saving}
      subtitle="Twelve items. Answer for how you generally are in close relationships, not how you're feeling today."
    >
      <ECRItems answers={data.answers} onChange={(a) => setData((d) => ({ ...d, answers: a }))} />
    </FillFlow>
  )
}

function AttachmentReveal({
  a,
  b,
  aName,
  bName,
}: {
  a: AttachmentState
  b: AttachmentState
  aName: string
  bName: string
}) {
  const scoreA = scoreECR(a.answers)
  const scoreB = scoreECR(b.answers)
  const combo = getCombinationCopy(scoreA, scoreB)

  return (
    <div className="space-y-6">
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6">
        <AttachmentPlot
          partnerA={scoreA}
          partnerB={scoreB}
          partnerAName={aName}
          partnerBName={bName}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-warm-gray/15 rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-wider text-primary-sage mb-2">{aName}</p>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-warm-gray">Anxiety</span>
            <span className="font-medium text-text-dark">{scoreA.anxiety.toFixed(1)} / 7</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-warm-gray">Avoidance</span>
            <span className="font-medium text-text-dark">{scoreA.avoidance.toFixed(1)} / 7</span>
          </div>
        </div>
        <div className="bg-white border border-warm-gray/15 rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-wider text-soft-rose mb-2">{bName}</p>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-warm-gray">Anxiety</span>
            <span className="font-medium text-text-dark">{scoreB.anxiety.toFixed(1)} / 7</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-warm-gray">Avoidance</span>
            <span className="font-medium text-text-dark">{scoreB.avoidance.toFixed(1)} / 7</span>
          </div>
        </div>
      </div>

      <div className="bg-warm-cream border border-warm-sand/30 rounded-2xl p-6">
        <p className="text-[10px] uppercase tracking-wider text-warm-sand mb-2">{combo.title}</p>
        <p className="text-sm text-text-dark leading-relaxed">{combo.body}</p>
      </div>
    </div>
  )
}

function getCombinationCopy(
  a: { anxiety: number; avoidance: number },
  b: { anxiety: number; avoidance: number }
) {
  const aHighAnx = a.anxiety > 4
  const aHighAvo = a.avoidance > 4
  const bHighAnx = b.anxiety > 4
  const bHighAvo = b.avoidance > 4

  if ((aHighAnx && bHighAvo) || (bHighAnx && aHighAvo)) {
    return {
      title: 'The pursue-withdraw cycle',
      body:
        "One of you reaches with worry; the other pulls back to manage overwhelm. Each move makes the other's pattern stronger. Naming the cycle is the first step out of it. The reaching isn't too much. The pulling away isn't rejection. They're both protective moves, learned long before the two of you met.",
    }
  }
  if (aHighAvo && bHighAvo) {
    return {
      title: 'Two avoiders',
      body:
        "Both of you tend to manage closeness from a distance. The relationship can feel calm, sometimes lonely. The growth edge is letting yourselves be seen reaching — small, awkward, uncertain reaching counts.",
    }
  }
  if (aHighAnx && bHighAnx) {
    return {
      title: 'Two pursuers',
      body:
        "Both of you tend to seek reassurance. When one of you is anxious, the other amplifies. The growth edge is each of you developing your own internal soothing — not to stop reaching for each other, but so reaching becomes invitation rather than rescue.",
    }
  }
  if (!aHighAnx && !aHighAvo && !bHighAnx && !bHighAvo) {
    return {
      title: 'Two secure-leaning baselines',
      body:
        "You both have a fairly secure baseline — that's an asset under stress. Stay attentive to what shifts when one of you is depleted. Even secure systems pursue or withdraw under specific conditions.",
    }
  }
  return {
    title: 'Mixed system',
    body:
      "Your placements show a mixed pattern — neither of you is in the same quadrant. Where you each are tells you something about what activates under stress. The point is the pattern, not the type. Attachment is malleable; corrective experience changes internal working models.",
  }
}
