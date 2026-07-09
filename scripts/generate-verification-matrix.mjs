import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import {
  escapeCsv,
  normalizeBaselineRecord,
  parseCsv,
  readLedgerRecords,
  recordsFromRows,
  repoRoot,
} from './baseline-utils.mjs'

const verificationLedgerPath = join(repoRoot, 'private/intake/verification-ledger.csv')
const outputPath = join(repoRoot, 'private/export/verification-matrix.md')
const verificationHeaders = [
  'title',
  'metric',
  'metric_source',
  'verifier_name',
  'verifier_role',
  'verifier_org',
  'verifier_contact',
  'public_reference_allowed',
  'status',
  'next_action',
]

function ensureVerificationLedger(records) {
  if (existsSync(verificationLedgerPath)) return

  const rows = [
    verificationHeaders.join(','),
    ...records.map((record) =>
      [
        record.title,
        '',
        '',
        '',
        '',
        '',
        '',
        'maybe',
        record.metric && record.verifier ? 'complete' : 'needed',
        record.metric && record.verifier ? 'Review for public copy.' : 'Add missing metric and verifier.',
      ]
        .map(escapeCsv)
        .join(','),
    ),
  ]

  mkdirSync(dirname(verificationLedgerPath), { recursive: true })
  writeFileSync(verificationLedgerPath, `${rows.join('\n')}\n`)
}

function readVerificationRows() {
  if (!existsSync(verificationLedgerPath)) return []

  const text = readFileSync(verificationLedgerPath, 'utf8')
  const { headers, records } = recordsFromRows(parseCsv(text))
  const missingHeaders = verificationHeaders.filter((header) => !headers.includes(header))

  if (missingHeaders.length > 0) {
    throw new Error(`Verification ledger is missing required column(s): ${missingHeaders.join(', ')}.`)
  }

  return records
}

function clean(value) {
  return String(value ?? '').trim()
}

function formatUpdateCommand(record, verification) {
  const metric = clean(verification.metric || record.metric)
  const verifierName = clean(verification.verifier_name)
  const verifierRole = clean(verification.verifier_role)
  const verifierOrg = clean(verification.verifier_org)
  const verifier = [verifierName, verifierRole, verifierOrg].filter(Boolean).join(', ')
  const existingProof = clean(record.proof)
  const metricSource = clean(verification.metric_source)

  if (!metric && !verifier) return '- Add metric and verifier before updating the baseline.'

  const flags = [
    `--title ${JSON.stringify(record.title)}`,
    metric ? `--metric ${JSON.stringify(metric)}` : '',
    verifier ? `--verifier ${JSON.stringify(verifier)}` : '',
    metricSource ? `--proof ${JSON.stringify(`${existingProof}${existingProof ? ' | ' : ''}Metric source: ${metricSource}`)}` : '',
    '--dry-run',
  ].filter(Boolean)

  return `\`\`\`bash\nnpm run update:baseline -- ${flags.join(' ')}\n\`\`\``
}

function formatRecord(record, verification, index) {
  const metric = clean(record.metric || verification.metric)
  const metricSource = clean(verification.metric_source)
  const verifier = clean(record.verifier || [verification.verifier_name, verification.verifier_role, verification.verifier_org].filter(Boolean).join(', '))
  const gaps = [
    metric ? '' : 'metric',
    verifier ? '' : 'verifier',
    metricSource ? '' : 'metric source',
  ].filter(Boolean)

  return `## ${index + 1}. ${record.title}

- Current baseline metric: ${record.metric || 'TBD'}
- Current baseline verifier: ${record.verifier || 'TBD'}
- Intake metric: ${verification.metric || 'TBD'}
- Metric source: ${verification.metric_source || 'TBD'}
- Intake verifier: ${verifier || 'TBD'}
- Public reference allowed: ${verification.public_reference_allowed || 'maybe'}
- Status: ${verification.status || (gaps.length ? 'needed' : 'ready')}
- Remaining gap: ${gaps.length ? gaps.join(', ') : 'none'}
- Next action: ${verification.next_action || (gaps.length ? 'Fill missing fields.' : 'Run dry-run update command and review.')}

Suggested baseline update:

${formatUpdateCommand(record, verification)}`
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const records = ledger.records.map(normalizeBaselineRecord)

try {
  ensureVerificationLedger(records)
  const verificationRows = readVerificationRows()
  const verificationByTitle = new Map(verificationRows.map((row) => [row.title, row]))
  const mergedRows = records.map((record) => ({
    record,
    verification: verificationByTitle.get(record.title) ?? {},
  }))
  const missingMetrics = mergedRows.filter(({ record, verification }) => !clean(record.metric || verification.metric))
  const missingVerifiers = mergedRows.filter(
    ({ record, verification }) =>
      !clean(record.verifier || [verification.verifier_name, verification.verifier_role, verification.verifier_org].filter(Boolean).join(', ')),
  )
  const missingSources = mergedRows.filter(({ verification }) => !clean(verification.metric_source))
  const readyToUpdate = mergedRows.filter(
    ({ record, verification }) =>
      (!record.metric || !record.verifier) &&
      clean(verification.metric) &&
      clean(verification.verifier_name),
  )

  const report = `# Verification Matrix

Generated from \`private/intake/evidence-ledger.csv\` and \`private/intake/verification-ledger.csv\`. This file is private and should not be published.

## Summary

- Evidence records: ${records.length}
- Records missing metric after intake: ${missingMetrics.length}
- Records missing verifier after intake: ${missingVerifiers.length}
- Records missing metric source after intake: ${missingSources.length}
- Records ready for baseline update from verification intake: ${readyToUpdate.length}

## How To Use

1. Fill \`private/intake/verification-ledger.csv\`.
2. Run \`npm run matrix:verification\`.
3. Preview completed rows with \`npm run apply:verification\`.
4. Apply completed rows with \`npm run apply:verification -- --apply\` only after the dry run looks right.
5. Run \`npm run preflight:evidence\`.

## Records

${mergedRows.map(({ record, verification }, index) => formatRecord(record, verification, index)).join('\n\n')}
`

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, report)

  console.log(`Verification matrix generated at ${outputPath}`)
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
