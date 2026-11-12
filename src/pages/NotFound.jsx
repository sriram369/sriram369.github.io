import { ArrowRight } from '@phosphor-icons/react'
import { PageHeader } from '../components/ui'

export default function NotFound() {
  return (
    <PageHeader title="Page not found" lead="That link does not go anywhere. The page may have moved when the site was rebuilt.">
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/" className="btn btn-primary">
          Home
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </a>
        <a href="/projects/" className="btn btn-ghost">
          Projects
        </a>
      </div>
    </PageHeader>
  )
}
