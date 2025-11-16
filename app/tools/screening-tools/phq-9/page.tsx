'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Download, ArrowLeft } from 'lucide-react'
import AssessmentLayout from '@/components/assessments/AssessmentLayout'

const questions = [
  {
    id: 'q1',
    text: 'Little interest or pleasure in doing things',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q2',
    text: 'Feeling down, depressed, or hopeless',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q3',
    text: 'Trouble falling or staying asleep, or sleeping too much',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q4',
    text: 'Feeling tired or having little energy',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q5',
    text: 'Poor appetite or overeating',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q6',
    text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q7',
    text: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q8',
    text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q9',
    text: 'Thoughts that you would be better off dead or of hurting yourself in some way',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
]

function calculateScore(responses: Record<string, number>): {
  total: number
  severity: string
  interpretation: string
  recommendations: string[]
  color: string
  requiresUrgentCare: boolean
} {
  const total = Object.values(responses).reduce((sum, val) => sum + val, 0)
  const q9Score = responses['q9'] || 0

  let severity = ''
  let interpretation = ''
  let recommendations: string[] = []
  let color = ''
  let requiresUrgentCare = false

  if (total >= 0 && total <= 4) {
    severity = 'Minimal Depression'
    color = 'text-success-green'
    interpretation = 'Your responses suggest minimal depressive symptoms. This is within the normal range.'
    recommendations = [
      'Continue practicing self-care and stress management',
      'Maintain healthy lifestyle habits (exercise, sleep, nutrition)',
      'Engage in activities that bring you joy and satisfaction',
      'Stay connected with supportive friends and family',
    ]
  } else if (total >= 5 && total <= 9) {
    severity = 'Mild Depression'
    color = 'text-accent-gold'
    interpretation = 'Your responses suggest mild depressive symptoms. While manageable, it may be helpful to develop coping strategies.'
    recommendations = [
      'Increase physical activity - exercise is beneficial for mood',
      'Practice good sleep hygiene and maintain a regular schedule',
      'Engage in pleasant activities and hobbies regularly',
      'Consider talking with a trusted friend, family member, or counselor',
      'Monitor your symptoms - if they worsen, seek professional support',
    ]
  } else if (total >= 10 && total <= 14) {
    severity = 'Moderate Depression'
    color = 'text-warning-amber'
    interpretation = 'Your responses suggest moderate depressive symptoms that may be interfering with your daily life. Professional support is recommended.'
    recommendations = [
      'Professional counseling is recommended',
      'Cognitive Behavioral Therapy (CBT) is highly effective for depression',
      'Consider evaluation by a mental health professional',
      'Your primary care physician can also help with treatment options',
      'Discuss medication options if appropriate with a healthcare provider',
      'Establish a routine that includes sleep, meals, and physical activity',
    ]
  } else if (total >= 15 && total <= 19) {
    severity = 'Moderately Severe Depression'
    color = 'text-alert-red'
    interpretation = 'Your responses suggest moderately severe depressive symptoms that are likely significantly impacting your daily functioning. Professional treatment is strongly recommended.'
    recommendations = [
      'Professional treatment is strongly recommended as soon as possible',
      'Schedule an appointment with a mental health professional or psychiatrist',
      'Contact your primary care physician to discuss treatment options',
      'Both therapy and medication evaluation may be beneficial',
      'If having thoughts of self-harm, call 988 (Suicide & Crisis Lifeline) immediately',
      'Reach out to supportive friends, family, or community resources',
      'Avoid major decisions while experiencing severe depression',
    ]
  } else {
    severity = 'Severe Depression'
    color = 'text-alert-red'
    interpretation = 'Your responses suggest severe depressive symptoms. Immediate professional intervention is important.'
    recommendations = [
      'Professional treatment is critical and should be sought immediately',
      'Call 988 (Suicide & Crisis Lifeline) to speak with someone right now',
      'Go to your nearest emergency room if you are in immediate danger',
      'Contact a mental health crisis service in your area',
      'Tell someone you trust how you are feeling',
      'Both intensive therapy and medication are likely needed',
    ]
    requiresUrgentCare = true
  }

  // If suicidal ideation is present at any severity level, add urgent note
  if (q9Score > 0) {
    if (!recommendations.some(r => r.includes('988'))) {
      recommendations.unshift('If you are having any thoughts of suicide or self-harm, please call 988 (Suicide & Crisis Lifeline) immediately')
    }
  }

  return { total, severity, interpretation, recommendations, color, requiresUrgentCare }
}

export default function PHQ9Page() {
  const [results, setResults] = useState<ReturnType<typeof calculateScore> | null>(null)

  const handleComplete = (responses: Record<string, number>) => {
    const score = calculateScore(responses)
    setResults(score)
  }

  if (results) {
    return (
      <div className="min-h-screen gradient-warm-bg py-12">
        <div className="container-custom max-w-4xl">
          {/* Results Header */}
          <div className="bg-white rounded-xl shadow-strong p-8 mb-8">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-success-green mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-text-dark mb-2">
                Assessment Complete
              </h1>
              <p className="text-lg text-warm-gray">
                PHQ-9 Patient Health Questionnaire Depression Screening
              </p>
            </div>

            {/* Urgent Care Alert */}
            {results.requiresUrgentCare && (
              <div className="bg-alert-red/10 border-2 border-alert-red rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-alert-red mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-alert-red mb-2">Immediate Help Needed</p>
                    <p className="text-text-dark mb-3">
                      Your responses indicate you may be in crisis. Please reach out for help right now.
                    </p>
                    <p className="font-semibold text-text-dark">
                      Call 988 (Suicide & Crisis Lifeline) • Available 24/7
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Score Display */}
            <div className="bg-gradient-sage-bg text-white rounded-lg p-8 text-center mb-8">
              <p className="text-lg mb-2 opacity-90">Your Score</p>
              <p className="text-6xl font-bold mb-2">{results.total}</p>
              <p className="text-sm opacity-90">out of 27 points</p>
            </div>

            {/* Severity */}
            <div className="text-center mb-8">
              <p className="text-sm text-warm-gray mb-2">Severity Level</p>
              <p className={`text-3xl font-bold ${results.color}`}>
                {results.severity}
              </p>
            </div>

            {/* Interpretation */}
            <div className="bg-cream rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-dark mb-3">Interpretation</h2>
              <p className="text-text-dark leading-relaxed">{results.interpretation}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Recommendations</h2>
            <ul className="space-y-4">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-clinical-blue mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Understanding Your Score */}
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">
              Understanding PHQ-9 Scores
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">0-4 points</span>
                <span className="text-success-green font-medium">Minimal Depression</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">5-9 points</span>
                <span className="text-accent-gold font-medium">Mild Depression</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">10-14 points</span>
                <span className="text-warning-amber font-medium">Moderate Depression</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">15-19 points</span>
                <span className="text-alert-red font-medium">Moderately Severe Depression</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">20-27 points</span>
                <span className="text-alert-red font-medium">Severe Depression</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/tools/screening-tools" className="btn btn-outline inline-flex items-center justify-center">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Screening Tools
            </Link>
            <button className="btn btn-secondary inline-flex items-center justify-center">
              <Download className="mr-2 w-5 h-5" />
              Download Results (PDF)
            </button>
            {(results.total >= 10) && (
              <Link href="/contact" className="btn btn-primary inline-flex items-center justify-center">
                Schedule Consultation
              </Link>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-clinical-blue/10 border-l-4 border-clinical-blue p-6 rounded">
            <p className="text-sm text-text-dark">
              <strong>Disclaimer:</strong> This screening tool is not a diagnostic instrument.
              Only a qualified mental health professional can provide a formal diagnosis of depression.
              If you are experiencing thoughts of suicide or self-harm, please call 988 (Suicide & Crisis Lifeline)
              or visit your nearest emergency room immediately. This assessment is based on the PHQ-9,
              a validated tool developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and colleagues.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AssessmentLayout
      title="PHQ-9: Patient Health Questionnaire Depression Assessment"
      description="A brief, validated screening tool to assess the severity of depressive symptoms over the past 2 weeks."
      instructions="Over the last 2 weeks, how often have you been bothered by any of the following problems?"
      questions={questions}
      onComplete={handleComplete}
      scoringInfo={
        <div>
          <h3 className="font-bold text-text-dark mb-3">About the PHQ-9</h3>
          <p className="text-sm text-warm-gray">
            The PHQ-9 is a validated screening and severity measure for depression developed by
            Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and colleagues. It is widely used
            in clinical practice, research, and primary care settings to identify and measure the severity
            of depressive symptoms. The tool is based on the DSM-IV diagnostic criteria for Major Depressive Disorder.
          </p>
        </div>
      }
    />
  )
}
