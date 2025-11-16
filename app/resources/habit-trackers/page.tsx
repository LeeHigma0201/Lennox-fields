'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, TrendingUp, Filter, Search, ArrowLeft } from 'lucide-react'

type TrackerCategory = 'all' | 'mental-health' | 'physical-health' | 'emotional-wellbeing' | 'coping-skills' | 'daily-practices' | 'health-tracking'

interface HabitTracker {
  id: string
  title: string
  description: string
  benefits: string
  category: TrackerCategory[]
  frequency: 'Daily' | 'Weekly' | 'Flexible'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  popular: boolean
  downloadUrl: string
}

const trackers: HabitTracker[] = [
  {
    id: 'mood-tracker',
    title: 'Mood Tracker',
    description: 'Track daily emotional patterns to identify triggers and patterns. Rate your mood multiple times per day and note contributing factors.',
    benefits: 'Gain awareness of emotional patterns, identify triggers, track improvements over time',
    category: ['mental-health', 'daily-practices'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/trackers/mood-tracker.pdf',
  },
  {
    id: 'sleep-tracker',
    title: 'Sleep Quality & Duration Tracker',
    description: 'Monitor sleep patterns, quality, duration, and factors affecting sleep. Includes notes on pre-sleep activities and sleep environment.',
    benefits: 'Improve sleep hygiene, identify sleep disruptors, track sleep improvement progress',
    category: ['physical-health', 'health-tracking'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/trackers/sleep-tracker.pdf',
  },
  {
    id: 'medication-compliance',
    title: 'Medication Compliance Tracker',
    description: 'Simple checkbox tracker for daily medication management. Track multiple medications, times, and side effects.',
    benefits: 'Ensure consistent medication adherence, track side effects, communicate with doctor',
    category: ['physical-health', 'health-tracking'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/trackers/medication-compliance.pdf',
  },
  {
    id: 'anxiety-symptom-tracker',
    title: 'Anxiety Symptom Tracker',
    description: 'Log anxiety symptoms, intensity levels (1-10), physical sensations, and what helped. Build awareness of your anxiety patterns.',
    benefits: 'Identify anxiety triggers, recognize early warning signs, track effectiveness of coping strategies',
    category: ['mental-health', 'coping-skills'],
    frequency: 'Daily',
    difficulty: 'Intermediate',
    popular: true,
    downloadUrl: '/trackers/anxiety-symptom-tracker.pdf',
  },
  {
    id: 'depression-symptom-tracker',
    title: 'Depression Symptom Tracker',
    description: 'Monitor depression symptoms including mood, sleep, appetite, energy, and motivation. Includes severity ratings and daily notes.',
    benefits: 'Track depression progression, identify patterns, communicate effectively with mental health providers',
    category: ['mental-health', 'health-tracking'],
    frequency: 'Daily',
    difficulty: 'Intermediate',
    popular: true,
    downloadUrl: '/trackers/depression-symptom-tracker.pdf',
  },
  {
    id: 'exercise-tracker',
    title: 'Exercise & Movement Tracker',
    description: 'Log physical activity type, duration, intensity, and how you felt before and after. Includes space for motivation notes.',
    benefits: 'Build consistent exercise habits, boost mood through movement, track fitness progress',
    category: ['physical-health', 'daily-practices'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/trackers/exercise-tracker.pdf',
  },
  {
    id: 'water-intake-tracker',
    title: 'Water Intake Tracker',
    description: 'Simple daily water intake logger with visual tracking. Helps maintain hydration goals and builds awareness of drinking habits.',
    benefits: 'Maintain hydration, improve energy levels, build healthy daily habits',
    category: ['physical-health', 'daily-practices'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: false,
    downloadUrl: '/trackers/water-intake-tracker.pdf',
  },
  {
    id: 'gratitude-log',
    title: 'Daily Gratitude Log',
    description: 'Record 3-5 things you\'re grateful for each day, no matter how small. Shift focus toward positivity and appreciation.',
    benefits: 'Increase positivity, reduce anxiety and depression, improve overall wellbeing',
    category: ['emotional-wellbeing', 'daily-practices'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/trackers/gratitude-log.pdf',
  },
  {
    id: 'self-care-activities',
    title: 'Self-Care Activities Tracker',
    description: 'Log self-care activities completed, how they made you feel, and barriers to self-care. Track categories like physical, emotional, social, and spiritual care.',
    benefits: 'Prioritize self-care, identify effective activities, overcome self-care barriers',
    category: ['emotional-wellbeing', 'daily-practices'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: false,
    downloadUrl: '/trackers/self-care-activities.pdf',
  },
  {
    id: 'trigger-coping-tracker',
    title: 'Trigger & Coping Skills Tracker',
    description: 'Record emotional triggers, intensity, coping strategies used, and effectiveness. Build your personalized coping toolkit.',
    benefits: 'Identify personal triggers, develop and refine coping strategies, measure what works best',
    category: ['coping-skills', 'emotional-wellbeing'],
    frequency: 'Flexible',
    difficulty: 'Intermediate',
    popular: true,
    downloadUrl: '/trackers/trigger-coping-tracker.pdf',
  },
  {
    id: 'energy-level-tracker',
    title: 'Energy Level Tracker',
    description: 'Monitor your energy levels throughout the day (1-10 scale). Note activities, food, sleep, and other factors affecting energy.',
    benefits: 'Identify energy patterns, optimize productivity and activities, improve overall functioning',
    category: ['physical-health', 'daily-practices'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: false,
    downloadUrl: '/trackers/energy-level-tracker.pdf',
  },
  {
    id: 'social-connection-tracker',
    title: 'Social Connection Tracker',
    description: 'Log social interactions, connections made, and how they affected your mood. Track both in-person and virtual connections.',
    benefits: 'Prioritize social health, identify isolation patterns, strengthen meaningful relationships',
    category: ['emotional-wellbeing', 'daily-practices'],
    frequency: 'Daily',
    difficulty: 'Beginner',
    popular: false,
    downloadUrl: '/trackers/social-connection-tracker.pdf',
  },
]

const categories = [
  { value: 'all', label: 'All Trackers' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'physical-health', label: 'Physical Health' },
  { value: 'emotional-wellbeing', label: 'Emotional Wellbeing' },
  { value: 'coping-skills', label: 'Coping Skills' },
  { value: 'daily-practices', label: 'Daily Practices' },
  { value: 'health-tracking', label: 'Health Tracking' },
]

export default function HabitTrackersPage() {
  const [selectedCategory, setSelectedCategory] = useState<TrackerCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTrackers = trackers.filter((tracker) => {
    const matchesCategory = selectedCategory === 'all' || tracker.category.includes(selectedCategory)
    const matchesSearch =
      tracker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tracker.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tracker.benefits.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularTrackers = trackers.filter(t => t.popular)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <Link href="/resources" className="inline-flex items-center text-primary-sage hover:text-earth-green mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Resources
          </Link>

          <div className="text-center max-w-4xl mx-auto">
            <TrendingUp className="w-20 h-20 text-primary-sage mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
              Habit Trackers
            </h1>
            <p className="text-xl text-text-dark">
              Build awareness and consistency with our comprehensive habit tracking tools.
              Monitor your mental health, physical wellness, and daily progress. All trackers are free to download and use.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-warm-gray/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">{trackers.length}</p>
              <p className="text-sm text-warm-gray">Trackers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">100%</p>
              <p className="text-sm text-warm-gray">Free</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">PDF</p>
              <p className="text-sm text-warm-gray">Download Now</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">7+</p>
              <p className="text-sm text-warm-gray">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Trackers */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-text-dark mb-8">Most Popular</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularTrackers.map((tracker) => (
              <div key={tracker.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-soft-rose" />
                  <span className="bg-soft-rose text-white px-2 py-1 rounded-full text-xs font-bold">
                    Popular
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-2">{tracker.title}</h3>
                <p className="text-sm text-warm-gray mb-3">{tracker.description}</p>
                <div className="flex items-center justify-between text-xs text-warm-gray mb-4">
                  <span className="font-medium">{tracker.frequency}</span>
                  <span>{tracker.difficulty}</span>
                </div>
                <button className="btn btn-primary w-full inline-flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Trackers with Filters */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-text-dark mb-8">All Habit Trackers</h2>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-gray" />
              <input
                type="text"
                placeholder="Search trackers by name, description, or benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Filter className="w-5 h-5 text-warm-gray mt-2" />
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value as TrackerCategory)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.value
                      ? 'bg-primary-sage text-white'
                      : 'bg-cream text-text-dark hover:bg-primary-sage/20'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-warm-gray mb-6">
            Showing {filteredTrackers.length} tracker{filteredTrackers.length !== 1 ? 's' : ''}
          </p>

          {/* Tracker Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrackers.map((tracker) => (
              <div key={tracker.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-clinical-blue" />
                  <div className="flex gap-1">
                    {tracker.popular && (
                      <span className="bg-soft-rose text-white px-2 py-1 rounded-full text-xs font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-2">{tracker.title}</h3>
                <p className="text-sm text-warm-gray mb-3 leading-relaxed">{tracker.description}</p>

                {/* Benefits */}
                <div className="bg-cream rounded-lg p-3 mb-4">
                  <p className="text-xs font-semibold text-primary-sage mb-1">Benefits:</p>
                  <p className="text-xs text-text-dark">{tracker.benefits}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {tracker.category.slice(0, 2).map((cat) => (
                    <span key={cat} className="px-2 py-1 bg-cream text-xs text-text-dark rounded">
                      {categories.find(c => c.value === cat)?.label}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-warm-gray mb-4 pt-4 border-t border-warm-gray/20">
                  <span className="font-medium">{tracker.frequency}</span>
                  <span>{tracker.difficulty}</span>
                </div>
                <button className="btn btn-outline w-full inline-flex items-center justify-center hover:bg-primary-sage hover:text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            ))}
          </div>

          {filteredTrackers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-warm-gray text-lg">No trackers found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="btn btn-outline mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How to Use Trackers Effectively */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">How to Use Trackers Effectively</h2>

          <div className="card space-y-8">
            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Choose the Right Tracker for Your Goals</h3>
              <p className="text-warm-gray mb-3">
                Start with 1-2 trackers that align with your specific wellness goals. You don't need to track everything at once.
                It's better to consistently use a few trackers than to overwhelm yourself with too many. Consider:
              </p>
              <ul className="list-disc list-inside text-warm-gray space-y-1 ml-2">
                <li>What areas of your health or wellness matter most to you right now?</li>
                <li>What patterns do you most want to understand?</li>
                <li>What frequency (daily, weekly, flexible) fits your lifestyle?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Find Your Tracking Rhythm</h3>
              <p className="text-warm-gray mb-3">
                Consistency matters more than perfection. Find a time and method that works for you:
              </p>
              <ul className="list-disc list-inside text-warm-gray space-y-1 ml-2">
                <li>Digital: Use the PDFs on a tablet or phone, or scan them for digital completion</li>
                <li>Paper: Print copies and complete by hand for a more mindful approach</li>
                <li>Timing: Complete trackers first thing in the morning, after meals, or before bed</li>
                <li>Habit stacking: Attach tracking to an existing habit (after morning coffee, before bed, etc.)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Be Honest and Specific</h3>
              <p className="text-warm-gray mb-3">
                The value of tracking comes from honest, detailed observations. When completing trackers:
              </p>
              <ul className="list-disc list-inside text-warm-gray space-y-1 ml-2">
                <li>Rate your genuine experience, not what you think you "should" feel</li>
                <li>Include specific details (foods eaten, activities done, who you spoke with, etc.)</li>
                <li>Note context that might be relevant (stress level, sleep the night before, major events)</li>
                <li>Write in your own words rather than using generic descriptions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Review and Reflect Regularly</h3>
              <p className="text-warm-gray mb-3">
                Tracking is only powerful if you look back at your data and reflect. Schedule weekly or monthly review time:
              </p>
              <ul className="list-disc list-inside text-warm-gray space-y-1 ml-2">
                <li>Look for patterns, trends, and connections between variables</li>
                <li>Ask: "What stands out?" "What surprised me?" "What's improving?"</li>
                <li>Celebrate progress, even small improvements</li>
                <li>Identify what helps and what makes things worse</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Share With Your Therapist or Doctor</h3>
              <p className="text-warm-gray mb-3">
                Your trackers become valuable tools in therapy and medical care. Bring completed trackers to:
              </p>
              <ul className="list-disc list-inside text-warm-gray space-y-1 ml-2">
                <li>Therapy sessions for deeper discussion and insight</li>
                <li>Doctor's appointments to communicate health concerns clearly</li>
                <li>Medication adjustments or psychiatric evaluations</li>
                <li>Treatment planning and progress monitoring</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Adjust as You Go</h3>
              <p className="text-warm-gray">
                Tracking is flexible. If a tracker isn't working for you, try a different format or frequency.
                You can also combine trackers or modify them to better fit your needs. The best tracker is the one
                you'll actually use consistently.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary-sage/10 to-clinical-blue/10 border border-primary-sage/20 rounded-lg p-6 mt-8">
              <p className="text-sm text-text-dark">
                <span className="font-bold">Pro tip:</span> Date each tracker entry. Looking back at entries from weeks
                or months ago helps you see just how far you've come and reinforces positive changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Habit Tracking */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">Why Habit Tracking Works</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">Increased Awareness</h3>
              <p className="text-warm-gray">
                You can't improve what you don't measure. Tracking creates awareness of patterns, triggers, and habits
                you might otherwise miss.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">Evidence of Progress</h3>
              <p className="text-warm-gray">
                Seeing real data about your improvements—no matter how small—provides motivation and hope during
                difficult times.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">Better Communication</h3>
              <p className="text-warm-gray">
                When discussing your mental and physical health with providers, having specific data is more effective
                than general descriptions.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">Personalized Insights</h3>
              <p className="text-warm-gray">
                Generic advice doesn't work for everyone. Your tracked data helps you understand your unique patterns
                and what actually helps you.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">Accountability & Motivation</h3>
              <p className="text-warm-gray">
                The act of tracking itself reinforces behavior change. It's a daily reminder of your commitment to
                your wellbeing.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">Early Warning Signs</h3>
              <p className="text-warm-gray">
                Regular tracking helps you catch negative patterns early before they become major problems, allowing
                for faster intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Tips */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">Getting Started With Habit Trackers</h2>

          <div className="space-y-4">
            <div className="card border-l-4 border-primary-sage">
              <h3 className="font-bold text-text-dark mb-2">Step 1: Download Your First Tracker</h3>
              <p className="text-warm-gray text-sm">
                Start with one tracker that addresses your most pressing concern. Download the PDF and decide whether
                to print or use digitally.
              </p>
            </div>

            <div className="card border-l-4 border-earth-green">
              <h3 className="font-bold text-text-dark mb-2">Step 2: Set a Tracking Reminder</h3>
              <p className="text-warm-gray text-sm">
                Set a phone alarm, calendar reminder, or associate it with an existing habit. Consistency is key—even
                just a few minutes daily builds valuable data.
              </p>
            </div>

            <div className="card border-l-4 border-soft-rose">
              <h3 className="font-bold text-text-dark mb-2">Step 3: Track for at Least 2 Weeks</h3>
              <p className="text-warm-gray text-sm">
                Two weeks of data begins to show patterns. Don't judge yourself or stop early—consistency reveals patterns
                that matter.
              </p>
            </div>

            <div className="card border-l-4 border-clinical-blue">
              <h3 className="font-bold text-text-dark mb-2">Step 4: Review and Reflect</h3>
              <p className="text-warm-gray text-sm">
                After 2-4 weeks, sit down and review your data. Look for patterns, connections, and areas of improvement.
                This reflection is where the real value lives.
              </p>
            </div>

            <div className="card border-l-4 border-warm-gray">
              <h3 className="font-bold text-text-dark mb-2">Step 5: Adjust and Continue</h3>
              <p className="text-warm-gray text-sm">
                Based on what you learned, modify your approach if needed. Add a second tracker if it makes sense. Continue
                tracking to monitor progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Better Habits and Track Your Progress?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            These trackers work best alongside therapy. Our therapists can help you interpret your data,
            identify patterns, and create meaningful change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn bg-white text-primary-sage hover:bg-cream">
              View Therapy Services
            </Link>
            <Link href="/contact" className="btn border-2 border-white hover:bg-white hover:text-primary-sage">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
