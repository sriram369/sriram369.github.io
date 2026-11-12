import { useCallback, useEffect, useState } from 'react'
import { pageMeta } from '../data/site'

const pageKeys = Object.keys(pageMeta)

function pageFromHash() {
  const hash = window.location.hash.replace('#', '').toLowerCase().split('/')[0]
  return pageKeys.includes(hash) ? hash : 'home'
}

export function hrefFor(page) {
  return page === 'home' ? '#home' : `#${page}`
}

// Hash routing: the site is served as static files from GitHub Pages, so every
// page has to resolve from index.html without server rewrites.
export function useHashRoute() {
  const [page, setPage] = useState(pageFromHash)

  useEffect(() => {
    const sync = () => setPage(pageFromHash())
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  const navigate = useCallback((next) => {
    const target = pageKeys.includes(next) ? next : 'home'
    if (target === 'home') {
      // Keep the home URL clean instead of leaving a dangling "#home".
      window.history.pushState(null, '', window.location.pathname + window.location.search)
      setPage('home')
    } else if (window.location.hash !== `#${target}`) {
      window.location.hash = target
    } else {
      setPage(target)
    }
  }, [])

  return [page, navigate]
}
