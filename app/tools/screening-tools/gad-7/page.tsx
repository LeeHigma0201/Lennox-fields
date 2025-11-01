'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Download, ArrowLeft } from 'lucide-react'
import AssessmentLayout from '@/components/assessments/AssessmentLayout'

const questions = [
  {
    id: 'q1',
    text: 'Feeling nervous, anxious, or on edge',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q2',
    text: 'Not being able to stop or control worrying',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q3',
    text: 'Worrying too much about different things',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q4',
    text: 'Trouble relaxing',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q5',
    text: 'Being so restless that it\'s hard to sit still',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q6',
    text: 'Becoming easily annoyed or irritable',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' },
    ],
  },
  {
    id: 'q7',
    text: 'Feeling afraid as if something awful might happen',
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
} {
  const total = Object.values(responses).reduce((sum, val) => sum + val, 0)

  let severity = ''
  let interpretation = ''
  let recommendations: string[] = []
  let color = ''

  if (total >= 0 && total <= 4) {
    severity = 'Minimal Anxiety'
    color = 'text-success-green'
    interpretation = 'Your responses suggest minimal anxiety symptoms. This is within the normal range.'
    recommendations = [
      'Continue practicing self-care and stress management',
      'Maintain healthy lifestyle habits (exercise, sleep, nutrition)',
      'Consider mindfulness or meditation practices',
    ]
  } else if (total >= 5 && total <= 9) {
    severity = 'Mild Anxiety'
    color = 'text-accent-gold'
    interpretation = 'Your responses suggest mild anxiety symptoms. While manageable, it may be helpful to develop coping strategies.'
    recommendations = [
      'Practice relaxation techniques (deep breathing, progressive muscle relaxation)',
      'Regular exercise can significantly reduce anxiety symptoms',
      'Consider self-help resources or supportive counseling',
      'Monitor your symptoms - if they worsen, seek professional support',
    ]
  } else if (total >= 10 && total <= 14) {
    severity = 'Moderate Anxiety'
    color = 'text-warning-amber'
    interpretation = 'Your responses suggest moderate anxiety symptoms that may be interfering with your daily life.'
    recommendations = [
      'Professional counseling is recommended',
      'Cognitive Behavioral Therapy (CBT) is highly effective for anxiety',
      'Learn and practice anxiety management techniques',
      'Consider evaluation by a mental health professional',
      'Rule out any medical causes with your physician',
    ]
  } else {
    severity = 'Severe Anxiety'
    color = 'text-alert-red'
    interpretation = 'Your responses suggest severe anxiety symptoms that are likely significantly impacting your daily functioning.'
    recommendations = [
      'Professional treatment is strongly recommended',
      'Contact a mental health professional as soon as possible',
      'Consider both therapy and medication evaluation',
      'If experiencing thoughts of self-harm, call 988 (Suicide & Crisis Lifeline) immediately',
      'Reach out to supportive friends, family, or community resources',
    ]
  }

  return { total, severity, interpretation, recommendations, color }
}

export default function GAD7Page() {
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
                GAD-7 Generalized Anxiety Disorder Screening
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-gradient-sage-bg text-white rounded-lg p-8 text-center mb-8">
              <p className="text-lg mb-2 opacity-90">Your Score</p>
              <p className="text-6xl font-bold mb-2">{results.total}</p>
              <p className="text-sm opacity-90">out of 21 points</p>
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
              Understanding GAD-7 Scores
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">0-4 points</span>
                <span className="text-success-green font-medium">Minimal Anxiety</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">5-9 points</span>
                <span className="text-accent-gold font-medium">Mild Anxiety</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">10-14 points</span>
                <span className="text-warning-amber font-medium">Moderate Anxiety</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">15-21 points</span>
                <span className="text-alert-red font-medium">Severe Anxiety</span>
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
              Only a qualified mental health professional can provide a formal diagnosis.
              If you are experiencing a mental health crisis, please call 988 (Suicide & Crisis Lifeline)
              or visit your nearest emergency room.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AssessmentLayout
      title="GAD-7: Generalized Anxiety Disorder Assessment"
      description="A brief, validated screening tool to assess the severity of generalized anxiety disorder symptoms over the past 2 weeks."
      instructions="Over the last 2 weeks, how often have you been bothered by the following problems?"
      questions={questions}
      onComplete={handleComplete}
      scoringInfo={
        <div>
          <h3 className="font-bold text-text-dark mb-3">About the GAD-7</h3>
          <p className="text-sm text-warm-gray">
            The GAD-7 is a validated screening tool developed by Drs. Robert L. Spitzer, Janet B.W. Williams,
            Kurt Kroenke and colleagues. It is widely used in clinical practice and research to measure
            the severity of generalized anxiety disorder.
          </p>
        </div>
      }
    />
  )
}
