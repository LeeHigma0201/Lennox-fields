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

### Who pays (strategic fork - validating tonight, confirm with Tamara)
- **Consumer / client-facing** (parents, families, individuals): premium tools, worksheets,
  kids coin system, couples tool. Likely a low monthly sub + one-time worksheet packs.
- **B2B / other therapists** (the TherapistAssist model): send-to-client loop + tool library, ~$20/mo.
- Leaning: lead consumer (matches "coin system with the kids" + couples), add therapist tier later.

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
- **DB provider:** Supabase vs Vercel Postgres (marketplace). I will build against a standard
  `DATABASE_URL`; you pick + provision, I run migrations. (Costs money -> parked.)
- **Stripe keys:** I build test-mode. You add live keys + approve products before real charges. (Parked.)
- **Pricing:** approve the tier/price hypothesis (see research brief, coming from agents tonight).
- **Who pays first:** consumer vs therapist B2B (or both). Confirm with Tamara.
- **Tethered Together:** stays free as a lead magnet, or goes into the paid tier?

---

## Tamara Text Status
- [ ] BLOCKED 2026-05-25: Voice tab not logged in (redirects to Workspace page). Message queued,
  auto-retries each loop iteration. Sends once Jason logs into Google Voice in Chrome.

---

## Loop Log (newest first)
- 2026-05-25 setup: created branch, audited codebase, fixed Stripe build-throw, wrote this plan,
  spawned 2 research agents (TherapistAssist+market teardown; Stripe/NextAuth implementation playbook).
  Tamara text blocked on Voice login. Next: synthesize research -> build auth + Stripe foundation.
