import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import ClientToolShell from './ClientToolShell'

interface PageProps {
  params: { token: string }
}

export default async function ClientTokenPage({ params }: PageProps) {
  const { token } = params
  const db = prisma as any // eslint-disable-line @typescript-eslint/no-explicit-any

  const assignment = await db.toolAssignment.findUnique({
    where: { token },
    select: {
      id: true,
      tool: true,
      clientName: true,
      tokenExpires: true,
      completedAt: true,
    },
  })

  if (!assignment) {
    notFound()
  }

  const isExpired = new Date() > new Date(assignment.tokenExpires)
  const isCompleted = !!assignment.completedAt

  if (isExpired && !isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-6">⏰</div>
          <h1 className="font-heading text-2xl text-stone-800 mb-3">Link expired</h1>
          <p className="text-stone-500">
            This tool link has expired. Please contact your therapist to receive a new link.
          </p>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-6">✅</div>
          <h1 className="font-heading text-2xl text-stone-800 mb-3">Already submitted</h1>
          <p className="text-stone-500">
            You have already completed this tool. Your therapist has received your responses.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-stone-800 mb-2">
            Your Tool: <span className="capitalize">{assignment.tool.replace(/-/g, ' ')}</span>
          </h1>
          <p className="text-stone-500 text-sm">From Lennox Fields Clinical Mental Health Services</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          <ClientToolShell
            assignmentId={assignment.id}
            tool={assignment.tool}
            clientName={assignment.clientName}
          />
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          This is a private, secure link for {assignment.clientName} only.
        </p>
      </div>
    </div>
  )
}
