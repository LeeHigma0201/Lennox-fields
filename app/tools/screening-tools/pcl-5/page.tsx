'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AssessmentLayout from '@/components/assessments/AssessmentLayout'

const PCL5_QUESTIONS = [
  'Repeated, disturbing, and unwanted memories of the stressful experience',
  'Repeated, disturbing dreams of the stressful experience',
  'Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)',
  'Feeling very upset when something reminded you of the stressful experience',
  'Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)',
  'Avoiding memories, thoughts, or feelings related to the stressful experience',
  'Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)',
  'Trouble remembering important parts of the stressful experience',
  'Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)',
  'Blaming yourself or someone else for the stressful experience or what happened after it',
  'Having strong negative feelings such as fear, horror, anger, guilt, or shame',
  'Loss of interest in activities that you used to enjoy',
  'Feeling distant or cut off from other people',
  'Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)',
  'Irritable behavior, angry outbursts, or acting aggressively',
  'Taking too many risks or doing things that could cause you harm',
  'Being "superalert" or watchful or on guard',
  'Feeling jumpy or easily startled',
  'Having difficulty concentrating',
  'Trouble falling or staying asleep',
]

const RESPONSE_OPTIONS = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'A little bit' },
  { value: 2, label: 'Moderately' },
  { value: 3, label: 'Quite a bit' },
  { value: 4, label: 'Extremely' },
]

export default function PCL5Page() {
  const [responses, setResponses] = useState<number[]>(new Array(20).fill(-1))
  const [showResults, setShowResults] = useState(false)

  const handleResponse = (questionIndex: number, value: number) => {
    const newResponses = [...responses]
    newResponses[questionIndex] = value
    setResponses(newResponses)
  }

  const calculateScore = () => {
    return responses.reduce((sum, response) => sum + (response >= 0 ? response : 0), 0)
  }

  const isComplete = () => {
    return responses.every((response) => response >= 0)
  }

  const handleSubmit = () => {
    if (isComplete()) {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setResponses(new Array(20).fill(-1))
    setShowResults(false)
  }

  const getInterpretation = (score: number) => {
    // PCL-5 cutoff score is typically 31-33 for provisional PTSD diagnosis
    if (score < 31) {
      return {
        severity: 'Below Clinical Threshold',
        color: 'text-earth-green',
        bgColor: 'bg-earth-green/10',
        description: 'Your responses suggest symptoms below the clinical threshold for PTSD. However, any distressing symptoms deserve attention and support.',
        recommendations: [
          'Continue monitoring your symptoms if you\'ve experienced trauma',
          'Practice self-care and stress management techniques',
          'Stay connected with supportive people',
          'Consider talking to a therapist if symptoms increase',
          'Use grounding techniques if you experience distressing memories',
        ],
      }
    } else if (score < 45) {
      return {
        severity: 'Moderate PTSD Symptoms',
        color: 'text-soft-rose',
        bgColor: 'bg-soft-rose/10',
        description: 'Your responses suggest moderate PTSD symptoms. Professional evaluation and treatment are recommended to help you process your experiences and reduce distress.',
        recommendations: [
          'Schedule an evaluation with a trauma-informed mental health professional',
          'Consider evidence-based treatments like CPT or EMDR',
          'Practice grounding techniques for managing flashbacks',
          'Build a strong support network',
          'Avoid self-medicating with alcohol or substances',
          'Learn about trauma and PTSD to understand your symptoms',
        ],
      }
    } else {
      return {
        severity: 'Significant PTSD Symptoms',
        color: 'text-alert-red',
        bgColor: 'bg-alert-red/10',
        description: 'Your responses suggest significant PTSD symptoms. Professional treatment is strongly recommended. Effective treatments are available and can significantly reduce symptoms.',
        recommendations: [
          'Seek professional help from a trauma specialist as soon as possible',
          'Evidence-based treatments (CPT, PE, EMDR) are highly effective for PTSD',
          'Consider both therapy and medication evaluation',
          'Inform trusted people in your life about your struggles',
          'Use crisis resources if experiencing thoughts of self-harm',
          'Avoid alcohol and substances which can worsen symptoms',
          'Practice daily grounding and self-regulation techniques',
          'Be patient with yourself - recovery is possible with proper treatment',
        ],
      }
    }
  }

  const getSymptomClusters = () => {
    // DSM-5 PTSD symptom clusters
    return {
      intrusion: responses.slice(0, 5).reduce((sum, val) => sum + (val >= 0 ? val : 0), 0),
      avoidance: responses.slice(5, 7).reduce((sum, val) => sum + (val >= 0 ? val : 0), 0),
      cognitionMood: responses.slice(7, 14).reduce((sum, val) => sum + (val >= 0 ? val : 0), 0),
      arousal: responses.slice(14, 20).reduce((sum, val) => sum + (val >= 0 ? val : 0), 0),
    }
  }

  const score = calculateScore()
  const interpretation = getInterpretation(score)
  const clusters = getSymptomClusters()
  const completionPercentage = (responses.filter((r) => r >= 0).length / 20) * 100

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-white border-b border-warm-gray/20 py-8">
        <div className="container-custom">
          <Link
            href="/tools/screening-tools"
            className="inline-flex items-center text-primary-sage hover:text-earth-green mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Screening Tools
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            PCL-5: PTSD Screening
          </h1>
          <p className="text-lg text-warm-gray max-w-3xl">
            The PTSD Checklist for DSM-5 (PCL-5) is a validated screening tool for assessing symptoms of
            Post-Traumatic Stress Disorder. This self-report measure corresponds with DSM-5 criteria for PTSD.
          </p>
        </div>
      </section>

      {/* Instructions */}
      <section className="section-padding bg-gradient-warm-bg">
        <div className="container-custom max-w-4xl">
          <div className="card">
            <h2 className="text-2xl font-bold text-text-dark mb-4">Instructions</h2>
            <p className="text-warm-gray mb-4">
              This questionnaire asks about problems you may have had after a <strong>very stressful experience
              involving actual or threatened death, serious injury, or sexual violence</strong>.
            </p>
            <p className="text-warm-gray mb-4">
              In the past month, how much were you bothered by each of the following problems?
            </p>
            <p className="text-warm-gray mb-4">
              Please answer all 20 questions. Your responses are completely private and not stored anywhere.
            </p>
            <div className="bg-primary-sage/10 border border-primary-sage/30 rounded-lg p-4">
              <p className="text-sm text-text-dark mb-2">
                <strong>Content Warning:</strong> This assessment asks about potentially distressing experiences. If you feel
                overwhelmed at any point, it's okay to stop and seek support.
              </p>
              <p className="text-sm text-text-dark">
                <strong>Crisis Support:</strong> If you're in crisis, call 988 (Suicide & Crisis Lifeline) or text "HELLO" to 741741.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {!showResults ? (
            <AssessmentLayout
              questions={PCL5_QUESTIONS}
              responseOptions={RESPONSE_OPTIONS}
              responses={responses}
              onResponse={handleResponse}
              onSubmit={handleSubmit}
              onReset={handleReset}
              isComplete={isComplete()}
              completionPercentage={completionPercentage}
              questionPrefix="In the past month, how much were you bothered by:"
            />
          ) : (
            <div className="space-y-8">
              {/* Results Card */}
              <div className="card">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">Your Results</h2>
                  <div className="inline-block">
                    <div className={`text-6xl font-bold ${interpretation.color} mb-2`}>
                      {score}
                    </div>
                    <div className="text-sm text-warm-gray mb-4">out of 80</div>
                    <div className={`inline-block px-6 py-3 rounded-full ${interpretation.bgColor} ${interpretation.color} font-bold text-lg`}>
                      {interpretation.severity}
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-text-dark mb-3">What This Means</h3>
                  <p className="text-warm-gray mb-6">{interpretation.description}</p>

                  {/* Symptom Clusters */}
                  <h3 className="text-xl font-bold text-text-dark mb-3">Symptom Breakdown (DSM-5 Clusters)</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-clinical-blue/10 rounded-lg p-4">
                      <div className="font-bold text-clinical-blue mb-1">Intrusion: {clusters.intrusion}/20</div>
                      <div className="text-sm text-warm-gray">Unwanted memories, nightmares, flashbacks</div>
                    </div>
                    <div className="bg-earth-green/10 rounded-lg p-4">
                      <div className="font-bold text-earth-green mb-1">Avoidance: {clusters.avoidance}/8</div>
                      <div className="text-sm text-warm-gray">Avoiding trauma reminders</div>
                    </div>
                    <div className="bg-soft-rose/10 rounded-lg p-4">
                      <div className="font-bold text-soft-rose mb-1">Cognition & Mood: {clusters.cognitionMood}/28</div>
                      <div className="text-sm text-warm-gray">Negative thoughts and feelings</div>
                    </div>
                    <div className="bg-accent-gold/10 rounded-lg p-4">
                      <div className="font-bold text-accent-gold mb-1">Arousal: {clusters.arousal}/24</div>
                      <div className="text-sm text-warm-gray">Hypervigilance, reactivity, sleep issues</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-text-dark mb-3">Recommended Next Steps</h3>
                  <ul className="space-y-2 mb-6">
                    {interpretation.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-sage mr-2 flex-shrink-0">•</span>
                        <span className="text-warm-gray">{rec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-primary-sage/10 border border-primary-sage/30 rounded-lg p-6 mb-6">
                    <h4 className="font-bold text-primary-sage mb-2">Evidence-Based Treatments for PTSD</h4>
                    <p className="text-text-dark mb-3">
                      Highly effective treatments are available:
                    </p>
                    <ul className="space-y-2 text-text-dark text-sm">
                      <li>
                        <strong>Cognitive Processing Therapy (CPT):</strong> Helps process traumatic events and modify unhelpful beliefs
                      </li>
                      <li>
                        <strong>Prolonged Exposure (PE):</strong> Gradual exposure to trauma memories in a safe environment
                      </li>
                      <li>
                        <strong>Eye Movement Desensitization and Reprocessing (EMDR):</strong> Processes traumatic memories using bilateral stimulation
                      </li>
                      <li>
                        <strong>Medication:</strong> SSRIs and other medications can reduce symptoms when combined with therapy
                      </li>
                    </ul>
                    <p className="text-text-dark mt-3 text-sm">
                      At Lennox Fields, we offer EMDR therapy for trauma processing.
                    </p>
                  </div>

                  {score >= 31 && (
                    <div className="bg-alert-red/10 border border-alert-red/30 rounded-lg p-6 mb-6">
                      <h4 className="font-bold text-alert-red mb-2">If You're in Crisis</h4>
                      <p className="text-text-dark mb-3">
                        If you're experiencing thoughts of self-harm or suicide, help is available 24/7:
                      </p>
                      <div className="space-y-2 text-text-dark">
                        <p><strong>Call 988</strong> - Suicide & Crisis Lifeline</p>
                        <p><strong>Text "HELLO" to 741741</strong> - Crisis Text Line</p>
                        <p><strong>Call 1-800-273-8255</strong> - Veterans Crisis Line (Press 1)</p>
                        <p><strong>Visit your nearest emergency room</strong> if you feel unsafe</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={handleReset}
                    className="btn btn-outline flex-1"
                  >
                    Retake Assessment
                  </button>
                  <Link
                    href="/contact"
                    className="btn btn-primary flex-1 text-center"
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="card bg-primary-sage/5">
                <h3 className="text-2xl font-bold text-text-dark mb-4">Additional Resources</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link
                    href="/tools/screening-tools/phq-9"
                    className="bg-white rounded-lg p-4 hover:shadow-medium transition-shadow"
                  >
                    <h4 className="font-bold text-text-dark mb-1">Screen for Depression (PHQ-9)</h4>
                    <p className="text-sm text-warm-gray">PTSD often co-occurs with depression</p>
                  </Link>
                  <Link
                    href="/tools/safety-planning"
                    className="bg-white rounded-lg p-4 hover:shadow-medium transition-shadow"
                  >
                    <h4 className="font-bold text-text-dark mb-1">Create a Safety Plan</h4>
                    <p className="text-sm text-warm-gray">Prepare for difficult moments</p>
                  </Link>
                  <Link
                    href="/resources/worksheets"
                    className="bg-white rounded-lg p-4 hover:shadow-medium transition-shadow"
                  >
                    <h4 className="font-bold text-text-dark mb-1">Trauma Processing Worksheets</h4>
                    <p className="text-sm text-warm-gray">Tools for working through trauma</p>
                  </Link>
                  <Link
                    href="/services/individual-therapy"
                    className="bg-white rounded-lg p-4 hover:shadow-medium transition-shadow"
                  >
                    <h4 className="font-bold text-text-dark mb-1">EMDR Therapy</h4>
                    <p className="text-sm text-warm-gray">Evidence-based trauma treatment</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About PCL-5 */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-6 text-center">About the PCL-5</h2>
          <div className="prose max-w-none text-warm-gray">
            <p className="mb-4">
              The PCL-5 is a 20-item self-report measure that assesses the 20 DSM-5 symptoms of PTSD. It was developed
              by the National Center for PTSD and is one of the most widely used tools for screening and monitoring PTSD symptoms.
            </p>
            <p className="mb-4">
              A total score of 31-33 or higher suggests a probable PTSD diagnosis and warrants further assessment by a
              qualified mental health professional. The PCL-5 can also track symptoms over time and measure treatment effectiveness.
            </p>
            <p className="mb-4">
              <strong>Important:</strong> This is a screening tool, not a diagnostic instrument. Only a qualified mental
              health professional can diagnose PTSD through comprehensive clinical evaluation.
            </p>
            <p>
              If you've experienced trauma and are struggling, know that effective treatments exist and recovery is possible.
              Reaching out for professional help is a sign of strength, not weakness.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
