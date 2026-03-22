# Lennox Fields - Clinical Mental Health Services Website

## Project Overview
Marketing/informational website for **Lennox Fields Clinical Mental Health Services** (Tamara Walls, LPCA), built with Next.js 14, deployed on Vercel.

## Tech Stack
- **Framework:** Next.js 14.2.5 (App Router)
- **Styling:** Tailwind CSS 3.4.14 with custom theme
- **Fonts:** Playfair Display (headings), Inter (body), loaded via Google Fonts
- **Icons:** Lucide React
- **Database:** Prisma + PostgreSQL (schema only, not connected)
- **Auth:** NextAuth (installed, not configured)
- **Payments:** Stripe (scaffolded in lib/stripe.ts, not functional)
- **Deploy:** Vercel

## Content Architecture
All page content is driven by config files in `/content/`:
- `site-config.ts` - Business details, owner credentials, contact info
- `navigation.ts` - Menu structure and footer links
- `home-page.ts` - Hero, trust indicators, resources, CTA
- `services.ts` - 5 services with pricing
- `about.ts` - Bio, credentials, training, clinical approach
- `books.ts` - 3 children's mental health books
- `faq.ts` - FAQ content
- `icons.ts` - Lucide icon mappings

## Key Routes
| Route | Status |
|-------|--------|
| `/` | Live |
| `/about` | Live |
| `/services` | Live |
| `/services/individual-therapy` | Live |
| `/services/career-counseling` | Live |
| `/services/substance-use` | Live |
| `/books` | Live |
| `/contact` | Live (form non-functional) |
| `/faq` | Live |
| `/resources/journaling-prompts` | Live |
| `/tools/screening-tools` | Live |
| `/tools/screening-tools/phq-9` | Live |
| `/tools/screening-tools/gad-7` | Live |
| `/tools/screening-tools/pcl-5` | Live |
| `/tools/breathing-exercises` | Live |
| `/tools/cbt-thought-record` | Live |
| `/tools/safety-planning` | Live |

## Known Issues (see audit-dashboard.html)
- 17+ broken internal links (routes in nav/footer that don't have pages)
- `bg-cream` Tailwind class not defined (used in 19+ files)
- Contact form doesn't send data anywhere
- Legal pages (privacy, terms, HIPAA) don't exist
- All images use `<img>` instead of `next/image`
- No loading/error/404 pages
- No analytics, sitemap, or robots.txt

## Owner Info
- **Tamara Walls, LPCA** (Licensed Professional Clinical Counselor Associate)
- Specializations: ADHD, Autism, CPTSD, Trauma
- Focus: Neurodiversity-affirming care, primarily women
- Location: Kentucky
- Contact: tamara@lennoxfields.org, (502) 627-0781
- Books: 3 children's mental health books on Amazon

## Commands
```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # Run linter
```
