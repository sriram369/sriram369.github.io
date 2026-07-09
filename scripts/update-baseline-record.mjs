import { writeFileSync } from 'node:fs'
import {
  baselineHeaders,
  getHeaderIssues,
  ledgerPath,
  normalizeBaselineRecord,
  readLedgerRecords,
  serializeBaselineRecords,
} from './baseline-utils.mjs'

const allowedPublicSafe = new Set(['yes', 'no', 'maybe'])
const allowedStrengths = new Set(['strong', 'public', 'medium', 'weak', 'raw'])
const updatableFields = new Set([
  'date',
  'context',
  'claim',
  'proof',
  'metric',
  'verifier',
  'public_safe',
  'career_signal',
  'case_signal',
  'strength',
  'next_action',
])

function printUsage() {
  console.log(`Usage:
  npm run update:baseline -- --title "Existing title" --metric "100/100" --verifier "Professor Name" --dry-run

Useful flags:
  --date "2026-07-08"
  --context "Project or course"
  --claim "Updated claim"
  --proof "Link or local file path"
  --metric "Score, reach, users, rank, or other measure"
  --verifier "Professor, manager, teammate, admin, or collaborator"
  --public-safe yes|no|maybe
  --career-signal "Why this matters for the public story"
  --case-signal "Private review lane"
  --strength strong|public|medium|weak|raw
  --next-action "What makes this stronger"
  --dry-run`)
}

function parseArgs(argv) {
  const args = {}

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]

    if (token === '--dry-run') {
      args.dryRun = true
      continue
    }

    if (token === '--help' || token === '-h') {
      args.help = true
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

function normalizeValue(value) {
  return String(value ?? '').trim()
}

function requestedUpdates(args) {
  return Object.fromEntries(
    Object.entries(args)
      .filter(([key]) => updatableFields.has(key))
      .map(([key, value]) => [key, normalizeValue(value)]),
  )
}

function validateRecord(record) {
  const errors = []
  const publicSafe = record.public_safe?.toLowerCase()
  const strength = record.strength?.toLowerCase()

  if (!allowedPublicSafe.has(publicSafe)) {
    errors.push(`- Invalid public_safe value "${record.public_safe}". Use yes, no, or maybe.`)
  }

  if (!allowedStrengths.has(strength)) {
    errors.push(`- Invalid strength "${record.strength}". Use ${[...allowedStrengths].join(', ')}.`)
  }

  if (publicSafe === 'yes' && !record.proof) {
    errors.push('- Public-safe records need proof.')
  }

  if (['strong', 'public'].includes(strength) && !record.proof) {
    errors.push('- Strong/public records need proof.')
  }

  return errors
}

const args = parseArgs(process.argv.slice(2))

if (args.help) {
  printUsage()
  process.exit(0)
}

const title = normalizeValue(args.title)

if (!title) {
  console.error('Missing --title for the existing record to update.')
  printUsage()
  process.exit(1)
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const { missingHeaders } = getHeaderIssues(ledger.headers)

if (missingHeaders.length > 0) {
  console.error(`Evidence ledger is missing required column(s): ${missingHeaders.join(', ')}. Run \`npm run migrate:baseline\`.`)
  process.exit(1)
}

const updates = requestedUpdates(args)

if (Object.keys(updates).length === 0) {
  console.error('No update fields provided.')
  printUsage()
  process.exit(1)
}

const targetIndex = ledger.records.findIndex((record) => record.title?.trim() === title)

if (targetIndex === -1) {
  console.error(`No private baseline record found with title "${title}".`)
  process.exit(1)
}

const updatedRecord = normalizeBaselineRecord({
  ...ledger.records[targetIndex],
  ...updates,
})
const errors = validateRecord(updatedRecord)

if (errors.length > 0) {
  console.error(`Could not update baseline record:\n${errors.join('\n')}`)
  printUsage()
  process.exit(1)
}

const updatedRecords = ledger.records.map((record, index) =>
  index === targetIndex ? updatedRecord : normalizeBaselineRecord(record),
)

if (args.dryRun) {
  console.log(`Dry run: baseline record "${title}" is valid and was not written.`)
  baselineHeaders.forEach((header) => {
    console.log(`${header}: ${updatedRecord[header] ?? ''}`)
  })
  process.exit(0)
}

writeFileSync(ledgerPath, serializeBaselineRecords(updatedRecords))

console.log(`Updated private baseline record "${title}" in ${ledgerPath}`)
