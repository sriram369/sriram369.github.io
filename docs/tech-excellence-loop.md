# Tech Excellence Loop

This is the private operating loop for deciding what Sriram should build, practice, and publish next. It feeds the public Achievements page only after proof exists.

## Principle

Do not track effort for its own sake. Track work that can become one of these:

- A public artifact: repository, demo, benchmark, writeup, merged pull request, talk, or shipped feature.
- A private evidence record: grade, evaluation, role proof, feedback, screenshot, or verifier-backed claim.
- A skill upgrade: a drill that makes future systems faster, deeper, or more reliable.

## Weekly Loop

1. Pick one primary proof target.
2. Pick one skill drill.
3. Build in small public-safe increments.
4. End the week with a proof artifact.
5. Capture the result privately.
6. Promote only proof-backed, public-safe achievements.

## Project Scorecard

Before committing a serious build week, score the project from 1 to 5 in each dimension:

| Dimension | Strong Signal |
| --- | --- |
| Technical depth | Solves a real engineering problem with meaningful complexity. |
| Proof potential | Can produce a repo, demo, benchmark, writeup, or outside validation. |
| Personal fit | Matches Sriram's story: AI systems, data, finance, accessibility, education, or leadership. |
| Distribution | Has a realistic path to users, collaborators, evaluator feedback, or community attention. |
| Measurability | Can be judged with numbers such as accuracy, latency, users, reach, score, or saved time. |
| Verifier potential | Someone or something outside Sriram can confirm the work. |

Default rule: build projects scoring 22 or higher. Park projects that are interesting but hard to prove.

## Daily Capture

Use:

```bash
npm run capture:daily -- --what "What changed today" --context "Project or course" --dry-run
```

Then remove `--dry-run` when the note looks right.

## Weekly Planning

Use:

```bash
npm run plan:tech
```

This writes a private plan to:

```text
private/export/tech-excellence-plan.md
```

The plan combines the current public achievements, private evidence ledger, daily captures, proof gaps, and project scorecard.

## Private Intake

Use:

```text
private/intake/tech-excellence.md
```

for strengths, weaknesses, project candidates, Rubik's cube artifacts, and weekly reviews.
