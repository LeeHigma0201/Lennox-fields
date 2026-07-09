import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services, servicesPageHeader, paymentInfo } from '@/content/services'
import { iconMap, type IconName } from '@/content/icons'
import { siteConfig } from '@/content/site-config'

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            {servicesPageHeader.title}
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            {servicesPageHeader.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon as IconName]
              return (
                <div key={service.slug} className="card">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-primary-sage/10 p-4 rounded-lg">
                      <Icon className="w-8 h-8 text-primary-sage" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-text-dark mb-2">{service.title}</h2>
                      <p className="text-warm-gray">{service.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-sage mr-2">&#10003;</span>
                        <span className="text-text-dark">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-6 border-t border-warm-gray/20">
                    <div>
                      <p className="text-sm text-warm-gray">Starting at</p>
                      <p className="text-xl font-bold text-primary-sage">{service.price}</p>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn btn-outline inline-flex items-center"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Insurance & Payment Info */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
            Insurance & Payment Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-text-dark mb-4">Payment Options</h3>
              <ul className="space-y-2 text-text-dark">
                {paymentInfo.paymentOptions.map((option) => (
                  <li key={option}>&bull; {option}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-text-dark mb-4">Insurance</h3>
              <p className="text-text-dark mb-4">
                {paymentInfo.insuranceNote}
              </p>
              <ul className="space-y-2 text-text-dark">
                {paymentInfo.insuranceDetails.map((detail) => (
                  <li key={detail}>&bull; {detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Good Faith Estimate — No Surprises Act */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="card-clinical">
            <h2 className="text-2xl font-bold text-text-dark mb-4">Your Right to a Good Faith Estimate</h2>
            <p className="text-warm-gray mb-3">
              You have the right to receive a Good Faith Estimate explaining how much your care will cost.
            </p>
            <p className="text-warm-gray mb-3">
              Under the federal No Surprises Act, health care providers must give clients who are uninsured,
              or who are not using insurance, an estimate of expected charges before a scheduled service, or
              any time you ask. You can request a Good Faith Estimate before you schedule a session. If you
              receive a bill that is at least $400 more than your Good Faith Estimate, you may dispute it.
              Keep a copy of any estimate you receive.
            </p>
            <p className="text-warm-gray">
              To request an estimate or ask questions, contact{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-sage hover:text-earth-green">
                {siteConfig.contact.email}
              </a>
              . For more information, visit{' '}
              <a href="https://www.cms.gov/nosurprises" target="_blank" rel="noopener noreferrer" className="text-primary-sage hover:text-earth-green">
                cms.gov/nosurprises
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a free 15-minute consultation to discuss your needs and determine the best service for you.
          </p>
          <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
