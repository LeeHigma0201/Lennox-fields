import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ---------------------------------------------------------------------------
// Configuration (Vercel env)
// ---------------------------------------------------------------------------
// RESEND_API_KEY      — required. Get from resend.com dashboard.
// CONTACT_TO_EMAIL    — optional override. Defaults to lennoxfields@gmail.com.
//                       Switch to a HIPAA-covered mailbox once the BAA is signed.
// CONTACT_FROM_EMAIL  — optional. Must be a verified domain/address in Resend.
//                       Defaults to Resend's free test sender (onboarding@resend.dev).
// ---------------------------------------------------------------------------

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || 'lennoxfields@gmail.com'
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL || 'Lennox Fields <onboarding@resend.dev>'

function buildNotificationHtml(data: {
  name: string
  email: string
  phone: string
  service: string
  message: string
  timestamp: string
}) {
  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#75856f;color:white;padding:20px;border-radius:8px 8px 0 0;">
    <h2 style="margin:0;">New Contact Form Submission</h2>
    <p style="margin:4px 0 0;opacity:.9;">lennoxfields.com</p>
  </div>
  <div style="background:#faf9f7;padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;font-weight:bold;width:100px;">Name:</td><td style="padding:8px 0;">${data.name}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Email:</td><td style="padding:8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Phone:</td><td style="padding:8px 0;">${data.phone || 'Not provided'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;">Service:</td><td style="padding:8px 0;">${data.service || 'Not specified'}</td></tr>
    </table>
    <div style="margin-top:16px;padding:16px;background:white;border-radius:6px;border:1px solid #e5e5e5;">
      <p style="font-weight:bold;margin:0 0 8px;">Reason for contact:</p>
      <p style="margin:0;white-space:pre-wrap;">${data.message}</p>
    </div>
    <p style="margin-top:16px;font-size:12px;color:#888;">Submitted: ${data.timestamp}</p>
  </div>
</div>
`.trim()
}

function buildConfirmationHtml(name: string) {
  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#75856f;color:white;padding:20px;border-radius:8px 8px 0 0;">
    <h2 style="margin:0;">Message Received</h2>
    <p style="margin:4px 0 0;opacity:.9;">Lennox Fields Clinical Mental Health Services</p>
  </div>
  <div style="background:#faf9f7;padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
    <p>Hi ${name},</p>
    <p>Thank you for reaching out. Tamara will respond within two business days.</p>
    <p>For anything sensitive or clinical, please share it by phone or during your consultation — the contact form is not a secure channel for protected health information.</p>
    <p>If you need immediate support:</p>
    <ul>
      <li><strong>Call 911</strong> or go to the nearest emergency room</li>
      <li><strong>Call 988</strong> &mdash; Suicide &amp; Crisis Lifeline</li>
      <li><strong>Text &ldquo;HELLO&rdquo; to 741741</strong> &mdash; Crisis Text Line</li>
    </ul>
    <p style="margin-top:24px;">Warm regards,<br/>Tamara Walls, LPCA<br/>Lennox Fields Clinical Mental Health Services</p>
    <p style="font-size:12px;color:#888;margin-top:24px;">
      This message was sent from the contact form at <a href="https://lennoxfields.com">lennoxfields.com</a>.
    </p>
  </div>
</div>
`.trim()
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, phone, service, message } = body as Record<string, string>

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 }
    )
  }

  const sanitize = (str: string) => str.replace(/[<>]/g, '').trim().slice(0, 2000)
  const data = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone || ''),
    service: sanitize(service || ''),
    message: sanitize(message),
    timestamp: new Date().toISOString(),
  }

  // Always log to Vercel function logs as backup
  console.log('=== NEW CONTACT FORM SUBMISSION ===')
  console.log(JSON.stringify(data, null, 2))
  console.log('=== END SUBMISSION ===')

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error(
      'CONTACT FORM ERROR: RESEND_API_KEY is not set. ' +
        'Submission was logged to Vercel logs but NO email was sent. ' +
        'Set RESEND_API_KEY in your Vercel environment variables.'
    )
    return NextResponse.json({ success: true, method: 'logged_only' })
  }

  const resend = new Resend(apiKey)

  let notificationSent = false
  let confirmationSent = false

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: data.email,
      subject: `New Contact Form: ${data.name} — ${data.service || 'General Inquiry'}`,
      html: buildNotificationHtml(data),
      text: [
        'New contact form submission from lennoxfields.com',
        '',
        `Name:    ${data.name}`,
        `Email:   ${data.email}`,
        `Phone:   ${data.phone || 'Not provided'}`,
        `Service: ${data.service || 'Not specified'}`,
        '',
        'Reason for contact:',
        data.message,
        '',
        '---',
        `Submitted: ${data.timestamp}`,
      ].join('\n'),
    })

    if (error) {
      console.error('CONTACT FORM ERROR: Resend notification email failed:', JSON.stringify(error))
    } else {
      notificationSent = true
    }
  } catch (err) {
    console.error('CONTACT FORM ERROR: Resend notification threw an exception:', err)
  }

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: data.email,
      subject: 'Your message to Lennox Fields was received',
      html: buildConfirmationHtml(data.name),
      text: [
        `Hi ${data.name},`,
        '',
        'Thank you for reaching out. Tamara will respond within two business days.',
        '',
        'For anything sensitive or clinical, please share it by phone or during your consultation — the contact form is not a secure channel for protected health information.',
        '',
        'If you need immediate support:',
        '  • Call 911 or go to the nearest emergency room',
        '  • Call 988 — Suicide & Crisis Lifeline',
        '  • Text "HELLO" to 741741 — Crisis Text Line',
        '',
        'Warm regards,',
        'Tamara Walls, LPCA',
        'Lennox Fields Clinical Mental Health Services',
        'https://lennoxfields.com',
      ].join('\n'),
    })

    if (error) {
      console.error('CONTACT FORM WARNING: Resend confirmation email failed:', JSON.stringify(error))
    } else {
      confirmationSent = true
    }
  } catch (err) {
    console.error('CONTACT FORM WARNING: Resend confirmation threw an exception:', err)
  }

  return NextResponse.json({
    success: true,
    method: notificationSent ? 'email' : 'logged_only',
    confirmation: confirmationSent,
  })
}
