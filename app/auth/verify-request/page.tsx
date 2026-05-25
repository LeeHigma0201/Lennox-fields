export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="text-5xl mb-6">✉️</div>
        <h1 className="font-heading text-3xl text-stone-800 mb-3">Check your email</h1>
        <p className="text-stone-500 leading-relaxed mb-6">
          A sign-in link has been sent to your email address. Click the link in the email to
          finish signing in.
        </p>
        <p className="text-xs text-stone-400">
          The link expires in 24 hours. If you don&apos;t see it, check your spam folder.
        </p>
        <div className="mt-8">
          <a
            href="/auth/signin"
            className="text-sm text-[#75856f] underline hover:text-[#5f6d5a]"
          >
            Try a different email
          </a>
        </div>
      </div>
    </div>
  )
}
