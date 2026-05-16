// Shared constants, regex guards, and model prompts for the Feelings Translator.
// Private side project for Jason + Tamara. Not part of the public Lennox Fields catalog.

export const PHONE = {
  jason: '+15024080064',
  tamara: '+15029311043',
} as const

export type Role = 'jason' | 'tamara'

export type FrameworkId = 'nvc' | 'gottman' | 'eft' | 'ifs' | 'polyvagal' | 'plain'

export type Framework = {
  id: FrameworkId
  label: string
  hint: string
  caveat?: boolean
}

export const FRAMEWORKS: Framework[] = [
  { id: 'nvc', label: 'NVC', hint: 'use when you have a specific request' },
  { id: 'gottman', label: 'Gottman', hint: "use when you're worried it's coming out as criticism" },
  { id: 'eft', label: 'EFT / Attachment', hint: 'use when this is about feeling alone or unsafe' },
  { id: 'ifs', label: 'IFS / Parts', hint: 'use when you feel pulled in different directions' },
  { id: 'polyvagal', label: 'Polyvagal', hint: 'use when your body is talking louder than your words', caveat: true },
  { id: 'plain', label: 'Plain language', hint: 'strip clinical jargon — receiver mode default' },
]

export const SAFETY_PATTERNS: RegExp[] = [
  /\b(kill|hurt|harm)\s+(myself|him|her|them)\b/i,
  /\b(suicid|end\s+my\s+life|don't\s+want\s+to\s+be\s+here)\b/i,
  /\b(scared\s+of\s+(him|her|them)|afraid\s+he('|\s+i)?ll|afraid\s+she('|\s+i)?ll)\b/i,
  /\b(hit|hits|hitting|threaten|threatening|threatened)\s+me\b/i,
]

export const PARTNER_DIAGNOSIS_PATTERNS: RegExp[] = [
  /\byou(?:'re|\s+are)\s+(?:a\s+)?(narcissist|gaslighter|abusive|toxic|manipulat|borderline|sociopath|psychopath|avoidant|anxious|dismissive|stonewalling|contemptuous)/i,
  /\byou(?:'re|\s+are)\s+gaslighting\s+me\b/i,
  /\byou\s+always\b/i,
  /\byou\s+never\b/i,
]

export const REPAIRS: string[] = [
  'I might be wrong here.',
  'Let me start again in a softer way.',
  "I'm sorry — that came out harder than I meant.",
  'Can I take that back?',
  'I hear you. Let me listen.',
  "I'm getting flooded — I need 20 minutes.",
]

export function containsSafety(s: string): boolean {
  return SAFETY_PATTERNS.some((p) => p.test(s))
}

export function containsPartnerDiagnosis(s: string): boolean {
  return PARTNER_DIAGNOSIS_PATTERNS.some((p) => p.test(s))
}

export function frameworkBlurb(fw: FrameworkId | null): string {
  switch (fw) {
    case 'nvc':
      return 'Nonviolent Communication (Marshall Rosenberg). Observation → Feeling → Need → Request. Authentic, not formula-y.'
    case 'gottman':
      return 'Gottman Method soft-startup. Avoids the Four Horsemen (criticism, contempt, defensiveness, stonewalling). Single issue, "I" statements.'
    case 'eft':
      return 'Emotionally Focused Therapy (Sue Johnson). Surfaces the primary emotion under reactive secondary ones; names the cycle, not the partner.'
    case 'ifs':
      return 'Internal Family Systems (Richard Schwartz). "Speaking for parts," not from them. Names which protector or exile is active in YOU.'
    case 'polyvagal':
      return 'Polyvagal-flavored somatic language (Deb Dana, clinical). Useful shared shorthand. Underlying neurobiology is scientifically contested.'
    case 'plain':
      return 'Strips clinical jargon. One feeling, one observation, one thing the listener could actually do.'
    default:
      return ''
  }
}

// =====================================================================
// Receipt token (ft1:...) — base64url-encoded thread, ported from
// /Users/jason/feelings-translator/public/index.html so the web app
// stays bilateral-compatible with the original HTML artifact version.
// =====================================================================

export type ThreadMessage = {
  from: Role
  raw: string
  translation: string
  framework: FrameworkId | string
  primary: string
  context: string
  ts: number
}

export type Thread = ThreadMessage[]

function utf8ToBase64Url(s: string): string {
  if (typeof window !== 'undefined') {
    const b64 = btoa(unescape(encodeURIComponent(s)))
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }
  const b64 = Buffer.from(s, 'utf-8').toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToUtf8(s: string): string {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - (s.length % 4)) % 4)
  if (typeof window !== 'undefined') {
    try {
      return decodeURIComponent(escape(atob(padded)))
    } catch {
      return ''
    }
  }
  return Buffer.from(padded, 'base64').toString('utf-8')
}

export function encodeThread(thread: Thread): string {
  const payload = JSON.stringify({ v: 1, thread })
  return utf8ToBase64Url(payload)
}

export function decodeThread(token: string | null | undefined): Thread | null {
  if (!token) return null
  // Accept bare base64url OR an ft1:... prefixed string OR a paste of a full iMessage body.
  const match = token.match(/ft1:([A-Za-z0-9\-_]+)/)
  const body = (match ? match[1] : token).trim()
  try {
    const json = base64UrlToUtf8(body)
    if (!json) return null
    const obj = JSON.parse(json)
    if (obj && obj.v === 1 && Array.isArray(obj.thread)) return obj.thread as Thread
  } catch {
    return null
  }
  return null
}

export function smsUrl(toNumber: string, body: string): string {
  return 'sms:' + toNumber + '&body=' + encodeURIComponent(body)
}

// =====================================================================
// Model prompts — kept verbatim from the HTML artifact so the model
// behavior is identical regardless of which surface the user is on.
// =====================================================================

export const SHARED_RULES = `You are a translation assistant inside the Feelings Translator. Two married users share this tool: Jason (a non-therapist, ADHD, solo founder) and Tamara (a licensed therapist and bibliotherapy children's-book author). They have agreed to use this tool together to be heard, not to win.

NON-NEGOTIABLE RULES:
1. Model only the SPEAKER's interior. Never diagnose, label, or make claims about the LISTENER. No "your partner is being avoidant," no "they're stonewalling you." If the raw input does this, set guardrailFlag and refuse.
2. Surface the PRIMARY emotion (per Sue Johnson / EFT: fear, sadness, longing, shame, hurt, grief — NOT anger, contempt, frustration, anxiety which are usually secondary covers).
3. Authenticity over textbook formality. Do not use literal scaffold phrases like "I have a need for…" — use natural language a real human would speak.
4. No pseudo-clinical diagnosing of the speaker either. Don't pathologize. Don't say "your inner child" unless the speaker said it first.
5. If the framework is "polyvagal," include a one-sentence parenthetical that the somatic-state language is a clinical convention (Deb Dana) whose evolutionary/neuroanatomical claims are scientifically contested.
6. Keep translations under 120 words. Specific. One feeling. One need. One observable request if appropriate.
7. Output strict JSON only. NO markdown. NO code fences. NO prose outside the JSON.`

export const FRAMEWORK_INSTRUCTIONS: Record<FrameworkId, string> = {
  nvc: `TRANSLATE INTO NVC (Marshall Rosenberg). Use Observation → Feeling → Need → Request woven into NATURAL language; do NOT label steps. Pull feelings from CNVC inventory (avoid pseudo-feelings like "attacked," "ignored"). Pull from one of nine universal needs. Request must be specific, doable in 24h, refusable. Authentic openers: "What I'm noticing is…" "What matters to me is…" "Would you be willing to…". Avoid "I have a need for X" — textbook giveaway.`,
  gottman: `TRANSLATE INTO GOTTMAN SOFT-STARTUP. Five rules: I-statements, describe behavior not character, say what you DO want, polite/appreciative, single issue. Hard checks: no Criticism (character attack), no Contempt (any superiority/sarcasm), no Defensiveness (counter-attack), no Stonewalling. If appropriate, end with one Repair Attempt phrase like "I might be wrong here" or "Let me start again in a softer way."`,
  eft: `TRANSLATE INTO EFT / ATTACHMENT (Sue Johnson). Step 1: name the SECONDARY emotion in the input (anger/withdrawal/numbness). Step 2: surface the PRIMARY emotion underneath (fear/sadness/longing/shame/hurt/grief/loneliness). Step 3: connect to attachment need (A.R.E. — accessibility, responsiveness, engagement). Step 4: if a Demon Dialogue is visible (Find the Bad Guy / Protest Polka / Freeze and Flee), name the CYCLE not the partner. Authentic: "Underneath the [anger], what's actually there is [fear]." Forbidden: labeling partner's attachment style.`,
  ifs: `TRANSLATE INTO IFS / PARTS (Richard Schwartz). Use "speaking FOR parts": "There's a part of me that…" Identify which kind: Manager (proactive control), Firefighter (reactive — rage, withdrawal, numb), Exile (young, vulnerable). If Self-energy accessible (calm, curious, compassionate) name it; otherwise name the part is "blended" with you. Forbidden: assigning parts to the partner.`,
  polyvagal: `TRANSLATE INTO POLYVAGAL / SOMATIC-STATE (Deb Dana clinical). Map speaker to ventral vagal (safe, connected), sympathetic (mobilized), or dorsal vagal (shutdown). Name what the speaker's neuroception is picking up — NEVER diagnose the partner ("My system is reading this as unsafe," not "you're sending unsafe cues"). End with this exact short caveat ONCE in parentheses: "(this is therapeutic vocabulary from Deb Dana's clinical model; the underlying neurobiology is scientifically contested but the language is a useful shared shorthand.)"`,
  plain: `TRANSLATE FROM CLINICAL/THERAPEUTIC LANGUAGE INTO PLAIN, CONCRETE LANGUAGE. Strip ALL clinical terms: no "needs," no "parts," no "ventral," no "attachment," no "boundaries," no "co-regulation." Rewrite as: one specific feeling in plain English, one specific concrete observation, one specific thing the listener could DO in the next 24 hours. Kitchen-table English only. If the input is itself analysis or advice (not a feeling), translate it as a feeling first.`,
}

// Model id — Gemini, not Anthropic.
// Jason's Anthropic Startup Program application was rejected and he already
// uses Google AI Studio (GOOGLE_API_KEY) in ChargeRight/InspectRight. The
// strict-JSON output is enforced server-side via responseMimeType: application/json.
// Override with GEMINI_MODEL env var if a newer model lands.
export const MODEL_ID = 'gemini-2.5-flash'
