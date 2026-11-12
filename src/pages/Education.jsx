import { ArrowRight, DownloadSimple } from '@phosphor-icons/react'
import { schools } from '../data/education'
import { hrefFor } from '../lib/routes'
import { Container, OrgLogo, PageHeader, Reveal, TextLink } from '../components/ui'

function SchoolLinks({ links }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
      {links.map((link) => (
        <li key={link.href}>
          <TextLink href={link.href} download={link.download}>
            {link.download && <DownloadSimple size={15} aria-hidden="true" className="shrink-0" />}
            {link.label}
          </TextLink>
        </li>
      ))}
    </ul>
  )
}

function SchoolText({ school, headingClass }) {
  return (
    <div>
      <p className="font-mono text-sm">{school.period}</p>
      <h2 className={`mt-3 font-semibold leading-[1.08] tracking-[-0.03em] ${headingClass}`}>{school.degree}</h2>
      <div className="mt-5 flex items-center gap-3">
        <OrgLogo src={school.logo} size={28} />
        <div className="text-[0.9375rem] leading-snug">
          <TextLink href={school.link} arrow={false}>
            {school.school}
          </TextLink>
          <p className="text-muted">{school.location}</p>
        </div>
      </div>
      <p className="mt-5 max-w-[52ch] leading-relaxed text-muted">{school.blurb}</p>
      {school.courses && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlighted courses">
          {school.courses.map((course) => (
            <li key={course} className="chip">
              {course}
            </li>
          ))}
        </ul>
      )}
      <SchoolLinks links={school.links} />
    </div>
  )
}

function Photo({ school, className }) {
  return (
    <div className={`overflow-hidden rounded-panel bg-sunken ${className}`}>
      <img
        src={school.photo}
        alt={school.photoAlt}
        loading="lazy"
        style={{ objectPosition: school.photoPosition }}
        className="size-full object-cover"
      />
    </div>
  )
}

const more = [
  { key: 'coursework', label: 'Coursework', detail: 'Every course across Johns Hopkins, VIT, and NUS' },
  { key: 'certifications', label: 'Certifications', detail: 'Verified certificates and learning records' },
]

export default function Education() {
  const [lead, ...rest] = schools

  return (
    <>
      <PageHeader title="Education" lead="Johns Hopkins in Washington D.C., VIT in Vellore, and a summer at NUS in Singapore." />

      <Container>
        <Reveal as="article" className="grid items-center gap-8 border-t border-line py-10 sm:py-14 lg:grid-cols-12 lg:gap-12">
          <Photo school={lead} className="aspect-[3/2] lg:col-span-7" />
          <div className="lg:col-span-5">
            <SchoolText school={lead} headingClass="text-[clamp(1.75rem,3.4vw,2.5rem)]" />
          </div>
        </Reveal>

        <div className="grid gap-x-12 border-t border-line md:grid-cols-2">
          {rest.map((school, index) => (
            <Reveal
              as="article"
              key={school.id}
              delay={index * 0.1}
              className="grid grid-cols-1 items-start gap-6 border-b border-line py-10 last:border-b-0 sm:grid-cols-[200px_1fr] sm:py-14 md:border-b-0 md:grid-cols-1 xl:grid-cols-[220px_1fr]"
            >
              <Photo school={school} className="aspect-[4/5] w-full max-w-[280px] sm:max-w-none md:max-w-[280px] xl:max-w-none" />
              <SchoolText school={school} headingClass="text-[clamp(1.5rem,2.6vw,1.875rem)]" />
            </Reveal>
          ))}
        </div>

        <nav aria-label="More about my education" className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {more.map(({ key, label, detail }) => (
            <a
              key={key}
              href={hrefFor(key)}
              className="group flex items-center justify-between gap-6 border-b border-line py-7 transition-colors"
            >
              <span>
                <span className="block font-display text-2xl font-semibold tracking-[-0.025em]">{label}</span>
                <span className="mt-1 block text-[0.9375rem] text-muted">{detail}</span>
              </span>
              <span className="arrow-dot">
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </span>
            </a>
          ))}
        </nav>
      </Container>
    </>
  )
}
