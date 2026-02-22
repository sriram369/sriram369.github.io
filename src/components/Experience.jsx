import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Social Media Head',
    company: 'Johns Hopkins University — DC Campus',
    logo: 'https://logo.clearbit.com/jhu.edu',
    period: '2025 – Present',
    location: 'Washington D.C., USA',
    flag: '🇺🇸',
    description: 'Leading social media strategy and content creation for the JHU Carey DC Campus. Grew the Instagram account to 12K+ followers and manage a 50K LinkedIn community of students, alumni, and industry professionals. Championing the #BuildForWhatsNext brand and driving engagement across platforms — while coordinating with faculty and administrators to amplify the school\'s voice.',
    tags: ['Social Media Strategy', 'Content Creation', 'Brand Management', 'LinkedIn', 'Instagram', 'Community Growth'],
    accent: 'rgba(8,145,178,0.20)',
    accentSecondary: 'rgba(181,134,13,0.10)',
    color: '#0891B2',
  },
  {
    role: 'AI Engineering Intern',
    company: 'Ola — Krutrim AI',
    logo: 'https://logo.clearbit.com/olacabs.com',
    period: 'Aug 2023 – Nov 2023',
    location: 'India',
    flag: '🇮🇳',
    description: 'Worked within Ola\'s Krutrim AI division on building and refining large language models. Focused on LLM fine-tuning and prompt engineering to improve model accuracy and responsiveness — with a strong emphasis on making the models multilingual to serve India\'s diverse linguistic landscape.',
    tags: ['LLM Fine-Tuning', 'Prompt Engineering', 'Multilingual AI', 'Python', 'NLP'],
    accent: 'rgba(245,158,11,0.18)',
    accentSecondary: 'rgba(8,145,178,0.10)',
    color: '#B5860D',
  },
  {
    role: 'AI Product Discovery Intern',
    company: 'Paragon One (now Extern)',
    logo: 'https://logo.clearbit.com/extern.com',
    period: 'Remote',
    location: 'Remote',
    flag: '🌐',
    description: 'Drove product strategy by analyzing qualitative customer feedback and user behavior data to identify key pain points and strategic pivots. Translated insights into actionable engineering requirements and authored clear technical documentation for stakeholders, directly influencing the product roadmap.',
    tags: ['Product Strategy', 'User Research', 'Technical Documentation', 'AI Product', 'Roadmapping'],
    accent: 'rgba(99,102,241,0.18)',
    accentSecondary: 'rgba(181,134,13,0.10)',
    color: '#6366F1',
  },
]

export default function Experience() {
  return (
    <section id="experience" style={{
      padding: '120px 40px',
      background: 'linear-gradient(180deg, #FAFAF8 0%, #F4F1EA 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '72px' }}
        >
          <span className="section-label">03 — Experience</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
            marginTop: '12px',
          }}>
            Work Experience
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}
              style={{
                background: '#111218',
                borderRadius: '20px',
                padding: '40px 48px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Ambient blobs */}
              <div style={{
                position: 'absolute', top: '-50px', right: '-50px',
                width: '260px', height: '260px', borderRadius: '50%',
                background: `radial-gradient(ellipse, ${exp.accent} 0%, transparent 65%)`,
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: '-30px', left: '20%',
                width: '180px', height: '180px', borderRadius: '50%',
                background: `radial-gradient(ellipse, ${exp.accentSecondary} 0%, transparent 65%)`,
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Top row */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px',
                  marginBottom: '16px',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      {exp.logo && (
                        <img
                          src={exp.logo}
                          alt=""
                          style={{
                            width: '22px', height: '22px',
                            borderRadius: '5px',
                            objectFit: 'contain',
                            background: 'rgba(255,255,255,0.9)',
                            padding: '2px',
                            flexShrink: 0,
                          }}
                          onError={e => { e.currentTarget.style.display = 'none' }}
                        />
                      )}
                      <span style={{ fontSize: '16px' }}>{exp.flag}</span>
                      <span style={{
                        fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: exp.color,
                      }}>
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="font-display" style={{
                      fontSize: 'clamp(24px, 3vw, 36px)',
                      fontWeight: 600, color: '#FAFAF8',
                      lineHeight: 1.05, letterSpacing: '-0.03em',
                    }}>
                      {exp.role}
                    </h3>
                  </div>
                  <div style={{
                    padding: '7px 16px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#9CA3AF',
                    fontSize: '12px', fontWeight: 600,
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {exp.period}
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '15px', lineHeight: 1.75, color: '#D1D5DB',
                  maxWidth: '720px', marginBottom: '24px',
                  letterSpacing: '-0.005em',
                }}>
                  {exp.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: exp.linkedInEmbed ? '28px' : '0' }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{
                      padding: '4px 12px', borderRadius: '100px',
                      fontSize: '12px', fontWeight: 500,
                      background: 'rgba(255,255,255,0.08)',
                      color: '#E5E7EB',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* LinkedIn embed */}
                {exp.linkedInEmbed && (
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                      Featured Post
                    </p>
                    <iframe
                      src={exp.linkedInEmbed}
                      height="400"
                      width="100%"
                      frameBorder="0"
                      allowFullScreen
                      title="LinkedIn Post"
                      style={{
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        maxWidth: '552px',
                        display: 'block',
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
