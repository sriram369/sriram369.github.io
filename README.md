# Sriram Naidu Thota Portfolio

This is the source for `sriram369.github.io`, Sriram's public personal website.

The site now has two related jobs:

- Public portfolio: present projects, education, experience, coursework, certifications, and contact.
- Public evidence layer: show a curated achievement timeline with dated proof links and calm, verifiable claims.

Private raw material, review notes, screenshots, and unfinished claims belong in the local-only `private/` folder. That folder is excluded from git and should not be pushed.

## Development

```bash
npm install
npm run status:evidence
npm run add:baseline -- --help
npm run capture:daily -- --help
npm run update:baseline -- --help
npm run init:baseline
npm run migrate:baseline
npm run validate:baseline
npm run seed:baseline
npm run report:baseline
npm run request:evidence
npm run request:next
npm run outreach:verifiers
npm run matrix:verification
npm run apply:verification
npm run promotion:baseline
npm run plan:tech
npm run latex:evidence
npm run snapshot:readiness
npm run manifest:publish
npm run share:public
npm run refresh:baseline
npm run preflight:evidence
npm run safety:private
npm run safety:public
npm run check:public-assets
npm run check:workflow
npm run dev
npm run validate:evidence
npm run check:evidence-links
npm run check:live
npm run lint
npm run build
npm run verify
```

## Evidence Workflow

For a quick local status summary, run:

```bash
npm run status:evidence
```

The public Achievements page renders from:

```text
src/data/achievements.js
```

After deployment, the public evidence layer is directly shareable at:

```text
https://sriram369.github.io/#achievements
```

Individual proof cards are also directly linkable, for example:

```text
https://sriram369.github.io/#achievements/openclaw
```

Generate a public-safe share summary with:

```bash
npm run share:public
```

That command writes to `docs/public-share-summary.md` from the public achievement data.

Before adding or changing an achievement, use the promotion gate in:

```text
docs/evidence-layer.md
```

For the end-to-end daily workflow, use:

```text
docs/evidence-operations.md
```

For deciding what to build, practice, and turn into proof next, use:

```text
docs/tech-excellence-loop.md
```

Before publishing, use the handoff checklist in:

```text
docs/publish-handoff.md
```

Raw scattered evidence should be captured locally with the templates in:

```text
private/intake/
```

Capture a day-wise note safely with:

```bash
npm run capture:daily -- --what "What happened today" --context "Project or course" --dry-run
```

Remove `--dry-run` after the daily note looks right. Daily notes are written under `private/intake/daily/`.

Or append a row safely from the terminal:

```bash
npm run add:baseline -- --date "2026-07-08" --title "Achievement title" --context "Project or course" --claim "What happened" --dry-run
```

Remove `--dry-run` after the row looks right. Raw rows can start as `public_safe=maybe` and `strength=raw`; public-safe or strong rows require proof.

Update an existing private row safely with:

```bash
npm run update:baseline -- --title "Existing title" --metric "100/100" --verifier "Professor Name" --dry-run
```

Remove `--dry-run` after the update looks right.

If the private workspace does not exist yet, create it with:

```bash
npm run init:baseline
```

The initializer only creates missing files and does not overwrite existing private evidence.

If an older local ledger exists, upgrade its columns with:

```bash
npm run migrate:baseline
```

The migration keeps existing rows, splits career signal from private review signal, and is safe to rerun.

Validate the private ledger with:

```bash
npm run validate:baseline
```

Validation fails on structural problems and warns on fields that are expected to improve over time, such as missing metrics or verifier names.

Seed the private ledger with the current public achievements using:

```bash
npm run seed:baseline
```

The seeder appends only missing public achievement rows and is safe to rerun.

After adding rows to the private evidence ledger, generate a local summary with:

```bash
npm run report:baseline
```

That command writes to `private/export/baseline-report.md`, which is also ignored by git.

Generate a private request checklist for missing proof, metrics, and verifiers with:

```bash
npm run request:evidence
```

That command writes to `private/export/evidence-request.md`.

Generate the next handoff packet for Sriram with:

```bash
npm run request:next
```

That command writes to `private/export/next-batch-request.md` and explains exactly what Sriram should paste or upload next.

Generate private verifier outreach drafts with:

```bash
npm run outreach:verifiers
```

That command writes to `private/export/verifier-outreach.md` with per-achievement request drafts and metric prompts.

Generate the verifier and metric matrix with:

```bash
npm run matrix:verification
```

That command writes to `private/export/verification-matrix.md` from `private/intake/verification-ledger.csv`, then suggests safe dry-run updates for baseline rows that have newly supplied metrics or verifier names.

Preview completed verifier and metric rows with:

```bash
npm run apply:verification
```

That command is dry-run by default. After the preview looks right, update the private baseline with:

```bash
npm run apply:verification -- --apply
```

Generate a private promotion report with:

```bash
npm run promotion:baseline
```

That command writes to `private/export/promotion-candidates.md`, separates already-public records from new ready candidates, and drafts the public achievement object for rows that pass the gate.

Generate the private tech excellence plan with:

```bash
npm run plan:tech
```

That command writes to `private/export/tech-excellence-plan.md`, combines the public achievement trail with the private ledger, and gives a weekly build/practice/proof loop.

Generate the private formal LaTeX evidence packet with:

```bash
npm run latex:evidence
```

That command writes to `private/export/sriramos-evidence-packet.tex`. To compile the private PDF when a LaTeX engine is available, run `npm run latex:evidence -- --pdf`.

Generate the private readiness snapshot with:

```bash
npm run snapshot:readiness
```

That command writes to `private/export/readiness-snapshot.md` and separates local build readiness, live publish readiness, and evidence-strength gaps.

Generate the private publish manifest with:

```bash
npm run manifest:publish
```

That command writes to `private/export/publish-manifest.md` with the current safe staging scope and never-publish paths.

Run the full local baseline refresh with:

```bash
npm run refresh:baseline
```

That command initializes missing private files, migrates the ledger, seeds public achievements, validates private rows, regenerates the private report, refreshes the evidence request checklist, refreshes the next-batch handoff packet, refreshes verifier outreach drafts, refreshes the verifier/metric matrix, refreshes promotion candidates, regenerates the private tech excellence plan, regenerates the private LaTeX evidence packet, updates the private readiness snapshot, and updates the private publish manifest.

Run the full local evidence preflight with:

```bash
npm run preflight:evidence
```

That command refreshes the private baseline, prints the evidence status, and runs the public site verification.
It also regenerates `docs/public-share-summary.md` from the public achievement data and `private/export/readiness-snapshot.md` from the local repo state.

Confirm the private workspace is ignored and no private files are tracked with:

```bash
npm run safety:private
```

After a production build, confirm the generated public site does not contain private/legal terms with:

```bash
npm run build
npm run safety:public
```

Confirm source references to public assets are valid with:

```bash
npm run check:public-assets
```

Optionally check live public proof links with:

```bash
npm run check:evidence-links
```

This command uses the network and is intentionally separate from `npm run verify`; some social or institutional sites block automated checks.

After publishing, compare the live GitHub Pages deployment with the local evidence layer using:

```bash
npm run check:live
```

That command writes to `private/export/live-site-check.md` and reports whether the deployed bundle appears to include the Proof Trail route and achievement IDs.

Check that the workflow commands and generated reports remain documented with:

```bash
npm run check:workflow
```

## Responsibilities

Codex:

- Convert messy evidence into structured records.
- Separate public-safe proof from private/raw material.
- Keep the public achievement copy factual and proof-backed.
- Maintain the website implementation and verification checks, including `npm run status:evidence`, `npm run add:baseline`, `npm run capture:daily`, `npm run update:baseline`, `npm run init:baseline`, `npm run migrate:baseline`, `npm run validate:baseline`, `npm run seed:baseline`, `npm run report:baseline`, `npm run request:evidence`, `npm run request:next`, `npm run outreach:verifiers`, `npm run matrix:verification`, `npm run apply:verification`, `npm run promotion:baseline`, `npm run plan:tech`, `npm run latex:evidence`, `npm run snapshot:readiness`, `npm run manifest:publish`, `npm run share:public`, `npm run refresh:baseline`, `npm run preflight:evidence`, `npm run safety:private`, `npm run safety:public`, `npm run validate:evidence`, `npm run check:public-assets`, `npm run check:workflow`, `npm run check:evidence-links`, and `npm run check:live`.
- Turn new tech work into project scorecards, weekly proof targets, and promotion candidates.

Sriram:

- Provide dates, links, screenshots, reports, grades, emails, and verifier names.
- Confirm whether each claim is safe to publish.
- Ask qualified advisors to validate sensitive strategy before relying on it.
