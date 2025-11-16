import Link from 'next/link'
import { FileText, Calendar, BookHeart, Shield, Download, Users } from 'lucide-react'

const resourceCategories = [
  {
    id: 'worksheets',
    title: 'Therapy Worksheets',
    icon: FileText,
    description: 'Evidence-based worksheets for CBT, DBT, emotion regulation, and more. Free downloads for clients and professionals.',
    href: '/resources/worksheets',
    color: 'bg-clinical-blue',
    count: '15+ worksheets',
    popular: true,
  },
  {
    id: 'habit-trackers',
    title: 'Habit Trackers',
    icon: Calendar,
    description: 'Printable trackers for mood, sleep, medication, symptoms, and healthy habits. Build awareness and consistency.',
    href: '/resources/habit-trackers',
    color: 'bg-primary-sage',
    count: '10+ trackers',
    popular: true,
  },
  {
    id: 'journals',
    title: 'Therapeutic Journals',
    icon: BookHeart,
    description: 'Guided journal prompts for gratitude, processing emotions, goal-setting, and self-reflection.',
    href: '/resources/journals',
    color: 'bg-soft-rose',
    count: '8+ journals',
    popular: false,
  },
  {
    id: 'screening-tools',
    title: 'Screening Tools',
    icon: Shield,
    description: 'Free, validated mental health assessments. Instant scoring for anxiety, depression, PTSD, and more.',
    href: '/tools/screening-tools',
    color: 'bg-accent-gold',
    count: '8+ assessments',
    popular: true,
  },
  {
    id: 'safety-planning',
    title: 'Safety Planning',
    icon: Shield,
    description: 'Crisis planning tools, coping strategies, and emergency resource lists. Essential for safety management.',
    href: '/tools/safety-planning',
    color: 'bg-alert-red',
    count: '5+ tools',
    popular: false,
  },
  {
    id: 'professional',
    title: 'For Professionals',
    icon: Users,
    description: 'Clinical tools, supervision trackers, billing templates, and licensing guides for mental health professionals.',
    href: '/resources/professional',
    color: 'bg-earth-green',
    count: '12+ tools',
    popular: false,
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <Download className="w-20 h-20 text-primary-sage mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Free Mental Health Resources
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto mb-4">
            Evidence-based worksheets, trackers, journals, and tools designed by mental health
            professionals. All resources are free to download and use.
          </p>
          <p className="text-sm text-warm-gray max-w-2xl mx-auto">
            Perfect for therapists, clients, educators, and anyone committed to mental wellness.
            All materials are printable and ready to use in therapy sessions or at home.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-warm-gray/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">50+</p>
              <p className="text-sm text-warm-gray">Free Resources</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">100%</p>
              <p className="text-sm text-warm-gray">Evidence-Based</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">Free</p>
              <p className="text-sm text-warm-gray">No Sign-Up Required</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-sage mb-2">PDF</p>
              <p className="text-sm text-warm-gray">Print-Ready Format</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Browse Resources
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="card group hover:scale-105 transition-all duration-200 relative"
                >
                  {category.popular && (
                    <div className="absolute -top-3 -right-3 bg-soft-rose text-white px-3 py-1 rounded-full text-xs font-bold">
                      Popular
                    </div>
                  )}

                  <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-text-dark mb-3 group-hover:text-primary-sage transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-warm-gray mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-warm-gray/20">
                    <span className="text-sm font-medium text-primary-sage">
                      {category.count}
                    </span>
                    <span className="text-primary-sage group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            How to Use These Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-soft-rose text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">For Clients</h3>
              <p className="text-warm-gray">
                Download and print worksheets to use between therapy sessions. Track your progress,
                process emotions, and practice new skills at home.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-soft-rose text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">For Therapists</h3>
              <p className="text-warm-gray">
                Use these tools in session or as homework assignments. All resources are based on
                evidence-based practices like CBT, DBT, and ACT.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-soft-rose text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-3">For Everyone</h3>
              <p className="text-warm-gray">
                Mental health tools aren't just for therapy. Use these resources for self-care,
                personal growth, and building emotional wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Free Resources */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <div className="card">
            <h2 className="text-3xl font-bold text-text-dark mb-6">
              Why Are These Resources Free?
            </h2>
            <p className="text-warm-gray mb-4 leading-relaxed">
              Mental health care should be accessible to everyone. While I offer professional
              therapy services, I believe that quality mental health tools and resources should
              be available regardless of someone's ability to pay for therapy.
            </p>
            <p className="text-warm-gray mb-4 leading-relaxed">
              These resources are designed based on evidence-based therapeutic approaches including
              Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and
              Acceptance and Commitment Therapy (ACT). Whether you're working with a therapist
              or practicing self-care independently, these tools can support your mental wellness journey.
            </p>
            <p className="text-text-dark font-medium">
              — Tamara Walls, M.Ed, LPCA
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Need More Than Worksheets?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            If you're looking for professional therapy services, I offer individual counseling,
            couples therapy, career counseling, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn bg-white text-primary-sage hover:bg-cream">
              View Therapy Services
            </Link>
            <Link href="/contact" className="btn border-2 border-white hover:bg-white hover:text-primary-sage">
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
