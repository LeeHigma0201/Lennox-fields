'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, ArrowLeft, Copy, Check } from 'lucide-react'

const templates = [
  {
    id: 'soap',
    name: 'SOAP Note',
    description: 'Subjective, Objective, Assessment, Plan — the standard medical documentation format.',
    sections: [
      { label: 'S — Subjective', placeholder: 'Client reported... Client stated... Client described...' },
      { label: 'O — Objective', placeholder: 'Client appeared... Affect was... Behavior observed...' },
      { label: 'A — Assessment', placeholder: 'Clinical impressions... Progress toward goals... Risk assessment...' },
      { label: 'P — Plan', placeholder: 'Continue... Modify... Assign... Next session focus...' },
    ],
  },
  {
    id: 'dap',
    name: 'DAP Note',
    description: 'Data, Assessment, Plan — a streamlined format combining subjective and objective into one section.',
    sections: [
      { label: 'D — Data', placeholder: 'Client presented with... Discussed... Interventions included...' },
      { label: 'A — Assessment', placeholder: 'Client is making progress toward... Barriers include... Clinical impression...' },
      { label: 'P — Plan', placeholder: 'Next session will focus on... Homework assigned... Follow-up...' },
    ],
  },
  {
    id: 'birp',
    name: 'BIRP Note',
    description: 'Behavior, Intervention, Response, Plan — focuses on what was done in session and client response.',
    sections: [
      { label: 'B — Behavior', placeholder: 'Client exhibited... Presenting concern today was...' },
      { label: 'I — Intervention', placeholder: 'Therapist utilized... Techniques included... Psychoeducation on...' },
      { label: 'R — Response', placeholder: 'Client responded by... Client demonstrated... Client verbalized...' },
      { label: 'P — Plan', placeholder: 'Continue treatment... Modify approach... Schedule follow-up...' },
    ],
  },
]

export default function NotesTemplatesPage() {
  const [activeTemplate, setActiveTemplate] = useState(templates[0])
  const [fields, setFields] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  const updateField = (label: string, value: string) => {
    setFields(prev => ({ ...prev, [`${activeTemplate.id}-${label}`]: value }))
  }

  const getField = (label: string) => {
    return fields[`${activeTemplate.id}-${label}`] || ''
  }

  const copyToClipboard = () => {
    const text = activeTemplate.sections
      .map(s => `${s.label}\n${getField(s.label) || '[Not completed]'}`)
      .join('\n\n')
    const full = `${activeTemplate.name}\nDate: ${new Date().toLocaleDateString()}\n\n${text}`
    navigator.clipboard.writeText(full)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            <div className="bg-primary-sage p-4 rounded-lg">
              <FileText className="w-12 h-12 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
              Progress Notes Templates
            </h1>
          </div>
          <p className="text-xl text-text-dark max-w-3xl">
            SOAP, DAP, and BIRP note templates for efficient clinical documentation.
            Fill in your notes and copy to your EHR. Nothing is stored on any server.
          </p>
        </div>
      </section>

      {/* Template Selector */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {/* Tab Bar */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTemplate(t)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTemplate.id === t.id
                    ? 'bg-primary-sage text-white'
                    : 'bg-cream text-text-dark hover:bg-primary-sage/10'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Template */}
          <div className="card p-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-text-dark">{activeTemplate.name}</h2>
              <button
                onClick={copyToClipboard}
                className="btn btn-outline text-sm inline-flex items-center"
              >
                {copied ? (
                  <><Check className="w-4 h-4 mr-1" aria-hidden="true" /> Copied</>
                ) : (
                  <><Copy className="w-4 h-4 mr-1" aria-hidden="true" /> Copy Note</>
                )}
              </button>
            </div>
            <p className="text-warm-gray mb-8">{activeTemplate.description}</p>

            <div className="space-y-6">
              {activeTemplate.sections.map((section) => (
                <div key={section.label}>
                  <label className="label text-base">{section.label}</label>
                  <textarea
                    className="input w-full"
                    rows={4}
                    placeholder={section.placeholder}
                    value={getField(section.label)}
                    onChange={(e) => updateField(section.label, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-warm-gray mt-4">
            Do not enter Protected Health Information (PHI) into this tool. Use client initials only.
            All data stays in your browser and is never transmitted.
          </p>
        </div>
      </section>
    </div>
  )
}
