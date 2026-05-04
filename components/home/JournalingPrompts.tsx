import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

const prompts = [
  {
    day: 1,
    prompt: "What are three things you're most grateful for today, and why?",
    category: "Gratitude"
  },
  {
    day: 2,
    prompt: "Describe a challenge you overcame recently. What did you learn from it?",
    category: "Growth"
  },
  {
    day: 3,
    prompt: "What does self-compassion look like for you in this moment?",
    category: "Self-Care"
  },
  {
    day: 4,
    prompt: "Write about a person who has positively influenced your life.",
    category: "Relationships"
  },
  {
    day: 5,
    prompt: "What are your core values, and how do they guide your decisions?",
    category: "Values"
  },
  {
    day: 6,
    prompt: "Describe a time when you felt truly at peace. What made it possible?",
    category: "Mindfulness"
  }
]

export default function JournalingPrompts() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="w-20 h-1 bg-gradient-sand rounded-full mx-auto mb-6"></div>
            <BookOpen className="w-16 h-16 text-primary-sage mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              Daily Journaling Prompts
            </h2>
            <p className="text-xl text-text-dark max-w-3xl mx-auto">
              30 days of guided self-reflection to deepen self-awareness and spark personal growth.
              Each prompt is designed to help you explore different aspects of your inner world.
            </p>
          </div>

          {/* Sample Prompts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {prompts.map((item) => (
              <div
                key={item.day}
                className="bg-warm-cream border-l-4 border-primary-sage rounded-lg p-6 hover:shadow-soft transition-shadow"
              >
                <div className="w-12 h-1 bg-gradient-sand rounded-full mb-4"></div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-warm-sand bg-primary-sage/10 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-lg font-bold text-primary-sage">
                    Day {item.day}
                  </span>
                </div>
                <p className="text-text-dark leading-relaxed">
                  {item.prompt}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary-sage to-primary-sage/80 text-white rounded-xl p-8 shadow-soft">
              <h3 className="text-2xl font-bold mb-4">Start Your 30-Day Journey</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Download the complete workbook with all 30 journaling prompts, plus guided writing spaces
                and reflection exercises. Perfect for daily self-care and personal growth.
              </p>
              <Link
                href="/resources/journaling-prompts"
                className="bg-warm-sand text-text-dark px-8 py-4 rounded-lg font-semibold hover:bg-warm-sand/90 transition-colors inline-flex items-center shadow-soft"
              >
                Download Free Workbook
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
