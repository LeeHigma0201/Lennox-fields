# Lennox Fields -> Paid Platform: Overnight Build Plan

**Branch:** `feat/lennox-paywall` (local only, NOT pushed, NOT deployed)
**Started:** 2026-05-25 evening, by ClaudeRight (autonomous /loop until morning)
**Validated by:** Tamara ("we need this behind a paywall, big time")
**Baseline:** therapistassist.app ($20/mo, sends tools to clients via private link, response returns before session)

> Rules I am holding to overnight: build on the branch, commit progress, verify it builds.
> I will NOT push, deploy to production, provision paid infra, or enable LIVE Stripe payments
> without Jason. Anything irreversible or costing money is parked in "Decisions Needed."

---

## The Dream (what Lennox Fields becomes)

Not a brochure for one therapist. A **sellable clinical-tools platform** Tamara owns, that does
what TherapistAssist does, but aimed where she is strongest: **ADHD / autism / neurodiversity,
family + parenting, and couples** (TherapistAssist is aimed at IFS/somatic/EMDR clinicians).

Three things sell here, and she already has the raw material for all three:

1. **The tools, behind a paywall.** 7 interactive tools + 51 worksheets exist and work today.
   They are 100% free and ungated. Gate the premium ones. (Closest to revenue.)
2. **The send-to-client loop.** The thing that makes TherapistAssist a *product*: therapist taps
   send, client gets a private link (no login), fills it out, response returns. We have the tools;
   we lack the loop. This is the highest-leverage thing to build.
3. **Net-new flagship tools** she has vision for but does not exist in code yet:
   - **Kids coin/reward system** (gamified, child-facing) - idea only, building from scratch.
   - **Tethered Together** (couples mental-load tool) - polished prototype, fake auth, not sellable yet.

### Pricing model (research-validated 2026-05-25)
TherapistAssist (RETRIEVED, therapistassist.app/pricing): Free forever (1 client, 5 sends/mo,
1 AI gen/week) + Solo $20/mo ($16/mo annual = unlimited). Comparables (retrieved): Quenza $25/mo,
Carepatron $15.50-19.50/mo, Mentalyc $19.99+/mo, TherapyByPro ~$499 bundle.

**THE WEDGE (retrieved):** TherapistAssist has NOTHING for ADHD/autism/neurodiversity, parenting/
family, or couples - Tamara's entire niche. No competitor has a clinician-curated ADHD/autism/family
library. Lead with the niche.

Proposed tiers (INFERENCE/recommendation - confirm with Tamara + Jason):
- **Free lead magnets** (no login): PHQ-9, GAD-7, 1 breathing exercise, 1 journaling set + email capture.
- **Consumer "Lennox Fields Toolkit" ~$9/mo or $79/yr:** all 51 worksheets + 7 tools + Tethered
  Together + kids coin tracker. Below the $15-20 consumer "feels expensive" line.
- **Therapist B2B ~$29/mo:** niche library + print-formatted PDFs + the send-to-client private-link
  workflow + quarterly new tools. Differentiation = the niche no one else serves.

---

## What exists today (audited 2026-05-25, file-grounded)

- **7 interactive tools** (`app/tools/`): breathing, cbt-thought-record, safety-planning,
  notes-templates, treatment-planning, screening-tools (PHQ-9/GAD-7/PCL-5), sound-healing.
  All client-side React, fully working. **No auth, no persistence** (safety-planning uses
  localStorage; cbt-thought-record loses data on refresh).
- **51 worksheets** (`content/worksheets.ts`, 49 PDFs in `/public/worksheets/`): neurodivergent (24),
  family/parenting (25), 3 interactive. All free/ungated. Prisma `Resource.isPremium` exists, unwired.
- **Tethered Together** (`app/tethered-together/`): production-grade landing + login/signup/onboard/
  dashboard, but **localStorage-only fake auth** (any email logs in, no password check), no DB wiring.
  Full Prisma models exist (`TetherUser/Family/Member/List/Task/Goal`), unwired. Copy says "free, no card."
- **Kids coin system:** does NOT exist in code. Idea only.
- **Stripe** (`lib/stripe.ts`): PRODUCTS defined (therapy session prices). No checkout/webhook/API routes.
- **Auth:** NextAuth installed, ZERO config.
- **DB:** Prisma schema is comprehensive; `DATABASE_URL` unset, no migrations, no route reads from it.

## The 3 hard blockers to selling anything
1. **No auth system** (NextAuth installed, not configured).
2. **No database connection** (schema only; nothing provisioned/migrated/wired).
3. **No Stripe subscription flow** (products only; no checkout, webhook, or gating).

Everything else (tool UIs, worksheets, schema, Tethered concept) is built to varying degrees and
only needs the gate layer.

---

## Build order (what the loop is executing tonight)
1. [done] Fix `lib/stripe.ts` build-throw (lazy init) so the branch builds without secrets.
2. Auth foundation: NextAuth (Auth.js) App Router config + Prisma adapter.
3. Stripe: checkout session route + webhook + customer portal, test-mode ready; map sub status to User.
4. Gating layer: middleware + server helper to gate `/tools/*` and premium worksheets via `isPremium`.
5. Pricing/tier config + a `/pricing` page and upgrade CTAs.
6. Send-to-client loop: signed tokenized private links that open a tool pre-authed, POST responses back.
7. Tool persistence: save tool results to account (cbt-thought-record, screening, safety-plan).
8. Kids coin system: design + build the gamified child-facing tool.
9. Tethered Together: wire to real auth + Prisma, decide free vs paid, remove "free forever" if paid.
10. Verify builds at each step. Morning summary.

---

## Decisions Needed From Jason (turn-key, morning)
- **Deploy gate:** before deploying feat/lennox-paywall, set NEXTAUTH_SECRET (+ NEXTAUTH_URL) in Vercel, or the
  paid /tools/* routes + /dashboard return a config error. The live free tools are safe (no longer matched).
- **Coin tracker placement:** shipped FREE as a lead magnet - confirm free vs Toolkit-paid with Tamara.
- **DB provider:** Supabase vs Vercel Postgres (marketplace). I will build against a standard
  `DATABASE_URL`; you pick + provision, I run migrations. (Costs money -> parked.)
- **Stripe keys:** I build test-mode. You add live keys + approve products before real charges. (Parked.)
- **Pricing:** approve the tier/price hypothesis (see research brief, coming from agents tonight).
- **Who pays first:** consumer vs therapist B2B (or both). Confirm with Tamara.
- **Tethered Together:** stays free as a lead magnet, or goes into the paid tier?

---

## Hard Constraints (do NOT violate)
- **NEVER text/email Tamara a link to a feature that is not DEPLOYED.** Everything on this branch is
  undeployed. (2026-04-15 incident: a localhost-only /tools/sound-healing link was sent to her and
  burned credibility.) Deploy-verify before any external link. Double-care because it is Tamara.
- No push, no deploy, no paid infra, no LIVE Stripe without Jason.

## Tamara Text Status
- Tamara (LPCA, 502-931-1043) has been in a shared Google Voice thread with Jason + Claude since
  2026-04-28 and can text the GV number to spawn work. READ that thread first when the bridge is up
  (she may have already said what she wants), THEN send the announcement.
- [ ] BLOCKED 2026-05-25: Voice tab not logged in (redirects to Workspace page). Message queued
  (no links), auto-retries each loop iteration. Sends once Jason logs into Google Voice in Chrome.

---

## Technical Architecture (research playbook, 2026-05-25)
Stack (RETRIEVED from package.json): next 14.2.5, next-auth 4.24.7 (v4, NOT Auth.js v5), prisma 5.17.0,
stripe 16.2.0, zod 3.23.8.
- **Schema collision:** clinical models already use `User` + `Session`. Do NOT rename them. Add
  Auth-prefixed models (AuthUser/AuthAccount/AuthSession/VerificationToken) + a custom NextAuth adapter.
- **Auth:** NextAuth v4, EMAIL MAGIC LINK only (no stored passwords = lower HIPAA liability) via Resend SMTP.
  Session strategy = JWT so middleware can gate without a DB hit; 1-day maxAge.
- **Stripe:** checkout + customer portal + webhook (checkout.session.completed,
  customer.subscription.updated/deleted) -> writes subscriptionStatus onto AuthUser. Test-mode; Price IDs from env.
- **Gating:** middleware.ts on /tools/* + /dashboard/*; lib/require-premium.ts for server/data gating;
  Resource.isPremium for worksheets.
- **Send-to-client loop:** ToolAssignment + ToolResponse models; OPAQUE DB token (cuid, revocable, expiring),
  not JWT; client opens /client/[token] with NO account; responses POST back to therapist dashboard.
- **DB:** Supabase recommended (free tier, SOC2) - JASON PROVISIONS. Needs DATABASE_URL + DIRECT_URL, then
  `prisma migrate dev`. Nothing runs until then.

## Loop Log (newest first)
- 2026-05-25 e: built the kids Coin Tracker (app/tools/coin-tracker) as a free lead magnet - token-economy
  reward chart, strengths-based ("coins earned, never taken away"), localStorage now. VERIFIED: build green,
  renders + works in preview (balance updated on click; screenshot captured). Rewrote middleware to gate ONLY
  paid tool routes explicitly - caught a regression: matching all /tools would have broken the LIVE free tools
  (PHQ-9/GAD-7/breathing/safety-planning) on any deploy missing NEXTAUTH_SECRET. Next: therapist dashboard shell.
- 2026-05-25 d: foundation built + VERIFIED. I ran `npm run build` myself = green (49 pages, 0 errors).
  Fixed the gate so free lead-magnet tools (PHQ-9, GAD-7, breathing, safety-planning) stay public while
  premium tools require a subscription (middleware FREE_TOOL_PATHS - confirm split with Tamara). Committed
  the foundation (17 new files + schema/stripe/env). Verified /pricing renders in the browser (on-brand,
  3 tiers, screenshot captured). Next: kids coin system (DB-independent) + therapist dashboard shell.
  Parked until Jason provisions DB: tool persistence, Tethered wiring, reading client responses.
- 2026-05-25 c: both research agents done. Dispatched a Sonnet implementer to build the foundation on the
  branch (schema additions + auth + Stripe routes + gating + send-to-client loop + /pricing), make
  `npm run build` green, with NO migrate/push/deploy/commit. Verifying its output next. ~/lennox-couples-vision
  holds only the static questionnaire (no saved answers on disk).
- 2026-05-25 b: read local knowledge stores (wiki/rolodex/cortex archive) per Jason. Folded in the
  deploy-before-link gotcha, Tamara's GV coordination thread (since 04-28), and the couples vision
  tool at ~/lennox-couples-vision (Sunday Mission lineage). Seeded the empty Lennox project memory.
  Agent 1 (TherapistAssist + market) delivered the pricing model above. Agent 2 (Stripe/NextAuth
  playbook) still running. Next: with agent 2's playbook, build auth + Stripe + gating foundation.
- 2026-05-25 a setup: created branch, audited codebase, fixed Stripe build-throw, wrote this plan,
  spawned 2 research agents. Tamara text blocked on Voice login. Next: auth + Stripe foundation.
