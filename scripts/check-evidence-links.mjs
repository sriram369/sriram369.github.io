import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { achievements } from '../src/data/achievements.js'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
const publicRoot = join(repoRoot, 'public')
const timeoutMs = 10000
const softBlockedStatuses = new Set([401, 403, 429, 999])
const failures = []
const warnings = []

function addFailure(message) {
  failures.push(`- ${message}`)
}

function addWarning(message) {
  warnings.push(`- ${message}`)
}

async function fetchWithTimeout(url, method) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'sriram369.github.io evidence link checker',
      },
    })
  } finally {
    clearTimeout(timer)
  }
}

async function checkExternalLink(link, label) {
  let response

  try {
    response = await fetchWithTimeout(link.href, 'HEAD')
  } catch {
    try {
      response = await fetchWithTimeout(link.href, 'GET')
    } catch (error) {
      addFailure(`${label} "${link.label}" could not be reached: ${error.message}`)
      return
    }
  }

  if (!response.ok && [405, 501].includes(response.status)) {
    try {
      response = await fetchWithTimeout(link.href, 'GET')
    } catch (error) {
      addFailure(`${label} "${link.label}" rejected HEAD and GET failed: ${error.message}`)
      return
    }
  }

  if (response.ok) return

  if (softBlockedStatuses.has(response.status)) {
    addWarning(`${label} "${link.label}" returned ${response.status}; likely blocks automated checks.`)
    return
  }

  addFailure(`${label} "${link.label}" returned HTTP ${response.status}.`)
}

async function checkLink(link, label) {
  if (link.href.startsWith('/')) {
    const assetPath = join(publicRoot, link.href.slice(1))
    if (!existsSync(assetPath)) addFailure(`${label} "${link.label}" links to missing public asset ${link.href}.`)
    return
  }

  await checkExternalLink(link, label)
}

for (const achievement of achievements) {
  const label = `"${achievement.title}"`
  await Promise.all(achievement.links.map((link) => checkLink(link, label)))
}

if (warnings.length > 0) {
  console.warn(`Evidence link check warning(s):\n${warnings.join('\n')}`)
}

if (failures.length > 0) {
  console.error(`Evidence link check failed with ${failures.length} issue(s):`)
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Evidence link check passed: ${achievements.reduce((total, item) => total + item.links.length, 0)} proof link(s) checked, ${warnings.length} warning(s).`)
