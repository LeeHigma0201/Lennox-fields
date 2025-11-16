'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, BookOpen, Filter, Search, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'

type JournalCategory = 'all' | 'gratitude' | 'cbt' | 'emotions' | 'goals' | 'compassion' | 'relationships' | 'career' | 'trauma' | 'mindfulness'

interface Journal {
  id: string
  title: string
  description: string
  category: JournalCategory[]
  frequency: 'Daily' | 'Weekly' | 'As-needed'
  duration: string // e.g., "5-10 minutes"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  popular: boolean
  prompts: string[]
  benefits: string[]
  downloadUrl: string
}

const journals: Journal[] = [
  {
    id: 'gratitude-journal',
    title: 'Gratitude Journal',
    description: 'Daily gratitude practice with guided prompts to cultivate appreciation and shift focus toward positive aspects of life.',
    category: ['gratitude', 'mindfulness'],
    frequency: 'Daily',
    duration: '5-10 minutes',
    difficulty: 'Beginner',
    popular: true,
    prompts: [
      'What are 3 things I\'m grateful for today?',
      'Who made a positive impact on me today?',
      'What small moment brought me joy?',
      'What am I taking for granted that I should appreciate?',
      'What about my body or health can I be grateful for?',
    ],
    benefits: [
      'Increases positive mood and emotional resilience',
      'Reduces anxiety and depression symptoms',
      'Improves sleep quality',
      'Enhances overall life satisfaction',
      'Shifts attention to positive aspects of life',
    ],
    downloadUrl: '/journals/gratitude-journal.pdf',
  },
  {
    id: 'cbt-thought-journal',
    title: 'CBT Thought Journal',
    description: 'Structured journal for identifying automatic thoughts, examining evidence, and developing balanced perspectives using cognitive behavioral therapy techniques.',
    category: ['cbt', 'emotions'],
    frequency: 'As-needed',
    duration: '10-15 minutes',
    difficulty: 'Intermediate',
    popular: true,
    prompts: [
      'What situation triggered this thought?',
      'What automatic thought appeared?',
      'What emotion did I feel? Rate 0-100.',
      'What evidence supports this thought?',
      'What evidence contradicts this thought?',
      'What\'s a more balanced way to think about this?',
      'How much do I believe the new thought? 0-100%',
    ],
    benefits: [
      'Identifies patterns in thinking',
      'Challenges negative automatic thoughts',
      'Develops balanced perspectives',
      'Reduces anxiety and worry',
      'Improves emotional regulation',
    ],
    downloadUrl: '/journals/cbt-thought-journal.pdf',
  },
  {
    id: 'emotion-processing-journal',
    title: 'Emotion Processing Journal',
    description: 'Explore and understand your emotions deeply with structured prompts for naming, validating, and processing feelings.',
    category: ['emotions', 'mindfulness'],
    frequency: 'As-needed',
    duration: '10-20 minutes',
    difficulty: 'Beginner',
    popular: true,
    prompts: [
      'What emotion am I experiencing right now?',
      'Where do I feel this in my body?',
      'What triggered this emotion?',
      'What does this emotion need from me?',
      'What is this emotion trying to tell me?',
      'How can I validate this emotion?',
      'What self-compassion can I offer myself?',
    ],
    benefits: [
      'Increases emotional awareness and literacy',
      'Reduces emotional overwhelm',
      'Develops emotional acceptance',
      'Improves emotional processing skills',
      'Enhances emotional intelligence',
    ],
    downloadUrl: '/journals/emotion-processing-journal.pdf',
  },
  {
    id: 'goal-setting-journal',
    title: 'Goal-Setting & Progress Journal',
    description: 'Set meaningful goals, break them into actionable steps, and track progress with regular reflection and adjustment.',
    category: ['goals', 'mindfulness'],
    frequency: 'Weekly',
    duration: '15-20 minutes',
    difficulty: 'Intermediate',
    popular: false,
    prompts: [
      'What is my intention for this week/month?',
      'Why is this goal important to me?',
      'What are the first 3 steps I need to take?',
      'What obstacles might I encounter?',
      'What support do I need?',
      'What progress did I make?',
      'What did I learn this week?',
      'How will I celebrate my progress?',
    ],
    benefits: [
      'Clarifies values and priorities',
      'Creates accountability for goals',
      'Tracks progress and builds momentum',
      'Identifies obstacles and solutions',
      'Increases motivation and sense of purpose',
    ],
    downloadUrl: '/journals/goal-setting-journal.pdf',
  },
  {
    id: 'self-compassion-journal',
    title: 'Self-Compassion Journal',
    description: 'Practice self-kindness and reduce self-criticism using Kristin Neff\'s self-compassion framework with guided daily prompts.',
    category: ['compassion', 'mindfulness'],
    frequency: 'Daily',
    duration: '10-15 minutes',
    difficulty: 'Beginner',
    popular: true,
    prompts: [
      'What am I struggling with today?',
      'Is this struggle shared by others? (common humanity)',
      'How would I speak to a good friend in this situation?',
      'What kind words can I offer myself?',
      'What does self-compassion look like right now?',
      'What do I need from myself today?',
      'How can I practice self-care today?',
    ],
    benefits: [
      'Reduces harsh self-criticism and shame',
      'Increases emotional resilience',
      'Improves mental health and wellbeing',
      'Enhances self-worth and acceptance',
      'Promotes healthy coping mechanisms',
    ],
    downloadUrl: '/journals/self-compassion-journal.pdf',
  },
  {
    id: 'relationship-reflection-journal',
    title: 'Relationship Reflection Journal',
    description: 'Explore patterns, communication, boundaries, and growth in your relationships with others.',
    category: ['relationships'],
    frequency: 'Weekly',
    duration: '15-25 minutes',
    difficulty: 'Intermediate',
    popular: false,
    prompts: [
      'How am I feeling in this relationship?',
      'What communication went well this week?',
      'Where did communication break down?',
      'What boundaries do I need to set or maintain?',
      'What patterns do I notice?',
      'What would deepen this relationship?',
      'How do I want to show up in this relationship?',
      'What needs am I expressing or not expressing?',
    ],
    benefits: [
      'Improves self-awareness in relationships',
      'Identifies communication patterns',
      'Strengthens emotional intimacy',
      'Clarifies boundaries and needs',
      'Supports relationship growth and healing',
    ],
    downloadUrl: '/journals/relationship-reflection-journal.pdf',
  },
  {
    id: 'career-purpose-journal',
    title: 'Career & Purpose Journal',
    description: 'Explore your values, strengths, passions, and career direction. Align your work with your sense of purpose.',
    category: ['career', 'goals'],
    frequency: 'Weekly',
    duration: '15-20 minutes',
    difficulty: 'Intermediate',
    popular: false,
    prompts: [
      'What activities make me lose track of time?',
      'What problems do I want to solve?',
      'How does my current work align with my values?',
      'What are my unique strengths?',
      'What meaningful contribution do I want to make?',
      'What does fulfilling work look like to me?',
      'What\'s one step I can take toward my purpose?',
      'How am I growing professionally?',
    ],
    benefits: [
      'Clarifies career values and direction',
      'Identifies passion and purpose',
      'Builds professional confidence',
      'Supports career planning and transitions',
      'Increases job satisfaction and meaning',
    ],
    downloadUrl: '/journals/career-purpose-journal.pdf',
  },
  {
    id: 'trauma-healing-journal',
    title: 'Trauma Healing Journal',
    description: 'Gentle, compassionate journaling for processing trauma with safety-focused prompts and grounding techniques.',
    category: ['trauma', 'emotions'],
    frequency: 'As-needed',
    duration: '10-15 minutes',
    difficulty: 'Advanced',
    popular: false,
    prompts: [
      'What am I noticing in my body right now? (grounding)',
      '5 things I see, 4 I hear, 3 I feel, 2 I smell, 1 I taste',
      'How safe do I feel right now?',
      'What would help me feel safer?',
      'What small piece of this experience can I reflect on today?',
      'What inner strength did I show?',
      'What support am I accessing?',
      'What is one thing I survived today?',
    ],
    benefits: [
      'Provides safe container for processing trauma',
      'Reduces flashbacks and intrusive thoughts',
      'Builds sense of safety and grounding',
      'Recognizes resilience and strength',
      'Supports long-term healing journey',
    ],
    downloadUrl: '/journals/trauma-healing-journal.pdf',
  },
  {
    id: 'morning-pages-journal',
    title: 'Morning Pages Journal',
    description: 'Free-form writing practice to clear your mind first thing in the morning. No rules, just stream of consciousness writing.',
    category: ['mindfulness'],
    frequency: 'Daily',
    duration: '15-20 minutes',
    difficulty: 'Beginner',
    popular: true,
    prompts: [
      'Write anything and everything on your mind',
      'Don\'t censor yourself or worry about structure',
      'Keep your hand moving for the full duration',
      'Let thoughts flow freely without judgment',
      'You\'re writing for yourself, not an audience',
      'This is a brain dump - organize later',
      'Clear mental clutter before your day begins',
    ],
    benefits: [
      'Clears mental clutter and anxiety',
      'Enhances creativity and problem-solving',
      'Improves focus and clarity for the day',
      'Reduces morning stress and overwhelm',
      'Creates a mindful start to your day',
    ],
    downloadUrl: '/journals/morning-pages-journal.pdf',
  },
  {
    id: 'evening-reflection-journal',
    title: 'Evening Reflection Journal',
    description: 'End your day with intentional reflection, gratitude, and learning. Promotes better sleep and emotional processing.',
    category: ['mindfulness'],
    frequency: 'Daily',
    duration: '10-15 minutes',
    difficulty: 'Beginner',
    popular: true,
    prompts: [
      'What was the highlight of my day?',
      'What challenged me today?',
      'How did I handle difficulties?',
      'What am I proud of today?',
      'What did I learn?',
      'Who showed me kindness or support?',
      'What am I grateful for?',
      'How do I want to feel when I wake up?',
    ],
    benefits: [
      'Improves sleep quality and relaxation',
      'Processes daily emotions and events',
      'Cultivates gratitude and appreciation',
      'Builds self-reflection and awareness',
      'Sets positive intention for next day',
    ],
    downloadUrl: '/journals/evening-reflection-journal.pdf',
  },
]

const categories = [
  { value: 'all', label: 'All Journals' },
  { value: 'gratitude', label: 'Gratitude' },
  { value: 'cbt', label: 'CBT' },
  { value: 'emotions', label: 'Emotions' },
  { value: 'goals', label: 'Goals' },
  { value: 'compassion', label: 'Self-Compassion' },
  { value: 'relationships', label: 'Relationships' },
  { value: 'career', label: 'Career' },
  { value: 'trauma', label: 'Trauma Healing' },
  { value: 'mindfulness', label: 'Mindfulness' },
]

function JournalCard({ journal, expanded, onToggleExpanded }: { journal: Journal; expanded: boolean; onToggleExpanded: () => void }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <BookOpen className="w-8 h-8 text-clinical-blue" />
        <div className="flex gap-1">
          {journal.popular && (
            <span className="bg-soft-rose text-white px-2 py-1 rounded-full text-xs font-bold">
              Popular
            </span>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-text-dark mb-2">{journal.title}</h3>
      <p className="text-sm text-warm-gray mb-4 leading-relaxed">{journal.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {journal.category.slice(0, 3).map((cat) => (
          <span key={cat} className="px-2 py-1 bg-cream text-xs text-text-dark rounded">
            {categories.find(c => c.value === cat)?.label}
          </span>
        ))}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-warm-gray mb-4 pb-4 border-b border-warm-gray/20">
        <span>{journal.frequency}</span>
        <span>{journal.duration}</span>
        <span>{journal.difficulty}</span>
      </div>

      {/* Expandable Prompts & Benefits */}
      <button
        onClick={onToggleExpanded}
        className="w-full flex items-center justify-between text-sm font-semibold text-primary-sage mb-4 hover:text-earth-green transition-colors"
      >
        <span>{expanded ? 'Hide' : 'Show'} Prompts & Benefits</span>
        {expanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {expanded && (
        <div className="space-y-4 mb-4 pb-4 border-t border-warm-gray/20 pt-4">
          <div>
            <h4 className="font-semibold text-sm text-text-dark mb-2">Sample Prompts:</h4>
            <ul className="space-y-1">
              {journal.prompts.slice(0, 3).map((prompt, idx) => (
                <li key={idx} className="text-xs text-warm-gray flex gap-2">
                  <span className="text-primary-sage">•</span>
                  <span>{prompt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-text-dark mb-2">Key Benefits:</h4>
            <ul className="space-y-1">
              {journal.benefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx} className="text-xs text-warm-gray flex gap-2">
                  <span className="text-success-green">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button className="btn btn-outline w-full inline-flex items-center justify-center hover:bg-primary-sage hover:text-white">
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </button>
    </div>
  )
}

export default function JournalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<JournalCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedJournal, setExpandedJournal] = useState<string | null>(null)

  const filteredJournals = journals.filter((journal) => {
    const matchesCategory = selectedCategory === 'all' || journal.category.includes(selectedCategory)
    const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         journal.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularJournals = journals.filter(j => j.popular)

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
            <BookOpen className="w-20 h-20 text-primary-sage mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
              Therapeutic Journals
            </h1>
            <p className="text-xl text-text-dark">
              Transform your inner world through structured journaling. Explore 10 different therapeutic journal formats
              designed to support emotional processing, personal growth, and healing.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-warm-gray/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">{journals.length}</p>
              <p className="text-sm text-warm-gray">Journal Types</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">100%</p>
              <p className="text-sm text-warm-gray">Free to Use</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">100+</p>
              <p className="text-sm text-warm-gray">Guided Prompts</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">Daily</p>
              <p className="text-sm text-warm-gray">or As-Needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Journals */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-text-dark mb-8">Most Popular Journals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularJournals.map((journal) => (
              <JournalCard
                key={journal.id}
                journal={journal}
                expanded={expandedJournal === journal.id}
                onToggleExpanded={() => setExpandedJournal(expandedJournal === journal.id ? null : journal.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Journals with Filters */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-text-dark mb-8">All Journals</h2>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-gray" />
              <input
                type="text"
                placeholder="Search journals..."
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
                  onClick={() => setSelectedCategory(category.value as JournalCategory)}
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
            Showing {filteredJournals.length} journal{filteredJournals.length !== 1 ? 's' : ''}
          </p>

          {/* Journal Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJournals.map((journal) => (
              <JournalCard
                key={journal.id}
                journal={journal}
                expanded={expandedJournal === journal.id}
                onToggleExpanded={() => setExpandedJournal(expandedJournal === journal.id ? null : journal.id)}
              />
            ))}
          </div>

          {filteredJournals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-warm-gray text-lg">No journals found matching your criteria.</p>
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

      {/* Journaling Benefits */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">The Power of Therapeutic Journaling</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="card space-y-3">
              <div className="text-3xl">🧠</div>
              <h3 className="text-lg font-bold text-text-dark">Mental Clarity</h3>
              <p className="text-sm text-warm-gray">
                Journaling helps organize thoughts and process complex emotions in a structured way, reducing mental clutter and anxiety.
              </p>
            </div>

            <div className="card space-y-3">
              <div className="text-3xl">💪</div>
              <h3 className="text-lg font-bold text-text-dark">Emotional Processing</h3>
              <p className="text-sm text-warm-gray">
                Writing about feelings allows you to acknowledge, validate, and work through emotions at your own pace.
              </p>
            </div>

            <div className="card space-y-3">
              <div className="text-3xl">🔍</div>
              <h3 className="text-lg font-bold text-text-dark">Self-Discovery</h3>
              <p className="text-sm text-warm-gray">
                Regular journaling reveals patterns, triggers, values, and authentic desires you might not notice otherwise.
              </p>
            </div>

            <div className="card space-y-3">
              <div className="text-3xl">🌱</div>
              <h3 className="text-lg font-bold text-text-dark">Personal Growth</h3>
              <p className="text-sm text-warm-gray">
                Tracking your journey creates accountability and celebrates progress, supporting lasting change and transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journaling Best Practices */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">Therapeutic Journaling Best Practices</h2>

          <div className="card space-y-6">
            <div>
              <h3 className="text-xl font-bold text-text-dark mb-3">Find Your Rhythm</h3>
              <p className="text-warm-gray">
                Some journals are best done daily (gratitude, morning pages), while others work better as-needed (CBT thought journal, trauma healing).
                Start with what feels manageable and build consistency over time.
              </p>
            </div>

            <div className="border-t border-warm-gray/20 pt-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">Create a Safe Space</h3>
              <p className="text-warm-gray">
                Choose a quiet, comfortable location where you won't be interrupted. Use this time as a form of self-care and prioritize it
                like any other important commitment.
              </p>
            </div>

            <div className="border-t border-warm-gray/20 pt-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">Release Perfectionism</h3>
              <p className="text-warm-gray">
                There's no "right way" to journal. Your entries don't need to be perfect, eloquent, or organized. Honesty and authenticity matter
                far more than grammar or structure.
              </p>
            </div>

            <div className="border-t border-warm-gray/20 pt-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">Use the Prompts as Guides</h3>
              <p className="text-warm-gray">
                The prompts provided are starting points. Feel free to skip questions that don't resonate and go deeper on topics that feel important.
                Let your intuition guide the process.
              </p>
            </div>

            <div className="border-t border-warm-gray/20 pt-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">Bring It to Therapy</h3>
              <p className="text-warm-gray">
                Share your journal entries with your therapist to deepen your work together. Your therapist can help you identify patterns,
                challenge limiting beliefs, and develop deeper insights.
              </p>
            </div>

            <div className="border-t border-warm-gray/20 pt-6">
              <h3 className="text-xl font-bold text-text-dark mb-3">Review & Reflect</h3>
              <p className="text-warm-gray">
                Periodically read back through your entries. You'll notice growth, patterns, and shifts in your perspective that affirm your progress.
                This becomes a record of your healing journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">How to Get Started with Journaling</h2>

          <div className="card space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-sage text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-2">Choose Your Journal</h3>
                <p className="text-warm-gray">
                  Start with a journal that resonates with you. If you're new to journaling, try gratitude, morning pages, or evening reflection.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-sage text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-2">Download & Print</h3>
                <p className="text-warm-gray">
                  Click the download button and save the PDF. Print as many copies as you need or use it digitally on your device.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-sage text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-2">Find Your Time</h3>
                <p className="text-warm-gray">
                  Schedule a consistent time for journaling. Whether it's first thing in the morning or before bed, consistency builds the habit.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-sage text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-2">Write Authentically</h3>
                <p className="text-warm-gray">
                  Answer the prompts honestly. Your journal is for you alone. There's no judgment, no right answers—just authentic expression.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-sage text-white font-bold">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-2">Track Your Journey</h3>
                <p className="text-warm-gray">
                  Keep all your entries together. Over weeks and months, you'll see growth, healing, and positive changes in your thinking and feeling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Recommendations by Goal */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8">Journal Recommendations by Goal</h2>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">To Reduce Anxiety & Worry</h3>
              <p className="text-warm-gray mb-4">
                Try the CBT Thought Journal to identify and challenge anxious thoughts, or the Gratitude Journal to shift focus toward the positive.
              </p>
              <div className="flex gap-2">
                {['CBT Thought Journal', 'Gratitude Journal', 'Evening Reflection'].map((rec) => (
                  <span key={rec} className="px-3 py-1 bg-cream text-xs rounded-full text-text-dark">
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">To Process Difficult Emotions</h3>
              <p className="text-warm-gray mb-4">
                Use the Emotion Processing Journal to explore feelings deeply, or the Self-Compassion Journal to respond to pain with kindness.
              </p>
              <div className="flex gap-2">
                {['Emotion Processing Journal', 'Self-Compassion Journal', 'Evening Reflection'].map((rec) => (
                  <span key={rec} className="px-3 py-1 bg-cream text-xs rounded-full text-text-dark">
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">To Heal from Trauma</h3>
              <p className="text-warm-gray mb-4">
                Begin with the Trauma Healing Journal for gentle, safety-focused processing, alongside the Self-Compassion Journal for supportive care.
              </p>
              <div className="flex gap-2">
                {['Trauma Healing Journal', 'Self-Compassion Journal', 'Evening Reflection'].map((rec) => (
                  <span key={rec} className="px-3 py-1 bg-cream text-xs rounded-full text-text-dark">
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">To Clarify Goals & Direction</h3>
              <p className="text-warm-gray mb-4">
                Explore your purpose with the Career & Purpose Journal and Goal-Setting Journal. Use these weekly to track progress.
              </p>
              <div className="flex gap-2">
                {['Career & Purpose Journal', 'Goal-Setting Journal', 'Evening Reflection'].map((rec) => (
                  <span key={rec} className="px-3 py-1 bg-cream text-xs rounded-full text-text-dark">
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">To Improve Relationships</h3>
              <p className="text-warm-gray mb-4">
                Use the Relationship Reflection Journal to understand dynamics and communication. Pair with Self-Compassion for healthy boundaries.
              </p>
              <div className="flex gap-2">
                {['Relationship Reflection Journal', 'Self-Compassion Journal', 'CBT Thought Journal'].map((rec) => (
                  <span key={rec} className="px-3 py-1 bg-cream text-xs rounded-full text-text-dark">
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold text-text-dark mb-3">To Start a Daily Mindfulness Practice</h3>
              <p className="text-warm-gray mb-4">
                Combine Morning Pages (to clear your mind) with Evening Reflection (to process your day). Add Gratitude Journal for additional benefits.
              </p>
              <div className="flex gap-2">
                {['Morning Pages Journal', 'Evening Reflection Journal', 'Gratitude Journal'].map((rec) => (
                  <span key={rec} className="px-3 py-1 bg-cream text-xs rounded-full text-text-dark">
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Through Journaling?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Therapeutic journaling is powerful on its own, but it's even more effective when paired with professional guidance and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn bg-white text-primary-sage hover:bg-cream">
              Explore Our Services
            </Link>
            <Link href="/contact" className="btn border-2 border-white hover:bg-white hover:text-primary-sage">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
