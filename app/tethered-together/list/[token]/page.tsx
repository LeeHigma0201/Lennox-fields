'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Shield, Check, Plus, Trash2, AlertTriangle, RefreshCw } from 'lucide-react'

// ── Types ───────────────────────────────────────────────────────────────────

interface TetherTask {
  id: string
  text: string
  addedBy: 'PARTNER1' | 'PARTNER2' | 'THERAPIST'
  completedBy: 'PARTNER1' | 'PARTNER2' | null
  completedAt: string | null
  createdAt: string
}

interface ListData {
  list: { id: string; name: string; date: string }
  tasks: TetherTask[]
  couple: { partner1Label: string; partner2Label: string }
  partnerRole: 'PARTNER1' | 'PARTNER2'
}

type Step = 'consent' | 'session'

// ── Component ───────────────────────────────────────────────────────────────

export default function PartnerListPage() {
  const params = useParams()
  const token = params?.token as string

  const [data, setData] = useState<ListData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [step, setStep] = useState<Step>('consent')
  const [consentChecked, setConsentChecked] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')
  const [addingTask, setAddingTask] = useState(false)

  const fetchList = useCallback(async () => {
    try {
      const res = await fetch(`/api/tether/list/${token}`)
      const json = await res.json()
      if (!res.ok) {
        setError(json.error === 'DB_UNAVAILABLE' ? 'db' : json.error === 'NOT_FOUND' ? 'notfound' : 'unknown')
        return
      }
      setData(json)
    } catch {
      setError('unknown')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  // Check localStorage for existing consent on this token
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`tether_consent_${token}`)
      if (stored) setStep('session')
    }
  }, [token])

  function handleConsent() {
    if (!consentChecked) return
    localStorage.setItem(`tether_consent_${token}`, JSON.stringify({ ts: Date.now() }))
    setStep('session')
  }

  async function handleAddTask() {
    if (!newTaskText.trim() || !data) return
    setAddingTask(true)

    // Optimistic update
    const optimisticTask: TetherTask = {
      id: `optimistic-${Date.now()}`,
      text: newTaskText.trim(),
      addedBy: data.partnerRole,
      completedBy: null,
      completedAt: null,
      createdAt: new Date().toISOString(),
    }
    setData((d) => d ? { ...d, tasks: [...d.tasks, optimisticTask] } : d)
    setNewTaskText('')

    try {
      const res = await fetch('/api/tether/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listToken: token,
          text: optimisticTask.text,
          addedBy: data.partnerRole,
        }),
      })
      if (res.ok) {
        fetchList() // Re-fetch to get real ID + other partner's additions
      }
    } finally {
      setAddingTask(false)
    }
  }

  async function handleToggleTask(task: TetherTask) {
    if (!data) return
    const isComplete = !!task.completedBy

    // Optimistic update
    setData((d) => {
      if (!d) return d
      return {
        ...d,
        tasks: d.tasks.map((t) =>
          t.id === task.id
            ? { ...t, completedBy: isComplete ? null : data.partnerRole, completedAt: isComplete ? null : new Date().toISOString() }
            : t
        ),
      }
    })

    await fetch(`/api/tether/task/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        isComplete
          ? { uncomplete: true }
          : { completedBy: data.partnerRole }
      ),
    })
    fetchList()
  }

  async function handleDeleteTask(taskId: string) {
    setData((d) => d ? { ...d, tasks: d.tasks.filter((t) => t.id !== taskId) } : d)
    await fetch(`/api/tether/task/${taskId}`, { method: 'DELETE' })
    fetchList()
  }

  // ── Loading / error states ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen gradient-warm-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-sage border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error === 'db') {
    return (
      <div className="min-h-screen gradient-warm-bg flex items-center justify-center py-16">
        <div className="container-custom max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-medium p-10">
            <AlertTriangle className="w-10 h-10 text-warning-amber mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-text-dark mb-3">Database Not Connected</h1>
            <p className="text-warm-gray text-sm">
              This link requires a database to load. Please contact your therapist.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error === 'notfound' || !data) {
    return (
      <div className="min-h-screen gradient-warm-bg flex items-center justify-center py-16">
        <div className="container-custom max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-medium p-10">
            <h1 className="font-heading text-2xl font-bold text-text-dark mb-3">Link Not Found</h1>
            <p className="text-warm-gray text-sm">
              This session link may be invalid. Please ask your therapist for a new link.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const myLabel = data.partnerRole === 'PARTNER1' ? data.couple.partner1Label : data.couple.partner2Label
  const partnerLabel = data.partnerRole === 'PARTNER1' ? data.couple.partner2Label : data.couple.partner1Label
  const roleLabel = (role: 'PARTNER1' | 'PARTNER2' | 'THERAPIST' | null) => {
    if (role === data.partnerRole) return 'You'
    if (role === 'PARTNER1') return data.couple.partner1Label
    if (role === 'PARTNER2') return data.couple.partner2Label
    if (role === 'THERAPIST') return 'Therapist'
    return null
  }

  // ── Consent screen ────────────────────────────────────────────────────────

  if (step === 'consent') {
    return (
      <div className="min-h-screen gradient-warm-bg py-12">
        <div className="container-custom max-w-xl">
          <div className="bg-white rounded-2xl shadow-medium p-8 md:p-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-sage/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-primary-sage" />
              </div>
              <div>
                <h1 className="font-heading text-xl font-bold text-text-dark">AI Tool Consent</h1>
                <p className="text-sm text-warm-gray">Read before entering</p>
              </div>
            </div>

            <p className="text-sm text-text-dark mb-5">
              Welcome to <strong>{data.list.name}</strong>. Before you begin, please read the
              following about how Tethered Together uses AI to support your session.
            </p>

            <div className="bg-warm-cream rounded-xl p-5 space-y-4 text-sm mb-6">
              <ConsentPoint
                title="AI Actively Participates"
                body="Tethered Together uses AI to respond to what you write, ask reflective questions, and offer observations. AI feedback appears in real-time as both partners contribute."
              />
              <ConsentPoint
                title="AI Has Limits"
                body="AI responses are generated and may not be accurate for your specific situation. AI is not licensed to diagnose, treat, or counsel. It can be wrong."
              />
              <ConsentPoint
                title="Not a Replacement for Therapy"
                body="This tool supports the work you do with your therapist — it does not replace clinical sessions. Your therapist oversees and may review all session content."
              />
              <ConsentPoint
                title="Both Partners See Everything"
                body={`Everything you add to a list is visible to ${partnerLabel}. Your therapist can also see all lists and contributions.`}
              />
              <ConsentPoint
                title="Your Therapist Monitors Engagement"
                body="Your therapist can see who added tasks, who completed them, and when. This helps them understand how you&apos;re both participating between sessions."
              />
              <ConsentPoint
                title="Not for Crisis"
                body="If you or your partner are in crisis, call 988 (Suicide &amp; Crisis Lifeline) or 911. Do not use this tool in an emergency."
              />
              <ConsentPoint
                title="Early Development"
                body="Tethered Together is actively being built. Features may change. Your feedback shapes this tool."
              />
            </div>

            <label className="flex items-start space-x-3 cursor-pointer mb-6">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    consentChecked ? 'bg-primary-sage border-primary-sage' : 'border-warm-gray/40 bg-white'
                  }`}
                >
                  {consentChecked && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm text-text-dark leading-relaxed">
                I understand that Tethered Together uses AI assistance and that this is not
                a substitute for therapy. I consent to participate in this shared session space.
              </span>
            </label>

            <button
              onClick={handleConsent}
              disabled={!consentChecked}
              className="btn btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              I Understand — Enter Session
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Session / Task List ───────────────────────────────────────────────────

  const completedCount = data.tasks.filter((t) => !!t.completedBy).length

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Session bar */}
      <div className="bg-white border-b border-warm-gray/10 py-3 px-4 sticky top-0 z-10">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
            <span className="text-xs text-warm-gray">
              {myLabel}
            </span>
          </div>
          <span className="font-heading text-sm font-semibold text-text-dark truncate mx-4">
            {data.list.name}
          </span>
          <button
            onClick={fetchList}
            className="flex items-center space-x-1 text-xs text-warm-gray hover:text-primary-sage transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="container-custom max-w-xl py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-text-dark">{data.list.name}</h1>
          <p className="text-sm text-warm-gray mt-1">
            Shared with {partnerLabel} · {completedCount}/{data.tasks.length} completed
          </p>
        </div>

        {/* Add task */}
        <div className="bg-white rounded-2xl shadow-soft p-5 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              className="input flex-1"
              placeholder="Add a task for both of you…"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !addingTask && handleAddTask()}
            />
            <button
              onClick={handleAddTask}
              disabled={!newTaskText.trim() || addingTask}
              className="btn btn-primary disabled:opacity-40 flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

        {/* Task list */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-6">
          {data.tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-warm-gray/60 text-sm">
                No tasks yet. Add the first one above.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-warm-gray/8">
              {data.tasks.map((task) => {
                const isComplete = !!task.completedBy
                const isMine = task.addedBy === data.partnerRole

                return (
                  <li key={task.id} className="flex items-start space-x-3 p-4 hover:bg-warm-cream/40 transition-colors">
                    <button
                      onClick={() => handleToggleTask(task)}
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isComplete
                          ? 'bg-success-green border-success-green'
                          : 'border-warm-gray/30 hover:border-primary-sage'
                      }`}
                    >
                      {isComplete && <Check className="w-3 h-3 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${isComplete ? 'line-through text-warm-gray/40' : 'text-text-dark'}`}>
                        {task.text}
                      </p>
                      <p className="text-xs text-warm-gray/60 mt-0.5">
                        {isMine ? 'Added by you' : `Added by ${partnerLabel}`}
                        {isComplete && task.completedBy && (
                          <> · <span className="text-success-green">Done by {roleLabel(task.completedBy)}</span></>
                        )}
                      </p>
                    </div>

                    {isMine && (
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="shrink-0 text-warm-gray/30 hover:text-alert-red transition-colors mt-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <p className="text-center text-xs text-warm-gray/40">
          A Lennox Fields Clinical Tool ·{' '}
          <Link href="/tethered-together" className="hover:text-primary-sage transition-colors">
            Tethered Together
          </Link>
        </p>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

function ConsentPoint({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="font-semibold text-text-dark text-sm">{title}</p>
      <p className="text-warm-gray mt-0.5" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}
