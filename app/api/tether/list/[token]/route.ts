import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/tether/list/[token] — partner fetches their list
// Token is either partner1Token or partner2Token on a TetherList
export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    // Find list by either partner token
    const list = await prisma.tetherList.findFirst({
      where: {
        OR: [
          { partner1Token: params.token },
          { partner2Token: params.token },
        ],
      },
      include: {
        tasks: { orderBy: { createdAt: 'asc' } },
        couple: { select: { partner1Label: true, partner2Label: true } },
      },
    })

    if (!list) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
    }

    const partnerRole =
      list.partner1Token === params.token ? 'PARTNER1' : 'PARTNER2'

    return NextResponse.json({
      list: {
        id: list.id,
        name: list.name,
        date: list.date,
        createdAt: list.createdAt,
      },
      tasks: list.tasks,
      couple: list.couple,
      partnerRole,
    })
  } catch (err) {
    console.error('[tether/list GET]', err)
    return NextResponse.json(
      { error: 'DB_UNAVAILABLE', message: 'Database not configured.' },
      { status: 503 }
    )
  }
}
