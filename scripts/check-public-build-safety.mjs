import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
const distRoot = join(repoRoot, 'dist')
const scannableExtensions = new Set(['.css', '.html', '.js', '.json', '.txt'])
const blockedTerms = ['private/', 'private\\', 'private/intake', 'lawyer', 'attorney', 'uscis', 'o-1', 'visa', 'immigration']
const errors = []

function walkFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walkFiles(path) : [path]
  })
}

if (!existsSync(distRoot)) {
  console.error('Missing dist/. Run `npm run build` before `npm run safety:public`.')
  process.exit(1)
}

for (const filePath of walkFiles(distRoot)) {
  if (!scannableExtensions.has(extname(filePath))) continue

  const text = readFileSync(filePath, 'utf8').toLowerCase()
  const foundTerms = blockedTerms.filter((term) => text.includes(term))

  if (foundTerms.length > 0) {
    errors.push(`- ${filePath.replace(`${repoRoot}/`, '')} contains blocked public term(s): ${foundTerms.join(', ')}`)
  }
}

if (errors.length > 0) {
  console.error(`Public build safety check failed with ${errors.length} issue(s):`)
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Public build safety check passed: generated site contains no blocked private/legal terms.')
