'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, FileText, Filter, Search, ArrowLeft } from 'lucide-react'

type WorksheetCategory = 'all' | 'cbt' | 'dbt' | 'emotions' | 'anxiety' | 'depression' | 'relationships' | 'self-esteem' | 'coping'

interface Worksheet {
  id: string
  title: string
  description: string
  category: WorksheetCategory[]
  pages: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  popular: boolean
  downloadUrl: string
}

const worksheets: Worksheet[] = [
  {
    id: 'cbt-thought-record',
    title: 'CBT Thought Record',
    description: 'Identify and challenge negative automatic thoughts. Track situations, emotions, thoughts, and evidence for balanced thinking.',
    category: ['cbt', 'anxiety', 'depression'],
    pages: 2,
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/worksheets/cbt-thought-record.pdf',
  },
  {
    id: 'emotion-wheel',
    title: 'Emotion Wheel Worksheet',
    description: 'Identify and name complex emotions using the emotion wheel. Build emotional vocabulary and awareness.',
    category: ['emotions', 'dbt'],
    pages: 1,
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/worksheets/emotion-wheel.pdf',
  },
  {
    id: 'cope-ahead-plan',
    title: 'DBT COPE AHEAD Plan',
    description: 'Prepare for challenging situations using DBT skills. Plan coping strategies before emotional intensity hits.',
    category: ['dbt', 'coping', 'anxiety'],
    pages: 2,
    difficulty: 'Intermediate',
    popular: true,
    downloadUrl: '/worksheets/cope-ahead-plan.pdf',
  },
  {
    id: 'grounding-exercises',
    title: '5-4-3-2-1 Grounding Technique',
    description: 'Use your five senses to ground yourself during anxiety, panic, or dissociation. Quick reference card included.',
    category: ['anxiety', 'coping'],
    pages: 1,
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/worksheets/grounding-exercises.pdf',
  },
  {
    id: 'values-clarification',
    title: 'Personal Values Clarification',
    description: 'Identify your core values and assess alignment with current life choices. Essential for meaning-driven goals.',
    category: ['self-esteem', 'coping'],
    pages: 3,
    difficulty: 'Intermediate',
    popular: false,
    downloadUrl: '/worksheets/values-clarification.pdf',
  },
  {
    id: 'communication-styles',
    title: 'Communication Styles: Assertiveness Training',
    description: 'Learn to distinguish passive, aggressive, and assertive communication. Practice expressing needs effectively.',
    category: ['relationships', 'self-esteem'],
    pages: 2,
    difficulty: 'Intermediate',
    popular: false,
    downloadUrl: '/worksheets/communication-styles.pdf',
  },
  {
    id: 'worry-time',
    title: 'Worry Time Scheduling',
    description: 'Contain worry to specific time periods. Reduce rumination and increase present-moment focus.',
    category: ['anxiety', 'cbt'],
    pages: 1,
    difficulty: 'Intermediate',
    popular: false,
    downloadUrl: '/worksheets/worry-time.pdf',
  },
  {
    id: 'self-compassion',
    title: 'Self-Compassion Break',
    description: 'Practice Kristin Neff\'s self-compassion techniques. Counter self-criticism with kindness and common humanity.',
    category: ['self-esteem', 'depression'],
    pages: 2,
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/worksheets/self-compassion.pdf',
  },
  {
    id: 'behavioral-activation',
    title: 'Behavioral Activation Planner',
    description: 'Schedule meaningful activities to combat depression. Track mood before and after activities.',
    category: ['depression', 'cbt'],
    pages: 2,
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/worksheets/behavioral-activation.pdf',
  },
  {
    id: 'relationship-patterns',
    title: 'Relationship Patterns Inventory',
    description: 'Identify recurring patterns in relationships. Explore attachment styles and communication dynamics.',
    category: ['relationships'],
    pages: 3,
    difficulty: 'Advanced',
    popular: false,
    downloadUrl: '/worksheets/relationship-patterns.pdf',
  },
  {
    id: 'anger-log',
    title: 'Anger Awareness Log',
    description: 'Track anger triggers, intensity, physical sensations, and responses. Build awareness before change.',
    category: ['emotions', 'coping'],
    pages: 2,
    difficulty: 'Beginner',
    popular: false,
    downloadUrl: '/worksheets/anger-log.pdf',
  },
  {
    id: 'progressive-muscle-relaxation',
    title: 'Progressive Muscle Relaxation Guide',
    description: 'Step-by-step guide to PMR technique. Reduce physical tension and anxiety through systematic muscle relaxation.',
    category: ['anxiety', 'coping'],
    pages: 1,
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/worksheets/progressive-muscle-relaxation.pdf',
  },
  {
    id: 'smart-goals',
    title: 'SMART Goals Worksheet',
    description: 'Set Specific, Measurable, Achievable, Relevant, and Time-bound goals. Turn vague wishes into action plans.',
    category: ['self-esteem', 'coping'],
    pages: 2,
    difficulty: 'Beginner',
    popular: true,
    downloadUrl: '/worksheets/smart-goals.pdf',
  },
  {
    id: 'emotion-regulation',
    title: 'DBT Emotion Regulation Skills',
    description: 'Quick reference for PLEASE, ABC PLEASE, and opposite action skills. Laminate for easy access.',
    category: ['dbt', 'emotions'],
    pages: 1,
    difficulty: 'Intermediate',
    popular: false,
    downloadUrl: '/worksheets/emotion-regulation.pdf',
  },
  {
    id: 'boundary-setting',
    title: 'Healthy Boundaries Workbook',
    description: 'Assess current boundaries, identify violations, and practice setting limits. Essential for relationships.',
    category: ['relationships', 'self-esteem'],
    pages: 4,
    difficulty: 'Intermediate',
    popular: true,
    downloadUrl: '/worksheets/boundary-setting.pdf',
  },
]

const categories = [
  { value: 'all', label: 'All Worksheets' },
  { value: 'cbt', label: 'CBT' },
  { value: 'dbt', label: 'DBT' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'emotions', label: 'Emotions' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'self-esteem', label: 'Self-Esteem' },
  { value: 'coping', label: 'Coping Skills' },
]

export default function WorksheetsPage() {
  const [selectedCategory, setSelectedCategory] = useState<WorksheetCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredWorksheets = worksheets.filter((worksheet) => {
    const matchesCategory = selectedCategory === 'all' || worksheet.category.includes(selectedCategory)
    const matchesSearch = worksheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worksheet.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularWorksheets = worksheets.filter(w => w.popular)

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
            <FileText className="w-20 h-20 text-primary-sage mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
              Therapy Worksheets
            </h1>
            <p className="text-xl text-text-dark">
              Evidence-based worksheets for CBT, DBT, emotion regulation, and more.
              All worksheets are free to download, print, and use in therapy or at home.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-warm-gray/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">{worksheets.length}</p>
              <p className="text-sm text-warm-gray">Worksheets</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">100%</p>
              <p className="text-sm text-warm-gray">Free</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">PDF</p>
              <p className="text-sm text-warm-gray">Print-Ready</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">∞</p>
              <p className="text-sm text-warm-gray">No Limits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Worksheets */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-text-dark mb-8">Most Popular</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularWorksheets.map((worksheet) => (
              <div key={worksheet.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <FileText className="w-8 h-8 text-soft-rose" />
                  <span className="bg-soft-rose text-white px-2 py-1 rounded-full text-xs font-bold">
                    Popular
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-2">{worksheet.title}</h3>
                <p className="text-sm text-warm-gray mb-4">{worksheet.description}</p>
                <div className="flex items-center justify-between text-xs text-warm-gray mb-4">
                  <span>{worksheet.pages} {worksheet.pages === 1 ? 'page' : 'pages'}</span>
                  <span>{worksheet.difficulty}</span>
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

      {/* All Worksheets with Filters */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-text-dark mb-8">All Worksheets</h2>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-gray" />
              <input
                type="text"
                placeholder="Search worksheets..."
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
                  onClick={() => setSelectedCategory(category.value as WorksheetCategory)}
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
            Showing {filteredWorksheets.length} worksheet{filteredWorksheets.length !== 1 ? 's' : ''}
          </p>

          {/* Worksheet Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorksheets.map((worksheet) => (
              <div key={worksheet.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <FileText className="w-8 h-8 text-clinical-blue" />
                  <div className="flex gap-1">
                    {worksheet.popular && (
                      <span className="bg-soft-rose text-white px-2 py-1 rounded-full text-xs font-bold">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-2">{worksheet.title}</h3>
                <p className="text-sm text-warm-gray mb-4 leading-relaxed">{worksheet.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {worksheet.category.slice(0, 3).map((cat) => (
                    <span key={cat} className="px-2 py-1 bg-cream text-xs text-text-dark rounded">
                      {categories.find(c => c.value === cat)?.label}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-warm-gray mb-4 pt-4 border-t border-warm-gray/20">
                  <span>{worksheet.pages} {worksheet.pages === 1 ? 'page' : 'pages'}</span>
                  <span>{worksheet.difficulty}</span>
                </div>
                <button className="btn btn-outline w-full inline-flex items-center justify-center hover:bg-primary-sage hover:text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            ))}
          </div>

          {filteredWorksheets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-warm-gray text-lg">No worksheets found matching your criteria.</p>
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

      {/* How to Use */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">How to Use These Worksheets</h2>

          <div className="card space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">📥 Download & Print</h3>
              <p className="text-warm-gray">
                All worksheets are provided as PDF files. Simply click the download button, save to your device,
                and print as many copies as you need. No sign-up or payment required.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">✏️ Complete Thoughtfully</h3>
              <p className="text-warm-gray">
                Take your time with each worksheet. Find a quiet space, approach the exercises with openness,
                and be honest with yourself. There are no right or wrong answers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">💬 Discuss in Therapy</h3>
              <p className="text-warm-gray">
                Bring completed worksheets to your therapy sessions for deeper processing. Your therapist can
                help you gain insights and develop action plans based on your reflections.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">🔁 Repeat as Needed</h3>
              <p className="text-warm-gray">
                Many worksheets are designed for repeated use. Track your progress over time by dating each
                worksheet and comparing your responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Want Guidance Using These Tools?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Worksheets are powerful, but therapy provides the guidance and support to maximize their impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn bg-white text-primary-sage hover:bg-cream">
              View Therapy Services
            </Link>
            <Link href="/contact" className="btn border-2 border-white hover:bg-white hover:text-primary-sage">
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
