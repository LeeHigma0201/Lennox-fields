'use client'

import { useState } from 'react'
import { sentenceStems, stations } from '../data'
import {
  AttachmentPlot,
  ECRAnswers,
  ECRItems,
  FeltSlider,
  SentenceStem,
  scoreECR,
} from '../primitives'
import { PairedColumns, PartnerFlow } from '../components'

export type StationMode = 'a' | 'b' | 'reveal'
export type StationProps = {
  mode: StationMode
  stateA: any
  stateB: any
  onUpdate: (partial: any) => void
  partnerNames: { a: string; b: string }
  onAdvance: () => void
}

// =====================================================================
// 01 — STATE OF THE UNION (Gottman)
// 5 appreciations + 1 gentle-startup concern + 1 repair request + 1 look-forward
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
  if (props.mode === 'reveal') return <StateOfUnionReveal {...props} />
  return <StateOfUnionFlow {...props} />
}

function StateOfUnionFlow({ mode, stateA, stateB, onUpdate, partnerNames, onAdvance }: StationProps) {
  const partner = mode === 'a' ? 'a' : 'b'
  const data: SoUState = (mode === 'a' ? stateA : stateB) || soUEmpty
  const name = mode === 'a' ? partnerNames.a : partnerNames.b
  const isFirst = mode === 'a'

  function update(patch: Partial<SoUState>) {
    onUpdate({ ...data, ...patch })
  }

  function setAppreciation(idx: number, value: string) {
    const next = [...data.appreciations]
    next[idx] = value
    update({ appreciations: next })
  }

  function setAppreciationFollowUp(idx: number, value: string) {
    const next = [...data.appreciationFollowUps]
    next[idx] = value
    update({ appreciationFollowUps: next })
  }

  const filledAppreciations = data.appreciations.filter((a) => a.trim().length > 0).length
  const canSubmit = filledAppreciations >= 3 && data.concern.trim().length > 0 && data.repair.trim().length > 0

  return (
    <PartnerFlow partnerName={name} isFirst={isFirst} canSubmit={canSubmit} onSubmit={onAdvance}>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">Five appreciations from this week</p>
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
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">One concern — gentle startup</p>
        <p className="text-xs text-warm-gray italic mb-4">
          Format: "I feel ___ about ___ (situational, not character) and I need ___." No "you always," no character indictments.
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
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">One thing to look forward to</p>
        <SentenceStem
          stem="Something I want us to do together this week is…"
          value={data.lookForward}
          onChange={(v) => update({ lookForward: v })}
          showFollowUp={false}
        />
      </div>
    </PartnerFlow>
  )
}

function StateOfUnionReveal({ stateA, stateB, partnerNames, onAdvance }: StationProps) {
  const a: SoUState = stateA || soUEmpty
  const b: SoUState = stateB || soUEmpty

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

  return <PairedColumns partnerNames={partnerNames} left={renderColumn(a)} right={renderColumn(b)} />
}

// =====================================================================
// 02 — STRESS-REDUCING CONVERSATION (Gottman) — asymmetric
// Sender names external stressor + need-type. Receiver follows 6 rules.
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

export function StressReducing(props: StationProps) {
  if (props.mode === 'reveal') return <StressReducingReveal {...props} />
  return <StressReducingFlow {...props} />
}

function StressReducingFlow(props: StationProps) {
  if (props.mode === 'a') return <StressReducingSender {...props} />
  return <StressReducingReceiver {...props} />
}

function StressReducingSender({ stateA, onUpdate, partnerNames, onAdvance }: StationProps) {
  const name = partnerNames.a
  const data: SRSenderState =
    stateA && stateA.stressor !== undefined ? stateA : srSenderEmpty
  const canSubmit =
    data.stressor.trim().length > 0 &&
    data.feeling.trim().length > 0 &&
    data.needType !== ''

  return (
    <PartnerFlow partnerName={name} isFirst={true} canSubmit={canSubmit} onSubmit={onAdvance}>
      <div className="bg-warm-cream/60 p-4 rounded-lg text-xs text-warm-gray italic leading-relaxed">
        This is for stress from <em>outside</em> the relationship — work, family-of-origin, the world. Not about
        something between the two of you. The Gottmans are clear: this format collapses if you use it for
        relationship grievances.
      </div>
      <SentenceStem
        stem="The stressful thing I want to share is…"
        value={data.stressor}
        onChange={(v) => onUpdate({ ...data, stressor: v })}
        showFollowUp={false}
      />
      <SentenceStem
        stem="What I'm feeling about it is…"
        value={data.feeling}
        onChange={(v) => onUpdate({ ...data, feeling: v })}
        showFollowUp={false}
      />
      <div>
        <p className="font-body text-base text-text-dark mb-3">What I need right now is…</p>
        <div className="grid grid-cols-2 gap-2">
          {needTypeOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onUpdate({ ...data, needType: opt.id })}
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
    </PartnerFlow>
  )
}

function StressReducingReceiver({ stateA, stateB, onUpdate, partnerNames, onAdvance }: StationProps) {
  const name = partnerNames.b
  const senderData: SRSenderState = stateA || srSenderEmpty
  const data: SRReceiverState =
    stateB && stateB.interest !== undefined ? stateB : srReceiverEmpty
  const canSubmit =
    data.interest.trim().length > 0 &&
    data.understanding.trim().length > 0 &&
    data.takeSide.trim().length > 0 &&
    data.weAgainst.trim().length > 0 &&
    data.affection.trim().length > 0 &&
    data.validation.trim().length > 0

  return (
    <PartnerFlow partnerName={name} isFirst={false} canSubmit={canSubmit} onSubmit={onAdvance}>
      <div className="bg-warm-cream rounded-xl p-4 mb-2">
        <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-2">{partnerNames.a} shared</p>
        <p className="text-sm text-text-dark italic leading-relaxed mb-2">{senderData.stressor}</p>
        <p className="text-xs text-warm-gray">
          They&apos;re feeling: <strong>{senderData.feeling}</strong>
        </p>
        <p className="text-xs text-warm-gray">
          What they need: <strong>{labelForNeed(senderData.needType)}</strong>
        </p>
      </div>
      <p className="text-xs text-warm-gray italic">
        Six rules — Gottman&apos;s structure. No advice unless they asked for it.
      </p>
      <SentenceStem
        stem="Show genuine interest. What's a question that says you want to understand?"
        value={data.interest}
        onChange={(v) => onUpdate({ ...data, interest: v })}
        showFollowUp={false}
      />
      <SentenceStem
        stem='Communicate understanding. "It makes sense that you feel ___ because ___."'
        value={data.understanding}
        onChange={(v) => onUpdate({ ...data, understanding: v })}
        showFollowUp={false}
      />
      <SentenceStem
        stem="Take their side, even when they're partly wrong. Whose side are you on?"
        value={data.takeSide}
        onChange={(v) => onUpdate({ ...data, takeSide: v })}
        showFollowUp={false}
      />
      <SentenceStem
        stem='"We against the world." What does this look like as something the two of you face together?'
        value={data.weAgainst}
        onChange={(v) => onUpdate({ ...data, weAgainst: v })}
        showFollowUp={false}
      />
      <SentenceStem
        stem="Express affection. What's the warmth you want them to feel from you?"
        value={data.affection}
        onChange={(v) => onUpdate({ ...data, affection: v })}
        showFollowUp={false}
      />
      <SentenceStem
        stem={'Validate the emotion. "Anyone in your shoes would feel this. You\'re not crazy for feeling this."'}
        value={data.validation}
        onChange={(v) => onUpdate({ ...data, validation: v })}
        showFollowUp={false}
      />
    </PartnerFlow>
  )
}

function labelForNeed(t: SRSenderState['needType']) {
  return {
    '': '—',
    vent: 'to vent',
    advice: 'advice',
    distraction: 'distraction',
    affection: 'affection',
  }[t]
}

function StressReducingReveal({ stateA, stateB, onUpdate, partnerNames }: StationProps) {
  const sender: SRSenderState = stateA || srSenderEmpty
  const receiver: SRReceiverState = stateB || srReceiverEmpty
  const [feltHeard, setFeltHeard] = useState<number>(sender.feltHeard ?? 5)

  function persist(v: number) {
    setFeltHeard(v)
    onUpdate({ ...sender, feltHeard: v })
  }

  return (
    <div>
      <PairedColumns
        partnerNames={partnerNames}
        left={
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
        right={
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
      <div className="mt-8 max-w-md mx-auto bg-white border border-warm-gray/15 rounded-2xl p-6">
        <FeltSlider
          label={`${partnerNames.a}: how heard did you feel?`}
          leftAnchor="Not at all"
          rightAnchor="Completely"
          value={feltHeard}
          onChange={persist}
        />
      </div>
    </div>
  )
}

// =====================================================================
// 03 — SENTENCE STEMS — theme-picker + symmetric stems
// =====================================================================

type StemTheme = keyof typeof sentenceStems
type StemsState = {
  theme?: StemTheme
  answers: Record<number, string>
  followUps: Record<number, string>
}

const stemsEmpty: StemsState = { answers: {}, followUps: {} }

export function SentenceStemsStation(props: StationProps) {
  if (props.mode === 'reveal') return <StemsReveal {...props} />
  return <StemsFlow {...props} />
}

function StemsFlow({ mode, stateA, stateB, onUpdate, partnerNames, onAdvance }: StationProps) {
  const data: StemsState = (mode === 'a' ? stateA : stateB) || stemsEmpty
  const name = mode === 'a' ? partnerNames.a : partnerNames.b
  const isFirst = mode === 'a'

  // First partner picks the theme; second partner uses the same theme.
  const themeFromA: StemTheme | undefined = stateA?.theme
  const lockedTheme = isFirst ? data.theme : themeFromA
  const activeTheme = lockedTheme

  function pickTheme(t: StemTheme) {
    onUpdate({ ...data, theme: t, answers: {}, followUps: {} })
  }

  function setAnswer(i: number, v: string) {
    onUpdate({ ...data, answers: { ...data.answers, [i]: v } })
  }
  function setFollowUp(i: number, v: string) {
    onUpdate({ ...data, followUps: { ...data.followUps, [i]: v } })
  }

  if (!activeTheme) {
    return (
      <PartnerFlow
        partnerName={name}
        isFirst={isFirst}
        canSubmit={false}
        onSubmit={() => {}}
        submitLabel="Pick a theme to continue"
      >
        <p className="text-sm text-warm-gray">
          Pick a theme that fits where you are this week. Your partner will answer the same one.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(Object.entries(sentenceStems) as Array<[StemTheme, typeof sentenceStems[StemTheme]]>).map(
            ([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => pickTheme(key)}
                className="p-4 rounded-lg bg-warm-cream border border-warm-gray/20 hover:border-primary-sage hover:bg-primary-sage/5 text-left transition"
              >
                <p className="font-medium text-text-dark text-sm">{value.label}</p>
                <p className="text-xs text-warm-gray mt-1">{value.stems.length} stems</p>
              </button>
            )
          )}
        </div>
      </PartnerFlow>
    )
  }

  const themeData = sentenceStems[activeTheme]
  const filled = Object.values(data.answers).filter((a) => a && a.trim().length > 0).length
  const canSubmit = filled >= 2

  return (
    <PartnerFlow
      partnerName={name}
      isFirst={isFirst}
      canSubmit={canSubmit}
      onSubmit={onAdvance}
      submitLabel={canSubmit ? (isFirst ? "I'm done — hand to my partner" : 'Show us both') : 'Answer at least two'}
    >
      <div>
        <p className="text-[10px] uppercase tracking-wider text-primary-sage mb-1">Theme</p>
        <p className="font-heading text-lg text-text-dark mb-1">{themeData.label}</p>
        <p className="text-xs text-warm-gray italic">
          Answer at least two. Skip any that don't fit. The second answer is often deeper than the first.
        </p>
      </div>
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
    </PartnerFlow>
  )
}

function StemsReveal({ stateA, stateB, partnerNames }: StationProps) {
  const a: StemsState = stateA || stemsEmpty
  const b: StemsState = stateB || stemsEmpty
  const theme = a.theme
  if (!theme) return null
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
                  <p className="text-[10px] uppercase tracking-wider text-primary-sage mb-2">{partnerNames.a}</p>
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
                  <p className="text-[10px] uppercase tracking-wider text-soft-rose mb-2">{partnerNames.b}</p>
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
// 06 — ATTACHMENT MAP (ECR-S 12-item)
// =====================================================================

type AttachmentState = {
  answers: ECRAnswers
}

const attachmentEmpty: AttachmentState = { answers: {} }

export function AttachmentMap(props: StationProps) {
  if (props.mode === 'reveal') return <AttachmentReveal {...props} />
  return <AttachmentFlow {...props} />
}

function AttachmentFlow({ mode, stateA, stateB, onUpdate, partnerNames, onAdvance }: StationProps) {
  const data: AttachmentState = (mode === 'a' ? stateA : stateB) || attachmentEmpty
  const name = mode === 'a' ? partnerNames.a : partnerNames.b
  const isFirst = mode === 'a'
  const canSubmit = Object.keys(data.answers).length === 12

  return (
    <PartnerFlow partnerName={name} isFirst={isFirst} canSubmit={canSubmit} onSubmit={onAdvance}>
      <p className="text-xs text-warm-gray italic">
        Twelve items. Answer for how you generally are in close relationships, not how you're feeling today.
      </p>
      <ECRItems
        answers={data.answers}
        onChange={(a) => onUpdate({ ...data, answers: a })}
      />
    </PartnerFlow>
  )
}

function AttachmentReveal({ stateA, stateB, partnerNames }: StationProps) {
  const a: AttachmentState = stateA || attachmentEmpty
  const b: AttachmentState = stateB || attachmentEmpty
  const scoreA = scoreECR(a.answers)
  const scoreB = scoreECR(b.answers)

  // Determine combination prompts
  const combo = getCombinationCopy(scoreA, scoreB)

  return (
    <div className="space-y-6">
      <div className="bg-white border border-warm-gray/15 rounded-2xl p-6">
        <AttachmentPlot
          partnerA={scoreA}
          partnerB={scoreB}
          partnerAName={partnerNames.a}
          partnerBName={partnerNames.b}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-warm-gray/15 rounded-xl p-5">
          <p className="text-[10px] uppercase tracking-wider text-primary-sage mb-2">{partnerNames.a}</p>
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
          <p className="text-[10px] uppercase tracking-wider text-soft-rose mb-2">{partnerNames.b}</p>
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
