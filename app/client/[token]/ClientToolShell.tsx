'use client'

import { useState } from 'react'

interface ClientToolShellProps {
  assignmentId: string
  tool: string
  clientName: string
}

export default function ClientToolShell({ assignmentId, tool, clientName }: ClientToolShellProps) {
  const [answers, setAnswers] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`/api/assignments/${assignmentId}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, submittedAt: new Date().toISOString() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Submission failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="font-heading text-2xl text-stone-800 mb-2">Thank you, {clientName}!</h2>
        <p className="text-stone-500">Your responses have been submitted to your therapist.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 bg-[#75856f]/10 border border-[#75856f]/20 rounded-xl px-5 py-4">
        <p className="text-sm text-stone-600">
          <span className="font-medium text-stone-800">Tool:</span>{' '}
          <span className="capitalize">{tool.replace(/-/g, ' ')}</span>
        </p>
        <p className="text-sm text-stone-600 mt-1">
          <span className="font-medium text-stone-800">Client:</span> {clientName}
        </p>
      </div>

      <p className="text-stone-500 text-sm mb-4">
        Please complete the tool below and submit when you&apos;re ready. Your therapist will
        receive your responses securely.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="answers"
            className="block text-sm font-medium text-stone-700 mb-1"
          >
            Your responses
          </label>
          <textarea
            id="answers"
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
            rows={8}
            required
            placeholder="Enter your responses here..."
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#75856f] focus:border-transparent transition resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting || !answers.trim()}
          className="w-full rounded-lg bg-[#75856f] text-white py-2.5 font-medium hover:bg-[#5f6d5a] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit responses'}
        </button>
      </form>
    </div>
  )
}
