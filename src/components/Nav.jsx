import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { List, MagnifyingGlass, Moon, Sun, X } from '@phosphor-icons/react'
import { navLinks, profile } from '../data/site'
import { hrefFor } from '../lib/routes'
import { EASE } from '../lib/motion'

const iconButton = 'icon-btn'

// Links are plain anchors; the router turns same-site clicks into client-side navigations.
export default function Nav({ page, theme, onToggleTheme, onOpenPalette }) {
  // The menu remembers which page it was opened on, so any navigation
  // (including back/forward) closes it without extra bookkeeping.
  const [openedOn, setOpenedOn] = useState(null)
  const menuOpen = openedOn === page

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpenedOn(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const links = [...navLinks, { key: 'contact', label: 'Contact' }]
  // Sub-pages keep their parent lit: Coursework and Certifications under Education, a project under Projects.
  const parents = { coursework: 'education', certifications: 'education', project: 'projects' }
  const section = parents[page] ?? page

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href={hrefFor('home')}
          className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] whitespace-nowrap"
        >
          {profile.name}
        </a>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="mr-2 hidden items-center md:flex">
            {links.map(({ key, label }) => {
              const active = section === key
              return (
                <a
                  key={key}
                  href={hrefFor(key)}
                  aria-current={page === key ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-sunken"
                      transition={{ type: 'spring', bounce: 0.12, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={onOpenPalette}
            aria-keyshortcuts="Meta+K Control+K"
            className="btn btn-ghost btn-sm hidden gap-2 pr-2.5 pl-3 font-normal text-muted md:inline-flex"
          >
            <MagnifyingGlass size={15} aria-hidden="true" />
            <span>Search</span>
            <kbd aria-hidden="true" className="kbd">⌘K</kbd>
          </button>
          <button type="button" onClick={onOpenPalette} aria-label="Search the site" className={`${iconButton} md:hidden`}>
            <MagnifyingGlass size={19} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className={iconButton}
          >
            {theme === 'dark' ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => setOpenedOn(menuOpen ? null : page)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`${iconButton} md:hidden`}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <List size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="px-5 py-3">
              {links.map(({ key, label }) => (
                <li key={key}>
                  <a
                    href={hrefFor(key)}
                      aria-current={page === key ? 'page' : undefined}
                    className={`flex h-12 items-center font-display text-xl font-medium tracking-[-0.02em] ${
                      page === key ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
