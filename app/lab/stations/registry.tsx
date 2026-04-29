'use client'

import { ComponentType } from 'react'
import {
  AttachmentMap,
  SentenceStemsStation,
  StateOfUnion,
  StationProps,
  StressReducing,
} from './anchor'

// Phase 1A — 4 anchor stations registered.
// Phase 1B will register the remaining 21.
const registry: Record<string, ComponentType<StationProps>> = {
  'state-of-union': StateOfUnion,
  'stress-reducing': StressReducing,
  'sentence-stems': SentenceStemsStation,
  'attachment-map': AttachmentMap,
}

export function getStationComponent(id: string): ComponentType<StationProps> | null {
  return registry[id] || null
}

export function isStationImplemented(id: string): boolean {
  return id in registry
}
