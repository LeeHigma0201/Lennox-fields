'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Plus, Trash2, Save, FileText } from 'lucide-react'
import NotTherapyDisclaimer from '@/components/NotTherapyDisclaimer'

interface ThoughtRecord {
  id: string
  date: string
  situation: string
  emotions: string
  emotionIntensity: number
  automaticThoughts: string
  evidence: string
  alternativeThought: string
  outcome: string
  outcomeIntensity: number
}

const COGNITIVE_DISTORTIONS = [
  'All-or-Nothing Thinking',
  'Overgeneralization',
  'Mental Filter',
  'Discounting the Positive',
  'Jumping to Conclusions',
  'Magnification/Minimization',
  'Emotional Reasoning',
  'Should Statements',
  'Labeling',
  'Personalization',
]

export default function CBTThoughtRecordPage() {
  const [currentRecord, setCurrentRecord] = useState<Partial<ThoughtRecord>>({
    situation: '',
    emotions: '',
    emotionIntensity: 5,
    automaticThoughts: '',
    evidence: '',
    alternativeThought: '',
    outcome: '',
    outcomeIntensity: 5,
  })

  const [savedRecords, setSavedRecords] = useState<ThoughtRecord[]>([])
  const [showSaved, setShowSaved] = useState(false)

  const handleSave = () => {
    const newRecord: ThoughtRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      situation: currentRecord.situation || '',
      emotions: currentRecord.emotions || '',
      emotionIntensity: currentRecord.emotionIntensity || 5,
      automaticThoughts: currentRecord.automaticThoughts || '',
      evidence: currentRecord.evidence || '',
      alternativeThought: currentRecord.alternativeThought || '',
      outcome: currentRecord.outcome || '',
      outcomeIntensity: currentRecord.outcomeIntensity || 5,
    }
    setSavedRecords([newRecord, ...savedRecords])
    // Reset form
    setCurrentRecord({
      situation: '',
      emotions: '',
      emotionIntensity: 5,
      automaticThoughts: '',
      evidence: '',
      alternativeThought: '',
      outcome: '',
      outcomeIntensity: 5,
    })
    alert('Thought record saved! You can view it in the "Saved Records" section below.')
  }

  const handleDelete = (id: string) => {
    setSavedRecords(savedRecords.filter(record => record.id !== id))
  }

  const handleDownload = () => {
    const content = savedRecords.map(record => `
Date: ${record.date}
Situation: ${record.situation}
Emotions: ${record.emotions} (Intensity: ${record.emotionIntensity}/10)
Automatic Thoughts: ${record.automaticThoughts}
Evidence For/Against: ${record.evidence}
Alternative Thought: ${record.alternativeThought}
Outcome: ${record.outcome} (Intensity: ${record.outcomeIntensity}/10)
${'='.repeat(80)}
    `).join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `thought-records-${new Date().toLocaleDateString()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const isRecordComplete = () => {
    return currentRecord.situation && currentRecord.emotions && currentRecord.automaticThoughts &&
           currentRecord.evidence && currentRecord.alternativeThought && currentRecord.outcome
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-white border-b border-warm-gray/20 py-8">
        <div className="container-custom">
          <Link
            href="/resources/worksheets"
            className="inline-flex items-center text-primary-sage hover:text-earth-green mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Worksheets
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            CBT Thought Record
          </h1>
          <p className="text-lg text-warm-gray max-w-3xl">
            Challenge negative thinking patterns and develop more balanced perspectives. This interactive tool walks you
            through the cognitive restructuring process step-by-step.
          </p>
        </div>
      </section>

      {/* Instructions */}
      <section className="section-padding bg-gradient-warm-bg">
        <div className="container-custom max-w-4xl space-y-6">
          <NotTherapyDisclaimer />
          <div className="card">
            <h2 className="text-2xl font-bold text-text-dark mb-4">How to Use This Tool</h2>
            <div className="space-y-3 text-warm-gray">
              <p>
                <strong className="text-text-dark">1. Identify the Situation:</strong> What happened? Where were you? Who was involved?
              </p>
              <p>
                <strong className="text-text-dark">2. Name Your Emotions:</strong> What did you feel? How intense was it?
              </p>
              <p>
                <strong className="text-text-dark">3. Capture Automatic Thoughts:</strong> What went through your mind? What were you afraid might happen?
              </p>
              <p>
                <strong className="text-text-dark">4. Examine the Evidence:</strong> What facts support or contradict your thought?
              </p>
              <p>
                <strong className="text-text-dark">5. Create an Alternative Thought:</strong> What's a more balanced way to view this?
              </p>
              <p>
                <strong className="text-text-dark">6. Re-rate Your Emotion:</strong> How do you feel now after challenging the thought?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Form */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-text-dark">New Thought Record</h2>
              {savedRecords.length > 0 && (
                <button
                  onClick={() => setShowSaved(!showSaved)}
                  className="btn btn-outline text-sm"
                >
                  <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                  {showSaved ? 'Hide' : 'Show'} Saved ({savedRecords.length})
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Step 1: Situation */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  1. Describe the Situation
                </label>
                <textarea
                  value={currentRecord.situation}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, situation: e.target.value })}
                  placeholder="What happened? Be specific about the who, what, where, and when..."
                  className="w-full p-4 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage resize-none"
                  rows={3}
                />
              </div>

              {/* Step 2: Emotions */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  2. Identify Your Emotions
                </label>
                <input
                  type="text"
                  value={currentRecord.emotions}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, emotions: e.target.value })}
                  placeholder="e.g., Anxious, sad, angry, frustrated, ashamed..."
                  className="w-full p-4 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage mb-3"
                />
                <div>
                  <label className="block text-sm text-warm-gray mb-2">
                    Intensity (1-10): {currentRecord.emotionIntensity}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentRecord.emotionIntensity}
                    onChange={(e) => setCurrentRecord({ ...currentRecord, emotionIntensity: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-warm-gray mt-1">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Automatic Thoughts */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  3. Automatic Thoughts
                </label>
                <textarea
                  value={currentRecord.automaticThoughts}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, automaticThoughts: e.target.value })}
                  placeholder="What thoughts went through your mind? What did this situation mean to you? What were you afraid might happen?"
                  className="w-full p-4 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage resize-none"
                  rows={4}
                />
                <div className="mt-3 p-3 bg-clinical-blue/10 rounded-lg">
                  <p className="text-sm text-text-dark font-medium mb-2">Common Cognitive Distortions:</p>
                  <div className="flex flex-wrap gap-2">
                    {COGNITIVE_DISTORTIONS.map((distortion) => (
                      <span key={distortion} className="text-xs bg-white px-2 py-1 rounded-full text-clinical-blue">
                        {distortion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 4: Evidence */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  4. Evidence For and Against the Thought
                </label>
                <textarea
                  value={currentRecord.evidence}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, evidence: e.target.value })}
                  placeholder="Evidence FOR: What facts support this thought?&#10;&#10;Evidence AGAINST: What facts contradict this thought? What would you tell a friend in this situation?"
                  className="w-full p-4 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage resize-none"
                  rows={5}
                />
              </div>

              {/* Step 5: Alternative Thought */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  5. Alternative/Balanced Thought
                </label>
                <textarea
                  value={currentRecord.alternativeThought}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, alternativeThought: e.target.value })}
                  placeholder="Based on the evidence, what's a more balanced way to think about this situation? What's a more realistic perspective?"
                  className="w-full p-4 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage resize-none"
                  rows={4}
                />
              </div>

              {/* Step 6: Outcome */}
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-2">
                  6. Outcome - How Do You Feel Now?
                </label>
                <textarea
                  value={currentRecord.outcome}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, outcome: e.target.value })}
                  placeholder="What emotions do you feel now? What will you do differently?"
                  className="w-full p-4 border border-warm-gray/30 rounded-lg focus:ring-2 focus:ring-primary-sage focus:border-primary-sage resize-none mb-3"
                  rows={3}
                />
                <div>
                  <label className="block text-sm text-warm-gray mb-2">
                    New Intensity (1-10): {currentRecord.outcomeIntensity}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentRecord.outcomeIntensity}
                    onChange={(e) => setCurrentRecord({ ...currentRecord, outcomeIntensity: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-warm-gray mt-1">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>
                {currentRecord.emotionIntensity && currentRecord.outcomeIntensity &&
                 currentRecord.emotionIntensity > currentRecord.outcomeIntensity && (
                  <div className="mt-3 p-3 bg-earth-green/10 border border-earth-green/30 rounded-lg">
                    <p className="text-sm text-earth-green font-medium">
                      ✓ Great work! Your emotion intensity decreased by {currentRecord.emotionIntensity - currentRecord.outcomeIntensity} points.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={!isRecordComplete()}
                  className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                  Save Thought Record
                </button>
                <button
                  onClick={() => setCurrentRecord({
                    situation: '',
                    emotions: '',
                    emotionIntensity: 5,
                    automaticThoughts: '',
                    evidence: '',
                    alternativeThought: '',
                    outcome: '',
                    outcomeIntensity: 5,
                  })}
                  className="btn btn-outline flex-1"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </div>

          {/* Saved Records */}
          {showSaved && savedRecords.length > 0 && (
            <div className="card mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-text-dark">Saved Thought Records</h3>
                <button
                  onClick={handleDownload}
                  className="btn btn-outline text-sm"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Download All
                </button>
              </div>
              <div className="space-y-4">
                {savedRecords.map((record) => (
                  <div key={record.id} className="bg-cream rounded-lg p-6 border border-warm-gray/20">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-warm-gray">{record.date}</p>
                        <h4 className="font-bold text-text-dark mt-1">{record.situation}</h4>
                      </div>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="text-alert-red hover:text-alert-red/80"
                        aria-label="Delete record"
                      >
                        <Trash2 className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-text-dark">Initial Emotion:</p>
                        <p className="text-warm-gray">{record.emotions} ({record.emotionIntensity}/10)</p>
                      </div>
                      <div>
                        <p className="font-medium text-text-dark">Outcome Emotion:</p>
                        <p className="text-warm-gray">{record.outcome} ({record.outcomeIntensity}/10)</p>
                      </div>
                    </div>
                    <details className="mt-4">
                      <summary className="cursor-pointer text-primary-sage font-medium">View Full Record</summary>
                      <div className="mt-4 space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-text-dark">Automatic Thoughts:</p>
                          <p className="text-warm-gray">{record.automaticThoughts}</p>
                        </div>
                        <div>
                          <p className="font-medium text-text-dark">Evidence:</p>
                          <p className="text-warm-gray whitespace-pre-wrap">{record.evidence}</p>
                        </div>
                        <div>
                          <p className="font-medium text-text-dark">Alternative Thought:</p>
                          <p className="text-warm-gray">{record.alternativeThought}</p>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Educational Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-6 text-center">Understanding Cognitive Restructuring</h2>
          <div className="prose max-w-none text-warm-gray">
            <p className="mb-4">
              Thought records are a core tool in Cognitive Behavioral Therapy (CBT). They help you identify and challenge
              unhelpful thinking patterns that contribute to emotional distress. Research shows that regularly practicing
              cognitive restructuring can significantly reduce symptoms of anxiety and depression.
            </p>
            <p className="mb-4">
              <strong className="text-text-dark">Why it works:</strong> Our thoughts, feelings, and behaviors are interconnected.
              By changing unhelpful thoughts, we can improve our emotions and behaviors. Thought records provide a structured
              way to examine the accuracy of our automatic thoughts and develop more balanced perspectives.
            </p>
            <p>
              <strong className="text-text-dark">Best practices:</strong> Complete thought records when you notice a shift
              in your mood or when you're feeling distressed. The more you practice, the easier it becomes to identify and
              challenge unhelpful thoughts in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Want to Learn More CBT Techniques?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Cognitive Behavioral Therapy offers powerful tools for managing anxiety, depression, and other mental health challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
              Schedule CBT Session
            </Link>
            <Link href="/resources/worksheets" className="btn border-2 border-white hover:bg-white hover:text-primary-sage">
              More CBT Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
