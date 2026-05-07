import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { hero } from '@/content/home-page'
import { siteConfig } from '@/content/site-config'

export default function HeroSection() {
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
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-sage rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-warm-sand rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <span className="inline-block text-xs uppercase tracking-[0.22em] text-primary-sage font-medium mb-4">
            {siteConfig.tagline} &middot; {siteConfig.contact.location}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-ink mb-6 leading-tight tracking-tight">
            {renderHeadline()}
          </h1>
          <span className="block w-20 h-1 bg-gradient-sand rounded-full mb-6 mx-auto" aria-hidden="true"></span>
          <p className="text-xl md:text-2xl text-text-dark mb-8 leading-relaxed">
            {hero.subheadline}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft text-sm">
              <span className="font-bold text-primary-sage mr-2">LPCA</span>
              <span className="text-text-dark">Clinical Mental Health</span>
            </span>
            <span className="inline-flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft text-sm">
              <span className="font-bold text-earth-green mr-2">M.Ed.</span>
              <span className="text-text-dark">KY Licensed</span>
            </span>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-soft border-l-4 border-primary-sage text-left">
            <p className="text-lg text-text-dark leading-relaxed mb-4">
              {hero.personalMessage}
            </p>
            <Link href={hero.personalMessageLink.href} className="text-warm-sand hover:text-primary-sage font-medium inline-flex items-center transition-colors">
              {hero.personalMessageLink.text}
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </section>
  )
}
