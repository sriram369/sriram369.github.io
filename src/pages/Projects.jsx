import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CaretDown, FilePdf, GithubLogo, LinkedinLogo, PresentationChart } from '@phosphor-icons/react'
import { projectGroups, projects } from '../data/projects'
import { Container, PageHeader } from '../components/ui'
import { EASE } from '../lib/motion'

const linkIcons = {
  demo: ArrowUpRight,
  github: GithubLogo,
  report: FilePdf,
  slides: PresentationChart,
  linkedin: LinkedinLogo,
}

const COLLAPSED_TECH = 4

// "#projects/finrag" deep-links to one card, e.g. from the home page or the command palette.
function projectFromHash() {
  const id = window.location.hash.split('/')[1]
  return projects.some((project) => project.id === id) ? id : null
}

// wide: a screenshot card that spans the full row, image beside text.
function ProjectCard({ project, expanded, onToggle, wide = false, ref }) {
  const techShown = expanded ? project.tech : project.tech.slice(0, COLLAPSED_TECH)
  const hiddenCount = project.tech.length - techShown.length
  const detailsId = `project-details-${project.id}`

  return (
    <motion.article
      ref={ref}
      layout="position"
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`group scroll-mt-24 overflow-hidden rounded-panel border border-line bg-surface ${
        wide ? 'md:col-span-2 md:grid md:grid-cols-12 md:items-stretch' : ''
      }`}
    >
      {project.image && (
        <div
          className={`overflow-hidden bg-sunken ${
            wide ? 'aspect-[16/9] border-b border-line md:col-span-7 md:aspect-auto md:min-h-[340px] md:border-r md:border-b-0' : 'aspect-[16/9] border-b border-line'
          }`}
        >
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={1280}
            height={800}
            loading="lazy"
            className="size-full object-cover object-left-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className={`p-6 sm:p-7 ${wide ? 'md:col-span-5 md:self-center' : ''}`}>
        <p className="meta">{project.origin}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-[1.75rem]">{project.title}</h2>
        <p className="mt-2 text-[1.0625rem] leading-snug text-muted">{project.tagline}</p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="pt-5 leading-relaxed text-muted">{project.description}</p>
              {project.role && (
                <p className="mt-4 text-sm">
                  <span className="text-muted">Role: </span>
                  <span className="font-medium">{project.role}</span>
                </p>
              )}
              {project.quote && (
                <figure className="mt-5 border-l-2 border-accent pl-4">
                  <blockquote className="leading-relaxed">“{project.quote.text}”</blockquote>
                  <figcaption className="mt-2 text-sm text-muted">
                    {project.quote.by}. {project.quote.note}
                  </figcaption>
                </figure>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
          {techShown.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
          {hiddenCount > 0 && <li className="chip">+{hiddenCount} more</li>}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.links.map((link, index) => {
            const Icon = linkIcons[link.kind]
            const external = /^https?:/.test(link.href)
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn h-10 px-4 text-sm ${index === 0 ? 'btn-primary' : 'btn-ghost'}`}
              >
                <Icon size={16} aria-hidden="true" weight={link.kind === 'demo' ? 'bold' : 'regular'} />
                {link.label}
                <span className="sr-only">
                  {' '}
                  for {project.title}
                  {external ? ' (opens in a new tab)' : ''}
                </span>
              </a>
            )
          })}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={detailsId}
            className="ml-auto inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-sunken hover:text-ink"
          >
            {expanded ? 'Less' : 'Details'}
            <span className="sr-only"> about {project.title}</span>
            <CaretDown
              size={14}
              weight="bold"
              aria-hidden="true"
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [group, setGroup] = useState('all')
  const [expanded, setExpanded] = useState(() => new Set([projectFromHash()].filter(Boolean)))

  // Arriving on a deep link: the card starts expanded (see initial state), so it
  // only needs scrolling into view. Later hash changes also reset the filter.
  useEffect(() => {
    const scrollToProject = (id) =>
      requestAnimationFrame(() => {
        document.getElementById(`project-${id}`)?.scrollIntoView({ block: 'start', behavior: 'instant' })
      })

    const initial = projectFromHash()
    if (initial) scrollToProject(initial)

    const onHashChange = () => {
      const id = projectFromHash()
      if (!id) return
      setGroup('all')
      setExpanded((current) => new Set(current).add(id))
      scrollToProject(id)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const toggle = (id) =>
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const visible = group === 'all' ? projects : projects.filter((project) => project.group === group)
  // Screenshot cards lead in a two-column grid; text-only cards follow in a denser grid.
  const withImage = visible.filter((project) => project.image)
  const textOnly = visible.filter((project) => !project.image)
  const countFor = (key) => (key === 'all' ? projects.length : projects.filter((project) => project.group === key).length)

  return (
    <>
      <PageHeader title="Projects" lead="Things I've built on my own, at Johns Hopkins, and along the way.">
        <div role="group" aria-label="Filter projects" className="mt-8 flex flex-wrap gap-2">
          {projectGroups.map(({ key, label }) => {
            const active = group === key
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setGroup(key)}
                className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                  active ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {label}
                <span className={`font-mono text-xs ${active ? 'text-bg/70' : 'text-faint'}`}>{countFor(key)}</span>
              </button>
            )
          })}
        </div>
      </PageHeader>

      <Container>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
        <div className="grid items-start gap-5 md:grid-cols-2 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {withImage.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                wide={index === 0 && withImage.length % 2 === 1}
                expanded={expanded.has(project.id)}
                onToggle={() => toggle(project.id)}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className={`grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${withImage.length ? 'mt-5 lg:mt-6' : ''}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            {textOnly.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                expanded={expanded.has(project.id)}
                onToggle={() => toggle(project.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </>
  )
}
