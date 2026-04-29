// POST /api/lab/session
// Create a new Lab session. Returns both partner tokens.
// One partner starts; they share the partner-B link with their partner.

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  let body: { partnerAName?: string; partnerBName?: string } = {}
  try {
    body = await req.json()
  } catch {}

  const partnerAName = (body.partnerAName || '').trim() || 'Partner A'
  const partnerBName = (body.partnerBName || '').trim() || 'Partner B'

  if (partnerAName.length > 60 || partnerBName.length > 60) {
    return NextResponse.json({ error: 'Names too long.' }, { status: 400 })
  }

  const session = await prisma.labSession.create({
    data: { partnerAName, partnerBName },
    select: {
      id: true,
      partnerAToken: true,
      partnerBToken: true,
      partnerAName: true,
      partnerBName: true,
      createdAt: true,
    },
  })

  return NextResponse.json(session)
}
