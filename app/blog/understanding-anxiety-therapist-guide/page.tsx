import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, Share2, Facebook, Twitter, Linkedin, Mail, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Understanding Anxiety: A Therapist\'s Comprehensive Guide | Lennox Fields',
  description: 'Learn about different types of anxiety disorders, their symptoms, causes, and evidence-based treatment approaches. Expert guidance from a licensed therapist.',
  keywords: [
    'anxiety disorders',
    'anxiety symptoms',
    'anxiety treatment',
    'generalized anxiety',
    'panic disorder',
    'social anxiety',
    'CBT for anxiety',
    'therapy for anxiety',
    'mental health'
  ],
  openGraph: {
    title: 'Understanding Anxiety: A Therapist\'s Comprehensive Guide',
    description: 'Expert guidance on anxiety disorders, symptoms, and evidence-based treatment approaches.',
    type: 'article',
    publishedTime: '2024-11-15T00:00:00.000Z',
    authors: ['Tamara Walls, M.Ed, LPCA'],
  },
}

export default function AnxietyGuidePage() {
  const relatedArticles = [
    {
      title: 'CBT Techniques You Can Use in Daily Life',
      slug: 'cbt-techniques-daily-life',
      category: 'Self-Care'
    },
    {
      title: '7 Signs It\'s Time to Seek Therapy',
      slug: 'signs-you-need-therapy',
      category: 'Professional'
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
            Anxiety
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6">
            Understanding Anxiety: A Therapist's Comprehensive Guide
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-text-dark">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary-sage" />
              <span>Tamara Walls, M.Ed, LPCA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-sage" />
              <span>November 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-sage" />
              <span>8 min read</span>
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
              Anxiety is one of the most common mental health concerns I encounter in my practice, affecting millions of people worldwide. Yet despite its prevalence, many individuals struggle to understand what they're experiencing or don't know where to turn for help. This comprehensive guide will help you understand anxiety disorders, recognize their symptoms, and explore evidence-based treatment options.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">What Is Anxiety?</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              Anxiety is a natural human emotion—our body's alarm system designed to protect us from danger. When we face a threat, anxiety triggers the "fight or flight" response, preparing us to respond quickly. This response served our ancestors well when encountering predators, and it still helps us today in genuinely dangerous situations.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              However, anxiety becomes a disorder when this alarm system activates too frequently, too intensely, or in response to situations that aren't actually threatening. When anxiety interferes with daily life, relationships, work, or overall wellbeing, it's time to seek professional support.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Common Types of Anxiety Disorders</h2>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Generalized Anxiety Disorder (GAD)</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              People with GAD experience persistent, excessive worry about various aspects of life—health, work, relationships, finances—even when there's little or no reason for concern. This worry is difficult to control and often accompanied by physical symptoms like muscle tension, fatigue, and sleep disturbances.
            </p>
            <div className="bg-cream p-6 rounded-lg my-6">
              <p className="font-semibold text-text-dark mb-2">Key symptoms of GAD include:</p>
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                <li>Persistent worry that feels uncontrollable</li>
                <li>Restlessness or feeling "on edge"</li>
                <li>Difficulty concentrating</li>
                <li>Muscle tension and physical aches</li>
                <li>Sleep problems (difficulty falling or staying asleep)</li>
                <li>Irritability</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Panic Disorder</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Panic disorder involves recurrent, unexpected panic attacks—sudden episodes of intense fear accompanied by physical symptoms. These attacks can feel terrifying and may lead people to fear having another attack, creating a cycle of anxiety about anxiety itself.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              Panic attacks typically peak within minutes and may include heart palpitations, sweating, trembling, shortness of breath, chest pain, dizziness, and feelings of impending doom. Many people experiencing their first panic attack fear they're having a heart attack and seek emergency medical care.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Social Anxiety Disorder</h3>
            <p className="text-text-dark leading-relaxed mb-6">
              Social anxiety disorder (also called social phobia) involves intense fear of social situations where one might be scrutinized, judged, or embarrassed. This goes beyond normal shyness—it can severely impact work, school, and relationships. People with social anxiety may avoid social situations entirely or endure them with significant distress.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Specific Phobias</h3>
            <p className="text-text-dark leading-relaxed mb-6">
              Specific phobias involve intense, irrational fear of particular objects or situations—such as heights, flying, animals, or medical procedures. The fear is disproportionate to the actual danger posed and leads to avoidance behaviors that can limit daily activities.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">What Causes Anxiety Disorders?</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Anxiety disorders result from a complex interaction of factors. Understanding these can help reduce self-blame and inform treatment approaches:
            </p>
            <ul className="list-disc list-inside space-y-3 text-text-dark mb-6 ml-4">
              <li><strong>Genetics:</strong> Anxiety disorders tend to run in families, suggesting a genetic component</li>
              <li><strong>Brain chemistry:</strong> Imbalances in neurotransmitters (particularly serotonin, dopamine, and GABA) play a role</li>
              <li><strong>Life experiences:</strong> Trauma, chronic stress, or significant life changes can trigger or exacerbate anxiety</li>
              <li><strong>Personality factors:</strong> Certain temperament traits increase vulnerability to anxiety</li>
              <li><strong>Medical conditions:</strong> Some physical health issues can cause or worsen anxiety symptoms</li>
              <li><strong>Substance use:</strong> Caffeine, alcohol, and certain medications can contribute to anxiety</li>
            </ul>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Evidence-Based Treatment Approaches</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              The good news is that anxiety disorders are highly treatable. Most people experience significant improvement with appropriate treatment. Here are the most effective, evidence-based approaches:
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Cognitive Behavioral Therapy (CBT)</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              CBT is the gold standard for treating anxiety disorders. This therapeutic approach helps you identify and change thought patterns and behaviors that contribute to anxiety. Through CBT, you'll learn to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li>Recognize anxious thoughts and evaluate their accuracy</li>
              <li>Challenge catastrophic thinking patterns</li>
              <li>Develop more balanced, realistic perspectives</li>
              <li>Face feared situations gradually (exposure therapy)</li>
              <li>Build coping skills and stress management techniques</li>
            </ul>
            <p className="text-text-dark leading-relaxed mb-6">
              Learn more about <Link href="/blog/cbt-techniques-daily-life" className="text-primary-sage hover:text-earth-green font-medium underline">practical CBT techniques you can use daily</Link>.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Medication</h3>
            <p className="text-text-dark leading-relaxed mb-6">
              For some individuals, medication can be an important part of treatment, especially when combined with therapy. Common medications for anxiety include SSRIs, SNRIs, and benzodiazepines (for short-term use). A psychiatrist or primary care provider can help determine if medication is appropriate for your situation.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Mindfulness and Relaxation Techniques</h3>
            <p className="text-text-dark leading-relaxed mb-6">
              Mindfulness practices, progressive muscle relaxation, and breathing exercises can help manage anxiety symptoms in the moment and reduce overall anxiety levels over time. These skills are often integrated into therapy and can be practiced independently as well.
            </p>

            <h3 className="text-2xl font-bold text-text-dark mt-8 mb-4">Lifestyle Modifications</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Supporting your mental health through lifestyle changes can significantly impact anxiety levels:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-dark mb-6 ml-4">
              <li>Regular physical exercise (shown to reduce anxiety as effectively as medication for some people)</li>
              <li>Adequate sleep (7-9 hours for most adults)</li>
              <li>Balanced nutrition and limiting caffeine/alcohol</li>
              <li>Social connection and support</li>
              <li>Stress management and work-life balance</li>
            </ul>
            <p className="text-text-dark leading-relaxed mb-6">
              Explore <Link href="/blog/self-care-mental-health" className="text-primary-sage hover:text-earth-green font-medium underline">evidence-based self-care practices</Link> that support mental wellbeing.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">When to Seek Professional Help</h2>
            <div className="bg-primary-sage/10 border-l-4 border-primary-sage p-6 rounded my-8">
              <p className="text-text-dark leading-relaxed mb-4">
                Consider reaching out to a mental health professional if:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                <li>Anxiety interferes with work, school, or relationships</li>
                <li>You avoid situations or activities due to anxiety</li>
                <li>Physical symptoms are concerning or distressing</li>
                <li>You're using alcohol or substances to cope with anxiety</li>
                <li>Anxiety is affecting your quality of life</li>
                <li>You're experiencing depression alongside anxiety</li>
              </ul>
            </div>
            <p className="text-text-dark leading-relaxed mb-6">
              Read more about <Link href="/blog/signs-you-need-therapy" className="text-primary-sage hover:text-earth-green font-medium underline">signs it might be time to seek therapy</Link>.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Moving Forward</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              Living with anxiety can feel overwhelming, but recovery is possible. With appropriate treatment and support, most people with anxiety disorders experience significant improvement in their symptoms and quality of life. The first step is often the hardest—acknowledging that you need support and reaching out for help.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              As a therapist, I've witnessed countless clients transform their relationship with anxiety. It doesn't happen overnight, but with patience, practice, and professional guidance, you can develop the skills to manage anxiety effectively and reclaim your life.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              Remember: seeking help is a sign of strength, not weakness. You don't have to navigate anxiety alone.
            </p>

            {/* Resources Section */}
            <div className="bg-cream p-8 rounded-lg my-12">
              <h3 className="text-2xl font-bold text-text-dark mb-4">Helpful Resources</h3>
              <ul className="space-y-3 text-text-dark">
                <li>
                  <Link href="/tools/screening-tools/gad-7" className="text-primary-sage hover:text-earth-green font-medium">
                    Take the GAD-7 Anxiety Screening →
                  </Link>
                </li>
                <li>
                  <Link href="/resources/worksheets" className="text-primary-sage hover:text-earth-green font-medium">
                    Download Free Anxiety Management Worksheets →
                  </Link>
                </li>
                <li>
                  <Link href="/services/individual-therapy" className="text-primary-sage hover:text-earth-green font-medium">
                    Learn About Individual Therapy Services →
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 gradient-sage-bg text-white rounded-xl text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Address Your Anxiety?</h3>
            <p className="text-lg mb-6 opacity-90">
              Schedule a free 15-minute consultation to discuss how therapy can help you manage anxiety and improve your quality of life.
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
                  <strong>Tamara Walls, M.Ed, LPCA</strong> is a Licensed Professional Counselor Associate specializing in anxiety disorders, depression, and life transitions. With a focus on evidence-based approaches including CBT and EMDR, Tamara helps clients develop practical skills to manage symptoms and improve quality of life.
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
