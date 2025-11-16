'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Calendar, Clock, ArrowRight, BookOpen, Mail, Tag } from 'lucide-react'

// Blog article data
const blogArticles = [
  {
    slug: 'understanding-anxiety-therapist-guide',
    title: 'Understanding Anxiety: A Therapist\'s Comprehensive Guide',
    excerpt: 'Learn about the different types of anxiety disorders, their symptoms, and evidence-based treatment approaches that can help you find relief.',
    category: 'Anxiety',
    author: 'Tamara Walls, M.Ed, LPCA',
    date: '2024-11-15',
    readTime: '8 min read',
    featured: true,
    image: '/blog/anxiety-guide.jpg',
  },
  {
    slug: 'signs-you-need-therapy',
    title: '7 Signs It\'s Time to Seek Therapy',
    excerpt: 'Recognizing when professional support could be beneficial is an important step in your mental health journey. Here are key indicators to watch for.',
    category: 'Professional',
    author: 'Tamara Walls, M.Ed, LPCA',
    date: '2024-11-10',
    readTime: '6 min read',
    featured: true,
    image: '/blog/signs-therapy.jpg',
  },
  {
    slug: 'cbt-techniques-daily-life',
    title: 'CBT Techniques You Can Use in Daily Life',
    excerpt: 'Cognitive Behavioral Therapy offers practical tools you can use every day. Discover how to identify thought patterns and develop healthier responses.',
    category: 'Self-Care',
    author: 'Tamara Walls, M.Ed, LPCA',
    date: '2024-11-05',
    readTime: '7 min read',
    featured: true,
    image: '/blog/cbt-techniques.jpg',
  },
  {
    slug: 'choosing-right-therapist',
    title: 'How to Choose the Right Therapist for You',
    excerpt: 'Finding the right therapeutic fit is crucial for successful treatment. Learn what to look for and questions to ask when selecting a therapist.',
    category: 'Professional',
    author: 'Tamara Walls, M.Ed, LPCA',
    date: '2024-10-28',
    readTime: '7 min read',
    featured: false,
    image: '/blog/choosing-therapist.jpg',
  },
  {
    slug: 'self-care-mental-health',
    title: 'Evidence-Based Self-Care for Mental Health',
    excerpt: 'Self-care isn\'t just bubble baths and candles. Discover research-backed self-care practices that truly support your mental wellbeing.',
    category: 'Self-Care',
    author: 'Tamara Walls, M.Ed, LPCA',
    date: '2024-10-20',
    readTime: '6 min read',
    featured: false,
    image: '/blog/self-care.jpg',
  },
]

const categories = ['All', 'Anxiety', 'Depression', 'Relationships', 'Self-Care', 'Professional']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter articles based on category and search
  const filteredArticles = blogArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticles = blogArticles.filter(article => article.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-20">
        <div className="container-custom text-center">
          <BookOpen className="w-16 h-16 text-primary-sage mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Mental Health Insights
          </h1>
          <p className="text-xl text-text-dark max-w-3xl mx-auto mb-8">
            Evidence-based guidance, practical tips, and professional insights to support your mental health journey.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-warm-gray/30 focus:border-primary-sage focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-8 border-b border-warm-gray/20 sticky top-[72px] z-40">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-sage text-white'
                    : 'bg-cream text-text-dark hover:bg-warm-gray/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="section-padding bg-cream">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold text-text-dark">Featured Articles</h2>
              <Tag className="w-8 h-8 text-primary-sage" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="card group cursor-pointer"
                >
                  <div className="bg-gradient-sage-bg h-48 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-primary-sage/10 text-primary-sage text-sm font-medium rounded-full mb-3">
                    {article.category}
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark mb-3 group-hover:text-primary-sage transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-warm-gray mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-warm-gray pt-4 border-t border-warm-gray/20">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-text-dark mb-12">
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
          </h2>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-warm-gray mx-auto mb-4 opacity-50" />
              <p className="text-xl text-warm-gray">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="mt-6 btn btn-outline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="card group cursor-pointer flex flex-col md:flex-row gap-6"
                >
                  <div className="bg-gradient-sage-bg md:w-48 h-48 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white opacity-50" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-primary-sage/10 text-primary-sage text-sm font-medium rounded-full mb-3">
                      {article.category}
                    </div>
                    <h3 className="text-2xl font-bold text-text-dark mb-3 group-hover:text-primary-sage transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-warm-gray mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-warm-gray">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding gradient-sage-bg text-white">
        <div className="container-custom max-w-4xl text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">Stay Informed</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest mental health insights, practical tips, and exclusive resources delivered to your inbox monthly.
          </p>
          <form className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg text-text-dark focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="btn bg-white text-primary-sage hover:bg-cream px-8 py-4 inline-flex items-center justify-center"
            >
              Subscribe
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>
          <p className="text-sm opacity-75 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold text-text-dark mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl text-warm-gray mb-8">
            Reading about mental health is a great start. If you're ready for personalized support,
            schedule a free consultation to discuss how therapy can help you.
          </p>
          <Link href="/contact" className="btn btn-primary inline-flex items-center">
            Schedule Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
