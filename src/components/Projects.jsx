import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const projects = [
  {
    id: 'aurapath',
    title: 'AuraPath',
    tagline: 'AI Navigation for the Visually Impaired',
    description:
      'Led a 5-person team to build an AI-powered navigation app for visually impaired users, combining LiDAR, Computer Vision, Sensor Fusion, and iOS into a seamless assistive experience.',
    tech: ['LiDAR', 'Computer Vision', 'Sensor Fusion', 'iOS', 'AI'],
    link: null,
    origin: 'Johns Hopkins University',
    role: 'Team Lead (5 members)',
    quote: '"Exceptional work — this project is a model of what transformative thinking and teamwork can achieve. I encourage you to pursue this idea beyond the classroom." — Prof. Hassan A. Tetteh · Score: 100/100',
    accent: 'rgba(8,145,178,0.20)',
    accentSecondary: 'rgba(181,134,13,0.12)',
  },
  {
    id: 'chilly',
    title: 'Chilly — OpenClaw Bot',
    tagline: 'Research Automation with an OpenClaw Robot',
    description:
      'Built Chilly, an OpenClaw robot designed to automate repetitive research tasks — handling physical interactions so researchers can focus on higher-order work. A hands-on exploration of robotics and automation.',
    tech: ['Robotics', 'Python', 'Automation', 'Hardware'],
    link: 'https://github.com/sriram369/Chilly',
    origin: 'Personal Project',
    accent: 'rgba(99,102,241,0.18)',
    accentSecondary: 'rgba(8,145,178,0.10)',
  },
  {
    id: 'swaram',
    title: 'Swaram',
    tagline: 'Multilingual Voice Chat Application',
    description:
      'A real-time voice-to-voice conversational AI enabling hands-free conversations across 11+ Indian languages. Speak naturally — Swaram transcribes your voice, generates an AI response, and speaks back, all in a continuous loop. Features adaptive silence detection, smart farewell detection, and support for Hindi, Tamil, Telugu, Kannada, Bengali, and more. Powered by Sarvam AI.',
    tech: ['Python', 'FastAPI', 'Sarvam AI', 'Web Audio API', 'Vercel'],
    link: 'https://github.com/sriram369/callmemaybe',
    demo: 'https://callmemaybe-two.vercel.app',
    origin: 'Personal Project',
    accent: 'rgba(139,92,246,0.20)',
    accentSecondary: 'rgba(8,145,178,0.10)',
  },
  {
    id: 'ewaste',
    title: 'E-Waste Policy Bot',
    tagline: 'RAG Chatbot for E-Waste Regulations',
    description:
      'A chatbot that lets you ask plain-English questions about Maryland e-waste laws, EPA guidelines, and Baltimore disposal rules — and get back clear answers with citations. Built using RAG (retrieval-augmented generation) so responses are grounded in real policy documents, not guesswork.',
    tech: ['RAG', 'LLM', 'FAISS', 'Streamlit', 'Python'],
    link: 'https://github.com/sriram369/ewaste-policy-bot',
    demo: 'https://ewaste-policy-bot-ei5fwefkqs432bdf8dnopg.streamlit.app/',
    origin: 'Johns Hopkins University',
    accent: 'rgba(245,158,11,0.18)',
    accentSecondary: 'rgba(139,92,246,0.10)',
  },
  {
    id: 'dc-airbnb',
    title: 'DC Airbnb Analytics',
    tagline: 'Investment Intelligence for the DC Short-Term Rental Market',
    description:
      'Analyzed every Airbnb listing across Washington D.C. to identify which neighborhoods and property types offer the best return for investors. Surfaces pricing trends, occupancy patterns, and location-based insights to answer: where should you actually put your money? Course project for Data Science & Business Intelligence.',
    tech: ['Python', 'Data Science', 'BI Tools', 'Analytics'],
    link: 'https://github.com/sriram369/dc-airbnb-analytic',
    demo: 'https://app-cool-aj.streamlit.app/',
    report: '/dc-airbnb-report.pdf',
    origin: 'Johns Hopkins University',
    accent: 'rgba(16,185,129,0.18)',
    accentSecondary: 'rgba(181,134,13,0.10)',
  },
  {
    id: 'ikshana',
    title: 'Ikshana',
    tagline: 'Speech to Sign Language Translator for the Hearing-Impaired',
    description:
      'Built for the hearing-impaired community — Ikshana listens to spoken English and translates it into American Sign Language (ASL) visuals in real time. It transcribes audio using deep learning (CNNs + BiLSTMs) and displays the corresponding ASL through a live web interface. Built at the National University of Singapore as a step toward bridging the communication gap for disabled users.',
    tech: ['Computer Vision', 'Deep Learning', 'CNN', 'BiLSTM', 'Gradio', 'Python'],
    link: 'https://github.com/sriram369/ikshana',
    origin: 'NUS Singapore — Exchange',
    accent: 'rgba(139,92,246,0.18)',
    accentSecondary: 'rgba(8,145,178,0.10)',
  },
  {
    id: 'upi-fraud',
    title: 'UPI Fraud Detection',
    tagline: 'ML Model for Fraudulent Transaction Detection',
    description:
      'Built a machine learning model using XGBoost to detect fraudulent UPI transactions. B.E. Capstone project demonstrating applied ML on real-world financial data.',
    tech: ['XGBoost', 'Python', 'Machine Learning', 'Data Analysis'],
    link: 'https://github.com/sriram369/UPI_Fraud_Detection_Using_XGBoost',
    origin: 'VIT Vellore — Capstone',
    accent: 'rgba(181,134,13,0.18)',
    accentSecondary: 'rgba(8,145,178,0.10)',
  },
  {
    id: 'multi-agent',
    title: 'Multi-Agent Coder',
    tagline: 'Collaborative AI Coding System',
    description:
      'Developed a Multi-Agent Collaborative Coding System using large language models — where multiple AI agents work together to solve complex programming problems.',
    tech: ['Multi-Agent AI', 'LLMs', 'Python', 'AI Systems'],
    link: 'https://github.com/sriram369/multi-agent-coder',
    origin: 'Johns Hopkins University',
    accent: 'rgba(8,145,178,0.18)',
    accentSecondary: 'rgba(245,158,11,0.10)',
  },
]

export default function Projects() {
  const isMobile = useIsMobile()

  return (
    <section id="projects" style={{ padding: isMobile ? '80px 20px' : '120px 40px', background: '#FAFAF8' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <span className="section-label">05 — Projects</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
            marginTop: '12px',
          }}>
            Selected Work
          </h2>
        </motion.div>

        {/* All projects — dark card style */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: '#111218',
                borderRadius: '20px',
                padding: isMobile ? '28px 20px' : '40px 48px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              whileHover={{ y: -4, boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}
            >
              {/* Ambient blobs */}
              <div style={{
                position: 'absolute', top: '-50px', right: '-50px',
                width: '260px', height: '260px', borderRadius: '50%',
                background: `radial-gradient(ellipse, ${project.accent} 0%, transparent 65%)`,
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: '-30px', left: '20%',
                width: '180px', height: '180px', borderRadius: '50%',
                background: `radial-gradient(ellipse, ${project.accentSecondary} 0%, transparent 65%)`,
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Top row */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px',
                  marginBottom: '16px',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: '#0891B2',
                      marginBottom: '8px', display: 'block',
                    }}>
                      {project.origin}
                    </span>
                    <h3 className="font-display" style={{
                      fontSize: 'clamp(24px, 3vw, 38px)',
                      fontWeight: 600, color: '#FAFAF8',
                      lineHeight: 1.05, letterSpacing: '-0.03em',
                    }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '4px', fontWeight: 400 }}>
                      {project.tagline}
                    </p>
                  </div>
                  {project.role && (
                    <div style={{
                      padding: '7px 14px',
                      background: 'rgba(8,145,178,0.15)',
                      border: '1px solid rgba(8,145,178,0.3)',
                      borderRadius: '8px',
                      color: '#38BDF8',
                      fontSize: '12px', fontWeight: 600,
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {project.role}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '15px', lineHeight: 1.75, color: '#D1D5DB',
                  maxWidth: '680px', marginBottom: '20px',
                  letterSpacing: '-0.005em',
                }}>
                  {project.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: project.quote ? '24px' : '20px' }}>
                  {project.tech.map(t => (
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

                {/* Quote (AuraPath only) */}
                {project.quote && (
                  <div style={{
                    padding: '16px 18px',
                    background: 'rgba(8,145,178,0.10)',
                    border: '1px solid rgba(8,145,178,0.2)',
                    borderLeft: '3px solid #0891B2',
                    borderRadius: '10px',
                    marginBottom: '24px',
                  }}>
                    <p style={{
                      fontSize: '14px', fontStyle: 'italic',
                      color: '#CBD5E1', lineHeight: 1.65,
                    }}>
                      {project.quote}
                    </p>
                  </div>
                )}

                {/* Links */}
                {project.link ? (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '10px 20px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        borderRadius: '8px',
                        fontSize: '13px', fontWeight: 600,
                        color: '#E5E7EB',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(8,145,178,0.20)'
                        e.currentTarget.style.borderColor = 'rgba(8,145,178,0.4)'
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                        e.currentTarget.style.color = '#E5E7EB'
                      }}
                    >
                      View on GitHub
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          padding: '10px 20px',
                          background: '#0891B2',
                          border: '1px solid rgba(8,145,178,0.4)',
                          borderRadius: '8px',
                          fontSize: '13px', fontWeight: 600,
                          color: '#fff',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#0771A2'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0891B2'}
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.report && (
                      <a
                        href={project.report}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          padding: '10px 20px',
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.14)',
                          borderRadius: '8px',
                          fontSize: '13px', fontWeight: 600,
                          color: '#E5E7EB',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(8,145,178,0.20)'
                          e.currentTarget.style.borderColor = 'rgba(8,145,178,0.4)'
                          e.currentTarget.style.color = '#fff'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                          e.currentTarget.style.color = '#E5E7EB'
                        }}
                      >
                        View PDF Report ↗
                      </a>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href="/AuraPath_Report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '10px 22px',
                        background: '#0891B2',
                        borderRadius: '8px',
                        fontSize: '13px', fontWeight: 600,
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#0771A2'}
                      onMouseLeave={e => e.currentTarget.style.background = '#0891B2'}
                    >
                      View PDF Report ↗
                    </a>
                    <a
                      href="/aurapath-slides.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '10px 22px',
                        background: '#7C3AED',
                        borderRadius: '8px',
                        fontSize: '13px', fontWeight: 600,
                        color: '#fff',
                        textDecoration: 'none',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#6D28D9'}
                      onMouseLeave={e => e.currentTarget.style.background = '#7C3AED'}
                    >
                      View Slides ↗
                    </a>
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
