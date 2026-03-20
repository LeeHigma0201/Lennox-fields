import Link from 'next/link'
import { BookOpen, Heart, Users, ShoppingCart, Download } from 'lucide-react'
import { books, booksPageHeader, therapeuticTools, companionResources, howToUse } from '@/content/books'

export default function BooksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <BookOpen className="w-20 h-20 text-soft-rose mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            {booksPageHeader.title}
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto">
            {booksPageHeader.subtitle}
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div key={book.id} className="card group hover:scale-105 transition-all duration-200">
                {/* Cover Placeholder */}
                <div className={`${book.coverColor} rounded-lg p-8 mb-6 aspect-[3/4] flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <BookOpen className="w-20 h-20 mx-auto mb-4 opacity-80" />
                    <p className="font-bold text-lg">{book.title}</p>
                  </div>
                </div>

                {/* Book Info */}
                <div className="mb-4">
                  <p className="text-sm text-warm-gray mb-2">Ages: {book.ageRange}</p>
                  <h3 className="text-xl font-bold text-text-dark mb-3">{book.title}</h3>
                  <p className="text-warm-gray mb-4 leading-relaxed">{book.description}</p>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-text-dark mb-2">Topics Covered:</p>
                  <div className="flex flex-wrap gap-2">
                    {book.topics.map((topic) => (
                      <span key={topic} className="px-3 py-1 bg-cream text-text-dark text-xs rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Formats */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-text-dark mb-2">Available Formats:</p>
                  <div className="flex gap-2">
                    {book.format.map((format) => (
                      <span key={format} className="px-3 py-1 bg-primary-sage/10 text-primary-sage text-xs rounded-full">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="mt-auto pt-6 border-t border-warm-gray/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-warm-gray">Starting at</p>
                      <p className="text-2xl font-bold text-primary-sage">${book.price}</p>
                    </div>
                    <button className="btn btn-primary inline-flex items-center">
                      <ShoppingCart className="mr-2 w-4 h-4" />
                      Purchase
                    </button>
                  </div>
                  <Link
                    href={`/books/${book.id}`}
                    className="text-primary-sage hover:text-earth-green text-sm font-medium"
                  >
                    Preview & Learn More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Therapists & Educators */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            For Therapists & Educators
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <Heart className="w-12 h-12 text-soft-rose mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">Therapeutic Tools</h3>
              <p className="text-warm-gray mb-4">
                Each book includes discussion questions, activities, and therapeutic prompts
                designed for use in clinical settings, classrooms, or at home.
              </p>
              <ul className="space-y-2 text-text-dark">
                {therapeuticTools.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary-sage mr-2">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <Users className="w-12 h-12 text-clinical-blue mb-4" />
              <h3 className="text-2xl font-bold text-text-dark mb-3">Companion Resources</h3>
              <p className="text-warm-gray mb-4">
                Free downloadable activity sheets, parent guides, and therapist notes available
                with each book purchase.
              </p>
              <ul className="space-y-2 text-text-dark">
                {companionResources.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary-sage mr-2">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-text-dark mb-4">
              Bulk discounts available for schools, clinics, and organizations
            </p>
            <Link href="/contact" className="btn btn-outline">
              Inquire About Bulk Orders
            </Link>
          </div>
        </div>
      </section>

      {/* How to Use These Books */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            How to Use These Books
          </h2>

          <div className="space-y-6">
            {howToUse.map((step, i) => (
              <div key={step.audience} className="flex items-start space-x-4">
                <div className="bg-soft-rose text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-dark mb-2">{step.audience}</h3>
                  <p className="text-warm-gray">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Help a Child Understand Their World
          </h2>
          <p className="text-xl mb-8 opacity-90">
            These books are more than stories&mdash;they&apos;re tools for emotional growth,
            resilience, and healing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary-sage hover:bg-cream inline-flex items-center">
              <ShoppingCart className="mr-2 w-5 h-5" />
              Shop All Books
            </button>
            <button className="btn border-2 border-white hover:bg-white hover:text-primary-sage inline-flex items-center">
              <Download className="mr-2 w-5 h-5" />
              Download Free Sample
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
