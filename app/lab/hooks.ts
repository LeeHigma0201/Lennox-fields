'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'lf-lab-session-v1'

export type StationState = {
  a?: any
  b?: any
  role?: 'a' | 'b' // for asymmetric stations: who is the sender/offender/etc.
  revealedAt?: string
}

export type LabSession = {
  safetyGatePassed: boolean
  partnerNames: { a: string; b: string }
  stations: Record<string, StationState>
}

const empty: LabSession = {
  safetyGatePassed: false,
  partnerNames: { a: 'Partner A', b: 'Partner B' },
  stations: {},
}

function read(): LabSession {
  if (typeof window === 'undefined') return empty
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw)
    return { ...empty, ...parsed, partnerNames: { ...empty.partnerNames, ...parsed.partnerNames } }
  } catch {
    return empty
  }
}

function write(s: LabSession) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {}
}

export function useLabSession() {
  const [session, setSession] = useState<LabSession>(empty)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setSession(read())
    setHydrated(true)
  }, [])

  const persist = useCallback((next: LabSession) => {
    setSession(next)
    write(next)
  }, [])

  const setSafetyGatePassed = useCallback(
    (v: boolean) => {
      const next = { ...session, safetyGatePassed: v }
      persist(next)
    },
    [session, persist]
  )

  const setPartnerNames = useCallback(
    (names: { a: string; b: string }) => {
      const next = { ...session, partnerNames: names }
      persist(next)
    },
    [session, persist]
  )

  const getStationState = useCallback(
    (id: string): StationState => session.stations[id] || {},
    [session]
  )

  const updateStationState = useCallback(
    (id: string, patch: Partial<StationState>) => {
      const current = session.stations[id] || {}
      const next: LabSession = {
        ...session,
        stations: { ...session.stations, [id]: { ...current, ...patch } },
      }
      persist(next)
    },
    [session, persist]
  )

  const updatePartnerData = useCallback(
    (id: string, partner: 'a' | 'b', data: any) => {
      const current = session.stations[id] || {}
      const partnerData = { ...(current[partner] || {}), ...data }
      const next: LabSession = {
        ...session,
        stations: { ...session.stations, [id]: { ...current, [partner]: partnerData } },
      }
      persist(next)
    },
    [session, persist]
  )

  const replacePartnerData = useCallback(
    (id: string, partner: 'a' | 'b', data: any) => {
      const current = session.stations[id] || {}
      const next: LabSession = {
        ...session,
        stations: { ...session.stations, [id]: { ...current, [partner]: data } },
      }
      persist(next)
    },
    [session, persist]
  )

  const markRevealed = useCallback(
    (id: string) => {
      updateStationState(id, { revealedAt: new Date().toISOString() })
    },
    [updateStationState]
  )

  const clearStation = useCallback(
    (id: string) => {
      const next = { ...session.stations }
      delete next[id]
      persist({ ...session, stations: next })
    },
    [session, persist]
  )

  const clearAll = useCallback(() => {
    persist(empty)
  }, [persist])

  return {
    session,
    hydrated,
    setSafetyGatePassed,
    setPartnerNames,
    getStationState,
    updateStationState,
    updatePartnerData,
    replacePartnerData,
    markRevealed,
    clearStation,
    clearAll,
  }
}
