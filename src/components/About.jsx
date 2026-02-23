import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const interests = ['AI & Machine Learning', 'Product Strategy', 'Data Science', 'Computer Vision', 'LLMs', 'Social Media & Content']

export default function About() {
  const isMobile = useIsMobile()

  return (
    <section id="about" style={{ padding: isMobile ? '80px 20px' : '120px 40px', background: '#FAFAF8', position: 'relative' }}>
      {/* Subtle background accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '40%', height: '100%',
        background: 'linear-gradient(to left, rgba(8,145,178,0.025), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        {/* Section label */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginBottom: '48px' }}
        >
          <span className="section-label">02 — About</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
            marginTop: '12px',
          }}>
            The Story
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px',
          alignItems: 'start',
        }}>
          {/* Left — Bio */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p style={{
              fontSize: '17px', lineHeight: 1.8, color: '#374151',
              marginBottom: '24px', letterSpacing: '-0.01em',
            }}>
              Born in <strong style={{ color: '#111218' }}>Hyderabad</strong> and raised in
              {' '}<strong style={{ color: '#111218' }}>Bengaluru</strong>, I pursued Computer Science & Engineering
              at <strong style={{ color: '#111218' }}>VIT Vellore</strong>, specializing in Business Systems —
              building the bridge between technical depth and business acumen from day one.
            </p>
            <p style={{
              fontSize: '17px', lineHeight: 1.8, color: '#374151',
              marginBottom: '24px', letterSpacing: '-0.01em',
            }}>
              In 2023, a summer exchange at the{' '}
              <strong style={{ color: '#111218' }}>National University of Singapore</strong> expanded my global
              perspective — where I built Ikshana, a computer vision project that sharpened my eye for
              real-world AI applications. That same year, I interned at{' '}
              <strong style={{ color: '#111218' }}>Ola's Krutrim AI</strong> division, working on large language
              models — fine-tuning LLMs and engineering prompts to make them multilingual for India's diverse
              linguistic landscape. You can check out some of that work at{' '}
              <a href="https://www.kruti.ai/" target="_blank" rel="noopener noreferrer" style={{ color: '#0891B2', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(8,145,178,0.3)' }}>kruti.ai</a>.
            </p>
            <p style={{
              fontSize: '17px', lineHeight: 1.8, color: '#374151',
              marginBottom: '40px', letterSpacing: '-0.01em',
            }}>
              Today, I'm pursuing my M.S. in{' '}
              <strong style={{ color: '#111218' }}>Information Systems & AI for Business</strong> at{' '}
              <strong style={{ color: '#111218' }}>Johns Hopkins University</strong> in Washington D.C.,
              while serving as <strong style={{ color: '#111218' }}>Social Media Head</strong> for the JHU DC Campus —
              leading teams, building brands, and shipping projects that make a real impact. Follow our work on{' '}
              <a href="https://www.instagram.com/jhucarey/" target="_blank" rel="noopener noreferrer" style={{ color: '#0891B2', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(8,145,178,0.3)' }}>Instagram</a>
              {' '}and{' '}
              <a href="https://www.linkedin.com/school/jhucarey/" target="_blank" rel="noopener noreferrer" style={{ color: '#0891B2', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(8,145,178,0.3)' }}>LinkedIn</a>.

              {/* OPT badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 14px',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: '8px',
                fontSize: '13px',
                marginTop: '16px',
                marginBottom: '4px',
              }}>
                <span>🇺🇸</span>
                <span>
                  <span style={{ fontWeight: 600, color: '#059669' }}>F-1 Student</span>
                  <span style={{ color: '#6B7280', marginLeft: '4px' }}>· OPT &amp; STEM OPT eligible · Seeking full-time roles · Open to relocation anywhere in the USA or remote</span>
                </span>
              </span>

              {/* Social stats */}
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
                {[
                  { label: '12K+ followers', sub: 'Instagram', icon: '📸' },
                  { label: '50K followers', sub: 'LinkedIn · #BuildForWhatsNext', icon: '💼' },
                  { label: '20K alumni', sub: 'LinkedIn community', icon: '🎓' },
                  { label: 'Top MBA Programs', sub: 'Ranked on LinkedIn', icon: '🏆' },
                ].map(stat => (
                  <span key={stat.label} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '8px 14px',
                    background: '#F0F9FF',
                    border: '1px solid rgba(8,145,178,0.15)',
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}>
                    <span>{stat.icon}</span>
                    <span>
                      <span style={{ fontWeight: 600, color: '#111218' }}>{stat.label}</span>
                      <span style={{ color: '#6B7280', marginLeft: '4px' }}>· {stat.sub}</span>
                    </span>
                  </span>
                ))}
              </span>
            </p>

            {/* Current role badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '12px 20px',
              background: '#F0F9FF',
              border: '1px solid rgba(8,145,178,0.2)',
              borderRadius: '10px',
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 0 3px rgba(16,185,129,0.2)',
              }} />
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#0C4A6E' }}>
                Social Media Head — DC Campus, Johns Hopkins University
              </span>
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 24, y: isMobile ? 24 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Philosophy */}
            <div style={{
              padding: '28px 24px',
              background: '#111218',
              borderRadius: '16px',
              marginBottom: '28px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '100px', height: '100px', borderRadius: '50%',
                background: 'rgba(8,145,178,0.15)',
                pointerEvents: 'none',
              }} />
              <div className="font-display" style={{
                fontSize: '48px', color: '#0891B2', lineHeight: 1,
                marginBottom: '12px', fontWeight: 300,
              }}>
                "
              </div>
              <p style={{
                fontSize: '17px', lineHeight: 1.65,
                color: '#E5E7EB', fontStyle: 'italic',
                letterSpacing: '-0.01em',
              }}>
                I use AI to solve business problems.
              </p>
            </div>

            {/* Interests */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '14px' }}>
                Interests
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {interests.map(tag => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '16px', marginTop: '28px',
            }}>
              {[
                { number: '7+', label: 'Projects Shipped' },
                { number: 'July 2026', label: 'MS Graduating' },
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: '16px 20px',
                  background: '#F9FAFB',
                  borderRadius: '10px',
                  border: '1px solid #F3F0E8',
                }}>
                  <div className="font-display" style={{
                    fontSize: '28px', fontWeight: 600, color: '#111218',
                    lineHeight: 1, letterSpacing: '-0.03em',
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
