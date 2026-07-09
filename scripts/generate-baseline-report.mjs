import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import {
  countBy,
  formatCounts,
  getHeaderIssues,
  normalizeBaselineRecord,
  readLedgerRecords,
  repoRoot,
} from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/baseline-report.md')

function formatRow(row, index) {
  return `## ${index + 1}. ${row.title || 'Untitled evidence'}

- Date: ${row.date || 'TBD'}
- Context: ${row.context || 'TBD'}
- Claim: ${row.claim || 'TBD'}
- Proof: ${row.proof || 'TBD'}
- Metric: ${row.metric || 'TBD'}
- Verifier: ${row.verifier || 'TBD'}
- Public safe: ${row.public_safe || 'TBD'}
- Career signal: ${row.career_signal || 'TBD'}
- Private review signal: ${row.case_signal || 'TBD'}
- Strength: ${row.strength || 'raw'}
- Next action: ${row.next_action || 'TBD'}`
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const { missingHeaders } = getHeaderIssues(ledger.headers, { allowLegacySignals: true })

if (missingHeaders.length > 0) {
  console.error(`Evidence ledger is missing required column(s): ${missingHeaders.join(', ')}`)
  process.exit(1)
}

const records = ledger.records.map(normalizeBaselineRecord)
const publicReady = records.filter((record) => record.public_safe.toLowerCase() === 'yes')
const needsReview = records.filter((record) => record.public_safe.toLowerCase() !== 'yes')

const report = `# SriramOS Baseline Report

Generated from \`private/intake/evidence-ledger.csv\`. This report is private and should not be published.

## Summary

- Total evidence records: ${records.length}
- Public-ready records: ${publicReady.length}
- Needs review/private records: ${needsReview.length}

## Strength

${records.length ? formatCounts(countBy(records, 'strength')) : '- No evidence records yet.'}

## Career Signals

${records.length ? formatCounts(countBy(records, 'career_signal')) : '- No evidence records yet.'}

## Private Review Signals

${records.length ? formatCounts(countBy(records, 'case_signal')) : '- No evidence records yet.'}

## Public-Ready Candidates

${publicReady.length ? publicReady.map(formatRow).join('\n\n') : '- No public-ready candidates yet.'}

## Needs Review Or Private

${needsReview.length ? needsReview.map(formatRow).join('\n\n') : '- No private or review-needed records yet.'}
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, report)

console.log(`Baseline report generated at ${outputPath}`)
