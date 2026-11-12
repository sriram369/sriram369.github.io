import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'
import { projectGroups, projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'
import { hrefFor } from '../lib/routes'
import { EASE } from '../lib/motion'
import { Container, PageHeader } from '../components/ui'
import ProjectLinks from '../components/ProjectLinks'

const MAX_TECH = 4

// wide: a screenshot card that spans the full row, image beside text.
function ProjectCard({ project, wide = false, ref }) {
  const techShown = project.tech.slice(0, MAX_TECH)
  const hiddenCount = project.tech.length - techShown.length
  const href = hrefFor('project', project.id)

  return (
    <motion.article
      ref={ref}
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`card group overflow-hidden ${wide ? 'md:col-span-2 md:grid md:grid-cols-12 md:items-stretch' : ''}`}
    >
      {project.image && (
        <a
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={`block overflow-hidden bg-sunken ${
            wide ? 'aspect-[16/9] border-b border-line md:col-span-7 md:aspect-auto md:min-h-[340px] md:border-r md:border-b-0' : 'aspect-[16/9] border-b border-line'
          }`}
        >
          <img
            src={project.image}
            alt=""
            width={1280}
            height={800}
            loading="lazy"
            className="size-full object-cover object-left-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
          />
        </a>
      )}

      <div className={`p-6 sm:p-7 ${wide ? 'md:col-span-5 md:self-center' : ''}`}>
        <p className="meta">{project.origin}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] sm:text-[1.75rem]">
          <a href={href} className="hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4">
            {project.title}
          </a>
        </h2>
        <p className="mt-2 text-[1.0625rem] leading-snug text-muted">{project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
          {techShown.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
          {hiddenCount > 0 && <li className="chip">+{hiddenCount} more</li>}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <a href={href} className="btn btn-primary btn-sm group/details">
            {caseStudies[project.id] ? 'Case study' : 'Details'}
            <span className="sr-only">: {project.title}</span>
            <ArrowRight
              size={15}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/details:translate-x-0.5"
            />
          </a>
          <ProjectLinks project={{ ...project, links: project.links.slice(0, 1) }} size="btn-sm" />
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [group, setGroup] = useState('all')

  const visible = group === 'all' ? projects : projects.filter((project) => project.group === group)
  // Screenshot cards lead in a two-column grid; text-only cards follow in a denser grid.
  const withImage = visible.filter((project) => project.image)
  const textOnly = visible.filter((project) => !project.image)
  const countFor = (key) => (key === 'all' ? projects.length : projects.filter((project) => project.group === key).length)

  return (
    <>
      <PageHeader title="Projects" lead="Things I've built on my own, at Johns Hopkins, and along the way.">
        {/* A segmented toggle: on a phone it scrolls sideways instead of wrapping. */}
        <div className="-mx-5 mt-8 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div role="group" aria-label="Filter projects" className="segmented">
            {projectGroups.map(({ key, label }) => {
              const active = group === key
              return (
                <button key={key} type="button" aria-pressed={active} onClick={() => setGroup(key)} className="segmented-option">
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="segmented-thumb"
                      transition={{ type: 'spring', bounce: 0.12, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                  <span className="relative font-mono text-xs opacity-60">{countFor(key)}</span>
                </button>
              )
            })}
          </div>
        </div>
      </PageHeader>

      <Container>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
        <div className="grid items-start gap-5 md:grid-cols-2 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {withImage.map((project, index) => (
              <ProjectCard key={project.id} project={project} wide={index === 0 && withImage.length % 2 === 1} />
            ))}
          </AnimatePresence>
        </div>
        <div className={`grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${withImage.length ? 'mt-5 lg:mt-6' : ''}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            {textOnly.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </>
  )
}
