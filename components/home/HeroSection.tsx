import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { hero } from '@/content/home-page'
import { siteConfig } from '@/content/site-config'

export default function HeroSection() {
  // Build headline with highlighted words
  const renderHeadline = () => {
    const words = hero.headline.split(' ')
    return words.map((word, i) => {
      if (hero.highlightWords.includes(word)) {
        const colorClass = hero.highlightWords.indexOf(word) === 0
          ? 'text-primary-sage'
          : 'text-warm-sand'
        return (
          <span key={i}>
            <span className={colorClass}>{word}</span>{' '}
          </span>
        )
      }
      return <span key={i}>{word} </span>
    })
  }

  return (
    <section className="relative bg-gradient-to-br from-warm-cream to-primary-sage/10 section-padding overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-sage rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-warm-sand rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-text-dark mb-6 leading-tight">
              {renderHeadline()}
            </h1>
            <p className="text-xl md:text-2xl text-text-dark mb-8 leading-relaxed">
              {hero.subheadline}
            </p>

            {/* Personal Message */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-soft border-l-4 border-primary-sage">
              <div className="w-20 h-1 bg-gradient-sand rounded mb-4"></div>
              <p className="text-lg text-text-dark leading-relaxed mb-4">
                <span className="font-semibold text-primary-sage">Hi, I&apos;m {siteConfig.owner.fullTitle}.</span>{' '}
                {hero.personalMessage}
              </p>
              <Link href={hero.personalMessageLink.href} className="text-warm-sand hover:text-primary-sage font-medium inline-flex items-center transition-colors">
                {hero.personalMessageLink.text}
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={hero.primaryButton.href} className="bg-primary-sage text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-sage/90 transition-colors inline-flex items-center justify-center shadow-soft">
                <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
                {hero.primaryButton.text}
              </Link>
              <Link href={hero.secondaryButton.href} className="border-2 border-primary-sage text-primary-sage px-6 py-3 rounded-lg font-medium hover:bg-primary-sage hover:text-white transition-colors inline-flex items-center justify-center">
                {hero.secondaryButton.text}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative animate-slide-up hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <div className="aspect-[4/5]">
                <img
                  src="/images/tamara/christmas-portrait.jpg"
                  alt={siteConfig.owner.fullTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-medium p-4">
                <p className="text-2xl font-bold text-primary-sage">LPCA</p>
                <p className="text-sm text-text-dark">Clinical Mental Health</p>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-medium p-4">
                <p className="text-2xl font-bold text-earth-green">M.Ed.</p>
                <p className="text-sm text-text-dark">KY Licensed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
