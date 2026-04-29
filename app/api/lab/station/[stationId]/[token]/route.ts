// GET    /api/lab/station/[stationId]/[token]
//   Returns this partner's data + status. If both submitted, returns full reveal payload.
// POST   /api/lab/station/[stationId]/[token]
//   Submit/save this partner's data for this station. Optional `submit: true` finalizes.
// DELETE /api/lab/station/[stationId]/[token]
//   Reset this partner's submission for this station.

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

async function findRole(token: string) {
  const session = await prisma.labSession.findFirst({
    where: { OR: [{ partnerAToken: token }, { partnerBToken: token }] },
    select: { id: true, partnerAToken: true, partnerAName: true, partnerBName: true },
  })
  if (!session) return null
  const role: 'a' | 'b' = session.partnerAToken === token ? 'a' : 'b'
  return { session, role }
}

function shapeStationState(role: 'a' | 'b', s: any) {
  const bothSubmitted = !!s.partnerASubmittedAt && !!s.partnerBSubmittedAt
  // For asymmetric stations, the sender's data becomes visible to the receiver
  // as soon as the sender submits — they need to see it to respond.
  const senderRole: 'a' | 'b' | null = s.asymmetricRole
  const isReceiver = senderRole !== null && senderRole !== role
  const senderSubmitted =
    senderRole === 'a' ? !!s.partnerASubmittedAt : senderRole === 'b' ? !!s.partnerBSubmittedAt : false
  const exposePartnerData = bothSubmitted || (isReceiver && senderSubmitted)
  return {
    stationId: s.stationId,
    selfData: role === 'a' ? s.partnerAData : s.partnerBData,
    partnerData: exposePartnerData ? (role === 'a' ? s.partnerBData : s.partnerAData) : null,
    sharedMetadata: s.sharedMetadata ?? null,
    selfSubmittedAt: role === 'a' ? s.partnerASubmittedAt : s.partnerBSubmittedAt,
    partnerSubmittedAt: role === 'a' ? s.partnerBSubmittedAt : s.partnerASubmittedAt,
    revealedAt: s.revealedAt,
    asymmetricRole: s.asymmetricRole,
    revealed: bothSubmitted,
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { stationId: string; token: string } }
) {
  const found = await findRole(params.token)
  if (!found) return NextResponse.json({ error: 'Session not found.' }, { status: 404 })

  const state = await prisma.labStationState.findUnique({
    where: { sessionId_stationId: { sessionId: found.session.id, stationId: params.stationId } },
  })

  if (!state) {
    return NextResponse.json({
      stationId: params.stationId,
      selfData: null,
      partnerData: null,
      selfSubmittedAt: null,
      partnerSubmittedAt: null,
      revealedAt: null,
      asymmetricRole: null,
      revealed: false,
    })
  }

  return NextResponse.json(shapeStationState(found.role, state))
}

export async function POST(
  req: NextRequest,
  { params }: { params: { stationId: string; token: string } }
) {
  let body: { data?: any; submit?: boolean; asymmetricRole?: 'a' | 'b'; sharedMetadata?: any } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const found = await findRole(params.token)
  if (!found) return NextResponse.json({ error: 'Session not found.' }, { status: 404 })
  const { session, role } = found

  const dataField = role === 'a' ? 'partnerAData' : 'partnerBData'
  const submitField = role === 'a' ? 'partnerASubmittedAt' : 'partnerBSubmittedAt'

  const updateData: Record<string, any> = {
    [dataField]: body.data ?? undefined,
  }
  if (body.submit) {
    updateData[submitField] = new Date()
  }
  // Asymmetric role can be set by partner A (initiator) only
  if (body.asymmetricRole !== undefined && role === 'a') {
    updateData.asymmetricRole = body.asymmetricRole
  }
  // Shared metadata can be written by either partner; merge by spread
  if (body.sharedMetadata !== undefined) {
    updateData.sharedMetadata = body.sharedMetadata
  }

  const upserted = await prisma.labStationState.upsert({
    where: { sessionId_stationId: { sessionId: session.id, stationId: params.stationId } },
    create: {
      sessionId: session.id,
      stationId: params.stationId,
      [dataField]: body.data ?? null,
      ...(body.submit ? { [submitField]: new Date() } : {}),
      ...(body.asymmetricRole !== undefined && role === 'a'
        ? { asymmetricRole: body.asymmetricRole }
        : {}),
      ...(body.sharedMetadata !== undefined ? { sharedMetadata: body.sharedMetadata } : {}),
    },
    update: updateData,
  })

  // If both have submitted and reveal hasn't been marked, mark it
  let final = upserted
  if (
    upserted.partnerASubmittedAt &&
    upserted.partnerBSubmittedAt &&
    !upserted.revealedAt
  ) {
    final = await prisma.labStationState.update({
      where: { id: upserted.id },
      data: { revealedAt: new Date() },
    })
  }

  await prisma.labSession.update({
    where: { id: session.id },
    data: { lastActivityAt: new Date() },
  })

  return NextResponse.json(shapeStationState(role, final))
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { stationId: string; token: string } }
) {
  const found = await findRole(params.token)
  if (!found) return NextResponse.json({ error: 'Session not found.' }, { status: 404 })
  const { session, role } = found

  const dataField = role === 'a' ? 'partnerAData' : 'partnerBData'
  const submitField = role === 'a' ? 'partnerASubmittedAt' : 'partnerBSubmittedAt'

  await prisma.labStationState.updateMany({
    where: { sessionId: session.id, stationId: params.stationId },
    data: { [dataField]: null, [submitField]: null, revealedAt: null },
  })

  return NextResponse.json({ ok: true })
}
