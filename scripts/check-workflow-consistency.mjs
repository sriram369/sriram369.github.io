import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { repoRoot } from './baseline-utils.mjs'

const packageJson = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'))
const files = {
  readme: readFileSync(join(repoRoot, 'README.md'), 'utf8'),
  operations: readFileSync(join(repoRoot, 'docs/evidence-operations.md'), 'utf8'),
  readiness: readFileSync(join(repoRoot, 'docs/readiness-checklist.md'), 'utf8'),
  publish: readFileSync(join(repoRoot, 'docs/publish-handoff.md'), 'utf8'),
  gitignore: readFileSync(join(repoRoot, '.gitignore'), 'utf8'),
}

const workflowCommands = [
  'status:evidence',
  'add:baseline',
  'capture:daily',
  'update:baseline',
  'init:baseline',
  'migrate:baseline',
  'validate:baseline',
  'seed:baseline',
  'report:baseline',
  'request:evidence',
  'request:next',
  'outreach:verifiers',
  'matrix:verification',
  'apply:verification',
  'promotion:baseline',
  'plan:tech',
  'latex:evidence',
  'snapshot:readiness',
  'manifest:publish',
  'share:public',
  'refresh:baseline',
  'preflight:evidence',
  'safety:private',
  'safety:public',
  'validate:evidence',
  'check:public-assets',
  'check:workflow',
  'check:evidence-links',
  'check:live',
  'verify',
]

const refreshChain = [
  'init:baseline',
  'migrate:baseline',
  'seed:baseline',
  'validate:baseline',
  'report:baseline',
  'request:evidence',
  'request:next',
  'outreach:verifiers',
  'matrix:verification',
  'promotion:baseline',
  'plan:tech',
  'latex:evidence',
  'snapshot:readiness',
  'manifest:publish',
]

const privateReports = [
  'private/export/baseline-report.md',
  'private/export/evidence-request.md',
  'private/export/next-batch-request.md',
  'private/export/verifier-outreach.md',
  'private/export/verification-matrix.md',
  'private/export/promotion-candidates.md',
  'private/export/tech-excellence-plan.md',
  'private/export/sriramos-evidence-packet.tex',
  'private/export/readiness-snapshot.md',
  'private/export/live-site-check.md',
  'private/export/publish-manifest.md',
]

const errors = []

function addError(message) {
  errors.push(`- ${message}`)
}

function assertIncludes(label, text, needle) {
  if (!text.includes(needle)) addError(`${label} is missing "${needle}".`)
}

for (const command of workflowCommands) {
  if (!packageJson.scripts[command]) addError(`package.json is missing script "${command}".`)
  assertIncludes('README.md', files.readme, `npm run ${command}`)
}

for (const command of workflowCommands.filter((command) => !['add:baseline', 'capture:daily', 'update:baseline'].includes(command))) {
  assertIncludes('docs/readiness-checklist.md', files.readiness, `npm run ${command}`)
}

for (const command of refreshChain) {
  assertIncludes('package.json refresh:baseline', packageJson.scripts['refresh:baseline'] ?? '', `npm run ${command}`)
}

for (const command of ['refresh:baseline', 'share:public', 'status:evidence', 'verify']) {
  assertIncludes('package.json preflight:evidence', packageJson.scripts['preflight:evidence'] ?? '', `npm run ${command}`)
}

for (const command of ['safety:private', 'validate:evidence', 'check:public-assets', 'check:workflow', 'lint', 'build', 'safety:public']) {
  assertIncludes('package.json verify', packageJson.scripts.verify ?? '', `npm run ${command}`)
}

for (const report of privateReports) {
  assertIncludes('docs/evidence-operations.md', files.operations, report)
}

assertIncludes('docs/publish-handoff.md', files.publish, 'private/export/readiness-snapshot.md')
assertIncludes('.gitignore', files.gitignore, 'private/')

if (errors.length > 0) {
  console.error(`Workflow consistency check failed with ${errors.length} issue(s):`)
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Workflow consistency check passed: ${workflowCommands.length} commands and ${privateReports.length} private reports are documented.`)
