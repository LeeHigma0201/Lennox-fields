import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TetherRole } from '@prisma/client'

// PATCH /api/tether/task/[id] — complete, uncomplete, or edit a task
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { completedBy, uncomplete, text } = body as {
      completedBy?: TetherRole
      uncomplete?: boolean
      text?: string
    }

    const data: Record<string, unknown> = {}

    if (uncomplete) {
      data.completedBy = null
      data.completedAt = null
    } else if (completedBy) {
      data.completedBy = completedBy
      data.completedAt = new Date()
    }

    if (text?.trim()) {
      data.text = text.trim()
    }

    const task = await prisma.tetherTask.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json({ task })
  } catch (err) {
    console.error('[tether/task PATCH]', err)
    return NextResponse.json(
      { error: 'DB_UNAVAILABLE', message: 'Database not configured.' },
      { status: 503 }
    )
  }
}

// DELETE /api/tether/task/[id] — remove a task
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.tetherTask.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[tether/task DELETE]', err)
    return NextResponse.json(
      { error: 'DB_UNAVAILABLE', message: 'Database not configured.' },
      { status: 503 }
    )
  }
}
