import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { projects } from '../data/projects'
import { caseStudies } from '../data/caseStudies'
import { hrefFor } from '../lib/routes'
import { Container, PageHeader, Reveal, TextLink } from '../components/ui'
import ProjectLinks from '../components/ProjectLinks'

const sectionHeading = 'text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]'

function Steps({ items }) {
  return (
    <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.title} className="border-t border-line pt-4">
          <span className="font-mono text-sm text-faint">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  )
}

function Points({ items }) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
      {items.map((item) => (
        <li key={item.title} className="card p-6">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

function Prose({ paragraphs }) {
  return (
    <div className="mt-6 max-w-[68ch] space-y-4 text-lg leading-relaxed text-muted">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}

const sectionKinds = {
  steps: (section) => <Steps items={section.items} />,
  points: (section) => <Points items={section.items} />,
  text: (section) => <Prose paragraphs={section.paragraphs} />,
}

function CaseStudy({ study }) {
  return (
    <>
      <Reveal as="section" className="mt-16 sm:mt-24" aria-label="Results">
        <p className="max-w-[26ch] font-display text-[clamp(1.75rem,4.2vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.035em] lg:max-w-[30ch]">
          {study.summary}
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 lg:grid-cols-4">
          {study.results.map((result) => (
            <div key={result.label}>
              <dd className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.05em]">{result.value}</dd>
              <dt className="mt-2 text-[0.9375rem] leading-snug text-muted">{result.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>

      {study.sections.map((section) => (
        <Reveal as="section" key={section.title} className="mt-16 sm:mt-24">
          <h2 className={sectionHeading}>{section.title}</h2>
          {sectionKinds[section.kind](section)}
        </Reveal>
      ))}

      <p className="mt-12 text-[0.9375rem] text-muted">
        Source: <TextLink href={study.source.href}>{study.source.label}</TextLink>
      </p>
    </>
  )
}

export default function Project({ projectId }) {
  const index = projects.findIndex((item) => item.id === projectId)
  const project = projects[index]
  const study = caseStudies[projectId]
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <article>
      <PageHeader title={project.title} lead={project.tagline} eyebrow={project.origin}>
        <div className="mt-8 flex flex-wrap gap-3">
          <ProjectLinks project={project} primaryFirst />
        </div>
      </PageHeader>

      <Container>
        {project.image && (
          <Reveal className="card overflow-hidden">
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={1280}
              height={800}
              className="aspect-[16/9] w-full object-cover object-left-top"
            />
          </Reveal>
        )}

        <div className={`grid gap-x-12 gap-y-10 lg:grid-cols-12 ${project.image ? 'mt-12 sm:mt-16' : ''}`}>
          <Reveal as="section" className="lg:col-span-7" aria-labelledby="overview">
            <h2 id="overview" className={sectionHeading}>
              Overview
            </h2>
            <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-muted">{project.description}</p>
            {project.quote && (
              <figure className="mt-8 border-l-2 border-accent pl-5">
                <blockquote className="text-lg leading-relaxed">“{project.quote.text}”</blockquote>
                <figcaption className="mt-3 text-[0.9375rem] text-muted">
                  {project.quote.by}. {project.quote.note}
                </figcaption>
              </figure>
            )}
          </Reveal>

          <Reveal as="aside" delay={0.1} className="lg:col-span-4 lg:col-start-9" aria-label="Project facts">
            <dl className="space-y-6">
              {project.role && (
                <div>
                  <dt className="meta">Role</dt>
                  <dd className="mt-1.5 font-medium">{project.role}</dd>
                </div>
              )}
              <div>
                <dt className="meta">Context</dt>
                <dd className="mt-1.5 font-medium">{project.origin}</dd>
              </div>
              <div>
                <dt className="meta">Built with</dt>
                <dd className="mt-2.5">
                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {study && <CaseStudy study={study} />}

        <nav aria-label="More projects" className="mt-20 grid border-t border-line sm:mt-28 sm:grid-cols-2">
          <a href={hrefFor('project', previous.id)} className="group flex items-center gap-4 border-b border-line py-7 sm:border-r sm:pr-8">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>
              <span className="meta block">Previous</span>
              <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.025em]">{previous.title}</span>
            </span>
          </a>
          <a href={hrefFor('project', next.id)} className="group flex items-center justify-end gap-4 border-b border-line py-7 text-right sm:pl-8">
            <span>
              <span className="meta block">Next</span>
              <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.025em]">{next.title}</span>
            </span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </nav>
      </Container>
    </article>
  )
}
