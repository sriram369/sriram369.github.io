import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { allPaths, legacyHashPaths, matchRoute } from './lib/routes'
import { metaFor } from './lib/meta'

// Build-time entry: scripts/prerender.mjs calls this once per URL.
export function render(path) {
  const html = renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  )
  return { html, meta: metaFor(matchRoute(path)) }
}

export { allPaths, legacyHashPaths }
