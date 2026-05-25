import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { assignmentId: string } }
) {
  const { assignmentId } = params
  const db = prisma as any // eslint-disable-line @typescript-eslint/no-explicit-any

  const assignment = await db.toolAssignment.findUnique({
    where: { id: assignmentId },
  })

  if (!assignment) {
    return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
  }

  if (assignment.completedAt) {
    return NextResponse.json({ error: 'Assignment already completed' }, { status: 409 })
  }

  if (new Date() > new Date(assignment.tokenExpires)) {
    return NextResponse.json({ error: 'Assignment link has expired' }, { status: 410 })
  }

  const responseData = await req.json()

  await db.toolResponse.create({
    data: {
      assignmentId,
      therapistId: assignment.therapistId,
      responseData,
    },
  })

  await db.toolAssignment.update({
    where: { id: assignmentId },
    data: { completedAt: new Date() },
  })

  return NextResponse.json({ success: true })
}
