import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Certificate,
  Copy,
  DownloadSimple,
  EnvelopeSimple,
  GraduationCap,
  House,
  MagnifyingGlass,
  Moon,
  SquaresFour,
  Sun,
} from '@phosphor-icons/react'
import { profile, socials } from '../data/site'
import { projects } from '../data/projects'
import { socialIcons } from '../lib/icons'

const pages = [
  { key: 'home', label: 'Home', icon: House },
  { key: 'experience', label: 'Work', icon: Briefcase, keywords: 'experience jobs career' },
  { key: 'projects', label: 'Projects', icon: SquaresFour, keywords: 'portfolio builds' },
  { key: 'education', label: 'Education', icon: GraduationCap, keywords: 'school university degree' },
  { key: 'coursework', label: 'Coursework', icon: BookOpen, keywords: 'courses classes' },
  { key: 'certifications', label: 'Certifications', icon: Certificate, keywords: 'certificates' },
  { key: 'contact', label: 'Contact', icon: EnvelopeSimple, keywords: 'email reach hire' },
]

function buildCommands({ navigate, theme, toggleTheme }) {
  const open = (href) => () => window.open(href, '_blank', 'noopener,noreferrer')
  return [
    ...pages.map(({ key, label, icon, keywords = '' }) => ({
      id: `page-${key}`,
      group: 'Pages',
      label,
      icon,
      keywords,
      run: () => navigate(key),
    })),
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      group: 'Projects',
      label: project.title,
      hint: project.tagline,
      icon: SquaresFour,
      keywords: `${project.tech.join(' ')} ${project.origin}`,
      run: () => {
        window.location.hash = `projects/${project.id}`
      },
    })),
    {
      id: 'copy-email',
      group: 'Actions',
      label: 'Copy email address',
      hint: profile.email,
      icon: Copy,
      keywords: 'contact mail',
      run: () => navigator.clipboard?.writeText(profile.email),
    },
    {
      id: 'resume',
      group: 'Actions',
      label: 'Download resume',
      icon: DownloadSimple,
      keywords: 'cv pdf',
      run: () => {
        const link = document.createElement('a')
        link.href = profile.resume
        link.download = 'Sriram_Resume.pdf'
        link.click()
      },
    },
    {
      id: 'theme',
      group: 'Actions',
      label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
      icon: theme === 'dark' ? Sun : Moon,
      keywords: 'dark light mode appearance',
      run: toggleTheme,
    },
    ...socials.map(({ key, label, handle, href }) => ({
      id: `social-${key}`,
      group: 'Elsewhere',
      label,
      hint: handle,
      icon: socialIcons[key],
      external: true,
      keywords: 'social profile',
      run: open(href),
    })),
  ]
}

export default function CommandPalette({ onClose, navigate, theme, toggleTheme }) {
  const dialogRef = useRef(null)
  const listRef = useRef(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const commands = useMemo(() => buildCommands({ navigate, theme, toggleTheme }), [navigate, theme, toggleTheme])

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (!tokens.length) return commands
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.hint ?? ''} ${command.keywords ?? ''} ${command.group}`.toLowerCase()
      return tokens.every((token) => haystack.includes(token))
    })
  }, [commands, query])

  // Mounted only while open. The native dialog gives us the focus trap, Escape
  // handling, and top-layer stacking.
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, results])

  const run = (command) => {
    onClose()
    command.run()
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0))
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault()
      run(results[activeIndex])
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the site"
      onClose={onClose}
      onClick={(event) => {
        // A click that lands on the dialog element itself is a click on the backdrop.
        if (event.target === dialogRef.current) onClose()
      }}
      className="palette m-auto mt-[12vh] w-[min(600px,calc(100vw-24px))] overflow-hidden rounded-panel border border-line bg-surface p-0 shadow-panel"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <MagnifyingGlass size={18} aria-hidden="true" className="shrink-0 text-muted" />
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[activeIndex] ? `palette-${results[activeIndex].id}` : undefined}
          aria-label="Search pages, projects, and actions"
          placeholder="Search pages, projects, actions"
          autoComplete="off"
          spellCheck="false"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0)
          }}
          onKeyDown={onKeyDown}
          className="h-14 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-faint"
        />
        <kbd className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted">esc</kbd>
      </div>

      <ul id="palette-list" ref={listRef} role="listbox" aria-label="Results" className="max-h-[min(56vh,420px)] overflow-y-auto p-2">
        {results.length === 0 && (
          <li role="presentation" className="px-3 py-10 text-center text-sm text-muted">
            Nothing matches "{query}". Try a page name, a project, or a tool like "RAG".
          </li>
        )}
        {results.map((command, index) => {
          const Icon = command.icon
          const showGroup = results[index - 1]?.group !== command.group
          const active = index === activeIndex
          return (
            <li key={command.id} role="presentation">
              {showGroup && <div className="meta px-3 pt-3 pb-1.5">{command.group}</div>}
              <div
                id={`palette-${command.id}`}
                role="option"
                aria-selected={active}
                onClick={() => run(command)}
                onMouseMove={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${active ? 'bg-sunken' : ''}`}
              >
                <Icon size={18} aria-hidden="true" className={`shrink-0 ${active ? 'text-ink' : 'text-muted'}`} />
                <span className="shrink-0 text-[0.9375rem] font-medium">{command.label}</span>
                {command.hint && <span className="min-w-0 flex-1 truncate text-sm text-muted">{command.hint}</span>}
                {command.external && <ArrowUpRight size={14} aria-hidden="true" className="ml-auto shrink-0 text-muted" />}
              </div>
            </li>
          )
        })}
      </ul>
    </dialog>
  )
}
