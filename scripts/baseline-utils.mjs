import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const repoRoot = fileURLToPath(new URL('../', import.meta.url))
export const ledgerPath = join(repoRoot, 'private/intake/evidence-ledger.csv')
export const legacySignalHeader = 'o1_signal'
export const baselineHeaders = [
  'date',
  'title',
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
]

export const caseSignalsByTitle = {
  'Merged production fix into OpenClaw': 'Original technical contribution',
  'Social Media Head for Johns Hopkins DC Campus': 'Critical role and leadership',
  'Built AuraPath and earned a 100/100 evaluation': 'Original contribution and academic excellence',
  'Shipped FinRAG Analyst for cited SEC filing answers': 'Original technical contribution',
  'Worked on multilingual LLM systems at Ola Krutrim AI': 'Critical role in a distinguished AI organization',
  'Built Ikshana during the NUS exchange program': 'Original accessibility-focused technical contribution',
  'Completed UPI fraud detection capstone': 'Academic technical foundation',
}

export const caseSignalsByAchievementId = {
  openclaw: 'Original technical contribution',
  'jhu-social-media': 'Critical role and leadership',
  aurapath: 'Original contribution and academic excellence',
  finrag: 'Original technical contribution',
  krutrim: 'Critical role in a distinguished AI organization',
  ikshana: 'Original accessibility-focused technical contribution',
  'upi-fraud': 'Academic technical foundation',
}

export function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]

    if (char === '"' && inQuotes && next === '"') {
      field += '"'
      index += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(field)
      field = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') index += 1
      row.push(field)
      if (row.some((cell) => cell.trim().length > 0)) rows.push(row)
      row = []
      field = ''
      continue
    }

    field += char
  }

  row.push(field)
  if (row.some((cell) => cell.trim().length > 0)) rows.push(row)

  return rows
}

export function escapeCsv(value) {
  const text = String(value ?? '')
  if (!/[",\n\r]/.test(text)) return text
  return `"${text.replaceAll('"', '""')}"`
}

export function serializeBaselineRecords(records) {
  return `${[
    baselineHeaders.join(','),
    ...records.map((record) => baselineHeaders.map((header) => escapeCsv(record[header])).join(',')),
  ].join('\n')}\n`
}

export function cleanNextAction(value) {
  return value?.replaceAll('before legal use', 'before case use') ?? ''
}

export function getHeaderIssues(headers, { allowLegacySignals = false } = {}) {
  const requiredHeaders = allowLegacySignals
    ? baselineHeaders.filter((header) => header !== 'career_signal' && header !== 'case_signal')
    : baselineHeaders
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header))
  const hasModernSignals = headers.includes('career_signal') && headers.includes('case_signal')
  const hasLegacySignal = headers.includes(legacySignalHeader)
  const unexpectedHeaders = headers.filter((header) => !baselineHeaders.includes(header) && header !== legacySignalHeader)

  if (allowLegacySignals && !hasModernSignals && !hasLegacySignal) {
    missingHeaders.push('career_signal/case_signal')
  }

  return { missingHeaders, unexpectedHeaders }
}

export function recordsFromRows(rows) {
  const headers = rows[0] ?? []
  const records = rows.slice(1).map((cells) =>
    Object.fromEntries(headers.map((header, index) => [header, cells[index]?.trim() ?? ''])),
  )

  return { headers, records }
}

export function readLedgerRecords() {
  if (!existsSync(ledgerPath)) {
    throw new Error('Missing private evidence ledger. Run `npm run init:baseline` first.')
  }

  const text = readFileSync(ledgerPath, 'utf8')
  return { text, ...recordsFromRows(parseCsv(text)) }
}

export function normalizeBaselineRecord(record) {
  return {
    ...record,
    career_signal: record.career_signal || record[legacySignalHeader] || '',
    case_signal: record.case_signal || caseSignalsByTitle[record.title] || 'Needs private classification',
    next_action: cleanNextAction(record.next_action),
  }
}

export function countBy(rows, key) {
  return rows.reduce((counts, row) => {
    const value = row[key]?.trim() || 'Unspecified'
    counts[value] = (counts[value] ?? 0) + 1
    return counts
  }, {})
}

export function formatCounts(counts) {
  return Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([label, count]) => `- ${label}: ${count}`)
    .join('\n')
}
