# Quick Deploy to Vercel - Copy & Paste Commands

## Step 1: Login to Vercel (One-Time Setup)

Run this command and follow the prompts:
```bash
vercel login
```

Choose your preferred login method (GitHub recommended).

---

## Step 2: Deploy the Site

From the `/home/user/Lennox-fields` directory, run:

```bash
cd /home/user/Lennox-fields
vercel --yes
```

This will:
- Create a new Vercel project
- Deploy your site
- Give you a live URL immediately

---

## Step 3: Deploy to Production

After the preview deploy works, deploy to production:

```bash
vercel --prod
```

---

## What You'll Get

**Preview URL:** `https://lennox-fields-[random].vercel.app`
**Production URL:** `https://lennox-fields.vercel.app`

You can then:
- Share this URL with Tamara
- Add custom domain `lennoxfields.org` later in Vercel dashboard

---

## Quick Commands Summary

```bash
# One-time setup
vercel login

# First deployment (creates preview)
cd /home/user/Lennox-fields
vercel --yes

# Deploy to production
vercel --prod
```

The entire process takes about 2-3 minutes.

---

## Alternative: Deploy via Web Dashboard

If CLI doesn't work, go to:
1. https://vercel.com/new
2. Sign in with GitHub
3. Import repository: `LeeHigma0201/Lennox-fields`
4. Select branch: `claude/review-site-files-011QsDbfpZAYVzGnnmhfBpaT`
5. Click "Deploy"

Live in 2-3 minutes!
