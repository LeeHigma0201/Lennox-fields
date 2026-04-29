// GET /api/lab/session/[token]
//   Return session info for the partner holding this token.
//   Includes per-station completion status (NOT the other partner's data
//   unless both have submitted).
// PATCH /api/lab/session/[token]
//   Update this partner's safety-gate state or preferred name.

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params
  const session = await prisma.labSession.findFirst({
    where: { OR: [{ partnerAToken: token }, { partnerBToken: token }] },
    include: {
      stationStates: {
        select: {
          stationId: true,
          partnerASubmittedAt: true,
          partnerBSubmittedAt: true,
          revealedAt: true,
          asymmetricRole: true,
        },
      },
    },
  })

  if (!session) {
    return NextResponse.json({ error: 'Session not found.' }, { status: 404 })
  }

  const role: 'a' | 'b' = session.partnerAToken === token ? 'a' : 'b'

  return NextResponse.json({
    id: session.id,
    role,
    selfName: role === 'a' ? session.partnerAName : session.partnerBName,
    partnerName: role === 'a' ? session.partnerBName : session.partnerAName,
    selfSafetyOk: role === 'a' ? session.partnerASafetyOk : session.partnerBSafetyOk,
    partnerSafetyOk: role === 'a' ? session.partnerBSafetyOk : session.partnerASafetyOk,
    partnerToken: role === 'a' ? session.partnerBToken : session.partnerAToken,
    selfToken: token,
    createdAt: session.createdAt,
    lastActivityAt: session.lastActivityAt,
    stationStates: session.stationStates.map((s) => ({
      stationId: s.stationId,
      selfSubmittedAt: role === 'a' ? s.partnerASubmittedAt : s.partnerBSubmittedAt,
      partnerSubmittedAt: role === 'a' ? s.partnerBSubmittedAt : s.partnerASubmittedAt,
      revealedAt: s.revealedAt,
      asymmetricRole: s.asymmetricRole,
    })),
  })
}

export async function PATCH(req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params
  let body: { selfName?: string; partnerName?: string; safetyOk?: boolean } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const session = await prisma.labSession.findFirst({
    where: { OR: [{ partnerAToken: token }, { partnerBToken: token }] },
    select: { id: true, partnerAToken: true },
  })
  if (!session) {
    return NextResponse.json({ error: 'Session not found.' }, { status: 404 })
  }

  const role: 'a' | 'b' = session.partnerAToken === token ? 'a' : 'b'

  const data: Record<string, any> = { lastActivityAt: new Date() }
  if (body.safetyOk !== undefined) {
    data[role === 'a' ? 'partnerASafetyOk' : 'partnerBSafetyOk'] = !!body.safetyOk
  }
  if (body.selfName !== undefined) {
    const trimmed = body.selfName.trim().slice(0, 60)
    if (trimmed.length > 0) {
      data[role === 'a' ? 'partnerAName' : 'partnerBName'] = trimmed
    }
  }
  if (body.partnerName !== undefined) {
    // Either partner can suggest a name for the other (partner B confirms theirs)
    const trimmed = body.partnerName.trim().slice(0, 60)
    if (trimmed.length > 0) {
      data[role === 'a' ? 'partnerBName' : 'partnerAName'] = trimmed
    }
  }

  const updated = await prisma.labSession.update({
    where: { id: session.id },
    data,
    select: {
      partnerAName: true,
      partnerBName: true,
      partnerASafetyOk: true,
      partnerBSafetyOk: true,
    },
  })

  return NextResponse.json({
    selfName: role === 'a' ? updated.partnerAName : updated.partnerBName,
    partnerName: role === 'a' ? updated.partnerBName : updated.partnerAName,
    selfSafetyOk: role === 'a' ? updated.partnerASafetyOk : updated.partnerBSafetyOk,
    partnerSafetyOk: role === 'a' ? updated.partnerBSafetyOk : updated.partnerASafetyOk,
  })
}
