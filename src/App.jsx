import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import Projects from './pages/Projects'
import Project from './pages/Project'
import Education from './pages/Education'
import Coursework from './pages/Coursework'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useRouter } from './lib/router'
import { useTheme } from './lib/theme'
import { metaFor } from './lib/meta'

// Overlays are only needed after a click or shortcut, so they load on demand
// and stay out of the first download.
const CommandPalette = lazy(() => import('./components/CommandPalette'))
const AskSri = lazy(() => import('./components/AskSri'))

const pages = {
  home: Home,
  experience: Work,
  projects: Projects,
  project: Project,
  education: Education,
  coursework: Coursework,
  certifications: Certifications,
  contact: Contact,
  notfound: NotFound,
}

const isTyping = (target) =>
  target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

// `initialPath` is the URL being pre-rendered at build time or hydrated in the browser.
export default function App({ initialPath }) {
  const [route, navigate] = useRouter(initialPath)
  const [theme, toggleTheme] = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  // null = closed; a string (possibly empty) = open, seeded with that question.
  const [askSeed, setAskSeed] = useState(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    // After a client-side navigation: sync the tab, start at the top, and move
    // focus to the new page heading so keyboard and screen reader users land on it.
    const meta = metaFor(route)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', meta.url)
    window.scrollTo({ top: 0, behavior: 'instant' })
    requestAnimationFrame(() => document.getElementById('page-title')?.focus({ preventScroll: true }))
  }, [route])

  useEffect(() => {
    const onKeyDown = (event) => {
      const commandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      const slash = event.key === '/' && !isTyping(event.target)
      if (commandK || slash) {
        event.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const openAsk = useCallback((question = '') => setAskSeed(question), [])
  const Page = pages[route.page]

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="btn btn-primary fixed top-3 left-3 z-50 -translate-y-20 focus-visible:translate-y-0"
      >
        Skip to content
      </a>

      <Nav page={route.page} theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />

      <main id="main" tabIndex={-1} className="min-h-[100dvh] outline-none">
        {/* Keyed by path so each page fades in fresh and its own entry motion replays. */}
        <motion.div key={route.path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <Page projectId={route.projectId} onAsk={openAsk} />
        </motion.div>
      </main>

      <Footer page={route.page} />

      <Suspense fallback={null}>
        {paletteOpen && (
          <CommandPalette
            onClose={() => setPaletteOpen(false)}
            navigate={navigate}
            theme={theme}
            toggleTheme={toggleTheme}
            onAsk={openAsk}
          />
        )}
        {askSeed !== null && <AskSri seed={askSeed} onClose={() => setAskSeed(null)} />}
      </Suspense>
    </MotionConfig>
  )
}
