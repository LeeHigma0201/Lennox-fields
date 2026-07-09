'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react'

interface BreathingPattern {
  name: string
  description: string
  inhale: number
  hold1: number
  exhale: number
  hold2: number
  cycles: number
  benefits: string[]
}

const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    name: '4-7-8 Breathing',
    description: 'A calming technique developed by Dr. Andrew Weil, excellent for reducing anxiety and improving sleep.',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    cycles: 4,
    benefits: ['Reduces anxiety', 'Helps with sleep', 'Lowers stress response', 'Calms nervous system'],
  },
  {
    name: 'Box Breathing',
    description: 'Used by Navy SEALs for stress management and focus. Equal timing for all phases.',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    cycles: 5,
    benefits: ['Improves focus', 'Reduces stress', 'Enhances performance', 'Regulates nervous system'],
  },
  {
    name: 'Deep Belly Breathing',
    description: 'Simple diaphragmatic breathing for quick relaxation.',
    inhale: 4,
    hold1: 2,
    exhale: 6,
    hold2: 0,
    cycles: 6,
    benefits: ['Quick stress relief', 'Lowers blood pressure', 'Increases oxygen', 'Easy to learn'],
  },
  {
    name: 'Coherent Breathing',
    description: 'Balanced breathing at 5 breaths per minute for optimal heart rate variability.',
    inhale: 5,
    hold1: 0,
    exhale: 5,
    hold2: 0,
    cycles: 6,
    benefits: ['Improves HRV', 'Balances nervous system', 'Reduces inflammation', 'Enhances clarity'],
  },
  {
    name: 'Energizing Breath',
    description: 'Shorter exhale to increase alertness and energy.',
    inhale: 4,
    hold1: 0,
    exhale: 2,
    hold2: 0,
    cycles: 8,
    benefits: ['Increases energy', 'Improves alertness', 'Enhances focus', 'Quick pick-me-up'],
  },
]

type Phase = 'ready' | 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'complete'

export default function BreathingExercisesPage() {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0])
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<Phase>('ready')
  const [currentCycle, setCurrentCycle] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      advancePhase()
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, timeLeft, currentPhase, currentCycle, selectedPattern])

  const advancePhase = () => {
    let nextPhase: Phase = 'ready'
    let nextDuration = 0

    switch (currentPhase) {
      case 'ready':
      case 'hold2':
        if (currentCycle >= selectedPattern.cycles) {
          setIsActive(false)
          setCurrentPhase('complete')
          return
        }
        setCurrentCycle((prev) => prev + 1)
        nextPhase = 'inhale'
        nextDuration = selectedPattern.inhale
        break
      case 'inhale':
        if (selectedPattern.hold1 > 0) {
          nextPhase = 'hold1'
          nextDuration = selectedPattern.hold1
        } else {
          nextPhase = 'exhale'
          nextDuration = selectedPattern.exhale
        }
        break
      case 'hold1':
        nextPhase = 'exhale'
        nextDuration = selectedPattern.exhale
        break
      case 'exhale':
        if (selectedPattern.hold2 > 0) {
          nextPhase = 'hold2'
          nextDuration = selectedPattern.hold2
        } else if (currentCycle >= selectedPattern.cycles) {
          setIsActive(false)
          setCurrentPhase('complete')
          return
        } else {
          setCurrentCycle((prev) => prev + 1)
          nextPhase = 'inhale'
          nextDuration = selectedPattern.inhale
        }
        break
    }

    setCurrentPhase(nextPhase)
    setTimeLeft(nextDuration)
  }

  const startExercise = () => {
    setIsActive(true)
    setCurrentCycle(0)
    setCurrentPhase('ready')
    setTimeLeft(3) // 3 second countdown
    const total = selectedPattern.cycles * (
      selectedPattern.inhale + selectedPattern.hold1 + selectedPattern.exhale + selectedPattern.hold2
    )
    setTotalTime(total)
  }

  const pauseExercise = () => {
    setIsActive(false)
  }

  const resetExercise = () => {
    setIsActive(false)
    setCurrentPhase('ready')
    setCurrentCycle(0)
    setTimeLeft(0)
  }

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'ready':
        return timeLeft > 0 ? `Get Ready... ${timeLeft}` : 'Press Start'
      case 'inhale':
        return 'Breathe In'
      case 'hold1':
      case 'hold2':
        return 'Hold'
      case 'exhale':
        return 'Breathe Out'
      case 'complete':
        return 'Complete! Well Done'
      default:
        return ''
    }
  }

  const getCircleSize = () => {
    if (!isActive) return 'scale-100'
    switch (currentPhase) {
      case 'inhale':
        return 'scale-150'
      case 'hold1':
      case 'hold2':
        return currentPhase === 'hold1' ? 'scale-150' : 'scale-75'
      case 'exhale':
        return 'scale-75'
      default:
        return 'scale-100'
    }
  }

  const getCircleColor = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'bg-primary-sage'
      case 'exhale':
        return 'bg-clinical-blue'
      case 'hold1':
      case 'hold2':
        return 'bg-accent-gold'
      default:
        return 'bg-warm-gray/30'
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-white border-b border-warm-gray/20 py-8">
        <div className="container-custom">
          <Link
            href="/resources"
            className="inline-flex items-center text-primary-sage hover:text-earth-green mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            Guided Breathing Exercises
          </h1>
          <p className="text-lg text-warm-gray max-w-3xl">
            Research-backed breathing techniques to reduce stress, calm anxiety, improve focus, and promote relaxation.
            Follow the visual guide and timer for perfect pacing.
          </p>
        </div>
      </section>

      {/* Breathing Visualizer */}
      <section className="section-padding gradient-warm-bg">
        <div className="container-custom max-w-4xl">
          <div className="card">
            {/* Visual Circle */}
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div
                className={`relative w-64 h-64 rounded-full ${getCircleColor()} transition-all duration-1000 ease-in-out flex items-center justify-center ${getCircleSize()}`}
                style={{
                  transitionDuration: `${timeLeft}s`,
                  boxShadow: isActive ? '0 0 60px rgba(115, 147, 133, 0.4)' : 'none',
                }}
              >
                <div className="text-center text-white">
                  <div className="text-4xl font-bold mb-2">{getPhaseText()}</div>
                  {isActive && currentPhase !== 'ready' && currentPhase !== 'complete' && (
                    <div className="text-6xl font-bold">{timeLeft}</div>
                  )}
                </div>
              </div>

              {/* Progress */}
              {isActive && currentPhase !== 'ready' && (
                <div className="mt-8 text-center">
                  <p className="text-text-dark font-medium">
                    Cycle {currentCycle} of {selectedPattern.cycles}
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-8">
              {!isActive || currentPhase === 'complete' ? (
                <button
                  onClick={startExercise}
                  className="btn btn-primary inline-flex items-center px-8"
                >
                  <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                  {currentPhase === 'complete' ? 'Restart' : 'Start Exercise'}
                </button>
              ) : (
                <>
                  <button
                    onClick={pauseExercise}
                    className="btn btn-outline inline-flex items-center"
                  >
                    <Pause className="w-5 h-5 mr-2" aria-hidden="true" />
                    Pause
                  </button>
                  <button
                    onClick={resetExercise}
                    className="btn btn-outline inline-flex items-center"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" aria-hidden="true" />
                    Reset
                  </button>
                </>
              )}
            </div>

            {/* Current Pattern Info */}
            <div className="mt-8 p-6 bg-primary-sage/10 rounded-lg">
              <h3 className="text-xl font-bold text-text-dark mb-2">{selectedPattern.name}</h3>
              <p className="text-warm-gray mb-4">{selectedPattern.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                {selectedPattern.inhale > 0 && (
                  <div className="text-center">
                    <div className="font-bold text-primary-sage text-2xl">{selectedPattern.inhale}s</div>
                    <div className="text-warm-gray">Inhale</div>
                  </div>
                )}
                {selectedPattern.hold1 > 0 && (
                  <div className="text-center">
                    <div className="font-bold text-accent-gold text-2xl">{selectedPattern.hold1}s</div>
                    <div className="text-warm-gray">Hold</div>
                  </div>
                )}
                {selectedPattern.exhale > 0 && (
                  <div className="text-center">
                    <div className="font-bold text-clinical-blue text-2xl">{selectedPattern.exhale}s</div>
                    <div className="text-warm-gray">Exhale</div>
                  </div>
                )}
                {selectedPattern.hold2 > 0 && (
                  <div className="text-center">
                    <div className="font-bold text-accent-gold text-2xl">{selectedPattern.hold2}s</div>
                    <div className="text-warm-gray">Hold</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breathing Patterns Library */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
            Choose Your Breathing Pattern
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BREATHING_PATTERNS.map((pattern) => (
              <div
                key={pattern.name}
                onClick={() => {
                  if (!isActive) setSelectedPattern(pattern)
                }}
                className={`card cursor-pointer transition-all ${
                  selectedPattern.name === pattern.name
                    ? 'ring-2 ring-primary-sage bg-primary-sage/5'
                    : 'hover:shadow-medium'
                } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <h3 className="text-xl font-bold text-text-dark mb-2">{pattern.name}</h3>
                <p className="text-sm text-warm-gray mb-4">{pattern.description}</p>
                <div className="space-y-2">
                  <p className="text-xs text-text-dark">
                    <strong>Pattern:</strong> {pattern.inhale}s in
                    {pattern.hold1 > 0 && ` - ${pattern.hold1}s hold`}
                    {` - ${pattern.exhale}s out`}
                    {pattern.hold2 > 0 && ` - ${pattern.hold2}s hold`}
                  </p>
                  <p className="text-xs text-text-dark">
                    <strong>Duration:</strong> {pattern.cycles} cycles (~
                    {Math.ceil((pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2) * pattern.cycles / 60)} min)
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-warm-gray/20">
                  <p className="text-xs font-medium text-text-dark mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {pattern.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="text-xs bg-primary-sage/10 text-primary-sage px-2 py-1 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-6 text-center">
            The Science of Breathwork
          </h2>
          <div className="prose max-w-none text-warm-gray space-y-4">
            <p>
              Controlled breathing exercises are one of the most effective tools for managing stress and anxiety. Research
              shows that intentional breathing activates the parasympathetic nervous system (rest and digest), counteracting
              the stress response.
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="card bg-white">
                <h3 className="text-lg font-bold text-text-dark mb-3">Immediate Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2">•</span>
                    <span>Reduces heart rate and blood pressure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2">•</span>
                    <span>Calms racing thoughts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2">•</span>
                    <span>Decreases muscle tension</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2">•</span>
                    <span>Improves focus and clarity</span>
                  </li>
                </ul>
              </div>
              <div className="card bg-white">
                <h3 className="text-lg font-bold text-text-dark mb-3">Long-term Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2">•</span>
                    <span>Reduced anxiety and depression symptoms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2">•</span>
                    <span>Better sleep quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2">•</span>
                    <span>Enhanced emotional regulation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2">•</span>
                    <span>Improved stress resilience</span>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              <strong className="text-text-dark">Best practices:</strong> Practice breathing exercises daily, even when
              you're not stressed. This builds your capacity to use them effectively during difficult moments. Start with
              just a few minutes per day and gradually increase as you become more comfortable.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Explore More Stress Management Tools
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Breathing exercises are just one of many evidence-based techniques for managing stress and anxiety.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/cbt-thought-record" className="btn bg-white text-primary-sage hover:bg-cream">
              CBT Thought Record
            </Link>
            <Link href="/resources/worksheets" className="btn border-2 border-white hover:bg-white hover:text-primary-sage">
              More Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
