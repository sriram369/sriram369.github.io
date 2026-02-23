import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const journey = [
  { city: 'Hyderabad', flag: '🇮🇳' },
  { city: 'Bengaluru', flag: '🇮🇳' },
  { city: 'Vellore', flag: '🇮🇳' },
  { city: 'Singapore', flag: '🇸🇬' },
  { city: 'Washington D.C.', flag: '🇺🇸', current: true },
]

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '100px 20px 60px' : '120px 40px 80px',
        background: 'linear-gradient(150deg, #FAFAF8 0%, #F4F1EA 40%, #EAF4F8 100%)',
      }}
    >
      {/* Ambient glow blobs */}
      <div
        className="animate-pulse-slow"
        style={{
          position: 'absolute', top: '10%', right: '8%',
          width: isMobile ? '280px' : '520px',
          height: isMobile ? '280px' : '520px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(8,145,178,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="animate-float-slow"
        style={{
          position: 'absolute', bottom: '15%', left: '3%',
          width: isMobile ? '200px' : '380px',
          height: isMobile ? '200px' : '380px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(196,147,63,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Giant watermark letter */}
      <div
        className="font-display"
        style={{
          position: 'absolute', top: '-4%', right: '0%',
          fontSize: 'clamp(140px, 28vw, 480px)',
          fontWeight: 700, lineHeight: 1,
          color: 'rgba(17,18,24,0.028)',
          pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        S
      </div>

      {/* Floating decorative rings — hidden on mobile */}
      {!isMobile && (
        <>
          <div
            className="animate-float-reverse"
            style={{
              position: 'absolute', top: '20%', right: '18%',
              width: '120px', height: '120px', borderRadius: '50%',
              border: '1.5px solid rgba(8,145,178,0.18)',
              pointerEvents: 'none',
            }}
          />
          <div
            className="animate-float"
            style={{
              position: 'absolute', top: '35%', right: '25%',
              width: '48px', height: '48px', borderRadius: '50%',
              border: '1.5px solid rgba(196,147,63,0.22)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Content */}
      <div style={{ maxWidth: '960px', position: 'relative', zIndex: 1 }}>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display"
          style={{
            fontSize: 'clamp(48px, 9vw, 120px)',
            fontWeight: 600,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: '#111218',
            marginBottom: '24px',
          }}
        >
          Sriram<br />
          <em style={{ fontStyle: 'italic', color: '#1A3A52' }}>Naidu Thota</em>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontSize: 'clamp(15px, 2vw, 21px)',
            fontWeight: 400,
            color: '#4B5563',
            lineHeight: 1.55,
            maxWidth: '500px',
            marginBottom: '36px',
            letterSpacing: '-0.01em',
          }}
        >
          AI & Business — Building at the intersection of technology, strategy, and human impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: isMobile ? '48px' : '72px',
          }}
        >
          <CTAButton href="#projects" variant="primary">View Projects</CTAButton>
          <CTAButton href="#contact" variant="teal">Get in Touch</CTAButton>
          <CTAButton href="/Sriram_Resume.pdf" variant="ghost" download="Sriram_Resume.pdf">Download Resume ↓</CTAButton>
        </motion.div>

        {/* Journey strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0' }}
        >
          {journey.map((stop, i) => (
            <span key={stop.city} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '5px 10px',
                background: stop.current ? '#111218' : 'transparent',
                color: stop.current ? '#FAFAF8' : '#374151',
                borderRadius: '100px',
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: stop.current ? 600 : 400,
                letterSpacing: '0.02em',
                border: stop.current ? 'none' : '1px solid transparent',
              }}>
                <span>{stop.flag}</span>
                {stop.city}
              </span>
              {i < journey.length - 1 && (
                <span style={{ color: '#D1D5DB', fontSize: '11px', padding: '0 2px' }}>→</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute', bottom: '36px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}
      >
        <span style={{ fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: '1.5px', height: '24px', background: 'linear-gradient(to bottom, #9CA3AF, transparent)' }}
        />
      </motion.div>
    </section>
  )
}

function CTAButton({ href, variant, children, download }) {
  const base = {
    display: 'inline-flex', alignItems: 'center',
    padding: '11px 24px',
    borderRadius: '8px',
    fontSize: '14px', fontWeight: 500,
    textDecoration: 'none',
    letterSpacing: '0.02em',
    transition: 'all 0.22s ease',
    cursor: 'pointer',
  }
  const variants = {
    primary: { background: '#111218', color: '#FAFAF8', border: 'none' },
    teal: { background: '#0891B2', color: '#fff', border: 'none' },
    ghost: { background: 'transparent', color: '#374151', border: '1.5px solid #E4E0D8' },
  }
  const hoverMap = {
    primary: { background: '#1E2342' },
    teal: { background: '#0771A2' },
    ghost: { background: '#F0EDE6', borderColor: '#C9BFB0' },
  }
  return (
    <a
      href={href}
      download={download}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={e => Object.assign(e.currentTarget.style, hoverMap[variant])}
      onMouseLeave={e => Object.assign(e.currentTarget.style, variants[variant])}
    >
      {children}
    </a>
  )
}
