# Vercel Deployment Guide - Lennox Fields

## Quick Deploy (5 Minutes)

### Prerequisites
- GitHub account (already have - LeeHigma0201/Lennox-fields)
- Vercel account (free tier works)
- This branch pushed to GitHub ✅

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click "Add New Project"
2. Search for "Lennox-fields"
3. Click "Import" next to the repository
4. Select the branch: `claude/review-site-files-011QsDbfpZAYVzGnnmhfBpaT`

### Step 3: Configure Project

**Framework Preset:** Next.js (auto-detected) ✅
**Root Directory:** `./` (leave default)
**Build Command:** `npm run build` (auto-detected) ✅
**Output Directory:** `.next` (auto-detected) ✅
**Install Command:** `npm install` (auto-detected) ✅

### Step 4: Environment Variables

Add these in Vercel dashboard under "Environment Variables":

```bash
# Required for production
NODE_ENV=production

# Email Service (Choose one - Resend recommended)
RESEND_API_KEY=re_your_api_key_here

# Future: Database (when ready to add client portal)
# DATABASE_URL=your_postgres_connection_string

# Future: Stripe (when ready for payments)
# STRIPE_PUBLIC_KEY=pk_live_your_key
# STRIPE_SECRET_KEY=sk_live_your_key

# Future: NextAuth (when ready for authentication)
# NEXTAUTH_SECRET=your_random_32_char_string
# NEXTAUTH_URL=https://lennoxfields.org
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Get your deployment URL: `https://lennox-fields.vercel.app`

---

## Post-Deployment Setup

### 1. Configure Custom Domain

**In Vercel Dashboard:**
1. Go to Project Settings → Domains
2. Add `lennoxfields.org`
3. Add `www.lennoxfields.org`

**In Your Domain Registrar (Namecheap, GoDaddy, etc.):**

Add these DNS records:

```
Type    Name    Value                    TTL
A       @       76.76.21.21              Automatic
CNAME   www     cname.vercel-dns.com     Automatic
```

Wait 24-48 hours for DNS propagation.

### 2. Set Up Email Service

**Option A: Resend (Recommended - Easiest)**

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain or use `onboarding@resend.dev` for testing
3. Get API key from dashboard
4. Add to Vercel env vars: `RESEND_API_KEY`
5. Redeploy

**Cost:** Free tier includes 3,000 emails/month

**Option B: SendGrid**

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Add to Vercel env vars: `SENDGRID_API_KEY`
4. Update code in `/app/api/contact/route.ts` (line 309)

**Cost:** Free tier includes 100 emails/day

**Option C: Mailchimp Transactional**

1. Sign up at [mailchimp.com](https://mailchimp.com)
2. Enable Transactional Email (Mandrill)
3. Get API key
4. Add to Vercel env vars: `MAILCHIMP_API_KEY`

**Cost:** Free for first 500 emails

### 3. Set Up Analytics

**Vercel Analytics (Recommended)**

1. In Vercel dashboard, go to Analytics tab
2. Click "Enable Analytics"
3. Free for hobby projects

**Google Analytics**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `/app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### 4. Submit to Search Engines

**Google Search Console**

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://lennoxfields.org`
3. Verify ownership (DNS or HTML tag)
4. Submit sitemap: `https://lennoxfields.org/sitemap.xml`

**Bing Webmaster Tools**

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site: `https://lennoxfields.org`
3. Import from Google Search Console (easiest)
4. Submit sitemap

### 5. Set Up Professional Email

**Google Workspace (Recommended)**

- Cost: $6/user/month
- Get @lennoxfields.org email
- HIPAA compliant (with BAA)
- Setup: [workspace.google.com](https://workspace.google.com)

**Microsoft 365**

- Cost: $6/user/month
- HIPAA compliant
- Setup: [microsoft365.com](https://www.microsoft365.com)

### 6. Create Google Business Profile

1. Go to [business.google.com](https://business.google.com)
2. Create profile for "Lennox Fields Clinical Mental Health Services"
3. Add:
   - Business category: Mental Health Service, Counselor
   - Service areas: North Carolina, Indiana
   - Hours: Your actual hours
   - Website: https://lennoxfields.org
   - Phone: Your number
   - Services: Individual therapy, couples therapy, etc.
4. Verify business
5. Add photos (office, logo, Tamara's professional photo)

### 7. Set Up Appointment Scheduling

**Calendly**

- Free tier available
- Embed on contact page
- Link: [calendly.com](https://calendly.com)

**SimplePractice**

- Full practice management ($29-79/month)
- HIPAA compliant
- Link: [simplepractice.com](https://simplepractice.com)

---

## Production Checklist

Before announcing your site publicly:

### Content
- [ ] Update Tamara's bio with professional photo
- [ ] Add actual phone number in contact page
- [ ] Add actual office address (if applicable)
- [ ] Review all legal pages with attorney
- [ ] Create actual book covers (if publishing books)
- [ ] Add real professional photo to About page

### Technical
- [ ] Custom domain configured (lennoxfields.org)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Email service configured and tested
- [ ] Analytics tracking active
- [ ] Sitemap submitted to Google
- [ ] Google Business Profile created
- [ ] Professional email set up (@lennoxfields.org)

### Marketing
- [ ] Create social media profiles (LinkedIn, Instagram, Facebook)
- [ ] List on Psychology Today directory
- [ ] List on GoodTherapy.org
- [ ] Join local therapist directories
- [ ] Set up email newsletter (Mailchimp/ConvertKit)
- [ ] Create welcome email sequence

### Legal & Compliance
- [ ] Review Privacy Policy with attorney
- [ ] Review Terms of Service with attorney
- [ ] Review HIPAA Notice with attorney
- [ ] Ensure HIPAA BAA with all vendors (Vercel, email service, etc.)
- [ ] Professional liability insurance in place
- [ ] Business license current

### Functionality
- [ ] Test contact form (send test inquiry)
- [ ] Test all navigation links
- [ ] Test on mobile devices
- [ ] Test all screening assessments
- [ ] Test PDF downloads (when implemented)
- [ ] Test all CTAs lead to correct pages

---

## Monitoring & Maintenance

### Weekly
- Check Vercel analytics for traffic
- Review contact form submissions
- Monitor error logs in Vercel dashboard
- Check uptime (should be 99.9%+)

### Monthly
- Review Google Search Console for SEO performance
- Update blog with new article
- Check for broken links
- Review and respond to any feedback

### Quarterly
- Review and update legal pages if needed
- Update services or pricing if changed
- Review analytics and adjust content strategy
- Add new resources or worksheets

---

## Troubleshooting

### Contact Form Not Working

1. Check Vercel logs: Dashboard → Functions → `/api/contact`
2. Verify env vars are set: `RESEND_API_KEY` or `SENDGRID_API_KEY`
3. Check rate limiting (max 3 submissions/hour per IP)
4. Test with curl:

```bash
curl -X POST https://lennoxfields.org/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "555-1234",
    "service": "individual-therapy",
    "contactMethod": "email",
    "bestTime": "morning",
    "message": "Test message with enough characters to meet minimum length requirement for form validation",
    "referralSource": "google"
  }'
```

### Domain Not Working

- Wait 24-48 hours for DNS propagation
- Use [whatsmydns.net](https://www.whatsmydns.net) to check DNS propagation
- Verify DNS records in domain registrar match Vercel requirements

### Build Failing

1. Check Vercel build logs for errors
2. Run `npm run build` locally to reproduce
3. Ensure all dependencies are in `package.json`
4. Check for environment-specific issues

### Performance Issues

- Use Vercel Analytics to identify slow pages
- Check bundle size: run `npm run build` and review output
- Optimize images (use Next.js Image component)
- Enable Vercel Image Optimization

---

## Cost Breakdown

### Free Tier (Totally Free)
- Vercel hosting: Free
- Vercel Analytics: Free (up to 100k events/month)
- Resend email: Free (3,000 emails/month)
- Let's Encrypt SSL: Free

**Total: $0/month**

### Professional Tier (Recommended)
- Vercel Pro: $20/month (optional, for production)
- Google Workspace: $6/month (professional email)
- Domain registration: $15/year (~$1.25/month)
- **Total: ~$27/month or $7/month without Vercel Pro**

### Full Business Tier (When Scaling)
- Everything above: $27/month
- SimplePractice: $29-79/month (practice management)
- Mailchimp: $20/month (email marketing)
- **Total: $76-126/month**

---

## Support Resources

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)

---

## Auto-Deployment (Already Configured)

Every time you push to your branch:
1. Vercel automatically detects the push
2. Runs `npm run build`
3. Deploys to production if successful
4. Sends you an email notification

**Current branch:** `claude/review-site-files-011QsDbfpZAYVzGnnmhfBpaT`
**Auto-deploy:** ✅ Enabled

---

Your site is **production-ready** and can be deployed in minutes! 🚀
