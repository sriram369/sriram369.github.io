import { ArrowUpRight, FilePdf, GithubLogo, LinkedinLogo, PresentationChart } from '@phosphor-icons/react'

const linkIcons = {
  demo: ArrowUpRight,
  github: GithubLogo,
  report: FilePdf,
  slides: PresentationChart,
  linkedin: LinkedinLogo,
}

// External links for a project (demo, code, report). `primaryFirst` makes the
// first one the solid button, for pages where it is the main action.
export default function ProjectLinks({ project, primaryFirst = false, size = '' }) {
  return project.links.map((link, index) => {
    const Icon = linkIcons[link.kind]
    return (
      <a
        key={link.href}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${size} ${primaryFirst && index === 0 ? 'btn-primary' : 'btn-ghost'}`}
      >
        <Icon size={16} aria-hidden="true" weight={link.kind === 'demo' ? 'bold' : 'regular'} />
        {link.label}
        <span className="sr-only"> for {project.title} (opens in a new tab)</span>
      </a>
    )
  })
}
