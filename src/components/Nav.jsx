import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { List, MagnifyingGlass, Moon, Sun, X } from '@phosphor-icons/react'
import { navLinks, profile } from '../data/site'
import { hrefFor } from '../lib/router'
import { EASE } from '../lib/motion'

const iconButton =
  'inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-sunken hover:text-ink'

export default function Nav({ page, navigate, theme, onToggleTheme, onOpenPalette }) {
  // The menu remembers which page it was opened on, so any navigation
  // (including back/forward) closes it without extra bookkeeping.
  const [openedOn, setOpenedOn] = useState(null)
  const menuOpen = openedOn === page
  const setMenuOpen = (next) => setOpenedOn(next ? page : null)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpenedOn(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const go = (key) => (event) => {
    // Let modified clicks (new tab, etc.) behave natively.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(key)
    setMenuOpen(false)
  }

  const links = [...navLinks, { key: 'contact', label: 'Contact' }]
  // Coursework and Certifications hang off Education, so it stays lit on those pages.
  const section = ['coursework', 'certifications'].includes(page) ? 'education' : page

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href={hrefFor('home')}
          onClick={go('home')}
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
                  onClick={go(key)}
                  aria-current={page === key ? 'page' : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-sunken"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
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
            className="hidden h-10 items-center gap-2 rounded-full border border-line bg-surface pr-2 pl-3 text-sm text-muted transition-colors hover:border-ink hover:text-ink md:inline-flex"
          >
            <MagnifyingGlass size={15} aria-hidden="true" />
            <span>Search</span>
            <kbd aria-hidden="true" className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted">⌘K</kbd>
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
            onClick={() => setMenuOpen(!menuOpen)}
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
                    onClick={go(key)}
                    aria-current={page === key ? 'page' : undefined}
                    className={`flex h-12 items-center font-display text-xl font-medium tracking-[-0.02em] ${
                      page === key ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    <span className={page === key ? 'mark' : ''}>{label}</span>
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
