import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { achievements } from '../src/data/achievements.js'
import { countBy, formatCounts, normalizeBaselineRecord, readLedgerRecords, repoRoot } from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/tech-excellence-plan.md')
const dailyCaptureRoot = join(repoRoot, 'private/intake/daily')

const pillars = [
  {
    name: 'Applied AI systems',
    standard: 'Ship projects that solve concrete problems with retrieval, agents, evaluation, multimodal UX, or automation.',
  },
  {
    name: 'Public engineering proof',
    standard: 'Keep a visible trail: repositories, merged PRs, demos, writeups, issue discussions, benchmarks, or release notes.',
  },
  {
    name: 'Product taste and distribution',
    standard: 'Turn technical work into something people can understand, try, share, and judge.',
  },
  {
    name: 'Measurable impact',
    standard: 'Attach numbers: users, latency, accuracy, scores, reach, class size, stars, downloads, evaluation results, or rankings.',
  },
  {
    name: 'Leadership and communication',
    standard: 'Create proof that Sriram can lead projects, explain decisions, coordinate people, and raise the quality bar.',
  },
  {
    name: 'Speed and cognitive edge',
    standard: 'Use Rubik\'s cube, competitions, debugging speed, and daily drills only when they become visible technical artifacts.',
  },
]

function readDailyCaptures() {
  if (!existsSync(dailyCaptureRoot)) return []

  return readdirSync(dailyCaptureRoot)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const path = join(dailyCaptureRoot, file)
      return {
        file,
        text: readFileSync(path, 'utf8'),
      }
    })
}

function formatPillars() {
  return pillars.map((pillar) => `### ${pillar.name}\n\n${pillar.standard}`).join('\n\n')
}

function missingProofActions(records) {
  return records
    .filter((record) => !record.metric || !record.verifier || !record.proof)
    .map((record) => {
      const gaps = [
        !record.metric ? 'metric' : '',
        !record.verifier ? 'verifier' : '',
        !record.proof ? 'proof' : '',
      ].filter(Boolean)

      return `- ${record.title}: add ${gaps.join(', ')}.`
    })
}

function formatSignalCounts(records) {
  if (!records.length) return '- No private evidence records yet.'
  return formatCounts(countBy(records, 'career_signal'))
}

function formatDailySummary(captures) {
  if (!captures.length) {
    return `- Daily captures found: 0
- Next action: use \`npm run capture:daily -- --what "..." --context "..."\` after meaningful work.`
  }

  return `- Daily captures found: ${captures.length}
- Latest capture file: \`private/intake/daily/${captures.at(-1).file}\``
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const records = ledger.records.map(normalizeBaselineRecord)
const dailyCaptures = readDailyCaptures()
const proofActions = missingProofActions(records)
const missingMetrics = records.filter((record) => !record.metric).length
const missingVerifiers = records.filter((record) => !record.verifier).length
const rawOrWeak = records.filter((record) => ['raw', 'weak'].includes(record.strength.toLowerCase())).length

const report = `# Tech Excellence Plan

Generated from the private baseline and public achievement data. This file is private and should not be published.

## North Star

Make every serious week produce one of three things:

- A stronger public proof artifact.
- A stronger private evidence record.
- A sharper skill that helps Sriram build better systems faster.

## Current Snapshot

- Public achievements: ${achievements.length}
- Private evidence records: ${records.length}
- Records missing metrics: ${missingMetrics}
- Records missing verifiers: ${missingVerifiers}
- Raw or weak private records: ${rawOrWeak}
${formatDailySummary(dailyCaptures)}

## Pillars

${formatPillars()}

## Career Signal Mix

${formatSignalCounts(records)}

## Project Decision Scorecard

Score each candidate from 1 to 5 before committing a serious build week.

| Dimension | What A 5 Means |
| --- | --- |
| Technical depth | Uses a hard, current engineering problem rather than a shallow wrapper. |
| Proof potential | Can produce a public repo, demo, benchmark, writeup, or outside validation. |
| Personal fit | Connects to Sriram's actual story: AI systems, data, finance, accessibility, education, or leadership. |
| Distribution | Has a realistic path to users, collaborators, community attention, or evaluator feedback. |
| Measurability | Can be judged with numbers: accuracy, latency, users, score, reach, saved time, or adoption. |
| Verifier potential | A professor, manager, maintainer, teammate, user, or public artifact can confirm the work. |

Choose projects with a total score of 22 or higher, unless the project is a deliberate short drill.

## Weekly Operating Loop

1. Monday: choose one primary proof target and one skill drill.
2. Tuesday to Thursday: build in public-safe increments, with commits and notes.
3. Friday: produce proof: demo, README, benchmark, screenshot, short writeup, merged PR, or user feedback.
4. Saturday: capture the evidence privately and decide whether it can become public.
5. Sunday: refresh the baseline and pick the next highest-leverage gap.

## Next Four Missions

### Mission 1: Harden Existing Evidence

Goal: turn current public achievements into stronger proof cards.

${proofActions.length ? proofActions.join('\n') : '- No immediate proof gaps found in the private ledger.'}

### Mission 2: Build One Flagship AI Project

Goal: ship a project with a repo, demo, benchmarks, and a short public writeup.

Recommended constraints:

- Must solve a real workflow problem.
- Must include an evaluation section.
- Must have a clean demo path in under two minutes.
- Must generate at least one metric worth publishing.

### Mission 3: Convert Rubik's Cube Into Technical Proof

Goal: make the speed/problem-solving signal inspectable instead of anecdotal.

Good artifact options:

- Timer dashboard with solve history and charts.
- Computer vision cube-state recognizer.
- Solver visualizer with algorithm explanations.
- Short writeup connecting deliberate practice, pattern recognition, and debugging.

### Mission 4: Public Contribution Habit

Goal: earn one visible external signal each month.

Target forms:

- Merged open-source PR.
- Accepted issue triage or reproduction.
- Technical writeup referenced by others.
- Demo feedback from a professor, maintainer, founder, or practitioner.

## Daily Capture Prompt

Use this after meaningful work:

\`\`\`bash
npm run capture:daily -- \\
  --what "What changed today" \\
  --context "Project, course, repo, or role" \\
  --why "Why it matters" \\
  --proof "Link or local file path" \\
  --verifier "Who can confirm this" \\
  --career-signal "Technical depth, leadership, impact, public contribution, or academic excellence" \\
  --strength raw \\
  --dry-run
\`\`\`

## Project Intake Block

Copy this into \`private/intake/tech-excellence.md\` when considering a new project:

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
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, report)

console.log(`Tech excellence plan generated at ${outputPath}`)
