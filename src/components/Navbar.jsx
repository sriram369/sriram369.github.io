import { useState, useEffect } from 'react'

const links = ['About', 'Experience', 'Education', 'Projects', 'Coursework', 'Certifications', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 40px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      backgroundColor: scrolled ? 'rgba(250, 250, 248, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(228, 224, 216, 0.7)' : 'none',
    }}>
      {/* Logo */}
      <a href="#" className="font-display" style={{
        fontSize: '24px',
        fontWeight: 600,
        color: '#111218',
        textDecoration: 'none',
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}>
        SN<span style={{ color: '#0891B2' }}>.</span>
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
            {link}
          </a>
        ))}
      </div>

    </nav>
  )
}
