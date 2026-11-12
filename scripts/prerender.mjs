// Turns the single-page build into one real HTML file per URL.
//
// `npm run build` runs three steps: the client build (dist/), a server build of
// src/entry-server.jsx (dist-ssr/), and this script, which renders every route
// to dist/<path>/index.html with its own <head>, then writes 404.html and
// sitemap.xml. GitHub Pages serves those files directly, so every page has a
// shareable URL, its own link preview, and content that search engines can read.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = join(repoRoot, 'dist')
const ssrRoot = join(repoRoot, 'dist-ssr')
const siteUrl = 'https://sriram369.github.io'

const { render, allPaths } = await import(pathToFileURL(join(ssrRoot, 'entry-server.js')).href)
const template = readFileSync(join(distRoot, 'index.html'), 'utf8')

const escapeHtml = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Replaces the content of one tag in the template, and fails loudly if the tag is missing
// so a renamed meta tag cannot silently ship the home page's values on every page.
function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: template is missing ${label}`)
  return html.replace(pattern, replacement)
}

function withHead(html, meta) {
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const attr = (name, value) => [new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*(")`), `$1${value}$2`, name]
  const edits = [
    [/<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>'],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${meta.url}$2`, 'canonical link'],
    attr('description', description),
    attr('og:url', meta.url),
    attr('og:title', title),
    attr('og:description', description),
    attr('og:image', meta.image),
    attr('twitter:title', title),
    attr('twitter:description', description),
    attr('twitter:image', meta.image),
  ]
  return edits.reduce((result, [pattern, replacement, label]) => replaceOnce(result, pattern, replacement, label), html)
}

function page(path) {
  const { html, meta } = render(path)
  if (!html.includes('id="page-title"')) throw new Error(`prerender: ${path} rendered without a page heading`)
  const withRoot = replaceOnce(template, /<div id="root"><\/div>/, `<div id="root">${html}</div>`, 'the #root element')
  return withHead(withRoot, meta)
}

for (const path of allPaths) {
  const file = join(distRoot, path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(path))
}

// GitHub Pages serves 404.html for any unknown URL.
writeFileSync(join(distRoot, '404.html'), page('/404/'))

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allPaths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`),
  '</urlset>',
  '',
].join('\n')
writeFileSync(join(distRoot, 'sitemap.xml'), sitemap)

rmSync(ssrRoot, { recursive: true, force: true })
console.log(`Pre-rendered ${allPaths.length} pages, 404.html, and sitemap.xml.`)
