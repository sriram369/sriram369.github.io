import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { achievements } from '../src/data/achievements.js'
import { repoRoot } from './baseline-utils.mjs'

const liveUrl = 'https://sriram369.github.io/'
const outputPath = join(repoRoot, 'private/export/live-site-check.md')

function absoluteUrl(path) {
  return new URL(path, liveUrl).toString()
}

function findAssetPaths(html) {
  return [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+\.(?:js|css))"/g)].map((match) => match[1])
}

function checkMarker(text, marker) {
  return text.includes(marker)
}

function formatCheck(label, passed) {
  return `- ${passed ? '[x]' : '[ ]'} ${label}`
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'SriramOS live verification',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`)
  }

  return {
    text: await response.text(),
    lastModified: response.headers.get('last-modified') || 'unknown',
    etag: response.headers.get('etag') || 'unknown',
    status: response.status,
  }
}

try {
  const htmlResult = await fetchText(liveUrl)
  const assetPaths = findAssetPaths(htmlResult.text)
  const assetResults = await Promise.all(
    assetPaths.map(async (path) => ({
      path,
      url: absoluteUrl(path),
      ...(await fetchText(absoluteUrl(path))),
    })),
  )
  const combinedAssetText = assetResults.map((asset) => asset.text).join('\n')
  const expectedAchievementIds = achievements.map((achievement) => achievement.id)
  const missingAchievementIds = expectedAchievementIds.filter((id) => !checkMarker(combinedAssetText, `achievement-${id}`) && !checkMarker(combinedAssetText, id))
  const checks = [
    ['Live HTML fetched successfully', Boolean(htmlResult.text)],
    ['Live metadata mentions Proof Trail', checkMarker(htmlResult.text, 'Proof Trail')],
    ['Live bundle mentions Proof Trail', checkMarker(combinedAssetText, 'Proof Trail')],
    ['Live bundle includes achievements route marker', checkMarker(combinedAssetText, '#achievements') || checkMarker(combinedAssetText, 'achievements')],
    ['Live bundle appears to include all public achievement ids', missingAchievementIds.length === 0],
  ]
  const isCurrent = checks.every(([, passed]) => passed)

  const report = `# Live Site Check

Generated from ${liveUrl}. This report is private and should not be published.

## Summary

- Live URL: ${liveUrl}
- HTTP status: ${htmlResult.status}
- Last modified: ${htmlResult.lastModified}
- ETag: ${htmlResult.etag}
- Asset files checked: ${assetResults.length}
- Expected public achievements: ${achievements.length}
- Missing achievement ids in live bundle: ${missingAchievementIds.length}
- Live site appears current: ${isCurrent ? 'yes' : 'no'}

## Checks

${checks.map(([label, passed]) => formatCheck(label, passed)).join('\n')}

## Asset Files

${assetResults.length ? assetResults.map((asset) => `- ${asset.path}`).join('\n') : '- No JS/CSS assets found.'}

## Missing Achievement IDs

${missingAchievementIds.length ? missingAchievementIds.map((id) => `- ${id}`).join('\n') : '- None.'}

## Interpretation

${isCurrent ? 'The live site appears to include the local Proof Trail evidence layer.' : 'The live site does not yet appear to include the local Proof Trail evidence layer. Publish the local changes and rerun this check after GitHub Pages deploys.'}
`

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, report)

  console.log(`Live site check generated at ${outputPath}`)

  if (!isCurrent) {
    console.warn('Live site does not yet appear current. See private/export/live-site-check.md.')
  }
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
