import { useState, useEffect } from 'react'

const links = ['Experience', 'Education', 'Projects', 'Coursework', 'Certifications', 'Contact']

export default function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (page) => {
    setActivePage(page)
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        backgroundColor: scrolled || menuOpen ? 'rgba(250, 250, 248, 0.97)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(228, 224, 216, 0.7)' : 'none',
      }}>
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="font-display"
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#111218',
            textDecoration: 'none',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          SN<span style={{ color: '#0891B2' }}>.</span>
        </button>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {links.map(link => {
            const pageKey = link.toLowerCase()
            const isActive = activePage === pageKey
            return (
              <button
                key={link}
                onClick={() => navigate(pageKey)}
                className="nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: isActive ? '#0891B2' : undefined,
                  borderBottom: isActive ? '1px solid #0891B2' : undefined,
                  paddingBottom: isActive ? '2px' : undefined,
                }}
              >
                {link}
              </button>
            )
          })}
        </div>

        {/* Hamburger — hidden on desktop via CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#111218',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {menuOpen ? (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px', left: 0, right: 0,
          zIndex: 99,
          background: 'rgba(250,250,248,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(228,224,216,0.7)',
          padding: '8px 0 16px',
        }}>
          {links.map(link => {
            const pageKey = link.toLowerCase()
            const isActive = activePage === pageKey
            return (
              <button
                key={link}
                onClick={() => navigate(pageKey)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0891B2' : '#374151',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(228,224,216,0.4)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#0891B2' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#374151' }}
              >
                {link}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
