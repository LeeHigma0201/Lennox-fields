import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Download, ArrowLeft, Heart } from 'lucide-react'
import NotTherapyDisclaimer from '@/components/NotTherapyDisclaimer'

const allPrompts = [
  // Day 1-10: Foundation Building
  { day: 1, prompt: "What are three things you're most grateful for today, and why?", category: "Gratitude" },
  { day: 2, prompt: "Describe a challenge you overcame recently. What did you learn from it?", category: "Growth" },
  { day: 3, prompt: "What does self-compassion look like for you in this moment?", category: "Self-Care" },
  { day: 4, prompt: "Write about a person who has positively influenced your life.", category: "Relationships" },
  { day: 5, prompt: "What are your core values, and how do they guide your decisions?", category: "Values" },
  { day: 6, prompt: "Describe a time when you felt truly at peace. What made it possible?", category: "Mindfulness" },
  { day: 7, prompt: "What are your strengths, and how have they helped you in difficult times?", category: "Strengths" },
  { day: 8, prompt: "Write about a goal you're working toward. What's one small step you can take tomorrow?", category: "Goals" },
  { day: 9, prompt: "How do you typically respond to stress? Is this response serving you well?", category: "Stress" },
  { day: 10, prompt: "What brings you joy, and when was the last time you experienced it?", category: "Joy" },

  // Day 11-20: Deeper Exploration
  { day: 11, prompt: "Describe your ideal day from start to finish.", category: "Vision" },
  { day: 12, prompt: "What are some limiting beliefs you hold about yourself?", category: "Beliefs" },
  { day: 13, prompt: "Write a letter to your younger self. What would you want them to know?", category: "Reflection" },
  { day: 14, prompt: "What does forgiveness mean to you, and is there someone you need to forgive?", category: "Forgiveness" },
  { day: 15, prompt: "Describe your support system. Who can you turn to when you need help?", category: "Support" },
  { day: 16, prompt: "What are you most proud of accomplishing in the past year?", category: "Pride" },
  { day: 17, prompt: "How do you define success for yourself (not what others expect)?", category: "Success" },
  { day: 18, prompt: "What are some healthy boundaries you need to set in your life?", category: "Boundaries" },
  { day: 19, prompt: "Write about a time you failed. What did you learn from the experience?", category: "Learning" },
  { day: 20, prompt: "What does authentic self-expression look like for you?", category: "Authenticity" },

  // Day 21-30: Integration & Growth
  { day: 21, prompt: "How have you grown in the past 20 days of journaling?", category: "Growth" },
  { day: 22, prompt: "What are you ready to let go of in your life?", category: "Release" },
  { day: 23, prompt: "Describe your self-care routine. What works well, and what needs improvement?", category: "Self-Care" },
  { day: 24, prompt: "What would you do if you knew you couldn't fail?", category: "Courage" },
  { day: 25, prompt: "Write about someone you admire. What qualities do they embody that you want to cultivate?", category: "Inspiration" },
  { day: 26, prompt: "What does living with intention mean to you?", category: "Intention" },
  { day: 27, prompt: "How do you want to be remembered by those who love you?", category: "Legacy" },
  { day: 28, prompt: "What brings meaning and purpose to your life?", category: "Purpose" },
  { day: 29, prompt: "Write a letter to your future self. What hopes do you have for them?", category: "Future" },
  { day: 30, prompt: "What have you learned about yourself through this 30-day journey?", category: "Reflection" }
]

export default function JournalingPromptsPage() {
  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Header */}
      <section className="bg-white shadow-soft">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-primary-sage hover:text-primary-sage/80">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src="/images/brand/lotus-mark.svg"
                alt="Lennox Fields lotus mark"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-heading font-bold text-text-dark">Lennox Fields</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-warm-cream to-primary-sage/10">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-1 bg-gradient-sand rounded-full mx-auto mb-6"></div>
            <BookOpen className="w-16 h-16 text-primary-sage mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6">
              30 Daily Journaling Prompts
            </h1>
            <p className="text-xl text-text-dark mb-8">
              A 30-day guided journey of self-discovery and personal growth.
              Each prompt is designed to help you explore different aspects of your inner world and build self-awareness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-sage text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-sage/90 transition-colors inline-flex items-center shadow-soft">
                <Download className="mr-2 w-5 h-5" />
                Download Free Workbook (PDF)
              </button>
              <Link href="/contact" className="border-2 border-primary-sage text-primary-sage px-8 py-4 rounded-lg font-semibold hover:bg-primary-sage hover:text-white transition-colors inline-flex items-center justify-center">
                Schedule a Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8 mb-12">
            <NotTherapyDisclaimer />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-gradient-sand rounded-full mb-6"></div>
            <h2 className="text-3xl font-bold text-text-dark mb-8">How to Use This Workbook</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-warm-cream border-l-4 border-primary-sage rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-sage mb-4">Daily Practice</h3>
                <ul className="space-y-2 text-text-dark">
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2 text-lg">•</span>
                    Spend 10–15 minutes each morning or evening
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2 text-lg">•</span>
                    Write freely—there is no right or wrong answer
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2 text-lg">•</span>
                    Be honest and compassionate with yourself
                  </li>
                </ul>
              </div>

              <div className="bg-warm-cream border-l-4 border-primary-sage rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-sage mb-4">Getting Started</h3>
                <ul className="space-y-2 text-text-dark">
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2 text-lg">•</span>
                    Find a quiet, comfortable space
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2 text-lg">•</span>
                    Use this as a daily ritual for self-care
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-sage mr-2 text-lg">•</span>
                    Track your progress and insights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Prompts */}
      <section className="section-padding bg-warm-cream">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-text-dark mb-12 text-center">All 30 Journaling Prompts</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPrompts.map((item) => (
                <div
                  key={item.day}
                  className="bg-white border-l-4 border-primary-sage rounded-lg p-6 hover:shadow-soft transition-shadow"
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
                  <p className="text-text-dark leading-relaxed mb-4">
                    {item.prompt}
                  </p>
                  <div className="border-t border-primary-sage/20 pt-4">
                    <p className="text-xs text-warm-gray italic">
                      Space for your reflections:
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="border-b border-warm-gray/50 h-4"></div>
                      <div className="border-b border-warm-gray/50 h-4"></div>
                      <div className="border-b border-warm-gray/50 h-4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Therapeutic Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 text-primary-sage mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-text-dark mb-8">Therapeutic Benefits of Journaling</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">🧠</span>
                </div>
                <h3 className="font-semibold text-text-dark mb-2">Mental Clarity</h3>
                <p className="text-sm text-warm-gray">Process thoughts and emotions more effectively</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">💪</span>
                </div>
                <h3 className="font-semibold text-text-dark mb-2">Stress Reduction</h3>
                <p className="text-sm text-warm-gray">Release pent-up emotions and reduce anxiety</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">🎯</span>
                </div>
                <h3 className="font-semibold text-text-dark mb-2">Self-Awareness</h3>
                <p className="text-sm text-warm-gray">Gain deeper insight into your thoughts and behaviors</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary-sage rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">🌱</span>
                </div>
                <h3 className="font-semibold text-text-dark mb-2">Personal Growth</h3>
                <p className="text-sm text-warm-gray">Track your progress and celebrate your development</p>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/contact" className="bg-primary-sage text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-sage/90 transition-colors inline-flex items-center">
                Start Your Journey Today
                <Heart className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
