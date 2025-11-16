import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 3, // 3 requests
  windowMs: 60 * 60 * 1000, // per hour
}

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),

  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),

  phone: z.string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\(\)\+\.]+$/.test(val),
      'Invalid phone number format'
    ),

  serviceInterest: z.enum([
    'individual-therapy',
    'couples-therapy',
    'career-counseling',
    'clinical-supervision',
    'not-sure',
  ], {
    errorMap: () => ({ message: 'Please select a service' })
  }),

  preferredContact: z.enum(['email', 'phone'], {
    errorMap: () => ({ message: 'Please select a preferred contact method' })
  }),

  bestTimeToReach: z.enum([
    'morning',
    'afternoon',
    'evening',
    'weekends',
    'anytime',
  ], {
    errorMap: () => ({ message: 'Please select a preferred time' })
  }),

  message: z.string()
    .min(50, 'Message must be at least 50 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),

  hearAboutUs: z.string()
    .max(200, 'Response must be less than 200 characters')
    .optional(),

  // Honeypot field for spam protection
  website: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Sanitize string inputs to prevent XSS
function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove inline event handlers
    .trim()
}

// Get client IP address
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return 'unknown'
}

// Check rate limit
function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, resetTime: record.resetTime }
  }

  // Increment count
  record.count++
  rateLimitStore.set(ip, record)

  return { allowed: true }
}

// Clean up old rate limit entries (call periodically)
function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip)
    }
  }
}

// Format phone number
function formatPhoneNumber(phone: string | undefined): string {
  if (!phone) return 'Not provided'
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  // Format as (XXX) XXX-XXXX if 10 digits
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}

// Prepare email content (compatible with Resend, SendGrid, Mailchimp)
interface EmailData {
  to: string[]
  from: string
  replyTo: string
  subject: string
  html: string
  text: string
}

function prepareEmail(data: ContactFormData): EmailData {
  const serviceNames: Record<string, string> = {
    'individual-therapy': 'Individual Therapy',
    'couples-therapy': 'Couples Therapy',
    'career-counseling': 'Career Counseling',
    'clinical-supervision': 'Clinical Supervision',
    'not-sure': 'Not Sure / Need Guidance',
  }

  const timePreferences: Record<string, string> = {
    'morning': 'Morning (9am - 12pm)',
    'afternoon': 'Afternoon (12pm - 5pm)',
    'evening': 'Evening (5pm - 8pm)',
    'weekends': 'Weekends',
    'anytime': 'Anytime',
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #8B9F8B; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Lennox Fields Clinical Mental Health Services</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
        <h2 style="color: #8B9F8B; margin-top: 0;">Contact Information</h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 40%;">Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${sanitizeString(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${data.email}" style="color: #8B9F8B;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Phone:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${formatPhoneNumber(data.phone)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Service Interest:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${serviceNames[data.serviceInterest]}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Preferred Contact:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${data.preferredContact === 'email' ? 'Email' : 'Phone'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Best Time:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${timePreferences[data.bestTimeToReach]}</td>
          </tr>
          ${data.hearAboutUs ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">How They Found Us:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${sanitizeString(data.hearAboutUs)}</td>
          </tr>
          ` : ''}
        </table>

        <h2 style="color: #8B9F8B;">Message</h2>
        <div style="background-color: white; padding: 20px; border-radius: 6px; border: 1px solid #e0e0e0;">
          <p style="white-space: pre-wrap; margin: 0;">${sanitizeString(data.message)}</p>
        </div>

        <div style="margin-top: 30px; padding: 20px; background-color: #FFF8E1; border-left: 4px solid #D4A574; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            <strong>Next Steps:</strong><br>
            1. Review the inquiry and determine appropriateness<br>
            2. Respond within 24 hours via ${data.preferredContact === 'email' ? 'email' : 'phone'}<br>
            3. Schedule free 15-minute consultation if appropriate<br>
            4. Log this inquiry in your CRM/practice management system
          </p>
        </div>

        <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
          Submitted on ${new Date().toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'America/New_York'
          })} EST
        </p>
      </div>
    </body>
    </html>
  `

  const textContent = `
NEW CONTACT FORM SUBMISSION
Lennox Fields Clinical Mental Health Services

CONTACT INFORMATION
--------------------
Name: ${sanitizeString(data.name)}
Email: ${data.email}
Phone: ${formatPhoneNumber(data.phone)}
Service Interest: ${serviceNames[data.serviceInterest]}
Preferred Contact: ${data.preferredContact === 'email' ? 'Email' : 'Phone'}
Best Time to Reach: ${timePreferences[data.bestTimeToReach]}
${data.hearAboutUs ? `How They Found Us: ${sanitizeString(data.hearAboutUs)}\n` : ''}

MESSAGE
-------
${sanitizeString(data.message)}

NEXT STEPS
----------
1. Review the inquiry and determine appropriateness
2. Respond within 24 hours via ${data.preferredContact === 'email' ? 'email' : 'phone'}
3. Schedule free 15-minute consultation if appropriate
4. Log this inquiry in your CRM/practice management system

Submitted on ${new Date().toLocaleString('en-US', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'America/New_York'
})} EST
  `.trim()

  return {
    to: ['tamara@lennoxfields.org'], // Replace with actual email
    from: 'noreply@lennoxfields.org', // Replace with verified sender
    replyTo: data.email,
    subject: `New Contact Form: ${serviceNames[data.serviceInterest]} - ${sanitizeString(data.name)}`,
    html: htmlContent,
    text: textContent,
  }
}

// Send email using your preferred service
async function sendEmail(emailData: EmailData): Promise<boolean> {
  // IMPLEMENTATION NOTE: Uncomment and configure your preferred email service

  /*
  // Option 1: Resend (recommended for simplicity)
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    await resend.emails.send({
      from: emailData.from,
      to: emailData.to,
      replyTo: emailData.replyTo,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    })
    return true
  } catch (error) {
    console.error('Resend error:', error)
    return false
  }
  */

  /*
  // Option 2: SendGrid
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  try {
    await sgMail.send({
      to: emailData.to,
      from: emailData.from,
      replyTo: emailData.replyTo,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    })
    return true
  } catch (error) {
    console.error('SendGrid error:', error)
    return false
  }
  */

  /*
  // Option 3: Mailchimp Transactional (Mandrill)
  const mailchimp = require('@mailchimp/mailchimp_transactional')(process.env.MAILCHIMP_API_KEY)
  try {
    await mailchimp.messages.send({
      message: {
        from_email: emailData.from,
        to: emailData.to.map(email => ({ email })),
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        headers: {
          'Reply-To': emailData.replyTo,
        },
      },
    })
    return true
  } catch (error) {
    console.error('Mailchimp error:', error)
    return false
  }
  */

  // For development: Log email data instead of sending
  console.log('📧 Email would be sent:', {
    to: emailData.to,
    from: emailData.from,
    replyTo: emailData.replyTo,
    subject: emailData.subject,
  })
  console.log('Email content (text):\n', emailData.text)

  // Return true in development mode
  return process.env.NODE_ENV === 'development'
}

// Store inquiry in database (optional)
interface ContactInquiry {
  id?: string
  name: string
  email: string
  phone?: string
  serviceInterest: string
  preferredContact: string
  bestTimeToReach: string
  message: string
  hearAboutUs?: string
  status: 'new' | 'contacted' | 'scheduled' | 'closed'
  createdAt: Date
  ipAddress?: string
}

async function storeInquiry(data: ContactFormData, ip: string): Promise<boolean> {
  // IMPLEMENTATION NOTE: Integrate with your database (Prisma, MongoDB, etc.)

  /*
  // Example with Prisma:
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()

  try {
    await prisma.contactInquiry.create({
      data: {
        name: sanitizeString(data.name),
        email: data.email,
        phone: data.phone,
        serviceInterest: data.serviceInterest,
        preferredContact: data.preferredContact,
        bestTimeToReach: data.bestTimeToReach,
        message: sanitizeString(data.message),
        hearAboutUs: data.hearAboutUs ? sanitizeString(data.hearAboutUs) : null,
        status: 'new',
        ipAddress: ip,
        createdAt: new Date(),
      },
    })
    await prisma.$disconnect()
    return true
  } catch (error) {
    console.error('Database error:', error)
    await prisma.$disconnect()
    return false
  }
  */

  // For development: Log inquiry data
  console.log('💾 Inquiry would be stored:', {
    name: sanitizeString(data.name),
    email: data.email,
    serviceInterest: data.serviceInterest,
    status: 'new',
    createdAt: new Date().toISOString(),
  })

  return true
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    // Cleanup old rate limit entries
    cleanupRateLimitStore()

    // Get client IP
    const clientIp = getClientIp(request)

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp)
    if (!rateLimit.allowed) {
      const resetTime = rateLimit.resetTime || Date.now()
      const minutesUntilReset = Math.ceil((resetTime - Date.now()) / 60000)

      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests',
          message: `You've reached the maximum number of contact form submissions. Please try again in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? 's' : ''}.`,
          retryAfter: resetTime,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(RATE_LIMIT.maxRequests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(resetTime),
          },
        }
      )
    }

    // Parse request body
    const body = await request.json()

    // Check honeypot (spam protection)
    if (body.website) {
      // Likely a bot - return success to avoid revealing honeypot
      console.log('🤖 Honeypot triggered from IP:', clientIp)
      return NextResponse.json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
      })
    }

    // Validate data with Zod
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }))

      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: 'Please check your form and try again.',
          errors,
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Prepare email
    const emailData = prepareEmail(validatedData)

    // Send email
    const emailSent = await sendEmail(emailData)

    if (!emailSent) {
      console.error('Failed to send email for:', validatedData.email)
      // Don't expose internal errors to client
      return NextResponse.json(
        {
          success: false,
          error: 'Service unavailable',
          message: 'We\'re experiencing technical difficulties. Please try again later or call us directly at (919) 999-9999.',
        },
        { status: 503 }
      )
    }

    // Store inquiry in database (optional)
    await storeInquiry(validatedData, clientIp)

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! I will respond within 24 hours.',
      data: {
        name: validatedData.name,
        preferredContact: validatedData.preferredContact,
      },
    })

  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later or call us directly at (919) 999-9999.',
      },
      { status: 500 }
    )
  }
}

// OPTIONS handler for CORS (if needed)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
