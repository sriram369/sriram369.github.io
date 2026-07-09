import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import { repoRoot } from './baseline-utils.mjs'

const publicRoot = join(repoRoot, 'public')
const sourceRoots = ['index.html', 'src']
const assetExtensions = new Set(['.html', '.ico', '.jpeg', '.jpg', '.pdf', '.png', '.svg', '.webp'])
const siteOrigin = 'https://sriram369.github.io'
const errors = []

function walkFiles(path) {
  const fullPath = join(repoRoot, path)

  if (!existsSync(fullPath)) return []

  const statEntries = readdirSync(fullPath, { withFileTypes: true })
  return statEntries.flatMap((entry) => {
    const entryPath = join(path, entry.name)
    if (entry.isDirectory()) return walkFiles(entryPath)
    return [entryPath]
  })
}

function sourceFiles() {
  return sourceRoots.flatMap((path) => {
    const fullPath = join(repoRoot, path)
    if (!existsSync(fullPath)) return []
    if (!readdirSync(join(repoRoot, '.'), { withFileTypes: true }).some((entry) => entry.name === path && entry.isDirectory())) {
      return [path]
    }
    return walkFiles(path).filter((file) => ['.js', '.jsx', '.html'].includes(extname(file)))
  })
}

function normalizeAssetPath(value) {
  if (value.startsWith(siteOrigin)) return value.slice(siteOrigin.length)
  if (value.startsWith('/')) return value
  return ''
}

function assetCandidates(text) {
  const candidates = new Set()
  const pattern = /["'`](https:\/\/sriram369\.github\.io\/[^"'`?#]+|\/[^"'`?#]+)["'`]/g

  for (const match of text.matchAll(pattern)) {
    const assetPath = normalizeAssetPath(match[1])
    if (!assetPath || !assetExtensions.has(extname(assetPath))) continue
    candidates.add(assetPath)
  }

  return [...candidates]
}

for (const file of sourceFiles()) {
  const text = readFileSync(join(repoRoot, file), 'utf8')

  for (const assetPath of assetCandidates(text)) {
    const publicPath = join(publicRoot, assetPath.slice(1))
    if (!existsSync(publicPath)) {
      errors.push(`- ${file} references missing public asset ${assetPath}`)
    }
  }
}

if (errors.length > 0) {
  console.error(`Public asset check failed with ${errors.length} issue(s):`)
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Public asset check passed: referenced public assets exist.')
