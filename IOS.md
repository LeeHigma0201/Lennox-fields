# iOS App — Submit from Claude Code

Capacitor 8 app → App Store via CLI. **Proven end-to-end** on InspectRight 2026-04-17: from scratch to TestFlight VALID in ~30 min without opening Xcode GUI or signing into Apple ID inside Xcode.

The tool is the reusable **`ios-submit`** skill (`~/.claude/skills/ios-submit/SKILL.md`). This file is a per-project cheat sheet.

---

## Reference Implementations

- **`~/InspectRight`** — fully working, build 5 VALID on TestFlight, Apple Distribution cert + profile auto-created via ASC API
- **`~/ChargeRight`** — first shipped, iOS 2.0 currently in Developer Rejected state (separate investigation)

---

## Stack Confirmed Working

- Capacitor 8 + Next.js 15 + `server.url` → Vercel (Path B — required when the app uses server actions / `/api` routes)
- `xcodebuild archive` + `xcodebuild -exportArchive` with `destination=upload` → direct App Store upload (no separate altool step)
- ASC API via curl + JWT ES256 for auth, app lookup, profile creation, build polling
- Apple Distribution cert created via `openssl req` + Claude-in-Chrome upload to Apple Developer portal → separate key/cert `security import` into Keychain

---

## One-Time Per-Project Setup (5 minutes once per app)

```bash
cd ~/<project>

# 1. Scripts
cp -r ~/.claude/templates/ios-submit/{scripts,ExportOptions.plist.tmpl} ./
cp ~/.claude/templates/ios-submit/.env.submit.example .env.submit
chmod +x scripts/ios-submit.sh

# 2. Fill .env.submit — BUNDLE_ID, TEAM_ID=2SXHRQM3MY, ASC_APP_ID, SERVER_URL

# 3. Ensure DEVELOPMENT_TEAM is set in ios/App/App.xcodeproj/project.pbxproj
#    (add `DEVELOPMENT_TEAM = 2SXHRQM3MY;` under both Debug and Release config buildSettings)

# 4. Bump iOS deployment target to 16.0 (Capacitor 8 plugins require it)
#    - Podfile: platform :ios, '16.0'
#    - project.pbxproj: IPHONEOS_DEPLOYMENT_TARGET = 16.0;

# 5. If ASC App Record doesn't exist yet (new bundle ID):
#    → https://appstoreconnect.apple.com/apps → + → fill bundle ID + category (~30 sec human)
#    Script auto-detects ASC_APP_ID after creation
```

---

## The Submit Command (every build)

```bash
# Ship to TestFlight — the default
./scripts/ios-submit.sh --testflight-only

# Full App Store review submit (requires metadata + screenshots uploaded separately for now)
./scripts/ios-submit.sh

# Sanity check without touching anything
./scripts/ios-submit.sh --dry-run
```

What the script does (in order, automatic):
1. Load `.env.submit` + Keychain creds
2. Preflight — ASC API reachable, bundle ID matches, DEVELOPMENT_TEAM set
3. **Provisioning profile auto-create** — finds or creates `<AppName> App Store` profile via ASC API, installs it to `~/Library/MobileDevice/Provisioning Profiles/`
4. Bump build number, `agvtool` rewrites pbxproj
5. Stub `out/` (server.url pattern — no npm build needed) + `npx cap sync ios`
6. `pod install` if pods dir missing
7. Render `ios/build/ExportOptions.plist` from template (manual signing + explicit profile name — bypasses Xcode cloud signing)
8. `xcodebuild archive` → `ios/build/App.xcarchive`
9. `xcodebuild -exportArchive` with `destination=upload` → **uploads directly to App Store Connect**
10. Poll ASC API until `processingState=VALID`
11. Print TestFlight install link

---

## Non-Negotiable Rules

1. **IAP only on iOS.** Digital goods = Apple's cut. Use **RevenueCat** + StoreKit. Stripe UI in the iOS build = guaranteed rejection. (Not needed for TestFlight.)
2. **Design must feel native.** Body 17px, tap ≥44pt, bottom tab bar, spring animations, haptics. See `anthropic-skills:ios-app-store → design-system.md`.
3. **iPad screenshots required** (2064×2752). Capacitor runs on iPad by default.
4. **Test credentials in Review Notes.** Reviewers must reach paid features.
5. **No custom Apple Pay buttons.** StoreKit sheet only.

---

## Screenshot Pipeline

```
iPhone 6.9": 1320×2868  (required)
iPad 13":    2064×2752  (required)
```

Use Playwright against the **production Vercel URL** (not simulator — captures Capacitor chrome). Edit `scripts/ios-screenshots.ts` flows to match your app.

```bash
./scripts/ios-submit.sh --screenshots-only
```

Output: `ios/metadata/<locale>/screenshots/<device>/<NN>_<name>.png`

---

## Gotchas (hard-won)

- **Preflight uses `-project` not `-workspace`** — workspace needs pods; project reads pbxproj directly.
- **CocoaPods crashes without `LANG=en_US.UTF-8`** — script sets this.
- **`ios/App/build/`** is xcodebuild's managed dir — putting our artifacts there causes CLEAN FAILED. We use `ios/build/` (one level up).
- **macOS `security import` rejects LibreSSL PKCS12** — always import private `.key` and `.cer` separately. Never combine into `.p12`.
- **Xcode's "Automatic" signing tries cloud signing** which requires Apple ID in Xcode.app. We use **manual signing** with explicit cert name + profile — fully headless.
- **`destination=upload` in ExportOptions.plist** uploads during export — no separate `altool` step needed, no `.ipa` on disk.
- **ASC API blocks all calls until the Account Holder re-accepts updated PLA** — check at developer.apple.com/account if you see `403 REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED`.
- **TestFlight internal testers** (app owner) install immediately after VALID. External group = Apple beta review ~24hr.

---

## Pre-Submission Checklist (for full App Store, not TestFlight)

- [ ] `./scripts/ios-submit.sh --dry-run` passes
- [ ] App icon 1024×1024 PNG (no alpha) in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- [ ] Splash screen in Assets.xcassets
- [ ] All 5 `NS*UsageDescription` strings in `ios/App/App/Info.plist`
- [ ] RevenueCat entitlements configured (if IAP on iOS)
- [ ] Screenshots: 5× iPhone 6.9" + 5× iPad 13"
- [ ] ASC metadata: name (30ch), subtitle (30ch), keywords (100ch), description, privacy labels
- [ ] Review Notes with test account + IAP sandbox steps
- [ ] TestFlight run-through on real device
- [ ] Age rating + export compliance (first time per app only)

Full 80+ item checklist: `anthropic-skills:ios-app-store → pre-submission-checklist.md`.

---

## The Sanity Check

If any "no," fix before submit:
- Does every screen look like something Apple would ship?
- Can my mom use it in 3 seconds?
- Is every payment through StoreKit (no Stripe UI)?
- Do tap targets hit 44pt? Haptics on every tap?
- iPad layout intentional, not stretched?
