import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/tether/couple/[coupleToken] — therapist fetches all lists + tasks
export async function GET(
  _req: NextRequest,
  { params }: { params: { coupleToken: string } }
) {
  try {
    const couple = await prisma.tetherCouple.findUnique({
      where: { therapistToken: params.coupleToken },
      include: {
        lists: {
          orderBy: { date: 'desc' },
          include: {
            tasks: { orderBy: { createdAt: 'asc' } },
          },
        },
      },
    })

    if (!couple) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
    }

    return NextResponse.json({ couple })
  } catch (err) {
    console.error('[tether/couple GET]', err)
    return NextResponse.json(
      { error: 'DB_UNAVAILABLE', message: 'Database not configured.' },
      { status: 503 }
    )
  }
}
