import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, Share2, Facebook, Twitter, Linkedin, Mail, BookOpen, Brain } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CBT Techniques You Can Use in Daily Life | Practical Cognitive Behavioral Therapy',
  description: 'Learn practical Cognitive Behavioral Therapy (CBT) techniques you can apply in your everyday life to manage anxiety, depression, and negative thought patterns.',
  keywords: [
    'CBT techniques',
    'cognitive behavioral therapy',
    'thought challenging',
    'cognitive restructuring',
    'behavioral activation',
    'anxiety management',
    'depression techniques',
    'mental health skills',
    'coping strategies'
  ],
  openGraph: {
    title: 'CBT Techniques You Can Use in Daily Life',
    description: 'Practical Cognitive Behavioral Therapy skills for everyday mental health management.',
    type: 'article',
    publishedTime: '2024-11-05T00:00:00.000Z',
    authors: ['Tamara Walls, M.Ed, LPCA'],
  },
}

export default function CBTTechniquesPage() {
  const relatedArticles = [
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
            CBT Techniques You Can Use in Daily Life
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-text-dark">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary-sage" />
              <span>Tamara Walls, M.Ed, LPCA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-sage" />
              <span>November 5, 2024</span>
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
              Cognitive Behavioral Therapy (CBT) is one of the most researched and effective approaches to mental health treatment. What makes CBT particularly powerful is that it offers practical, evidence-based techniques you can use outside the therapy room. These skills become tools you carry with you, helping you navigate difficult emotions, challenge unhelpful thoughts, and create positive behavioral changes.
            </p>

            <p className="text-text-dark leading-relaxed mb-8">
              Whether you're currently in therapy or simply interested in building your mental health toolkit, these CBT techniques can make a meaningful difference in your daily life.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Understanding the CBT Foundation</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              CBT is built on a simple but powerful premise: our thoughts, feelings, and behaviors are interconnected. How we think about situations influences how we feel and what we do. The good news is that by changing our thought patterns and behaviors, we can positively impact our emotions and overall wellbeing.
            </p>

            <div className="bg-cream p-6 rounded-lg my-8">
              <p className="font-semibold text-text-dark mb-4">The CBT Triangle:</p>
              <ul className="space-y-2 text-text-dark">
                <li><strong>Thoughts:</strong> Our interpretations and beliefs about events</li>
                <li><strong>Feelings:</strong> Our emotional responses</li>
                <li><strong>Behaviors:</strong> Our actions and reactions</li>
              </ul>
              <p className="text-text-dark mt-4">
                When you change one corner of this triangle, the others shift as well. This is why CBT techniques are so effective—they give you multiple entry points for creating positive change.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Technique 1: Thought Records and Cognitive Restructuring</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              One of the most fundamental CBT skills is learning to identify and challenge unhelpful thought patterns. Thought records help you examine your automatic thoughts—those quick, often unconscious interpretations that flash through your mind.
            </p>

            <div className="bg-primary-sage/10 border-l-4 border-primary-sage p-6 rounded my-6">
              <p className="font-semibold text-text-dark mb-3">How to use a thought record:</p>
              <ol className="list-decimal list-inside space-y-3 text-text-dark">
                <li><strong>Identify the situation:</strong> What happened? Be specific about the triggering event.</li>
                <li><strong>Notice your automatic thoughts:</strong> What went through your mind? Write down your immediate reactions.</li>
                <li><strong>Recognize your emotions:</strong> How did these thoughts make you feel? Rate the intensity (0-100).</li>
                <li><strong>Examine the evidence:</strong> What supports this thought? What contradicts it?</li>
                <li><strong>Generate alternative thoughts:</strong> What's a more balanced or realistic way to view this situation?</li>
                <li><strong>Re-rate your emotions:</strong> How do you feel now after considering alternative perspectives?</li>
              </ol>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              Example: Instead of "I made a mistake in that meeting—everyone thinks I'm incompetent," you might reframe to "I made one error in a productive meeting. My value isn't determined by a single mistake, and I have many contributions to offer."
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Technique 2: Behavioral Activation</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              When we're depressed or anxious, we often withdraw from activities that once brought us pleasure or accomplishment. This withdrawal actually worsens our mood, creating a negative cycle. Behavioral activation breaks this cycle by encouraging engagement in meaningful activities, even when you don't feel like it.
            </p>

            <div className="bg-cream p-6 rounded-lg my-6">
              <p className="font-semibold text-text-dark mb-3">How to practice behavioral activation:</p>
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                <li>Track your current activities and mood throughout the day</li>
                <li>Identify activities that historically brought pleasure or accomplishment</li>
                <li>Schedule specific times for these activities, treating them like important appointments</li>
                <li>Start small—even 5-10 minutes counts</li>
                <li>Notice how your mood shifts after engaging in the activity</li>
                <li>Gradually increase the frequency and duration of positive activities</li>
              </ul>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              Remember: you don't have to feel motivated to take action. Often, action precedes motivation. By engaging in the activity first, positive feelings and motivation often follow.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Technique 3: Graded Exposure</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Avoidance keeps anxiety alive. While avoiding feared situations provides short-term relief, it reinforces the belief that the situation is dangerous and prevents you from learning that you can cope. Graded exposure involves gradually facing feared situations in a controlled, systematic way.
            </p>

            <div className="bg-primary-sage/10 border-l-4 border-primary-sage p-6 rounded my-6">
              <p className="font-semibold text-text-dark mb-3">Steps for graded exposure:</p>
              <ol className="list-decimal list-inside space-y-3 text-text-dark">
                <li>Create a hierarchy of feared situations, rating each from 0-100 (least to most anxiety-provoking)</li>
                <li>Start with the least anxiety-provoking situation on your list</li>
                <li>Stay in the situation until your anxiety naturally decreases (don't leave while anxiety is peaking)</li>
                <li>Practice repeatedly until this situation feels manageable</li>
                <li>Move up to the next item on your hierarchy</li>
                <li>Celebrate your progress along the way</li>
              </ol>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              For anxiety conditions, this technique is one of the most powerful tools available. It teaches your brain that the feared situation isn't as dangerous as it seems and that you can tolerate the discomfort.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              Learn more about <Link href="/blog/understanding-anxiety-therapist-guide" className="text-primary-sage hover:text-earth-green font-medium underline">anxiety disorders and treatment approaches</Link>.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Technique 4: Mindful Awareness and Acceptance</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              While CBT traditionally focused on changing thoughts, modern CBT often incorporates mindfulness—the practice of observing thoughts and feelings without judgment. Sometimes the goal isn't to change a thought but to change your relationship with it.
            </p>

            <div className="bg-cream p-6 rounded-lg my-6">
              <p className="font-semibold text-text-dark mb-3">Practicing mindful awareness:</p>
              <ul className="list-disc list-inside space-y-2 text-text-dark">
                <li>Notice when a difficult thought or emotion arises</li>
                <li>Acknowledge it without trying to push it away: "I'm having the thought that..." or "I'm noticing anxiety"</li>
                <li>Observe the thought/feeling with curiosity rather than judgment</li>
                <li>Recognize that thoughts aren't facts—they're just mental events</li>
                <li>Let the thought exist without needing to act on it or believe it</li>
                <li>Return attention to the present moment and your chosen activity</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Technique 5: Problem-Solving Skills</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              When faced with real problems (not just anxious thoughts about hypothetical problems), structured problem-solving can reduce overwhelm and increase effectiveness.
            </p>

            <div className="bg-primary-sage/10 border-l-4 border-primary-sage p-6 rounded my-6">
              <p className="font-semibold text-text-dark mb-3">The problem-solving process:</p>
              <ol className="list-decimal list-inside space-y-3 text-text-dark">
                <li><strong>Define the problem specifically:</strong> What exactly is the issue? When does it occur?</li>
                <li><strong>Brainstorm solutions:</strong> Generate multiple options without judging them yet</li>
                <li><strong>Evaluate each option:</strong> What are the pros and cons of each solution?</li>
                <li><strong>Choose and implement:</strong> Select the most promising solution and create an action plan</li>
                <li><strong>Review the outcome:</strong> Did it work? What can you learn? Adjust if needed</li>
              </ol>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              This structured approach prevents rumination and moves you from feeling helpless to taking effective action.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Technique 6: Identifying and Challenging Cognitive Distortions</h2>
            <p className="text-text-dark leading-relaxed mb-4">
              Cognitive distortions are thinking errors that maintain negative mood states. Learning to spot these patterns is key to challenging them.
            </p>

            <div className="bg-cream p-6 rounded-lg my-8">
              <p className="font-semibold text-text-dark mb-3">Common cognitive distortions:</p>
              <ul className="space-y-3 text-text-dark">
                <li><strong>All-or-nothing thinking:</strong> Seeing things in black-and-white categories ("If I'm not perfect, I'm a failure")</li>
                <li><strong>Overgeneralization:</strong> Making broad conclusions from single events ("I failed this test, so I'll fail everything")</li>
                <li><strong>Mental filtering:</strong> Focusing only on negatives while ignoring positives</li>
                <li><strong>Catastrophizing:</strong> Assuming the worst possible outcome will occur</li>
                <li><strong>Mind reading:</strong> Assuming you know what others are thinking</li>
                <li><strong>Should statements:</strong> Using rigid rules about how things "should" be</li>
              </ul>
            </div>

            <p className="text-text-dark leading-relaxed mb-6">
              Once you identify these patterns, you can challenge them with evidence and generate more balanced alternatives.
            </p>

            <h2 className="text-3xl font-bold text-text-dark mt-12 mb-6">Putting It All Together</h2>
            <p className="text-text-dark leading-relaxed mb-6">
              These CBT techniques are skills that improve with practice. Like learning any new skill, they may feel awkward at first. Be patient with yourself and remember that consistency matters more than perfection.
            </p>
            <p className="text-text-dark leading-relaxed mb-6">
              While these techniques can be practiced independently, working with a trained therapist helps you apply them more effectively to your specific situation. A therapist can guide you through the process, help you avoid common pitfalls, and adjust techniques to your unique needs.
            </p>
            <p className="text-text-dark leading-relaxed mb-8">
              Discover <Link href="/services/individual-therapy" className="text-primary-sage hover:text-earth-green font-medium underline">how individual therapy</Link> can help you master these techniques.
            </p>

            {/* Resources Section */}
            <div className="bg-cream p-8 rounded-lg my-12">
              <h3 className="text-2xl font-bold text-text-dark mb-4">Tools to Get Started</h3>
              <ul className="space-y-3 text-text-dark">
                <li>
                  <Link href="/resources/worksheets" className="text-primary-sage hover:text-earth-green font-medium">
                    Download Free CBT Worksheets →
                  </Link>
                </li>
                <li>
                  <Link href="/resources/journals" className="text-primary-sage hover:text-earth-green font-medium">
                    Explore Thought Record Journals →
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary-sage hover:text-earth-green font-medium">
                    Schedule a Session to Learn CBT Techniques →
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 gradient-sage-bg text-white rounded-xl text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">Learn CBT Skills with Professional Guidance</h3>
            <p className="text-lg mb-6 opacity-90">
              While these techniques are powerful on their own, working with a therapist helps you apply them more effectively. Schedule a consultation to learn how CBT can help you.
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
                  <strong>Tamara Walls, M.Ed, LPCA</strong> specializes in Cognitive Behavioral Therapy and believes in empowering clients with practical skills they can use throughout their lives. She teaches CBT techniques in both individual and group settings.
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
