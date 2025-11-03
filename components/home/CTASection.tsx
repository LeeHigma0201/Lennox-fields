import Link from 'next/link'
import { Calendar, Mail, Phone } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="section-padding gradient-sage-bg text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take the First Step?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Starting therapy can feel overwhelming, but you don't have to do it alone.
            I offer free 15-minute consultations to answer your questions and ensure we're a good fit.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Calendar className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Schedule Online</h3>
              <p className="text-sm opacity-90">Book your free consultation directly through our secure portal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-sm opacity-90">Speak with us directly at<br />(919) 999-9999</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Mail className="w-10 h-10 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-sm opacity-90">Send your questions to<br />tamara@lennoxfields.org</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream text-lg px-8 py-4">
              Schedule Free Consultation
            </Link>
            <Link href="/portal/login" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-sage text-lg px-8 py-4">
              Access Client Portal
            </Link>
          </div>

          <p className="mt-8 text-sm opacity-75">
            Currently accepting new clients in North Carolina and Indiana. Telehealth and in-person options available.
          </p>
        </div>
      </div>
    </section>
  )
}
