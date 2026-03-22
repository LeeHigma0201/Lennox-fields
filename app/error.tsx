'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-lg px-4">
        <p className="text-6xl font-bold text-soft-rose mb-4">Oops</p>
        <h1 className="text-3xl font-bold text-text-dark mb-4">Something went wrong</h1>
        <p className="text-warm-gray mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <button onClick={reset} className="btn btn-primary">
          Try Again
        </button>
      </div>
    </div>
  )
}
