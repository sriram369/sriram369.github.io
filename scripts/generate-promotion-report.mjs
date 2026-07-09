import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { achievements } from '../src/data/achievements.js'
import {
  getHeaderIssues,
  normalizeBaselineRecord,
  readLedgerRecords,
  repoRoot,
} from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/promotion-candidates.md')
const blockedPublicTerms = ['private/', 'private\\', 'private/intake', 'lawyer', 'attorney', 'uscis', 'o-1', 'visa', 'immigration']
const publicTitles = new Set(achievements.map((achievement) => achievement.title))

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function inferCategory(context) {
  return context.split(';')[0]?.trim() || 'Achievement'
}

function inferTags(context) {
  return context
    .split(';')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(1, 4)
}

function inferProofTypes(proof) {
  const proofTypes = proof.match(/Proof types:\s*([^|]+)/i)?.[1]
  if (proofTypes) return proofTypes.split(';').map((type) => type.trim()).filter(Boolean)

  if (/github\.com/i.test(proof)) return ['Repository']
  if (/report|pdf/i.test(proof)) return ['Report']
  if (/demo|vercel|netlify|app\./i.test(proof)) return ['Live demo']

  return ['Proof source']
}

function inferLinks(proof) {
  return proof
    .split('|')
    .map((part) => part.trim())
    .map((part) => {
      const labeled = part.match(/^([^:]+):\s*(https?:\/\/\S+|\/\S+)/)
      if (labeled) return { label: labeled[1].trim(), href: labeled[2].trim() }

      const url = part.match(/(https?:\/\/\S+|\/\S+)/)?.[1]
      if (url) return { label: 'Proof', href: url.trim() }

      return null
    })
    .filter(Boolean)
    .filter((link) => !link.href.startsWith('#'))
}

function jsString(value) {
  return JSON.stringify(value ?? '')
}

function formatArray(values) {
  return `[${values.map((value) => jsString(value)).join(', ')}]`
}

function formatLinks(links) {
  return `[${links.map((link) => `{ label: ${jsString(link.label)}, href: ${jsString(link.href)} }`).join(', ')}]`
}

function draftAchievement(record) {
  const tags = inferTags(record.context)
  const links = inferLinks(record.proof)

  return `{
  id: ${jsString(slugify(record.title))},
  date: ${jsString(record.date)},
  category: ${jsString(inferCategory(record.context))},
  title: ${jsString(record.title)},
  summary: ${jsString(record.claim)},
  signal: ${jsString(record.career_signal)},
  links: ${formatLinks(links)},
  proof: { level: ${jsString(record.strength === 'strong' ? 'strong' : 'public')}, types: ${formatArray(inferProofTypes(record.proof))} },
  tags: ${formatArray(tags.length ? tags : [inferCategory(record.context)])},
}`
}

function publicText(record) {
  return JSON.stringify({
    date: record.date,
    title: record.title,
    context: record.context,
    claim: record.claim,
    proof: record.proof,
    career_signal: record.career_signal,
    strength: record.strength,
  }).toLowerCase()
}

function classifyRecord(record) {
  const reasons = []

  if (publicTitles.has(record.title)) reasons.push('Already on the public Achievements page.')
  if (record.public_safe.toLowerCase() !== 'yes') reasons.push('Not marked public_safe=yes.')
  if (!record.proof) reasons.push('Missing proof source.')
  if (!['strong', 'public'].includes(record.strength.toLowerCase())) reasons.push('Strength must be strong or public for promotion.')

  const blockedTerms = blockedPublicTerms.filter((term) => publicText(record).includes(term))
  if (blockedTerms.length > 0) reasons.push(`Contains blocked public term(s): ${blockedTerms.join(', ')}.`)

  const links = inferLinks(record.proof)
  if (record.proof && links.length === 0) reasons.push('Proof is present but no public link/path could be inferred.')

  if (publicTitles.has(record.title)) return { status: 'already_public', reasons }
  if (reasons.length > 0) return { status: 'not_ready', reasons }
  return { status: 'ready', reasons: [] }
}

function formatRecord(record, index, status) {
  const reasons = status.reasons.length ? status.reasons.map((reason) => `  - ${reason}`).join('\n') : '  - Ready'
  const draft = status.status === 'ready' ? `\n\nDraft achievement object:\n\n\`\`\`js\n${draftAchievement(record)}\n\`\`\`` : ''

  return `### ${index + 1}. ${record.title || 'Untitled evidence'}

- Date: ${record.date || 'TBD'}
- Context: ${record.context || 'TBD'}
- Public safe: ${record.public_safe || 'TBD'}
- Strength: ${record.strength || 'raw'}
- Proof: ${record.proof || 'TBD'}
- Promotion status:
${reasons}${draft}`
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

const classified = ledger.records.map((record) => {
  const normalized = normalizeBaselineRecord(record)
  return { record: normalized, status: classifyRecord(normalized) }
})

const alreadyPublic = classified.filter((item) => item.status.status === 'already_public')
const ready = classified.filter((item) => item.status.status === 'ready')
const notReady = classified.filter((item) => item.status.status === 'not_ready')

const report = `# Promotion Candidates

Generated from \`private/intake/evidence-ledger.csv\`. This report is private and should not be published.

## Summary

- Already public: ${alreadyPublic.length}
- Ready to promote: ${ready.length}
- Not ready: ${notReady.length}

## Ready To Promote

${ready.length ? ready.map(({ record, status }, index) => formatRecord(record, index, status)).join('\n\n') : '- No new ready candidates yet.'}

## Already Public

${alreadyPublic.length ? alreadyPublic.map(({ record, status }, index) => formatRecord(record, index, status)).join('\n\n') : '- No already-public records found.'}

## Not Ready

${notReady.length ? notReady.map(({ record, status }, index) => formatRecord(record, index, status)).join('\n\n') : '- No blocked candidates.'}
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, report)

console.log(`Promotion report generated at ${outputPath}`)
