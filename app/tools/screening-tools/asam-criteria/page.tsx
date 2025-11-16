'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, CheckCircle, Download, ArrowLeft } from 'lucide-react'
import AssessmentLayout from '@/components/assessments/AssessmentLayout'

const questions = [
  {
    id: 'q1',
    text: 'In the past month, how often have you used alcohol or other drugs more than you intended?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely (1-2 times)' },
      { value: 2, label: 'Sometimes (3-5 times)' },
      { value: 3, label: 'Often (6+ times)' },
    ],
  },
  {
    id: 'q2',
    text: 'Have you experienced withdrawal symptoms (shaking, sweating, anxiety, irritability) when cutting down or stopping use?',
    options: [
      { value: 0, label: 'No, never' },
      { value: 1, label: 'Mild symptoms' },
      { value: 2, label: 'Moderate symptoms' },
      { value: 3, label: 'Severe symptoms' },
    ],
  },
  {
    id: 'q3',
    text: 'Have you developed a tolerance, needing more of the substance to achieve the same effect?',
    options: [
      { value: 0, label: 'No tolerance' },
      { value: 1, label: 'Slightly increased amounts needed' },
      { value: 2, label: 'Significantly increased amounts' },
      { value: 3, label: 'Very large amounts required' },
    ],
  },
  {
    id: 'q4',
    text: 'Has substance use caused problems with your physical health (liver disease, infections, nutritional issues, etc.)?',
    options: [
      { value: 0, label: 'No health problems' },
      { value: 1, label: 'Minor health issues' },
      { value: 2, label: 'Moderate health complications' },
      { value: 3, label: 'Serious medical conditions' },
    ],
  },
  {
    id: 'q5',
    text: 'Have you experienced psychiatric symptoms like depression, anxiety, paranoia, or mood swings related to your substance use?',
    options: [
      { value: 0, label: 'No psychiatric symptoms' },
      { value: 1, label: 'Mild symptoms' },
      { value: 2, label: 'Moderate symptoms interfering with daily life' },
      { value: 3, label: 'Severe symptoms significantly impacting functioning' },
    ],
  },
  {
    id: 'q6',
    text: 'Have you continued using despite knowing it causes psychological or physical problems?',
    options: [
      { value: 0, label: 'I stop when problems occur' },
      { value: 1, label: 'Occasionally continue despite problems' },
      { value: 2, label: 'Often continue despite problems' },
      { value: 3, label: 'Always continue despite problems' },
    ],
  },
  {
    id: 'q7',
    text: 'Has substance use affected your relationships, work, school, or legal status?',
    options: [
      { value: 0, label: 'No impact on responsibilities' },
      { value: 1, label: 'Minor impact (occasional missed obligations)' },
      { value: 2, label: 'Moderate impact (frequent problems)' },
      { value: 3, label: 'Severe impact (major relationships/work loss)' },
    ],
  },
  {
    id: 'q8',
    text: 'How motivated do you feel to make changes with your substance use?',
    options: [
      { value: 3, label: 'Very motivated to change' },
      { value: 2, label: 'Somewhat motivated to change' },
      { value: 1, label: 'Slightly motivated to change' },
      { value: 0, label: 'Not motivated to change' },
    ],
  },
  {
    id: 'q9',
    text: 'Do you have family, friends, or a support system that would help you with recovery?',
    options: [
      { value: 3, label: 'Strong support system in place' },
      { value: 2, label: 'Moderate support available' },
      { value: 1, label: 'Limited support' },
      { value: 0, label: 'No support available' },
    ],
  },
  {
    id: 'q10',
    text: 'Are you currently in a safe environment to pursue treatment?',
    options: [
      { value: 3, label: 'Very safe, conducive to recovery' },
      { value: 2, label: 'Mostly safe with some challenges' },
      { value: 1, label: 'Unsafe in some ways' },
      { value: 0, label: 'Very unsafe environment' },
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
  level: string
} {
  const total = Object.values(responses).reduce((sum, val) => sum + val, 0)

  let severity = ''
  let interpretation = ''
  let recommendations: string[] = []
  let color = ''
  let requiresUrgentCare = false
  let level = ''

  if (total >= 0 && total <= 10) {
    severity = 'Level 0.5 - Early Intervention'
    level = '0.5'
    color = 'text-success-green'
    interpretation = 'Your responses suggest minimal substance use problems. Early intervention or wellness strategies may be helpful for prevention.'
    recommendations = [
      'Continue healthy lifestyle habits and stress management',
      'Avoid escalating substance use through awareness and moderation',
      'Maintain strong social connections and supportive relationships',
      'Consider brief interventions or psychoeducation if concerned',
      'Regular check-ins with your healthcare provider',
    ]
  } else if (total >= 11 && total <= 20) {
    severity = 'Level 1 - Outpatient Treatment'
    level = '1'
    color = 'text-accent-gold'
    interpretation = 'Your responses suggest substance use issues that would benefit from outpatient treatment and support services.'
    recommendations = [
      'Outpatient substance use disorder treatment is recommended',
      'Individual counseling or cognitive behavioral therapy for substance use',
      'Participation in support groups (AA, NA, SMART Recovery)',
      'Medical management for any withdrawal or health issues',
      'Family education and involvement in treatment planning',
      'Schedule an assessment with a substance use treatment specialist',
    ]
  } else if (total >= 21 && total <= 30) {
    severity = 'Level 2 - Intensive Outpatient/Partial Hospitalization'
    level = '2'
    color = 'text-warning-amber'
    interpretation = 'Your responses suggest significant substance use issues requiring intensive treatment, likely including multiple sessions per week.'
    recommendations = [
      'Intensive outpatient treatment (IOP) or day treatment program is recommended',
      'Psychiatric evaluation and possible medication management',
      'Comprehensive assessment by addiction medicine specialist',
      'Structured group therapy and individual counseling',
      'Medical monitoring for withdrawal and health complications',
      'Family therapy and support group participation',
      'Consider residential treatment if outpatient fails or circumstances warrant it',
    ]
  } else if (total >= 31 && total <= 40) {
    severity = 'Level 3 - Residential/Inpatient Treatment'
    level = '3'
    color = 'text-alert-red'
    interpretation = 'Your responses suggest serious substance use disorder requiring residential treatment with 24/7 care and monitoring.'
    recommendations = [
      'Residential treatment program (28-90 days) is strongly recommended',
      'Medical detoxification with physician oversight',
      'Comprehensive psychiatric and medical assessment',
      'Intensive individual and group therapy',
      'Mental health and co-occurring condition treatment',
      'Family involvement and therapy',
      'Aftercare and discharge planning for continued recovery',
      'Call SAMHSA National Helpline: 1-800-662-4357 for treatment referrals',
    ]
    requiresUrgentCare = true
  } else {
    severity = 'Level 4 - Medically Managed Intensive Inpatient Treatment'
    level = '4'
    color = 'text-alert-red'
    interpretation = 'Your responses suggest severe substance use disorder with significant medical and/or psychiatric complications requiring hospitalization.'
    recommendations = [
      'Immediate admission to hospital-based treatment is necessary',
      'Medical detoxification under 24/7 physician supervision',
      'Treatment of acute medical complications',
      'Psychiatric hospitalization if suicidal or psychotic symptoms present',
      'Call 911 or go to emergency room if experiencing medical crisis',
      'Call SAMHSA National Helpline: 1-800-662-4357 immediately',
      'Comprehensive assessment by addiction medicine and psychiatry',
      'Intensive medical and psychological treatment',
    ]
    requiresUrgentCare = true
  }

  return { total, severity, interpretation, recommendations, color, requiresUrgentCare, level }
}

export default function ASAMCriteriaPage() {
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
                ASAM Criteria for Substance Use Disorder Assessment
              </p>
            </div>

            {/* Urgent Care Alert */}
            {results.requiresUrgentCare && (
              <div className="bg-alert-red/10 border-2 border-alert-red rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <AlertCircle className="w-6 h-6 text-alert-red mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-alert-red mb-2">Urgent Professional Help Needed</p>
                    <p className="text-text-dark mb-3">
                      Your responses indicate you would benefit from immediate professional treatment and support.
                    </p>
                    <div className="font-semibold text-text-dark space-y-2">
                      <p>SAMHSA National Helpline: 1-800-662-4357 (Free, confidential, 24/7)</p>
                      <p>Emergency: Call 911 if experiencing medical or psychiatric crisis</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Score Display */}
            <div className="bg-gradient-sage-bg text-white rounded-lg p-8 text-center mb-8">
              <p className="text-lg mb-2 opacity-90">Your Score</p>
              <p className="text-6xl font-bold mb-2">{results.total}</p>
              <p className="text-sm opacity-90">out of 40 points</p>
            </div>

            {/* Severity & Level */}
            <div className="text-center mb-8">
              <p className="text-sm text-warm-gray mb-2">Recommended Care Level</p>
              <p className={`text-3xl font-bold ${results.color} mb-2`}>
                {results.severity}
              </p>
              <p className="text-warm-gray text-sm">ASAM Level {results.level}</p>
            </div>

            {/* Interpretation */}
            <div className="bg-cream rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-dark mb-3">Interpretation</h2>
              <p className="text-text-dark leading-relaxed">{results.interpretation}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Recommendations for Care</h2>
            <ul className="space-y-4">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-clinical-blue mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Understanding ASAM Levels */}
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">
              Understanding ASAM Treatment Levels
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-success-green p-4 bg-cream rounded-lg">
                <p className="font-semibold text-text-dark mb-1">Level 0.5 - Early Intervention</p>
                <p className="text-sm text-warm-gray">Prevention and brief interventions for at-risk individuals</p>
              </div>
              <div className="border-l-4 border-accent-gold p-4 bg-cream rounded-lg">
                <p className="font-semibold text-text-dark mb-1">Level 1 - Outpatient Treatment</p>
                <p className="text-sm text-warm-gray">Regular outpatient sessions with counseling and support services</p>
              </div>
              <div className="border-l-4 border-warning-amber p-4 bg-cream rounded-lg">
                <p className="font-semibold text-text-dark mb-1">Level 2 - Intensive Outpatient/Partial Hospitalization</p>
                <p className="text-sm text-warm-gray">Structured program with 9+ hours per week of treatment and monitoring</p>
              </div>
              <div className="border-l-4 border-alert-red p-4 bg-cream rounded-lg">
                <p className="font-semibold text-text-dark mb-1">Level 3 - Residential/Inpatient Treatment</p>
                <p className="text-sm text-warm-gray">24-hour care in a residential setting with medical and psychiatric support</p>
              </div>
              <div className="border-l-4 border-alert-red p-4 bg-cream rounded-lg">
                <p className="font-semibold text-text-dark mb-1">Level 4 - Medically Managed Intensive Inpatient Treatment</p>
                <p className="text-sm text-warm-gray">Hospital-based care with acute medical and psychiatric treatment</p>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Resources & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-text-dark mb-2">National Resources</h3>
                <ul className="text-sm space-y-2 text-text-dark">
                  <li>
                    <strong>SAMHSA National Helpline:</strong> 1-800-662-4357
                  </li>
                  <li>
                    <strong>24/7, free, confidential</strong> - Referrals to local treatment facilities
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-text-dark mb-2">Support Groups</h3>
                <ul className="text-sm space-y-2 text-text-dark">
                  <li>Alcoholics Anonymous (AA)</li>
                  <li>Narcotics Anonymous (NA)</li>
                  <li>SMART Recovery</li>
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
            {(results.total >= 11) && (
              <Link href="/contact" className="btn btn-primary inline-flex items-center justify-center">
                Schedule Consultation
              </Link>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-clinical-blue/10 border-l-4 border-clinical-blue p-6 rounded">
            <p className="text-sm text-text-dark">
              <strong>Disclaimer:</strong> This screening tool is not a diagnostic instrument and does not replace
              a comprehensive clinical evaluation. Only qualified addiction medicine specialists and mental health
              professionals can provide formal diagnosis and treatment planning using ASAM criteria. This assessment
              is based on the American Society of Addiction Medicine (ASAM) Patient Placement Criteria framework,
              a standard in substance use disorder treatment assessment. If you are experiencing a medical or
              psychiatric emergency, please call 911 or go to your nearest emergency room immediately.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AssessmentLayout
      title="ASAM Criteria: Substance Use Disorder Assessment"
      description="A comprehensive screening tool based on American Society of Addiction Medicine (ASAM) criteria to assess substance use severity and appropriate level of care."
      instructions="Please answer the following questions honestly about your substance use and related factors over the past few months."
      questions={questions}
      onComplete={handleComplete}
      scoringInfo={
        <div>
          <h3 className="font-bold text-text-dark mb-3">About the ASAM Criteria</h3>
          <p className="text-sm text-warm-gray mb-3">
            The ASAM Patient Placement Criteria is the gold standard for assessing individuals with substance use
            disorders and determining appropriate levels of care. Developed by the American Society of Addiction Medicine,
            it evaluates six dimensions: acute intoxication/withdrawal, biomedical conditions, psychiatric conditions,
            motivation for treatment, recovery environment, and readiness to change.
          </p>
          <p className="text-sm text-warm-gray">
            This assessment helps match patients with the most appropriate and effective treatment setting,
            ranging from outpatient services to medically managed intensive inpatient care.
          </p>
        </div>
      }
    />
  )
}
