import Link from 'next/link'
import Image from 'next/image'
import { Award, BookOpen, Heart, ArrowRight } from 'lucide-react'
import { aboutPreview } from '@/content/about'

const credentialIcons = [Award, BookOpen, Heart]

export default function AboutPreview() {
  return (
    <section className="section-padding bg-warm-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="w-20 h-1 bg-gradient-sand rounded-full mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              {aboutPreview.title}
            </h2>
            {aboutPreview.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lg text-text-dark mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Credentials */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {aboutPreview.credentials.map((cred, i) => {
                const Icon = credentialIcons[i] || Award
                return (
                  <div key={cred.label} className="flex items-start space-x-3">
                    <Icon className="w-6 h-6 text-primary-sage flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-text-dark">{cred.label}</p>
                      <p className="text-sm text-warm-gray">{cred.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link href="/about" className="btn btn-primary inline-flex items-center">
              Read My Full Story
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </div>

          {/* Right Column - Highlights */}
          <div className="space-y-6">
            {/* Tamara's Photo */}
            <div className="rounded-2xl overflow-hidden shadow-soft">
              <Image
                src="/images/tamara/casual-sunglasses.jpg"
                alt="Tamara Walls wearing sunglasses outdoors"
                width={600}
                height={256}
                className="w-full h-64 object-cover object-top"
              />
            </div>

            <div className="card bg-white border-l-4 border-primary-sage">
              <div className="w-16 h-1 bg-gradient-sand rounded-full mb-3"></div>
              <h3 className="text-2xl font-bold mb-3 text-primary-sage">{aboutPreview.approachTitle}</h3>
              <p className="leading-relaxed text-text-dark">
                {aboutPreview.approachText}
              </p>
            </div>

            <div className="card bg-white">
              <div className="w-16 h-1 bg-gradient-sand rounded-full mb-3"></div>
              <h3 className="text-2xl font-bold text-text-dark mb-3">Specialized Training</h3>
              <ul className="space-y-2 text-text-dark">
                {aboutPreview.trainingList.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary-sage mr-2 text-lg">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
