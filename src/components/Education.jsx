import { motion } from 'framer-motion'

const timeline = [
  {
    period: '2021 – 2025',
    degree: 'B.E. Computer Science & Engineering',
    spec: 'Business Systems',
    school: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu, India',
    flag: '🇮🇳',
    accent: '#B5860D',
    bg: '#FFFBEB',
    border: 'rgba(181,134,13,0.2)',
    note: 'Undergraduate Capstone: UPI Fraud Detection using XGBoost',
  },
  {
    period: 'Summer 2023',
    degree: 'Summer Exchange Program',
    spec: 'Computer Science',
    school: 'National University of Singapore',
    location: 'Singapore',
    flag: '🇸🇬',
    accent: '#0891B2',
    bg: '#F0F9FF',
    border: 'rgba(8,145,178,0.2)',
    note: 'Built Ikshana — a speech-to-Sign Language translator designed to help the hearing-impaired community communicate, developed during the summer exchange.',
  },
  {
    period: '2025 – 2026',
    degree: 'M.S. Information Systems & AI for Business',
    spec: 'AI & Strategy',
    school: 'Johns Hopkins University',
    location: 'Washington D.C., USA',
    flag: '🇺🇸',
    accent: '#1A3A52',
    bg: '#EFF6FF',
    border: 'rgba(26,58,82,0.2)',
    note: 'Built AuraPath — an AI navigation app helping deaf and disabled people transit independently between places. Scored 100/100 — "Exceptional" by Prof. Hassan A. Tetteh.',
    current: true,
  },
]

export default function Education() {
  return (
    <section id="education" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #F4F1EA 0%, #FAFAF8 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '80px' }}
        >
          <span className="section-label">04 — Education</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
            marginTop: '12px',
          }}>
            Academic Journey
          </h2>
          <p style={{
            fontSize: '17px', color: '#6B7280', marginTop: '16px',
            maxWidth: '480px', lineHeight: 1.6,
          }}>
            Three institutions across three continents — each shaping a broader view of technology and business.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '28px',
            top: '28px',
            bottom: '28px',
            width: '1.5px',
            background: 'linear-gradient(to bottom, #0891B2, rgba(8,145,178,0.1))',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {timeline.map((item, i) => (
              <motion.div
                key={item.school}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}
              >
                {/* Node */}
                <div style={{
                  flexShrink: 0, width: '56px',
                  display: 'flex', justifyContent: 'center', paddingTop: '20px',
                }}>
                  <div style={{
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: item.current ? '#0891B2' : '#E5E7EB',
                    border: `2.5px solid ${item.current ? '#0891B2' : '#D1D5DB'}`,
                    boxShadow: item.current ? '0 0 0 6px rgba(8,145,178,0.12)' : 'none',
                    transition: 'all 0.3s',
                    zIndex: 1, position: 'relative',
                  }} />
                </div>

                {/* Card */}
                <div style={{
                  flex: 1, padding: '28px 32px',
                  background: item.current ? '#fff' : item.bg,
                  border: `1px solid ${item.current ? 'rgba(8,145,178,0.25)' : item.border}`,
                  borderRadius: '16px',
                  boxShadow: item.current ? '0 8px 40px rgba(8,145,178,0.08)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {item.current && (
                    <span style={{
                      position: 'absolute', top: '20px', right: '20px',
                      padding: '4px 12px',
                      background: 'rgba(8,145,178,0.1)',
                      color: '#0891B2',
                      borderRadius: '100px',
                      fontSize: '11px', fontWeight: 600,
                      letterSpacing: '0.05em', textTransform: 'uppercase',
                    }}>
                      Current
                    </span>
                  )}

                  {/* Period */}
                  <div style={{
                    fontSize: '12px', fontWeight: 600,
                    color: item.accent, letterSpacing: '0.08em',
                    textTransform: 'uppercase', marginBottom: '10px',
                  }}>
                    {item.period}
                  </div>

                  {/* Degree */}
                  <h3 className="font-display" style={{
                    fontSize: 'clamp(22px, 2.5vw, 28px)',
                    fontWeight: 600, color: '#111218',
                    lineHeight: 1.2, letterSpacing: '-0.02em',
                    marginBottom: '4px',
                  }}>
                    {item.degree}
                  </h3>
                  <p style={{
                    fontSize: '13px', color: '#6B7280',
                    fontWeight: 500, marginBottom: '12px',
                  }}>
                    {item.spec}
                  </p>

                  {/* School */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    marginBottom: '16px',
                  }}>
                    <span style={{ fontSize: '16px' }}>{item.flag}</span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#1F2937' }}>
                      {item.school}
                    </span>
                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>· {item.location}</span>
                  </div>

                  {/* Note */}
                  <div style={{
                    padding: '10px 16px',
                    background: `${item.bg}`,
                    border: `1px solid ${item.border}`,
                    borderRadius: '8px',
                    fontSize: '13px', color: '#4B5563',
                    lineHeight: 1.55,
                  }}>
                    {item.note}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
