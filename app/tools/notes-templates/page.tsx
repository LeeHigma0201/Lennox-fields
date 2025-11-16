'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Save,
  Download,
  Copy,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Info,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  X,
} from 'lucide-react'
import jsPDF from 'jspdf'
import { format } from 'date-fns'

type NoteFormat = 'soap' | 'dap' | 'birp'
type View = 'selector' | 'editor' | 'samples'

// SOAP Note Structure
interface SOAPNote {
  id: string
  clientName: string
  clinicianName: string
  date: string
  sessionNumber: string
  subjective: {
    presenting: string
    mood: string
    behavior: string
    sleep: string
    appetite: string
    otherInfo: string
  }
  objective: {
    appearance: string
    affect: string
    speech: string
    cognition: string
    orientation: string
    observations: string
  }
  assessment: {
    clinicalObservations: string
    diagnosis: string
    riskFactors: string
    strengths: string
    formulation: string
  }
  plan: {
    treatment: string
    homework: string
    followUp: string
    referrals: string
    medications: string
  }
  createdDate: string
  lastUpdated: string
}

// DAP Note Structure
interface DAPNote {
  id: string
  clientName: string
  clinicianName: string
  date: string
  sessionNumber: string
  data: {
    clientPresentedWith: string
    observedBehavior: string
    clientStatements: string
    environmentalFactors: string
    physicalPresentation: string
  }
  assessment: {
    functioningLevel: string
    progressTowardGoals: string
    therapeuticProgress: string
    clinicalImpressions: string
    risksAndConcerns: string
  }
  plan: {
    nextSteps: string
    clientHasAgreedTo: string
    scheduledFollowUp: string
    referralsNeeded: string
    cliniciansNotes: string
  }
  createdDate: string
  lastUpdated: string
}

// BIRP Note Structure
interface BIRPNote {
  id: string
  clientName: string
  clinicianName: string
  date: string
  sessionNumber: string
  behavior: {
    clientBehaviors: string
    observedInSession: string
    reportedOutsideSession: string
    behavioral_strengths: string
  }
  intervention: {
    approachUsed: string
    skillsTaught: string
    activitiesCompleted: string
    interventionRationale: string
  }
  response: {
    clientResponse: string
    engagementLevel: string
    barriersEncountered: string
    successIndicators: string
  }
  plan: {
    nextSession: string
    homeWork: string
    followUpActions: string
    clientResponsibilities: string
  }
  createdDate: string
  lastUpdated: string
}

type Note = SOAPNote | DAPNote | BIRPNote

// Sample templates for guidance
const SOAP_SAMPLE: SOAPNote = {
  id: 'sample-soap',
  clientName: '[Client Name]',
  clinicianName: '[Your Name]',
  date: format(new Date(), 'yyyy-MM-dd'),
  sessionNumber: '1',
  subjective: {
    presenting:
      'Client reports increasing feelings of anxiety related to work stress. States, "I feel overwhelmed and cannot focus on my tasks."',
    mood: 'Client demonstrates anxious mood with restricted affect. Reports sleep disturbance and difficulty concentrating.',
    behavior: 'Client is fidgety, makes frequent eye contact, and speaks at a rapid pace.',
    sleep: 'Reports sleeping 5-6 hours per night, takes approximately 30 minutes to fall asleep.',
    appetite: 'Appetite has decreased slightly over the past two weeks.',
    otherInfo: 'Client recently received a promotion at work and is struggling with new responsibilities.',
  },
  objective: {
    appearance: 'Client is well-groomed, dressed appropriately. Appears slightly disheveled with dark circles under eyes.',
    affect: 'Anxious, guarded. Affect becomes more animated when discussing stressors.',
    speech: 'Rapid speech rate, pressured at times. Clear and coherent.',
    cognition: 'Alert and oriented to person, place, time, and situation. Cognitive processing appears intact.',
    orientation: 'Oriented x4.',
    observations: 'Client demonstrates physical signs of anxiety including muscle tension and tremor in hands.',
  },
  assessment: {
    clinicalObservations:
      'Client presents with symptoms consistent with anxiety disorder. Functional impairment noted in work and sleep domains.',
    diagnosis: 'Generalized Anxiety Disorder (F41.1); Work-related stress',
    riskFactors: 'History of anxiety in family; recent major life change; inadequate coping strategies',
    strengths:
      'Client demonstrates good insight, motivation for treatment, stable employment, supportive social network',
    formulation:
      'Client appears to be experiencing anxiety related to recent work promotion and increased responsibilities. Current coping strategies are insufficient.',
  },
  plan: {
    treatment:
      'Continue weekly therapy. Begin CBT for anxiety management. Focus on cognitive restructuring and anxiety management techniques.',
    homework:
      'Client agreed to practice deep breathing exercises daily. Will complete thought record for anxious thoughts between sessions.',
    followUp: 'Schedule follow-up session in one week.',
    referrals: 'Consider psychiatric consultation if symptoms worsen or do not improve with therapy.',
    medications: 'No medications discussed or prescribed at this time.',
  },
  createdDate: format(new Date(), 'yyyy-MM-dd'),
  lastUpdated: format(new Date(), 'yyyy-MM-dd'),
}

const DAP_SAMPLE: DAPNote = {
  id: 'sample-dap',
  clientName: '[Client Name]',
  clinicianName: '[Your Name]',
  date: format(new Date(), 'yyyy-MM-dd'),
  sessionNumber: '1',
  data: {
    clientPresentedWith:
      'Client arrived for session reporting that they have been feeling sad and hopeless for the past two weeks.',
    observedBehavior:
      'Client maintained eye contact, spoke in a soft voice, and appeared withdrawn. Movement was slow and deliberate.',
    clientStatements:
      'Client stated, "I feel like nothing will get better" and "I have no motivation to do anything." Client reported isolating from friends.',
    environmentalFactors:
      'Recent job loss; living situation is stable; support system available but not currently engaged.',
    physicalPresentation:
      'Client appears fatigued with poor posture. Reports appetite loss and sleep disturbance. No visible self-harm marks.',
  },
  assessment: {
    functioningLevel:
      'Client is experiencing moderate functional impairment in social, occupational, and self-care domains.',
    progressTowardGoals:
      'Client is currently working toward goal of reducing depressive symptoms and increasing social engagement.',
    therapeuticProgress:
      'Session focused on building therapeutic alliance and conducting comprehensive assessment of current depressive episode.',
    clinicalImpressions:
      'Client presents with symptoms consistent with Major Depressive Disorder. Appears motivated for treatment.',
    risksAndConcerns:
      'Safety assessed. Client denies suicidal ideation. Recommending increased monitoring given severity of depressive symptoms.',
  },
  plan: {
    nextSteps:
      'Develop coping strategies for managing depressive symptoms. Consider referral for psychiatric evaluation.',
    clientHasAgreedTo:
      'Client agreed to daily mood tracking and to contact clinician if experiencing increased suicidal thoughts.',
    scheduledFollowUp: 'Next session scheduled for [date]. Weekly sessions recommended.',
    referralsNeeded:
      'Psychiatric consultation recommended for medication evaluation. Peer support group referral provided.',
    cliniciansNotes:
      'Client is engaged and willing participant in treatment. Monitor for any escalation in suicidal ideation.',
  },
  createdDate: format(new Date(), 'yyyy-MM-dd'),
  lastUpdated: format(new Date(), 'yyyy-MM-dd'),
}

const BIRP_SAMPLE: BIRPNote = {
  id: 'sample-birp',
  clientName: '[Client Name]',
  clinicianName: '[Your Name]',
  date: format(new Date(), 'yyyy-MM-dd'),
  sessionNumber: '1',
  behavior: {
    clientBehaviors:
      'Client reported escalating conflict with partner, including raised voice and door slamming incidents.',
    observedInSession:
      'Client demonstrated assertive communication during role-play. Maintained appropriate eye contact and spoke clearly.',
    reportedOutsideSession:
      'Client stated they were able to use one conflict resolution technique from previous session with positive result.',
    behavioral_strengths:
      'Client demonstrates ability to self-reflect, strong motivation to improve relationship, and willingness to practice new skills.',
  },
  intervention: {
    approachUsed:
      'Used cognitive-behavioral therapy techniques with focus on communication and conflict resolution skills.',
    skillsTaught:
      'Taught "I" statements, active listening techniques, and de-escalation strategies. Reviewed assertiveness communication.',
    activitiesCompleted:
      'Role-played difficult conversation scenarios. Client practiced new communication techniques in simulated partner interaction.',
    interventionRationale:
      'Behavioral intervention selected to directly address communication deficits contributing to relationship conflict.',
  },
  response: {
    clientResponse:
      'Client was engaged and participatory. Demonstrated understanding of techniques and expressed confidence in applying them.',
    engagementLevel: 'High engagement. Asked clarifying questions and provided relevant examples from personal experience.',
    barriersEncountered:
      'Client initially had difficulty with "I" statements but improved with practice and feedback.',
    successIndicators:
      'Client successfully demonstrated new communication techniques during role-play. Expressed commitment to practicing between sessions.',
  },
  plan: {
    nextSession:
      'Continue developing communication skills. Introduce problem-solving techniques for addressing relationship conflicts.',
    homeWork:
      'Client agreed to practice de-escalation strategy once daily and complete conflict resolution worksheet.',
    followUpActions:
      'Monitor application of skills in real-world scenarios. Assess relationship dynamics at next session.',
    clientResponsibilities:
      'Practice communication skills with partner daily. Complete home assignments. Maintain open communication about progress.',
  },
  createdDate: format(new Date(), 'yyyy-MM-dd'),
  lastUpdated: format(new Date(), 'yyyy-MM-dd'),
}

export default function ClinicalNotesTemplates() {
  const [currentView, setCurrentView] = useState<View>('selector')
  const [selectedFormat, setSelectedFormat] = useState<NoteFormat | null>(null)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [savedNotes, setSavedNotes] = useState<Note[]>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [showSampleModal, setShowSampleModal] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [copyMessage, setCopyMessage] = useState('')

  // Load saved notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('clinicalNotes')
    if (saved) {
      try {
        setSavedNotes(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved notes')
      }
    }
  }, [])

  // Save note to localStorage
  const saveNote = (note: Note) => {
    const newNotes = activeNote?.id === note.id ? savedNotes.map((n) => (n.id === note.id ? note : n)) : [...savedNotes, note]
    localStorage.setItem('clinicalNotes', JSON.stringify(newNotes))
    setSavedNotes(newNotes)
    setSaveMessage('Note saved successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  // Create new note based on format
  const createNewNote = (noteFormat: NoteFormat) => {
    let newNote: Note
    const baseId = `${noteFormat}-${Date.now()}`
    const baseDate = format(new Date(), 'yyyy-MM-dd')

    switch (noteFormat) {
      case 'soap':
        newNote = {
          id: baseId,
          clientName: '',
          clinicianName: '',
          date: baseDate,
          sessionNumber: '',
          subjective: {
            presenting: '',
            mood: '',
            behavior: '',
            sleep: '',
            appetite: '',
            otherInfo: '',
          },
          objective: {
            appearance: '',
            affect: '',
            speech: '',
            cognition: '',
            orientation: '',
            observations: '',
          },
          assessment: {
            clinicalObservations: '',
            diagnosis: '',
            riskFactors: '',
            strengths: '',
            formulation: '',
          },
          plan: {
            treatment: '',
            homework: '',
            followUp: '',
            referrals: '',
            medications: '',
          },
          createdDate: baseDate,
          lastUpdated: baseDate,
        } as SOAPNote
        break
      case 'dap':
        newNote = {
          id: baseId,
          clientName: '',
          clinicianName: '',
          date: baseDate,
          sessionNumber: '',
          data: {
            clientPresentedWith: '',
            observedBehavior: '',
            clientStatements: '',
            environmentalFactors: '',
            physicalPresentation: '',
          },
          assessment: {
            functioningLevel: '',
            progressTowardGoals: '',
            therapeuticProgress: '',
            clinicalImpressions: '',
            risksAndConcerns: '',
          },
          plan: {
            nextSteps: '',
            clientHasAgreedTo: '',
            scheduledFollowUp: '',
            referralsNeeded: '',
            cliniciansNotes: '',
          },
          createdDate: baseDate,
          lastUpdated: baseDate,
        } as DAPNote
        break
      case 'birp':
        newNote = {
          id: baseId,
          clientName: '',
          clinicianName: '',
          date: baseDate,
          sessionNumber: '',
          behavior: {
            clientBehaviors: '',
            observedInSession: '',
            reportedOutsideSession: '',
            behavioral_strengths: '',
          },
          intervention: {
            approachUsed: '',
            skillsTaught: '',
            activitiesCompleted: '',
            interventionRationale: '',
          },
          response: {
            clientResponse: '',
            engagementLevel: '',
            barriersEncountered: '',
            successIndicators: '',
          },
          plan: {
            nextSession: '',
            homeWork: '',
            followUpActions: '',
            clientResponsibilities: '',
          },
          createdDate: baseDate,
          lastUpdated: baseDate,
        } as BIRPNote
        break
    }

    setActiveNote(newNote)
    setSelectedFormat(noteFormat)
    setCurrentView('editor')
  }

  // Export note to PDF
  const exportPDF = (note: Note) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPos = 20

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, maxWidth: number = pageWidth - 40) => {
      const lines = doc.splitTextToSize(text, maxWidth)
      doc.text(lines, x, y)
      return y + lines.length * 5
    }

    // Header
    doc.setFontSize(16)
    doc.text('CLINICAL PROGRESS NOTE', 20, yPos)
    yPos += 12

    // Client and clinician info
    doc.setFontSize(10)
    doc.text(`Client Name: ${note.clientName}`, 20, yPos)
    yPos += 6
    doc.text(`Clinician: ${note.clinicianName}`, 20, yPos)
    yPos += 6
    doc.text(`Date: ${note.date}`, 20, yPos)
    yPos += 6
    doc.text(`Session #: ${note.sessionNumber}`, 20, yPos)
    yPos += 10

    // Format-specific content
    if ('subjective' in note) {
      // SOAP Note
      doc.setFontSize(12)
      doc.text('SUBJECTIVE', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.subjective.presenting) {
        yPos = addText(`Presenting: ${note.subjective.presenting}`, 20, yPos)
        yPos += 3
      }
      if (note.subjective.mood) {
        yPos = addText(`Mood: ${note.subjective.mood}`, 20, yPos)
        yPos += 3
      }
      yPos += 5

      doc.setFontSize(12)
      doc.text('OBJECTIVE', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.objective.appearance) {
        yPos = addText(`Appearance: ${note.objective.appearance}`, 20, yPos)
        yPos += 3
      }
      yPos += 5

      doc.setFontSize(12)
      doc.text('ASSESSMENT', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.assessment.clinicalObservations) {
        yPos = addText(`Clinical Observations: ${note.assessment.clinicalObservations}`, 20, yPos)
        yPos += 3
      }
      if (note.assessment.diagnosis) {
        yPos = addText(`Diagnosis: ${note.assessment.diagnosis}`, 20, yPos)
        yPos += 3
      }
      yPos += 5

      doc.setFontSize(12)
      doc.text('PLAN', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.plan.treatment) {
        yPos = addText(`Treatment: ${note.plan.treatment}`, 20, yPos)
        yPos += 3
      }
    } else if ('data' in note) {
      // DAP Note
      doc.setFontSize(12)
      doc.text('DATA', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.data.clientPresentedWith) {
        yPos = addText(`Client Presented: ${note.data.clientPresentedWith}`, 20, yPos)
        yPos += 3
      }
      yPos += 5

      doc.setFontSize(12)
      doc.text('ASSESSMENT', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.assessment.functioningLevel) {
        yPos = addText(`Functioning: ${note.assessment.functioningLevel}`, 20, yPos)
        yPos += 3
      }
      yPos += 5

      doc.setFontSize(12)
      doc.text('PLAN', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.plan.nextSteps) {
        yPos = addText(`Next Steps: ${note.plan.nextSteps}`, 20, yPos)
      }
    } else if ('behavior' in note) {
      // BIRP Note
      doc.setFontSize(12)
      doc.text('BEHAVIOR', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.behavior.clientBehaviors) {
        yPos = addText(`Reported: ${note.behavior.clientBehaviors}`, 20, yPos)
        yPos += 3
      }
      yPos += 5

      doc.setFontSize(12)
      doc.text('INTERVENTION', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.intervention.approachUsed) {
        yPos = addText(`Approach: ${note.intervention.approachUsed}`, 20, yPos)
        yPos += 3
      }
      yPos += 5

      doc.setFontSize(12)
      doc.text('RESPONSE', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.response.clientResponse) {
        yPos = addText(`Response: ${note.response.clientResponse}`, 20, yPos)
        yPos += 3
      }
      yPos += 5

      doc.setFontSize(12)
      doc.text('PLAN', 20, yPos)
      yPos += 8
      doc.setFontSize(10)
      if (note.plan.nextSession) {
        yPos = addText(`Next Session: ${note.plan.nextSession}`, 20, yPos)
      }
    }

    // Footer
    doc.setFontSize(8)
    doc.text('CONFIDENTIAL - HANDLE SECURELY', 20, pageHeight - 10)

    doc.save(`clinical-note-${note.clientName}-${note.date}.pdf`)
  }

  // Disclaimer Screen
  if (!disclaimerAccepted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container-custom section-padding">
          <Link href="/tools" className="inline-flex items-center text-primary-sage hover:text-primary-sage/80 mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tools
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="card border-4 border-warning-orange">
              <div className="flex items-start space-x-4 mb-6">
                <AlertCircle className="w-8 h-8 text-warning-orange flex-shrink-0 mt-1" />
                <div>
                  <h1 className="text-3xl font-bold text-text-dark mb-2">HIPAA & Clinical Compliance Disclaimer</h1>
                  <p className="text-warm-gray">Important Information About Using This Tool</p>
                </div>
              </div>

              <div className="space-y-6 text-warm-gray leading-relaxed">
                <div className="bg-cream p-6 rounded-lg border-l-4 border-warning-orange">
                  <h2 className="font-bold text-text-dark mb-3">Confidentiality & Data Protection</h2>
                  <p>
                    This tool stores clinical notes in your browser's localStorage. This is a local, client-side storage mechanism
                    that is NOT encrypted and NOT HIPAA compliant for storing Protected Health Information (PHI). You assume full
                    responsibility for the security and confidentiality of any notes created using this tool.
                  </p>
                </div>

                <div className="bg-cream p-6 rounded-lg border-l-4 border-warning-orange">
                  <h2 className="font-bold text-text-dark mb-3">Secure Storage Requirements</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Notes created here are suitable ONLY for templates, learning, and practice purposes without real client
                      information
                    </li>
                    <li>
                      For storing actual client clinical notes, use an EHR/EMR system that is HIPAA-compliant and properly
                      encrypted
                    </li>
                    <li>Never store real client information (names, MRNs, DOB) in this tool</li>
                    <li>Use pseudonyms or generic examples (e.g., "Client A") when practicing</li>
                    <li>Regularly clear your browser cache and localStorage after use</li>
                  </ul>
                </div>

                <div className="bg-cream p-6 rounded-lg border-l-4 border-warning-orange">
                  <h2 className="font-bold text-text-dark mb-3">Clinical Responsibility</h2>
                  <p>
                    These templates are designed to support clinical documentation but do not replace professional judgment. You are
                    responsible for ensuring your clinical notes meet all applicable state licensing board requirements, agency
                    standards, and clinical best practices.
                  </p>
                </div>

                <div className="bg-cream p-6 rounded-lg border-l-4 border-warning-orange">
                  <h2 className="font-bold text-text-dark mb-3">Recommended Best Practices</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Use this tool ONLY for educational and template reference purposes</li>
                    <li>Transfer completed notes to your secure, HIPAA-compliant EHR system immediately</li>
                    <li>Do not leave sensitive client information unattended on your computer</li>
                    <li>Lock your computer when stepping away</li>
                    <li>Use multi-factor authentication on your EHR system</li>
                    <li>Regularly audit access logs to clinical records</li>
                    <li>Follow your organization's data security policies</li>
                  </ul>
                </div>

                <div className="bg-cream p-6 rounded-lg border-l-4 border-warning-orange">
                  <h2 className="font-bold text-text-dark mb-3">Limitations of This Tool</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Not HIPAA compliant for storing client PHI</li>
                    <li>Not suitable for multi-user access or team collaboration on client cases</li>
                    <li>Does not create legal clinical records</li>
                    <li>No backup or recovery system if notes are accidentally deleted</li>
                    <li>Browser updates or clearing cache may delete stored notes permanently</li>
                  </ul>
                </div>

                <div className="bg-warning-orange/10 p-6 rounded-lg border-l-4 border-warning-orange">
                  <h2 className="font-bold text-text-dark mb-3">State Licensing Boards</h2>
                  <p>
                    Clinical note documentation must comply with your state licensing board requirements. Consult your state's
                    regulations regarding record retention, format requirements, and confidentiality standards. Most states require:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-3">
                    <li>Contemporaneous notes created during or immediately after the session</li>
                    <li>Client identifying information (handled securely)</li>
                    <li>Session date and duration</li>
                    <li>Clinical observations and interventions provided</li>
                    <li>Treatment plan progress</li>
                    <li>Clinician signature and credentials</li>
                  </ul>
                </div>

                <div className="bg-success-green/10 p-6 rounded-lg border-l-4 border-success-green">
                  <h2 className="font-bold text-text-dark mb-3">Appropriate Uses</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Learning the structure and format of different note types</li>
                    <li>Creating templates customized for your practice</li>
                    <li>Practicing clinical documentation skills</li>
                    <li>Training supervisees on proper note documentation</li>
                    <li>Drafting notes before entering them into your EHR</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-cream p-6 rounded-lg">
                <div className="flex items-start space-x-3 mb-6">
                  <input
                    type="checkbox"
                    id="disclaimer"
                    checked={disclaimerAccepted}
                    onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                    className="w-5 h-5 mt-1 accent-primary-sage"
                  />
                  <label htmlFor="disclaimer" className="text-warm-gray">
                    I understand and accept the limitations of this tool. I will not store actual client Protected Health Information
                    (PHI) in this application. I will use this tool only for template reference and educational purposes, and will
                    ensure all client clinical notes are stored in HIPAA-compliant systems.
                  </label>
                </div>

                <button
                  onClick={() => setDisclaimerAccepted(true)}
                  className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!disclaimerAccepted}
                >
                  I Understand & Accept
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-warm-gray mt-8">
              If you have questions about HIPAA compliance or clinical documentation standards, consult your supervisor, licensing
              board, or healthcare attorney.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Note Editor View
  if (currentView === 'editor' && activeNote) {
    return <SOAPNoteEditor note={activeNote as SOAPNote} onSave={saveNote} onBack={() => setCurrentView('selector')} />
  }

  // Main selector view with tabs
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom section-padding">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/tools" className="inline-flex items-center text-primary-sage hover:text-primary-sage/80 mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Tools
            </Link>
            <h1 className="text-4xl font-bold text-text-dark">Clinical Notes Templates</h1>
            <p className="text-xl text-warm-gray mt-2">Professional documentation tools for therapists</p>
          </div>
        </div>

        {/* Key Information Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card border-l-4 border-clinical-blue">
            <h3 className="font-bold text-text-dark mb-2">SOAP Notes</h3>
            <p className="text-sm text-warm-gray">
              Subjective, Objective, Assessment, Plan. Best for comprehensive documentation and treatment planning.
            </p>
          </div>
          <div className="card border-l-4 border-primary-sage">
            <h3 className="font-bold text-text-dark mb-2">DAP Notes</h3>
            <p className="text-sm text-warm-gray">
              Data, Assessment, Plan. Ideal for time-conscious clinicians and brief therapy models.
            </p>
          </div>
          <div className="card border-l-4 border-earth-green">
            <h3 className="font-bold text-text-dark mb-2">BIRP Notes</h3>
            <p className="text-sm text-warm-gray">
              Behavior, Intervention, Response, Plan. Perfect for behavioral therapy and behavioral tracking.
            </p>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* SOAP Note Card */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <div className="w-12 h-12 bg-clinical-blue/20 rounded-lg flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-clinical-blue" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark mb-2">SOAP Notes</h2>
              <p className="text-sm text-accent-gold font-medium mb-4">Most Common Format</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">When to Use:</h3>
                <p className="text-sm text-warm-gray">
                  Standard mental health documentation, individual therapy, comprehensive assessments, treatment planning
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">Structure:</h3>
                <ul className="text-sm text-warm-gray space-y-1">
                  <li>• <strong>S</strong> - Client reports and subjective experiences</li>
                  <li>• <strong>O</strong> - Observable behaviors and clinical observations</li>
                  <li>• <strong>A</strong> - Clinical interpretation and diagnosis</li>
                  <li>• <strong>P</strong> - Treatment plan and interventions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">Best For:</h3>
                <ul className="text-sm text-warm-gray space-y-1">
                  <li>✓ Comprehensive documentation</li>
                  <li>✓ Treatment planning</li>
                  <li>✓ Complex presentations</li>
                  <li>✓ Insurance requirements</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => createNewNote('soap')}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Note
              </button>
              <button
                onClick={() => {
                  setActiveNote(SOAP_SAMPLE)
                  setShowSampleModal(true)
                }}
                className="btn btn-outline w-full flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Sample
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-warm-gray/20">
              <p className="text-xs text-warm-gray mb-2 font-medium">Tips:</p>
              <ul className="text-xs text-warm-gray space-y-1">
                <li>• Be specific and objective in observations</li>
                <li>• Use client direct quotes when relevant</li>
                <li>• Clearly link assessment to objective data</li>
                <li>• Make plan measurable and time-bound</li>
              </ul>
            </div>
          </div>

          {/* DAP Note Card */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary-sage/20 rounded-lg flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-primary-sage" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark mb-2">DAP Notes</h2>
              <p className="text-sm text-earth-green font-medium mb-4">Clinical Brief Format</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">When to Use:</h3>
                <p className="text-sm text-warm-gray">
                  Brief therapy, session-to-session progress tracking, high-volume practices, insurance summaries
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">Structure:</h3>
                <ul className="text-sm text-warm-gray space-y-1">
                  <li>• <strong>D</strong> - Objective data and observations</li>
                  <li>• <strong>A</strong> - Clinical assessment and progress</li>
                  <li>• <strong>P</strong> - Treatment plan and next steps</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">Best For:</h3>
                <ul className="text-sm text-warm-gray space-y-1">
                  <li>✓ Time efficiency</li>
                  <li>✓ Brief therapy models</li>
                  <li>✓ EAP sessions</li>
                  <li>✓ Progress tracking</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => createNewNote('dap')}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Note
              </button>
              <button
                onClick={() => {
                  setActiveNote(DAP_SAMPLE)
                  setShowSampleModal(true)
                }}
                className="btn btn-outline w-full flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Sample
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-warm-gray/20">
              <p className="text-xs text-warm-gray mb-2 font-medium">Tips:</p>
              <ul className="text-xs text-warm-gray space-y-1">
                <li>• Concise but thorough documentation</li>
                <li>• Focus on measurable progress</li>
                <li>• Document functional status clearly</li>
                <li>• Highlight plan changes promptly</li>
              </ul>
            </div>
          </div>

          {/* BIRP Note Card */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <div className="w-12 h-12 bg-earth-green/20 rounded-lg flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-earth-green" />
              </div>
              <h2 className="text-2xl font-bold text-text-dark mb-2">BIRP Notes</h2>
              <p className="text-sm text-clinical-blue font-medium mb-4">Behavioral Focus Format</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">When to Use:</h3>
                <p className="text-sm text-warm-gray">
                  Behavioral therapy, skill-building sessions, behavior tracking, applied behavior analysis (ABA)
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">Structure:</h3>
                <ul className="text-sm text-warm-gray space-y-1">
                  <li>• <strong>B</strong> - Specific behaviors observed/reported</li>
                  <li>• <strong>I</strong> - Interventions and techniques used</li>
                  <li>• <strong>R</strong> - Client's response and engagement</li>
                  <li>• <strong>P</strong> - Plan and skill practice</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-text-dark text-sm mb-2">Best For:</h3>
                <ul className="text-sm text-warm-gray space-y-1">
                  <li>✓ Behavioral interventions</li>
                  <li>✓ Skill training sessions</li>
                  <li>✓ Clear behavior tracking</li>
                  <li>✓ Parent-child sessions</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => createNewNote('birp')}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Note
              </button>
              <button
                onClick={() => {
                  setActiveNote(BIRP_SAMPLE)
                  setShowSampleModal(true)
                }}
                className="btn btn-outline w-full flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Sample
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-warm-gray/20">
              <p className="text-xs text-warm-gray mb-2 font-medium">Tips:</p>
              <ul className="text-xs text-warm-gray space-y-1">
                <li>• Specify observable behaviors precisely</li>
                <li>• Document skill demonstration</li>
                <li>• Note client engagement level</li>
                <li>• Link homework to session work</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices Section */}
        <div className="mt-12 bg-cream p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Clinical Documentation Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-text-dark mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                Essential Elements
              </h3>
              <ul className="space-y-3 text-warm-gray">
                <li>
                  <strong>Timely Documentation:</strong> Write notes during or immediately after sessions while details are fresh
                </li>
                <li>
                  <strong>Objective Language:</strong> Use facts and observations rather than interpretations or opinions
                </li>
                <li>
                  <strong>Specific Details:</strong> Include relevant quotes, behaviors, and clinical observations
                </li>
                <li>
                  <strong>Clinical Formulation:</strong> Connect assessment to objective data and treatment plan
                </li>
                <li>
                  <strong>Measurable Goals:</strong> Ensure treatment plans are specific, measurable, and time-bound (SMART)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-text-dark mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-warning-orange mr-3" />
                What NOT to Document
              </h3>
              <ul className="space-y-3 text-warm-gray">
                <li>
                  <strong>Clinician Opinions:</strong> Keep personal reactions and interpretations separate from observations
                </li>
                <li>
                  <strong>Derogatory Language:</strong> Avoid judgmental or inflammatory descriptions of clients
                </li>
                <li>
                  <strong>Extraneous Details:</strong> Include only clinically relevant information
                </li>
                <li>
                  <strong>Assumptions:</strong> Distinguish between observed facts and clinical interpretations
                </li>
                <li>
                  <strong>Client PHI in Examples:</strong> Never include actual client identifying information for practice
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>How do I choose which note format to use?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Choose based on your setting and client needs. SOAP notes are standard for comprehensive documentation and
                  treatment planning. DAP notes are efficient for brief therapy and quick progress tracking. BIRP notes are ideal
                  when focusing on specific behaviors and skill development. Some clinicians use different formats for different
                  client populations.
                </p>
              </div>
            </details>

            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>Can I use the same format for all my clients?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Yes, many clinicians use one format consistently. However, your format choice should align with your agency's
                  requirements, insurance preferences, and clinical model. Some settings require specific formats, so check your
                  policies before implementing.
                </p>
              </div>
            </details>

            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>How detailed should my clinical notes be?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Include enough detail to understand the session and clinical decision-making, but avoid unnecessary verbosity.
                  Aim for 1-2 pages for most sessions. Include relevant clinical observations, specific interventions, client
                  response, and plan modifications. What would another clinician need to understand this client's progress?
                </p>
              </div>
            </details>

            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>What should I do if I need to correct a note?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Never alter, delete, or obliterate original notes. If using paper records, draw a single line through the error,
                  write "error" with the date and your initials. If using EHR, use the amendment feature. Document the correction
                  and the reason for it. Proper correction procedures protect you legally and maintain record integrity.
                </p>
              </div>
            </details>

            <details className="card cursor-pointer group">
              <summary className="flex items-center justify-between font-bold text-text-dark hover:text-primary-sage transition-colors">
                <span>How long should I keep clinical notes?</span>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-warm-gray border-t border-warm-gray/20 pt-4">
                <p>
                  Record retention requirements vary by state and setting. Generally, keep active client records for the duration of
                  treatment plus 3-7 years after treatment ends. For minors, many states require retention until the age of majority
                  plus several years. Check your state licensing board and agency policies for specific requirements.
                </p>
              </div>
            </details>
          </div>
        </div>

        {/* Sample Modal */}
        {showSampleModal && activeNote && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-dark">Sample {activeNote.id.includes('soap') ? 'SOAP' : activeNote.id.includes('dap') ? 'DAP' : 'BIRP'} Note</h2>
                <button onClick={() => setShowSampleModal(false)} className="text-warm-gray hover:text-text-dark">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6 text-warm-gray">
                <p className="italic text-sm bg-cream p-4 rounded">
                  This is a sample template showing the structure and content depth for a {activeNote.id.includes('soap') ? 'SOAP' : activeNote.id.includes('dap') ? 'DAP' : 'BIRP'} note. The text
                  provided is for illustrative purposes only.
                </p>

                {/* Display sample content based on format */}
                {'subjective' in activeNote && (
                  <>
                    <div>
                      <h3 className="font-bold text-text-dark mb-2">SUBJECTIVE</h3>
                      <p className="mb-2">
                        <strong>Presenting Complaint:</strong> {activeNote.subjective.presenting}
                      </p>
                      <p className="mb-2">
                        <strong>Mood:</strong> {activeNote.subjective.mood}
                      </p>
                      <p>
                        <strong>Sleep/Appetite:</strong> {activeNote.subjective.sleep} {activeNote.subjective.appetite}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-text-dark mb-2">OBJECTIVE</h3>
                      <p className="mb-2">
                        <strong>Appearance:</strong> {activeNote.objective.appearance}
                      </p>
                      <p>
                        <strong>Affect/Speech:</strong> {activeNote.objective.affect} {activeNote.objective.speech}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-text-dark mb-2">ASSESSMENT</h3>
                      <p className="mb-2">
                        <strong>Diagnosis:</strong> {activeNote.assessment.diagnosis}
                      </p>
                      <p>
                        <strong>Formulation:</strong> {activeNote.assessment.formulation}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-text-dark mb-2">PLAN</h3>
                      <p className="mb-2">
                        <strong>Treatment:</strong> {activeNote.plan.treatment}
                      </p>
                      <p>
                        <strong>Homework:</strong> {activeNote.plan.homework}
                      </p>
                    </div>
                  </>
                )}

                {('data' in activeNote) && (
                  <>
                    <div>
                      <h3 className="font-bold text-text-dark mb-2">DATA</h3>
                      <p className="mb-2">
                        <strong>Client Presented With:</strong> {activeNote.data.clientPresentedWith}
                      </p>
                      <p>
                        <strong>Observed Behavior:</strong> {activeNote.data.observedBehavior}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-text-dark mb-2">ASSESSMENT</h3>
                      <p className="mb-2">
                        <strong>Functioning Level:</strong> {activeNote.assessment.functioningLevel}
                      </p>
                      <p>
                        <strong>Clinical Impressions:</strong> {activeNote.assessment.clinicalImpressions}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-text-dark mb-2">PLAN</h3>
                      <p>
                        <strong>Next Steps:</strong> {activeNote.plan.nextSteps}
                      </p>
                    </div>
                  </>
                )}

                {('behavior' in activeNote) && (
                  <>
                    <div>
                      <h3 className="font-bold text-text-dark mb-2">BEHAVIOR</h3>
                      <p className="mb-2">
                        <strong>Client Behaviors:</strong> {activeNote.behavior.clientBehaviors}
                      </p>
                      <p>
                        <strong>Observed in Session:</strong> {activeNote.behavior.observedInSession}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-text-dark mb-2">INTERVENTION</h3>
                      <p className="mb-2">
                        <strong>Approach Used:</strong> {activeNote.intervention.approachUsed}
                      </p>
                      <p>
                        <strong>Skills Taught:</strong> {activeNote.intervention.skillsTaught}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-text-dark mb-2">RESPONSE</h3>
                      <p className="mb-2">
                        <strong>Client Response:</strong> {activeNote.response.clientResponse}
                      </p>
                      <p>
                        <strong>Engagement Level:</strong> {activeNote.response.engagementLevel}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-text-dark mb-2">PLAN</h3>
                      <p className="mb-2">
                        <strong>Next Session:</strong> {activeNote.plan.nextSession}
                      </p>
                      <p>
                        <strong>Homework:</strong> {activeNote.plan.homeWork}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <button onClick={() => setShowSampleModal(false)} className="btn btn-primary w-full mt-8">
                Close Sample
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// SOAP Note Editor Component
function SOAPNoteEditor({
  note,
  onSave,
  onBack,
}: {
  note: SOAPNote
  onSave: (note: SOAPNote) => void
  onBack: () => void
}) {
  const [editNote, setEditNote] = useState<SOAPNote>(note)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSave = () => {
    onSave({ ...editNote, lastUpdated: format(new Date(), 'yyyy-MM-dd') })
    setSaveMessage('Note saved successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleExport = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPos = 20

    const addText = (label: string, text: string, y: number): number => {
      if (!text) return y
      const lines = doc.splitTextToSize(`${label}\n${text}`, pageWidth - 40)
      doc.text(lines, 20, y)
      return y + lines.length * 5 + 3
    }

    doc.setFontSize(16)
    doc.text('CLINICAL PROGRESS NOTE - SOAP FORMAT', 20, yPos)
    yPos += 15

    doc.setFontSize(10)
    doc.text(`Client: ${editNote.clientName}`, 20, yPos)
    yPos += 6
    doc.text(`Clinician: ${editNote.clinicianName}`, 20, yPos)
    yPos += 6
    doc.text(`Date: ${editNote.date} | Session: ${editNote.sessionNumber}`, 20, yPos)
    yPos += 12

    doc.setFontSize(12)
    doc.text('SUBJECTIVE', 20, yPos)
    yPos += 8
    doc.setFontSize(10)
    yPos = addText('Presenting:', editNote.subjective.presenting, yPos)
    yPos = addText('Mood:', editNote.subjective.mood, yPos)
    yPos += 3

    doc.setFontSize(12)
    doc.text('OBJECTIVE', 20, yPos)
    yPos += 8
    doc.setFontSize(10)
    yPos = addText('Appearance:', editNote.objective.appearance, yPos)
    yPos = addText('Affect:', editNote.objective.affect, yPos)
    yPos += 3

    doc.setFontSize(12)
    doc.text('ASSESSMENT', 20, yPos)
    yPos += 8
    doc.setFontSize(10)
    yPos = addText('Diagnosis:', editNote.assessment.diagnosis, yPos)
    yPos = addText('Clinical Observations:', editNote.assessment.clinicalObservations, yPos)
    yPos += 3

    doc.setFontSize(12)
    doc.text('PLAN', 20, yPos)
    yPos += 8
    doc.setFontSize(10)
    yPos = addText('Treatment:', editNote.plan.treatment, yPos)
    yPos = addText('Homework:', editNote.plan.homework, yPos)
    yPos = addText('Follow-up:', editNote.plan.followUp, yPos)

    doc.setFontSize(8)
    doc.text('CONFIDENTIAL - SECURE STORAGE REQUIRED', 20, pageHeight - 10)

    doc.save(`SOAP-Note-${editNote.clientName}-${editNote.date}.pdf`)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom section-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={onBack} className="inline-flex items-center text-primary-sage hover:text-primary-sage/80 mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-text-dark">SOAP Note Editor</h1>
            <p className="text-warm-gray mt-1">Subjective, Objective, Assessment, Plan</p>
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-success-green/10 border border-success-green rounded-lg text-success-green flex items-center">
            <CheckCircle className="w-5 h-5 mr-3" />
            {saveMessage}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button onClick={handleSave} className="btn btn-primary flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Save Note
          </button>
          <button onClick={handleExport} className="btn btn-outline flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export to PDF
          </button>
        </div>

        {/* Client Information Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Client & Session Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Client Name / Identifier</label>
              <input
                type="text"
                value={editNote.clientName}
                onChange={(e) => setEditNote({ ...editNote, clientName: e.target.value })}
                placeholder="e.g., Client A (do not use real names)"
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
              <p className="text-xs text-warm-gray mt-1">Use pseudonym for practice/learning only</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Clinician Name</label>
              <input
                type="text"
                value={editNote.clinicianName}
                onChange={(e) => setEditNote({ ...editNote, clinicianName: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Session Date</label>
              <input
                type="date"
                value={editNote.date}
                onChange={(e) => setEditNote({ ...editNote, date: e.target.value })}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Session Number</label>
              <input
                type="text"
                value={editNote.sessionNumber}
                onChange={(e) => setEditNote({ ...editNote, sessionNumber: e.target.value })}
                placeholder="e.g., 5"
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>
          </div>
        </div>

        {/* SUBJECTIVE Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-2">SUBJECTIVE</h2>
          <p className="text-warm-gray mb-6">Client's self-report, feelings, and subjective experiences</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Presenting Complaint</label>
              <p className="text-xs text-warm-gray mb-2">What brought the client to session? What are their main concerns?</p>
              <textarea
                value={editNote.subjective.presenting}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    subjective: { ...editNote.subjective, presenting: e.target.value },
                  })
                }
                placeholder="e.g., 'Client reported increased anxiety about work responsibilities...'"
                rows={4}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Mood & Emotional State</label>
              <p className="text-xs text-warm-gray mb-2">How is the client feeling? Any mood changes since last session?</p>
              <textarea
                value={editNote.subjective.mood}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    subjective: { ...editNote.subjective, mood: e.target.value },
                  })
                }
                placeholder="e.g., 'Anxious mood with some irritability...'"
                rows={4}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Sleep Patterns</label>
                <p className="text-xs text-warm-gray mb-2">Hours, quality, any disturbances?</p>
                <textarea
                  value={editNote.subjective.sleep}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      subjective: { ...editNote.subjective, sleep: e.target.value },
                    })
                  }
                  placeholder="e.g., '6-7 hours, difficulty falling asleep'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Appetite & Eating</label>
                <p className="text-xs text-warm-gray mb-2">Any changes in appetite or eating patterns?</p>
                <textarea
                  value={editNote.subjective.appetite}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      subjective: { ...editNote.subjective, appetite: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Normal appetite, eating regularly'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Other Relevant Information</label>
              <p className="text-xs text-warm-gray mb-2">Life events, stressors, relationships, work/school, substance use</p>
              <textarea
                value={editNote.subjective.otherInfo}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    subjective: { ...editNote.subjective, otherInfo: e.target.value },
                  })
                }
                placeholder="e.g., 'Recent promotion at work, increased responsibilities...'"
                rows={4}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>
          </div>
        </div>

        {/* OBJECTIVE Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-2">OBJECTIVE</h2>
          <p className="text-warm-gray mb-6">Clinician observations - be specific and describe what you actually see/hear</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Appearance & Hygiene</label>
              <p className="text-xs text-warm-gray mb-2">Grooming, clothing, physical presentation, noticeable changes</p>
              <textarea
                value={editNote.objective.appearance}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    objective: { ...editNote.objective, appearance: e.target.value },
                  })
                }
                placeholder="e.g., 'Well-groomed, appropriately dressed, maintains good eye contact'"
                rows={3}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Affect</label>
                <p className="text-xs text-warm-gray mb-2">Emotional expression, range, appropriateness to content</p>
                <textarea
                  value={editNote.objective.affect}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      objective: { ...editNote.objective, affect: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Anxious affect, restricted range, congruent with content'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Speech</label>
                <p className="text-xs text-warm-gray mb-2">Rate, rhythm, pressure, articulation, any abnormalities</p>
                <textarea
                  value={editNote.objective.speech}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      objective: { ...editNote.objective, speech: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Normal rate, clear articulation, coherent speech'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Cognition & Orientation</label>
                <p className="text-xs text-warm-gray mb-2">Alert? Oriented x4? Memory? Thought process?</p>
                <textarea
                  value={editNote.objective.cognition}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      objective: { ...editNote.objective, cognition: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Alert and oriented x4, coherent thought process, good concentration'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Orientation (x4)</label>
                <p className="text-xs text-warm-gray mb-2">Person, place, time, situation</p>
                <textarea
                  value={editNote.objective.orientation}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      objective: { ...editNote.objective, orientation: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Oriented to person (self, clinician), place, date, situation'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">General Observations</label>
              <p className="text-xs text-warm-gray mb-2">Physical signs of distress, body language, engagement level, session demeanor</p>
              <textarea
                value={editNote.objective.observations}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    objective: { ...editNote.objective, observations: e.target.value },
                  })
                }
                placeholder="e.g., 'Client appears fidgety, demonstrates muscle tension, makes frequent eye contact throughout session'"
                rows={4}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>
          </div>
        </div>

        {/* ASSESSMENT Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-2">ASSESSMENT</h2>
          <p className="text-warm-gray mb-6">Your clinical interpretation - connect objective findings to treatment decisions</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Clinical Observations & Formulation</label>
              <p className="text-xs text-warm-gray mb-2">Summary of clinical picture based on S & O sections</p>
              <textarea
                value={editNote.assessment.clinicalObservations}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    assessment: { ...editNote.assessment, clinicalObservations: e.target.value },
                  })
                }
                placeholder="e.g., 'Client presents with anxiety symptoms consistent with generalized anxiety disorder...'"
                rows={4}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Diagnosis/Primary Concern</label>
              <p className="text-xs text-warm-gray mb-2">DSM-5 diagnosis or clinical formulation of presenting problems</p>
              <textarea
                value={editNote.assessment.diagnosis}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    assessment: { ...editNote.assessment, diagnosis: e.target.value },
                  })
                }
                placeholder="e.g., 'Generalized Anxiety Disorder (F41.1); Work-related stress'"
                rows={3}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Risk Factors</label>
                <p className="text-xs text-warm-gray mb-2">Identify any safety concerns, warning signs, or risk factors</p>
                <textarea
                  value={editNote.assessment.riskFactors}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      assessment: { ...editNote.assessment, riskFactors: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Denies suicidal ideation. No current risk indicators noted.'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Strengths & Resources</label>
                <p className="text-xs text-warm-gray mb-2">Coping skills, support system, insight, motivation, resilience</p>
                <textarea
                  value={editNote.assessment.strengths}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      assessment: { ...editNote.assessment, strengths: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Good insight, strong support system, motivated for treatment, stable employment'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Clinical Formulation</label>
              <p className="text-xs text-warm-gray mb-2">Your understanding of how presenting problems developed and how to treat them</p>
              <textarea
                value={editNote.assessment.formulation}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    assessment: { ...editNote.assessment, formulation: e.target.value },
                  })
                }
                placeholder="e.g., 'Client appears to be experiencing anxiety related to recent work promotion and increased responsibilities. Current coping strategies are insufficient.'"
                rows={4}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>
          </div>
        </div>

        {/* PLAN Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-2">PLAN</h2>
          <p className="text-warm-gray mb-6">Treatment strategy and next steps - be specific and measurable</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Treatment Plan / Interventions</label>
              <p className="text-xs text-warm-gray mb-2">What will you be focusing on? What therapy approach? What are the specific goals?</p>
              <textarea
                value={editNote.plan.treatment}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    plan: { ...editNote.plan, treatment: e.target.value },
                  })
                }
                placeholder="e.g., 'Continue weekly CBT focused on anxiety management. Will teach progressive muscle relaxation and cognitive restructuring techniques.'"
                rows={4}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Client Homework / Practice</label>
              <p className="text-xs text-warm-gray mb-2">What specific assignments will the client complete between sessions?</p>
              <textarea
                value={editNote.plan.homework}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    plan: { ...editNote.plan, homework: e.target.value },
                  })
                }
                placeholder="e.g., 'Practice deep breathing exercises daily. Complete thought record for anxious thoughts. Read psychoeducational materials on anxiety.'"
                rows={3}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Follow-up / Next Session</label>
                <p className="text-xs text-warm-gray mb-2">When will you see the client next? Any scheduling changes?</p>
                <textarea
                  value={editNote.plan.followUp}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      plan: { ...editNote.plan, followUp: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Next session scheduled for [date]. Continue weekly frequency.'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-dark mb-2">Referrals / Consultations</label>
                <p className="text-xs text-warm-gray mb-2">Any referrals to other providers or services?</p>
                <textarea
                  value={editNote.plan.referrals}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      plan: { ...editNote.plan, referrals: e.target.value },
                    })
                  }
                  placeholder="e.g., 'Recommend psychiatric consultation if symptoms worsen. Provided peer support group information.'"
                  rows={3}
                  className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-dark mb-2">Medications / Medical Considerations</label>
              <p className="text-xs text-warm-gray mb-2">Any medications discussed? Medical updates? Collaboration with prescribers?</p>
              <textarea
                value={editNote.plan.medications}
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    plan: { ...editNote.plan, medications: e.target.value },
                  })
                }
                placeholder="e.g., 'Client on sertraline 50mg. No medication changes discussed at this time. Will coordinate with prescriber if therapy adjustments needed.'"
                rows={3}
                className="w-full px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-sage"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button onClick={handleSave} className="btn btn-primary flex items-center flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Note
          </button>
          <button onClick={handleExport} className="btn btn-outline flex items-center flex-1">
            <Download className="w-4 h-4 mr-2" />
            Export to PDF
          </button>
          <button onClick={onBack} className="btn btn-outline flex items-center flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>

        {/* Tips Box */}
        <div className="card bg-cream border-l-4 border-clinical-blue">
          <h3 className="font-bold text-text-dark mb-4">Tips for Effective SOAP Notes</h3>
          <ul className="space-y-2 text-sm text-warm-gray">
            <li>• Use specific observations rather than general descriptions</li>
            <li>• Include direct client quotes when clinically relevant</li>
            <li>• Ensure each component builds logically from subjective to objective to assessment to plan</li>
            <li>• Make treatment goals SMART (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
            <li>• Document anything that affects clinical decision-making</li>
            <li>• Maintain professional, objective language throughout</li>
            <li>• Remember: Your notes may be subpoenaed - document as if a court will read them</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
