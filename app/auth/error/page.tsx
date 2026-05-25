'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const ERROR_MESSAGES: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification: 'The sign-in link has expired or already been used. Please request a new one.',
  Default: 'An error occurred during sign-in. Please try again.',
}

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') ?? 'Default'
  const message = ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="text-5xl mb-6">⚠️</div>
        <h1 className="font-heading text-3xl text-stone-800 mb-3">Sign-in error</h1>
        <p className="text-stone-500 leading-relaxed mb-6">{message}</p>
        <a
          href="/auth/signin"
          className="inline-block rounded-lg bg-[#75856f] text-white px-6 py-2.5 font-medium hover:bg-[#5f6d5a] transition"
        >
          Try again
        </a>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  )
}
