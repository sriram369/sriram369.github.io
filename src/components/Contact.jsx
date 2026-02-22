import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const socials = [
  {
    label: 'LinkedIn',
    handle: 'Connect on LinkedIn',
    sub: 'Best way to reach me',
    href: 'https://www.linkedin.com/in/sriramthota/',
    primary: true,
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    handle: 'github.com/sriram369',
    sub: 'See my code',
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
      background: '#111218',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(8,145,178,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '10%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(181,134,13,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '48px', textAlign: 'center' }}
        >
          <span style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#0891B2',
            marginBottom: '14px', display: 'block',
          }}>
            08 — Contact
          </span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 68px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#FAFAF8',
            marginBottom: '20px',
          }}>
            Let's Connect
          </h2>
          <p style={{
            fontSize: '17px', lineHeight: 1.75, color: '#9CA3AF',
            maxWidth: '440px', margin: '0 auto',
            letterSpacing: '-0.01em',
          }}>
            Whether you're recruiting, collaborating, or just want to say hi — I'd love to connect.
          </p>
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
          whileHover={{ y: -4, boxShadow: '0 24px 64px rgba(8,145,178,0.25)' }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '14px',
            padding: isMobile ? '18px 24px' : '22px 40px',
            background: '#0891B2',
            borderRadius: '16px',
            marginBottom: '16px',
            textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
        >
          <svg width="26" height="26" fill="white" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
              Connect on LinkedIn
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
              linkedin.com/in/sriramthota
            </div>
          </div>
          <svg style={{ marginLeft: 'auto' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.a>

        {/* Secondary links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {socials.slice(1).map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '18px 20px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              whileHover={{
                background: 'rgba(8,145,178,0.10)',
                borderColor: 'rgba(8,145,178,0.25)',
                x: isMobile ? 0 : 4,
              }}
            >
              <span style={{ color: '#0891B2', flexShrink: 0 }}>{link.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#E5E7EB', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {link.handle}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>{link.sub}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
