'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm-bg">
      <div className="container-custom max-w-2xl text-center px-4">
        <div className="bg-white rounded-xl shadow-strong p-12">
          {/* Error Icon */}
          <div className="mb-8">
            <AlertTriangle className="w-24 h-24 text-alert-red mx-auto" />
          </div>

          {/* Message */}
          <h2 className="text-4xl font-bold text-text-dark mb-4">
            Something Went Wrong
          </h2>
          <p className="text-xl text-warm-gray mb-8">
            We encountered an unexpected error. This has been logged and we'll look into it.
          </p>

          {/* Error Details (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-warm-gray/10 rounded text-left">
              <p className="text-sm font-mono text-text-dark break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={reset}
              className="btn btn-primary inline-flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <Link href="/" className="btn btn-outline inline-flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </div>

          {/* Help */}
          <div className="border-t border-warm-gray/20 pt-8">
            <p className="text-sm text-warm-gray mb-4">
              If this problem persists, please{' '}
              <Link href="/contact" className="text-primary-sage hover:text-earth-green font-medium">
                contact us
              </Link>
              .
            </p>
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
