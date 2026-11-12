import { useCallback, useEffect, useState } from 'react'
import { matchRoute } from './routes'

const isPlainLeftClick = (event) =>
  event.button === 0 && !event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

// Path routing over static files: the build writes real HTML for every route,
// and after the first load this hook turns same-site link clicks into
// client-side navigations. `initialPath` is the path being pre-rendered or hydrated.
export function useRouter(initialPath) {
  const [route, setRoute] = useState(() => matchRoute(initialPath))

  const navigate = useCallback((path) => {
    const next = matchRoute(path)
    if (next.path !== window.location.pathname) window.history.pushState(null, '', next.path)
    setRoute(next)
  }, [])

  useEffect(() => {
    const onPopState = () => setRoute(matchRoute(window.location.pathname))

    // One listener for the whole document, so plain <a href="/work/"> works everywhere.
    const onClick = (event) => {
      if (!isPlainLeftClick(event)) return
      const anchor = event.target.closest?.('a[href]')
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href)
      if (url.origin !== window.location.origin || url.hash) return
      if (matchRoute(url.pathname).page === 'notfound') return // files such as /Sriram_Resume.pdf
      event.preventDefault()
      navigate(url.pathname)
    }

    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onClick)
    }
  }, [navigate])

  return [route, navigate]
}
