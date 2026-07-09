import { achievements } from '../src/data/achievements.js'
import { normalizeBaselineRecord, readLedgerRecords } from './baseline-utils.mjs'

const publicTitles = new Set(achievements.map((achievement) => achievement.title))
const promotableStrengths = new Set(['strong', 'public'])

function isPromotable(record) {
  return (
    record.public_safe.toLowerCase() === 'yes' &&
    Boolean(record.proof) &&
    promotableStrengths.has(record.strength.toLowerCase()) &&
    !publicTitles.has(record.title)
  )
}

function countBy(records, predicate) {
  return records.filter(predicate).length
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const records = ledger.records.map(normalizeBaselineRecord)
const alreadyPublic = countBy(records, (record) => publicTitles.has(record.title))
const readyToPromote = countBy(records, isPromotable)
const missingMetrics = countBy(records, (record) => !record.metric)
const missingVerifiers = countBy(records, (record) => !record.verifier)
const rawOrWeak = countBy(records, (record) => ['raw', 'weak'].includes(record.strength.toLowerCase()))
const needsClassification = countBy(
  records,
  (record) => record.career_signal === 'Needs classification' || record.case_signal === 'Needs private classification',
)

console.log('Evidence status')
console.log('')
console.log(`Public achievements: ${achievements.length}`)
console.log(`Private evidence records: ${records.length}`)
console.log(`Already public from private ledger: ${alreadyPublic}`)
console.log(`Ready to promote: ${readyToPromote}`)
console.log(`Raw or weak records: ${rawOrWeak}`)
console.log(`Records missing metrics: ${missingMetrics}`)
console.log(`Records missing verifiers: ${missingVerifiers}`)
console.log(`Records needing classification: ${needsClassification}`)
console.log('')
console.log('Useful next commands:')
console.log('- npm run refresh:baseline')
console.log('- npm run request:next')
console.log('- npm run outreach:verifiers')
console.log('- npm run matrix:verification')
console.log('- npm run apply:verification')
console.log('- npm run promotion:baseline')
console.log('- npm run plan:tech')
console.log('- npm run verify')

if (readyToPromote > 0) {
  console.log('')
  console.log('Next action: review private/export/promotion-candidates.md and promote only public-safe rows.')
} else if (missingMetrics > 0 || missingVerifiers > 0) {
  console.log('')
  console.log('Next action: run `npm run request:next` and collect the requested metrics and verifier names.')
} else {
  console.log('')
  console.log('Next action: add the next evidence batch with npm run add:baseline.')
}
