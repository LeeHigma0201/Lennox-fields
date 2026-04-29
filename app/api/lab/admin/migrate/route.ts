// One-time migration route — applies Lab schema additions to production DB.
// Idempotent: uses CREATE TABLE IF NOT EXISTS / etc. Safe to call multiple times.
// Protected by a hardcoded token (one-shot; not a secret long-term).
//
// Call: POST /api/lab/admin/migrate?key=97af0c9160fc9da10cb499d6a84a639b385a5444508cb0a4
//
// After applying once, this route can be deleted in a subsequent commit.

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const MIGRATION_KEY = '97af0c9160fc9da10cb499d6a84a639b385a5444508cb0a4'

const STATEMENTS = [
  // Lab sessions
  `CREATE TABLE IF NOT EXISTS "lab_sessions" (
    "id" TEXT PRIMARY KEY,
    "partnerAToken" TEXT NOT NULL,
    "partnerBToken" TEXT NOT NULL,
    "partnerAName" TEXT NOT NULL DEFAULT 'Partner A',
    "partnerBName" TEXT NOT NULL DEFAULT 'Partner B',
    "partnerASafetyOk" BOOLEAN NOT NULL DEFAULT false,
    "partnerBSafetyOk" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "lab_sessions_partnerAToken_key" ON "lab_sessions"("partnerAToken")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "lab_sessions_partnerBToken_key" ON "lab_sessions"("partnerBToken")`,
  `CREATE INDEX IF NOT EXISTS "lab_sessions_partnerAToken_idx" ON "lab_sessions"("partnerAToken")`,
  `CREATE INDEX IF NOT EXISTS "lab_sessions_partnerBToken_idx" ON "lab_sessions"("partnerBToken")`,

  // Lab station states
  `CREATE TABLE IF NOT EXISTS "lab_station_states" (
    "id" TEXT PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "partnerAData" JSONB,
    "partnerBData" JSONB,
    "partnerASubmittedAt" TIMESTAMP(3),
    "partnerBSubmittedAt" TIMESTAMP(3),
    "asymmetricRole" TEXT,
    "sharedMetadata" JSONB,
    "revealedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "lab_station_states_sessionId_stationId_key" ON "lab_station_states"("sessionId", "stationId")`,
  `CREATE INDEX IF NOT EXISTS "lab_station_states_sessionId_idx" ON "lab_station_states"("sessionId")`,
  `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'lab_station_states_sessionId_fkey') THEN
      ALTER TABLE "lab_station_states"
        ADD CONSTRAINT "lab_station_states_sessionId_fkey"
        FOREIGN KEY ("sessionId") REFERENCES "lab_sessions"("id") ON DELETE CASCADE;
    END IF;
  END $$`,
]

async function runMigrations() {
  const results: Array<{ index: number; ok: boolean; error?: string }> = []
  for (let i = 0; i < STATEMENTS.length; i++) {
    try {
      await prisma.$executeRawUnsafe(STATEMENTS[i])
      results.push({ index: i, ok: true })
    } catch (e: any) {
      results.push({ index: i, ok: false, error: String(e.message || e) })
    }
  }
  return results
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (key !== MIGRATION_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const results = await runMigrations()
  return NextResponse.json({ ok: true, results })
}

export async function POST(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (key !== MIGRATION_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const results = await runMigrations()
  return NextResponse.json({ ok: true, results })
}
