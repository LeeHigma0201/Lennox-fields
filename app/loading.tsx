export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-sage/20 border-t-primary-sage rounded-full animate-spin mx-auto mb-4" />
        <p className="text-warm-gray">Loading...</p>
      </div>
    </div>
  )
}
