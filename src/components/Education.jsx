import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const timeline = [
  {
    period: '2025 – 2026',
    degree: 'M.S. Information Systems & AI for Business',
    school: 'Johns Hopkins University',
    location: 'Washington D.C., USA',
    link: 'https://carey.jhu.edu/',
    favicon: '/jhu-favicon.png',
    accent: '#1A3A52',
    bg: '#EFF6FF',
    border: 'rgba(26,58,82,0.2)',
    blurb: 'Pursued this degree to learn how to apply AI and technology to improve existing businesses. Also led the on-campus social media team.',
    courses: [
      'Responsible AI',
      'Generative AI',
      'IT Consulting Lab Practicum',
      'AI Essentials for Business',
      'Human-AI Fusion',
    ],
    docHref: '/Sriram_JHU_Marksheet.pdf',
    docLabel: 'Download Transcript',
    photo: '/jhu-graduation.jpg',
  },
  {
    period: '2021 – 2025',
    degree: 'B.E. Computer Science & Engineering',
    school: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu, India',
    link: 'https://vit.ac.in/',
    favicon: '/vit-favicon.jpg',
    accent: '#B5860D',
    bg: '#FFFBEB',
    border: 'rgba(181,134,13,0.2)',
    photo: '/vit-photo.jpg',
    photoPosition: 'center 30%',
    blurb: 'Completed my engineering degree at one of the top 10 institutions in India.',
    docHref: '/Sriram_VIT_Degree.pdf',
    docLabel: 'Download Transcript',
    project: {
      label: 'Final Year Project',
      links: [
        { text: 'Capstone Report ↓', href: '/Sriram_VIT_Capstone.pdf', download: true },
      ],
    },
  },
  {
    period: 'Summer 2023',
    degree: 'Summer Exchange Program',
    school: 'National University of Singapore',
    location: 'Singapore',
    link: 'https://nus.edu.sg/',
    favicon: '/nus-favicon.png',
    accent: '#0891B2',
    bg: '#F0F9FF',
    border: 'rgba(8,145,178,0.2)',
    photo: '/nus-photo.jpg',
    photoPosition: 'center 28%',
    docHref: '/Sriram_NUS_LOE.pdf',
    docLabel: 'Download Transcript',
    project: {
      desc: "Studied AWS and Big Data Analytics at NUS; built Ikshana, a system that translates spoken English into American Sign Language for the hearing-impaired.",
      links: [
        { text: 'GitHub ↗', href: 'https://github.com/sriram369/ikshana' },
        { text: 'GAIP Report ↓', href: '/Sriram_NUS_GAIP_Report.pdf', download: true },
      ],
    },
  },
]

export default function Education() {
  const isMobile = useIsMobile()

  return (
    <section id="education" style={{
      padding: isMobile ? '80px 20px' : '120px 40px',
      background: 'linear-gradient(180deg, #F4F1EA 0%, #FAFAF8 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '60px' }}
        >
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
          }}>
            Education
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          alignItems: 'start',
          gap: '20px',
        }}>
          {timeline.map((item, i) => (
            <motion.div
              key={item.school}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '28px 24px',
                background: item.bg,
                border: `1px solid ${item.border}`,
                borderRadius: '16px',
              }}
            >
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
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 600, color: '#111218',
                lineHeight: 1.2, letterSpacing: '-0.02em',
                marginBottom: '12px',
              }}>
                {item.degree}
              </h3>

              {/* Photo */}
              {item.photo && (
                <img
                  src={item.photo}
                  alt={`${item.school} graduation`}
                  style={{
                    width: '100%', aspectRatio: item.photoAspect || '3 / 2',
                    objectFit: 'cover', objectPosition: item.photoPosition || 'top',
                    borderRadius: '12px',
                    marginBottom: '16px',
                  }}
                />
              )}

              {/* School */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.favicon && (
                    <img
                      src={item.favicon}
                      alt={item.school}
                      style={{ width: '18px', height: '18px', borderRadius: '5px', objectFit: 'cover', flexShrink: 0 }}
                    />
                  )}
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '15px', fontWeight: 600, color: '#1F2937', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                    >
                      {item.school}
                    </a>
                  ) : (
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#1F2937' }}>
                      {item.school}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '2px' }}>
                  {item.location}
                </div>
                {item.blurb && (
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.55, marginTop: '10px' }}>
                    {item.blurb}
                  </p>
                )}
              </div>

              {/* Project */}
              {item.project && (
                <div style={{ marginTop: '16px' }}>
                  {item.project.label && (
                    <div style={{
                      fontSize: '12px', fontWeight: 600,
                      color: '#1F2937', marginBottom: '4px',
                    }}>
                      {item.project.label}
                    </div>
                  )}
                  {item.project.desc && (
                    <p style={{
                      fontSize: '12.5px', color: '#6B7280',
                      lineHeight: 1.55, marginBottom: '8px',
                    }}>
                      {item.project.desc}
                    </p>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {item.project.links.map(l => (
                      <a
                        key={l.text}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={l.download}
                        style={{
                          fontSize: '12px', fontWeight: 600,
                          color: item.accent,
                          textDecoration: 'underline', textUnderlineOffset: '2px',
                        }}
                      >
                        {l.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Document */}
              {item.docHref && (
                <a
                  href={item.docHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    marginTop: '14px',
                    fontSize: '12px', fontWeight: 600,
                    color: item.accent,
                    textDecoration: 'underline', textUnderlineOffset: '2px',
                  }}
                >
                  {item.docLabel} ↓
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
