import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { achievements } from '../src/data/achievements.js'
import { normalizeBaselineRecord, parseCsv, readLedgerRecords, recordsFromRows, repoRoot } from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/readiness-snapshot.md')
const verificationLedgerPath = join(repoRoot, 'private/intake/verification-ledger.csv')
const publicTitles = new Set(achievements.map((achievement) => achievement.title))

function runGit(args) {
  const result = spawnSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8',
  })

  if (result.status !== 0) return ''
  return result.stdout.trim()
}

function isPromotable(record) {
  return (
    record.public_safe.toLowerCase() === 'yes' &&
    Boolean(record.proof) &&
    ['strong', 'public'].includes(record.strength.toLowerCase()) &&
    !publicTitles.has(record.title)
  )
}

function check(value) {
  return value ? '[x]' : '[ ]'
}

function formatList(items, emptyText) {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : `- ${emptyText}`
}

function clean(value) {
  return String(value ?? '').trim()
}

function readVerificationRows() {
  if (!existsSync(verificationLedgerPath)) return []
  return recordsFromRows(parseCsv(readFileSync(verificationLedgerPath, 'utf8'))).records
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const records = ledger.records.map(normalizeBaselineRecord)
const alreadyPublic = records.filter((record) => publicTitles.has(record.title)).length
const readyToPromote = records.filter(isPromotable).length
const missingMetrics = records.filter((record) => !record.metric)
const missingVerifiers = records.filter((record) => !record.verifier)
const rawOrWeak = records.filter((record) => ['raw', 'weak'].includes(record.strength.toLowerCase()))
const verificationRows = readVerificationRows()
const verificationByTitle = new Map(verificationRows.map((row) => [row.title, row]))
const readyFromVerificationIntake = records.filter((record) => {
  const verification = verificationByTitle.get(record.title)
  return (
    verification &&
    (!record.metric || !record.verifier) &&
    clean(verification.metric) &&
    clean(verification.verifier_name)
  )
})
const trackedPrivateFiles = runGit(['ls-files', 'private']).split('\n').filter(Boolean)
const statusLines = runGit(['status', '--short']).split('\n').filter(Boolean)
const branch = runGit(['branch', '--show-current']) || 'unknown'
const hasLocalChanges = statusLines.length > 0
const hasTrackedPrivateFiles = trackedPrivateFiles.length > 0

const readinessChecks = [
  ['Public achievement data exists', achievements.length > 0],
  ['Private ledger exists and can be read', records.length > 0],
  ['Private files are not tracked', !hasTrackedPrivateFiles],
  ['All current public achievements are seeded privately', alreadyPublic === achievements.length],
  ['No new private records are waiting for public promotion', readyToPromote === 0],
  ['Existing records have metrics', missingMetrics.length === 0],
  ['Existing records have verifiers', missingVerifiers.length === 0],
  ['No raw or weak private records need triage', rawOrWeak.length === 0],
  ['Local changes are committed', !hasLocalChanges],
]

const report = `# Readiness Snapshot

Generated from the current local repo, public achievement data, and private evidence ledger. This file is private and should not be published.

## Summary

- Current branch: ${branch}
- Public achievements: ${achievements.length}
- Private evidence records: ${records.length}
- Already public from private ledger: ${alreadyPublic}
- Ready to promote: ${readyToPromote}
- Records missing metrics: ${missingMetrics.length}
- Records missing verifiers: ${missingVerifiers.length}
- Records ready for baseline update from verification intake: ${readyFromVerificationIntake.length}
- Raw or weak records: ${rawOrWeak.length}
- Local git changes: ${statusLines.length}
- Tracked private files: ${trackedPrivateFiles.length}

## Current Readiness

${readinessChecks.map(([label, passed]) => `- ${check(passed)} ${label}`).join('\n')}

## Ship Interpretation

- Local build readiness: run \`npm run preflight:evidence\` and require it to pass before publishing.
- Public evidence strength: not complete until existing records have metrics and verifier names.
- Live readiness: not complete until Sriram approves, changes are committed, pushed, deployed, and the live site is checked.

## Evidence Gaps To Fix Next

### Missing Metrics

${formatList(missingMetrics.map((record) => record.title), 'No metric gaps right now.')}

### Missing Verifiers

${formatList(missingVerifiers.map((record) => record.title), 'No verifier gaps right now.')}

### Raw Or Weak Records

${formatList(rawOrWeak.map((record) => record.title), 'No raw or weak records right now.')}

### Ready From Verification Intake

${formatList(readyFromVerificationIntake.map((record) => record.title), 'No verifier/metric intake rows are ready to apply right now.')}

## Publication Blockers

${formatList(
  [
    hasLocalChanges ? 'Local changes are not committed.' : '',
    readyToPromote > 0 ? 'New ready-to-promote private records need public review.' : '',
    readyFromVerificationIntake.length > 0 ? 'Verifier/metric intake has completed rows that need baseline updates.' : '',
    missingMetrics.length > 0 ? 'Current public records still need stronger metrics.' : '',
    missingVerifiers.length > 0 ? 'Current public records still need verifier names.' : '',
    hasTrackedPrivateFiles ? 'Private files are tracked by git and must be removed from tracking.' : '',
  ].filter(Boolean),
  'No local publication blockers detected by this snapshot.',
)}

## Next Commands

\`\`\`bash
npm run request:next
npm run preflight:evidence
npm run check:evidence-links
\`\`\`
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, report)

console.log(`Readiness snapshot generated at ${outputPath}`)
