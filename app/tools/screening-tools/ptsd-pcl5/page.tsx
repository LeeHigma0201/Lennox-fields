'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Download, ArrowLeft } from 'lucide-react'
import AssessmentLayout from '@/components/assessments/AssessmentLayout'

const questions = [
  {
    id: 'q1',
    text: 'Repeated, disturbing, and unwanted memories of a stressful experience from the past?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q2',
    text: 'Repeated, disturbing, and unwanted dreams related to the stressful experience?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q3',
    text: 'Suddenly feeling or acting as if the stressful experience were happening again (as if you were reliving it)?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q4',
    text: 'Feeling very upset when reminded of the stressful experience?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q5',
    text: 'Having strong physical reactions when reminded of the stressful experience (for example, heart pounding, trouble breathing, sweating)?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q6',
    text: 'Avoiding memories, thoughts, or feelings related to the stressful experience?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q7',
    text: 'Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q8',
    text: 'Trouble remembering important parts of the stressful experience?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q9',
    text: 'Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q10',
    text: 'Blaming yourself or someone else for the stressful experience or what happened after it?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q11',
    text: 'Having negative feelings such as fear, anger, guilt, or shame?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q12',
    text: 'Loss of interest in activities that you used to enjoy?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q13',
    text: 'Feeling distant or cut off from other people?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q14',
    text: 'Difficulty feeling positive emotions (for example, being unable to feel happiness or have loving feelings for people close to you)?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q15',
    text: 'Irritability, anger, or aggression?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q16',
    text: 'Taking excessive risks or doing things that could cause you harm?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q17',
    text: 'Being "on guard" or watchful or on the lookout for danger?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q18',
    text: 'Feeling jumpy or easily startled?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q19',
    text: 'Having difficulty concentrating?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
    ],
  },
  {
    id: 'q20',
    text: 'Difficulty falling or staying asleep?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'A little bit' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Quite a bit' },
      { value: 4, label: 'Extremely' },
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

  let severity = ''
  let interpretation = ''
  let recommendations: string[] = []
  let color = ''
  let requiresUrgentCare = false

  if (total >= 0 && total <= 10) {
    severity = 'Minimal PTSD Symptoms'
    color = 'text-success-green'
    interpretation = 'Your responses suggest minimal PTSD symptoms. This is within the normal range.'
    recommendations = [
      'Continue practicing self-care and stress management',
      'Maintain healthy lifestyle habits (exercise, sleep, nutrition)',
      'Practice relaxation and mindfulness techniques as preventive measures',
      'Stay connected with supportive friends and family',
    ]
  } else if (total >= 11 && total <= 20) {
    severity = 'Mild PTSD Symptoms'
    color = 'text-accent-gold'
    interpretation = 'Your responses suggest mild PTSD symptoms. While you may be managing, support could be helpful.'
    recommendations = [
      'Consider cognitive processing therapy (CPT) or prolonged exposure therapy',
      'Practice grounding and coping strategies for when you feel triggered',
      'Maintain a regular routine including exercise and sleep',
      'Consider talking with a mental health professional about your experiences',
      'Build a strong support network of trusted friends and family',
    ]
  } else if (total >= 21 && total <= 35) {
    severity = 'Moderate PTSD Symptoms'
    color = 'text-warning-amber'
    interpretation = 'Your responses suggest moderate PTSD symptoms that may be interfering with your daily life. Professional support is recommended.'
    recommendations = [
      'Professional counseling is strongly recommended',
      'Trauma-focused cognitive behavioral therapy (TF-CBT) is highly effective',
      'Prolonged Exposure Therapy has strong research support for PTSD',
      'Consider evaluation by a mental health professional specializing in trauma',
      'Medication evaluation may be beneficial - consult with a psychiatrist',
      'Consider joining a support group for PTSD survivors',
    ]
  } else if (total >= 36 && total <= 51) {
    severity = 'Severe PTSD Symptoms'
    color = 'text-alert-red'
    interpretation = 'Your responses suggest severe PTSD symptoms that are significantly impacting your daily functioning. Professional treatment is strongly recommended.'
    recommendations = [
      'Professional treatment should be sought immediately',
      'Contact a mental health professional or trauma specialist as soon as possible',
      'Intensive evidence-based therapies like TF-CBT or CPT are recommended',
      'Psychiatric evaluation and medication may be necessary',
      'Consider crisis intervention services or intensive outpatient programs',
      'If having thoughts of self-harm, call 988 (Suicide & Crisis Lifeline) immediately',
      'Reach out to supportive friends, family, or community resources',
    ]
  } else {
    severity = 'Very Severe PTSD Symptoms'
    color = 'text-alert-red'
    interpretation = 'Your responses suggest very severe PTSD symptoms. Immediate professional intervention is critical.'
    recommendations = [
      'Immediate professional help is essential',
      'Call 988 (Suicide & Crisis Lifeline) or go to the emergency room',
      'Contact a trauma-specialized mental health professional urgently',
      'Hospitalization or intensive treatment may be necessary',
      'Do not delay seeking help - PTSD is treatable with proper support',
      'Tell someone you trust how you are feeling and what you need',
    ]
    requiresUrgentCare = true
  }

  return { total, severity, interpretation, recommendations, color, requiresUrgentCare }
}

export default function PCL5Page() {
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
                PCL-5 PTSD Checklist for DSM-5 Screening
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
                      Your responses indicate you may need urgent support. Please reach out for professional help right now.
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
              <p className="text-sm opacity-90">out of 80 points</p>
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
              Understanding PCL-5 Scores
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">0-10 points</span>
                <span className="text-success-green font-medium">Minimal PTSD Symptoms</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">11-20 points</span>
                <span className="text-accent-gold font-medium">Mild PTSD Symptoms</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">21-35 points</span>
                <span className="text-warning-amber font-medium">Moderate PTSD Symptoms</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">36-51 points</span>
                <span className="text-alert-red font-medium">Severe PTSD Symptoms</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">52-80 points</span>
                <span className="text-alert-red font-medium">Very Severe PTSD Symptoms</span>
              </div>
            </div>
          </div>

          {/* Professional Interpretation Guide */}
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Professional Interpretation Guide</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-text-dark mb-2">What These Scores Mean</h3>
                <p className="text-text-dark text-sm mb-4">
                  The PCL-5 is a 20-item self-report measurement of the 20 DSM-5 symptoms of Post-Traumatic Stress Disorder (PTSD).
                  Each item is rated on a 0-4 scale, with higher total scores indicating greater severity of PTSD symptoms.
                  The PCL-5 can be used as a screening tool and can aid in monitoring symptom severity over time.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-dark mb-2">Evidence-Based Treatments for PTSD</h3>
                <ul className="text-sm text-text-dark space-y-2 ml-4">
                  <li>- Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)</li>
                  <li>- Prolonged Exposure Therapy (PE)</li>
                  <li>- Cognitive Processing Therapy (CPT)</li>
                  <li>- Eye Movement Desensitization and Reprocessing (EMDR)</li>
                  <li>- Medication evaluation (SSRIs are first-line)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-text-dark mb-2">Key Clinical Considerations</h3>
                <ul className="text-sm text-text-dark space-y-2 ml-4">
                  <li>- This assessment measures symptom severity, not diagnosis</li>
                  <li>- A professional evaluation is necessary for formal PTSD diagnosis</li>
                  <li>- PTSD is a treatable condition - recovery is possible</li>
                  <li>- Scoring does not account for symptom duration or functional impairment</li>
                  <li>- Repeated assessment can track changes in symptoms over time</li>
                </ul>
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
            {(results.total >= 21) && (
              <Link href="/contact" className="btn btn-primary inline-flex items-center justify-center">
                Schedule Consultation
              </Link>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-clinical-blue/10 border-l-4 border-clinical-blue p-6 rounded">
            <p className="text-sm text-text-dark">
              <strong>Disclaimer:</strong> This screening tool is not a diagnostic instrument.
              Only a qualified mental health professional can provide a formal diagnosis of Post-Traumatic Stress Disorder (PTSD).
              If you are experiencing a mental health crisis or having thoughts of suicide or self-harm,
              please call 988 (Suicide & Crisis Lifeline) or visit your nearest emergency room immediately.
              This assessment is based on the PCL-5, a validated tool developed by the National Center for PTSD at the U.S. Department
              of Veterans Affairs and is used in clinical practice and research settings to measure PTSD symptom severity.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AssessmentLayout
      title="PCL-5: PTSD Checklist for DSM-5 Assessment"
      description="A validated screening tool to assess the severity of Post-Traumatic Stress Disorder (PTSD) symptoms related to a specific stressful experience."
      instructions="Below is a list of problems and complaints that sometimes occur after a person experiences a very stressful event. Please indicate how much you have been bothered by that problem in the past month. (In the past month...)"
      questions={questions}
      onComplete={handleComplete}
      scoringInfo={
        <div>
          <h3 className="font-bold text-text-dark mb-3">About the PCL-5</h3>
          <p className="text-sm text-warm-gray">
            The PCL-5 is a 20-item self-report measurement of the 20 DSM-5 symptoms of PTSD developed by the National Center
            for PTSD at the U.S. Department of Veterans Affairs. It is widely used in clinical practice, research, and primary
            care settings to identify and measure the severity of PTSD symptoms. The PCL-5 is available in the public domain
            and can be used freely without licensing fees. It typically takes 5-10 minutes to complete.
          </p>
        </div>
      }
    />
  )
}
