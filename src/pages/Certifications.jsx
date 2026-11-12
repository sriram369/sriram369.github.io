import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react'
import { certifications } from '../data/education'
import { Container, PageHeader, Reveal } from '../components/ui'

function Certificate({ cert }) {
  const body = (
    <>
      <div className="min-w-0">
        <p className="meta">{[cert.issuer, cert.date].filter(Boolean).join(', ')}</p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-snug tracking-[-0.02em]">{cert.title}</h2>
      </div>
      {cert.link && (
        <span className="sr-only">View certificate (opens in a new tab)</span>
      )}
      {cert.link && (
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
        </span>
      )}
    </>
  )
  const shell = 'group flex h-full items-start justify-between gap-5 rounded-panel border border-line bg-surface p-6'

  if (!cert.link) return <div className={shell}>{body}</div>
  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} transition-colors duration-300 hover:border-ink`}
    >
      {body}
    </a>
  )
}

export default function Certifications() {
  return (
    <>
      <PageHeader title="Certifications" lead="Certificates and verified learning records. Cards with an arrow open the original credential.">
        <a href="#education" className="link mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
          <ArrowLeft size={15} weight="bold" aria-hidden="true" />
          Education
        </a>
      </PageHeader>

      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {certifications.map((cert, index) => (
            <Reveal as="li" key={cert.title} delay={(index % 2) * 0.06}>
              <Certificate cert={cert} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </>
  )
}
