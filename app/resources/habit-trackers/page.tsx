'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckSquare, ArrowLeft, Sun, Moon, Smile, Frown, Meh, Heart, Zap, Droplets } from 'lucide-react'

const moodOptions = [
  { value: 5, label: 'Great', icon: Smile, color: 'text-success-green' },
  { value: 4, label: 'Good', icon: Smile, color: 'text-earth-green' },
  { value: 3, label: 'Okay', icon: Meh, color: 'text-accent-gold' },
  { value: 2, label: 'Low', icon: Frown, color: 'text-warning-amber' },
  { value: 1, label: 'Rough', icon: Frown, color: 'text-alert-red' },
]

const habits = [
  { id: 'sleep', label: 'Slept 7+ hours', icon: Moon },
  { id: 'water', label: 'Drank enough water', icon: Droplets },
  { id: 'exercise', label: 'Moved my body', icon: Zap },
  { id: 'outside', label: 'Spent time outside', icon: Sun },
  { id: 'connection', label: 'Connected with someone', icon: Heart },
  { id: 'selfcare', label: 'Did something for myself', icon: Smile },
]

export default function HabitTrackersPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [checkedHabits, setCheckedHabits] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  const toggleHabit = (id: string) => {
    setCheckedHabits(prev =>
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    )
  }

  const saveEntry = () => {
    const today = new Date().toISOString().split('T')[0]
    const entry = { date: today, mood: selectedMood, habits: checkedHabits, note }
    const existing = JSON.parse(localStorage.getItem('lf-habit-tracker') || '[]')
    const filtered = existing.filter((e: { date: string }) => e.date !== today)
    filtered.push(entry)
    localStorage.setItem('lf-habit-tracker', JSON.stringify(filtered))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="flex items-center space-x-2 mb-6">
            <Link href="/resources" className="text-primary-sage hover:text-earth-green transition-colors">
              <ArrowLeft className="w-5 h-5 inline mr-1" aria-hidden="true" />
              Resources
            </Link>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Daily Habit Tracker
          </h1>
          <p className="text-xl text-text-dark max-w-3xl">
            Track your mood, self-care habits, and daily patterns. Small consistent actions
            build lasting change. Your data stays private in your browser.
          </p>
        </div>
      </section>

      {/* Tracker */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-2">
              Today&apos;s Check-In
            </h2>
            <p className="text-warm-gray mb-8">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            {/* Mood */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-dark mb-4">How are you feeling?</h3>
              <div className="flex gap-3 flex-wrap">
                {moodOptions.map((mood) => {
                  const Icon = mood.icon
                  return (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all min-w-[80px] ${
                        selectedMood === mood.value
                          ? 'border-primary-sage bg-primary-sage/5'
                          : 'border-warm-gray/20 hover:border-primary-sage/50'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-1 ${mood.color}`} aria-hidden="true" />
                      <span className="text-sm font-medium text-text-dark">{mood.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Habits */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-dark mb-4">Daily Habits</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {habits.map((habit) => {
                  const Icon = habit.icon
                  const isChecked = checkedHabits.includes(habit.id)
                  return (
                    <button
                      key={habit.id}
                      onClick={() => toggleHabit(habit.id)}
                      className={`flex items-center p-3 rounded-lg border-2 transition-all text-left ${
                        isChecked
                          ? 'border-primary-sage bg-primary-sage/5'
                          : 'border-warm-gray/20 hover:border-primary-sage/50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                        isChecked ? 'bg-primary-sage border-primary-sage' : 'border-warm-gray/40'
                      }`}>
                        {isChecked && <CheckSquare className="w-4 h-4 text-white" aria-hidden="true" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-warm-gray flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm text-text-dark">{habit.label}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Note */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-text-dark mb-4">Notes (optional)</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="input w-full"
                placeholder="Anything on your mind today..."
              />
            </div>

            {/* Save */}
            <button
              onClick={saveEntry}
              className="btn btn-primary w-full"
            >
              {saved ? 'Saved!' : 'Save Today\'s Entry'}
            </button>
            <p className="text-xs text-warm-gray mt-3 text-center">
              Your data is stored locally in your browser and is never sent to any server.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Why Track Your Habits?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Spot Patterns</h3>
              <p className="text-warm-gray text-sm">Notice connections between your habits and your mood over time.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Build Momentum</h3>
              <p className="text-warm-gray text-sm">Small daily wins compound into meaningful long-term change.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-sage text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Share in Therapy</h3>
              <p className="text-warm-gray text-sm">Bring your tracking data to sessions for richer, more focused conversations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Want Personalized Support?</h2>
          <p className="text-xl mb-8 opacity-90">
            A therapist can help you interpret your patterns and build strategies that work for you.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
