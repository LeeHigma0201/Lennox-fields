import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TetherRole } from '@prisma/client'

// POST /api/tether/task — partner adds a task to a list
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const listToken = (body.listToken as string)?.trim()
    const text = (body.text as string)?.trim()
    const addedBy = body.addedBy as TetherRole

    if (!listToken || !text || !addedBy) {
      return NextResponse.json({ error: 'MISSING_FIELDS' }, { status: 400 })
    }

    if (!['PARTNER1', 'PARTNER2', 'THERAPIST'].includes(addedBy)) {
      return NextResponse.json({ error: 'INVALID_ROLE' }, { status: 400 })
    }

    // Find list by partner token
    const list = await prisma.tetherList.findFirst({
      where: {
        OR: [{ partner1Token: listToken }, { partner2Token: listToken }],
      },
    })

    if (!list) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
    }

    const task = await prisma.tetherTask.create({
      data: { listId: list.id, text, addedBy },
    })

    return NextResponse.json({ task })
  } catch (err) {
    console.error('[tether/task POST]', err)
    return NextResponse.json(
      { error: 'DB_UNAVAILABLE', message: 'Database not configured.' },
      { status: 503 }
    )
  }
}
