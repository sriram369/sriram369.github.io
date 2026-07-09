import { writeFileSync } from 'node:fs'
import {
  baselineHeaders,
  escapeCsv,
  getHeaderIssues,
  ledgerPath,
  readLedgerRecords,
} from './baseline-utils.mjs'

const allowedPublicSafe = new Set(['yes', 'no', 'maybe'])
const allowedStrengths = new Set(['strong', 'public', 'medium', 'weak', 'raw'])

function printUsage() {
  console.log(`Usage:
  npm run add:baseline -- --date "2026-07-08" --title "Achievement title" --context "Project or course" --claim "What happened"

Useful flags:
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

function buildRecord(args) {
  const proof = normalizeValue(args.proof)
  const publicSafe = normalizeValue(args.public_safe || 'maybe').toLowerCase()
  const strength = normalizeValue(args.strength || (proof ? 'weak' : 'raw')).toLowerCase()

  return {
    date: normalizeValue(args.date),
    title: normalizeValue(args.title),
    context: normalizeValue(args.context),
    claim: normalizeValue(args.claim),
    proof,
    metric: normalizeValue(args.metric),
    verifier: normalizeValue(args.verifier),
    public_safe: publicSafe,
    career_signal: normalizeValue(args.career_signal || 'Needs classification'),
    case_signal: normalizeValue(args.case_signal || 'Needs private classification'),
    strength,
    next_action: normalizeValue(args.next_action || 'Collect proof, metric, verifier, and public-safe wording.'),
  }
}

const args = parseArgs(process.argv.slice(2))

if (args.help) {
  printUsage()
  process.exit(0)
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

const record = buildRecord(args)
const errors = []

if (!record.date) errors.push('- Missing --date.')
if (!record.title) errors.push('- Missing --title.')
if (!record.context) errors.push('- Missing --context.')
if (!record.claim) errors.push('- Missing --claim.')
if (!allowedPublicSafe.has(record.public_safe)) errors.push(`- Invalid --public-safe "${record.public_safe}". Use yes, no, or maybe.`)
if (!allowedStrengths.has(record.strength)) errors.push(`- Invalid --strength "${record.strength}". Use ${[...allowedStrengths].join(', ')}.`)
if (record.public_safe === 'yes' && !record.proof) errors.push('- Public-safe records need --proof.')
if (['strong', 'public'].includes(record.strength) && !record.proof) errors.push('- Strong/public records need --proof.')

const duplicate = ledger.records.find((existing) => existing.title?.trim() === record.title)
if (duplicate) errors.push(`- A record titled "${record.title}" already exists.`)

if (errors.length > 0) {
  console.error(`Could not add baseline record:\n${errors.join('\n')}`)
  printUsage()
  process.exit(1)
}

const csvRow = baselineHeaders.map((header) => escapeCsv(record[header])).join(',')

if (args.dryRun) {
  console.log('Dry run: baseline record is valid and was not written.')
  console.log(csvRow)
  process.exit(0)
}

const needsNewline = ledger.text.length > 0 && !ledger.text.endsWith('\n')
writeFileSync(ledgerPath, `${ledger.text}${needsNewline ? '\n' : ''}${csvRow}\n`)

console.log(`Added private baseline record "${record.title}" to ${ledgerPath}`)
