// URL-encoded session state for The Lab.
// No DB. State travels in the link itself. Partners share URLs back and forth.
//
// Encoding: JSON.stringify -> URI-safe base64.
// Decoding: reverse. Tolerates missing/malformed gracefully.

export type Phase = 'fill' | 'reveal'

export type LabUrlState = {
  names: { a: string; b: string }
  // Partner data for this station. Either or both may be present.
  a?: any
  b?: any
  // Cross-partner shared metadata (e.g. Sentence Stems theme, asymmetric role 'a' | 'b')
  meta?: any
  // Whose turn it is, when in fill phase
  fillRole?: 'a' | 'b'
}

function utf8ToBase64Url(s: string): string {
  if (typeof window !== 'undefined') {
    const b64 = btoa(unescape(encodeURIComponent(s)))
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  }
  // Node-side
  const b64 = Buffer.from(s, 'utf-8').toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToUtf8(s: string): string {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - (s.length % 4)) % 4)
  if (typeof window !== 'undefined') {
    try {
      return decodeURIComponent(escape(atob(b64)))
    } catch {
      return ''
    }
  }
  return Buffer.from(b64, 'base64').toString('utf-8')
}

export function encodeState(state: LabUrlState): string {
  try {
    return utf8ToBase64Url(JSON.stringify(state))
  } catch {
    return ''
  }
}

export function decodeState(encoded: string | null | undefined): LabUrlState | null {
  if (!encoded) return null
  try {
    const json = base64UrlToUtf8(encoded)
    if (!json) return null
    const parsed = JSON.parse(json)
    if (!parsed || typeof parsed !== 'object') return null
    if (!parsed.names || typeof parsed.names.a !== 'string' || typeof parsed.names.b !== 'string') {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function buildStationUrl(origin: string, stationId: string, state: LabUrlState): string {
  const s = encodeState(state)
  return `${origin}/lab/${stationId}?s=${s}`
}

export function buildGridUrl(origin: string, names: { a: string; b: string }): string {
  const s = encodeState({ names })
  return `${origin}/lab?s=${s}`
}
