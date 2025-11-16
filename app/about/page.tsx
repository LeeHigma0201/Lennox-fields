import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, BookOpen, Heart, Users, Brain, Lightbulb, Target, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Tamara Walls, M.Ed, LPCA - Licensed Mental Health Counselor | Lennox Fields',
  description: 'Meet Tamara Walls, licensed mental health counselor (LPCA) in NC & IN. Specialized in CBT, EMDR, trauma therapy, and couples counseling with evidence-based approaches.',
  keywords: [
    'Tamara Walls therapist',
    'LPCA North Carolina',
    'LPCA Indiana',
    'licensed mental health counselor',
    'CBT therapist',
    'EMDR therapist',
    'trauma therapist',
    'couples therapist',
    'career counselor',
    'mental health counselor credentials',
    'evidence-based therapy',
    'clinical mental health counseling'
  ],
  openGraph: {
    title: 'About Tamara Walls, M.Ed, LPCA - Licensed Mental Health Counselor',
    description: 'Meet Tamara Walls, licensed mental health counselor specializing in CBT, EMDR, trauma therapy, and couples counseling.',
    type: 'profile',
    images: [
      {
        url: '/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Tamara Walls, M.Ed, LPCA'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Tamara Walls, M.Ed, LPCA - Licensed Mental Health Counselor',
    description: 'Licensed mental health counselor specializing in CBT, EMDR, trauma therapy, and couples counseling in NC & IN.'
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary-sage to-earth-green flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-40 h-40 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-8xl">👋</span>
                    </div>
                    <p className="text-2xl font-bold">Tamara Walls</p>
                    <p className="text-lg opacity-90 mt-2">M.Ed, LPCA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Intro */}
            <div className="order-1 lg:order-2">
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
                Meet Tamara Walls, M.Ed, LPCA
              </h1>
              <p className="text-xl text-text-dark mb-6 leading-relaxed">
                Founder of Lennox Fields Clinical Mental Health Services
              </p>
              <p className="text-lg text-text-dark leading-relaxed">
                I believe that everyone deserves access to compassionate, effective mental health care
                that honors their unique journey. My approach combines evidence-based practices with
                genuine warmth to create a safe space for healing and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-8 text-center">
            My Journey to Mental Health Counseling
          </h2>

          <div className="prose prose-lg max-w-none text-text-dark">
            <p className="text-lg leading-relaxed mb-6">
              My path to becoming a mental health counselor wasn't a straight line—it was shaped by
              personal experiences, a deep curiosity about human resilience, and a desire to make
              mental health support accessible and effective.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              After earning my Master of Education in Clinical Mental Health Counseling, I became
              passionate not just about providing therapy, but about creating resources that could
              support people at every stage of their mental health journey. This vision led to the
              creation of Lennox Fields—a practice that goes beyond traditional therapy to offer
              comprehensive tools, assessments, and educational materials.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              I've worked with individuals, couples, and families facing a wide range of challenges:
              anxiety, depression, trauma, relationship difficulties, career transitions, and substance
              use concerns. Each person I work with teaches me something new about resilience, courage,
              and the human capacity for change.
            </p>

            <p className="text-lg leading-relaxed">
              Beyond clinical work, I'm an author of children's mental health books and a resource
              developer for mental health professionals. I believe that by making quality tools and
              education accessible, we can support better mental health outcomes for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials & Training */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-6xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Education & Credentials
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card">
              <Award className="w-12 h-12 text-primary-sage mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">
                Master of Education (M.Ed)
              </h3>
              <p className="text-warm-gray mb-2">Clinical Mental Health Counseling</p>
              <p className="text-sm text-warm-gray">
                Comprehensive training in evidence-based therapeutic approaches, clinical assessment,
                diagnosis, and treatment planning.
              </p>
            </div>

            <div className="card">
              <BookOpen className="w-12 h-12 text-primary-sage mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">
                Licensed Professional Counselor Associate (LPCA)
              </h3>
              <p className="text-warm-gray mb-2">Licensed in North Carolina & Indiana</p>
              <p className="text-sm text-warm-gray">
                Active licensure in good standing, working toward full Licensed Professional
                Counselor (LPC) status.
              </p>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-text-dark mb-8 text-center">
            Specialized Training
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Cognitive Behavioral Therapy (CBT)',
                description: 'Evidence-based treatment for anxiety, depression, and trauma',
              },
              {
                icon: Heart,
                title: 'EMDR Therapy',
                description: 'Eye Movement Desensitization and Reprocessing for trauma',
              },
              {
                icon: Users,
                title: 'Couples & Family Systems',
                description: 'Systemic approaches to relationship and family therapy',
              },
              {
                icon: Target,
                title: 'Career Counseling',
                description: 'Career development, assessment, and transition support',
              },
              {
                icon: Lightbulb,
                title: 'Trauma-Informed Care',
                description: 'Understanding and addressing the impact of trauma',
              },
              {
                icon: Heart,
                title: 'Substance Use Treatment',
                description: 'ASAM criteria and evidence-based addiction treatment',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white p-6 rounded-lg shadow-soft">
                  <Icon className="w-10 h-10 text-primary-sage mb-3" />
                  <h4 className="font-bold text-text-dark mb-2">{item.title}</h4>
                  <p className="text-sm text-warm-gray">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Clinical Approach */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            My Clinical Approach
          </h2>

          <div className="space-y-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Collaborative & Person-Centered
              </h3>
              <p className="text-warm-gray leading-relaxed">
                You are the expert on your own life. My role is to provide support, guidance, and
                evidence-based tools while honoring your autonomy and unique experiences. Therapy
                is a partnership where we work together toward your goals.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Evidence-Based & Flexible
              </h3>
              <p className="text-warm-gray leading-relaxed">
                I integrate multiple therapeutic approaches—including CBT, EMDR, and mindfulness-based
                interventions—tailoring treatment to what works best for you. Research shows that the
                therapeutic relationship is one of the strongest predictors of positive outcomes, so
                building trust and rapport is always my first priority.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Strength-Based & Culturally Sensitive
              </h3>
              <p className="text-warm-gray leading-relaxed">
                I believe in identifying and building on your existing strengths while being mindful
                of cultural, social, and systemic factors that impact mental health. Your identity,
                background, and values are integral to the therapeutic process.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Goal-Oriented & Measurable
              </h3>
              <p className="text-warm-gray leading-relaxed">
                We'll establish clear, achievable goals and regularly assess progress. Therapy should
                lead to tangible improvements in your life, and I'm committed to helping you see and
                measure that change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Clinical Practice */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Beyond Clinical Practice
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <BookOpen className="w-12 h-12 text-soft-rose mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">
                Author & Publisher
              </h3>
              <p className="text-warm-gray mb-4">
                I write therapeutic children's books that help young people understand and cope with
                tough topics. These books serve as bridges between parents, educators, and children,
                making difficult conversations more accessible.
              </p>
              <Link href="/books" className="text-primary-sage hover:text-earth-green font-medium">
                Explore My Books →
              </Link>
            </div>

            <div className="card">
              <Users className="w-12 h-12 text-clinical-blue mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">
                Professional Resource Development
              </h3>
              <p className="text-warm-gray mb-4">
                I create tools and resources for mental health professionals, including treatment plan
                generators, assessment tools, and licensing guides. Making professional resources
                accessible helps improve care quality across the field.
              </p>
              <Link href="/professional" className="text-primary-sage hover:text-earth-green font-medium">
                Professional Tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl mb-8 opacity-90">
            If you're looking for a therapist who combines clinical expertise with genuine compassion,
            I'd love to hear from you. Let's schedule a free consultation to discuss how I can support
            your journey.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
            <Calendar className="mr-2 w-5 h-5" />
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
