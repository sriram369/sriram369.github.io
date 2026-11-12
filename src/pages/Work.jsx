import { Fragment } from 'react'
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import { experiences } from '../data/experience'
import { Container, OrgLogo, PageHeader, Reveal, TextLink } from '../components/ui'

function Segments({ segments }) {
  return segments.map((segment, index) =>
    segment.href ? (
      <TextLink key={index} href={segment.href} arrow={false} className={segment.code ? 'font-mono text-[0.875em]' : ''}>
        {segment.text}
      </TextLink>
    ) : (
      <Fragment key={index}>{segment.text}</Fragment>
    ),
  )
}

function Company({ experience }) {
  if (!experience.companyLinks) return experience.company
  return experience.companyLinks.map((part, index) => (
    <Fragment key={part.text}>
      {index > 0 && ' & '}
      <a href={part.href} target="_blank" rel="noopener noreferrer" className="link">
        {part.text}
      </a>
    </Fragment>
  ))
}

function Role({ experience }) {
  return (
    <Reveal as="article" className="grid gap-x-8 gap-y-5 border-t border-line py-10 md:grid-cols-12 sm:py-14">
      <div className="md:col-span-3">
        <p className="font-mono text-sm text-ink">{experience.period}</p>
        <p className="mt-1.5 text-sm text-muted">{experience.location}</p>
      </div>

      <div className="md:col-span-9">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <OrgLogo src={experience.logo} size={28} crop={experience.logoCrop} />
          <p className="text-[0.9375rem] font-medium">
            <Company experience={experience} />
          </p>
          {experience.companyNote && <span className="chip">{experience.companyNote}</span>}
        </div>

        <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{experience.role}</h2>

        <ul className="mt-6 max-w-[68ch] space-y-3 text-[1.0625rem] leading-relaxed text-muted">
          {experience.bullets.map((segments, index) => (
            <li key={index} className="relative pl-6">
              <span aria-hidden="true" className="absolute top-[0.72em] left-0 h-[2px] w-3 bg-accent" />
              <Segments segments={segments} />
            </li>
          ))}
        </ul>

        {experience.projectLinks && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {experience.projectLinks.map((project) => (
              <li key={project.name} className="flex items-center gap-1 rounded-full border border-line bg-surface py-1 pr-1 pl-4 text-sm">
                <span className="mr-1 font-medium">{project.name}</span>
                <a
                  href={project.demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-muted transition-colors hover:bg-sunken hover:text-ink"
                >
                  Demo
                  <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                  <span className="sr-only">of {project.name}</span>
                </a>
                <a
                  href={project.repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-muted transition-colors hover:bg-sunken hover:text-ink"
                >
                  <GithubLogo size={15} aria-hidden="true" />
                  Code
                  <span className="sr-only">for {project.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Skills and tools">
          {experience.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export default function Work() {
  return (
    <>
      <PageHeader title="Work" lead="Where I've worked, and what I shipped there." />
      <Container>
        {experiences.map((experience) => (
          <Role key={experience.id} experience={experience} />
        ))}
      </Container>
    </>
  )
}
