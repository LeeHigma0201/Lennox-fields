'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react'

// Form data type
interface ContactFormData {
  name: string
  email: string
  phone?: string
  serviceInterest: string
  preferredContact: string
  bestTimeToReach: string
  message: string
  hearAboutUs?: string
  website?: string // Honeypot field
}

// Form state type
type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successName, setSuccessName] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    mode: 'onBlur',
  })

  const preferredContact = watch('preferredContact')

  const onSubmit = async (data: ContactFormData) => {
    setFormState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      setSuccessName(data.name)
      setFormState('success')
      reset()

      // Scroll to success message
      setTimeout(() => {
        document.getElementById('form-success')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 100)

    } catch (error) {
      setFormState('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again or call us directly.'
      )

      // Scroll to error message
      setTimeout(() => {
        document.getElementById('form-error')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 100)
    }
  }

  const handleRetry = () => {
    setFormState('idle')
    setErrorMessage('')
  }

  // Success state
  if (formState === 'success') {
    return (
      <div
        id="form-success"
        className="bg-success-green/10 border-2 border-success-green rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-success-green mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text-dark mb-4">
          Thank You, {successName}!
        </h3>
        <p className="text-warm-gray mb-6 text-lg">
          I've received your message and will respond within 24 hours.
        </p>

        <div className="bg-white rounded-lg p-6 mb-6 text-left">
          <h4 className="font-bold text-text-dark mb-3">What Happens Next?</h4>
          <ul className="space-y-2 text-text-dark">
            <li className="flex items-start">
              <span className="text-primary-sage mr-2">1.</span>
              <span>I'll review your inquiry to ensure I'm the right fit for your needs</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-sage mr-2">2.</span>
              <span>I'll reach out within 24 hours to schedule your free 15-minute consultation</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-sage mr-2">3.</span>
              <span>During the consultation, we'll discuss your goals and how I can help</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-sage mr-2">4.</span>
              <span>If we're a good fit, we'll schedule your first full session</span>
            </li>
          </ul>
        </div>

        <div className="bg-cream rounded-lg p-4 mb-6">
          <p className="text-sm text-warm-gray">
            <strong className="text-text-dark">In a crisis?</strong> This form is not monitored 24/7.
            If you're experiencing a mental health emergency, please call 988 (Suicide & Crisis Lifeline)
            or go to your nearest emergency room.
          </p>
        </div>

        <button
          onClick={() => {
            setFormState('idle')
            setSuccessName('')
          }}
          className="btn btn-primary"
        >
          Submit Another Inquiry
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* HIPAA Notice */}
      <div className="bg-warning-amber/10 border-l-4 border-warning-amber rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-warning-amber flex-shrink-0 mt-1 mr-3" />
          <div>
            <h3 className="font-bold text-text-dark mb-2">
              Privacy Notice - Please Read
            </h3>
            <p className="text-sm text-warm-gray">
              This form is for general inquiries and scheduling only. <strong>Do not include
              protected health information (PHI)</strong> such as specific symptoms, diagnoses,
              medications, or detailed personal health information. We'll discuss those details
              during your secure consultation.
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {formState === 'error' && (
        <div
          id="form-error"
          className="bg-alert-red/10 border-2 border-alert-red rounded-xl p-6 mb-8"
        >
          <div className="flex items-start mb-4">
            <AlertCircle className="w-6 h-6 text-alert-red flex-shrink-0 mr-3 mt-1" />
            <div>
              <h3 className="font-bold text-text-dark mb-2">Submission Failed</h3>
              <p className="text-warm-gray">{errorMessage}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleRetry} className="btn btn-primary">
              Try Again
            </button>
            <a href="tel:+19199999999" className="btn bg-white border-2 border-primary-sage text-primary-sage hover:bg-primary-sage hover:text-white">
              Call Instead
            </a>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users, visible to bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            {...register('website')}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-text-dark font-medium mb-2"
          >
            Full Name <span className="text-alert-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
              maxLength: {
                value: 100,
                message: 'Name must be less than 100 characters',
              },
              pattern: {
                value: /^[a-zA-Z\s'-]+$/,
                message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
              },
            })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.name
                ? 'border-alert-red focus:border-alert-red'
                : 'border-warm-gray/30 focus:border-primary-sage'
            } focus:outline-none focus:ring-2 focus:ring-primary-sage/20`}
            placeholder="Jane Smith"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={formState === 'submitting'}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-alert-red flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-text-dark font-medium mb-2"
          >
            Email Address <span className="text-alert-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
              maxLength: {
                value: 255,
                message: 'Email must be less than 255 characters',
              },
            })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.email
                ? 'border-alert-red focus:border-alert-red'
                : 'border-warm-gray/30 focus:border-primary-sage'
            } focus:outline-none focus:ring-2 focus:ring-primary-sage/20`}
            placeholder="jane.smith@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={formState === 'submitting'}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-alert-red flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-text-dark font-medium mb-2"
          >
            Phone Number <span className="text-warm-gray text-sm font-normal">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              pattern: {
                value: /^[\d\s\-\(\)\+\.]+$/,
                message: 'Please enter a valid phone number',
              },
            })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.phone
                ? 'border-alert-red focus:border-alert-red'
                : 'border-warm-gray/30 focus:border-primary-sage'
            } focus:outline-none focus:ring-2 focus:ring-primary-sage/20`}
            placeholder="(919) 555-1234"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            disabled={formState === 'submitting'}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-alert-red flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Service Interest */}
        <div>
          <label
            htmlFor="serviceInterest"
            className="block text-text-dark font-medium mb-2"
          >
            What service are you interested in? <span className="text-alert-red">*</span>
          </label>
          <select
            id="serviceInterest"
            {...register('serviceInterest', {
              required: 'Please select a service',
            })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.serviceInterest
                ? 'border-alert-red focus:border-alert-red'
                : 'border-warm-gray/30 focus:border-primary-sage'
            } focus:outline-none focus:ring-2 focus:ring-primary-sage/20`}
            aria-invalid={errors.serviceInterest ? 'true' : 'false'}
            aria-describedby={errors.serviceInterest ? 'serviceInterest-error' : undefined}
            disabled={formState === 'submitting'}
          >
            <option value="">Select a service...</option>
            <option value="individual-therapy">Individual Therapy</option>
            <option value="couples-therapy">Couples Therapy</option>
            <option value="career-counseling">Career Counseling</option>
            <option value="clinical-supervision">Clinical Supervision</option>
            <option value="not-sure">Not Sure / Need Guidance</option>
          </select>
          {errors.serviceInterest && (
            <p id="serviceInterest-error" className="mt-1 text-sm text-alert-red flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.serviceInterest.message}
            </p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-text-dark font-medium mb-3">
            Preferred Contact Method <span className="text-alert-red">*</span>
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                value="email"
                {...register('preferredContact', {
                  required: 'Please select a preferred contact method',
                })}
                className="w-5 h-5 text-primary-sage border-warm-gray/30 focus:ring-primary-sage focus:ring-2"
                disabled={formState === 'submitting'}
              />
              <span className="text-text-dark group-hover:text-primary-sage transition-colors">
                Email
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                value="phone"
                {...register('preferredContact', {
                  required: 'Please select a preferred contact method',
                })}
                className="w-5 h-5 text-primary-sage border-warm-gray/30 focus:ring-primary-sage focus:ring-2"
                disabled={formState === 'submitting'}
              />
              <span className="text-text-dark group-hover:text-primary-sage transition-colors">
                Phone
              </span>
            </label>
          </div>
          {errors.preferredContact && (
            <p className="mt-2 text-sm text-alert-red flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.preferredContact.message}
            </p>
          )}
          {preferredContact === 'phone' && !watch('phone') && (
            <p className="mt-2 text-sm text-warning-amber flex items-start">
              <AlertCircle className="w-4 h-4 mr-1 mt-0.5" />
              <span>Please provide your phone number above if you prefer to be contacted by phone.</span>
            </p>
          )}
        </div>

        {/* Best Time to Reach */}
        <div>
          <label
            htmlFor="bestTimeToReach"
            className="block text-text-dark font-medium mb-2"
          >
            Best Time to Reach You <span className="text-alert-red">*</span>
          </label>
          <select
            id="bestTimeToReach"
            {...register('bestTimeToReach', {
              required: 'Please select a preferred time',
            })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.bestTimeToReach
                ? 'border-alert-red focus:border-alert-red'
                : 'border-warm-gray/30 focus:border-primary-sage'
            } focus:outline-none focus:ring-2 focus:ring-primary-sage/20`}
            aria-invalid={errors.bestTimeToReach ? 'true' : 'false'}
            aria-describedby={errors.bestTimeToReach ? 'bestTimeToReach-error' : undefined}
            disabled={formState === 'submitting'}
          >
            <option value="">Select a time...</option>
            <option value="morning">Morning (9am - 12pm)</option>
            <option value="afternoon">Afternoon (12pm - 5pm)</option>
            <option value="evening">Evening (5pm - 8pm)</option>
            <option value="weekends">Weekends</option>
            <option value="anytime">Anytime</option>
          </select>
          {errors.bestTimeToReach && (
            <p id="bestTimeToReach-error" className="mt-1 text-sm text-alert-red flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.bestTimeToReach.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-text-dark font-medium mb-2"
          >
            Tell Me About Your Needs <span className="text-alert-red">*</span>
          </label>
          <p className="text-sm text-warm-gray mb-2">
            Share what brings you to therapy and what you hope to achieve. Remember: do not include
            specific health information (PHI) - we'll discuss details during your consultation.
          </p>
          <textarea
            id="message"
            {...register('message', {
              required: 'Please tell me about your needs',
              minLength: {
                value: 50,
                message: 'Please provide at least 50 characters to help me understand your needs',
              },
              maxLength: {
                value: 2000,
                message: 'Message must be less than 2000 characters',
              },
            })}
            rows={6}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors resize-y ${
              errors.message
                ? 'border-alert-red focus:border-alert-red'
                : 'border-warm-gray/30 focus:border-primary-sage'
            } focus:outline-none focus:ring-2 focus:ring-primary-sage/20`}
            placeholder="Example: I'm looking for support with work-related stress and finding better work-life balance. I'd like to develop coping strategies and explore career transitions..."
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error message-help' : 'message-help'}
            disabled={formState === 'submitting'}
          />
          <div className="flex justify-between items-start mt-1">
            <div className="flex-1">
              {errors.message && (
                <p id="message-error" className="text-sm text-alert-red flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.message.message}
                </p>
              )}
            </div>
            <p
              id="message-help"
              className={`text-sm ml-2 ${
                watch('message')?.length < 50
                  ? 'text-warning-amber'
                  : 'text-warm-gray'
              }`}
            >
              {watch('message')?.length || 0} / 2000
            </p>
          </div>
        </div>

        {/* How Did You Hear About Us */}
        <div>
          <label
            htmlFor="hearAboutUs"
            className="block text-text-dark font-medium mb-2"
          >
            How did you hear about us? <span className="text-warm-gray text-sm font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            id="hearAboutUs"
            {...register('hearAboutUs', {
              maxLength: {
                value: 200,
                message: 'Response must be less than 200 characters',
              },
            })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
              errors.hearAboutUs
                ? 'border-alert-red focus:border-alert-red'
                : 'border-warm-gray/30 focus:border-primary-sage'
            } focus:outline-none focus:ring-2 focus:ring-primary-sage/20`}
            placeholder="Google search, referral, social media, etc."
            aria-invalid={errors.hearAboutUs ? 'true' : 'false'}
            aria-describedby={errors.hearAboutUs ? 'hearAboutUs-error' : undefined}
            disabled={formState === 'submitting'}
          />
          {errors.hearAboutUs && (
            <p id="hearAboutUs-error" className="mt-1 text-sm text-alert-red flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.hearAboutUs.message}
            </p>
          )}
          <p className="text-xs text-warm-gray mt-1">
            This helps me understand which outreach methods are most effective.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={formState === 'submitting'}
            className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-busy={formState === 'submitting'}
          >
            {formState === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </button>

          <p className="text-center text-xs text-warm-gray mt-4">
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="text-primary-sage hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-primary-sage hover:underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  )
}
