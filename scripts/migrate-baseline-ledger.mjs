import { writeFileSync } from 'node:fs'
import {
  baselineHeaders,
  escapeCsv,
  ledgerPath,
  legacySignalHeader,
  normalizeBaselineRecord,
  readLedgerRecords,
} from './baseline-utils.mjs'

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const migratedRows = ledger.records.map((record) => {
  const normalized = normalizeBaselineRecord(record)

  return {
    date: normalized.date,
    title: normalized.title,
    context: normalized.context,
    claim: normalized.claim,
    proof: normalized.proof,
    metric: normalized.metric,
    verifier: normalized.verifier,
    public_safe: normalized.public_safe,
    career_signal: normalized.career_signal || record[legacySignalHeader],
    case_signal: normalized.case_signal,
    strength: normalized.strength,
    next_action: normalized.next_action,
  }
})

const migratedCsv = [
  baselineHeaders.join(','),
  ...migratedRows.map((row) => baselineHeaders.map((header) => escapeCsv(row[header])).join(',')),
].join('\n')

writeFileSync(ledgerPath, `${migratedCsv}\n`)

console.log(`Migrated private evidence ledger to modern schema with ${migratedRows.length} record(s).`)
