import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative gradient-warm-bg section-padding overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-sage rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-earth-green rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-dark mb-6 leading-tight">
              Welcome to Your Journey of{' '}
              <span className="text-primary-sage">Growth</span> and{' '}
              <span className="text-earth-green">Healing</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-dark mb-8 leading-relaxed">
              Evidence-based mental health care with compassion at its core
            </p>

            {/* Tamara's Personal Message */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-soft">
              <p className="text-lg text-text-dark leading-relaxed mb-4">
                <span className="font-semibold text-primary-sage">Hi, I'm Tamara Walls, M.Ed, LPCA.</span>{' '}
                I believe everyone deserves access to quality mental health care that honors their unique journey.
                At Lennox Fields, we combine clinical expertise with genuine warmth to help you build the life you envision.
              </p>
              <Link href="/about" className="text-primary-sage hover:text-earth-green font-medium inline-flex items-center">
                Learn more about my approach
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-primary inline-flex items-center justify-center">
                <Calendar className="mr-2 w-5 h-5" />
                Schedule a Free Consultation
              </Link>
              <Link href="/resources" className="btn btn-outline inline-flex items-center justify-center">
                Explore Free Resources
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative animate-slide-up hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              {/* Placeholder for Tamara's professional photo */}
              <div className="aspect-[4/5] bg-gradient-to-br from-primary-sage to-earth-green flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-6xl">👋</span>
                  </div>
                  <p className="text-xl font-semibold">Tamara Walls, M.Ed, LPCA</p>
                  <p className="text-sm opacity-90 mt-2">Licensed Professional Counselor Associate</p>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-medium p-4">
                <p className="text-2xl font-bold text-primary-sage">M.Ed</p>
                <p className="text-sm text-text-dark">Clinical Mental Health</p>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-medium p-4">
                <p className="text-2xl font-bold text-earth-green">LPCA</p>
                <p className="text-sm text-text-dark">NC & IN Licensed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
