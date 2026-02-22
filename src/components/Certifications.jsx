import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const certs = [
  { title: 'Google Code In', issuer: 'Google', date: null, link: '/google-code-in.pdf' },
  { title: 'Wildlife Ecology', issuer: 'NPTEL', date: 'Nov 2024', link: '/wildlife.pdf' },
  { title: 'English Proficiency Certificate', issuer: 'Duolingo Test', date: 'Sep 2024 · Expires Sep 2026', link: 'https://certs.duolingo.com/u4e4rnmdpbfftbf7' },
  { title: 'Forest Management', issuer: 'NPTEL', date: 'May 2024', link: '/forest-management.pdf' },
  { title: 'Paragon One Certificate', issuer: 'Paragon One', date: 'Dec 2023', link: 'https://www.credential.net/0a2218a8-10ac-4006-bace-0d0366346d22#acc.avUzWBFu' },
  { title: 'Foundations: Data, Data, Everywhere', issuer: 'Google', date: 'Oct 2023', link: 'https://www.coursera.org/verify/HRKVU4K5TGVP' },
  { title: 'Foundations of User Experience (UX) Design', issuer: 'Google', date: 'Apr 2021', link: 'https://www.coursera.org/verify/WVE64SQSK59V' },
  { title: 'Programming in HTML5 with JavaScript and CSS3', issuer: 'NIIT Limited', date: null, link: null },
  { title: 'What is Data Science?', issuer: 'IBM', date: 'Mar 2020', link: 'https://www.coursera.org/verify/AMY3XPLM5US7' },
  { title: 'Python for Data Science and AI', issuer: 'IBM', date: 'Apr 2020', link: 'https://www.coursera.org/verify/SGZ78WAGWQBP' },
]

export default function Certifications() {
  const isMobile = useIsMobile()

  return (
    <section id="certifications" style={{
      padding: isMobile ? '60px 20px' : '80px 40px',
      background: '#FAFAF8',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '40px' }}
        >
          <span className="section-label">07 — Certifications</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
            marginTop: '12px',
          }}>
            Certifications
          </h2>
        </motion.div>

        {/* List */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          style={{
            background: '#fff',
            border: '1px solid #F0EDE8',
            borderRadius: '16px',
            padding: isMobile ? '8px 16px' : '8px 32px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}
        >
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              style={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'column' : 'row',
                padding: '14px 0',
                borderBottom: i < certs.length - 1 ? '1px solid #F3F0E8' : 'none',
                gap: isMobile ? '10px' : '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1, minWidth: 0 }}>
                {!isMobile && (
                  <span style={{
                    fontSize: '11px', fontWeight: 600,
                    color: '#9CA3AF', letterSpacing: '0.03em',
                    minWidth: '100px', flexShrink: 0,
                    paddingTop: '2px',
                  }}>
                    {cert.issuer}
                  </span>
                )}
                <div style={{ minWidth: 0 }}>
                  {isMobile && (
                    <span style={{
                      fontSize: '11px', fontWeight: 600,
                      color: '#9CA3AF', letterSpacing: '0.03em',
                      display: 'block', marginBottom: '3px',
                    }}>
                      {cert.issuer}
                    </span>
                  )}
                  <span style={{ fontSize: '14px', color: '#1F2937', fontWeight: 400, lineHeight: 1.4 }}>
                    {cert.title}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                {cert.date && !isMobile && (
                  <span style={{ fontSize: '12px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                    {cert.date}
                  </span>
                )}
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '3px 10px',
                      borderRadius: '100px',
                      fontSize: '11px', fontWeight: 600,
                      letterSpacing: '0.04em',
                      background: 'rgba(16,185,129,0.1)',
                      color: '#059669',
                      border: '1px solid rgba(16,185,129,0.2)',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.2)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.1)' }}
                  >
                    View ↗
                  </a>
                ) : (
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '100px',
                    fontSize: '11px', fontWeight: 600,
                    letterSpacing: '0.04em',
                    background: 'rgba(16,185,129,0.1)',
                    color: '#059669',
                    border: '1px solid rgba(16,185,129,0.2)',
                  }}>
                    Done
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
