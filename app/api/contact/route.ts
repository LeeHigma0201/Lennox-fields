import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
// RESEND_API_KEY  — required. Get from resend.com dashboard. Add to Vercel env.
// CONTACT_TO_EMAIL — optional override. Defaults to tamara@lennoxfields.com.
// CONTACT_FROM_EMAIL — optional. The "From" address shown in email clients.
//   Must be a verified domain/address in your Resend account.
//   Defaults to: onboarding@resend.dev (Resend's free test sender).
// ---------------------------------------------------------------------------

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || 'tamara@lennoxfields.com'
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL || 'Lennox Fields <onboarding@resend.dev>'

// ---------------------------------------------------------------------------
// Helper: build notification email (to Tamara)
// ---------------------------------------------------------------------------
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
      <p style="font-weight:bold;margin:0 0 8px;">Message:</p>
      <p style="margin:0;white-space:pre-wrap;">${data.message}</p>
    </div>
    <p style="margin-top:16px;font-size:12px;color:#888;">Submitted: ${data.timestamp}</p>
  </div>
</div>
`.trim()
}

// ---------------------------------------------------------------------------
// Helper: build confirmation email (to submitter)
// ---------------------------------------------------------------------------
function buildConfirmationHtml(name: string) {
  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#75856f;color:white;padding:20px;border-radius:8px 8px 0 0;">
    <h2 style="margin:0;">Message Received</h2>
    <p style="margin:4px 0 0;opacity:.9;">Lennox Fields Clinical Mental Health Services</p>
  </div>
  <div style="background:#faf9f7;padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
    <p>Hi ${name},</p>
    <p>Thank you for reaching out. I received your message and will get back to you within two business days.</p>
    <p>In the meantime, if you need immediate support:</p>
    <ul>
      <li><strong>Call 911</strong> or go to the nearest emergency room</li>
      <li><strong>Call 988</strong> — Suicide &amp; Crisis Lifeline</li>
      <li><strong>Text HOME to 741741</strong> — Crisis Text Line</li>
    </ul>
    <p style="margin-top:24px;">Warm regards,<br/>Tamara Walls, LPCA<br/>Lennox Fields Clinical Mental Health Services</p>
    <p style="font-size:12px;color:#888;margin-top:24px;">
      This message was sent from the contact form at <a href="https://lennoxfields.com">lennoxfields.com</a>.
    </p>
  </div>
</div>
`.trim()
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // ── 1. Parse body ────────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, phone, service, message } = body as Record<string, string>

  // ── 2. Validate required fields ──────────────────────────────────────────
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

  // ── 3. Sanitize ──────────────────────────────────────────────────────────
  const sanitize = (str: string) => str.replace(/[<>]/g, '').trim().slice(0, 2000)
  const data = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone || ''),
    service: sanitize(service || ''),
    message: sanitize(message),
    timestamp: new Date().toISOString(),
  }

  // ── 4. Always log to Vercel logs (backup, never removed) ─────────────────
  console.log('=== NEW CONTACT FORM SUBMISSION ===')
  console.log(JSON.stringify(data, null, 2))
  console.log('=== END SUBMISSION ===')

  // ── 5. Send via Resend ───────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    // RESEND_API_KEY not set — submission was logged above, but email will not
    // be delivered. This is a configuration error, not a silent drop.
    console.error(
      'CONTACT FORM ERROR: RESEND_API_KEY is not set. ' +
        'Submission was logged to Vercel logs but NO email was sent. ' +
        'Set RESEND_API_KEY in your Vercel environment variables.'
    )
    // Still return success to the user (the log is the backup), but we've
    // emitted a loud error so Vercel log alerts will catch it.
    return NextResponse.json({ success: true, method: 'logged_only' })
  }

  const resend = new Resend(apiKey)

  let notificationSent = false
  let confirmationSent = false

  // 5a. Notification to Tamara
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
        'Message:',
        data.message,
        '',
        `---`,
        `Submitted: ${data.timestamp}`,
      ].join('\n'),
    })

    if (error) {
      // Resend returned an API error — log loudly, never silently swallow
      console.error('CONTACT FORM ERROR: Resend notification email failed:', JSON.stringify(error))
    } else {
      notificationSent = true
    }
  } catch (err) {
    console.error('CONTACT FORM ERROR: Resend notification threw an exception:', err)
  }

  // 5b. Confirmation to submitter (best-effort; non-fatal if it fails)
  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: data.email,
      subject: 'Your message to Lennox Fields was received',
      html: buildConfirmationHtml(data.name),
      text: [
        `Hi ${data.name},`,
        '',
        'Thank you for reaching out to Lennox Fields. I received your message and will get back to you within two business days.',
        '',
        'If you need immediate support:',
        '  • Call 911 or go to the nearest emergency room',
        '  • Call 988 — Suicide & Crisis Lifeline',
        '  • Text HOME to 741741 — Crisis Text Line',
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

  // ── 6. Response ──────────────────────────────────────────────────────────
  // If the notification to Tamara failed, we still return success because
  // the submission was logged. However, the loud console.error above ensures
  // Vercel log alerts (if configured) will fire.
  return NextResponse.json({
    success: true,
    method: notificationSent ? 'email' : 'logged_only',
    confirmation: confirmationSent,
  })
}
