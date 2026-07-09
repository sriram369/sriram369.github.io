# Evidence Operations

This is the day-to-day operating loop for Sriram's evidence system. It connects the public Achievements page with the private local baseline without turning raw notes into public claims too early.

## Core Loop

1. Capture raw evidence privately.
2. Refresh the private baseline.
3. Review what is ready to promote.
4. Promote only public-safe, proof-backed records.
5. Verify the public site before publishing.

For a quick read of the current system state:

```bash
npm run status:evidence
```

## 1. Capture

Use the private templates in `private/intake/`, or capture a day-wise note from the terminal:

```bash
npm run capture:daily -- --what "What happened today" --context "Project or course" --dry-run
```

Use this before the item is ready to become a structured ledger row. Remove `--dry-run` after the daily note looks right.

Append one structured ledger row from the terminal:

```bash
npm run add:baseline -- --date "2026-07-08" --title "Achievement title" --context "Project or course" --claim "What happened" --dry-run
```

Use `--dry-run` first. Remove it after the generated CSV row looks right.

Update an existing private row with:

```bash
npm run update:baseline -- --title "Existing title" --metric "100/100" --verifier "Professor Name" --dry-run
```

Use this when Sriram sends missing metrics, verifier names, proof links, or corrected public-safety decisions.

If Sriram fills the verifier and metric intake CSV, preview completed rows with:

```bash
npm run apply:verification
```

This is dry-run by default. Apply completed rows only after review:

```bash
npm run apply:verification -- --apply
```

Raw rows can start with:

- `public_safe=maybe`
- `strength=raw`
- no public proof yet

Public-safe, `public`, or `strong` rows need proof.

## 2. Refresh

Run:

```bash
npm run refresh:baseline
```

This initializes missing private files, migrates the private ledger, seeds public achievements, validates private rows, regenerates the private report, refreshes the evidence request checklist, refreshes the next-batch handoff packet, refreshes verifier outreach drafts, refreshes the verifier/metric matrix, refreshes promotion candidates, refreshes the private tech excellence plan, regenerates the private LaTeX evidence packet, updates the private readiness snapshot, and updates the private publish manifest.

Before a serious review or publish decision, run:

```bash
npm run preflight:evidence
```

This refreshes the private baseline, regenerates the public share summary, prints the current evidence status, and verifies the public site.

Expected warnings are useful. Missing metrics and verifier names mean the row exists, but Sriram still needs to provide stronger backing.

## 3. Review

Read the private reports:

```text
private/export/baseline-report.md
private/export/evidence-request.md
private/export/next-batch-request.md
private/export/verifier-outreach.md
private/export/verification-matrix.md
private/export/promotion-candidates.md
private/export/tech-excellence-plan.md
private/export/sriramos-evidence-packet.tex
private/export/readiness-snapshot.md
private/export/live-site-check.md
private/export/publish-manifest.md
```

`baseline-report.md` summarizes the private evidence inventory.

`evidence-request.md` turns missing fields into a fillable request checklist for Sriram.

`next-batch-request.md` tells Sriram exactly what to send next, in priority order.

`verifier-outreach.md` drafts private messages and metric prompts for people who can confirm the work.

`verification-matrix.md` maps metric and verifier intake back to baseline rows and suggests safe dry-run update commands.

`promotion-candidates.md` separates records into:

- Already public
- Ready to promote
- Not ready

Ready rows include a draft object for `src/data/achievements.js`.

To regenerate the public-safe share sheet:

```bash
npm run share:public
```

This writes `docs/public-share-summary.md` from the public Achievements data.

To regenerate verifier outreach drafts:

```bash
npm run outreach:verifiers
```

This writes `private/export/verifier-outreach.md` from the private evidence ledger.

To regenerate the private tech excellence plan:

```bash
npm run plan:tech
```

This writes `private/export/tech-excellence-plan.md` from the public achievement trail, private ledger, daily captures, and project scorecard.

To regenerate the private formal LaTeX evidence packet:

```bash
npm run latex:evidence
```

This writes `private/export/sriramos-evidence-packet.tex`. To compile the private PDF when a LaTeX engine is available, run `npm run latex:evidence -- --pdf`.

To regenerate the private readiness snapshot:

```bash
npm run snapshot:readiness
```

This writes `private/export/readiness-snapshot.md` and separates local build readiness, live publish readiness, and evidence-strength gaps.

To compare the live GitHub Pages deployment with the local evidence layer:

```bash
npm run check:live
```

This writes `private/export/live-site-check.md` and is intentionally network-dependent.

To regenerate the private publish manifest:

```bash
npm run manifest:publish
```

This writes `private/export/publish-manifest.md` with the safe staging scope and never-publish paths.

## 4. Promote

Only move a private row into `src/data/achievements.js` when all are true:

- Date is specific enough.
- Proof exists.
- Public wording is calm and factual.
- Sensitive details are removed.
- The record strengthens the public story.

After editing public achievements, run:

```bash
npm run validate:evidence
```

Optionally check live proof links with:

```bash
npm run check:evidence-links
```

This is network-dependent and separate from `npm run verify` because some sites block automated checks.

## 5. Verify

Before publish:

```bash
npm run verify
```

This checks private safety, public achievement data, lint, build, and generated public output safety.
It also checks that referenced public assets exist and that workflow commands and generated reports remain documented.

## Responsibilities

Codex owns:

- Turning scattered evidence into structured private records.
- Keeping private and public evidence separate.
- Drafting public-safe achievement copy.
- Maintaining scripts, docs, checks, and the Achievements page.
- Flagging unsupported or risky public claims.

Sriram owns:

- Providing raw proof: dates, links, screenshots, reports, grades, emails, metrics, and verifier names.
- Confirming what can be public.
- Getting qualified advice before relying on sensitive strategy.

## First Evidence Batch

Start with Johns Hopkins:

- Transcript or grade proof for completed courses.
- AuraPath rubric, score proof, report, slides, professor feedback, and team role.
- Support for any top-performance or ranking claim.
- Social Media Head appointment proof, analytics, campaign examples, and references.
- Course project repos, demos, reports, screenshots, grades, and professor feedback.

Use the local private template:

```text
private/intake/jhu-baseline.md
```

For strengths, weaknesses, project candidates, Rubik's cube artifacts, and weekly reviews, use:

```text
private/intake/tech-excellence.md
```
