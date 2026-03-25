'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Copy, Check, Plus, AlertTriangle, RefreshCw, Trash2, Users } from 'lucide-react'

// ── Types ───────────────────────────────────────────────────────────────────

interface TetherTask {
  id: string
  text: string
  addedBy: 'PARTNER1' | 'PARTNER2' | 'THERAPIST'
  completedBy: 'PARTNER1' | 'PARTNER2' | null
  completedAt: string | null
  createdAt: string
}

interface TetherList {
  id: string
  name: string
  date: string
  partner1Token: string
  partner2Token: string
  createdAt: string
  tasks: TetherTask[]
}

interface TetherCouple {
  id: string
  partner1Label: string
  partner2Label: string
  createdAt: string
  lists: TetherList[]
}

// ── Component ───────────────────────────────────────────────────────────────

export default function TherapistDashboard() {
  const params = useParams()
  const token = params?.token as string

  const [couple, setCouple] = useState<TetherCouple | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newListName, setNewListName] = useState('')
  const [creatingList, setCreatingList] = useState(false)
  const [showNewList, setShowNewList] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const fetchCouple = useCallback(async () => {
    try {
      const res = await fetch(`/api/tether/couple/${token}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error === 'DB_UNAVAILABLE'
          ? 'db'
          : data.error === 'NOT_FOUND'
          ? 'notfound'
          : 'unknown')
        return
      }
      setCouple(data.couple)
    } catch {
      setError('unknown')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchCouple()
  }, [fetchCouple])

  async function handleCreateList() {
    if (!newListName.trim()) return
    setCreatingList(true)
    try {
      const res = await fetch('/api/tether/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupleToken: token, name: newListName.trim() }),
      })
      if (res.ok) {
        setNewListName('')
        setShowNewList(false)
        fetchCouple()
      }
    } finally {
      setCreatingList(false)
    }
  }

  async function copyLink(text: string, id: string) {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  // ── Error states ──────────────────────────────────────────────────────────

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
        <div className="container-custom max-w-lg text-center">
          <div className="bg-white rounded-2xl shadow-medium p-10">
            <AlertTriangle className="w-10 h-10 text-warning-amber mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-text-dark mb-3">
              Database Setup Required
            </h1>
            <p className="text-warm-gray mb-6 text-sm leading-relaxed">
              Tethered Together needs a PostgreSQL database to store sessions.
              Add <code className="bg-warm-cream px-1.5 py-0.5 rounded text-xs">DATABASE_URL</code> to
              your Vercel environment variables, then run{' '}
              <code className="bg-warm-cream px-1.5 py-0.5 rounded text-xs">prisma db push</code> to
              create the tables.
            </p>
            <Link href="/tethered-together" className="btn btn-primary">
              Back to Tethered Together
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (error === 'notfound' || !couple) {
    return (
      <div className="min-h-screen gradient-warm-bg flex items-center justify-center py-16">
        <div className="container-custom max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-medium p-10">
            <h1 className="font-heading text-2xl font-bold text-text-dark mb-3">Session Not Found</h1>
            <p className="text-warm-gray mb-6">This therapist link may be invalid or expired.</p>
            <Link href="/tethered-together/new" className="btn btn-primary">Create New Session</Link>
          </div>
        </div>
      </div>
    )
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  // ── Dashboard ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Header bar */}
      <div className="bg-white border-b border-warm-gray/10 py-3 px-4 sticky top-0 z-10">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-primary-sage" />
            <span className="font-heading text-sm font-semibold text-text-dark">
              {couple.partner1Label} &amp; {couple.partner2Label}
            </span>
          </div>
          <span className="font-heading text-sm font-semibold text-primary-sage">Tethered Together</span>
          <button
            onClick={fetchCouple}
            className="flex items-center space-x-1.5 text-xs text-warm-gray hover:text-primary-sage transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="container-custom max-w-3xl py-10">
        {/* Page title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">Therapist Dashboard</p>
            <h1 className="font-heading text-3xl font-bold text-text-dark">
              {couple.partner1Label} &amp; {couple.partner2Label}
            </h1>
            <p className="text-sm text-warm-gray mt-1">
              Session started{' '}
              {new Date(couple.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          </div>
          <button
            onClick={() => setShowNewList((v) => !v)}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New List</span>
          </button>
        </div>

        {/* New list form */}
        {showNewList && (
          <div className="bg-white rounded-2xl shadow-soft p-6 mb-6 border border-primary-sage/10">
            <h2 className="font-heading text-lg font-semibold text-text-dark mb-4">
              Create a New List
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                className="input flex-1"
                placeholder="e.g., Wednesday's Check-In  or  Week 3 Goals"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
                autoFocus
              />
              <button
                onClick={handleCreateList}
                disabled={!newListName.trim() || creatingList}
                className="btn btn-primary disabled:opacity-40"
              >
                {creatingList ? 'Creating…' : 'Create'}
              </button>
              <button
                onClick={() => setShowNewList(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {couple.lists.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
            <div className="w-14 h-14 rounded-full bg-primary-sage/10 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-primary-sage" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-text-dark mb-2">
              No lists yet
            </h2>
            <p className="text-warm-gray text-sm mb-6">
              Create your first list to share tasks with {couple.partner1Label} and {couple.partner2Label}.
            </p>
            <button onClick={() => setShowNewList(true)} className="btn btn-primary">
              Create First List
            </button>
          </div>
        )}

        {/* Lists */}
        <div className="space-y-6">
          {couple.lists.map((list) => {
            const p1Tasks = list.tasks.filter((t) => t.addedBy === 'PARTNER1').length
            const p2Tasks = list.tasks.filter((t) => t.addedBy === 'PARTNER2').length
            const p1Done = list.tasks.filter((t) => t.completedBy === 'PARTNER1').length
            const p2Done = list.tasks.filter((t) => t.completedBy === 'PARTNER2').length

            return (
              <div key={list.id} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                {/* List header */}
                <div className="px-6 py-4 border-b border-warm-gray/10 flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-text-dark">{list.name}</h2>
                    <p className="text-xs text-warm-gray mt-0.5">
                      Created{' '}
                      {new Date(list.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                      {' · '}
                      {list.tasks.length} task{list.tasks.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {/* Contribution summary */}
                  <div className="hidden sm:flex items-center space-x-4 text-xs text-warm-gray">
                    <span>
                      <span className="font-medium text-text-dark">{couple.partner1Label}:</span>{' '}
                      {p1Tasks} added · {p1Done} completed
                    </span>
                    <span>
                      <span className="font-medium text-text-dark">{couple.partner2Label}:</span>{' '}
                      {p2Tasks} added · {p2Done} completed
                    </span>
                  </div>
                </div>

                {/* Partner links */}
                <div className="px-6 py-4 bg-warm-cream/60 border-b border-warm-gray/10 grid sm:grid-cols-2 gap-3">
                  <PartnerLinkBox
                    label={`${couple.partner1Label}'s Link`}
                    url={`${origin}/tethered-together/list/${list.partner1Token}`}
                    copyId={`p1-${list.id}`}
                    copied={copied}
                    onCopy={copyLink}
                  />
                  <PartnerLinkBox
                    label={`${couple.partner2Label}'s Link`}
                    url={`${origin}/tethered-together/list/${list.partner2Token}`}
                    copyId={`p2-${list.id}`}
                    copied={copied}
                    onCopy={copyLink}
                  />
                </div>

                {/* Tasks */}
                <div className="px-6 py-4">
                  {list.tasks.length === 0 ? (
                    <p className="text-sm text-warm-gray/60 italic py-2">
                      No tasks yet — partners add tasks via their links.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {list.tasks.map((task) => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          p1Label={couple.partner1Label}
                          p2Label={couple.partner2Label}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-warm-gray/40 mt-12">
          Therapist view · <Link href="/tethered-together" className="hover:text-primary-sage transition-colors">Tethered Together</Link>
        </p>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

function PartnerLinkBox({
  label, url, copyId, copied, onCopy,
}: {
  label: string
  url: string
  copyId: string
  copied: string | null
  onCopy: (url: string, id: string) => void
}) {
  return (
    <div className="bg-white rounded-xl p-3 border border-warm-gray/15">
      <p className="text-xs font-medium text-warm-gray mb-1.5">{label}</p>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-text-dark font-mono truncate flex-1 select-all">
          {url}
        </span>
        <button
          onClick={() => onCopy(url, copyId)}
          className="shrink-0 flex items-center space-x-1 text-xs text-primary-sage hover:text-earth-green transition-colors"
        >
          {copied === copyId ? (
            <><Check className="w-3.5 h-3.5" /><span>Copied</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
          )}
        </button>
      </div>
    </div>
  )
}

function TaskRow({
  task, p1Label, p2Label,
}: {
  task: TetherTask
  p1Label: string
  p2Label: string
}) {
  const roleLabel = (role: 'PARTNER1' | 'PARTNER2' | 'THERAPIST' | null) => {
    if (role === 'PARTNER1') return p1Label
    if (role === 'PARTNER2') return p2Label
    if (role === 'THERAPIST') return 'Therapist'
    return null
  }

  const isComplete = !!task.completedBy

  return (
    <li className="flex items-start space-x-3 py-1.5">
      <div
        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
          isComplete
            ? 'bg-success-green border-success-green'
            : 'border-warm-gray/30'
        }`}
      >
        {isComplete && <Check className="w-2.5 h-2.5 text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${isComplete ? 'line-through text-warm-gray/50' : 'text-text-dark'}`}>
          {task.text}
        </p>
        <p className="text-xs text-warm-gray/60 mt-0.5">
          Added by {roleLabel(task.addedBy)}
          {isComplete && task.completedBy && (
            <> · <span className="text-success-green">Completed by {roleLabel(task.completedBy)}</span></>
          )}
        </p>
      </div>
      <Trash2 className="w-3.5 h-3.5 text-warm-gray/30 shrink-0 mt-0.5" />
    </li>
  )
}
