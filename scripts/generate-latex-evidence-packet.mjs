import { mkdirSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { achievements } from '../src/data/achievements.js'
import { normalizeBaselineRecord, readLedgerRecords, repoRoot } from './baseline-utils.mjs'

const outputPath = join(repoRoot, 'private/export/sriramos-evidence-packet.tex')
const outputDirectory = dirname(outputPath)
const outputPdfPath = join(outputDirectory, 'sriramos-evidence-packet.pdf')
const shouldCompilePdf = process.argv.includes('--pdf')
const achievementByTitle = new Map(achievements.map((achievement) => [achievement.title, achievement]))
const publicTitles = new Set(achievements.map((achievement) => achievement.title))

function runGit(args) {
  const result = spawnSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8',
  })

  if (result.status !== 0) return ''
  return result.stdout.trim()
}

function cleanText(value) {
  return String(value ?? '')
    .replaceAll('\u2018', "'")
    .replaceAll('\u2019', "'")
    .replaceAll('\u201c', '"')
    .replaceAll('\u201d', '"')
    .replaceAll('\u2013', '--')
    .replaceAll('\u2014', '--')
    .replaceAll('\u00a0', ' ')
    .trim()
}

function latex(value) {
  return cleanText(value)
    .replaceAll('\\', '\\textbackslash{}')
    .replaceAll('{', '\\{')
    .replaceAll('}', '\\}')
    .replaceAll('#', '\\#')
    .replaceAll('$', '\\$')
    .replaceAll('%', '\\%')
    .replaceAll('&', '\\&')
    .replaceAll('_', '\\_')
    .replaceAll('~', '\\textasciitilde{}')
    .replaceAll('^', '\\textasciicircum{}')
}

function latexOrTodo(value) {
  const text = cleanText(value)
  return text ? latex(text) : '\\textit{TBD}'
}

function latexStatus(value) {
  const text = cleanText(value)
  return text ? latex(text) : '\\textit{Missing}'
}

function latexUrl(value) {
  return `\\url{${cleanText(value).replaceAll('\\', '/') || '#'}}`
}

function todayLabel() {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'America/New_York',
  }).format(new Date())
}

function isPromotable(record) {
  return (
    record.public_safe.toLowerCase() === 'yes' &&
    Boolean(record.proof) &&
    ['strong', 'public'].includes(record.strength.toLowerCase()) &&
    !publicTitles.has(record.title)
  )
}

function compactProof(record) {
  return cleanText(record.proof)
    .split(' | ')
    .filter(Boolean)
    .map((item) => latex(item))
    .join('\\newline ')
}

function recordLinks(record) {
  const achievement = achievementByTitle.get(record.title)
  if (achievement?.links?.length) return achievement.links

  const urls = [...cleanText(record.proof).matchAll(/https?:\/\/[^\s|)]+|\/[^\s|)]+/g)].map((match) => match[0])
  return urls.map((href, index) => ({ label: `Proof link ${index + 1}`, href }))
}

function linksBlock(record) {
  const links = recordLinks(record)
  if (links.length === 0) return '\\textit{TBD}'

  return `\\begin{itemize}[leftmargin=*, nosep]
${links.map((link) => `\\item ${latex(link.label)}: ${latexUrl(link.href)}`).join('\n')}
\\end{itemize}`
}

function tableRow(cells) {
  return `${cells.join(' & ')} \\\\`
}

function formatSummaryTable(rows) {
  return `\\begin{tabularx}{\\textwidth}{@{}p{0.42\\textwidth}X@{}}
${rows.map(([label, value]) => tableRow([`\\textbf{${latex(label)}}`, latex(String(value))])).join('\n')}
\\end{tabularx}`
}

function formatProofTrail(records) {
  return `\\begin{longtable}{@{}p{0.13\\textwidth}p{0.34\\textwidth}p{0.33\\textwidth}p{0.13\\textwidth}@{}}
\\toprule
\\textbf{Date} & \\textbf{Evidence Item} & \\textbf{Public Signal} & \\textbf{Status} \\\\
\\midrule
\\endfirsthead
\\toprule
\\textbf{Date} & \\textbf{Evidence Item} & \\textbf{Public Signal} & \\textbf{Status} \\\\
\\midrule
\\endhead
${records
  .map((record) =>
    tableRow([
      latexOrTodo(record.date),
      latexOrTodo(record.title),
      latexOrTodo(record.career_signal),
      latexOrTodo(record.strength),
    ]),
  )
  .join('\n')}
\\bottomrule
\\end{longtable}`
}

function formatGapList(records, field, emptyText) {
  const missing = records.filter((record) => !cleanText(record[field]))
  if (missing.length === 0) return `\\begin{itemize}[leftmargin=*]\\item ${latex(emptyText)}\\end{itemize}`

  return `\\begin{itemize}[leftmargin=*]
${missing
  .map((record) => `\\item \\textbf{${latex(record.title)}} -- ${latex(record.next_action || 'Collect missing support.')}`)
  .join('\n')}
\\end{itemize}`
}

function formatEvidenceCards(records) {
  return records
    .map(
      (record, index) => `\\subsection*{${index + 1}. ${latex(record.title || 'Untitled Evidence')}}
\\begin{tabularx}{\\textwidth}{@{}p{0.19\\textwidth}X@{}}
\\textbf{Date} & ${latexOrTodo(record.date)} \\\\
\\textbf{Context} & ${latexOrTodo(record.context)} \\\\
\\textbf{Claim} & ${latexOrTodo(record.claim)} \\\\
\\textbf{Proof Summary} & ${compactProof(record) || '\\textit{TBD}'} \\\\
\\textbf{Metric} & ${latexStatus(record.metric)} \\\\
\\textbf{Verifier} & ${latexStatus(record.verifier)} \\\\
\\textbf{Public Safe} & ${latexOrTodo(record.public_safe)} \\\\
\\textbf{Private Signal} & ${latexOrTodo(record.case_signal)} \\\\
\\textbf{Next Action} & ${latexOrTodo(record.next_action)} \\\\
\\end{tabularx}

\\textbf{Proof Links}
${linksBlock(record)}`,
    )
    .join('\n\n')
}

function findLatexEngine() {
  for (const name of ['tectonic', 'pdflatex', 'xelatex']) {
    const result = spawnSync('which', [name], { encoding: 'utf8' })
    if (result.status === 0 && result.stdout.trim()) {
      return { name, path: result.stdout.trim() }
    }
  }

  return null
}

function compilePdf() {
  const engine = findLatexEngine()

  if (!engine) {
    console.error('No LaTeX engine found. Install tectonic, pdflatex, or xelatex, then rerun with --pdf.')
    process.exit(1)
  }

  const args =
    engine.name === 'tectonic'
      ? ['--outdir', outputDirectory, outputPath]
      : ['-interaction=nonstopmode', '-halt-on-error', '-output-directory', outputDirectory, outputPath]
  const result = spawnSync(engine.path, args, {
    cwd: repoRoot,
    encoding: 'utf8',
  })

  if (result.status !== 0) {
    console.error(result.stdout)
    console.error(result.stderr)
    process.exit(result.status ?? 1)
  }

  console.log(`LaTeX PDF compiled at ${outputPdfPath}`)
}

let ledger

try {
  ledger = readLedgerRecords()
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

const records = ledger.records.map(normalizeBaselineRecord)
const alreadyPublic = records.filter((record) => publicTitles.has(record.title)).length
const readyToPromote = records.filter(isPromotable).length
const missingMetrics = records.filter((record) => !cleanText(record.metric))
const missingVerifiers = records.filter((record) => !cleanText(record.verifier))
const rawOrWeak = records.filter((record) => ['raw', 'weak'].includes(record.strength.toLowerCase()))
const branch = runGit(['branch', '--show-current']) || 'unknown'
const localChanges = runGit(['status', '--short']).split('\n').filter(Boolean).length

const document = `\\documentclass[11pt]{article}
\\usepackage[margin=0.72in]{geometry}
\\usepackage{array}
\\usepackage{booktabs}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{longtable}
\\usepackage{microtype}
\\usepackage{tabularx}
\\usepackage{xcolor}
\\usepackage{url}

\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{6pt}
\\renewcommand{\\arraystretch}{1.22}
\\hypersetup{pdftitle={SriramOS Evidence Packet}, pdfauthor={Sriram Naidu Thota}}

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{SriramOS Evidence Packet}}\\\\[4pt]
{\\large Private Baseline + Public Proof Trail}\\\\[6pt]
Generated ${latex(todayLabel())} from \\texttt{private/intake/evidence-ledger.csv}
\\end{center}

\\section*{Status Summary}

${formatSummaryTable([
  ['Current branch', branch],
  ['Public achievements', achievements.length],
  ['Private evidence records', records.length],
  ['Already public from private ledger', alreadyPublic],
  ['Ready to promote', readyToPromote],
  ['Records missing metrics', missingMetrics.length],
  ['Records missing verifiers', missingVerifiers.length],
  ['Raw or weak records', rawOrWeak.length],
  ['Local git changes', localChanges],
])}

\\section*{Interpretation}

The current public proof trail exists and is seeded into the private baseline. The remaining strength gap is not the website structure; it is the missing metrics and verifier names that should be collected before a serious review packet is treated as complete.

\\section*{Public Proof Trail}

${formatProofTrail(records)}

\\section*{Evidence Gaps}

\\subsection*{Missing Metrics}
${formatGapList(records, 'metric', 'No metric gaps right now.')}

\\subsection*{Missing Verifiers}
${formatGapList(records, 'verifier', 'No verifier gaps right now.')}

\\section*{Evidence Cards}

${formatEvidenceCards(records)}

\\section*{Responsibilities}

\\textbf{Codex owns}
\\begin{itemize}[leftmargin=*]
\\item Convert scattered evidence into structured private records.
\\item Keep private raw material separate from public proof.
\\item Draft factual public achievement copy and flag unsupported claims.
\\item Maintain the local scripts, checks, reports, and website evidence layer.
\\end{itemize}

\\textbf{Sriram owns}
\\begin{itemize}[leftmargin=*]
\\item Provide dates, links, screenshots, reports, grades, emails, metrics, and verifier names.
\\item Confirm what can be public.
\\item Get qualified review before relying on sensitive strategy.
\\end{itemize}

\\section*{Command Appendix}

\\begin{verbatim}
npm run latex:evidence
npm run latex:evidence -- --pdf
npm run request:next
npm run preflight:evidence
npm run check:evidence-links
\\end{verbatim}

\\end{document}
`

mkdirSync(outputDirectory, { recursive: true })
writeFileSync(outputPath, document)

console.log(`LaTeX evidence packet generated at ${outputPath}`)

if (shouldCompilePdf) compilePdf()
