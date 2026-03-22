import Link from 'next/link'
import Image from 'next/image'
import { Award, BookOpen, Calendar } from 'lucide-react'
import { aboutHeader, myStory, credentials, specializedTraining, clinicalApproach, beyondClinical } from '@/content/about'
import { siteConfig } from '@/content/site-config'
import { iconMap, type IconName } from '@/content/icons'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-strong">
                <Image
                  src="/images/tamara/christmas-portrait.jpg"
                  alt={`${siteConfig.owner.name}, Licensed Professional Counselor Associate`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Right - Intro */}
            <div className="order-1 lg:order-2">
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
                {aboutHeader.title}
              </h1>
              <p className="text-xl text-text-dark mb-6 leading-relaxed">
                {aboutHeader.subtitle}
              </p>
              <p className="text-lg text-text-dark leading-relaxed">
                {aboutHeader.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-8 text-center">
            {myStory.title}
          </h2>

          <div className="prose prose-lg max-w-none text-text-dark">
            {myStory.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
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
            {credentials.map((cred, i) => {
              const Icon = i === 0 ? Award : BookOpen
              return (
                <div key={cred.title} className="card">
                  <Icon className="w-12 h-12 text-primary-sage mb-4" />
                  <h3 className="text-2xl font-bold text-text-dark mb-3">{cred.title}</h3>
                  <p className="text-warm-gray mb-2">{cred.subtitle}</p>
                  <p className="text-sm text-warm-gray">{cred.description}</p>
                </div>
              )
            })}
          </div>


          <h3 className="text-3xl font-bold text-text-dark mb-8 text-center">
            Specialized Training
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {specializedTraining.map((item) => {
              const Icon = iconMap[item.icon as IconName]
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
            {clinicalApproach.title}
          </h2>

          <div className="space-y-8">
            {clinicalApproach.approaches.map((approach) => (
              <div key={approach.title} className="card">
                <h3 className="text-2xl font-bold text-text-dark mb-4">{approach.title}</h3>
                <p className="text-warm-gray leading-relaxed">{approach.description}</p>
              </div>
            ))}
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
            {beyondClinical.map((item, i) => (
              <div key={item.title} className="card">
                {i === 0 && (
                  <div className="rounded-lg overflow-hidden mb-4">
                    <Image
                      src="/images/tamara/book-launch.jpg"
                      alt="Tamara Walls at book launch with Brave Hearts and Helping Hands"
                      width={600}
                      height={192}
                      className="w-full h-48 object-cover object-top"
                    />
                  </div>
                )}
                {i !== 0 && <BookOpen className="w-12 h-12 text-soft-rose mb-4" />}
                <h3 className="text-2xl font-bold text-text-dark mb-3">{item.title}</h3>
                <p className="text-warm-gray mb-4">{item.description}</p>
                <Link href={item.linkHref} className="text-primary-sage hover:text-earth-green font-medium">
                  {item.linkText} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl mb-8 opacity-90">
            If you&apos;re looking for a therapist who combines clinical expertise with genuine compassion,
            I&apos;d love to hear from you. Let&apos;s schedule a free consultation to discuss how I can support
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
