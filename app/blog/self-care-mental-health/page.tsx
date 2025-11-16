import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, Share2, Facebook, Twitter, Linkedin, Mail, BookOpen, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Evidence-Based Self-Care for Mental Health | Beyond Bubble Baths',
  description: 'Discover research-backed self-care practices that truly support mental wellbeing. Learn about effective self-care strategies from a licensed therapist.',
  keywords: [
    'self-care mental health',
    'evidence-based self-care',
    'mental health practices',
    'self-care strategies',
    'wellbeing practices',
    'mental health maintenance',
    'self-care routine',
    'psychological self-care'
  ],
  openGraph: {
    title: 'Evidence-Based Self-Care for Mental Health',
    description: 'Research-backed self-care practices that truly support your mental wellbeing.',
    type: 'article',
    publishedTime: '2024-10-20T00:00:00.000Z',
    authors: ['Tamara Walls, M.Ed, LPCA'],
  },
}

export default function SelfCarePage() {
  const relatedArticles = [
    {
      title: 'CBT Techniques You Can Use in Daily Life',
      slug: 'cbt-techniques-daily-life',
      category: 'Self-Care'
    },
    {
      title: 'Understanding Anxiety: A Therapist\'s Guide',
      slug: 'understanding-anxiety-therapist-guide',
      category: 'Anxiety'
    },
    {
      title: '7 Signs It\'s Time to Seek Therapy',
      slug: 'signs-you-need-therapy',
      category: 'Professional'
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-block px-4 py-2 bg-primary-sage/10 text-primary-sage font-medium rounded-full mb-6">
            Self-Care
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6">
            Evidence-Based Self-Care for Mental Health
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-text-dark">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary-sage" />
              <span>Tamara Walls, M.Ed, LPCA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-sage" />
              <span>October 20, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-sage" />
              <span>6 min read</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-8 flex items-center space-x-4">
            <Share2 className="w-5 h-5 text-warm-gray" />
            <button className="p-2 hover:bg-white rounded-full transition-colors">
              <Facebook className="w-5 h-5 text-warm-gray hover:text-primary-sage" />
            </button>
            <button className="p-2 hover:bg-white rounded-full transition-colors">
              <Twitter className="w-5 h-5 text-warm-gray hover:text-primary-sage" />
            </button>
            <button className="p-2 hover:bg-white rounded-full transition-colors">
              <Linkedin className="w-5 h-5 text-warm-gray hover:text-primary-sage" />
            </button>
            <button className="p-2 hover:bg-white rounded-full transition-colors">
              <Mail className="w-5 h-5 text-warm-gray hover:text-primary-sage" />
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">

            <p className="text-xl text-text-dark leading-relaxed mb-8">
              When you hear "self-care," you might picture bubble baths, face masks, and scented candles. While relaxation activities can be pleasant, true self-care for mental health goes much deeper. Evidence-based self-care involves deliberate practices that nurture your psychological, emotional, and physical wellbeing—practices backed by research rather than marketing.
            </p>

            <p className="text-text-dark leading-relaxed mb-8">
              As a therapist, I often help clients distinguish between activities that feel good in the moment versus practices that genuinely support long-term mental health. Let's explore what research tells us actually works.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Redefining Self-Care</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              Self-care isn't selfish indulgence—it's maintenance of the most important tool you have: yourself. Just as you wouldn't drive a car indefinitely without oil changes or tire rotation, you can't function optimally without attending to your basic psychological and physical needs.
            </p>

            <div className="bg-primary-sage/10 border-l-4 border-primary-sage p-6 rounded my-8">
              <p className="font-semibold text-text-dark mb-3">True self-care involves:</p>
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                <li>Activities that restore and replenish your resources</li>
                <li>Practices that align with your long-term wellbeing, not just immediate pleasure</li>
                <li>Sometimes doing things that feel difficult in the moment but benefit you overall</li>
                <li>Setting boundaries and saying "no" when necessary</li>
                <li>Addressing problems rather than always escaping them</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Physical Self-Care: The Foundation</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Our physical and mental health are inseparable. The most robust evidence for mental health self-care starts with physical practices:
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Regular Physical Activity</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Exercise is one of the most powerful interventions for mental health. Research shows that regular physical activity:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-4 ml-4">
              <li>Reduces symptoms of depression as effectively as medication for some people</li>
              <li>Decreases anxiety and stress</li>
              <li>Improves sleep quality</li>
              <li>Enhances cognitive function and memory</li>
              <li>Boosts self-esteem and mood</li>
            </ul>
            <p className="text-text-dark leading-relaxed mb-6">
              You don't need intense workouts to benefit. Even 20-30 minutes of moderate activity (walking, dancing, gardening) most days of the week produces significant mental health benefits. The key is consistency and choosing activities you actually enjoy.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Sleep Hygiene</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Sleep is non-negotiable for mental health. Poor sleep worsens every mental health condition, while good sleep supports emotional regulation, stress management, and cognitive function.
            </p>

            <div className="bg-cream p-6 rounded-lg my-6">
              <p className="font-semibold text-text-dark mb-3">Evidence-based sleep practices:</p>
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                <li>Consistent sleep and wake times (even on weekends)</li>
                <li>7-9 hours of sleep for most adults</li>
                <li>Dark, cool, quiet sleeping environment</li>
                <li>Limiting screen time 1-2 hours before bed</li>
                <li>Avoiding caffeine after early afternoon</li>
                <li>Using your bed only for sleep (not work or scrolling)</li>
                <li>Creating a relaxing bedtime routine</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Nutrition and Hydration</h3>
            <p className="text-text-dark leading-relaxed mb-6">
              While nutrition alone doesn't cure mental health conditions, what we eat significantly impacts mood, energy, and cognitive function. Focus on regular, balanced meals with adequate protein, complex carbohydrates, and healthy fats. Stay hydrated—even mild dehydration affects mood and concentration.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Psychological Self-Care</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Beyond physical health, psychological self-care involves practices that nurture your mental and emotional wellbeing:
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Mindfulness and Meditation</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Extensive research supports mindfulness practices for mental health. Regular mindfulness meditation:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-4 ml-4">
              <li>Reduces symptoms of anxiety and depression</li>
              <li>Improves emotional regulation</li>
              <li>Decreases rumination and worry</li>
              <li>Enhances attention and focus</li>
              <li>Increases self-compassion</li>
            </ul>
            <p className="text-text-dark leading-relaxed mb-6">
              Start small—even 5 minutes daily of focused breathing or body awareness can make a difference. Apps, guided meditations, or mindfulness-based stress reduction (MBSR) programs can help you develop this practice.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Journaling and Expressive Writing</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Writing about thoughts and emotions provides numerous mental health benefits:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li>Processes difficult experiences and emotions</li>
              <li>Reduces intrusive thoughts</li>
              <li>Improves problem-solving</li>
              <li>Enhances self-awareness</li>
              <li>Tracks patterns and progress</li>
            </ul>
            <p className="text-text-dark leading-relaxed mb-6">
              Explore our <Link href="/resources/journals" className="text-primary-sage hover:text-earth-green font-medium underline">free therapeutic journaling resources</Link>.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Cognitive Techniques</h3>
            <p className="text-text-dark leading-relaxed mb-6">
              Using CBT skills independently is powerful self-care. This includes identifying and challenging negative thought patterns, practicing gratitude, and using thought records. These aren't just "positive thinking"—they're evidence-based techniques that change how your brain processes information.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              Learn <Link href="/blog/cbt-techniques-daily-life" className="text-primary-sage hover:text-earth-green font-medium underline">practical CBT techniques you can use daily</Link>.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Social Self-Care</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Humans are inherently social beings. Quality social connections are among the strongest predictors of mental health and longevity:
            </p>

            <div className="bg-cream p-6 rounded-lg my-6">
              <p className="font-semibold text-text-dark mb-3">Social self-care practices:</p>
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                <li>Regular contact with supportive friends and family</li>
                <li>Setting boundaries with relationships that drain you</li>
                <li>Seeking community through shared interests or activities</li>
                <li>Asking for help when you need it</li>
                <li>Being vulnerable and authentic with trusted people</li>
                <li>Contributing to others through volunteering or support</li>
              </ul>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              Note that social media often doesn't provide the same benefits as in-person or voice-to-voice connection. Be intentional about the quality of your social interactions, not just the quantity.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Practical and Environmental Self-Care</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Your environment and how you manage practical life matters significantly impact mental health:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li><strong>Organized space:</strong> Clutter and disorganization increase stress and cognitive load</li>
              <li><strong>Time management:</strong> Balancing responsibilities with rest prevents burnout</li>
              <li><strong>Financial self-care:</strong> Addressing money concerns rather than avoiding them</li>
              <li><strong>Nature exposure:</strong> Regular time outdoors reduces stress and improves mood</li>
              <li><strong>Limiting technology:</strong> Setting boundaries with screens and social media</li>
            </ul>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Spiritual and Value-Based Self-Care</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              This doesn't necessarily mean religion (though it can). Spiritual self-care involves connecting with what gives your life meaning and purpose:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li>Clarifying your core values</li>
              <li>Engaging in activities aligned with those values</li>
              <li>Practices that connect you to something larger than yourself</li>
              <li>Reflection on meaning and purpose</li>
              <li>Creative expression</li>
            </ul>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Creating Your Self-Care Plan</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Effective self-care is personal and intentional. Consider:
            </p>

            <div className="bg-primary-sage/10 border-l-4 border-primary-sage p-6 rounded my-6">
              <ol className="list-decimal list-inside space-y-3 text-text-dark">
                <li><strong>Assess current practices:</strong> What are you already doing? What's missing?</li>
                <li><strong>Identify priorities:</strong> Which areas need most attention right now?</li>
                <li><strong>Start small:</strong> Choose one practice from each category to begin</li>
                <li><strong>Schedule it:</strong> Self-care doesn't happen by accident—put it in your calendar</li>
                <li><strong>Track and adjust:</strong> Notice what actually helps versus what just sounds good</li>
                <li><strong>Be flexible:</strong> Your needs change—adjust your practices accordingly</li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">When Self-Care Isn't Enough</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              Self-care is essential for maintaining mental health, but it's not a replacement for professional treatment when needed. If you're struggling despite consistent self-care efforts, or if symptoms interfere with daily functioning, seeking therapy is important.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              Think of self-care as preventive maintenance and ongoing support, while therapy addresses specific concerns with professional expertise and evidence-based interventions.
            </p>
            <p className="text-text-dark leading-relaxed mb-8">
              Read about <Link href="/blog/signs-you-need-therapy" className="text-primary-sage hover:text-earth-green font-medium underline">signs it might be time to seek professional support</Link>.
            </p>

            {/* Resources Section */}
            <div className="bg-cream p-8 rounded-lg my-12">
              <h3 className="text-2xl font-bold text-text-dark mb-4">Self-Care Resources</h3>
              <ul className="space-y-3 text-text-dark">
                <li>
                  <Link href="/resources/worksheets" className="text-primary-sage hover:text-earth-green font-medium">
                    Download Free Self-Care Planning Worksheets →
                  </Link>
                </li>
                <li>
                  <Link href="/resources/habit-trackers" className="text-primary-sage hover:text-earth-green font-medium">
                    Get Habit Tracking Tools →
                  </Link>
                </li>
                <li>
                  <Link href="/resources/journals" className="text-primary-sage hover:text-earth-green font-medium">
                    Access Journaling Templates →
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 gradient-sage-bg text-white rounded-xl text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">Need Support Beyond Self-Care?</h3>
            <p className="text-lg mb-6 opacity-90">
              While self-care is essential, sometimes professional support makes all the difference. Schedule a consultation to discuss how therapy can complement your self-care practices.
            </p>
            <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
              Schedule Free Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-8 bg-cream rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-gradient-sage-bg rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-2xl">TW</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-dark mb-2">About the Author</h4>
                <p className="text-text-dark mb-2">
                  <strong>Tamara Walls, M.Ed, LPCA</strong> helps clients develop sustainable self-care practices tailored to their unique needs and lifestyles. She believes self-care is a skill that can be learned and refined over time.
                </p>
                <Link href="/about" className="text-primary-sage hover:text-earth-green font-medium">
                  Learn more about Tamara →
                </Link>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-text-dark mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="card group cursor-pointer"
                >
                  <div className="inline-block px-3 py-1 bg-primary-sage/10 text-primary-sage text-sm font-medium rounded-full mb-3">
                    {article.category}
                  </div>
                  <h4 className="text-lg font-bold text-text-dark group-hover:text-primary-sage transition-colors">
                    {article.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link href="/blog" className="inline-flex items-center text-primary-sage hover:text-earth-green font-medium">
              <BookOpen className="mr-2 w-5 h-5" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
