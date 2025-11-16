'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Download, ArrowLeft } from 'lucide-react'
import AssessmentLayout from '@/components/assessments/AssessmentLayout'

const questions = [
  {
    id: 'q1',
    text: 'Sadness',
    options: [
      { value: 0, label: 'I do not feel sad' },
      { value: 1, label: 'I feel sad much of the time' },
      { value: 2, label: 'I am sad all the time' },
      { value: 3, label: 'I am so sad or unhappy that I can\'t stand it' },
    ],
  },
  {
    id: 'q2',
    text: 'Pessimism',
    options: [
      { value: 0, label: 'I am not discouraged about my future' },
      { value: 1, label: 'I feel more discouraged about my future than I used to' },
      { value: 2, label: 'I do not expect things to work out for me' },
      { value: 3, label: 'I expect the worst and my future is hopeless' },
    ],
  },
  {
    id: 'q3',
    text: 'Past Failure',
    options: [
      { value: 0, label: 'I do not feel like a failure' },
      { value: 1, label: 'I have failed more than I should have' },
      { value: 2, label: 'As I look back on my life, I see a lot of failures' },
      { value: 3, label: 'I feel I am a complete failure as a person' },
    ],
  },
  {
    id: 'q4',
    text: 'Loss of Pleasure',
    options: [
      { value: 0, label: 'I get as much pleasure as I ever did' },
      { value: 1, label: 'I don\'t enjoy things as much as I used to' },
      { value: 2, label: 'I get very little pleasure from the things I used to enjoy' },
      { value: 3, label: 'I can\'t get any pleasure from the things I used to enjoy' },
    ],
  },
  {
    id: 'q5',
    text: 'Guilty Feelings',
    options: [
      { value: 0, label: 'I don\'t feel particularly guilty' },
      { value: 1, label: 'I feel guilty much of the time' },
      { value: 2, label: 'I feel quite guilty most of the time' },
      { value: 3, label: 'I feel guilty all the time' },
    ],
  },
  {
    id: 'q6',
    text: 'Punishment Feelings',
    options: [
      { value: 0, label: 'I don\'t feel I am being punished' },
      { value: 1, label: 'I feel I may be punished' },
      { value: 2, label: 'I expect to be punished' },
      { value: 3, label: 'I feel I am being punished' },
    ],
  },
  {
    id: 'q7',
    text: 'Self-Dislike',
    options: [
      { value: 0, label: 'I feel the same about myself as ever' },
      { value: 1, label: 'I have lost confidence in myself' },
      { value: 2, label: 'I am disappointed in myself' },
      { value: 3, label: 'I dislike myself' },
    ],
  },
  {
    id: 'q8',
    text: 'Self-Criticism',
    options: [
      { value: 0, label: 'I don\'t criticize or blame myself more than usual' },
      { value: 1, label: 'I am more critical of myself than I used to be' },
      { value: 2, label: 'I criticize myself for all of my faults' },
      { value: 3, label: 'I blame myself for everything bad that happens' },
    ],
  },
  {
    id: 'q9',
    text: 'Suicidal Thoughts or Wishes',
    options: [
      { value: 0, label: 'I don\'t have any thoughts of killing myself' },
      { value: 1, label: 'I have thoughts of killing myself, but I would not carry them out' },
      { value: 2, label: 'I would like to kill myself' },
      { value: 3, label: 'I would kill myself if I had the chance' },
    ],
  },
  {
    id: 'q10',
    text: 'Crying',
    options: [
      { value: 0, label: 'I don\'t cry anymore than I used to' },
      { value: 1, label: 'I cry more now than I used to' },
      { value: 2, label: 'I cry over every little thing' },
      { value: 3, label: 'I feel like crying but I can\'t' },
    ],
  },
  {
    id: 'q11',
    text: 'Agitation',
    options: [
      { value: 0, label: 'I am no more irritated now than I ever am' },
      { value: 1, label: 'I am more irritated than I used to be' },
      { value: 2, label: 'I am much more irritated now than I used to be' },
      { value: 3, label: 'I am irritated all the time now' },
    ],
  },
  {
    id: 'q12',
    text: 'Loss of Interest',
    options: [
      { value: 0, label: 'I have not lost interest in other people or activities' },
      { value: 1, label: 'I am less interested in other people or things than before' },
      { value: 2, label: 'I have lost most of my interest in other people or things' },
      { value: 3, label: 'It\'s hard to get interested in anything' },
    ],
  },
  {
    id: 'q13',
    text: 'Indecisiveness',
    options: [
      { value: 0, label: 'I make decisions about as well as I ever could' },
      { value: 1, label: 'I find it more difficult to make decisions than usual' },
      { value: 2, label: 'I have much greater difficulty in making decisions than I used to' },
      { value: 3, label: 'I can\'t make any decisions at all anymore' },
    ],
  },
  {
    id: 'q14',
    text: 'Worthlessness',
    options: [
      { value: 0, label: 'I don\'t feel worthless' },
      { value: 1, label: 'I don\'t consider myself as worthwhile and useful as I used to' },
      { value: 2, label: 'I feel more worthless as compared to other people' },
      { value: 3, label: 'I feel utterly worthless' },
    ],
  },
  {
    id: 'q15',
    text: 'Loss of Energy',
    options: [
      { value: 0, label: 'I have as much energy as ever' },
      { value: 1, label: 'I have less energy than I used to have' },
      { value: 2, label: 'I don\'t have enough energy to do very much' },
      { value: 3, label: 'I don\'t have enough energy to do anything' },
    ],
  },
  {
    id: 'q16',
    text: 'Changes in Sleep Pattern',
    options: [
      { value: 0, label: 'I have not experienced any change in my sleeping pattern' },
      { value: 1, label: 'I sleep somewhat more than usual' },
      { value: 2, label: 'I sleep somewhat less than usual' },
      { value: 3, label: 'I sleep much more than usual OR much less than usual' },
    ],
  },
  {
    id: 'q17',
    text: 'Irritability',
    options: [
      { value: 0, label: 'I am not more irritable than usual' },
      { value: 1, label: 'I am more irritable than usual' },
      { value: 2, label: 'I am much more irritable than usual' },
      { value: 3, label: 'I am irritable all the time' },
    ],
  },
  {
    id: 'q18',
    text: 'Changes in Appetite',
    options: [
      { value: 0, label: 'I have not experienced any change in my appetite' },
      { value: 1, label: 'My appetite is somewhat less than usual' },
      { value: 2, label: 'My appetite is somewhat greater than usual' },
      { value: 3, label: 'My appetite is much greater or much less than usual' },
    ],
  },
  {
    id: 'q19',
    text: 'Difficulty Concentrating',
    options: [
      { value: 0, label: 'I can concentrate as well as ever' },
      { value: 1, label: 'I cannot concentrate as well as usual' },
      { value: 2, label: 'It is hard to keep my mind on anything for very long' },
      { value: 3, label: 'I find I cannot concentrate on anything' },
    ],
  },
  {
    id: 'q20',
    text: 'Tiredness or Fatigue',
    options: [
      { value: 0, label: 'I am no more tired or fatigued than usual' },
      { value: 1, label: 'I get more tired or fatigued more easily than usual' },
      { value: 2, label: 'I am too tired or fatigued to do a lot of the things I used to do' },
      { value: 3, label: 'I am too tired or fatigued to do most of the things I used to do' },
    ],
  },
  {
    id: 'q21',
    text: 'Loss of Interest in Sex',
    options: [
      { value: 0, label: 'I have not noticed any recent change in my interest in sex' },
      { value: 1, label: 'I am less interested in sex than I used to be' },
      { value: 2, label: 'I am much less interested in sex now' },
      { value: 3, label: 'I have lost interest in sex completely' },
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

  if (total >= 0 && total <= 13) {
    severity = 'Minimal Depression'
    color = 'text-success-green'
    interpretation = 'Your responses suggest minimal depressive symptoms. This is within the normal range.'
    recommendations = [
      'Continue practicing self-care and stress management',
      'Maintain healthy lifestyle habits (exercise, sleep, nutrition)',
      'Engage in activities that bring you joy and satisfaction',
      'Stay connected with supportive friends and family',
    ]
  } else if (total >= 14 && total <= 19) {
    severity = 'Mild Depression'
    color = 'text-accent-gold'
    interpretation = 'Your responses suggest mild depressive symptoms. While manageable, it may be helpful to develop coping strategies.'
    recommendations = [
      'Increase physical activity - regular exercise is beneficial for mood',
      'Practice good sleep hygiene and maintain a consistent sleep schedule',
      'Engage in pleasant activities and hobbies regularly',
      'Consider talking with a trusted friend, family member, or counselor',
      'Monitor your symptoms - if they worsen, seek professional support',
    ]
  } else if (total >= 20 && total <= 28) {
    severity = 'Moderate Depression'
    color = 'text-warning-amber'
    interpretation = 'Your responses suggest moderate depressive symptoms that may be interfering with your daily life. Professional support is recommended.'
    recommendations = [
      'Professional counseling is recommended',
      'Cognitive Behavioral Therapy (CBT) is highly effective for depression',
      'Consider evaluation by a mental health professional',
      'Your primary care physician can help with treatment options',
      'Discuss medication options if appropriate with a healthcare provider',
      'Establish a routine that includes sleep, meals, and physical activity',
    ]
  } else {
    severity = 'Severe Depression'
    color = 'text-alert-red'
    interpretation = 'Your responses suggest severe depressive symptoms that are likely significantly impacting your daily functioning. Immediate professional intervention is important.'
    recommendations = [
      'Professional treatment is critical and should be sought immediately',
      'Schedule an appointment with a mental health professional or psychiatrist',
      'Contact your primary care physician to discuss urgent treatment options',
      'Both intensive therapy and medication evaluation are likely needed',
      'Call 988 (Suicide & Crisis Lifeline) to speak with someone right now',
      'Go to your nearest emergency room if you are in immediate danger',
      'Tell someone you trust how you are feeling',
    ]
    requiresUrgentCare = true
  }

  // If suicidal ideation is present at any severity level, add urgent note
  if (q9Score > 0) {
    if (!recommendations.some(r => r.includes('988'))) {
      recommendations.unshift('If you are having any thoughts of suicide or self-harm, please call 988 (Suicide & Crisis Lifeline) immediately')
    }
    if (q9Score >= 2) {
      requiresUrgentCare = true
    }
  }

  return { total, severity, interpretation, recommendations, color, requiresUrgentCare }
}

export default function BDIPage() {
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
                Beck Depression Inventory (BDI-II) Screening
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
              <p className="text-sm opacity-90">out of 63 points</p>
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
              Understanding BDI-II Scores
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">0-13 points</span>
                <span className="text-success-green font-medium">Minimal Depression</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">14-19 points</span>
                <span className="text-accent-gold font-medium">Mild Depression</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">20-28 points</span>
                <span className="text-warning-amber font-medium">Moderate Depression</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <span className="font-semibold text-text-dark">29-63 points</span>
                <span className="text-alert-red font-medium">Severe Depression</span>
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
                  The Beck Depression Inventory-II (BDI-II) is a 21-item self-report assessment instrument for measuring the severity of depressive symptoms in adolescents and adults. Each item is rated on a 0-3 scale, with higher total scores indicating greater severity of depressive symptoms.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-text-dark mb-2">Key Clinical Considerations</h3>
                <ul className="text-sm text-text-dark space-y-2 ml-4">
                  <li>- This assessment measures symptom severity, not diagnosis</li>
                  <li>- A professional evaluation is necessary for formal diagnosis</li>
                  <li>- Scores may be elevated during normal grief or adjustment periods</li>
                  <li>- Scores should be interpreted in context with medical history and other information</li>
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
            {(results.total >= 20) && (
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
              or visit your nearest emergency room immediately. This assessment is based on the BDI-II,
              a validated tool developed by Aaron T. Beck and colleagues, and is used in clinical practice
              and research settings to measure depressive symptom severity.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AssessmentLayout
      title="BDI-II: Beck Depression Inventory Assessment"
      description="A comprehensive, validated screening tool to assess the severity of depressive symptoms."
      instructions="Please read each group of statements carefully. Select the one statement in each group that best describes how you have been feeling over the past two weeks, including today."
      questions={questions}
      onComplete={handleComplete}
      scoringInfo={
        <div>
          <h3 className="font-bold text-text-dark mb-3">About the BDI-II</h3>
          <p className="text-sm text-warm-gray">
            The Beck Depression Inventory-II (BDI-II) is a 21-item self-report assessment instrument
            developed by Aaron T. Beck and colleagues. It is widely used in clinical practice and research
            to measure the severity of depressive symptoms in adolescents and adults (age 13 and older).
            The BDI-II takes approximately 5-10 minutes to complete and has strong psychometric properties
            for assessing depression severity across diverse populations.
          </p>
        </div>
      }
    />
  )
}
