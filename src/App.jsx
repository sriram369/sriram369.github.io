import { useEffect, useRef, useState } from 'react'
import { MotionConfig, motion } from 'motion/react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'
import Work from './pages/Work'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Coursework from './pages/Coursework'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'
// SriChat (the "ask Sri" assistant), About, and Achievements are kept in
// ./components for later use and are intentionally not mounted.
import { pageMeta } from './data/site'
import { useHashRoute } from './lib/router'
import { useTheme } from './lib/theme'

const pages = {
  home: Home,
  experience: Work,
  projects: Projects,
  education: Education,
  coursework: Coursework,
  certifications: Certifications,
  contact: Contact,
}

const isTyping = (target) =>
  target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

export default function App() {
  const [page, navigate] = useHashRoute()
  const [theme, toggleTheme] = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    const meta = pageMeta[page]
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)

    // A hash like "#projects/finrag" targets one card; that page handles its own scroll.
    const deepLink = window.location.hash.includes('/')
    if (!deepLink) window.scrollTo({ top: 0, behavior: 'instant' })

    // After a client-side navigation, move focus to the new page heading so
    // keyboard and screen reader users land on the new content.
    if (firstRender.current) {
      firstRender.current = false
    } else {
      requestAnimationFrame(() => document.getElementById('page-title')?.focus({ preventScroll: true }))
    }
  }, [page])

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

  const Page = pages[page]

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

      <Nav
        page={page}
        navigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main id="main" tabIndex={-1} className="min-h-[100dvh] outline-none">
        {/* Keyed by page so each page fades in fresh and its own entry motion replays. */}
        <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <Page />
        </motion.div>
      </main>

      <Footer page={page} />

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          navigate={navigate}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </MotionConfig>
  )
}
