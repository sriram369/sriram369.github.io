import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const journey = [
  { city: 'Hyderabad' },
  { city: 'Bengaluru' },
  { city: 'Vellore' },
  { city: 'Singapore' },
  { city: 'Washington D.C.', current: true },
]

const SHOW_EXTRAS = false // CTAs, journey strip, scroll indicator — hidden for now, re-enable when needed

const bioLineStyle = {
  fontSize: '15px',
  fontWeight: 400,
  color: '#4B5563',
  lineHeight: 1.55,
  maxWidth: '480px',
  letterSpacing: '-0.01em',
  margin: '0 0 8px',
}

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
      <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Photo + bio row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'center',
            justifyContent: 'center',
            gap: isMobile ? '20px' : '40px',
            marginBottom: '36px',
            width: 'fit-content',
            margin: '0 auto 36px',
          }}
        >
          <img
            src="/sriram-photo.jpg"
            alt="Sriram Naidu Thota"
            style={{
              width: isMobile ? '160px' : '220px',
              height: isMobile ? '200px' : '280px',
              borderRadius: '20px',
              objectFit: 'cover',
              objectPosition: '50% 20%',
              flexShrink: 0,
              boxShadow: '0 12px 32px rgba(17,18,24,0.14)',
              filter: 'saturate(1.08) contrast(1.04) brightness(1.02)',
            }}
          />
          <div>
            <p style={{ ...bioLineStyle, textTransform: 'lowercase', fontSize: '19px' }}>
              Hi, I'm <strong style={{ fontWeight: 700 }}>Sriram</strong>, based out of NYC 🗽. I love building AI agents.
            </p>
            <p style={{ ...bioLineStyle, textTransform: 'lowercase' }}>
              A product-minded engineer building AI products for real world.
            </p>
            <p style={{ ...bioLineStyle, textTransform: 'lowercase' }}>
              I work at the intersection of product, AI, and software engineering.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <p style={{ ...bioLineStyle, margin: 0 }}>
                Currently SDE @{' '}
                <a
                  href="https://www.nouveauelevator.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                >
                  Nouveau Elevator
                </a>
              </p>
              <a href="https://www.nouveauelevator.com/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/nouveau-favicon.jpg"
                  alt="Nouveau Elevator"
                  style={{
                    width: '18px', height: '18px', borderRadius: '5px',
                    objectFit: 'cover', flexShrink: 0,
                  }}
                />
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <p style={{ ...bioLineStyle, margin: 0 }}>
                MS, Information Systems @{' '}
                <a
                  href="https://carey.jhu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                >
                  Johns Hopkins University
                </a>
              </p>
              <a href="https://carey.jhu.edu/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/jhu-favicon.png"
                  alt="Johns Hopkins University"
                  style={{
                    width: '18px', height: '18px', borderRadius: '5px',
                    objectFit: 'cover', flexShrink: 0,
                  }}
                />
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 }}>
              <p style={{ ...bioLineStyle, margin: 0 }}>
                BTech, Computer Engineering @{' '}
                <a
                  href="https://vit.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                >
                  VIT Vellore
                </a>
              </p>
              <a href="https://vit.ac.in/" target="_blank" rel="noopener noreferrer">
                <img
                  src="/vit-favicon.jpg"
                  alt="VIT Vellore"
                  style={{
                    width: '18px', height: '18px', borderRadius: '5px',
                    objectFit: 'cover', flexShrink: 0,
                  }}
                />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: '10px',
            width: 'fit-content',
            margin: '48px auto 0',
          }}
        >
          <LowKeyButton href="#experience">my work</LowKeyButton>
          <LowKeyButton href="#projects">my projects</LowKeyButton>
          <LowKeyButton href="#contact">contact me</LowKeyButton>
          <LowKeyButton href="/Sriram_Resume.pdf" download="Sriram_Resume.pdf">download resume</LowKeyButton>
        </motion.div>

        {SHOW_EXTRAS && (
          <>
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
                    {stop.city}
                  </span>
                  {i < journey.length - 1 && (
                    <span style={{ color: '#D1D5DB', fontSize: '11px', padding: '0 2px' }}>→</span>
                  )}
                </span>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Scroll indicator */}
      {SHOW_EXTRAS && (
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
      )}
    </section>
  )
}

function LowKeyButton({ href, children, download }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '9px 18px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    textTransform: 'lowercase',
    letterSpacing: '0.01em',
    color: '#374151',
    textDecoration: 'none',
    border: '1.5px solid #E4E0D8',
    background: 'transparent',
    transition: 'all 0.22s ease',
    cursor: 'pointer',
  }
  return (
    <a
      href={href}
      download={download}
      style={base}
      onMouseEnter={e => { e.currentTarget.style.background = '#F0EDE6'; e.currentTarget.style.borderColor = '#C9BFB0' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#E4E0D8' }}
    >
      {children}
    </a>
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
