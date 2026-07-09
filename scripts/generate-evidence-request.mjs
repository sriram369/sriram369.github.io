import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { normalizeBaselineRecord, readLedgerRecords, repoRoot } from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/evidence-request.md')

function missingItems(record) {
  const items = []

  if (!record.metric) items.push('Metric: score, rank, reach, usage, impact, class size, or measurable outcome.')
  if (!record.verifier) items.push('Verifier: professor, manager, teammate, admin, collaborator, or public source.')
  if (!record.proof) items.push('Proof: link, screenshot path, report, rubric, email, certificate, demo, or repository.')
  if (record.career_signal === 'Needs classification') items.push('Career signal: why this matters publicly.')
  if (record.case_signal === 'Needs private classification') items.push('Private review signal: which private review lane this supports.')
  if (record.public_safe !== 'yes') items.push('Public-safety decision: yes, no, or maybe.')

  return items
}

function formatRecord(record, index) {
  const missing = missingItems(record)
  const missingList = missing.length ? missing.map((item) => `- [ ] ${item}`).join('\n') : '- [x] No obvious missing fields.'

  return `## ${index + 1}. ${record.title || 'Untitled evidence'}

- Date: ${record.date || 'TBD'}
- Context: ${record.context || 'TBD'}
- Current strength: ${record.strength || 'raw'}
- Public safe: ${record.public_safe || 'TBD'}

Needed from Sriram:

${missingList}

Notes to paste here:

\`\`\`text

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
const recordsWithMissingItems = records.filter((record) => missingItems(record).length > 0)

const report = `# Evidence Request

Generated from \`private/intake/evidence-ledger.csv\`. This report is private and should not be published.

## Summary

- Total private records: ${records.length}
- Records needing Sriram input: ${recordsWithMissingItems.length}

## Requests

${recordsWithMissingItems.length ? recordsWithMissingItems.map(formatRecord).join('\n\n') : '- No missing evidence requests right now.'}
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, report)

console.log(`Evidence request generated at ${outputPath}`)
