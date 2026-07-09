import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { achievements, evidenceThemes, proofStats } from '../src/data/achievements.js'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
const publicRoot = join(repoRoot, 'public')

const errors = []
const requiredTextFields = ['id', 'date', 'category', 'title', 'summary', 'signal']
const allowedProofLevels = new Set(['strong', 'public'])
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const privateTerms = ['private/', 'private\\', 'lawyer', 'attorney', 'uscis', 'o-1', 'visa', 'immigration']

function addError(message) {
  errors.push(`- ${message}`)
}

function assertText(value, field, label) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    addError(`${label} is missing required text field "${field}".`)
  }
}

function publicTextFor(item) {
  return JSON.stringify(item).toLowerCase()
}

function validateLink(link, label) {
  assertText(link?.label, 'links[].label', label)
  assertText(link?.href, 'links[].href', label)

  if (typeof link?.href !== 'string') return

  if (link.href.startsWith('/')) {
    const assetPath = join(publicRoot, link.href.slice(1))
    if (!existsSync(assetPath)) {
      addError(`${label} links to missing public asset "${link.href}".`)
    }
    return
  }

  try {
    const url = new URL(link.href)
    if (!['http:', 'https:'].includes(url.protocol)) {
      addError(`${label} has unsupported link protocol "${url.protocol}".`)
    }
  } catch {
    addError(`${label} has invalid external link "${link.href}".`)
  }
}

if (!Array.isArray(achievements) || achievements.length === 0) {
  addError('achievements must be a non-empty array.')
}

if (!Array.isArray(evidenceThemes) || evidenceThemes.length === 0) {
  addError('evidenceThemes must be a non-empty array.')
}

if (!Array.isArray(proofStats) || proofStats.length === 0) {
  addError('proofStats must be a non-empty array.')
}

const firstStatCount = Number.parseInt(proofStats[0]?.value, 10)
if (Number.isFinite(firstStatCount) && firstStatCount !== achievements.length) {
  addError(`proofStats[0].value is "${proofStats[0].value}" but achievements has ${achievements.length} records.`)
}

const seenTitles = new Set()
const seenIds = new Set()

achievements.forEach((achievement, index) => {
  const label = `achievement[${index}] ${achievement?.title ? `"${achievement.title}"` : ''}`.trim()

  requiredTextFields.forEach((field) => assertText(achievement?.[field], field, label))

  if (typeof achievement?.id === 'string' && !idPattern.test(achievement.id)) {
    addError(`${label} has invalid id "${achievement.id}". Use lowercase URL-safe slugs.`)
  }

  if (seenIds.has(achievement?.id)) {
    addError(`${label} duplicates another achievement id.`)
  }
  seenIds.add(achievement?.id)

  if (seenTitles.has(achievement?.title)) {
    addError(`${label} duplicates another achievement title.`)
  }
  seenTitles.add(achievement?.title)

  if (!Array.isArray(achievement?.links) || achievement.links.length === 0) {
    addError(`${label} must include at least one proof link.`)
  } else {
    achievement.links.forEach((link) => validateLink(link, label))
  }

  if (!Array.isArray(achievement?.tags) || achievement.tags.length === 0) {
    addError(`${label} must include at least one tag.`)
  } else {
    achievement.tags.forEach((tag, tagIndex) => assertText(tag, `tags[${tagIndex}]`, label))
  }

  if (!achievement?.proof || typeof achievement.proof !== 'object') {
    addError(`${label} must include public proof metadata.`)
  } else {
    assertText(achievement.proof.level, 'proof.level', label)
    if (typeof achievement.proof.level === 'string' && !allowedProofLevels.has(achievement.proof.level)) {
      addError(`${label} has unsupported proof level "${achievement.proof.level}".`)
    }
    if (!Array.isArray(achievement.proof.types) || achievement.proof.types.length === 0) {
      addError(`${label} must include at least one proof type.`)
    } else {
      achievement.proof.types.forEach((type, typeIndex) => assertText(type, `proof.types[${typeIndex}]`, label))
    }
  }

  const publicText = publicTextFor(achievement)
  privateTerms.forEach((term) => {
    if (publicText.includes(term)) {
      addError(`${label} contains private/legal term "${term}". Keep that material in private/intake.`)
    }
  })
})

evidenceThemes.forEach((theme, index) => {
  assertText(theme?.title, 'title', `evidenceThemes[${index}]`)
  assertText(theme?.detail, 'detail', `evidenceThemes[${index}]`)
})

proofStats.forEach((stat, index) => {
  assertText(stat?.value, 'value', `proofStats[${index}]`)
  assertText(stat?.label, 'label', `proofStats[${index}]`)
  assertText(stat?.detail, 'detail', `proofStats[${index}]`)
})

if (errors.length > 0) {
  console.error(`Evidence validation failed with ${errors.length} issue(s):`)
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Evidence validation passed: ${achievements.length} achievements, ${proofStats.length} stats, ${evidenceThemes.length} themes.`)
