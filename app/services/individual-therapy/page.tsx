import Link from 'next/link'
import { Heart, Calendar } from 'lucide-react'

export default function IndividualTherapyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary-sage p-4 rounded-lg">
                <Heart className="w-12 h-12 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
                Individual Counseling
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Individualized clinical services for adults, couples, and families, with specialization in neurodivergent presentations, complex trauma, and co-occurring conditions. Neurodiversity-affirming and trauma-informed care.
            </p>
          </div>
        </div>
      </section>

      {/* What We Address */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What We Address
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Attention-Deficit/Hyperactivity Disorder (ADHD)',
                description:
                  'Assessment support, executive functioning, and neurodiversity-affirming strategies.',
              },
              {
                title: 'Autism Spectrum Disorder (ASD)',
                description:
                  'Affirming clinical work for autistic adults, including masking, burnout, and identity.',
              },
              {
                title: 'Complex Post-Traumatic Stress Disorder (C-PTSD)',
                description:
                  'Processing developmental and chronic trauma; building safety and nervous-system regulation.',
              },
              {
                title: 'Anxiety & Worry',
                description:
                  'Generalized anxiety, panic disorder, social anxiety, and specific phobias.',
              },
              {
                title: 'Depression & Mood Disorders',
                description:
                  'Persistent sadness, loss of interest, and broader mood disturbances.',
              },
              {
                title: 'Relationship Patterns',
                description:
                  'Attachment, boundaries, communication, and relational dynamics.',
              },
              {
                title: 'Couples & Relational Concerns',
                description:
                  'Conflict, rupture, repair, and the work of long-term partnership.',
              },
              {
                title: 'Family Systems',
                description:
                  'Roles, dynamics, and intergenerational patterns within the family.',
              },
              {
                title: 'Life Transitions',
                description:
                  'Major changes including moves, separations, career shifts, and milestone events.',
              },
              {
                title: 'Grief & Loss',
                description:
                  'Loss of loved ones, relationships, identity, or significant life changes.',
              },
              {
                title: 'Self-Worth & Identity',
                description:
                  'Including late-diagnosis neurodivergent identity, masking, and burnout.',
              },
            ].map((item) => (
              <div key={item.title} className="card-clinical">
                <h3 className="text-xl font-bold text-text-dark mb-2">{item.title}</h3>
                <p className="text-warm-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence-Based Treatment Approaches */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-6 text-center">
            Evidence-Based Treatment Approaches
          </h2>
          <p className="text-center text-xl text-warm-gray mb-12 max-w-3xl mx-auto">
            Treatment integrates multiple modalities, sequenced to the client&rsquo;s clinical presentation and goals.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Dialectical Behavior Therapy (DBT){' '}
                <span className="text-base font-normal text-primary-sage">— Certified</span>
              </h3>
              <p className="text-warm-gray">
                Evidence-based treatment targeting emotional dysregulation, distress tolerance, interpersonal effectiveness, and mindfulness. Particularly effective for complex trauma, co-occurring conditions, and neurodivergent presentations.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)
              </h3>
              <p className="text-warm-gray">
                A structured, evidence-based approach that directly addresses how traumatic experience shapes thought patterns, emotional responses, and behavior.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Solution-Focused Brief Therapy (SFBT)
              </h3>
              <p className="text-warm-gray">
                Goal-directed and strengths-based, with particular utility for clients navigating Attention-Deficit/Hyperactivity Disorder (ADHD) and Autism Spectrum Disorder (ASD). Emphasizes what is already working and builds toward concrete, client-defined outcomes.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Emotionally Focused Therapy (EFT)
              </h3>
              <p className="text-warm-gray">
                Draws on attachment theory to identify and shift emotional patterns that drive distress in individual, couples, and family relationships.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Existential Therapy
              </h3>
              <p className="text-warm-gray">
                Explores meaning, autonomy, identity, and purpose. Particularly relevant for clients processing neurodivergent identity, late diagnosis, or major life transitions.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Psychoanalytic / Psychodynamic Therapy
              </h3>
              <p className="text-warm-gray">
                Examines unconscious patterns, relational dynamics, and the long reach of early experience on current functioning.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Somatic-Informed Practice
              </h3>
              <p className="text-warm-gray">
                Body-based awareness and regulation techniques integrated throughout treatment to support trauma recovery, nervous system regulation, and embodied healing.
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Parts Work &mdash; Internal Family Systems (IFS)-Informed Practice
              </h3>
              <p className="text-warm-gray">
                An approach that explores internal parts and their protective roles. Integrated into treatment to support self-understanding, trauma processing, and internal coherence.
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
                <h3 className="text-2xl font-bold text-text-dark mb-2">
                  Initial Consultation (Free, 15 minutes)
                </h3>
                <p className="text-warm-gray">
                  A brief call to clarify presenting concerns, review fit, and answer logistical questions before scheduling an intake.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">
                  Intake Session (60&ndash;90 minutes)
                </h3>
                <p className="text-warm-gray">
                  Comprehensive clinical intake including biopsychosocial history, presenting concerns, diagnostic impressions, and collaborative treatment planning.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">
                  Ongoing Sessions (50&ndash;60 minutes)
                </h3>
                <p className="text-warm-gray">
                  Treatment proceeds with regular weekly or biweekly sessions toward the goals defined at intake. Sessions are structured, collaborative, and oriented toward measurable progress.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-sage text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Progress &amp; Adjustment</h3>
                <p className="text-warm-gray">
                  Treatment includes ongoing review of progress against the treatment plan; modalities and cadence are adjusted as clinical needs change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fees & Services */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Fees &amp; Services</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Intake Session</p>
              <p className="text-4xl font-bold mb-1">$250</p>
              <p className="text-sm opacity-90 mb-4">60&ndash;90 minutes</p>
              <p className="text-sm opacity-90 leading-relaxed">
                Comprehensive clinical intake including biopsychosocial history, presenting concerns, diagnostic impressions, and collaborative treatment planning.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Individual Therapy Session</p>
              <p className="text-4xl font-bold mb-1">$150</p>
              <p className="text-sm opacity-90">50&ndash;60 minutes</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Monthly Continuity Package &mdash; Individual</p>
              <p className="text-4xl font-bold mb-1">$500</p>
              <p className="text-sm opacity-90 mb-4">Four individual sessions per month</p>
              <p className="text-sm opacity-90 leading-relaxed">
                A modest savings for clients committing to consistent weekly care.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Couples Therapy Session</p>
              <p className="text-4xl font-bold mb-1">$200</p>
              <p className="text-sm opacity-90 mb-4">80&ndash;90 minutes</p>
              <p className="text-sm opacity-90 leading-relaxed">
                Extended sessions reflect the additional complexity, preparation, and clinical labor involved in relational work.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 md:col-span-2">
              <p className="text-sm opacity-90 mb-2">Couples Intensive &mdash; Recommended Addition</p>
              <p className="text-4xl font-bold mb-1">$575</p>
              <p className="text-sm opacity-90 mb-4">Half-day format, approximately 3.5 hours</p>
              <p className="text-sm opacity-90 leading-relaxed">
                For couples navigating a crisis, considering separation, processing a specific rupture, or wanting to accelerate progress without waiting for weekly sessions to accumulate. Positioned as a focused, contained intervention &mdash; not a retreat, not a package. One intensive session with a clinical debrief and written summary of themes and next steps provided to the couple.
              </p>
            </div>
          </div>

          <p className="text-lg mb-8 opacity-90 text-center">
            Sliding scale available for qualified clients. HSA/FSA accepted. Superbills provided for insurance reimbursement. Kentucky clients only.
          </p>

          <div className="text-center">
            <Link
              href="/contact"
              className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center"
            >
              <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
              Schedule Your Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
