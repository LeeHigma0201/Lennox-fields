import Link from 'next/link'
import { Award, BookOpen, Heart, ArrowRight } from 'lucide-react'

export default function AboutPreview() {
  return (
    <section className="section-padding bg-warm-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <div className="w-20 h-1 bg-gradient-sand rounded mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              Meet Tamara Walls, M.Ed, LPCA
            </h2>
            <p className="text-lg text-text-dark mb-6 leading-relaxed">
              My journey into mental health counseling began with a deep belief that everyone deserves
              compassionate, effective support during life's challenges. With a Master of Education in
              Clinical Mental Health Counseling and licensure as a Professional Counselor Associate,
              I bring both expertise and heart to every session.
            </p>
            <p className="text-lg text-text-dark mb-8 leading-relaxed">
              I specialize in helping individuals, couples, and families navigate anxiety, depression,
              relationship challenges, career transitions, and trauma. Beyond traditional therapy,
              I'm passionate about making mental health resources accessible to everyone—which is why
              Lennox Fields offers a comprehensive library of tools, assessments, and educational materials.
            </p>

            {/* Credentials */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <Award className="w-6 h-6 text-primary-sage flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-text-dark">M.Ed</p>
                  <p className="text-sm text-warm-gray">Clinical Mental Health Counseling</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BookOpen className="w-6 h-6 text-primary-sage flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-text-dark">LPCA</p>
                  <p className="text-sm text-warm-gray">Licensed in NC & IN</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-primary-sage flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-text-dark">Specialized</p>
                  <p className="text-sm text-warm-gray">CBT, EMDR, Career</p>
                </div>
              </div>
            </div>

            <Link href="/about" className="btn btn-primary inline-flex items-center">
              Read My Full Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Right Column - Highlights */}
          <div className="space-y-6">
            <div className="card bg-white border-l-4 border-primary-sage">
              <div className="w-16 h-1 bg-gradient-sand rounded mb-3"></div>
              <h3 className="text-2xl font-bold mb-3 text-primary-sage">My Approach</h3>
              <p className="leading-relaxed text-text-dark">
                I believe therapy should be a collaborative partnership. Together, we'll identify your
                goals, build on your strengths, and develop practical strategies for lasting change.
                You're the expert on your life—I'm here to provide guidance, support, and evidence-based tools.
              </p>
            </div>

            <div className="card bg-white">
              <div className="w-16 h-1 bg-gradient-sand rounded mb-3"></div>
              <h3 className="text-2xl font-bold text-text-dark mb-3">Specialized Training</h3>
              <ul className="space-y-2 text-text-dark">
                <li className="flex items-start">
                  <span className="text-primary-sage mr-2 text-lg">•</span>
                  Cognitive Behavioral Therapy (CBT)
                </li>
                <li className="flex items-start">
                  <span className="text-primary-sage mr-2 text-lg">•</span>
                  Eye Movement Desensitization and Reprocessing (EMDR)
                </li>
                <li className="flex items-start">
                  <span className="text-primary-sage mr-2 text-lg">•</span>
                  Couples and Family Systems Therapy
                </li>
                <li className="flex items-start">
                  <span className="text-primary-sage mr-2 text-lg">•</span>
                  Career Development and Counseling
                </li>
                <li className="flex items-start">
                  <span className="text-primary-sage mr-2 text-lg">•</span>
                  Trauma-Informed Care
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
