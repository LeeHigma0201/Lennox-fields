import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-lg px-4">
        <p className="text-8xl font-bold text-primary-sage mb-4">404</p>
        <h1 className="text-3xl font-bold text-text-dark mb-4">Page Not Found</h1>
        <p className="text-warm-gray mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
