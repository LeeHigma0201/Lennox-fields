import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const VALID_TOOLS = [
  'phq-9',
  'gad-7',
  'pcl-5',
  'breathing-exercises',
  'cbt-thought-record',
  'safety-planning',
] as const

const CreateAssignmentSchema = z.object({
  tool: z.enum(VALID_TOOLS),
  clientEmail: z.string().email(),
  clientName: z.string().min(1),
  expiresInDays: z.number().int().min(1).max(90).default(7),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const therapistId = (session.user as { id: string }).id
  if (!therapistId) {
    return NextResponse.json({ error: 'User ID missing from session' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = CreateAssignmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 })
  }

  const { tool, clientEmail, clientName, expiresInDays } = parsed.data
  const tokenExpires = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)

  const db = prisma as any // eslint-disable-line @typescript-eslint/no-explicit-any
  const assignment = await db.toolAssignment.create({
    data: { therapistId, tool, clientEmail, clientName, tokenExpires },
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const link = `${baseUrl}/client/${assignment.token}`

  // Send email if Resend is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const fromAddress = process.env.EMAIL_FROM ?? 'Lennox Fields <hello@lennoxfields.com>'
      await resend.emails.send({
        from: fromAddress,
        to: clientEmail,
        subject: `Your ${tool} tool from Lennox Fields`,
        html: `
          <p>Hi ${clientName},</p>
          <p>Your therapist has sent you a tool to complete: <strong>${tool}</strong>.</p>
          <p><a href="${link}" style="color:#75856f;font-weight:bold;">Open your tool</a></p>
          <p>This link expires in ${expiresInDays} day${expiresInDays === 1 ? '' : 's'}.</p>
          <p>— Lennox Fields Clinical Mental Health Services</p>
        `,
      })
    } catch (emailErr) {
      // Non-fatal — assignment was created; log and continue
      console.error('Failed to send assignment email:', emailErr)
    }
  }

  return NextResponse.json({ token: assignment.token, link })
}
