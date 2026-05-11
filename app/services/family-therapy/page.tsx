import Link from 'next/link'
import { Home, CheckCircle, Heart, Users, Calendar } from 'lucide-react'

export default function FamilyTherapyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-earth-green p-4 rounded-lg">
                <Home className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark">
                Family Counseling
              </h1>
            </div>
            <p className="text-xl text-text-dark">
              Navigate family dynamics, strengthen relationships, and build healthier patterns
              of communication for the whole family.
            </p>
          </div>
        </div>
      </section>

      {/* What We Address */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What We Address in Family Counseling
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Parent-Child Conflict', description: 'Bridging generational gaps and improving the parent-child relationship at any age' },
              { title: 'Blended Families', description: 'Navigating step-parenting, co-parenting, and creating a unified family identity' },
              { title: 'Divorce & Separation', description: 'Supporting the family through transitions while prioritizing the wellbeing of children' },
              { title: 'Behavioral Challenges', description: 'Addressing behavioral issues in children and adolescents with systemic, family-focused approaches' },
              { title: 'Communication Patterns', description: 'Replacing criticism, defensiveness, and shutdown with healthy, open dialogue' },
              { title: 'Family Crisis', description: 'Navigating acute situations — substance use, mental health crises, loss, or major life changes' },
              { title: 'Sibling Relationships', description: 'Reducing rivalry and conflict while fostering healthy sibling bonds' },
              { title: 'Boundary Setting', description: 'Establishing healthy boundaries within the family system that respect individuality' },
              { title: 'Grief & Loss', description: 'Processing shared family grief — death, chronic illness, or other significant losses' },
            ].map((item) => (
              <div key={item.title} className="card-clinical">
                <h3 className="text-xl font-bold text-text-dark mb-2">{item.title}</h3>
                <p className="text-warm-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-6 text-center">
            A Systems-Based Approach
          </h2>
          <p className="text-center text-xl text-warm-gray mb-12 max-w-3xl mx-auto">
            I view families as interconnected systems. When one member is struggling, the whole system
            feels it. My approach works with the entire family to create lasting, positive change.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Structural Family Therapy
              </h3>
              <p className="text-warm-gray mb-4">
                Examining and restructuring family organization, boundaries, and hierarchies
                to support healthier functioning for all members.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-earth-green mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Identify family structure patterns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-earth-green mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Strengthen appropriate boundaries</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-earth-green mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Empower healthy communication</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-text-dark mb-4">
                Narrative Family Therapy
              </h3>
              <p className="text-warm-gray mb-4">
                Helping families rewrite limiting stories about themselves and each other,
                focusing on strengths and resilience rather than blame.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-earth-green mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Externalize the problem</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-earth-green mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Discover unique outcomes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-earth-green mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-text-dark">Build a preferred family story</span>
                </li>
              </ul>
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
              <div className="bg-earth-green text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Free Consultation (15 minutes)</h3>
                <p className="text-warm-gray">
                  A brief call to understand who will be attending, what the primary concerns are,
                  and whether family counseling is the best approach.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-earth-green text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Family Assessment (75-90 minutes)</h3>
                <p className="text-warm-gray">
                  I meet with available family members to understand the family system, each person&apos;s
                  perspective, and the patterns that need attention. We set shared goals.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-earth-green text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-2">Ongoing Sessions (60 minutes)</h3>
                <p className="text-warm-gray">
                  Regular family sessions focused on practicing new patterns. Sometimes I may meet
                  with individual family members or subgroups as part of the treatment plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Fees &amp; Services</h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8 inline-block">
            <p className="text-sm opacity-90 mb-2">Family Session</p>
            <p className="text-4xl font-bold mb-4">$200</p>
            <p className="text-sm opacity-90">60-minute session</p>
          </div>

          <p className="text-lg mb-8 opacity-90">
            Sliding scale available. HSA/FSA accepted.
            Superbills provided for insurance reimbursement. Kentucky clients only.
          </p>

          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
            <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
