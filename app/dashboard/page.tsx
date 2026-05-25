'use client'

import { useState } from 'react'
import { Send, Inbox, CreditCard, Link2, CheckCircle2, AlertCircle } from 'lucide-react'

// Therapist dashboard SHELL. Route is gated by middleware (sign-in required).
// The "send a tool" form posts to /api/assignments/create and the responses
// list reads from the DB — both go live once Jason provisions DATABASE_URL.

const SENDABLE_TOOLS = [
  { value: 'cbt-thought-record', label: 'CBT Thought Record' },
  { value: 'phq-9', label: 'PHQ-9 (Depression screening)' },
  { value: 'gad-7', label: 'GAD-7 (Anxiety screening)' },
  { value: 'pcl-5', label: 'PCL-5 (PTSD screening)' },
  { value: 'safety-planning', label: 'Safety Plan' },
  { value: 'breathing-exercises', label: 'Breathing Exercise' },
]

export default function DashboardPage() {
  const [form, setForm] = useState({ tool: SENDABLE_TOOLS[0].value, clientName: '', clientEmail: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [result, setResult] = useState<{ link?: string; error?: string }>({})

  async function sendTool(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setResult({})
    try {
      const res = await fetch('/api/assignments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ? JSON.stringify(data.error) : 'Request failed')
      setResult({ link: data.link })
      setStatus('sent')
    } catch (err) {
      setResult({ error: err instanceof Error ? err.message : 'Something went wrong' })
      setStatus('error')
    }
  }

  async function manageBilling() {
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data?.url) window.location.href = data.url
    } catch {
      /* portal unavailable until Stripe is configured */
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FAF9F7 0%, #f5ede8 100%)' }}>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-dark">Your dashboard</h1>
              <p className="text-warm-gray mt-2">Send tools to clients and review what comes back before each session.</p>
            </div>
            <button
              onClick={manageBilling}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:shadow-soft"
              style={{ borderColor: '#75856f60', color: '#75856f' }}
            >
              <CreditCard className="w-4 h-4" /> Manage billing
            </button>
          </div>

          {/* Send a tool */}
          <section className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Send className="w-5 h-5" style={{ color: '#75856f' }} />
              <h2 className="font-heading text-xl font-semibold text-text-dark">Send a tool to a client</h2>
            </div>
            <form onSubmit={sendTool} className="grid sm:grid-cols-2 gap-4">
              <label className="text-sm">
                <span className="block mb-1 text-warm-gray">Tool</span>
                <select
                  value={form.tool}
                  onChange={(e) => setForm({ ...form, tool: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2"
                  style={{ borderColor: '#75856f40' }}
                >
                  {SENDABLE_TOOLS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="block mb-1 text-warm-gray">Client first name</span>
                <input
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: '#75856f40' }}
                  placeholder="Alex"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="block mb-1 text-warm-gray">Client email</span>
                <input
                  required
                  type="email"
                  value={form.clientEmail}
                  onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: '#75856f40' }}
                  placeholder="alex@example.com"
                />
              </label>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all hover:shadow-lg disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #75856f 0%, #6B8E4E 100%)' }}
                >
                  <Send className="w-4 h-4" /> {status === 'sending' ? 'Sending…' : 'Send private link'}
                </button>
              </div>
            </form>

            {status === 'sent' && result.link && (
              <div className="mt-5 flex items-start gap-2 p-4 rounded-xl text-sm" style={{ background: '#6B8E4E12' }}>
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6B8E4E' }} />
                <div>
                  <p className="text-text-dark font-medium">Link created and emailed to your client.</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-warm-gray break-all">
                    <Link2 className="w-3.5 h-3.5 flex-shrink-0" /> {result.link}
                  </p>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-5 flex items-start gap-2 p-4 rounded-xl text-sm" style={{ background: '#C0919115' }}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C09191' }} />
                <div className="text-warm-gray">
                  <p className="text-text-dark font-medium">Couldn&apos;t send yet.</p>
                  <p className="mt-1">This goes live once the database and email are connected. ({result.error})</p>
                </div>
              </div>
            )}
          </section>

          {/* Client responses */}
          <section className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Inbox className="w-5 h-5" style={{ color: '#75856f' }} />
              <h2 className="font-heading text-xl font-semibold text-text-dark">Client responses</h2>
            </div>
            <div className="text-center py-12 px-6 rounded-xl" style={{ background: '#FAF9F7' }}>
              <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30" style={{ color: '#75856f' }} />
              <p className="text-warm-gray max-w-md mx-auto">
                Completed tools from your clients will appear here, ready to review before your next session.
                This activates once your database is connected.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
