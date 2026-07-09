import { writeFileSync } from 'node:fs'
import { achievements } from '../src/data/achievements.js'
import {
  caseSignalsByAchievementId,
  escapeCsv,
  getHeaderIssues,
  ledgerPath,
  legacySignalHeader,
  readLedgerRecords,
} from './baseline-utils.mjs'

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

const existingTitles = new Set(ledger.records.map((record) => record.title?.trim()).filter(Boolean))

const rowsToAppend = achievements
  .filter((achievement) => !existingTitles.has(achievement.title))
  .map((achievement) => ({
    date: achievement.date,
    title: achievement.title,
    context: `${achievement.category}; ${achievement.tags.join('; ')}`,
    claim: achievement.summary,
    proof: [
      `Public anchor: #achievements/${achievement.id}`,
      `Proof level: ${achievement.proof.level}`,
      `Proof types: ${achievement.proof.types.join('; ')}`,
      ...achievement.links.map((link) => `${link.label}: ${link.href}`),
    ].join(' | '),
    metric: '',
    verifier: '',
    public_safe: 'yes',
    career_signal: achievement.signal,
    case_signal: caseSignalsByAchievementId[achievement.id] ?? 'Needs private classification',
    [legacySignalHeader]: achievement.signal,
    strength: achievement.proof.level,
    next_action: 'Collect private corroboration, screenshots, and verifier details before case use.',
  }))

if (rowsToAppend.length === 0) {
  console.log('Private evidence ledger already includes all public achievements. Added 0 row(s).')
  process.exit(0)
}

const appendedCsv = rowsToAppend
  .map((row) => ledger.headers.map((header) => escapeCsv(row[header])).join(','))
  .join('\n')
const needsNewline = ledger.text.length > 0 && !ledger.text.endsWith('\n')

writeFileSync(ledgerPath, `${ledger.text}${needsNewline ? '\n' : ''}${appendedCsv}\n`)

console.log(`Seeded ${rowsToAppend.length} public achievement row(s) into ${ledgerPath}`)
