import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  getHeaderIssues,
  ledgerPath,
  normalizeBaselineRecord,
  parseCsv,
  readLedgerRecords,
  recordsFromRows,
  repoRoot,
  serializeBaselineRecords,
} from './baseline-utils.mjs'

const verificationLedgerPath = join(repoRoot, 'private/intake/verification-ledger.csv')
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

function printUsage() {
  console.log(`Usage:
  npm run apply:verification
  npm run apply:verification -- --apply

Default behavior is a dry run. Useful flags:
  --title "Existing title"
  --overwrite
  --apply`)
}

function parseArgs(argv) {
  const args = {}

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]

    if (token === '--help' || token === '-h') {
      args.help = true
      continue
    }

    if (token === '--apply') {
      args.apply = true
      continue
    }

    if (token === '--overwrite') {
      args.overwrite = true
      continue
    }

    if (!token.startsWith('--')) continue

    const key = token.slice(2).replaceAll('-', '_')
    const next = argv[index + 1]

    if (!next || next.startsWith('--')) {
      args[key] = ''
      continue
    }

    args[key] = next
    index += 1
  }

  return args
}

function clean(value) {
  return String(value ?? '').trim()
}

function readVerificationRows() {
  if (!existsSync(verificationLedgerPath)) {
    throw new Error('Missing verification ledger. Run `npm run matrix:verification` first.')
  }

  const text = readFileSync(verificationLedgerPath, 'utf8')
  const { headers, records } = recordsFromRows(parseCsv(text))
  const missingHeaders = verificationHeaders.filter((header) => !headers.includes(header))

  if (missingHeaders.length > 0) {
    throw new Error(`Verification ledger is missing required column(s): ${missingHeaders.join(', ')}.`)
  }

  return records
}

function formatVerifier(row) {
  return [row.verifier_name, row.verifier_role, row.verifier_org].map(clean).filter(Boolean).join(', ')
}

function appendMetricSource(existingProof, metricSource) {
  const existing = clean(existingProof)
  const source = clean(metricSource)

  if (!source) return existing

  const sourceText = `Metric source: ${source}`
  if (existing.includes(sourceText)) return existing

  return `${existing}${existing ? ' | ' : ''}${sourceText}`
}

function completeVerificationRows(rows) {
  return rows.filter((row) => clean(row.title) && clean(row.metric) && clean(row.verifier_name))
}

const args = parseArgs(process.argv.slice(2))

if (args.help) {
  printUsage()
  process.exit(0)
}

let ledger
let verificationRows

try {
  ledger = readLedgerRecords()
  verificationRows = readVerificationRows()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const { missingHeaders } = getHeaderIssues(ledger.headers)

if (missingHeaders.length > 0) {
  console.error(`Evidence ledger is missing required column(s): ${missingHeaders.join(', ')}. Run \`npm run migrate:baseline\`.`)
  process.exit(1)
}

const titleFilter = clean(args.title)
const baselineByTitle = new Map(ledger.records.map((record, index) => [record.title, { record, index }]))
const completedRows = completeVerificationRows(verificationRows).filter((row) => !titleFilter || row.title === titleFilter)
const errors = []
const updates = []

for (const row of completedRows) {
  const baselineMatch = baselineByTitle.get(row.title)

  if (!baselineMatch) {
    errors.push(`- Verification row title "${row.title}" does not match a private baseline record.`)
    continue
  }

  const current = normalizeBaselineRecord(baselineMatch.record)
  const verifier = formatVerifier(row)
  const metric = clean(row.metric)
  const shouldUpdateMetric = args.overwrite || !clean(current.metric)
  const shouldUpdateVerifier = args.overwrite || !clean(current.verifier)
  const shouldUpdateProof = Boolean(clean(row.metric_source))

  if (!shouldUpdateMetric && !shouldUpdateVerifier && !shouldUpdateProof) {
    continue
  }

  const updated = {
    ...current,
    metric: shouldUpdateMetric ? metric : current.metric,
    verifier: shouldUpdateVerifier ? verifier : current.verifier,
    proof: shouldUpdateProof ? appendMetricSource(current.proof, row.metric_source) : current.proof,
    next_action: 'Review public copy, rerun preflight, and decide whether this strengthens the public achievement card.',
  }

  updates.push({
    title: row.title,
    index: baselineMatch.index,
    before: current,
    after: updated,
    changedFields: [
      shouldUpdateMetric ? 'metric' : '',
      shouldUpdateVerifier ? 'verifier' : '',
      shouldUpdateProof ? 'proof' : '',
      'next_action',
    ].filter(Boolean),
  })
}

if (errors.length > 0) {
  console.error(`Could not apply verification updates:\n${errors.join('\n')}`)
  process.exit(1)
}

if (updates.length === 0) {
  const scope = titleFilter ? ` for "${titleFilter}"` : ''
  console.log(`No completed verification updates${scope}. Fill metric and verifier_name in ${verificationLedgerPath}.`)
  process.exit(0)
}

console.log(`${args.apply ? 'Applying' : 'Dry run: would apply'} ${updates.length} verification update(s).`)
console.log('')

for (const update of updates) {
  console.log(`- ${update.title}: ${update.changedFields.join(', ')}`)
  console.log(`  metric: ${update.before.metric || 'TBD'} -> ${update.after.metric || 'TBD'}`)
  console.log(`  verifier: ${update.before.verifier || 'TBD'} -> ${update.after.verifier || 'TBD'}`)
}

if (!args.apply) {
  console.log('')
  console.log('No files were changed. Re-run with `-- --apply` to update the private baseline ledger.')
  process.exit(0)
}

const updatedRecords = ledger.records.map((record) => normalizeBaselineRecord(record))

for (const update of updates) {
  updatedRecords[update.index] = update.after
}

writeFileSync(ledgerPath, serializeBaselineRecords(updatedRecords))

console.log('')
console.log(`Updated ${updates.length} private baseline record(s) in ${ledgerPath}`)
