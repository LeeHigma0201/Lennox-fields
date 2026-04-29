'use client'

import { useCallback, useEffect, useState } from 'react'

// =====================================================================
// API-backed hooks for the link-share Lab
// =====================================================================

export type LabSessionView = {
  id: string
  role: 'a' | 'b'
  selfName: string
  partnerName: string
  selfSafetyOk: boolean
  partnerSafetyOk: boolean
  partnerToken: string
  selfToken: string
  createdAt: string
  lastActivityAt: string
  stationStates: Array<{
    stationId: string
    selfSubmittedAt: string | null
    partnerSubmittedAt: string | null
    revealedAt: string | null
    asymmetricRole: 'a' | 'b' | null
  }>
}

export type StationStateView = {
  stationId: string
  selfData: any
  partnerData: any
  sharedMetadata: any
  selfSubmittedAt: string | null
  partnerSubmittedAt: string | null
  revealedAt: string | null
  asymmetricRole: 'a' | 'b' | null
  revealed: boolean
}

export async function createLabSession(
  partnerAName: string,
  partnerBName: string
): Promise<{ id: string; partnerAToken: string; partnerBToken: string; partnerAName: string; partnerBName: string }> {
  const res = await fetch('/api/lab/session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ partnerAName, partnerBName }),
  })
  if (!res.ok) throw new Error('Failed to create session.')
  return res.json()
}

export function useLabSessionByToken(token: string | null) {
  const [session, setSession] = useState<LabSessionView | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await fetch(`/api/lab/session/${token}`, { cache: 'no-store' })
      if (res.status === 404) {
        setError('We could not find this Lab session. The link may be expired or wrong.')
        setSession(null)
      } else if (!res.ok) {
        setError('Could not load this session.')
      } else {
        setSession(await res.json())
        setError(null)
      }
    } catch (e: any) {
      setError(e?.message || 'Network error.')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    refresh()
  }, [refresh])

  // Light auto-refresh so the partner-completion status updates without manual reload.
  useEffect(() => {
    if (!token) return
    const id = setInterval(refresh, 8000)
    return () => clearInterval(id)
  }, [token, refresh])

  const patchSession = useCallback(
    async (patch: { selfName?: string; partnerName?: string; safetyOk?: boolean }) => {
      if (!token) return
      const res = await fetch(`/api/lab/session/${token}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(patch),
      })
      if (!res.ok) throw new Error('Could not update session.')
      await refresh()
    },
    [token, refresh]
  )

  return { session, loading, error, refresh, patchSession }
}

export function useStationState(stationId: string, token: string | null) {
  const [state, setState] = useState<StationStateView | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await fetch(`/api/lab/station/${stationId}/${token}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('Could not load station.')
      setState(await res.json())
      setError(null)
    } catch (e: any) {
      setError(e?.message || 'Network error.')
    } finally {
      setLoading(false)
    }
  }, [stationId, token])

  useEffect(() => {
    refresh()
  }, [refresh])

  // Auto-refresh while waiting for partner
  useEffect(() => {
    if (!token || !state) return
    if (state.revealed) return
    if (!state.selfSubmittedAt) return // not yet waiting
    const id = setInterval(refresh, 6000)
    return () => clearInterval(id)
  }, [token, state, refresh])

  const save = useCallback(
    async (
      data: any,
      options?: { submit?: boolean; asymmetricRole?: 'a' | 'b'; sharedMetadata?: any }
    ) => {
      if (!token) return
      const res = await fetch(`/api/lab/station/${stationId}/${token}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          data,
          submit: !!options?.submit,
          asymmetricRole: options?.asymmetricRole,
          sharedMetadata: options?.sharedMetadata,
        }),
      })
      if (!res.ok) throw new Error('Could not save.')
      const next = await res.json()
      setState(next)
      return next as StationStateView
    },
    [stationId, token]
  )

  const reset = useCallback(async () => {
    if (!token) return
    const res = await fetch(`/api/lab/station/${stationId}/${token}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Could not reset.')
    await refresh()
  }, [stationId, token, refresh])

  return { state, loading, error, save, reset, refresh }
}

// =====================================================================
// localStorage helpers — only for "session token cache" so a partner
// can return to a session via /lab on a device that already opened it
// =====================================================================

const RECENT_TOKEN_KEY = 'lf-lab-recent-token'

export function rememberToken(token: string) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(RECENT_TOKEN_KEY, token)
  } catch {}
}

export function recallToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(RECENT_TOKEN_KEY)
  } catch {
    return null
  }
}

export function forgetToken() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(RECENT_TOKEN_KEY)
  } catch {}
}
