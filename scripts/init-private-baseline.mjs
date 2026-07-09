import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))

const files = [
  {
    path: 'private/sriramos-baseline-process.md',
    content: `# SriramOS Private Baseline Process

This file is intentionally local-only. The \`private/\` folder is ignored by git so raw evidence, review notes, screenshots, and unfinished claims do not get published with the personal website.

## Core Split

Public website:
- Curated achievements with dates, clean summaries, and proof links.
- No weak claims, private documents, sensitive strategy, or unfinished rankings.
- Promote an item only when the proof is clear enough for a recruiter, collaborator, or professor to inspect.

Private SriramOS:
- Raw evidence vault, day-wise capture, private review mapping, strengths, weaknesses, next projects, and review packets.
- Track scattered material first; polish later.
- Keep review notes and sensitive screenshots private.

## Responsibilities

Codex owns:
- Turn messy input into structured evidence records.
- Separate public claims from private/raw claims.
- Maintain the achievement timeline and proof links.
- Produce private review tables, gap reports, and website-ready summaries.
- Flag unsupported claims before they go public.
- Convert new tech work into proof-backed project decisions.

Sriram owns:
- Provide the raw artifacts, even if scattered.
- Send exact dates, screenshots, certificates, rubrics, emails, grades, links, and names of people who can verify the claim.
- Confirm whether a claim is safe to publish.
- Ask qualified advisors to validate sensitive strategy before relying on it.
`,
  },
  {
    path: 'private/intake/jhu-baseline.md',
    content: `# Johns Hopkins Baseline Intake

Use this file for the first Johns Hopkins evidence batch. Paste links, screenshot paths, emails, rubric text, grade proof, professor feedback, or rough notes. Codex will convert strong items into structured private ledger records and, only when safe, public achievement candidates.

## 1. Transcript And Course Grades

Needed:
- Official or unofficial transcript screenshot/PDF path:
- Course list with terms:
- Final grades or score screenshots:
- Class size or comparison group, if known:
- Public-safe? yes / no / maybe:

Notes:

\`\`\`text

\`\`\`

## 2. AuraPath

Needed:
- Report path/link:
- Slides path/link:
- Rubric path/link:
- 100/100 score proof:
- Professor quote or feedback source:
- Team size:
- Sriram's exact role:
- Demo/video/repo, if any:
- Public-safe? yes / no / maybe:

Notes:

\`\`\`text

\`\`\`

## 3. Top-Performance Or "Number One" Claim

Needed:
- Exact wording of the claim:
- Ranking proof:
- Score/rubric screenshot:
- Class size or comparison group:
- Professor/admin confirmation:
- Whether wording can be public:

Notes:

\`\`\`text

\`\`\`

## 4. JHU Social Media Head

Needed:
- Appointment/role proof:
- Role description:
- Account analytics screenshots:
- Campaign examples led by Sriram:
- Follower/reach metrics:
- Admin/faculty verifier:
- Public-safe? yes / no / maybe:

Notes:

\`\`\`text

\`\`\`

## 5. Course Projects

Copy one block per project.

\`\`\`text
Course:
Term:
Project title:
Claim:
What Sriram did:
Repo/demo/report/slides:
Score/grade/feedback:
Team size and role:
Professor or teammate verifier:
Metric:
Public-safe? yes / no / maybe:
Career signal:
Private review signal:
Next action:
\`\`\`

## 6. Verifier Map

\`\`\`text
Name:
Role:
Institution/team:
What they can verify:
Best contact path:
Public reference allowed? yes / no / maybe:
\`\`\`
`,
  },
  {
    path: 'private/intake/daily-capture.md',
    content: `# Daily Capture

Copy this block whenever something meaningful happens.

\`\`\`text
Date:
What happened:
Project / context:
Why it matters:
Proof link or file:
Who can verify:
Public-safe? yes / no / maybe
Career signal:
Private review signal:
Strength: strong / medium / weak / raw
Next action to make it stronger:
\`\`\`

## Promotion Checklist

- The claim has a date.
- The claim has at least one proof source.
- The public wording is factual and calm.
- Sensitive context is removed.
- The item strengthens applied AI, technical depth, leadership, public impact, or academic excellence.
`,
  },
  {
    path: 'private/intake/tech-excellence.md',
    content: `# Tech Excellence Intake

Use this file for strengths, weaknesses, project candidates, deliberate practice, and weekly decisions. The goal is to make day-by-day work compound into visible technical proof.

## Current Strengths

\`\`\`text

\`\`\`

## Current Weaknesses

\`\`\`text

\`\`\`

## Project Candidate Scorecard

Copy one block per project idea.

\`\`\`text
Project:
Problem:
Why this matters now:
Expected proof artifact:
Expected metric:
Verifier or audience:
Technical depth score 1-5:
Proof potential score 1-5:
Personal fit score 1-5:
Distribution score 1-5:
Measurability score 1-5:
Verifier potential score 1-5:
Decision: build / park / drill
Next 48-hour action:
\`\`\`

## Rubik's Cube As Technical Proof

\`\`\`text
Current average:
Best single:
Practice cadence:
Potential artifact: timer dashboard / solver visualizer / computer vision recognizer / writeup
Proof needed:
Public-safe angle:
Next action:
\`\`\`

## Weekly Review

\`\`\`text
Week:
Primary proof target:
Skill drill:
What shipped:
Metric:
Proof:
What became public:
What stays private:
Next week's priority:
\`\`\`
`,
  },
  {
    path: 'private/intake/evidence-ledger.csv',
    content: 'date,title,context,claim,proof,metric,verifier,public_safe,career_signal,case_signal,strength,next_action\n',
  },
  {
    path: 'private/intake/verification-ledger.csv',
    content: 'title,metric,metric_source,verifier_name,verifier_role,verifier_org,verifier_contact,public_reference_allowed,status,next_action\n',
  },
]

let created = 0
let skipped = 0

for (const file of files) {
  const target = join(repoRoot, file.path)
  mkdirSync(dirname(target), { recursive: true })

  if (existsSync(target)) {
    skipped += 1
    continue
  }

  writeFileSync(target, file.content)
  created += 1
}

console.log(`Private baseline initialized. Created ${created} file(s), skipped ${skipped} existing file(s).`)
