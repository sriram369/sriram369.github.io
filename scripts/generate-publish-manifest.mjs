import { mkdirSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { repoRoot } from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/publish-manifest.md')
const safeTopLevel = [
  '.github/workflows/deploy.yml',
  '.gitignore',
  'README.md',
  'eslint.config.js',
  'index.html',
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'docs/',
  'public/',
  'scripts/',
  'src/',
]
const neverPublishPrefixes = ['private/', 'dist/', 'node_modules/']

function git(args) {
  return execFileSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trimEnd()
}

function parseStatusLine(line) {
  return {
    status: line.slice(0, 2).trim(),
    file: line.slice(3).trim(),
  }
}

function isNeverPublish(file) {
  return neverPublishPrefixes.some((prefix) => file === prefix.slice(0, -1) || file.startsWith(prefix))
}

function isSafe(file) {
  return safeTopLevel.some((entry) => {
    if (entry.endsWith('/')) return file.startsWith(entry)
    return file === entry
  })
}

function formatList(items, emptyText) {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : `- ${emptyText}`
}

const statusLines = git(['status', '--short', '--untracked-files=all'])
  .split('\n')
  .map((line) => line.trimEnd())
  .filter(Boolean)
  .map(parseStatusLine)

const ignoredLines = git(['status', '--short', '--ignored'])
  .split('\n')
  .map((line) => line.trimEnd())
  .filter((line) => line.startsWith('!!'))
  .map(parseStatusLine)

const changedFiles = statusLines.map((line) => line.file)
const safeChangedFiles = changedFiles.filter((file) => isSafe(file) && !isNeverPublish(file)).sort()
const unsafeChangedFiles = changedFiles.filter((file) => !isSafe(file) || isNeverPublish(file)).sort()
const ignoredNeverPublish = ignoredLines.map((line) => line.file).filter(isNeverPublish).sort()
const gitAddCommand = `git add ${safeTopLevel.join(' ')}`

const report = `# Publish Manifest

Generated from the current git worktree. This file is private and should not be published.

## Summary

- Changed/untracked files: ${changedFiles.length}
- Safe changed files covered by publish scope: ${safeChangedFiles.length}
- Unsafe or unexpected changed files: ${unsafeChangedFiles.length}
- Ignored never-publish paths observed: ${ignoredNeverPublish.length}

## Safe Publish Scope

\`\`\`bash
git status --short
${gitAddCommand}
git commit -m "Add public evidence layer and private baseline workflow"
git push origin main
\`\`\`

Only run the commit/push steps after Sriram explicitly approves publishing.

## Safe Changed Files

${formatList(safeChangedFiles, 'No safe changed files detected.')}

## Unsafe Or Unexpected Changed Files

${formatList(unsafeChangedFiles, 'No unsafe changed files detected.')}

## Ignored Never-Publish Paths

${formatList(ignoredNeverPublish, 'No ignored never-publish paths observed.')}

## Never Publish

${neverPublishPrefixes.map((prefix) => `- ${prefix}`).join('\n')}
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, report)

console.log(`Publish manifest generated at ${outputPath}`)

if (unsafeChangedFiles.length > 0) {
  console.warn('Publish manifest found unsafe or unexpected changed files. Review private/export/publish-manifest.md before staging.')
}
