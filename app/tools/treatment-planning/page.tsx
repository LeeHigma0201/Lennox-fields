'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Save,
  Download,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
} from 'lucide-react'
import jsPDF from 'jspdf'

// DSM-5 Common Diagnoses Database
const DSM5_DIAGNOSES = [
  {
    id: 'mdd',
    code: 'F32-F33',
    name: 'Major Depressive Disorder',
    categories: ['Mood Disorders'],
  },
  {
    id: 'gad',
    code: 'F41.1',
    name: 'Generalized Anxiety Disorder',
    categories: ['Anxiety Disorders'],
  },
  {
    id: 'panic',
    code: 'F41.0',
    name: 'Panic Disorder',
    categories: ['Anxiety Disorders'],
  },
  {
    id: 'ptsd',
    code: 'F43.10',
    name: 'Post-Traumatic Stress Disorder',
    categories: ['Trauma/Stressor-Related Disorders'],
  },
  {
    id: 'ocd',
    code: 'F42',
    name: 'Obsessive-Compulsive Disorder',
    categories: ['Obsessive-Compulsive Related Disorders'],
  },
  {
    id: 'social-anxiety',
    code: 'F40.10',
    name: 'Social Anxiety Disorder',
    categories: ['Anxiety Disorders'],
  },
  {
    id: 'specific-phobia',
    code: 'F40.2',
    name: 'Specific Phobia',
    categories: ['Anxiety Disorders'],
  },
  {
    id: 'agoraphobia',
    code: 'F40.0',
    name: 'Agoraphobia',
    categories: ['Anxiety Disorders'],
  },
  {
    id: 'adjustment',
    code: 'F43.2',
    name: 'Adjustment Disorder',
    categories: ['Trauma/Stressor-Related Disorders'],
  },
  {
    id: 'bipolar1',
    code: 'F31',
    name: 'Bipolar I Disorder',
    categories: ['Bipolar and Related Disorders'],
  },
  {
    id: 'bipolar2',
    code: 'F31.81',
    name: 'Bipolar II Disorder',
    categories: ['Bipolar and Related Disorders'],
  },
  {
    id: 'cyclothymia',
    code: 'F34.0',
    name: 'Cyclothymia',
    categories: ['Bipolar and Related Disorders'],
  },
  {
    id: 'sus-use',
    code: 'F1x.20-F1x.99',
    name: 'Substance Use Disorder',
    categories: ['Substance-Related and Addictive Disorders'],
  },
  {
    id: 'alcohol-use',
    code: 'F10.20-F10.99',
    name: 'Alcohol Use Disorder',
    categories: ['Substance-Related and Addictive Disorders'],
  },
  {
    id: 'sleep',
    code: 'G47',
    name: 'Sleep-Wake Disorder',
    categories: ['Sleep-Wake Disorders'],
  },
  {
    id: 'adhd',
    code: 'F90',
    name: 'ADHD',
    categories: ['Neurodevelopmental Disorders'],
  },
  {
    id: 'autism',
    code: 'F84.0',
    name: 'Autism Spectrum Disorder',
    categories: ['Neurodevelopmental Disorders'],
  },
  {
    id: 'bpd',
    code: 'F60.3',
    name: 'Borderline Personality Disorder',
    categories: ['Personality Disorders'],
  },
  {
    id: 'eating',
    code: 'F50',
    name: 'Eating Disorder',
    categories: ['Feeding and Eating Disorders'],
  },
  {
    id: 'grief',
    code: 'F43.89',
    name: 'Persistent Complex Bereavement Disorder',
    categories: ['Trauma/Stressor-Related Disorders'],
  },
]

// Intervention Modalities
const INTERVENTION_MODALITIES = [
  { id: 'cbt', name: 'Cognitive Behavioral Therapy (CBT)', color: 'bg-blue-100 text-blue-800' },
  { id: 'dbt', name: 'Dialectical Behavior Therapy (DBT)', color: 'bg-purple-100 text-purple-800' },
  { id: 'act', name: 'Acceptance & Commitment Therapy (ACT)', color: 'bg-green-100 text-green-800' },
  { id: 'mi', name: 'Motivational Interviewing (MI)', color: 'bg-orange-100 text-orange-800' },
  { id: 'emdr', name: 'Eye Movement Desensitization & Reprocessing (EMDR)', color: 'bg-red-100 text-red-800' },
  { id: 'psychodynamic', name: 'Psychodynamic Therapy', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'humanistic', name: 'Humanistic/Person-Centered', color: 'bg-pink-100 text-pink-800' },
  { id: 'existential', name: 'Existential Therapy', color: 'bg-amber-100 text-amber-800' },
  { id: 'narrative', name: 'Narrative Therapy', color: 'bg-cyan-100 text-cyan-800' },
  { id: 'solution-focused', name: 'Solution-Focused Brief Therapy', color: 'bg-teal-100 text-teal-800' },
  { id: 'systemic', name: 'Systemic/Family Therapy', color: 'bg-fuchsia-100 text-fuchsia-800' },
  { id: 'interpersonal', name: 'Interpersonal Therapy (IPT)', color: 'bg-lime-100 text-lime-800' },
  { id: 'psychoeducation', name: 'Psychoeducation', color: 'bg-slate-100 text-slate-800' },
  { id: 'behavioral', name: 'Behavioral Activation', color: 'bg-emerald-100 text-emerald-800' },
]

interface ClientInfo {
  name: string
  age: number
  mrn: string
  date: string
}

interface Goal {
  id: string
  description: string
  smart: {
    specific: string
    measurable: string
    achievable: string
    relevant: string
    timeBound: string
  }
  targetDate: string
  objectives: Objective[]
}

interface Objective {
  id: string
  description: string
  interventions: Intervention[]
  targetDate: string
  status: 'not_started' | 'in_progress' | 'completed'
  progress: number
}

interface Intervention {
  id: string
  type: string
  description: string
  frequency: string
}

interface TreatmentPlan {
  id: string
  clientInfo: ClientInfo
  presentingProblems: string
  diagnoses: string[]
  goals: Goal[]
  reviewSchedule: string
  clinicianNotes: string
  createdDate: string
  lastUpdated: string
}

interface Disclaimer {
  accepted: boolean
}

export default function TreatmentPlanningTool() {
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan>({
    id: '',
    clientInfo: {
      name: '',
      age: 0,
      mrn: '',
      date: new Date().toISOString().split('T')[0],
    },
    presentingProblems: '',
    diagnoses: [],
    goals: [],
    reviewSchedule: 'monthly',
    clinicianNotes: '',
    createdDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
  })

  const [currentStep, setCurrentStep] = useState<
    'disclaimer' | 'client' | 'assessment' | 'goals' | 'objectives' | 'review'
  >('disclaimer')
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Goal>>({})
  const [saveMessage, setSaveMessage] = useState('')
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('treatmentPlan')
    if (savedPlan) {
      try {
        setTreatmentPlan(JSON.parse(savedPlan))
        setCurrentStep('client')
      } catch (e) {
        console.error('Failed to load saved plan')
      }
    } else {
      setTreatmentPlan((prev) => ({
        ...prev,
        id: Date.now().toString(),
      }))
    }
  }, [])

  // Save to localStorage
  const savePlan = () => {
    localStorage.setItem('treatmentPlan', JSON.stringify(treatmentPlan))
    setSaveMessage('Plan saved successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  // Update client info
  const updateClientInfo = (updates: Partial<ClientInfo>) => {
    setTreatmentPlan((prev) => ({
      ...prev,
      clientInfo: { ...prev.clientInfo, ...updates },
      lastUpdated: new Date().toISOString().split('T')[0],
    }))
  }

  // Add or update diagnosis
  const toggleDiagnosis = (diagnosisId: string) => {
    setTreatmentPlan((prev) => {
      const newDiagnoses = prev.diagnoses.includes(diagnosisId)
        ? prev.diagnoses.filter((id) => id !== diagnosisId)
        : [...prev.diagnoses, diagnosisId]
      return {
        ...prev,
        diagnoses: newDiagnoses,
        lastUpdated: new Date().toISOString().split('T')[0],
      }
    })
  }

  // Add or update goal
  const saveGoal = () => {
    if (!formData.description || !formData.smart?.specific) {
      alert('Please fill in all SMART criteria')
      return
    }

    setTreatmentPlan((prev) => {
      let newGoals = [...prev.goals]
      if (editingGoalId) {
        newGoals = newGoals.map((g) =>
          g.id === editingGoalId
            ? {
                ...formData,
                id: editingGoalId,
                objectives: formData.objectives || [],
              } as Goal
            : g
        )
      } else {
        const newGoal: Goal = {
          id: Date.now().toString(),
          description: formData.description || '',
          smart: formData.smart || {
            specific: '',
            measurable: '',
            achievable: '',
            relevant: '',
            timeBound: '',
          },
          targetDate: formData.targetDate || '',
          objectives: formData.objectives || [],
        }
        newGoals.push(newGoal)
      }
      return {
        ...prev,
        goals: newGoals,
        lastUpdated: new Date().toISOString().split('T')[0],
      }
    })
    setShowForm(false)
    setEditingGoalId(null)
    setFormData({})
  }

  // Delete goal
  const deleteGoal = (id: string) => {
    if (confirm('Delete this goal and its objectives?')) {
      setTreatmentPlan((prev) => ({
        ...prev,
        goals: prev.goals.filter((g) => g.id !== id),
        lastUpdated: new Date().toISOString().split('T')[0],
      }))
    }
  }

  // Add objective to goal
  const addObjective = (goalId: string) => {
    const newObjective: Objective = {
      id: Date.now().toString(),
      description: '',
      interventions: [],
      targetDate: '',
      status: 'not_started',
      progress: 0,
    }

    setTreatmentPlan((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === goalId ? { ...g, objectives: [...g.objectives, newObjective] } : g
      ),
      lastUpdated: new Date().toISOString().split('T')[0],
    }))
  }

  // Update objective
  const updateObjective = (goalId: string, objectiveId: string, updates: Partial<Objective>) => {
    setTreatmentPlan((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              objectives: g.objectives.map((o) =>
                o.id === objectiveId ? { ...o, ...updates } : o
              ),
            }
          : g
      ),
      lastUpdated: new Date().toISOString().split('T')[0],
    }))
  }

  // Add intervention to objective
  const addIntervention = (
    goalId: string,
    objectiveId: string,
    interventionType: string
  ) => {
    const newIntervention: Intervention = {
      id: Date.now().toString(),
      type: interventionType,
      description: '',
      frequency: 'weekly',
    }

    setTreatmentPlan((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              objectives: g.objectives.map((o) =>
                o.id === objectiveId
                  ? { ...o, interventions: [...o.interventions, newIntervention] }
                  : o
              ),
            }
          : g
      ),
      lastUpdated: new Date().toISOString().split('T')[0],
    }))
  }

  // Update intervention
  const updateIntervention = (
    goalId: string,
    objectiveId: string,
    interventionId: string,
    updates: Partial<Intervention>
  ) => {
    setTreatmentPlan((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              objectives: g.objectives.map((o) =>
                o.id === objectiveId
                  ? {
                      ...o,
                      interventions: o.interventions.map((i) =>
                        i.id === interventionId ? { ...i, ...updates } : i
                      ),
                    }
                  : o
              ),
            }
          : g
      ),
      lastUpdated: new Date().toISOString().split('T')[0],
    }))
  }

  // Delete intervention
  const deleteIntervention = (goalId: string, objectiveId: string, interventionId: string) => {
    setTreatmentPlan((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              objectives: g.objectives.map((o) =>
                o.id === objectiveId
                  ? {
                      ...o,
                      interventions: o.interventions.filter((i) => i.id !== interventionId),
                    }
                  : o
              ),
            }
          : g
      ),
      lastUpdated: new Date().toISOString().split('T')[0],
    }))
  }

  // Delete objective
  const deleteObjective = (goalId: string, objectiveId: string) => {
    if (confirm('Delete this objective?')) {
      setTreatmentPlan((prev) => ({
        ...prev,
        goals: prev.goals.map((g) =>
          g.id === goalId
            ? { ...g, objectives: g.objectives.filter((o) => o.id !== objectiveId) }
            : g
        ),
        lastUpdated: new Date().toISOString().split('T')[0],
      }))
    }
  }

  // Export to PDF
  const exportToPDF = () => {
    const pdf = new jsPDF()
    let yPosition = 20

    // Header
    pdf.setFontSize(20)
    pdf.text('TREATMENT PLAN', 20, yPosition)
    yPosition += 15

    // Disclaimer
    pdf.setFontSize(9)
    pdf.setTextColor(200, 0, 0)
    pdf.text(
      'CLINICAL JUDGMENT DISCLAIMER: This treatment plan is a clinical tool created by a licensed mental health professional.',
      20,
      yPosition,
      { maxWidth: 170 }
    )
    yPosition += 15
    pdf.setTextColor(0, 0, 0)

    // Client Information
    pdf.setFontSize(12)
    pdf.text('CLIENT INFORMATION', 20, yPosition)
    yPosition += 8
    pdf.setFontSize(10)
    pdf.text(`Name: ${treatmentPlan.clientInfo.name}`, 20, yPosition)
    yPosition += 6
    pdf.text(`Age: ${treatmentPlan.clientInfo.age}`, 20, yPosition)
    yPosition += 6
    pdf.text(`MRN: ${treatmentPlan.clientInfo.mrn}`, 20, yPosition)
    yPosition += 6
    pdf.text(`Plan Date: ${treatmentPlan.clientInfo.date}`, 20, yPosition)
    yPosition += 12

    // Presenting Problems
    pdf.setFontSize(12)
    pdf.text('PRESENTING PROBLEMS/SYMPTOMS', 20, yPosition)
    yPosition += 8
    pdf.setFontSize(10)
    const problemsLines = pdf.splitTextToSize(treatmentPlan.presentingProblems, 170)
    pdf.text(problemsLines, 20, yPosition)
    yPosition += problemsLines.length * 5 + 8

    // Diagnoses
    pdf.setFontSize(12)
    pdf.text('DSM-5 DIAGNOSES', 20, yPosition)
    yPosition += 8
    pdf.setFontSize(10)
    treatmentPlan.diagnoses.forEach((diagId) => {
      const diag = DSM5_DIAGNOSES.find((d) => d.id === diagId)
      if (diag) {
        pdf.text(`• ${diag.name} (${diag.code})`, 20, yPosition)
        yPosition += 6
      }
    })
    yPosition += 4

    // Goals and Objectives
    pdf.setFontSize(12)
    pdf.text('TREATMENT GOALS & OBJECTIVES', 20, yPosition)
    yPosition += 10

    treatmentPlan.goals.forEach((goal, goalIndex) => {
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 20
      }

      pdf.setFontSize(11)
      pdf.text(`Goal ${goalIndex + 1}: ${goal.description}`, 20, yPosition)
      yPosition += 8

      pdf.setFontSize(9)
      pdf.text(`Target Date: ${goal.targetDate}`, 25, yPosition)
      yPosition += 6

      // SMART Details
      pdf.setFontSize(9)
      pdf.text('SMART Criteria:', 25, yPosition)
      yPosition += 5
      pdf.setFontSize(8)
      pdf.text(
        `S: ${goal.smart.specific}`,
        30,
        yPosition,
        { maxWidth: 160 }
      )
      yPosition += 4
      pdf.text(`M: ${goal.smart.measurable}`, 30, yPosition, { maxWidth: 160 })
      yPosition += 4
      pdf.text(`A: ${goal.smart.achievable}`, 30, yPosition, { maxWidth: 160 })
      yPosition += 4
      pdf.text(`R: ${goal.smart.relevant}`, 30, yPosition, { maxWidth: 160 })
      yPosition += 4
      pdf.text(`T: ${goal.smart.timeBound}`, 30, yPosition, { maxWidth: 160 })
      yPosition += 8

      // Objectives
      goal.objectives.forEach((obj, objIndex) => {
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 20
        }

        pdf.setFontSize(9)
        pdf.text(`  Objective ${objIndex + 1}: ${obj.description}`, 25, yPosition)
        yPosition += 6

        // Interventions
        obj.interventions.forEach((intervention) => {
          if (yPosition > 250) {
            pdf.addPage()
            yPosition = 20
          }
          pdf.setFontSize(8)
          pdf.text(
            `    • ${intervention.type}: ${intervention.description} (${intervention.frequency})`,
            30,
            yPosition,
            { maxWidth: 150 }
          )
          yPosition += 5
        })
        yPosition += 3
      })
      yPosition += 5
    })

    // Review Schedule
    if (yPosition > 250) {
      pdf.addPage()
      yPosition = 20
    }
    pdf.setFontSize(12)
    pdf.text('REVIEW SCHEDULE', 20, yPosition)
    yPosition += 8
    pdf.setFontSize(10)
    pdf.text(`Reviews will be conducted: ${treatmentPlan.reviewSchedule}`, 20, yPosition)

    // Save PDF
    pdf.save(
      `Treatment_Plan_${treatmentPlan.clientInfo.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    )
  }

  const newPlan = () => {
    if (confirm('Create a new treatment plan? Current plan will not be saved.')) {
      localStorage.removeItem('treatmentPlan')
      setTreatmentPlan({
        id: Date.now().toString(),
        clientInfo: {
          name: '',
          age: 0,
          mrn: '',
          date: new Date().toISOString().split('T')[0],
        },
        presentingProblems: '',
        diagnoses: [],
        goals: [],
        reviewSchedule: 'monthly',
        clinicianNotes: '',
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
      })
      setCurrentStep('client')
    }
  }

  // Disclaimer Step
  if (currentStep === 'disclaimer') {
    return (
      <div className="min-h-screen gradient-warm-bg py-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-xl shadow-medium p-8">
            <div className="flex items-start mb-6">
              <AlertCircle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h1 className="text-3xl font-bold text-text-dark">Clinical Disclaimer</h1>
                <p className="text-warm-gray mt-2">Important Information About This Tool</p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded mb-6">
              <h2 className="text-lg font-bold text-red-900 mb-3">For Licensed Mental Health Professionals Only</h2>
              <p className="text-red-800 mb-4">
                This Treatment Planning Tool is designed exclusively for use by licensed mental health professionals
                (psychologists, counselors, social workers, psychiatrists, etc.) in clinical practice.
              </p>

              <h3 className="font-bold text-red-900 mb-2">Key Disclaimers:</h3>
              <ul className="list-disc list-inside space-y-2 text-red-800 text-sm">
                <li>
                  <strong>Clinical Judgment Required:</strong> Treatment planning requires comprehensive clinical assessment,
                  diagnostic evaluation, and professional judgment. This tool is an aid, not a replacement for clinical expertise.
                </li>
                <li>
                  <strong>Not a Diagnosis Tool:</strong> DSM-5 diagnosis codes provided here are for reference only. Formal
                  diagnostic assessments must be conducted through proper clinical evaluation.
                </li>
                <li>
                  <strong>Professional Responsibility:</strong> You, as the licensed clinician, are solely responsible for all
                  treatment planning decisions and their clinical appropriateness.
                </li>
                <li>
                  <strong>Confidentiality:</strong> Treatment plans contain sensitive client information. Ensure all data is stored
                  securely and comply with HIPAA and applicable regulations.
                </li>
                <li>
                  <strong>Not Legal Advice:</strong> This tool does not constitute legal advice. Consult with legal counsel
                  regarding compliance with state laws and regulations.
                </li>
                <li>
                  <strong>Limited Liability:</strong> The creators of this tool are not liable for outcomes of treatment plans
                  created with this tool.
                </li>
                <li>
                  <strong>Data Security:</strong> Plans are saved to local browser storage. Back up important plans. This tool
                  is not a secure medical records system.
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-clinical-blue p-6 rounded mb-6">
              <h3 className="font-bold text-text-dark mb-2">Best Practices:</h3>
              <ul className="list-disc list-inside space-y-1 text-text-dark text-sm">
                <li>Always document plans in your official EHR/medical record system</li>
                <li>Obtain client consent before implementing treatment plan</li>
                <li>Review plans regularly and modify as clinically indicated</li>
                <li>Ensure interventions are evidence-based for identified diagnoses</li>
                <li>Document all clinical decisions and rationale</li>
                <li>Follow your licensing board and organizational guidelines</li>
              </ul>
            </div>

            <div className="space-y-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={disclaimerAccepted}
                  onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4"
                />
                <span className="ml-3 text-text-dark">
                  I acknowledge that I am a licensed mental health professional and understand all disclaimers above.
                  I take full responsibility for all treatment planning decisions.
                </span>
              </label>

              <div className="flex gap-4 pt-4">
                <Link
                  href="/tools"
                  className="btn btn-outline"
                >
                  Back to Tools
                </Link>
                <button
                  onClick={() => setCurrentStep('client')}
                  disabled={!disclaimerAccepted}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  I Accept - Proceed to Treatment Planning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-warm-bg py-12">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-text-dark">Treatment Planning Tool</h1>
            <p className="text-warm-gray mt-2">Create evidence-based treatment plans for your clients</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={savePlan}
              className="btn btn-outline inline-flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Plan
            </button>
            {treatmentPlan.goals.length > 0 && (
              <button
                onClick={exportToPDF}
                className="btn btn-primary inline-flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Export PDF
              </button>
            )}
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-800">{saveMessage}</span>
          </div>
        )}

        {/* Clinical Info Banner */}
        <div className="bg-blue-50 border-l-4 border-clinical-blue p-4 rounded mb-8">
          <p className="text-sm text-text-dark">
            <strong>Clinical Note:</strong> All treatment plans require proper client consent and must be documented in
            your official medical records system. This tool aids in planning but does not replace clinical judgment.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'client', label: 'Client Info' },
            { id: 'assessment', label: 'Assessment' },
            { id: 'goals', label: 'Goals' },
            { id: 'objectives', label: 'Objectives & Interventions' },
            { id: 'review', label: 'Review & Export' },
          ].map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id as typeof currentStep)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                currentStep === step.id
                  ? 'bg-primary-sage text-white'
                  : 'bg-white text-text-dark hover:bg-cream'
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>

        {/* Client Information Step */}
        {currentStep === 'client' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-medium p-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">Client Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    value={treatmentPlan.clientInfo.name}
                    onChange={(e) => updateClientInfo({ name: e.target.value })}
                    className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={treatmentPlan.clientInfo.age || ''}
                    onChange={(e) => updateClientInfo({ age: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                    placeholder="Enter age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Medical Record Number (MRN)
                  </label>
                  <input
                    type="text"
                    value={treatmentPlan.clientInfo.mrn}
                    onChange={(e) => updateClientInfo({ mrn: e.target.value })}
                    className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                    placeholder="Optional: Enter MRN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Plan Date
                  </label>
                  <input
                    type="date"
                    value={treatmentPlan.clientInfo.date}
                    onChange={(e) => updateClientInfo({ date: e.target.value })}
                    className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('assessment')}
                className="btn btn-primary"
              >
                Next: Assessment
              </button>
            </div>
          </div>
        )}

        {/* Assessment Step */}
        {currentStep === 'assessment' && (
          <div className="space-y-6">
            {/* Presenting Problems */}
            <div className="bg-white rounded-xl shadow-medium p-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">Presenting Problems/Symptoms</h2>

              <textarea
                value={treatmentPlan.presentingProblems}
                onChange={(e) =>
                  setTreatmentPlan((prev) => ({
                    ...prev,
                    presentingProblems: e.target.value,
                    lastUpdated: new Date().toISOString().split('T')[0],
                  }))
                }
                className="w-full h-32 px-4 py-3 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                placeholder="Describe the client's presenting problems, symptoms, and chief complaints..."
              />
              <p className="text-sm text-warm-gray mt-2">
                Include onset, duration, frequency, and impact on functioning
              </p>
            </div>

            {/* DSM-5 Diagnoses */}
            <div className="bg-white rounded-xl shadow-medium p-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">DSM-5 Diagnosis Selection</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DSM5_DIAGNOSES.map((diagnosis) => (
                  <label key={diagnosis.id} className="flex items-start cursor-pointer p-4 rounded-lg hover:bg-cream">
                    <input
                      type="checkbox"
                      checked={treatmentPlan.diagnoses.includes(diagnosis.id)}
                      onChange={() => toggleDiagnosis(diagnosis.id)}
                      className="mt-1 w-5 h-5"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-text-dark">{diagnosis.name}</p>
                      <p className="text-sm text-warm-gray">{diagnosis.code}</p>
                    </div>
                  </label>
                ))}
              </div>

              <p className="text-sm text-warm-gray mt-4 p-4 bg-blue-50 rounded">
                <strong>Note:</strong> Select all relevant diagnoses. Remember that diagnosis requires comprehensive clinical
                assessment. These codes are for reference only.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('client')}
                className="btn btn-outline"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep('goals')}
                className="btn btn-primary"
              >
                Next: Treatment Goals
              </button>
            </div>
          </div>
        )}

        {/* Goals Step */}
        {currentStep === 'goals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-medium p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-dark">Treatment Goals</h2>
                <button
                  onClick={() => {
                    setShowForm(!showForm)
                    setEditingGoalId(null)
                    setFormData({})
                  }}
                  className="btn btn-primary inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Goal
                </button>
              </div>

              {/* Goal Form */}
              {showForm && (
                <div className="bg-cream rounded-lg p-6 mb-6 border-2 border-clinical-blue">
                  <h3 className="font-bold text-text-dark mb-4">
                    {editingGoalId ? 'Edit Goal' : 'New Treatment Goal'}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">
                        Goal Description
                      </label>
                      <input
                        type="text"
                        value={formData.description || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                        placeholder="e.g., Reduce anxiety symptoms"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={formData.targetDate || ''}
                        onChange={(e) => setFormData((prev) => ({ ...prev, targetDate: e.target.value }))}
                        className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                      />
                    </div>

                    <div className="bg-white p-4 rounded border border-clinical-blue">
                      <h4 className="font-bold text-text-dark mb-3">SMART Criteria</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-1">
                            Specific: What exactly will be achieved?
                          </label>
                          <input
                            type="text"
                            value={formData.smart?.specific || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                smart: { ...(prev.smart || {}), specific: e.target.value } as any,
                              }))
                            }
                            className="w-full px-3 py-2 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                            placeholder="Client will reduce panic attack frequency"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-1">
                            Measurable: How will progress be measured?
                          </label>
                          <input
                            type="text"
                            value={formData.smart?.measurable || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                smart: { ...(prev.smart || {}), measurable: e.target.value } as any,
                              }))
                            }
                            className="w-full px-3 py-2 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                            placeholder="From 4 per week to 1 per week, tracked in daily log"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-1">
                            Achievable: Is this realistic given resources?
                          </label>
                          <input
                            type="text"
                            value={formData.smart?.achievable || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                smart: { ...(prev.smart || {}), achievable: e.target.value } as any,
                              }))
                            }
                            className="w-full px-3 py-2 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                            placeholder="Yes, evidence-based interventions available"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-1">
                            Relevant: Does this align with client priorities?
                          </label>
                          <input
                            type="text"
                            value={formData.smart?.relevant || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                smart: { ...(prev.smart || {}), relevant: e.target.value } as any,
                              }))
                            }
                            className="w-full px-3 py-2 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                            placeholder="Client identified anxiety as primary concern"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-dark mb-1">
                            Time-bound: What is the timeframe?
                          </label>
                          <input
                            type="text"
                            value={formData.smart?.timeBound || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                smart: { ...(prev.smart || {}), timeBound: e.target.value } as any,
                              }))
                            }
                            className="w-full px-3 py-2 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                            placeholder="12 weeks, with progress review every 4 weeks"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={saveGoal}
                        className="btn btn-primary"
                      >
                        {editingGoalId ? 'Update' : 'Save'} Goal
                      </button>
                      <button
                        onClick={() => {
                          setShowForm(false)
                          setEditingGoalId(null)
                          setFormData({})
                        }}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Goals List */}
              <div className="space-y-4">
                {treatmentPlan.goals.length === 0 ? (
                  <p className="text-warm-gray text-center py-8">No goals added yet. Click "Add Goal" to begin.</p>
                ) : (
                  treatmentPlan.goals.map((goal, idx) => (
                    <div key={goal.id} className="border-2 border-warm-gray/20 rounded-lg p-6 hover:bg-cream/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-grow">
                          <h3 className="text-lg font-bold text-text-dark">Goal {idx + 1}: {goal.description}</h3>
                          <p className="text-sm text-warm-gray">Target Date: {goal.targetDate}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingGoalId(goal.id)
                              setFormData(goal)
                              setShowForm(true)
                            }}
                            className="p-2 text-clinical-blue hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded mb-4 text-sm">
                        <p><strong>S:</strong> {goal.smart.specific}</p>
                        <p><strong>M:</strong> {goal.smart.measurable}</p>
                        <p><strong>A:</strong> {goal.smart.achievable}</p>
                        <p><strong>R:</strong> {goal.smart.relevant}</p>
                        <p><strong>T:</strong> {goal.smart.timeBound}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('assessment')}
                className="btn btn-outline"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep('objectives')}
                disabled={treatmentPlan.goals.length === 0}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Objectives & Interventions
              </button>
            </div>
          </div>
        )}

        {/* Objectives & Interventions Step */}
        {currentStep === 'objectives' && (
          <div className="space-y-6">
            {treatmentPlan.goals.map((goal, goalIdx) => (
              <div key={goal.id} className="bg-white rounded-xl shadow-medium p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-text-dark">
                      Goal {goalIdx + 1}: {goal.description}
                    </h2>
                    <p className="text-warm-gray">Target Date: {goal.targetDate}</p>
                  </div>
                  <button
                    onClick={() =>
                      setExpandedGoal(expandedGoal === goal.id ? null : goal.id)
                    }
                    className="p-2 text-clinical-blue hover:bg-blue-50 rounded"
                  >
                    {expandedGoal === goal.id ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {expandedGoal === goal.id && (
                  <div className="space-y-6">
                    {/* Objectives */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-text-dark">Objectives</h3>
                        <button
                          onClick={() => addObjective(goal.id)}
                          className="btn btn-primary inline-flex items-center"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Objective
                        </button>
                      </div>

                      {goal.objectives.length === 0 ? (
                        <p className="text-warm-gray text-center py-4">
                          No objectives added. Click "Add Objective" to create specific, measurable objectives.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {goal.objectives.map((objective, objIdx) => (
                            <div key={objective.id} className="border-2 border-warm-gray/20 rounded-lg p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-grow">
                                  <input
                                    type="text"
                                    value={objective.description}
                                    onChange={(e) =>
                                      updateObjective(goal.id, objective.id, {
                                        description: e.target.value,
                                      })
                                    }
                                    className="text-lg font-medium text-text-dark w-full px-2 py-1 border border-warm-gray/30 rounded focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                                    placeholder={`Objective ${objIdx + 1}`}
                                  />
                                </div>
                                <button
                                  onClick={() => deleteObjective(goal.id, objective.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded ml-2"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-text-dark mb-2">
                                    Target Date
                                  </label>
                                  <input
                                    type="date"
                                    value={objective.targetDate}
                                    onChange={(e) =>
                                      updateObjective(goal.id, objective.id, {
                                        targetDate: e.target.value,
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-text-dark mb-2">
                                    Status
                                  </label>
                                  <select
                                    value={objective.status}
                                    onChange={(e) =>
                                      updateObjective(goal.id, objective.id, {
                                        status: e.target.value as typeof objective.status,
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                                  >
                                    <option value="not_started">Not Started</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-text-dark mb-2">
                                    Progress (%)
                                  </label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={objective.progress}
                                    onChange={(e) =>
                                      updateObjective(goal.id, objective.id, {
                                        progress: parseInt(e.target.value) || 0,
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                                  />
                                </div>
                              </div>

                              {/* Interventions */}
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-bold text-text-dark">Interventions</h4>
                                  <select
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        addIntervention(goal.id, objective.id, e.target.value)
                                        e.target.value = ''
                                      }
                                    }}
                                    defaultValue=""
                                    className="px-3 py-1 border border-warm-gray/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                                  >
                                    <option value="">Select Intervention Type...</option>
                                    {INTERVENTION_MODALITIES.map((mod) => (
                                      <option key={mod.id} value={mod.id}>
                                        {mod.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {objective.interventions.length === 0 ? (
                                  <p className="text-sm text-warm-gray text-center py-2">
                                    No interventions added
                                  </p>
                                ) : (
                                  <div className="space-y-3">
                                    {objective.interventions.map((intervention) => {
                                      const modality = INTERVENTION_MODALITIES.find(
                                        (m) => m.id === intervention.type
                                      )
                                      return (
                                        <div
                                          key={intervention.id}
                                          className={`p-4 rounded-lg ${modality?.color}`}
                                        >
                                          <div className="flex items-start justify-between mb-3">
                                            <h5 className="font-medium">{modality?.name}</h5>
                                            <button
                                              onClick={() =>
                                                deleteIntervention(goal.id, objective.id, intervention.id)
                                              }
                                              className="p-1 hover:opacity-70"
                                            >
                                              <X className="w-4 h-4" />
                                            </button>
                                          </div>

                                          <input
                                            type="text"
                                            value={intervention.description}
                                            onChange={(e) =>
                                              updateIntervention(
                                                goal.id,
                                                objective.id,
                                                intervention.id,
                                                { description: e.target.value }
                                              )
                                            }
                                            className="w-full px-2 py-1 mb-2 bg-white/50 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white"
                                            placeholder="Describe the specific intervention"
                                          />

                                          <select
                                            value={intervention.frequency}
                                            onChange={(e) =>
                                              updateIntervention(
                                                goal.id,
                                                objective.id,
                                                intervention.id,
                                                { frequency: e.target.value }
                                              )
                                            }
                                            className="w-full px-2 py-1 bg-white/50 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white"
                                          >
                                            <option value="once">Once</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="bi-weekly">Bi-weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="daily">Daily (homework)</option>
                                            <option value="as-needed">As-needed</option>
                                          </select>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('goals')}
                className="btn btn-outline"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep('review')}
                className="btn btn-primary"
              >
                Next: Review & Export
              </button>
            </div>
          </div>
        )}

        {/* Review & Export Step */}
        {currentStep === 'review' && (
          <div className="space-y-6">
            {/* Clinician Notes */}
            <div className="bg-white rounded-xl shadow-medium p-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">Clinician Notes & Review Schedule</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Review Schedule Frequency
                  </label>
                  <select
                    value={treatmentPlan.reviewSchedule}
                    onChange={(e) =>
                      setTreatmentPlan((prev) => ({
                        ...prev,
                        reviewSchedule: e.target.value,
                        lastUpdated: new Date().toISOString().split('T')[0],
                      }))
                    }
                    className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="as-needed">As-needed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">
                    Additional Clinician Notes
                  </label>
                  <textarea
                    value={treatmentPlan.clinicianNotes}
                    onChange={(e) =>
                      setTreatmentPlan((prev) => ({
                        ...prev,
                        clinicianNotes: e.target.value,
                        lastUpdated: new Date().toISOString().split('T')[0],
                      }))
                    }
                    className="w-full h-32 px-4 py-3 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-clinical-blue"
                    placeholder="Add any additional clinical considerations, contraindications, or special notes..."
                  />
                </div>
              </div>
            </div>

            {/* Plan Summary */}
            <div className="bg-white rounded-xl shadow-medium p-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">Treatment Plan Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cream p-4 rounded">
                    <p className="text-warm-gray">Client Name</p>
                    <p className="font-bold text-text-dark">{treatmentPlan.clientInfo.name || 'Not entered'}</p>
                  </div>
                  <div className="bg-cream p-4 rounded">
                    <p className="text-warm-gray">Age</p>
                    <p className="font-bold text-text-dark">{treatmentPlan.clientInfo.age || 'Not entered'}</p>
                  </div>
                  <div className="bg-cream p-4 rounded">
                    <p className="text-warm-gray">Number of Goals</p>
                    <p className="font-bold text-text-dark">{treatmentPlan.goals.length}</p>
                  </div>
                  <div className="bg-cream p-4 rounded">
                    <p className="text-warm-gray">Diagnoses</p>
                    <p className="font-bold text-text-dark">{treatmentPlan.diagnoses.length}</p>
                  </div>
                </div>

                <div className="bg-cream p-4 rounded">
                  <p className="text-warm-gray mb-2">Diagnoses Selected:</p>
                  {treatmentPlan.diagnoses.length === 0 ? (
                    <p className="text-text-dark">None selected</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {treatmentPlan.diagnoses.map((diagId) => {
                        const diag = DSM5_DIAGNOSES.find((d) => d.id === diagId)
                        return (
                          <span key={diagId} className="bg-clinical-blue/20 text-clinical-blue px-3 py-1 rounded text-sm">
                            {diag?.name}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-xl shadow-medium p-8">
              <h2 className="text-2xl font-bold text-text-dark mb-6">Export & Documentation</h2>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    savePlan()
                  }}
                  className="w-full btn btn-primary inline-flex items-center justify-center py-3"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Plan to Browser Storage
                </button>

                <button
                  onClick={exportToPDF}
                  disabled={treatmentPlan.goals.length === 0}
                  className="w-full btn btn-primary inline-flex items-center justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export Treatment Plan as PDF
                </button>

                <button
                  onClick={newPlan}
                  className="w-full btn btn-outline inline-flex items-center justify-center py-3"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Plan
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded border-l-4 border-clinical-blue">
                <p className="text-sm text-text-dark">
                  <strong>Important:</strong> This exported PDF should be printed and filed in the client's medical record
                  or imported into your official EHR system. Browser storage is not a secure long-term solution for clinical
                  documentation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('objectives')}
                className="btn btn-outline"
              >
                Back
              </button>
              <Link href="/tools" className="btn btn-outline">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
