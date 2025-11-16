import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, Share2, Facebook, Twitter, Linkedin, Mail, BookOpen, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: '7 Signs It\'s Time to Seek Therapy | When to Get Professional Help',
  description: 'Learn to recognize the signs that indicate it might be time to seek professional mental health support. Expert guidance on when therapy can help.',
  keywords: [
    'when to seek therapy',
    'signs you need therapy',
    'mental health support',
    'therapy benefits',
    'counseling help',
    'when to see a therapist',
    'mental health professional',
    'therapy signs'
  ],
  openGraph: {
    title: '7 Signs It\'s Time to Seek Therapy',
    description: 'Recognizing when professional mental health support could be beneficial.',
    type: 'article',
    publishedTime: '2024-11-10T00:00:00.000Z',
    authors: ['Tamara Walls, M.Ed, LPCA'],
  },
}

export default function SignsTherapyPage() {
  const relatedArticles = [
    {
      title: 'How to Choose the Right Therapist for You',
      slug: 'choosing-right-therapist',
      category: 'Professional'
    },
    {
      title: 'Understanding Anxiety: A Therapist\'s Guide',
      slug: 'understanding-anxiety-therapist-guide',
      category: 'Anxiety'
    },
    {
      title: 'Evidence-Based Self-Care for Mental Health',
      slug: 'self-care-mental-health',
      category: 'Self-Care'
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-16">
        <div className="container-custom max-w-4xl">
          <div className="inline-block px-4 py-2 bg-primary-sage/10 text-primary-sage font-medium rounded-full mb-6">
            Professional
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6">
            7 Signs It's Time to Seek Therapy
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-text-dark">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary-sage" />
              <span>Tamara Walls, M.Ed, LPCA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-sage" />
              <span>November 10, 2024</span>
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
              Deciding to seek therapy is a significant and courageous step. Many people wonder if their struggles are "serious enough" to warrant professional support, or they hope their difficulties will resolve on their own. The truth is, you don't need to be in crisis to benefit from therapy. In fact, seeking support early can prevent problems from escalating and help you develop skills that serve you for life.
            </p>

            <p className="text-text-dark leading-relaxed mb-8">
              Here are seven signs that indicate it might be time to reach out to a mental health professional.
            </p>

            <div className="my-12">
              <div className="flex items-start space-x-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-sage/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-sage" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">1. Your Emotions Feel Overwhelming or Unmanageable</h2>
                  <p className="text-text-dark leading-relaxed mb-4">
                    Everyone experiences difficult emotions, but when sadness, anxiety, anger, or hopelessness feel constant and overwhelming, it may be time to seek support. If you find yourself unable to control your emotional responses, experiencing frequent mood swings, or feeling emotionally numb, a therapist can help you understand and regulate these feelings.
                  </p>
                  <p className="text-text-dark leading-relaxed">
                    Therapy provides tools to process emotions in healthy ways and develop emotional resilience. You'll learn to identify triggers, understand patterns, and develop coping strategies that work for your unique situation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-sage/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-sage" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">2. Daily Activities Feel Difficult or Impossible</h2>
                  <p className="text-text-dark leading-relaxed mb-4">
                    When mental health struggles interfere with everyday functioning—getting out of bed, going to work, maintaining personal hygiene, or taking care of responsibilities—professional support is warranted. This level of difficulty isn't a sign of weakness or laziness; it's often a symptom of depression, anxiety, or other mental health conditions that respond well to treatment.
                  </p>
                  <p className="text-text-dark leading-relaxed">
                    A therapist can help identify what's creating these barriers and work with you to gradually rebuild your ability to engage in daily activities. Small improvements in functioning often lead to larger positive changes in overall wellbeing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-sage/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-sage" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">3. Your Relationships Are Suffering</h2>
                  <p className="text-text-dark leading-relaxed mb-4">
                    Relationships require effort and occasionally face challenges, but persistent conflict, communication breakdowns, or relationship patterns that leave you feeling unfulfilled may indicate the need for professional guidance. This applies to romantic relationships, friendships, family dynamics, and workplace relationships.
                  </p>
                  <p className="text-text-dark leading-relaxed">
                    Therapy—whether individual, couples, or family therapy—can help you understand relationship dynamics, improve communication skills, set healthy boundaries, and address underlying issues affecting your connections with others. Many clients report that improved relationship skills positively impact every area of their lives.
                  </p>
                  <p className="text-text-dark leading-relaxed mt-4">
                    Explore <Link href="/services/couples-therapy" className="text-primary-sage hover:text-earth-green font-medium underline">couples therapy</Link> or <Link href="/services/family-therapy" className="text-primary-sage hover:text-earth-green font-medium underline">family therapy</Link> options.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-sage/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-sage" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">4. You're Using Substances to Cope</h2>
                  <p className="text-text-dark leading-relaxed mb-4">
                    If you find yourself increasingly relying on alcohol, drugs, food, shopping, or other behaviors to manage stress, numb emotions, or escape from problems, this is a clear sign that professional support could help. What may start as occasional coping can quickly develop into dependency or addiction.
                  </p>
                  <p className="text-text-dark leading-relaxed">
                    A therapist can help you develop healthier coping mechanisms, address underlying issues driving the substance use, and create a treatment plan that may include additional support services if needed. Early intervention significantly improves outcomes and prevents escalation of substance use concerns.
                  </p>
                  <p className="text-text-dark leading-relaxed mt-4">
                    Learn about <Link href="/services/substance-use" className="text-primary-sage hover:text-earth-green font-medium underline">substance use disorder treatment</Link> options.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-sage/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-sage" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">5. Past Trauma Is Affecting Your Present</h2>
                  <p className="text-text-dark leading-relaxed mb-4">
                    Traumatic experiences—whether recent or from childhood—can continue to impact your life long after the events occurred. If you experience flashbacks, nightmares, hypervigilance, difficulty trusting others, or feel stuck in patterns related to past trauma, specialized therapy can help you process these experiences and reduce their hold on your present life.
                  </p>
                  <p className="text-text-dark leading-relaxed">
                    Trauma-focused therapies like EMDR (Eye Movement Desensitization and Reprocessing) and trauma-informed CBT have strong evidence for effectiveness. You don't have to continue carrying the weight of past experiences alone.
                  </p>
                  <p className="text-text-dark leading-relaxed mt-4">
                    Discover <Link href="/services/individual-therapy" className="text-primary-sage hover:text-earth-green font-medium underline">trauma-informed individual therapy</Link> approaches.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-sage/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-sage" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">6. You Feel Stuck or Unfulfilled</h2>
                  <p className="text-text-dark leading-relaxed mb-4">
                    You don't need to be experiencing a mental health crisis to benefit from therapy. Many people seek counseling because they feel stuck in their career, relationships, or personal growth. If you're experiencing a sense of emptiness, questioning your life direction, or feeling like you're just "going through the motions," therapy can help you clarify your values, set meaningful goals, and create positive change.
                  </p>
                  <p className="text-text-dark leading-relaxed">
                    Therapy provides space for self-exploration and personal development that our busy lives rarely allow. It's an investment in becoming the person you want to be and living a life aligned with your values.
                  </p>
                  <p className="text-text-dark leading-relaxed mt-4">
                    Consider <Link href="/services/career-counseling" className="text-primary-sage hover:text-earth-green font-medium underline">career counseling</Link> if professional fulfillment is your focus.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-sage/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary-sage" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-text-dark mb-4">7. People You Trust Have Expressed Concern</h2>
                  <p className="text-text-dark leading-relaxed mb-4">
                    Sometimes we're the last to recognize when we're struggling. If multiple people in your life—friends, family members, colleagues—have expressed worry about your wellbeing, mood changes, or behavior, it's worth taking their observations seriously. Those who care about us often notice changes we might minimize or miss ourselves.
                  </p>
                  <p className="text-text-dark leading-relaxed">
                    Rather than becoming defensive, consider scheduling a consultation with a therapist to get a professional perspective. Even if you decide you don't need ongoing therapy, a few sessions can provide valuable insight and peace of mind.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">You Don't Have to Wait for a Crisis</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              One of the most important things to understand about therapy is that you don't need to wait until you're in crisis to seek support. In fact, early intervention often prevents problems from escalating and helps you develop resilience and coping skills before challenges become overwhelming.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              Think of therapy like regular check-ups with your doctor. You wouldn't wait until you're seriously ill to seek medical care; similarly, proactive mental health care can keep small concerns from becoming major problems.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Taking the First Step</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              If you've recognized yourself in any of these signs, consider reaching out to a mental health professional. The first step is often the hardest, but it's also the most important. Many therapists offer free consultations where you can discuss your concerns, learn about their approach, and determine if they're a good fit for you.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              Remember: seeking therapy is a sign of self-awareness and strength, not weakness. You deserve support, and help is available.
            </p>
            <p className="text-text-dark leading-relaxed mb-8">
              Learn more about <Link href="/blog/choosing-right-therapist" className="text-primary-sage hover:text-earth-green font-medium underline">how to choose the right therapist</Link> for your needs.
            </p>

            {/* Resources Section */}
            <div className="bg-cream p-8 rounded-lg my-12">
              <h3 className="text-2xl font-bold text-text-dark mb-4">Ready to Get Started?</h3>
              <ul className="space-y-3 text-text-dark">
                <li>
                  <Link href="/contact" className="text-primary-sage hover:text-earth-green font-medium">
                    Schedule a Free 15-Minute Consultation →
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-primary-sage hover:text-earth-green font-medium">
                    Explore Our Therapy Services →
                  </Link>
                </li>
                <li>
                  <Link href="/tools/screening-tools" className="text-primary-sage hover:text-earth-green font-medium">
                    Take a Free Mental Health Screening →
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 gradient-sage-bg text-white rounded-xl text-center">
            <h3 className="text-3xl font-bold mb-4">Take the First Step Today</h3>
            <p className="text-lg mb-6 opacity-90">
              You don't have to navigate life's challenges alone. Schedule a free consultation to discuss how therapy can support your mental health and wellbeing.
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
                  <strong>Tamara Walls, M.Ed, LPCA</strong> is a Licensed Professional Counselor Associate who believes everyone deserves access to quality mental health care. She specializes in helping individuals recognize when they need support and find the right therapeutic approach for their unique needs.
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
