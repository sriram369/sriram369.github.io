# Evidence Layer

The Achievements page is the public proof layer for Sriram's portfolio. It is not the full private SriramOS tracker and it is not professional advice.

For the day-to-day operating loop, see `docs/evidence-operations.md`.

After deployment, share it directly with:

```text
https://sriram369.github.io/#achievements
```

## Product Split

Public website:

- Curated, dated achievements.
- Proof links, public reports, demos, repositories, and public institutional pages.
- Calm summaries that a recruiter, collaborator, professor, or reviewer can inspect.

Private SriramOS baseline:

- Raw day-wise capture.
- Screenshots, rubrics, grades, emails, transcripts, review notes, and unfinished claims.
- Private review mapping, gaps, strengths, weaknesses, and next actions.

## Promotion Gate

Only promote a private item to the public Achievements page when all five are true:

- The date or period is specific enough.
- At least one proof source exists.
- The wording is factual, calm, and not exaggerated.
- Private, legal, or sensitive details are removed.
- The item strengthens the public story: applied AI, technical depth, leadership, public impact, or academic excellence.

## Achievement Data Shape

Public achievements live in `src/data/achievements.js`.

Each achievement should include:

```js
{
  id: 'stable-url-slug',
  date: 'Month Year or range',
  category: 'Public category',
  title: 'Specific outcome',
  summary: 'What happened, stated plainly.',
  signal: 'Why this matters as proof.',
  links: [{ label: 'Proof label', href: 'https://...' }],
  proof: { level: 'strong', types: ['Repository', 'Report'] },
  tags: ['Topic', 'Skill', 'Context'],
}
```

The `id` field powers individual proof links such as:

```text
https://sriram369.github.io/#achievements/openclaw
```

Use `proof.level: 'strong'` when the public proof directly substantiates the claim, such as a merged PR, report, demo, or evaluation artifact. Use `proof.level: 'public'` when the item has public supporting links but may still need private corroboration before stronger use.

Run `npm run validate:evidence` before committing any public evidence changes. It checks that every achievement has proof links, proof metadata, required copy, tags, and no private/legal terms.

## Private Intake Shape

Raw evidence should be captured locally in `private/intake/` before becoming public.

Capture a day-wise private note with:

```bash
npm run capture:daily -- --what "What happened today" --context "Project or course" --dry-run
```

Append one private ledger row from the terminal with:

```bash
npm run add:baseline -- --date "2026-07-08" --title "Achievement title" --context "Project or course" --claim "What happened" --dry-run
```

Use `--dry-run` first. Remove it when the CSV row looks right. Raw intake rows may start without proof if they are marked `public_safe=maybe` or `public_safe=no` and `strength=raw`; public-safe, public, or strong rows must include proof.

Update an existing private row with:

```bash
npm run update:baseline -- --title "Existing title" --metric "100/100" --verifier "Professor Name" --dry-run
```

Create the ignored private workspace with:

```bash
npm run init:baseline
```

The command creates missing templates only; it does not overwrite existing private evidence.

Upgrade an older private ledger with:

```bash
npm run migrate:baseline
```

The migration keeps current rows and moves them to the current `career_signal` / `case_signal` schema.

Validate private rows with:

```bash
npm run validate:baseline
```

The validator fails on duplicate titles, missing required fields, invalid status values, and public-safe rows without proof. It warns on gaps that are allowed during intake, such as missing metrics or verifier names.

Seed the private ledger from current public achievements with:

```bash
npm run seed:baseline
```

The command appends public achievement rows only when they are missing.

Generate a private review packet from the CSV ledger with:

```bash
npm run report:baseline
```

The command writes `private/export/baseline-report.md`. Keep that report private unless specific sections are deliberately promoted to the public site.

Generate a private checklist of what Sriram still needs to provide with:

```bash
npm run request:evidence
```

The command writes `private/export/evidence-request.md`.

Generate the next handoff packet with:

```bash
npm run request:next
```

The command writes `private/export/next-batch-request.md` and prioritizes what Sriram should send first.

Generate promotion candidates with:

```bash
npm run promotion:baseline
```

The command writes `private/export/promotion-candidates.md`, separates records that are already public, ready to promote, or not ready, and drafts the public achievement object for ready rows.

Run the whole local refresh loop with:

```bash
npm run refresh:baseline
```

Use this after a new evidence batch lands in `private/intake/`.

Before committing, run:

```bash
npm run safety:private
```

That command verifies `private/` is ignored and no private baseline files are tracked by git.

After building the public site, run:

```bash
npm run safety:public
```

That command scans `dist/` for private/legal terms before deployment.

Use this shape:

```text
Date:
Title:
Context:
What I did:
Why it matters:
Proof links/files:
Metrics:
People who can verify:
Public-safe summary:
Private notes:
Career signal:
Private review signal:
Strength: strong / medium / weak / raw
Next action:
```

## First Baseline Priority

Start with Johns Hopkins evidence:

- Transcript or grade proof for completed courses.
- AuraPath rubric, 100/100 proof, report, slides, professor quote source, and team role.
- Exact proof for any "number one" or top-performance claim.
- JHU Social Media Head appointment proof, analytics screenshots, account growth, campaign work, and references.
- Course project repos, demos, reports, screenshots, final grades, and professor feedback.

## Private Review Framing

Track evidence against broad private review lanes, then let qualified advisors decide usefulness:

- Awards or prizes.
- Selective memberships.
- Published material about Sriram or his work.
- Judging or evaluation of others' work.
- Original technical contributions.
- Scholarly, technical, or public authorship.
- Critical or essential roles for distinguished organizations.
- Compensation or remuneration evidence.
