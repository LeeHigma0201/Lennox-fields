# Contact Form System Documentation

## Overview

The contact form system is a fully functional, HIPAA-aware contact solution with the following features:

- **Comprehensive Form Fields**: Name, email, phone, service selection, contact preferences, availability, detailed message, and marketing tracking
- **Security**: Rate limiting, spam protection (honeypot), input sanitization, and XSS prevention
- **Validation**: Client-side and server-side validation using react-hook-form and Zod
- **Email Delivery**: Prepared for Resend, SendGrid, or Mailchimp Transactional
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **UX**: Loading states, success/error handling, helpful validation messages
- **HIPAA Compliance**: Privacy notice, PHI warnings, secure handling

## File Structure

```
/app/api/contact/route.ts          # API endpoint with validation & rate limiting
/components/ContactForm.tsx         # Client-side form component
/app/contact/page.tsx              # Contact page with form and additional info
```

## Setup Instructions

### 1. Install Email Service (Choose One)

#### Option A: Resend (Recommended)

```bash
npm install resend
```

Then uncomment the Resend section in `/app/api/contact/route.ts` (line ~309):

```typescript
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
```

Add to `.env`:
```
RESEND_API_KEY=re_your_api_key_here
```

#### Option B: SendGrid

```bash
npm install @sendgrid/mail
```

Uncomment the SendGrid section in `/app/api/contact/route.ts` (line ~327)

Add to `.env`:
```
SENDGRID_API_KEY=SG.your_api_key_here
```

#### Option C: Mailchimp Transactional (Mandrill)

```bash
npm install @mailchimp/mailchimp_transactional
```

Uncomment the Mailchimp section in `/app/api/contact/route.ts` (line ~343)

Add to `.env`:
```
MAILCHIMP_API_KEY=your_api_key_here
```

### 2. Configure Email Settings

Update the email addresses in `/app/api/contact/route.ts`:

```typescript
return {
  to: ['tamara@lennoxfields.org'], // Replace with actual email
  from: 'noreply@lennoxfields.org', // Replace with verified sender
  replyTo: data.email,
  // ...
}
```

**Important**: Your email service must verify the sender domain before sending emails in production.

### 3. Database Integration (Optional)

If you want to store contact inquiries in the database, uncomment the Prisma example in the `storeInquiry` function (line ~379):

First, create a Prisma schema:

```prisma
// prisma/schema.prisma

model ContactInquiry {
  id                String   @id @default(uuid())
  name              String
  email             String
  phone             String?
  serviceInterest   String
  preferredContact  String
  bestTimeToReach   String
  message           String   @db.Text
  hearAboutUs       String?
  status            String   @default("new") // new, contacted, scheduled, closed
  ipAddress         String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([email])
  @@index([status])
  @@index([createdAt])
}
```

Then run:
```bash
npx prisma migrate dev --name add_contact_inquiry
npx prisma generate
```

### 4. Customize Rate Limiting

Default: 3 submissions per hour per IP address

To modify, edit `/app/api/contact/route.ts`:

```typescript
const RATE_LIMIT = {
  maxRequests: 3,      // Change number of requests
  windowMs: 60 * 60 * 1000,  // Change time window (in milliseconds)
}
```

For production, consider using Redis for distributed rate limiting:

```typescript
// Example with Redis
import Redis from 'ioredis'
const redis = new Redis(process.env.REDIS_URL)

async function checkRateLimit(ip: string): Promise<{ allowed: boolean }> {
  const key = `rate-limit:${ip}`
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, 3600) // 1 hour
  }

  return { allowed: count <= 3 }
}
```

### 5. Customize Form Fields

To add/remove/modify fields, edit:

1. **Validation Schema** (`/app/api/contact/route.ts` line ~12):
```typescript
const contactFormSchema = z.object({
  // Add your custom fields here
  customField: z.string().optional(),
})
```

2. **Form Component** (`/components/ContactForm.tsx` line ~10):
```typescript
interface ContactFormData {
  // Add matching field here
  customField?: string
}
```

3. **Email Template** (`/app/api/contact/route.ts` line ~153):
Add your field to the HTML/text email templates.

### 6. Test the Form

#### Development Testing

The form works in development mode without an email service configured. It will log email content to the console instead of sending.

#### Production Testing

1. Set up your email service API key
2. Verify your sender domain
3. Test with a real email address
4. Check spam folder if emails don't arrive
5. Review email service logs for delivery issues

## Features Explained

### HIPAA Compliance

- **Privacy Notice**: Warns users not to include PHI in initial contact
- **Secure Transmission**: All data encrypted in transit (HTTPS)
- **No PHI Storage**: Initial inquiries don't contain protected health information
- **Access Controls**: Rate limiting prevents abuse

### Spam Protection

- **Honeypot Field**: Hidden field catches bots
- **Rate Limiting**: Prevents form spam
- **Input Validation**: Server-side validation prevents malicious input
- **Sanitization**: All text inputs are sanitized

### Accessibility

- **ARIA Labels**: All form fields properly labeled
- **Error Messages**: Associated with fields via `aria-describedby`
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Errors scroll into view
- **Screen Readers**: Descriptive labels and error messages

### User Experience

- **Real-time Validation**: Validates on blur
- **Character Counters**: Shows progress on message field
- **Loading States**: Clear feedback during submission
- **Success State**: Shows next steps after submission
- **Error Recovery**: Retry button and alternative contact methods
- **Helpful Hints**: Context-sensitive help text

## Customization Guide

### Styling

The form uses Tailwind CSS classes matching your brand colors:

- `primary-sage`: Main brand color
- `alert-red`: Error states
- `success-green`: Success states
- `warm-gray`: Secondary text
- `cream`: Background accents

To customize, edit the Tailwind classes in `/components/ContactForm.tsx`.

### Service Dropdown Options

Edit the service options in `/components/ContactForm.tsx` (line ~190):

```typescript
<select id="serviceInterest" {...register('serviceInterest')}>
  <option value="">Select a service...</option>
  <option value="individual-therapy">Individual Therapy</option>
  {/* Add more options */}
</select>
```

And update the validation in `/app/api/contact/route.ts` (line ~30):

```typescript
serviceInterest: z.enum([
  'individual-therapy',
  'couples-therapy',
  // Add matching values
])
```

### Email Templates

Edit the HTML email template in `/app/api/contact/route.ts` (line ~170) to match your branding. The template uses inline CSS for maximum email client compatibility.

### Success Message

Customize the success message and next steps in `/components/ContactForm.tsx` (line ~75).

## Troubleshooting

### Form Not Submitting

1. Check browser console for JavaScript errors
2. Verify API route is accessible: `http://localhost:3000/api/contact`
3. Check Network tab for failed requests
4. Review server logs for errors

### Emails Not Sending

1. Verify email service API key is correct
2. Check sender domain is verified
3. Review email service dashboard for logs
4. Test with a different recipient email
5. Check spam/junk folders

### Rate Limiting Issues

1. Clear rate limit store: Restart development server
2. In production, use Redis to share state across instances
3. Adjust rate limit settings if needed

### Validation Errors

1. Check Zod schema matches form fields
2. Ensure field names are consistent
3. Review validation error messages
4. Test edge cases (empty, too long, special characters)

## Security Best Practices

1. **Always use HTTPS in production**
2. **Verify sender domain** to prevent spoofing
3. **Monitor rate limiting** for abuse patterns
4. **Keep dependencies updated** for security patches
5. **Don't expose internal errors** to users
6. **Sanitize all inputs** before storage/display
7. **Use environment variables** for sensitive data
8. **Implement CAPTCHA** if spam becomes an issue

## Analytics & Tracking

To track form submissions, add analytics events:

```typescript
// In ContactForm.tsx, after successful submission:

// Google Analytics
gtag('event', 'contact_form_submit', {
  service: data.serviceInterest,
  contact_method: data.preferredContact,
})

// Or use your analytics service
analytics.track('Contact Form Submitted', {
  service: data.serviceInterest,
})
```

## Support

For questions or issues:
- Check the code comments in each file
- Review this documentation
- Test in development mode first
- Check email service documentation

## License

This contact form system is part of the Lennox Fields platform.
