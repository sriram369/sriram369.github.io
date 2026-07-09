import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { normalizeBaselineRecord, readLedgerRecords, repoRoot } from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/verifier-outreach.md')

const verifierHintsByTitle = {
  'Merged production fix into OpenClaw': {
    verifier: 'OpenClaw maintainer, PR reviewer, or project lead',
    metric: 'merged PR number, tests added, bug class prevented, issue/user impact, or release note reference',
  },
  'Social Media Head for Johns Hopkins DC Campus': {
    verifier: 'JHU Carey DC Campus supervisor, administrator, faculty advisor, or communications lead',
    metric: 'audience size, reach, impressions, follower growth, campaigns led, events supported, or posting cadence',
  },
  'Built AuraPath and earned a 100/100 evaluation': {
    verifier: 'course professor, teaching assistant, evaluator, or teammate who can confirm Sriram\'s role',
    metric: '100/100 proof, rubric category, team size, class size, evaluation quote, or demo outcome',
  },
  'Shipped FinRAG Analyst for cited SEC filing answers': {
    verifier: 'technical reviewer, collaborator, user, professor, or practitioner who tested the demo',
    metric: 'documents ingested, answer quality result, latency, retrieval/evaluation score, demo usage, or benchmark',
  },
  'Worked on multilingual LLM systems at Ola Krutrim AI': {
    verifier: 'manager, mentor, team lead, or coworker at Krutrim',
    metric: 'project scope, language coverage, evaluation result, model/prompt task volume, or responsibility level',
  },
  'Built Ikshana during the NUS exchange program': {
    verifier: 'NUS instructor, program coordinator, teammate, or evaluator',
    metric: 'demo result, model result, accessibility use case, team size, final score, or presentation feedback',
  },
  'Completed UPI fraud detection capstone': {
    verifier: 'VIT capstone guide, professor, teammate, or evaluator',
    metric: 'model accuracy, precision/recall/F1, dataset size, grade, rubric result, or presentation feedback',
  },
}

function clean(value) {
  return String(value ?? '').trim()
}

function hintFor(record) {
  return verifierHintsByTitle[record.title] ?? {
    verifier: 'professor, manager, teammate, collaborator, user, maintainer, or public source',
    metric: 'score, rank, usage, reach, adoption, quality result, class size, or measurable outcome',
  }
}

function needsOutreach(record) {
  return !clean(record.metric) || !clean(record.verifier)
}

function formatMessage(record) {
  const hint = hintFor(record)

  return `## ${record.title}

- Date/context: ${record.date || 'TBD'} / ${record.context || 'TBD'}
- Current proof: ${record.proof || 'TBD'}
- Suggested verifier type: ${hint.verifier}
- Metric to request: ${hint.metric}
- Current gap: ${[
    !clean(record.metric) ? 'metric' : '',
    !clean(record.verifier) ? 'verifier' : '',
  ].filter(Boolean).join(', ')}

### Short Message Draft

\`\`\`text
Hi [Name],

I am organizing a private evidence record for my professional portfolio and would be grateful if you could help me verify one item:

${record.title}

My current summary is:
${record.claim || 'TBD'}

Could you confirm whether this is accurate from your perspective, and if possible share one measurable detail I can record privately? Useful details could include: ${hint.metric}.

Also, please let me know whether I may list you privately as someone who can verify this work, and whether any public wording is allowed.

Thank you,
Sriram
\`\`\`

### Fields To Capture After Reply

\`\`\`text
Achievement title: ${record.title}
Metric:
Metric source:
Verifier name:
Verifier role:
Verifier organization:
Verifier contact:
Public reference allowed? yes / no / maybe:
Notes:
\`\`\``
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const records = ledger.records.map(normalizeBaselineRecord)
const outreachRecords = records.filter(needsOutreach)

const report = `# Verifier Outreach Packet

Generated from \`private/intake/evidence-ledger.csv\`. This file is private and should not be published.

## Summary

- Evidence records: ${records.length}
- Records needing outreach: ${outreachRecords.length}

## How To Use

1. Pick the highest-priority record.
2. Replace bracketed placeholders in the draft.
3. Send only what is appropriate for that person.
4. Paste the reply details into \`private/intake/verification-ledger.csv\`.
5. Run \`npm run matrix:verification\`.
6. Preview updates with \`npm run apply:verification\`.

## Outreach Drafts

${outreachRecords.length ? outreachRecords.map(formatMessage).join('\n\n') : '- No verifier outreach needed right now.'}
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, report)

console.log(`Verifier outreach packet generated at ${outputPath}`)
