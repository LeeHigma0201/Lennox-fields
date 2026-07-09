import Link from 'next/link'
import { Heart, CheckCircle, Calendar } from 'lucide-react'

export default function IndividualTherapyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary-sage p-4 rounded-lg">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
                Individual Counseling
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Personalized one-on-one support specializing in ADHD, autism, and complex PTSD.
              Neurodiversity-affirming, trauma-informed care for women.
            </p>
          </div>
        </div>
      </section>

      {/* What We Treat */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What We Address in Individual Counseling
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'ADHD', description: 'Assessment support, executive functioning, and neurodiversity-affirming strategies' },
              { title: 'Autism', description: 'Affirming support for autistic women including masking, burnout, and identity' },
              { title: 'Complex PTSD', description: 'Processing developmental trauma and building safety and regulation' },
              { title: 'Anxiety & Worry', description: 'Generalized anxiety, panic attacks, social anxiety, and phobias' },
              { title: 'Depression', description: 'Persistent sadness, loss of interest, and mood disturbances' },
              { title: 'Life Transitions', description: 'Major changes like moving, divorce, job loss, or life milestones' },
              { title: 'Relationship Patterns', description: 'Boundaries, attachment, communication, and relational dynamics' },
              { title: 'Self-Worth & Identity', description: 'Building confidence and exploring who you are beyond the masks' },
              { title: 'Grief & Loss', description: 'Processing loss of loved ones, relationships, or significant life changes' },
            ].map((item) => (
              <div key={item.title} className="card-clinical">
                <h3 className="text-xl font-bold text-text-dark mb-2">{item.title}</h3>
                <p className="text-warm-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Approaches */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-6 text-center">
            Evidence-Based Treatment Approaches
          </h2>
          <p className="text-center text-xl text-warm-gray mb-12 max-w-3xl mx-auto">
            I integrate multiple therapeutic approaches tailored to your unique needs and goals.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Cognitive Behavioral Therapy (CBT)
              </h3>
              <p className="text-warm-gray mb-4">
                CBT helps you identify and change unhelpful thought patterns and behaviors.
                It's highly effective for anxiety, depression, and stress management.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Identify negative thought patterns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Challenge and reframe beliefs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Develop coping strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Create behavioral experiments</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)
              </h3>
              <p className="text-warm-gray mb-4">
                TF-CBT is an evidence-based approach for processing trauma and reducing its impact,
                helping you make sense of difficult experiences in a safe, structured way.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Process traumatic experiences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Reduce trauma-related distress</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Reframe unhelpful beliefs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary-sage mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-text-dark">Build healthy coping skills</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Person-Centered Therapy
              </h3>
              <p className="text-warm-gray mb-4">
                A collaborative approach that honors your expertise on your own life while
                I provide support, guidance, and evidence-based tools.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Mindfulness & Acceptance-Based Approaches
              </h3>
              <p className="text-warm-gray mb-4">
                Learn to observe thoughts and feelings without judgment, reducing suffering
                and increasing present-moment awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What to Expect
          </h2>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Initial Consultation (Free)</h3>
                <p className="text-warm-gray">
                  We'll have a brief 15-minute call to discuss your needs, answer questions,
                  and determine if we're a good fit.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Intake Session (60-90 minutes)</h3>
                <p className="text-warm-gray">
                  During your first full session, we'll discuss your history, current concerns,
                  and goals for therapy. We'll create a personalized treatment plan together.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Ongoing Sessions (50-60 minutes)</h3>
                <p className="text-warm-gray">
                  We'll meet regularly (typically weekly or bi-weekly) to work toward your goals.
                  Sessions are collaborative, supportive, and focused on creating real change.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Progress & Adjustment</h3>
                <p className="text-warm-gray">
                  We'll regularly review your progress and adjust our approach as needed.
                  You're in control of your therapy journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Scheduling */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Investment in Your Wellbeing</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Individual Session</p>
              <p className="text-4xl font-bold mb-4">$150</p>
              <p className="text-sm opacity-90">50-60 minute session</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Monthly Package</p>
              <p className="text-4xl font-bold mb-4">$500</p>
              <p className="text-sm opacity-90">4 sessions per month</p>
            </div>
          </div>

          <p className="text-lg mb-8 opacity-90">
            Sliding scale available for qualified clients. HSA/FSA accepted.
            Superbills provided for insurance reimbursement. Kentucky clients only.
          </p>

          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
            <Calendar className="mr-2 w-5 h-5" />
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
