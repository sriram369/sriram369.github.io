import { ArrowUpRight, DownloadSimple, EnvelopeSimple } from '@phosphor-icons/react'
import { profile, socials } from '../data/site'
import { socialIcons } from '../lib/icons'
import { CopyEmailButton } from '../components/Footer'
import { Container, PageHeader, Reveal } from '../components/ui'

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Contact"
        lead="Open to conversations about AI systems, product strategy, collaboration, and full-time opportunities."
      />

      <Container className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <Reveal as="section" className="lg:col-span-7" aria-labelledby="contact-email">
          <h2 id="contact-email" className="meta">
            Email
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 block font-display text-[clamp(1.5rem,4.6vw,3rem)] font-semibold leading-tight tracking-[-0.035em] break-words"
          >
            <span className="mark">{profile.email}</span>
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <CopyEmailButton />
            <a href={`mailto:${profile.email}`} className="btn btn-ghost">
              <EnvelopeSimple size={16} aria-hidden="true" />
              Write an email
            </a>
            <a href={profile.resume} download="Sriram_Resume.pdf" className="btn btn-ghost">
              <DownloadSimple size={16} aria-hidden="true" />
              Resume
            </a>
          </div>
        </Reveal>

        <Reveal as="section" delay={0.1} className="lg:col-span-5" aria-labelledby="contact-elsewhere">
          <h2 id="contact-elsewhere" className="meta">
            Elsewhere
          </h2>
          <ul className="mt-3 border-t border-line">
            {socials.map(({ key, label, handle, href }) => {
              const Icon = socialIcons[key]
              return (
                <li key={key} className="border-b border-line">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-5"
                  >
                    <Icon size={24} aria-hidden="true" className="shrink-0" />
                    <span className="font-display text-xl font-semibold tracking-[-0.02em]">{label}</span>
                    <span className="min-w-0 flex-1 truncate text-right text-[0.9375rem] text-muted">{handle}</span>
                    <span className="sr-only">(opens in a new tab)</span>
                    <ArrowUpRight
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </>
  )
}
