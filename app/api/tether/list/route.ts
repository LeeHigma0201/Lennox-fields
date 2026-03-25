import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/tether/list — therapist creates a new list for a couple
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const coupleToken = (body.coupleToken as string)?.trim()
    const name = (body.name as string)?.trim()

    if (!coupleToken || !name) {
      return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 400 })
    }

    const couple = await prisma.tetherCouple.findUnique({
      where: { therapistToken: coupleToken },
    })
    if (!couple) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
    }

    const list = await prisma.tetherList.create({
      data: { coupleId: couple.id, name },
    })

    return NextResponse.json({
      list,
      partner1Token: list.partner1Token,
      partner2Token: list.partner2Token,
    })
  } catch (err) {
    console.error('[tether/list POST]', err)
    return NextResponse.json(
      { error: 'DB_UNAVAILABLE', message: 'Database not configured.' },
      { status: 503 }
    )
  }
}
