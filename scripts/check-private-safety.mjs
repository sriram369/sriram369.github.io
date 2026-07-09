import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
const gitignore = readFileSync(new URL('../.gitignore', import.meta.url), 'utf8')
const errors = []

function addError(message) {
  errors.push(`- ${message}`)
}

if (!/^private\/$/m.test(gitignore)) {
  addError('`.gitignore` must include a standalone `private/` rule.')
}

let trackedPrivateFiles = ''

try {
  trackedPrivateFiles = execFileSync('git', ['ls-files', 'private'], {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trim()
} catch (error) {
  addError(`Unable to inspect tracked private files: ${error.message}`)
}

if (trackedPrivateFiles.length > 0) {
  addError(`Private files are tracked by git:\n${trackedPrivateFiles}`)
}

try {
  execFileSync('git', ['check-ignore', 'private/sriramos-baseline-process.md'], {
    cwd: repoRoot,
    encoding: 'utf8',
  })
} catch {
  addError('`private/sriramos-baseline-process.md` is not ignored by git.')
}

if (errors.length > 0) {
  console.error(`Private safety check failed with ${errors.length} issue(s):`)
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log('Private safety check passed: private/ is ignored and no private files are tracked.')
