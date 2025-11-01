# Lennox Fields Clinical Mental Health Services - Deployment Guide

## Overview

This comprehensive guide will walk you through deploying your Lennox Fields platform, from business setup to technical configuration.

## Part 1: Business Infrastructure Setup

### 1.1 Domain Registration

**Register: lennoxfields.org**

Recommended registrars:
- Namecheap
- Google Domains
- GoDaddy

**Estimated Cost:** $12-15/year

### 1.2 Professional Email Setup

**Option A: Google Workspace (Recommended for HIPAA)**
- Cost: $6-12/user/month
- Provides: HIPAA-compliant email, calendar, drive
- Setup: workspace.google.com
- Configure BAA (Business Associate Agreement) for HIPAA compliance

**Option B: Microsoft 365**
- Cost: $5-12.50/user/month
- Provides: HIPAA-compliant email, office apps, teams
- Configure BAA for HIPAA compliance

**Required Email Addresses:**
```
tamara@lennoxfields.org (your main email)
intake@lennoxfields.org (client inquiries)
billing@lennoxfields.org (payment questions)
support@lennoxfields.org (technical support)
resources@lennoxfields.org (resource requests)
```

### 1.3 LLC Formation & Insurance

**LLC Registration:**
- File in your primary practice state (North Carolina or Indiana)
- Registered agent required
- Annual filing fees: ~$200-300

**Required Insurance:**
- Professional Liability Insurance (malpractice)
- General Liability Insurance
- Cyber Liability Insurance (HIPAA compliance)
- Business Owner's Policy (BOP)

**Recommended Providers:**
- HPSO (Healthcare Providers Service Organization)
- The Hartford
- CPH & Associates

**Estimated Cost:** $800-2,000/year

### 1.4 Licensure Updates

**North Carolina LPCA:**
- Update practice information with NC LPC Board
- Ensure telehealth riders are current
- Update supervision arrangements if needed

**Indiana Reciprocity Application:**
- Apply for Indiana licensure if not already completed
- Submit reciprocity application to Indiana Board
- Processing time: 4-8 weeks
- Cost: ~$100-200

## Part 2: Payment Processing Setup

### 2.1 Stripe Account Configuration

1. **Create Stripe Account:**
   - Visit: stripe.com
   - Choose business account
   - Verify identity and business details

2. **Configure Products:**
   - Individual Therapy: $150
   - Couples Therapy: $200
   - Family Therapy: $200
   - Teen/Adolescent Therapy: $150
   - Career Counseling: $125
   - Clinical Supervision: $75

3. **Set Up Subscriptions:**
   - Monthly Therapy Package: $500 (4 sessions)
   - Supervision Package: $250

4. **Enable Payment Methods:**
   - Credit/Debit cards
   - ACH bank transfers
   - Apple Pay / Google Pay

5. **Tax Configuration:**
   - Set up tax collection for your states
   - Configure 1099 reporting

**Stripe Fees:** 2.9% + $0.30 per transaction

### 2.2 HSA/FSA Compatibility

Stripe automatically supports HSA/FSA cards. No additional setup required.

### 2.3 Superbill Generation

Configure automated superbill generation for out-of-network insurance reimbursement.

Include:
- CPT codes (90834, 90837, 90847, etc.)
- Diagnosis codes (ICD-10)
- Provider NPI number
- Client information
- Session details

## Part 3: EMR System Decision

### Option A: CarePatron Integration (Recommended)

**Pros:**
- HIPAA compliant out-of-the-box
- Built-in scheduling, billing, documentation
- Client portal included
- No custom development needed
- Regular updates and support

**Cons:**
- Monthly subscription cost ($29-99/month)
- Less customization

**Setup Steps:**
1. Sign up at carepatron.com
2. Configure practice settings
3. Import client data (if migrating)
4. Set up appointment types
5. Configure note templates
6. Enable client portal
7. Integrate with Stripe for billing

### Option B: Custom EMR System

**Pros:**
- Full customization
- No monthly fees (except hosting)
- Complete data ownership
- Tailored to your exact workflow

**Cons:**
- Requires development time
- Ongoing maintenance responsibility
- Must ensure HIPAA compliance yourself
- Potential audit liability

**If choosing custom EMR, you'll need:**
- HIPAA-compliant hosting (AWS HIPAA, Azure HIPAA, or Aptible)
- Business Associate Agreements (BAAs) with all vendors
- Regular security audits
- Backup and disaster recovery plans
- Encryption at rest and in transit
- Access logging and monitoring

**Recommendation:** Start with CarePatron for the first year while building your practice. Transition to custom EMR if you have specific needs that CarePatron can't meet.

## Part 4: Technical Deployment

### 4.1 Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Git installed
- Vercel account (or alternative hosting)

### 4.2 Database Setup

**Option A: Vercel Postgres (Easiest)**
```bash
# From Vercel dashboard
# Create new Postgres database
# Copy connection string
```

**Option B: Supabase (Generous free tier)**
```bash
# Create account at supabase.com
# Create new project
# Copy connection string from settings
```

**Option C: Neon (Serverless Postgres)**
```bash
# Create account at neon.tech
# Create new project
# Copy connection string
```

### 4.3 Environment Variables

Create `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://lennoxfields.org"
NEXTAUTH_SECRET="[generate with: openssl rand -base64 32]"

# Encryption Keys (HIPAA Compliance)
MASTER_ENCRYPTION_KEY="[generate with: openssl rand -base64 32]"
PHI_ENCRYPTION_KEY="[generate with: openssl rand -base64 32]"

# Stripe
STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Google Workspace SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tamara@lennoxfields.org"
SMTP_PASSWORD="[app-specific password]"
EMAIL_FROM="tamara@lennoxfields.org"

# Optional: CarePatron
CAREPATRON_API_KEY="..."
CAREPATRON_ORGANIZATION_ID="..."

# Application
NODE_ENV="production"
SESSION_TIMEOUT=900000
ENABLE_HIPAA_LOGGING=true
```

### 4.4 Install Dependencies

```bash
npm install
```

### 4.5 Initialize Database

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4.6 Build Application

```bash
npm run build
```

### 4.7 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Configure in Vercel Dashboard:**
1. Add all environment variables
2. Configure custom domain: lennoxfields.org
3. Enable automatic deployments from main branch
4. Set up preview deployments for testing

### 4.8 DNS Configuration

**Add these DNS records at your domain registrar:**

```
Type    Name    Value
A       @       76.76.21.21 (Vercel IP - check their docs)
CNAME   www     cname.vercel-dns.com
MX      @       [Google Workspace MX records]
TXT     @       [Google Workspace verification]
TXT     @       v=spf1 include:_spf.google.com ~all
```

## Part 5: HIPAA Compliance Checklist

### 5.1 Technical Safeguards

- ✅ All PHI encrypted at rest (AES-256)
- ✅ All PHI encrypted in transit (TLS 1.2+)
- ✅ Automatic session timeout (15 minutes)
- ✅ Audit logging for all PHI access
- ✅ Secure password requirements
- ✅ Two-factor authentication available

### 5.2 Administrative Safeguards

- [ ] HIPAA Security Risk Assessment completed
- [ ] HIPAA policies and procedures documented
- [ ] Business Associate Agreements signed with:
  - [ ] Hosting provider (Vercel)
  - [ ] Database provider
  - [ ] Email provider (Google Workspace)
  - [ ] Payment processor (Stripe)
  - [ ] Any other vendors handling PHI
- [ ] Staff training on HIPAA (if hiring staff)
- [ ] Incident response plan documented
- [ ] Breach notification procedures established

### 5.3 Physical Safeguards

- [ ] Workstation security (password-protected, encrypted)
- [ ] Secure disposal of PHI (shredding, wiping)
- [ ] Device encryption enabled
- [ ] Automatic screen lock configured

### 5.4 Ongoing Compliance

- Annual HIPAA security risk assessment
- Regular security updates and patches
- Quarterly backup verification
- Annual policy review and updates
- Staff training (annually)

## Part 6: Marketing & SEO Setup

### 6.1 Google My Business

1. Create/claim listing
2. Add practice information
3. Upload professional photos
4. Collect client reviews (with permission)

### 6.2 Psychology Today Profile

1. Create therapist profile
2. Add photo, credentials, specialties
3. Link to lennoxfields.org
4. Enable client messaging

### 6.3 Professional Networks

- LinkedIn profile
- LPCA directories (NC and IN)
- Local mental health directories
- Insurance provider networks

### 6.4 SEO Optimization

**Already included in the website:**
- Semantic HTML
- Meta descriptions
- Structured data
- Mobile responsiveness
- Fast loading times
- Accessibility features

**Additional steps:**
1. Submit sitemap to Google Search Console
2. Create and submit to Bing Webmaster Tools
3. Regular blog posts about mental health topics
4. Local SEO optimization

## Part 7: Launch Checklist

### Pre-Launch (1-2 Weeks Before)

- [ ] All environment variables configured
- [ ] Database migrated and tested
- [ ] Stripe test transactions successful
- [ ] Email sending verified
- [ ] Client portal login tested
- [ ] Screening tools tested with sample data
- [ ] All forms HIPAA-compliant and functional
- [ ] Privacy policy reviewed by attorney
- [ ] Terms of service finalized
- [ ] HIPAA notice posted
- [ ] Professional photos uploaded
- [ ] About page personalized
- [ ] All service pages reviewed
- [ ] Book information added
- [ ] Contact forms tested

### Launch Day

- [ ] Final backup of any existing data
- [ ] Deploy to production
- [ ] Verify DNS propagation
- [ ] Test all critical user flows
- [ ] Monitor error logs
- [ ] Send announcement email to existing clients
- [ ] Post on social media
- [ ] Update all directory listings

### Post-Launch (First Week)

- [ ] Monitor analytics daily
- [ ] Respond to all inquiries within 24 hours
- [ ] Address any technical issues immediately
- [ ] Collect user feedback
- [ ] Make minor adjustments as needed

## Part 8: Ongoing Maintenance

### Daily

- Check email and contact form submissions
- Monitor error logs
- Respond to client portal messages

### Weekly

- Review analytics
- Backup database
- Check for security updates

### Monthly

- Update blog/resources
- Review and respond to reviews
- Financial reconciliation
- Update services/pricing if needed

### Quarterly

- HIPAA compliance review
- Security audit
- Website content updates
- Marketing strategy review

### Annually

- Renew domain
- Renew SSL certificates (usually automatic)
- HIPAA Security Risk Assessment
- Insurance policy review
- License renewal
- Platform feature additions

## Part 9: Cost Summary

### One-Time Costs

- LLC Formation: $200-300
- Initial Legal Review: $500-1,500
- Website Development: $0 (DIY) or $5,000-15,000 (professional)

### Recurring Monthly Costs

- Domain: $1-2/month
- Email (Google Workspace): $6-12/month
- Hosting (Vercel Pro): $20/month or $0 (free tier to start)
- Database: $0-25/month
- EMR (CarePatron): $29-99/month (optional)
- Professional Insurance: $65-170/month
- **Total: $121-330/month**

### Transaction Costs

- Stripe fees: 2.9% + $0.30 per transaction
- Example: $150 session = $4.65 fee

## Support & Resources

### Technical Support

- Vercel Support: vercel.com/support
- Next.js Documentation: nextjs.org/docs
- Prisma Documentation: prisma.io/docs

### HIPAA Compliance

- HHS HIPAA Resources: hhs.gov/hipaa
- HIPAA Journal: hipaajournal.com
- Compliance consultants available

### Mental Health Practice

- NBCC Resources: nbcc.org
- ACA Resources: counseling.org
- State licensing boards

## Questions?

For technical questions about this platform, review the README.md and inline code comments. For business setup questions, consider consulting with:

- Healthcare attorney (HIPAA compliance)
- CPA (business structure, taxes)
- Insurance agent (professional coverage)
- Practice consultant (workflow optimization)

---

**Remember:** You don't need to do everything at once. Start with the essentials:
1. Domain and email
2. Basic hosting
3. Stripe for payments
4. HIPAA policies
5. Launch with core services

Add advanced features (client portal, screening tools, etc.) as your practice grows.
