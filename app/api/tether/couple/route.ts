import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/tether/couple — therapist creates a new couple session
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const partner1Label = (body.partner1Label as string)?.trim() || 'Partner A'
    const partner2Label = (body.partner2Label as string)?.trim() || 'Partner B'

    const couple = await prisma.tetherCouple.create({
      data: { partner1Label, partner2Label },
    })

    return NextResponse.json({
      therapistToken: couple.therapistToken,
      coupleId: couple.id,
    })
  } catch (err) {
    console.error('[tether/couple POST]', err)
    return NextResponse.json(
      { error: 'DB_UNAVAILABLE', message: 'Database not configured. Set DATABASE_URL in environment variables.' },
      { status: 503 }
    )
  }
}
