import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { normalizeBaselineRecord, readLedgerRecords, repoRoot } from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/next-batch-request.md')

function gapList(record) {
  return [
    !record.metric ? 'metric' : '',
    !record.verifier ? 'verifier' : '',
    !record.proof ? 'proof' : '',
    record.public_safe !== 'yes' ? 'public-safety decision' : '',
  ].filter(Boolean)
}

function formatGapRows(records) {
  const rows = records
    .map((record) => ({ record, gaps: gapList(record) }))
    .filter((item) => item.gaps.length > 0)

  if (!rows.length) return '| Record | Needed |\n| --- | --- |\n| No obvious gaps | Ready for review |'

  return [
    '| Record | Needed |',
    '| --- | --- |',
    ...rows.map(({ record, gaps }) => `| ${record.title || 'Untitled'} | ${gaps.join(', ')} |`),
  ].join('\n')
}

function formatPasteBlock(title, fields) {
  return `### ${title}

\`\`\`text
${fields.map((field) => (field.endsWith(':') ? field : `${field}:`)).join('\n')}
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
const missingMetricCount = records.filter((record) => !record.metric).length
const missingVerifierCount = records.filter((record) => !record.verifier).length
const missingProofCount = records.filter((record) => !record.proof).length

const report = `# Next Batch Request

Generated from \`private/intake/evidence-ledger.csv\`. This file is private and should not be published.

## Send Codex This Next

Paste or upload the next batch in this order:

1. Johns Hopkins proof packet.
2. Metrics and verifiers for existing public achievements.
3. One tech excellence project candidate or weekly review.

## Current Gaps

- Records missing metrics: ${missingMetricCount}
- Records missing verifiers: ${missingVerifierCount}
- Records missing proof: ${missingProofCount}

${formatGapRows(records)}

## Batch 1: Johns Hopkins Proof Packet

${formatPasteBlock('Transcript / Course Standing', [
  'Transcript or grade proof path/link',
  'Course name and term',
  'Final grade or score',
  'Class size or comparison group, if known',
  'Public-safe wording allowed? yes / no / maybe',
  'Who can verify this',
])}

${formatPasteBlock('AuraPath', [
  'Report path/link',
  'Slides path/link',
  'Rubric or score proof',
  '100/100 proof source',
  'Professor feedback or quote source',
  'Team size',
  'Sriram exact role',
  'Public-safe wording allowed? yes / no / maybe',
])}

${formatPasteBlock('Top-Performance Claim', [
  'Exact claim wording',
  'Ranking or score proof',
  'Class size or comparison group',
  'Professor/admin confirmation',
  'Safer alternate wording if exact rank is not provable',
])}

${formatPasteBlock('JHU Social Media Head', [
  'Appointment or role proof',
  'Role description',
  'LinkedIn follower/reach metric proof',
  'Instagram follower/reach metric proof',
  'Campaign examples led by Sriram',
  'Admin or faculty verifier',
  'Public-safe wording allowed? yes / no / maybe',
])}

## Batch 2: Existing Public Achievement Hardening

For each existing public achievement, send the missing fields from the table above:

You can paste this block in chat, or fill \`private/intake/verification-ledger.csv\` and run \`npm run matrix:verification\`.
To draft private verifier requests, run \`npm run outreach:verifiers\`.

${formatPasteBlock('Achievement Hardening', [
  'Achievement title',
  'Metric',
  'Verifier',
  'Proof path/link',
  'Public-safe wording allowed? yes / no / maybe',
  'Correction to current public wording, if any',
])}

## Batch 3: Tech Excellence Candidate

${formatPasteBlock('Project Candidate', [
  'Project',
  'Problem',
  'Why this matters now',
  'Expected proof artifact',
  'Expected metric',
  'Verifier or audience',
  'Technical depth score 1-5',
  'Proof potential score 1-5',
  'Personal fit score 1-5',
  'Distribution score 1-5',
  'Measurability score 1-5',
  'Verifier potential score 1-5',
  'Decision (build / park / drill)',
  'Next 48-hour action',
])}

## What Codex Will Do With It

- Convert raw notes into private ledger rows.
- Decide what is public-safe and what stays private.
- Update existing records with metrics, proof, and verifiers.
- Generate promotion candidates for anything ready.
- Draft calm public website copy only after proof exists.
- Re-run the full evidence preflight.
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, report)

console.log(`Next batch request generated at ${outputPath}`)
