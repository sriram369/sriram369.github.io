import { getHeaderIssues, readLedgerRecords } from './baseline-utils.mjs'

const allowedPublicSafe = new Set(['yes', 'no', 'maybe'])
const allowedStrengths = new Set(['strong', 'public', 'medium', 'weak', 'raw'])
const requiredFields = [
  'date',
  'title',
  'context',
  'claim',
  'public_safe',
  'career_signal',
  'case_signal',
  'strength',
  'next_action',
]
const errors = []
const warnings = []

function addError(message) {
  errors.push(`- ${message}`)
}

function addWarning(message) {
  warnings.push(`- ${message}`)
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const { missingHeaders, unexpectedHeaders } = getHeaderIssues(ledger.headers)

if (missingHeaders.length > 0) {
  addError(`Evidence ledger is missing required column(s): ${missingHeaders.join(', ')}. Run \`npm run migrate:baseline\`.`)
}

if (unexpectedHeaders.length > 0) {
  addWarning(`Evidence ledger has extra column(s): ${unexpectedHeaders.join(', ')}.`)
}

const seenTitles = new Map()

ledger.records.forEach((values, rowIndex) => {
  const lineNumber = rowIndex + 2
  const label = values.title ? `line ${lineNumber} "${values.title}"` : `line ${lineNumber}`

  requiredFields.forEach((field) => {
    if (!values[field]) addError(`${label} is missing "${field}".`)
  })

  if (values.title) {
    if (seenTitles.has(values.title)) {
      addError(`${label} duplicates title from line ${seenTitles.get(values.title)}.`)
    }
    seenTitles.set(values.title, lineNumber)
  }

  const publicSafe = values.public_safe?.toLowerCase()
  if (publicSafe && !allowedPublicSafe.has(publicSafe)) {
    addError(`${label} has invalid public_safe value "${values.public_safe}". Use yes, no, or maybe.`)
  }

  const strength = values.strength?.toLowerCase()
  if (strength && !allowedStrengths.has(strength)) {
    addError(`${label} has invalid strength "${values.strength}". Use ${[...allowedStrengths].join(', ')}.`)
  }

  if (publicSafe === 'yes' && !values.proof) {
    addError(`${label} is marked public-safe but has no proof source.`)
  }

  if (['strong', 'public'].includes(strength) && !values.proof) {
    addError(`${label} has ${values.strength} strength but no proof source.`)
  }

  if (publicSafe === 'yes' && strength === 'raw') {
    addError(`${label} is marked public-safe but still has raw strength.`)
  }

  if (!values.proof) addWarning(`${label} has no proof yet.`)
  if (!values.metric) addWarning(`${label} has no metric yet.`)
  if (!values.verifier) addWarning(`${label} has no verifier yet.`)
  if (values.case_signal === 'Needs private classification') addWarning(`${label} still needs private review classification.`)
})

if (warnings.length > 0) {
  console.warn(`Baseline validation warning(s):\n${warnings.join('\n')}`)
}

if (errors.length > 0) {
  console.error(`Baseline validation failed with ${errors.length} issue(s):`)
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Baseline validation passed: ${ledger.records.length} private evidence record(s), ${warnings.length} warning(s).`)
