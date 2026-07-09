import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { repoRoot } from './baseline-utils.mjs'

const allowedPublicSafe = new Set(['yes', 'no', 'maybe'])
const allowedStrengths = new Set(['strong', 'public', 'medium', 'weak', 'raw'])

function todayIso() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

function printUsage() {
  console.log(`Usage:
  npm run capture:daily -- --what "What happened today" --context "Project or course" --dry-run

Useful flags:
  --date "2026-07-08"
  --why "Why it matters"
  --proof "Link or local file path"
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

function clean(value) {
  return String(value ?? '').trim()
}

function captureText(entry) {
  return `## ${entry.date} - ${entry.context || 'Daily capture'}

Date: ${entry.date}
What happened: ${entry.what}
Project / context: ${entry.context || 'TBD'}
Why it matters: ${entry.why || 'TBD'}
Proof link or file: ${entry.proof || 'TBD'}
Who can verify: ${entry.verifier || 'TBD'}
Public-safe? ${entry.public_safe}
Career signal: ${entry.career_signal || 'TBD'}
Private review signal: ${entry.case_signal || 'TBD'}
Strength: ${entry.strength}
Next action to make it stronger: ${entry.next_action || 'TBD'}
`
}

const args = parseArgs(process.argv.slice(2))

if (args.help) {
  printUsage()
  process.exit(0)
}

const entry = {
  date: clean(args.date || todayIso()),
  what: clean(args.what),
  context: clean(args.context),
  why: clean(args.why),
  proof: clean(args.proof),
  verifier: clean(args.verifier),
  public_safe: clean(args.public_safe || 'maybe').toLowerCase(),
  career_signal: clean(args.career_signal),
  case_signal: clean(args.case_signal),
  strength: clean(args.strength || 'raw').toLowerCase(),
  next_action: clean(args.next_action),
}
const errors = []

if (!entry.date) errors.push('- Missing --date.')
if (!entry.what) errors.push('- Missing --what.')
if (!allowedPublicSafe.has(entry.public_safe)) errors.push(`- Invalid --public-safe "${entry.public_safe}". Use yes, no, or maybe.`)
if (!allowedStrengths.has(entry.strength)) errors.push(`- Invalid --strength "${entry.strength}". Use ${[...allowedStrengths].join(', ')}.`)
if (entry.public_safe === 'yes' && !entry.proof) errors.push('- Public-safe daily captures need proof.')
if (['strong', 'public'].includes(entry.strength) && !entry.proof) errors.push('- Strong/public daily captures need proof.')

if (errors.length > 0) {
  console.error(`Could not capture daily evidence:\n${errors.join('\n')}`)
  printUsage()
  process.exit(1)
}

const outputPath = join(repoRoot, 'private/intake/daily', `${entry.date}.md`)
const text = captureText(entry)

if (args.dryRun) {
  console.log(`Dry run: daily capture is valid and was not written to ${outputPath}.`)
  console.log('')
  console.log(text)
  process.exit(0)
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, text, { flag: 'a' })

console.log(`Daily capture appended to ${outputPath}`)
