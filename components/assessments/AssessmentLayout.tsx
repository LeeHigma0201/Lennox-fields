'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

interface Question {
  id: string
  text: string
  options: { value: number; label: string }[]
}

interface AssessmentLayoutProps {
  title: string
  description: string
  instructions: string
  questions: Question[]
  onComplete: (responses: Record<string, number>) => void
  scoringInfo?: React.ReactNode
}

export default function AssessmentLayout({
  title,
  description,
  instructions,
  questions,
  onComplete,
  scoringInfo,
}: AssessmentLayoutProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleResponse = (questionId: string, value: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }))
  }

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (isComplete) {
      setShowResults(true)
      onComplete(responses)
    }
  }

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const isComplete = Object.keys(responses).length === questions.length
  const currentQ = questions[currentQuestion]
  const hasCurrentResponse = responses[currentQ.id] !== undefined
  const progress = (Object.keys(responses).length / questions.length) * 100

  if (showResults) {
    return null // Results will be shown by parent component
  }

  return (
    <div className="min-h-screen gradient-warm-bg py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
          <h1 className="text-4xl font-bold text-text-dark mb-4">{title}</h1>
          <p className="text-lg text-warm-gray mb-4">{description}</p>
          <div className="bg-clinical-blue/10 border-l-4 border-clinical-blue p-4 rounded">
            <p className="text-text-dark">{instructions}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-dark">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary-sage">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-warm-gray/20 rounded-full h-2">
            <div
              className="bg-primary-sage h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-medium p-8 mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-text-dark mb-6">
            {currentQ.text}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleResponse(currentQ.id, option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  responses[currentQ.id] === option.value
                    ? 'border-primary-sage bg-primary-sage/10'
                    : 'border-warm-gray/20 hover:border-primary-sage/50 hover:bg-cream'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-text-dark font-medium">{option.label}</span>
                  {responses[currentQ.id] === option.value && (
                    <CheckCircle className="w-6 h-6 text-primary-sage" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className="btn btn-outline inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <button
            onClick={goToNext}
            disabled={!hasCurrentResponse}
            className="btn btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Scoring Info */}
        {scoringInfo && (
          <div className="mt-8 bg-white rounded-xl shadow-soft p-6">
            {scoringInfo}
          </div>
        )}
      </div>
    </div>
  )
}
