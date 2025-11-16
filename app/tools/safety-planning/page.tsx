'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, Heart, Phone, Users, Home, Shield, Download, FileText, Lightbulb } from 'lucide-react'
import jsPDF from 'jspdf'

interface SafetyPlan {
  warningsSigns: string
  copingStrategies: string
  distractionPeople: string
  distractionActivities: string
  supportPeople: string
  professionals: string
  makeSafeEnvironment: string
  otherSafety: string
}

export default function SafetyPlanningPage() {
  const [showTemplate, setShowTemplate] = useState(false)
  const [safePlan, setSafePlan] = useState<SafetyPlan>({
    warningsSigns: '',
    copingStrategies: '',
    distractionPeople: '',
    distractionActivities: '',
    supportPeople: '',
    professionals: '',
    makeSafeEnvironment: '',
    otherSafety: '',
  })
  const [savedDate, setSavedDate] = useState<string | null>(null)

  const handleInputChange = (field: keyof SafetyPlan, value: string) => {
    setSafePlan(prev => ({ ...prev, [field]: value }))
  }

  const handleSavePlan = () => {
    localStorage.setItem('safetyPlan', JSON.stringify(safePlan))
    setSavedDate(new Date().toLocaleDateString())
    alert('Safety plan saved locally to your device.')
  }

  const handleLoadPlan = () => {
    const saved = localStorage.getItem('safetyPlan')
    if (saved) {
      setSafePlan(JSON.parse(saved))
      alert('Previous safety plan loaded.')
    } else {
      alert('No saved safety plan found.')
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    const contentWidth = pageWidth - 2 * margin
    let yPosition = margin + 10

    // Title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('My Safety Plan', margin, yPosition)

    yPosition += 15

    // Date
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Created: ${new Date().toLocaleDateString()}`, margin, yPosition)

    yPosition += 12

    // Important disclaimer
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(210, 69, 69) // alert-red
    const disclaimerText = 'IMPORTANT: This safety plan is not a substitute for professional mental health care. If you are in immediate danger, call 911 or go to the nearest emergency room.'
    const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth)
    doc.text(disclaimerLines, margin, yPosition)

    yPosition += disclaimerLines.length * 5 + 8
    doc.setTextColor(58, 58, 58) // text-dark

    const sections = [
      { title: '1. Warning Signs I Experience', content: safePlan.warningsSigns || '(Not filled in)' },
      { title: '2. Internal Coping Strategies', content: safePlan.copingStrategies || '(Not filled in)' },
      { title: '3. People & Social Settings for Distraction', content: safePlan.distractionPeople || '(Not filled in)' },
      { title: '4. Activities That Help Distract Me', content: safePlan.distractionActivities || '(Not filled in)' },
      { title: '5. People I Can Ask for Help', content: safePlan.supportPeople || '(Not filled in)' },
      { title: '6. Professionals & Agencies to Contact', content: safePlan.professionals || '(Not filled in)' },
      { title: '7. Making My Environment Safer', content: safePlan.makeSafeEnvironment || '(Not filled in)' },
      { title: '8. Other Coping or Safety Strategies', content: safePlan.otherSafety || '(Not filled in)' },
    ]

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')

    sections.forEach(section => {
      // Check if we need a new page
      if (yPosition > pageHeight - margin - 20) {
        doc.addPage()
        yPosition = margin
      }

      doc.text(section.title, margin, yPosition)
      yPosition += 8

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      const contentLines = doc.splitTextToSize(section.content, contentWidth - 5)
      doc.text(contentLines, margin + 5, yPosition)

      yPosition += contentLines.length * 5 + 10

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
    })

    // Crisis resources footer
    if (yPosition > pageHeight - margin - 40) {
      doc.addPage()
      yPosition = margin
    }

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Crisis Resources - Available 24/7', margin, yPosition)
    yPosition += 10

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    const crisisInfo = [
      '988 Suicide & Crisis Lifeline: Call or text 988 (US)',
      'Crisis Text Line: Text HOME to 741741',
      'International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/',
      'Emergency: Call 911 or go to nearest ER'
    ]

    crisisInfo.forEach(line => {
      doc.text(line, margin, yPosition)
      yPosition += 6
    })

    // Save PDF
    doc.save('my-safety-plan.pdf')
  }

  const handleClearPlan = () => {
    if (confirm('Are you sure you want to clear your safety plan? This cannot be undone.')) {
      setSafePlan({
        warningsSigns: '',
        copingStrategies: '',
        distractionPeople: '',
        distractionActivities: '',
        supportPeople: '',
        professionals: '',
        makeSafeEnvironment: '',
        otherSafety: '',
      })
      localStorage.removeItem('safetyPlan')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-warm-bg py-16 md:py-24">
        <div className="container-custom text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-clinical-blue rounded-full mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            Safety Planning
          </h1>

          <p className="text-xl text-text-dark max-w-3xl mx-auto mb-10 leading-relaxed">
            A safety plan is a personal, practical plan that helps you recognize warning signs and
            know what to do when you're in crisis. It's a tool of hope—helping you stay safe during
            difficult times and connecting you with support when you need it most.
          </p>

          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-2xl mb-8">
            <p className="text-text-dark text-sm leading-relaxed">
              <span className="font-semibold text-clinical-blue">This tool is for:</span> Anyone struggling with
              suicidal thoughts, self-harm urges, or other mental health crises. Safety planning is recommended
              by mental health professionals and has been shown to reduce suicide risk when used with professional support.
            </p>
          </div>

          <button
            onClick={() => setShowTemplate(true)}
            className="btn btn-primary text-lg px-8 py-4 inline-block"
          >
            Create Your Safety Plan
          </button>
        </div>
      </section>

      {/* What is Safety Planning */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            What is Safety Planning?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text-dark flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-accent-gold flex-shrink-0 mt-1" />
                It's About Connection
              </h3>
              <p className="text-warm-gray leading-relaxed">
                Safety planning isn't about struggling alone. It's about identifying the people,
                activities, and strategies that keep you grounded and connected—and knowing who to reach
                out to when crisis strikes.
              </p>

              <h3 className="text-2xl font-bold text-text-dark flex items-start gap-3 mt-8">
                <Shield className="w-6 h-6 text-primary-sage flex-shrink-0 mt-1" />
                Practical & Personal
              </h3>
              <p className="text-warm-gray leading-relaxed">
                There's no one-size-fits-all approach. Your safety plan reflects your unique needs,
                values, and what actually helps you. It's practical guidance tailored to you.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text-dark flex items-start gap-3">
                <Users className="w-6 h-6 text-soft-rose flex-shrink-0 mt-1" />
                Recognized by Professionals
              </h3>
              <p className="text-warm-gray leading-relaxed">
                Safety planning is evidence-based and recommended by organizations including the American
                Foundation for Suicide Prevention, the National Suicide Prevention Lifeline, and clinical
                researchers. It works best when done with a mental health professional.
              </p>

              <h3 className="text-2xl font-bold text-text-dark flex items-start gap-3 mt-8">
                <AlertCircle className="w-6 h-6 text-alert-red flex-shrink-0 mt-1" />
                Not a Substitute
              </h3>
              <p className="text-warm-gray leading-relaxed">
                This plan supports professional treatment but doesn't replace it. If you're experiencing
                suicidal thoughts, please reach out to a mental health professional or crisis service immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Template Section */}
      {showTemplate && (
        <section className="section-padding bg-cream">
          <div className="container-custom max-w-4xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-4xl font-bold text-text-dark">Build Your Safety Plan</h2>
              <button
                onClick={() => setShowTemplate(false)}
                className="text-warm-gray hover:text-text-dark text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-white/60 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-clinical-blue flex-shrink-0 mt-1" />
              <p className="text-sm text-text-dark">
                Take your time with this. There are no right or wrong answers. What matters is what's true for you.
                Your safety plan is confidential and saved only on your device unless you choose to share it.
              </p>
            </div>

            <form className="space-y-8">
              {/* 1. Warning Signs */}
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-alert-red text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark">Warning Signs</h3>
                    <p className="text-warm-gray text-sm mt-1">
                      What thoughts, feelings, behaviors, or situations signal that a crisis might be building?
                    </p>
                  </div>
                </div>
                <textarea
                  value={safePlan.warningsSigns}
                  onChange={(e) => handleInputChange('warningsSigns', e.target.value)}
                  placeholder="Example: Increased isolation, sleeping too much or too little, intrusive thoughts about ending my life, difficulty concentrating..."
                  className="input h-24"
                />
              </div>

              {/* 2. Internal Coping Strategies */}
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-clinical-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark">Internal Coping Strategies</h3>
                    <p className="text-warm-gray text-sm mt-1">
                      Things you can do by yourself to manage difficult feelings when you're alone or can't reach others
                    </p>
                  </div>
                </div>
                <textarea
                  value={safePlan.copingStrategies}
                  onChange={(e) => handleInputChange('copingStrategies', e.target.value)}
                  placeholder="Example: Deep breathing exercises, journaling, taking a cold shower, prayer/meditation, listening to music, exercising, creative activities..."
                  className="input h-24"
                />
              </div>

              {/* 3. People & Social Settings for Distraction */}
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-soft-rose text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark">People & Social Settings for Distraction</h3>
                    <p className="text-warm-gray text-sm mt-1">
                      People you could call or visit, or places you could go to be around others and distract yourself
                    </p>
                  </div>
                </div>
                <textarea
                  value={safePlan.distractionPeople}
                  onChange={(e) => handleInputChange('distractionPeople', e.target.value)}
                  placeholder="Example: Coffee shop with my friend, community center, family member's house, support group meeting, class at the gym, library..."
                  className="input h-24"
                />
              </div>

              {/* 4. Activities That Help Distract */}
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-earth-green text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark">Activities That Help Distract Me</h3>
                    <p className="text-warm-gray text-sm mt-1">
                      Hobbies, tasks, or activities that absorb your attention and help you feel better
                    </p>
                  </div>
                </div>
                <textarea
                  value={safePlan.distractionActivities}
                  onChange={(e) => handleInputChange('distractionActivities', e.target.value)}
                  placeholder="Example: Painting, gaming, cooking, reading, gardening, playing music, sports, volunteering, learning something new..."
                  className="input h-24"
                />
              </div>

              {/* 5. People to Ask for Help */}
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-primary-sage text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    5
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark">People to Ask for Help</h3>
                    <p className="text-warm-gray text-sm mt-1">
                      Names, phone numbers, and how to reach trusted people in your life (family, friends, mentors)
                    </p>
                  </div>
                </div>
                <textarea
                  value={safePlan.supportPeople}
                  onChange={(e) => handleInputChange('supportPeople', e.target.value)}
                  placeholder="Example: Mom (555-1234), best friend Jake (text), mentor Sarah (email: sarah@email.com), sister (call after 6pm)..."
                  className="input h-24"
                />
              </div>

              {/* 6. Professionals/Agencies to Contact */}
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-accent-gold text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    6
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark">Professionals & Agencies to Contact</h3>
                    <p className="text-warm-gray text-sm mt-1">
                      Names, phone numbers, and websites of mental health professionals and crisis services
                    </p>
                  </div>
                </div>
                <textarea
                  value={safePlan.professionals}
                  onChange={(e) => handleInputChange('professionals', e.target.value)}
                  placeholder="Example: My therapist Dr. Smith (555-5678), psychiatrist (555-5679), hospital ER (555-0001), local crisis line..."
                  className="input h-24"
                />
              </div>

              {/* 7. Making Environment Safe */}
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-warning-amber text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    7
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark">Making My Environment Safer</h3>
                    <p className="text-warm-gray text-sm mt-1">
                      Ways to reduce access to means of self-harm and create a safer physical space
                    </p>
                  </div>
                </div>
                <textarea
                  value={safePlan.makeSafeEnvironment}
                  onChange={(e) => handleInputChange('makeSafeEnvironment', e.target.value)}
                  placeholder="Example: Asking friend to hold my medications, removing harmful items, staying with someone, changing my sleep space..."
                  className="input h-24"
                />
              </div>

              {/* 8. Other Coping or Safety */}
              <div className="card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-success-green text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    8
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark">Other Coping or Safety Strategies</h3>
                    <p className="text-warm-gray text-sm mt-1">
                      Anything else that helps you feel safe, hopeful, or better
                    </p>
                  </div>
                </div>
                <textarea
                  value={safePlan.otherSafety}
                  onChange={(e) => handleInputChange('otherSafety', e.target.value)}
                  placeholder="Example: Reminding myself of reasons to live, looking at photos of loved ones, revisiting goals and dreams, acts of kindness..."
                  className="input h-24"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                <button
                  type="button"
                  onClick={handleSavePlan}
                  className="btn btn-primary flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Save Plan
                </button>
                <button
                  type="button"
                  onClick={handleLoadPlan}
                  className="btn btn-secondary flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Load Plan
                </button>
                <button
                  type="button"
                  onClick={generatePDF}
                  className="btn border-2 border-clinical-blue text-clinical-blue hover:bg-clinical-blue hover:text-white flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={handleClearPlan}
                  className="btn border-2 border-alert-red text-alert-red hover:bg-alert-red hover:text-white flex items-center justify-center gap-2"
                >
                  Clear
                </button>
              </div>

              {savedDate && (
                <div className="bg-success-green/10 border-l-4 border-success-green rounded p-4 mt-6">
                  <p className="text-success-green font-medium">
                    ✓ Safety plan saved on {savedDate}
                  </p>
                </div>
              )}
            </form>
          </div>
        </section>
      )}

      {/* When to Go to ER */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            When to Go to the Emergency Room
          </h2>

          <div className="card-clinical mb-8">
            <p className="text-text-dark leading-relaxed mb-6">
              <span className="font-semibold text-clinical-blue">Go to the ER immediately or call 911 if:</span>
            </p>
            <ul className="space-y-4 text-text-dark">
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span>You're having active suicidal thoughts and cannot keep yourself safe</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span>You're experiencing severe self-harm urges you can't control</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span>You've attempted suicide or self-harm</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span>You're hearing voices or experiencing hallucinations telling you to hurt yourself</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span>You feel completely overwhelmed and unable to manage even with your safety plan</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span>You're having thoughts of harming others</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span>You're experiencing substance intoxication that's making things worse</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span>You're in any situation where you feel unsafe or unsure if you can keep yourself safe</span>
              </li>
            </ul>
          </div>

          <div className="bg-soft-rose/20 border border-soft-rose rounded-lg p-6">
            <p className="text-text-dark">
              <span className="font-semibold text-soft-rose">Remember:</span> Going to the ER during a crisis is
              a sign of strength, not weakness. Emergency rooms have trained staff who understand mental health crises
              and can provide immediate support. You deserve help.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="section-padding bg-cream">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            Crisis Resources Available 24/7
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 988 Lifeline */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-alert-red text-white rounded-lg p-3">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-text-dark">
                  988 Suicide & Crisis Lifeline
                </h3>
              </div>
              <p className="text-warm-gray mb-4">
                Free, confidential, 24/7 support for people in suicidal crisis or emotional distress.
              </p>
              <div className="bg-alert-red/10 rounded p-4 mb-4">
                <p className="text-alert-red font-bold text-lg">Call or text 988</p>
              </div>
              <p className="text-sm text-warm-gray">
                <span className="font-semibold">Available:</span> US only, English and Spanish speakers
              </p>
            </div>

            {/* Crisis Text Line */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-clinical-blue text-white rounded-lg p-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-text-dark">
                  Crisis Text Line
                </h3>
              </div>
              <p className="text-warm-gray mb-4">
                Text-based crisis support for those who prefer texting to talking.
              </p>
              <div className="bg-clinical-blue/10 rounded p-4 mb-4">
                <p className="text-clinical-blue font-bold text-lg">Text HOME to 741741</p>
              </div>
              <p className="text-sm text-warm-gray">
                <span className="font-semibold">Available:</span> US, Canada, UK, Ireland
              </p>
            </div>

            {/* International Association for Suicide Prevention */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-sage text-white rounded-lg p-3">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-text-dark">
                  International Association for Suicide Prevention
                </h3>
              </div>
              <p className="text-warm-gray mb-4">
                Directory of crisis centers and resources worldwide.
              </p>
              <Link
                href="https://www.iasp.info/resources/Crisis_Centres/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-clinical-blue font-semibold hover:underline flex items-center gap-2"
              >
                Visit Directory
                <span>→</span>
              </Link>
            </div>

            {/* Emergency Services */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-alert-red text-white rounded-lg p-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-text-dark">
                  Immediate Emergency
                </h3>
              </div>
              <p className="text-warm-gray mb-4">
                For life-threatening emergencies or immediate danger.
              </p>
              <div className="bg-alert-red/10 rounded p-4 mb-4">
                <p className="text-alert-red font-bold text-lg">Call 911</p>
              </div>
              <p className="text-sm text-warm-gray">
                <span className="font-semibold">Go to:</span> Nearest emergency room or hospital
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg p-8 border-l-4 border-clinical-blue">
            <h3 className="text-2xl font-bold text-text-dark mb-4">
              If You're Outside the US
            </h3>
            <p className="text-text-dark mb-6">
              Crisis support is available in most countries. Common resources include:
            </p>
            <ul className="space-y-3 text-text-dark">
              <li className="flex gap-3">
                <span className="text-clinical-blue font-bold">•</span>
                <span><span className="font-semibold">Canada:</span> Call 1-833-456-4566 or text 45645</span>
              </li>
              <li className="flex gap-3">
                <span className="text-clinical-blue font-bold">•</span>
                <span><span className="font-semibold">UK:</span> Call 116 123 (Samaritans)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-clinical-blue font-bold">•</span>
                <span><span className="font-semibold">Australia:</span> Call 1300 659 467 (Lifeline)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-clinical-blue font-bold">•</span>
                <span><span className="font-semibold">Germany:</span> Call 0800 111 0 111 or 0800 111 0 222</span>
              </li>
              <li className="flex gap-3">
                <span className="text-clinical-blue font-bold">•</span>
                <span>Search "suicide prevention lifeline [your country]" for local resources</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Use Your Safety Plan Effectively */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-12 text-center">
            How to Use Your Safety Plan Effectively
          </h2>

          <div className="space-y-8">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary-sage flex-shrink-0">1.</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-text-dark mb-3">Share It With People You Trust</h3>
                  <p className="text-warm-gray leading-relaxed">
                    Give copies to your therapist, psychiatrist, and trusted people in your life. They can help
                    you access the resources on your plan when you're in crisis. Don't keep it secret—vulnerability
                    is strength.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary-sage flex-shrink-0">2.</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-text-dark mb-3">Review It Regularly</h3>
                  <p className="text-warm-gray leading-relaxed">
                    Look at your plan weekly or monthly when you're doing okay, not just when you're in crisis.
                    This helps you remember what helps and lets you update it as your life changes. If a support
                    person's number changes or new strategies work better, update them.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary-sage flex-shrink-0">3.</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-text-dark mb-3">Use It During Early Warning Signs</h3>
                  <p className="text-warm-gray leading-relaxed">
                    You don't have to wait until you're in the depths of crisis. The moment you notice warning
                    signs—like not sleeping, isolating, or intrusive thoughts—pull out your plan and start with
                    the coping strategies and distractions. Early action is easier and more effective.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary-sage flex-shrink-0">4.</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-text-dark mb-3">Start With What's Easiest</h3>
                  <p className="text-warm-gray leading-relaxed">
                    When you're in crisis, decision-making is hard. Start with the easiest coping strategies or
                    the person you're most likely to reach. Sometimes just taking a cold shower or calling your
                    best friend is the bridge you need.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary-sage flex-shrink-0">5.</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-text-dark mb-3">Keep It Accessible</h3>
                  <p className="text-warm-gray leading-relaxed">
                    Print a copy and keep it somewhere you'll see it—your wallet, nightstand, bathroom mirror.
                    Take a photo and save it on your phone. In crisis moments, you might forget what helps unless
                    it's right there.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary-sage flex-shrink-0">6.</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-text-dark mb-3">Work With a Professional</h3>
                  <p className="text-warm-gray leading-relaxed">
                    Safety planning is most effective when done with a mental health professional. They can help
                    you identify realistic coping strategies, connect you with resources, and adjust your plan as
                    you heal and grow.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary-sage flex-shrink-0">7.</div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-text-dark mb-3">Be Gentle With Yourself</h3>
                  <p className="text-warm-gray leading-relaxed">
                    If you struggle with your plan—if you can't reach anyone or nothing seems to help—that's not
                    failure. That's when you go to the ER or call 911. You deserve professional care. Your safety
                    plan is a tool, not a test.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Disclaimers */}
      <section className="section-padding bg-soft-rose/10">
        <div className="container-custom max-w-5xl">
          <h2 className="text-4xl font-bold text-text-dark mb-8 text-center">
            Important Information
          </h2>

          <div className="card-clinical mb-8">
            <h3 className="text-2xl font-bold text-clinical-blue mb-4">This Is Not Professional Help</h3>
            <p className="text-text-dark leading-relaxed">
              This safety planning tool is educational and supportive, but it is not a substitute for professional
              mental health care. If you're experiencing suicidal thoughts, self-harm urges, or any mental health crisis,
              please reach out to a qualified mental health professional, crisis service, or emergency room immediately.
            </p>
          </div>

          <div className="card-clinical mb-8">
            <h3 className="text-2xl font-bold text-clinical-blue mb-4">Your Privacy</h3>
            <p className="text-text-dark leading-relaxed mb-4">
              Your safety plan is stored only on your device and is not transmitted anywhere unless you choose to share it.
              We do not collect, store, or access your responses. If you close your browser without saving, your plan will
              be lost. Always save and back up important information.
            </p>
          </div>

          <div className="card-clinical mb-8">
            <h3 className="text-2xl font-bold text-clinical-blue mb-4">Confidentiality With Professionals</h3>
            <p className="text-text-dark leading-relaxed">
              When you share your safety plan with a therapist or doctor, it becomes part of your medical record and is
              protected by privacy laws. However, if you or someone else is in immediate danger, mental health professionals
              are required to break confidentiality to keep you safe.
            </p>
          </div>

          <div className="bg-alert-red/10 border-l-4 border-alert-red rounded p-6">
            <h3 className="text-xl font-bold text-alert-red mb-3">Crisis Situations</h3>
            <p className="text-text-dark leading-relaxed">
              If you're in immediate danger, experiencing a mental health emergency, or having thoughts of suicide or
              self-harm, please:
            </p>
            <ul className="mt-4 space-y-2 text-text-dark">
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span><span className="font-semibold">Call 988</span> (Suicide & Crisis Lifeline)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span><span className="font-semibold">Text 741741</span> (Crisis Text Line)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-alert-red font-bold flex-shrink-0">•</span>
                <span><span className="font-semibold">Call 911</span> or go to the nearest ER</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Closing Message & CTA */}
      <section className="section-padding gradient-sage-bg text-white text-center">
        <div className="container-custom max-w-3xl">
          <Heart className="w-16 h-16 mx-auto mb-8 opacity-90" />

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            You Deserve to Feel Safe
          </h2>

          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Creating this safety plan is an act of self-care and hope. It shows you're taking your mental health seriously
            and that you want to keep yourself safe. That takes courage. You're not alone, and there are people and resources
            ready to support you through the hardest moments.
          </p>

          <div className="space-y-4 mb-8">
            <p className="text-lg font-semibold">
              If you haven't already, consider working with a mental health professional to refine your safety plan together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-primary-sage hover:bg-cream">
              Schedule a Consultation
            </Link>
            <Link href="/resources" className="btn border-2 border-white hover:bg-white hover:text-primary-sage">
              More Resources
            </Link>
          </div>

          <p className="text-sm opacity-75 mt-8">
            Remember: Reaching out is a sign of strength, not weakness.
          </p>
        </div>
      </section>
    </div>
  )
}

// Simple Globe icon since it might not be in lucide-react
function Globe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H7m6-4v4m0-11v3m0-11V5a2 2 0 114 0v1a2 2 0 11-4 0z"
      />
    </svg>
  )
}
