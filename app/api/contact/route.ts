import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitize = (str: string) => str.replace(/[<>]/g, '').trim().slice(0, 2000)
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone || ''),
      service: sanitize(service || ''),
      message: sanitize(message),
      timestamp: new Date().toISOString(),
    }

    // Try to send email via SMTP if configured
    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS
    const emailTo = process.env.ADMIN_EMAIL || process.env.SMTP_FROM_EMAIL || 'tamara@lennoxfields.org'

    if (smtpHost && smtpUser && smtpPass) {
      // Use nodemailer if SMTP is configured
      try {
        const nodemailer = require('nodemailer')
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_PORT === '465',
          auth: { user: smtpUser, pass: smtpPass },
        })

        await transporter.sendMail({
          from: `"Lennox Fields Website" <${smtpUser}>`,
          to: emailTo,
          replyTo: sanitizedData.email,
          subject: `New Contact Form: ${sanitizedData.name} - ${sanitizedData.service || 'General Inquiry'}`,
          text: `
New contact form submission from lennoxfields.org

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'Not provided'}
Service: ${sanitizedData.service || 'Not specified'}

Message:
${sanitizedData.message}

---
Submitted: ${sanitizedData.timestamp}
          `.trim(),
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #75856f; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h2 style="margin: 0;">New Contact Form Submission</h2>
    <p style="margin: 4px 0 0; opacity: 0.9;">lennoxfields.org</p>
  </div>
  <div style="background: #faf9f7; padding: 24px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td><td style="padding: 8px 0;">${sanitizedData.name}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${sanitizedData.phone || 'Not provided'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td style="padding: 8px 0;">${sanitizedData.service || 'Not specified'}</td></tr>
    </table>
    <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 6px; border: 1px solid #e5e5e5;">
      <p style="font-weight: bold; margin: 0 0 8px;">Message:</p>
      <p style="margin: 0; white-space: pre-wrap;">${sanitizedData.message}</p>
    </div>
    <p style="margin-top: 16px; font-size: 12px; color: #888;">Submitted: ${sanitizedData.timestamp}</p>
  </div>
</div>
          `.trim(),
        })

        return NextResponse.json({ success: true, method: 'email' })
      } catch (emailError) {
        console.error('Email send failed:', emailError)
        // Fall through to fallback
      }
    }

    // Fallback: Log the submission (Vercel will capture this in function logs)
    console.log('=== NEW CONTACT FORM SUBMISSION ===')
    console.log(JSON.stringify(sanitizedData, null, 2))
    console.log('=== END SUBMISSION ===')

    // Also try to send a notification via the Vercel log drain or any configured webhook
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `New contact from ${sanitizedData.name} (${sanitizedData.email}): ${sanitizedData.service || 'General'} - ${sanitizedData.message.slice(0, 200)}`,
            ...sanitizedData,
          }),
        })
      } catch {
        // Webhook failure is non-critical
      }
    }

    return NextResponse.json({ success: true, method: 'logged' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly.' },
      { status: 500 }
    )
  }
}
