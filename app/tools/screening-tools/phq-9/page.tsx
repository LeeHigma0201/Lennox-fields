'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import AssessmentLayout from '@/components/assessments/AssessmentLayout'
import CrisisResources from '@/components/CrisisResources'

const PHQ9_QUESTIONS_TEXT = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
  'Trouble concentrating on things, such as reading the newspaper or watching television',
  'Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
  'Thoughts that you would be better off dead, or of hurting yourself in some way',
]

const RESPONSE_OPTIONS = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
]

const PHQ9_QUESTIONS = PHQ9_QUESTIONS_TEXT.map((text, index) => ({
  id: `phq9-${index}`,
  text,
  options: RESPONSE_OPTIONS,
}))

export default function PHQ9Page() {
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleComplete = (newResponses: Record<string, number>) => {
    setResponses(newResponses)
    setShowResults(true)
  }

  const handleReset = () => {
    setResponses({})
    setShowResults(false)
  }

  const calculateScore = () => {
    return Object.values(responses).reduce((sum, value) => sum + value, 0)
  }

  const getInterpretation = (score: number) => {
    if (score <= 4) {
      return {
        severity: 'Minimal Depression',
        color: 'text-earth-green',
        bgColor: 'bg-earth-green/10',
        description: 'Your responses suggest minimal or no depression. Continue monitoring your mental health and practice self-care.',
        recommendations: [
          'Maintain healthy lifestyle habits (exercise, sleep, nutrition)',
          'Continue activities you enjoy',
          'Stay connected with supportive people',
          'Practice stress management techniques',
        ],
      }
    } else if (score <= 9) {
      return {
        severity: 'Mild Depression',
        color: 'text-accent-gold',
        bgColor: 'bg-accent-gold/10',
        description: 'Your responses suggest mild depression. Consider implementing coping strategies and monitoring symptoms.',
        recommendations: [
          'Increase physical activity and outdoor time',
          'Maintain regular sleep schedule',
          'Connect with friends and family',
          'Consider therapy or counseling',
          'Use mood tracking to identify patterns',
          'Practice mindfulness or meditation',
        ],
      }
    } else if (score <= 14) {
      return {
        severity: 'Moderate Depression',
        color: 'text-soft-rose',
        bgColor: 'bg-soft-rose/10',
        description: 'Your responses suggest moderate depression. Professional support is recommended to help you feel better.',
        recommendations: [
          'Schedule an appointment with a mental health professional',
          'Consider therapy (CBT is highly effective for depression)',
          'Discuss symptoms with your primary care doctor',
          'Maintain daily structure and routine',
          'Engage in behavioral activation (scheduling pleasant activities)',
          'Lean on your support system',
        ],
      }
    } else if (score <= 19) {
      return {
        severity: 'Moderately Severe Depression',
        color: 'text-alert-red',
        bgColor: 'bg-alert-red/10',
        description: 'Your responses suggest moderately severe depression. Professional treatment is strongly recommended.',
        recommendations: [
          'Contact a mental health professional as soon as possible',
          'Consider both therapy and medication evaluation',
          'Inform a trusted friend or family member about how you\'re feeling',
          'Avoid isolation - stay connected with others',
          'If you have thoughts of self-harm, seek immediate help',
          'Call 988 (Suicide & Crisis Lifeline) if in crisis',
        ],
      }
    } else {
      return {
        severity: 'Severe Depression',
        color: 'text-alert-red',
        bgColor: 'bg-alert-red/10',
        description: 'Your responses suggest severe depression. Immediate professional help is strongly recommended.',
        recommendations: [
          'Seek professional help immediately',
          'Contact a mental health professional or crisis service',
          'Consider comprehensive treatment (therapy + medication)',
          'Do not isolate yourself - reach out for support',
          'If experiencing thoughts of self-harm or suicide, call 988 immediately',
          'Visit an emergency room if you feel you cannot keep yourself safe',
        ],
      }
    }
  }

  const score = calculateScore()
  const interpretation = getInterpretation(score)
  // Item 9 (id phq9-8) screens for suicidal ideation. ANY endorsement (>= 1) must
  // surface crisis support regardless of total score — standard PHQ-9 safety practice.
  const item9 = responses['phq9-8'] ?? 0

  return (
    <div className="min-h-screen bg-cream">
        <div className="container-custom max-w-4xl">
          {!showResults ? (
            <AssessmentLayout
              title="PHQ-9: Depression Screening"
              description="The Patient Health Questionnaire (PHQ-9) is a widely-used clinical tool that screens for depression severity. This validated assessment helps identify symptoms and guide treatment decisions."
              instructions="Over the last 2 weeks, how often have you been bothered by any of the following problems? Please answer all 9 questions honestly. Your responses are private and not stored anywhere."
              questions={PHQ9_QUESTIONS}
              onComplete={handleComplete}
              scoringInfo={
                <div className="bg-primary-sage/10 border border-primary-sage/30 rounded-lg p-4">
                <p className="text-sm text-text-dark">
                  <strong>Important:</strong> This is a screening tool, not a diagnosis. If you're concerned about your
                  mental health, please consult with a qualified mental health professional.
                </p>
              </div>
              }
            />
          ) : (
            <div className="space-y-8">
              {/* Results Card */}
              <div className="card">
                {item9 >= 1 && (
                  <div className="bg-alert-red/10 border-2 border-alert-red rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-alert-red mb-2">Your safety comes first</h3>
                    <p className="text-text-dark mb-4">
                      You said you&apos;ve had thoughts that you would be better off dead, or of hurting
                      yourself. Thank you for answering honestly — that takes courage. Whatever your total
                      score is, please know that support is available right now, and you deserve it.
                    </p>
                    <CrisisResources heading={null} intro="" />
                  </div>
                )}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">Your Results</h2>
                  <div className="inline-block">
                    <div className={`text-6xl font-bold ${interpretation.color} mb-2`}>
                      {score}
                    </div>
                    <div className="text-sm text-warm-gray mb-4">out of 27</div>
                    <div className={`inline-block px-6 py-3 rounded-full ${interpretation.bgColor} ${interpretation.color} font-bold text-lg`}>
                      {interpretation.severity}
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-text-dark mb-3">What This Means</h3>
                  <p className="text-warm-gray mb-6">{interpretation.description}</p>

                  <h3 className="text-xl font-bold text-text-dark mb-3">Recommended Next Steps</h3>
                  <ul className="space-y-2 mb-6">
                    {interpretation.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-sage mr-2 flex-shrink-0">•</span>
                        <span className="text-warm-gray">{rec}</span>
                      </li>
                    ))}
                  </ul>

                  {score >= 10 && item9 === 0 && <CrisisResources className="mb-6" />}

                  <h3 className="text-xl font-bold text-text-dark mb-3">Understanding Your Score</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-earth-green/10 rounded-lg p-4">
                      <div className="font-bold text-earth-green mb-1">0-4: Minimal</div>
                      <div className="text-sm text-warm-gray">Monitor and maintain wellness</div>
                    </div>
                    <div className="bg-accent-gold/10 rounded-lg p-4">
                      <div className="font-bold text-accent-gold mb-1">5-9: Mild</div>
                      <div className="text-sm text-warm-gray">Watchful waiting; consider counseling</div>
                    </div>
                    <div className="bg-soft-rose/10 rounded-lg p-4">
                      <div className="font-bold text-soft-rose mb-1">10-14: Moderate</div>
                      <div className="text-sm text-warm-gray">Treatment recommended</div>
                    </div>
                    <div className="bg-alert-red/10 rounded-lg p-4">
                      <div className="font-bold text-alert-red mb-1">15-27: Severe</div>
                      <div className="text-sm text-warm-gray">Immediate treatment warranted</div>
                    </div>
                  </div>
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
                    href="/tools/screening-tools/gad-7"
                    className="bg-white rounded-lg p-4 hover:shadow-medium transition-shadow"
                  >
                    <h4 className="font-bold text-text-dark mb-1">Screen for Anxiety (GAD-7)</h4>
                    <p className="text-sm text-warm-gray">Depression and anxiety often occur together</p>
                  </Link>
                  <Link
                    href="/tools/safety-planning"
                    className="bg-white rounded-lg p-4 hover:shadow-medium transition-shadow"
                  >
                    <h4 className="font-bold text-text-dark mb-1">Create a Safety Plan</h4>
                    <p className="text-sm text-warm-gray">Plan ahead for crisis moments</p>
                  </Link>
                  <Link
                    href="/resources/worksheets"
                    className="bg-white rounded-lg p-4 hover:shadow-medium transition-shadow"
                  >
                    <h4 className="font-bold text-text-dark mb-1">Depression Worksheets</h4>
                    <p className="text-sm text-warm-gray">CBT tools for managing depression</p>
                  </Link>
                  <Link
                    href="/services/individual-therapy"
                    className="bg-white rounded-lg p-4 hover:shadow-medium transition-shadow"
                  >
                    <h4 className="font-bold text-text-dark mb-1">Individual Therapy</h4>
                    <p className="text-sm text-warm-gray">Learn about treatment options</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

      {/* About PHQ-9 */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-6 text-center">About the PHQ-9</h2>
          <div className="prose max-w-none">
            <p className="text-warm-gray mb-4">
              The Patient Health Questionnaire-9 (PHQ-9) is one of the most validated tools for screening, diagnosing,
              monitoring, and measuring the severity of depression. Developed by Drs. Robert L. Spitzer, Janet B.W. Williams,
              Kurt Kroenke, and colleagues, it's used by healthcare providers worldwide.
            </p>
            <p className="text-warm-gray mb-4">
              The PHQ-9 is based on the nine DSM-IV criteria for major depressive disorder. A score of 10 or greater
              is considered a clinically significant indication of depression, warranting further evaluation and treatment.
            </p>
            <p className="text-warm-gray">
              Regular screening can help track symptoms over time and measure treatment effectiveness. Consider retaking
              this assessment every 2-4 weeks if you're experiencing depression symptoms or currently in treatment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
