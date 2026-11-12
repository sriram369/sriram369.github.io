import { Check, Copy, DownloadSimple } from '@phosphor-icons/react'
import { profile, socials } from '../data/site'
import { hrefFor } from '../lib/router'
import { useCopy } from '../lib/clipboard'
import { socialIcons } from '../lib/icons'
import { Container, Reveal } from './ui'

const secondary = [
  { key: 'coursework', label: 'Coursework' },
  { key: 'certifications', label: 'Certifications' },
]

export function CopyEmailButton({ className = 'btn btn-primary' }) {
  const [status, copy] = useCopy()
  const label = status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy email'
  return (
    <button type="button" onClick={() => copy(profile.email)} className={className}>
      {status === 'copied' ? <Check size={16} weight="bold" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span aria-live="polite">{label}</span>
    </button>
  )
}

export default function Footer({ page }) {
  const showInvite = page !== 'contact'

  return (
    <footer className="mt-24 border-t border-line sm:mt-32">
      {showInvite && (
        <Container className="py-16 sm:py-24">
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                Want to build something together?
              </h2>
              <a href={`mailto:${profile.email}`} className="link mt-5 inline-block text-lg text-muted">
                {profile.email}
              </a>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <CopyEmailButton />
              <a href={profile.resume} download="Sriram_Resume.pdf" className="btn btn-ghost">
                <DownloadSimple size={16} aria-hidden="true" />
                Resume
              </a>
            </div>
          </Reveal>
        </Container>
      )}

      <div className={showInvite ? 'border-t border-line' : ''}>
        <Container className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {profile.name}, {profile.location}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <nav aria-label="More pages" className="flex gap-5 text-sm">
              {secondary.map(({ key, label }) => (
                <a
                  key={key}
                  href={hrefFor(key)}
                  aria-current={page === key ? 'page' : undefined}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {label}
                </a>
              ))}
            </nav>
            <ul className="-mx-2 flex items-center">
              {socials.map(({ key, label, href }) => {
                const Icon = socialIcons[key]
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-sunken hover:text-ink"
                    >
                      <Icon size={19} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  )
}
