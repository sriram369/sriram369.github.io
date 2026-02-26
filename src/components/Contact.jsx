import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const socials = [
  {
    label: 'GitHub',
    handle: 'github.com/sriram369',
    sub: 'See my code & projects',
    href: 'https://github.com/sriram369',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'thotasriramnaidu@gmail.com',
    sub: 'Drop me a line',
    href: 'mailto:thotasriramnaidu@gmail.com',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    handle: '@chillybrosriram',
    sub: 'Follow on X',
    href: 'https://x.com/chillybrosriram',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const isMobile = useIsMobile()

  return (
    <section id="contact" style={{
      padding: isMobile ? '80px 20px' : '120px 40px',
      background: '#FAFAF8',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
    }}>
      {/* Background accents */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '40%', height: '100%',
        background: 'linear-gradient(to left, rgba(8,145,178,0.03), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(196,147,63,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginBottom: '56px' }}
        >
          <span className="section-label">07 — Contact</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
            marginTop: '12px', marginBottom: '16px',
          }}>
            Let's Connect
          </h2>
          <p style={{
            fontSize: '17px', lineHeight: 1.75, color: '#4B5563',
            maxWidth: '480px', letterSpacing: '-0.01em',
          }}>
            Whether you're recruiting, collaborating, or just want to say hi — I'd love to hear from you.
          </p>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '10px 18px',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '10px',
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 0 3px rgba(16,185,129,0.2)',
            }} />
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#065F46' }}>
              Open to full-time roles — available Summer 2026
            </span>
          </div>
        </motion.div>

        {/* LinkedIn primary CTA */}
        <motion.a
          href="https://www.linkedin.com/in/sriramthota/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -3, boxShadow: '0 20px 48px rgba(8,145,178,0.2)' }}
          style={{
            display: 'flex', alignItems: 'center',
            gap: '16px',
            padding: isMobile ? '20px 24px' : '24px 32px',
            background: '#111218',
            borderRadius: '16px',
            marginBottom: '16px',
            textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: '#0891B2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#FAFAF8', letterSpacing: '-0.01em' }}>
              Connect on LinkedIn
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
              linkedin.com/in/sriramthota
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.a>

        {/* Secondary links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '48px',
        }}>
          {socials.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(8,145,178,0.1)' }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '18px 20px',
                background: '#F0F9FF',
                border: '1px solid rgba(8,145,178,0.15)',
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ color: '#0891B2', flexShrink: 0 }}>{link.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#111218', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {link.handle}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>{link.sub}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #E4E0D8', marginBottom: '40px' }} />

        {/* Quote / closing note */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            padding: '32px',
            background: '#111218',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: '-30px', right: '-30px',
            width: '140px', height: '140px', borderRadius: '50%',
            background: 'rgba(8,145,178,0.12)',
            pointerEvents: 'none',
          }} />
          <div className="font-display" style={{
            fontSize: '48px', color: '#0891B2', lineHeight: 1,
            marginBottom: '12px', fontWeight: 300,
          }}>
            "
          </div>
          <p style={{
            fontSize: '17px', lineHeight: 1.7,
            color: '#E5E7EB', fontStyle: 'italic',
            letterSpacing: '-0.01em', maxWidth: '560px',
            marginBottom: '20px',
          }}>
            I'm always up for building something meaningful. Let's make it happen.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#0891B2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="font-display" style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>S</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#FAFAF8' }}>Sriram Naidu Thota</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>M.S. ISAI · Johns Hopkins University</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
