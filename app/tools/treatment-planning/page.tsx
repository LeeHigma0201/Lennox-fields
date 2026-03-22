'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ClipboardList, ArrowLeft, Plus, Trash2, Download } from 'lucide-react'

interface Goal {
  id: string
  problem: string
  goal: string
  objectives: string[]
  interventions: string[]
  targetDate: string
}

export default function TreatmentPlanningPage() {
  const [clientInitials, setClientInitials] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', problem: '', goal: '', objectives: [''], interventions: [''], targetDate: '' }
  ])

  const addGoal = () => {
    setGoals([...goals, {
      id: Date.now().toString(),
      problem: '', goal: '', objectives: [''], interventions: [''], targetDate: ''
    }])
  }

  const removeGoal = (id: string) => {
    if (goals.length > 1) setGoals(goals.filter(g => g.id !== id))
  }

  const updateGoal = (id: string, field: keyof Goal, value: string | string[]) => {
    setGoals(goals.map(g => g.id === id ? { ...g, [field]: value } : g))
  }

  const addListItem = (goalId: string, field: 'objectives' | 'interventions') => {
    setGoals(goals.map(g => {
      if (g.id === goalId) return { ...g, [field]: [...g[field], ''] }
      return g
    }))
  }

  const updateListItem = (goalId: string, field: 'objectives' | 'interventions', index: number, value: string) => {
    setGoals(goals.map(g => {
      if (g.id === goalId) {
        const updated = [...g[field]]
        updated[index] = value
        return { ...g, [field]: updated }
      }
      return g
    }))
  }

  const removeListItem = (goalId: string, field: 'objectives' | 'interventions', index: number) => {
    setGoals(goals.map(g => {
      if (g.id === goalId && g[field].length > 1) {
        return { ...g, [field]: g[field].filter((_, i) => i !== index) }
      }
      return g
    }))
  }

  const exportPlan = () => {
    const text = `TREATMENT PLAN
Client: ${clientInitials}
Diagnosis: ${diagnosis}
Date: ${new Date().toLocaleDateString()}

${goals.map((g, i) => `
GOAL ${i + 1}
Problem: ${g.problem}
Goal: ${g.goal}
Target Date: ${g.targetDate}

Objectives:
${g.objectives.map((o, j) => `  ${j + 1}. ${o}`).join('\n')}

Interventions:
${g.interventions.map((int, j) => `  ${j + 1}. ${int}`).join('\n')}
`).join('\n---\n')}
`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `treatment-plan-${clientInitials || 'draft'}-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="flex items-center space-x-2 mb-6">
            <Link href="/professional" className="text-primary-sage hover:text-earth-green transition-colors">
              <ArrowLeft className="w-5 h-5 inline mr-1" aria-hidden="true" />
              Professional
            </Link>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-accent-gold p-4 rounded-lg">
              <ClipboardList className="w-12 h-12 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
              Treatment Plan Generator
            </h1>
          </div>
          <p className="text-xl text-text-dark max-w-3xl">
            Create structured treatment plans with measurable goals, objectives, and interventions.
            Export your plan when finished. All data stays in your browser.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {/* Client Info */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Client Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="initials" className="label">Client Initials</label>
                <input
                  id="initials"
                  type="text"
                  className="input"
                  placeholder="e.g., J.D."
                  value={clientInitials}
                  onChange={(e) => setClientInitials(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="diagnosis" className="label">Primary Diagnosis</label>
                <input
                  id="diagnosis"
                  type="text"
                  className="input"
                  placeholder="e.g., F41.1 Generalized Anxiety Disorder"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Goals */}
          {goals.map((goal, goalIndex) => (
            <div key={goal.id} className="card p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-text-dark">Goal {goalIndex + 1}</h3>
                {goals.length > 1 && (
                  <button onClick={() => removeGoal(goal.id)} className="text-alert-red hover:text-alert-red/80 p-1">
                    <Trash2 className="w-5 h-5" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label">Presenting Problem</label>
                  <textarea
                    className="input w-full"
                    rows={2}
                    placeholder="Describe the problem or concern being addressed..."
                    value={goal.problem}
                    onChange={(e) => updateGoal(goal.id, 'problem', e.target.value)}
                  />
                </div>

                <div>
                  <label className="label">Treatment Goal</label>
                  <textarea
                    className="input w-full"
                    rows={2}
                    placeholder="Client will..."
                    value={goal.goal}
                    onChange={(e) => updateGoal(goal.id, 'goal', e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Target Date</label>
                    <input
                      type="date"
                      className="input w-full"
                      value={goal.targetDate}
                      onChange={(e) => updateGoal(goal.id, 'targetDate', e.target.value)}
                    />
                  </div>
                </div>

                {/* Objectives */}
                <div>
                  <label className="label">Measurable Objectives</label>
                  {goal.objectives.map((obj, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        className="input flex-1"
                        placeholder={`Objective ${i + 1}: Client will...`}
                        value={obj}
                        onChange={(e) => updateListItem(goal.id, 'objectives', i, e.target.value)}
                      />
                      {goal.objectives.length > 1 && (
                        <button onClick={() => removeListItem(goal.id, 'objectives', i)} className="text-alert-red p-2">
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => addListItem(goal.id, 'objectives')} className="text-primary-sage text-sm font-medium hover:text-earth-green">
                    <Plus className="w-4 h-4 inline mr-1" aria-hidden="true" />Add Objective
                  </button>
                </div>

                {/* Interventions */}
                <div>
                  <label className="label">Interventions</label>
                  {goal.interventions.map((int, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        className="input flex-1"
                        placeholder={`Intervention ${i + 1}: Therapist will...`}
                        value={int}
                        onChange={(e) => updateListItem(goal.id, 'interventions', i, e.target.value)}
                      />
                      {goal.interventions.length > 1 && (
                        <button onClick={() => removeListItem(goal.id, 'interventions', i)} className="text-alert-red p-2">
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => addListItem(goal.id, 'interventions')} className="text-primary-sage text-sm font-medium hover:text-earth-green">
                    <Plus className="w-4 h-4 inline mr-1" aria-hidden="true" />Add Intervention
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={addGoal} className="btn btn-outline inline-flex items-center justify-center">
              <Plus className="mr-2 w-5 h-5" aria-hidden="true" />
              Add Another Goal
            </button>
            <button onClick={exportPlan} className="btn btn-primary inline-flex items-center justify-center">
              <Download className="mr-2 w-5 h-5" aria-hidden="true" />
              Export Treatment Plan
            </button>
          </div>

          <p className="text-xs text-warm-gray mt-4">
            All data stays in your browser. Nothing is stored on any server. Do not enter
            Protected Health Information (PHI) — use client initials only.
          </p>
        </div>
      </section>
    </div>
  )
}
