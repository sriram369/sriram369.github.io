import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const projects = [
  {
    id: 'aurapath',
    image: '/project-aurapath.jpg',
    title: 'AuraPath',
    tagline: 'AI Navigation for the Visually Impaired',
    description:
      'Led a 5-person team to build an AI-powered navigation app for visually impaired users, combining LiDAR, Computer Vision, Sensor Fusion, and iOS into a seamless assistive experience.',
    tech: ['LiDAR', 'Computer Vision', 'Sensor Fusion', 'iOS', 'AI'],
    link: '/AuraPath_Report.pdf',
    linkLabel: 'View PDF Report',
    secondaryLink: '/aurapath-slides.html',
    secondaryLabel: 'View Slides',
    origin: 'Johns Hopkins University',
    role: 'Team Lead (5 members)',
    quote: '"Exceptional work — this project is a model of what transformative thinking and teamwork can achieve. I encourage you to pursue this idea beyond the classroom." — Prof. Hassan A. Tetteh · Score: 100/100',
    accent: 'rgba(8,145,178,0.20)',
    accentSecondary: 'rgba(181,134,13,0.12)',
  },
  {
    id: 'finrag',
    image: '/project-finrag.jpg',
    title: 'FinRAG Analyst',
    tagline: 'Cited, Hallucination-Free Answers Over SEC EDGAR Filings',
    description:
      'Production-grade RAG system that lets anyone ask natural language questions about SEC 10-K and 10-Q filings and get accurate, cited answers in seconds. Built a 6-step ingestion pipeline (SEC EDGAR → custom SGML parser → LlamaParse → SentenceSplitter → Cohere embeddings → Qdrant Cloud), Cohere reranking for retrieval precision, and an SSE-powered live ingestion monitor that streams pipeline progress to the browser in real time. Runs entirely on free-tier infrastructure at under $0.002 per query.',
    tech: ['Python', 'FastAPI', 'Next.js', 'Cohere', 'Qdrant', 'LlamaIndex', 'RAG', 'Docker', 'Railway', 'Vercel'],
    link: 'https://github.com/sriram369/finrag-analyst',
    linkLabel: 'View on GitHub',
    demo: 'https://app-self-one-65.vercel.app',
    origin: 'Personal Project',
    accent: 'rgba(16,185,129,0.20)',
    accentSecondary: 'rgba(8,145,178,0.12)',
  },
  {
    id: 'swaram',
    image: '/project-swaram.jpg',
    title: 'Swaram',
    tagline: 'Multilingual Voice Chat Application',
    description:
      'A real-time voice-to-voice conversational AI enabling hands-free conversations across 11+ Indian languages. Speak naturally — Swaram transcribes your voice, generates an AI response, and speaks back, all in a continuous loop. Features adaptive silence detection, smart farewell detection, and support for Hindi, Tamil, Telugu, Kannada, Bengali, and more. Powered by Sarvam AI.',
    tech: ['Python', 'FastAPI', 'Sarvam AI', 'Web Audio API', 'Vercel'],
    link: 'https://github.com/sriram369/callmemaybe',
    linkLabel: 'View on GitHub',
    demo: 'https://callmemaybe-two.vercel.app',
    origin: 'Personal Project',
    accent: 'rgba(139,92,246,0.20)',
    accentSecondary: 'rgba(8,145,178,0.10)',
  },
  {
    id: 'wandr',
    image: '/project-wandr.jpg',
    title: 'Wandr',
    tagline: 'AI Vacation Planner — Real Flights, Itineraries & Budgets in One Message',
    description:
      'An AI vacation planner that turns a single message into a full itinerary — real flights via Amadeus, Airbnb pricing, day-by-day plans, and a 3-tier budget breakdown, powered by Claude.',
    tech: ['Claude', 'Amadeus API', 'Next.js', 'AI'],
    link: 'https://github.com/sriram369/vacation-planner',
    linkLabel: 'View on GitHub',
    demo: 'https://wandr-vacation-planner.vercel.app/',
    origin: 'Personal Project',
    accent: 'rgba(16,185,129,0.20)',
    accentSecondary: 'rgba(245,158,11,0.10)',
  },
  {
    id: 'omagent',
    image: '/project-omagent.jpg',
    title: 'OmAgent',
    tagline: 'Custom WhatsApp AI Agents for Businesses That Can\'t Afford Enterprise Tech',
    description:
      'Builds custom WhatsApp AI agents for clinics, hotels, restaurants, retail, education, and real estate — custom conversation flows, CRM integration, and payment links, deployed in 1–5 days.',
    tech: ['WhatsApp API', 'Claude', 'GPT-4o', 'RAG', 'AI Agents'],
    link: 'https://github.com/sriram369/OmAgent',
    linkLabel: 'View on GitHub',
    demo: 'https://om-agent.vercel.app/',
    origin: 'Personal Project',
    accent: 'rgba(139,92,246,0.18)',
    accentSecondary: 'rgba(16,185,129,0.10)',
  },
  {
    id: 'chilly',
    title: 'Chilly — OpenClaw Bot',
    tagline: 'Multi-Agent Equity Research System with LangGraph',
    description:
      'Chilly is an OpenClaw bot that orchestrates 6 specialized finance agents (Market Data, Technical Analysis, SEC RAG, ML Prediction, Sentiment, Risk & Execution) via LangGraph to generate full equity research reports in under 90 seconds — 94% human-rated quality, 92% directional accuracy, with PDF and Telegram export.',
    tech: ['LangGraph', 'Multi-Agent AI', 'Python', 'RAG', 'Gradient Boosting', 'Telegram API'],
    link: 'https://github.com/sriram369/Chilly',
    linkLabel: 'View on GitHub',
    linkedinPost: 'https://www.linkedin.com/in/sriramthota/recent-activity/articles/',
    origin: 'Personal Project',
    accent: 'rgba(99,102,241,0.18)',
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
    linkLabel: 'View on GitHub',
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
    linkLabel: 'View on GitHub',
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
    linkLabel: 'View on GitHub',
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
    linkLabel: 'View on GitHub',
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
    linkLabel: 'View on GitHub',
    origin: 'Johns Hopkins University',
    accent: 'rgba(8,145,178,0.18)',
    accentSecondary: 'rgba(245,158,11,0.10)',
  },
]

export default function Projects() {
  const isMobile = useIsMobile()
  const scrollRef = useRef(null)
  const pausedRef = useRef(false)
  const directionRef = useRef(1)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let frameId
    const tick = () => {
      if (!pausedRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth
        if (maxScroll > 0) {
          let next = el.scrollLeft + directionRef.current * 1.3
          if (next >= maxScroll) { next = maxScroll; directionRef.current = -1 }
          else if (next <= 0) { next = 0; directionRef.current = 1 }
          el.scrollLeft = next
        }
      }
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }

  return (
    <section id="projects" style={{ padding: isMobile ? '80px 20px' : '120px 40px', background: '#FAFAF8' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '40px' }}
        >
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
          }}>
            Projects
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="projects-scroll"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginLeft: isMobile ? '-20px' : '-40px',
            marginRight: isMobile ? '-20px' : '-40px',
            paddingLeft: isMobile ? '20px' : '40px',
            paddingRight: isMobile ? '20px' : '40px',
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}
              style={{
                background: '#111218',
                borderRadius: '20px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                flex: `0 0 ${isMobile ? '300px' : '460px'}`,
                width: isMobile ? '300px' : '460px',
                height: isMobile ? '300px' : '460px',
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Ambient blobs */}
              <div style={{
                position: 'absolute', top: '-60px', right: '-60px',
                width: '260px', height: '260px', borderRadius: '50%',
                background: `radial-gradient(ellipse, ${project.accent} 0%, transparent 65%)`,
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: '-40px', left: '-30px',
                width: '220px', height: '220px', borderRadius: '50%',
                background: `radial-gradient(ellipse, ${project.accentSecondary} 0%, transparent 65%)`,
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%', height: '140px',
                      objectFit: 'cover', objectPosition: 'top',
                      borderRadius: '10px',
                      marginBottom: '14px',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                )}

                <span style={{
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#0891B2',
                  marginBottom: project.image ? '6px' : '12px', display: 'block',
                }}>
                  {project.origin}
                </span>

                <h3 className="font-display" style={{
                  fontSize: project.image ? 'clamp(19px, 2.2vw, 22px)' : 'clamp(26px, 3vw, 32px)',
                  fontWeight: 600, color: '#FAFAF8',
                  lineHeight: 1.1, letterSpacing: '-0.02em',
                  marginBottom: project.image ? '6px' : '10px',
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: project.image ? '13px' : '15px',
                  color: '#9CA3AF',
                  lineHeight: 1.5, fontWeight: 400,
                  display: '-webkit-box',
                  WebkitLineClamp: project.image ? 2 : 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: project.image ? '10px' : '16px',
                }}>
                  {project.tagline}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto', marginBottom: '12px' }}>
                  {project.tech.slice(0, project.image ? 3 : 5).map(t => (
                    <span key={t} style={{
                      padding: '4px 11px', borderRadius: '100px',
                      fontSize: '11.5px', fontWeight: 500,
                      background: 'rgba(255,255,255,0.08)',
                      color: '#E5E7EB',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px' }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontSize: '13.5px', fontWeight: 600,
                      color: '#38BDF8',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {project.linkLabel || 'View'} ↗
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '13.5px', fontWeight: 600,
                        color: '#34D399',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.linkedinPost && (
                    <a
                      href={project.linkedinPost}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '13.5px', fontWeight: 600,
                        color: '#F5C518',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >
                      LinkedIn Post ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
