import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { achievements, evidenceThemes, proofStats } from '../src/data/achievements.js'
import { repoRoot } from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'docs/public-share-summary.md')
const publicBaseUrl = 'https://sriram369.github.io'

function formatLinks(links) {
  return links.map((link) => `[${link.label}](${link.href.startsWith('/') ? `${publicBaseUrl}${link.href}` : link.href})`).join(', ')
}

function formatAchievement(achievement, index) {
  return `## ${index + 1}. ${achievement.title}

- Date: ${achievement.date}
- Category: ${achievement.category}
- Share link: [${publicBaseUrl}/#achievements/${achievement.id}](${publicBaseUrl}/#achievements/${achievement.id})
- Summary: ${achievement.summary}
- Signal: ${achievement.signal}
- Proof: ${achievement.proof.level}; ${achievement.proof.types.join(', ')}
- Links: ${formatLinks(achievement.links)}
- Tags: ${achievement.tags.join(', ')}
`
}

const summary = `# Public Share Summary

Generated from \`src/data/achievements.js\`. This file contains only public-safe proof-trail material.

Public page:

${publicBaseUrl}/#achievements

## Stats

${proofStats.map((stat) => `- ${stat.value} ${stat.label}: ${stat.detail}`).join('\n')}

## Evidence Themes

${evidenceThemes.map((theme) => `- ${theme.title}: ${theme.detail}`).join('\n')}

## Public Achievements

${achievements.map(formatAchievement).join('\n')}
`

writeFileSync(outputPath, summary)

console.log(`Public share summary generated at ${outputPath}`)
