import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm-bg">
      <div className="container-custom max-w-2xl text-center px-4">
        <div className="bg-white rounded-xl shadow-strong p-12">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-sage opacity-20">404</h1>
          </div>

          {/* Message */}
          <h2 className="text-4xl font-bold text-text-dark mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-warm-gray mb-8">
            We couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/" className="btn btn-primary inline-flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            <Link href="/resources" className="btn btn-outline inline-flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" />
              Browse Resources
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="border-t border-warm-gray/20 pt-8">
            <p className="text-sm text-warm-gray mb-4">Looking for something? Try these:</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link href="/services" className="text-primary-sage hover:text-earth-green font-medium">
                Therapy Services
              </Link>
              <Link href="/tools/screening-tools" className="text-primary-sage hover:text-earth-green font-medium">
                Free Assessments
              </Link>
              <Link href="/resources/worksheets" className="text-primary-sage hover:text-earth-green font-medium">
                Worksheets
              </Link>
              <Link href="/contact" className="text-primary-sage hover:text-earth-green font-medium">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Crisis Resources */}
          <div className="mt-8 bg-clinical-blue/10 border-l-4 border-clinical-blue p-4 rounded text-left">
            <p className="text-sm text-text-dark">
              <strong>In Crisis?</strong> Call 988 (Suicide & Crisis Lifeline) or text "HELLO" to 741741 (Crisis Text Line)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
