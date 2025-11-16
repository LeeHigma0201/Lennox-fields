import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, Share2, Facebook, Twitter, Linkedin, Mail, BookOpen, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Choose the Right Therapist for You | Finding the Perfect Therapeutic Fit',
  description: 'Learn what to look for when choosing a therapist, important questions to ask, and how to find the right therapeutic fit for your mental health needs.',
  keywords: [
    'choosing a therapist',
    'finding a therapist',
    'therapist selection',
    'therapeutic fit',
    'mental health professional',
    'counselor selection',
    'therapy questions',
    'good therapist qualities'
  ],
  openGraph: {
    title: 'How to Choose the Right Therapist for You',
    description: 'Expert guidance on finding the perfect therapeutic fit for your mental health journey.',
    type: 'article',
    publishedTime: '2024-10-28T00:00:00.000Z',
    authors: ['Tamara Walls, M.Ed, LPCA'],
  },
}

export default function ChoosingTherapistPage() {
  const relatedArticles = [
    {
      title: '7 Signs It\'s Time to Seek Therapy',
      slug: 'signs-you-need-therapy',
      category: 'Professional'
    },
    {
      title: 'Understanding Anxiety: A Therapist\'s Guide',
      slug: 'understanding-anxiety-therapist-guide',
      category: 'Anxiety'
    },
    {
      title: 'CBT Techniques You Can Use in Daily Life',
      slug: 'cbt-techniques-daily-life',
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
            How to Choose the Right Therapist for You
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-text-dark">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary-sage" />
              <span>Tamara Walls, M.Ed, LPCA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-sage" />
              <span>October 28, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-sage" />
              <span>7 min read</span>
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
              Finding the right therapist is one of the most important factors in successful therapy outcomes. Research consistently shows that the therapeutic relationship—the connection between client and therapist—is a stronger predictor of positive results than the specific therapeutic approach used. But with so many options available, how do you find the right fit?
            </p>

            <p className="text-text-dark leading-relaxed mb-8">
              This guide will help you understand what to look for, questions to ask, and how to evaluate whether a therapist is the right match for your unique needs.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Understanding Different Types of Mental Health Professionals</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Before beginning your search, it helps to understand the different types of mental health professionals and their training:
            </p>

            <div className="bg-cream p-6 rounded-lg my-6">
              <ul className="space-y-4 text-text-dark">
                <li>
                  <strong>Psychiatrists (MD or DO):</strong> Medical doctors who can prescribe medication and provide therapy. Often focus on medication management rather than ongoing therapy.
                </li>
                <li>
                  <strong>Psychologists (PhD or PsyD):</strong> Doctoral-level professionals trained in psychological assessment and various therapy approaches. Cannot prescribe medication in most states.
                </li>
                <li>
                  <strong>Licensed Professional Counselors (LPC, LPCA):</strong> Master's-level therapists trained in counseling and various therapeutic approaches. Focus on mental health counseling and life transitions.
                </li>
                <li>
                  <strong>Licensed Clinical Social Workers (LCSW):</strong> Master's-level professionals who can provide therapy and often work from a systems perspective, considering environmental and social factors.
                </li>
                <li>
                  <strong>Licensed Marriage and Family Therapists (LMFT):</strong> Specialize in relational and family systems therapy.
                </li>
              </ul>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              All these professionals are qualified to provide therapy. The designation is less important than finding someone whose approach, specialization, and personality align with your needs.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Key Factors to Consider</h2>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Specialization and Experience</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Look for therapists who specialize in your particular concerns. While many therapists are generalists who can address common issues, specialized experience matters for specific conditions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li>Anxiety disorders and panic attacks</li>
              <li>Depression and mood disorders</li>
              <li>Trauma and PTSD</li>
              <li>Relationship issues</li>
              <li>Eating disorders</li>
              <li>Substance use disorders</li>
              <li>Career transitions</li>
            </ul>
            <p className="text-text-dark leading-relaxed mb-6">
              Don't hesitate to ask about their experience with your specific concerns. A therapist who regularly works with your issue will likely be more effective than one who sees it rarely.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Therapeutic Approach</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Different therapeutic approaches work better for different people and problems. Common evidence-based approaches include:
            </p>

            <div className="bg-primary-sage/10 border-l-4 border-primary-sage p-6 rounded my-6">
              <ul className="space-y-3 text-text-dark">
                <li>
                  <strong>Cognitive Behavioral Therapy (CBT):</strong> Focuses on changing thought patterns and behaviors. Highly effective for anxiety, depression, and many other concerns. Often includes homework and skill-building.
                </li>
                <li>
                  <strong>Psychodynamic Therapy:</strong> Explores how past experiences and unconscious patterns influence current behavior. More insight-oriented and exploratory.
                </li>
                <li>
                  <strong>EMDR:</strong> Specialized approach for trauma processing using bilateral stimulation.
                </li>
                <li>
                  <strong>Dialectical Behavior Therapy (DBT):</strong> Combines CBT with mindfulness. Particularly effective for emotion regulation and relationship skills.
                </li>
                <li>
                  <strong>Acceptance and Commitment Therapy (ACT):</strong> Focuses on accepting difficult emotions while taking action aligned with your values.
                </li>
              </ul>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              Many therapists integrate multiple approaches. Ask them to explain their typical approach and why they think it would work for you.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              Learn more about <Link href="/blog/cbt-techniques-daily-life" className="text-primary-sage hover:text-earth-green font-medium underline">CBT techniques and approaches</Link>.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Practical Considerations</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Beyond clinical factors, practical matters significantly impact your ability to engage in consistent therapy:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li><strong>Location and accessibility:</strong> In-person, telehealth, or hybrid options?</li>
              <li><strong>Scheduling:</strong> Do their available times work with your schedule?</li>
              <li><strong>Cost:</strong> Session fees, insurance acceptance, sliding scale availability</li>
              <li><strong>Session length and frequency:</strong> Typical session duration and recommended frequency</li>
              <li><strong>Communication between sessions:</strong> Policies on emails, texts, or crisis support</li>
            </ul>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Cultural Competency and Identity Considerations</h3>
            <p className="text-text-dark leading-relaxed mb-6">
              For many people, working with a therapist who understands their cultural background, identity, or specific life experiences is important. Consider whether you need a therapist who shares your background or has specific training in:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li>LGBTQ+ issues</li>
              <li>Racial or ethnic identity concerns</li>
              <li>Religious or spiritual perspectives</li>
              <li>Immigration experiences</li>
              <li>Chronic illness or disability</li>
            </ul>
            <p className="text-text-dark leading-relaxed mb-6">
              It's entirely appropriate to ask about a therapist's experience and training in areas relevant to your identity.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Questions to Ask During a Consultation</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Many therapists offer free initial consultations (typically 15-20 minutes). Use this time to evaluate fit. Here are important questions to ask:
            </p>

            <div className="bg-cream p-6 rounded-lg my-8">
              <p className="font-semibold text-text-dark mb-4">Essential Questions:</p>
              <ul className="space-y-3 text-text-dark">
                <li>What is your experience with [your specific concern]?</li>
                <li>What therapeutic approach do you typically use, and why?</li>
                <li>What would a typical session look like?</li>
                <li>How do you measure progress in therapy?</li>
                <li>What's your availability and session frequency recommendation?</li>
                <li>What are your fees, and do you accept my insurance?</li>
                <li>What is your cancellation policy?</li>
                <li>How do you handle crisis situations or contact between sessions?</li>
                <li>How long do you typically work with clients?</li>
              </ul>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              Pay attention not just to their answers, but to how they communicate. Do they explain things clearly? Do you feel comfortable asking questions? Do they seem genuinely interested in your concerns?
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Red Flags to Watch For</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              While most therapists are ethical and competent, here are warning signs to watch for:
            </p>

            <div className="bg-alert-red/10 border-l-4 border-alert-red p-6 rounded my-6">
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                <li>Guarantees specific outcomes or promises a "cure"</li>
                <li>Shares inappropriate personal information</li>
                <li>Dismisses or minimizes your concerns</li>
                <li>Pushes a single approach without considering your preferences</li>
                <li>Doesn't respect boundaries or makes you uncomfortable</li>
                <li>Isn't licensed or won't provide credentials</li>
                <li>Frequently cancels or reschedules appointments</li>
                <li>Suggests activities or relationships outside of therapy</li>
              </ul>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              Trust your instincts. If something feels off, it's okay to seek a different therapist.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Evaluating the Therapeutic Relationship</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              Give the relationship a few sessions before making a final decision. Initial nervousness is normal, but you should start feeling some level of comfort and trust developing. Ask yourself:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li>Do I feel heard and understood?</li>
              <li>Does the therapist seem genuinely invested in my wellbeing?</li>
              <li>Can I be honest and vulnerable with this person?</li>
              <li>Do I feel respected and not judged?</li>
              <li>Is the therapist providing helpful insights or tools?</li>
              <li>Do I leave sessions feeling like we accomplished something?</li>
            </ul>

            <p className="text-text-dark leading-relaxed mb-6">
              If after 3-4 sessions you're still not feeling a connection or seeing value, it's absolutely appropriate to discuss this with your therapist or seek someone else. Good therapists understand that fit matters and won't take it personally.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Making the Decision</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              Choosing a therapist is a personal decision that depends on multiple factors—clinical expertise, practical considerations, personal chemistry, and your specific needs. Trust yourself to make the right choice, and remember that you can always make a change if needed.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              The fact that you're taking the time to find the right fit shows investment in your mental health journey. This thoughtfulness will serve you well in therapy.
            </p>
            <p className="text-text-dark leading-relaxed mb-8">
              Ready to get started? Read about <Link href="/blog/signs-you-need-therapy" className="text-primary-sage hover:text-earth-green font-medium underline">signs it might be time to seek therapy</Link>.
            </p>

            {/* Resources Section */}
            <div className="bg-cream p-8 rounded-lg my-12">
              <h3 className="text-2xl font-bold text-text-dark mb-4">Start Your Search</h3>
              <ul className="space-y-3 text-text-dark">
                <li>
                  <Link href="/contact" className="text-primary-sage hover:text-earth-green font-medium">
                    Schedule a Free Consultation with Our Practice →
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-primary-sage hover:text-earth-green font-medium">
                    Explore Our Therapy Services and Approaches →
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-primary-sage hover:text-earth-green font-medium">
                    Learn About Our Therapist's Background and Specializations →
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 gradient-sage-bg text-white rounded-xl text-center">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">Ready to Find Your Therapeutic Fit?</h3>
            <p className="text-lg mb-6 opacity-90">
              Schedule a free 15-minute consultation to discuss your needs, ask questions, and determine if we're the right fit for your mental health journey.
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
                  <strong>Tamara Walls, M.Ed, LPCA</strong> believes that finding the right therapeutic fit is essential to successful treatment. She offers free consultations to ensure potential clients feel comfortable and confident in their decision to work together.
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
