import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const experiences = [
{
  "role": "Software Engineer | Full-Stack & Applied AI",
  "company": "Nouveau Elevator Industries",
  "logo": "/nouveau-favicon.jpg",
  "period": "Aug 2026 – Present",
  "location": "Long Island City, NY",
  "bullets": [
    [
      {
        "text": "Partnered with finance stakeholders to define billing requirements and shipped a production system for approvals, invoicing, and payment tracking using React, Node.js, and PostgreSQL."
      }
    ],
    [
      {
        "text": "Built and deployed an AI assistant for form entry and human-approved worker assignments, cutting workflow time from ~5 minutes to ~30 seconds (~90%); incorporated source citations and role-based data access."
      }
    ],
    [
      {
        "text": "Identified support-workflow gaps and built request intake, routing by service-level targets, on-call escalation, notifications, and manager reporting to track unresolved customer requests."
      }
    ]
  ],
  "tags": [
    "React",
    "Node.js",
    "Prisma",
    "PostgreSQL",
    "Vertex AI",
    "Billing"
  ],
  "accent": "rgba(8,145,178,0.20)",
  "accentSecondary": "rgba(99,102,241,0.10)",
  "color": "#38BDF8"
},
{
  "role": "AI Product Consultant | Johns Hopkins IT Consulting Lab",
  "company": "PracticeLink & Ridgeline Agency",
  "companyLinks": [
    { "text": "PracticeLink", "href": "https://practicelink-ai-artificial-iq.vercel.app/" },
    { "text": "Ridgeline Agency", "href": "https://ridgelinescoresriram.vercel.app/" }
  ],
  "period": "Jan 2026 – May 2026",
  "location": "Washington, DC / Remote",
  "bullets": [
    [
      {
        "text": "A pro-bono consulting case through JHU's IT Consulting Lab course — two companies wanted to get more AI-adaptive, and we guided them on the right AI tools, agents, and adoption roadmap for their teams."
      }
    ]
  ],
  "projectLinks": [
    {
      "name": "PracticeLink",
      "favicon": "/practicelink-favicon.svg",
      "demoHref": "https://practicelink-ai-artificial-iq.vercel.app/",
      "repoHref": "https://github.com/sriram369/practicelink-ai-adoption-hub"
    },
    {
      "name": "Ridgeline Agency",
      "favicon": null,
      "demoHref": "https://ridgelinescoresriram.vercel.app/",
      "repoHref": "https://github.com/sriram369/ridgeline-ai-cx-strategy-hub"
    }
  ],
  "tags": [
    "Next.js",
    "TypeScript",
    "AI Product",
    "Requirements Gathering",
    "Testing",
    "Technical Documentation"
  ],
  "accent": "rgba(99,102,241,0.18)",
  "accentSecondary": "rgba(8,145,178,0.10)",
  "color": "#A5B4FC"
},
  {
    role: 'Open-Source Contributor',
    company: '🦞 OpenClaw',
    companyLink: 'https://github.com/OpenClaw/OpenClaw',
    companySuffix: '232k+ stars',
    logo: 'https://github.com/openclaw.png',
    period: 'Feb 2026',
    location: 'Remote',
    bullets: [
      [
        { text: 'Implemented production-grade base64 image validation in ' },
        { text: 'src/agents/tool-images.ts', href: 'https://github.com/OpenClaw/OpenClaw/blob/main/src/agents/tool-images.ts' },
        { text: ' to prevent Anthropic API-induced session corruption in live agent workflows (' },
        { text: 'PR #18263', href: 'https://github.com/OpenClaw/OpenClaw/pull/18263' },
        { text: ', merged to main).' },
      ],
      [{ text: 'Added validateAndNormalizeBase64() with regex, padding checks, and URL-safe normalization; replaced invalid images with graceful text fallbacks.' }],
      [{ text: 'Wrote and maintained 5 new end-to-end tests covering edge cases across the full validation pipeline.' }],
    ],
    tags: ['TypeScript', 'Anthropic API', 'Open Source', 'Testing'],
    accent: 'rgba(16,185,129,0.20)',
    accentSecondary: 'rgba(99,102,241,0.10)',
    color: '#10B981',
  },
  {
    role: 'Social Media Head',
    company: 'Johns Hopkins University — DC Campus',
    logo: '/jhu-favicon.png',
    period: '2025 – Present',
    location: 'Washington D.C., USA',
    bullets: [
      [{ text: "Sole social media lead for strategy and content creation across the JHU Carey DC Campus." }],
      [
        { text: 'Grew the ' },
        { text: 'Instagram', href: 'https://www.instagram.com/jhucarey/' },
        { text: ' following by ~20%, from 10K to 12K+ followers.' },
      ],
      [
        { text: 'Managing a 50K-member ' },
        { text: 'LinkedIn', href: 'https://www.linkedin.com/school/jhucarey/' },
        { text: ' community of students, alumni, and industry professionals.' },
      ],
      [{ text: "Coordinating with faculty and administrators to amplify the school's voice and drive engagement." }],
    ],
    tags: ['Social Media Strategy', 'Content Creation', 'Brand Management', 'LinkedIn', 'Instagram', 'Community Growth'],
    accent: 'rgba(8,145,178,0.20)',
    accentSecondary: 'rgba(181,134,13,0.10)',
    color: '#0891B2',
  },
  {
    role: 'AI Prompt Engineering Intern',
    company: 'Krutrim SI / Ola Electric',
    logo: '/ola-favicon.png',
    period: 'Aug 2023 – Nov 2023',
    location: 'Bengaluru, India',
    description: 'Engineered and evaluated multilingual LLM workflows across four Indian languages using prompt templates, structured outputs, instruction-response datasets, and adversarial safety cases to improve quality and reliability.',
    link: 'https://kruti.ai',
    linkLabel: 'kruti.ai',
    tags: ['Prompt Engineering', 'Multilingual AI', 'LLM Evaluation', 'Python', 'NLP'],
    accent: 'rgba(245,158,11,0.18)',
    accentSecondary: 'rgba(8,145,178,0.10)',
    color: '#B5860D',
  },
  {
    role: 'AI Product Discovery Intern',
    company: 'Paragon One (now Extern)',
    logo: '/extern-favicon.png',
    period: 'Remote',
    location: 'Remote',
    description: 'Drove product strategy by analyzing qualitative customer feedback and user behavior data to identify key pain points and strategic pivots. Translated insights into actionable engineering requirements and authored clear technical documentation for stakeholders, directly influencing the product roadmap.',
    tags: ['Product Strategy', 'User Research', 'Technical Documentation', 'AI Product', 'Roadmapping'],
    accent: 'rgba(99,102,241,0.18)',
    accentSecondary: 'rgba(181,134,13,0.10)',
    color: '#6366F1',
  },
]

export default function Experience() {
  const isMobile = useIsMobile()

  return (
    <section id="experience" style={{
      padding: isMobile ? '80px 20px' : '120px 40px',
      background: 'linear-gradient(180deg, #FAFAF8 0%, #F4F1EA 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600, lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#111218',
          }}>
            Work
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                padding: isMobile ? '28px 20px' : '40px 48px',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
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
                      <span style={{
                        fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: exp.color,
                      }}>
                        {exp.companyLinks ? (
                          exp.companyLinks.map((part, pi) => (
                            <span key={part.text}>
                              <a href={part.href} target="_blank" rel="noopener noreferrer"
                                style={{ color: exp.color, textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                              >{part.text}</a>
                              {pi < exp.companyLinks.length - 1 && ' & '}
                            </span>
                          ))
                        ) : exp.companyLink ? (
                          <a href={exp.companyLink} target="_blank" rel="noopener noreferrer"
                            style={{ color: exp.color, textDecoration: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                          >{exp.company}</a>
                        ) : exp.company}
                        {exp.companySuffix && (
                          <span style={{ color: '#6B7280', fontWeight: 500, marginLeft: '6px', letterSpacing: '0.05em' }}>
                            — {exp.companySuffix}
                          </span>
                        )}
                      </span>
                    </div>
                    <h3 className="font-display" style={{
                      fontSize: 'clamp(22px, 3vw, 36px)',
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
                {exp.bullets ? (
                  <ul style={{
                    fontSize: '15px', lineHeight: 1.75, color: '#D1D5DB',
                    maxWidth: '720px', marginBottom: exp.link ? '12px' : '24px',
                    letterSpacing: '-0.005em', paddingLeft: '18px',
                    listStyleType: 'disc', listStylePosition: 'outside',
                    display: 'flex', flexDirection: 'column', gap: '6px',
                  }}>
                    {exp.bullets.map((segments, bi) => (
                      <li key={bi}>
                        {segments.map((seg, si) =>
                          seg.href ? (
                            <a key={si} href={seg.href} target="_blank" rel="noopener noreferrer"
                              style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: 500 }}
                              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                            >{seg.text}</a>
                          ) : (
                            <span key={si}>{seg.text}</span>
                          )
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{
                    fontSize: '15px', lineHeight: 1.75, color: '#D1D5DB',
                    maxWidth: '720px', marginBottom: exp.link ? '12px' : '24px',
                    letterSpacing: '-0.005em',
                  }}>
                    {exp.description}
                  </p>
                )}

                {/* Project links */}
                {exp.projectLinks && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {exp.projectLinks.map(pl => (
                      <div key={pl.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        {pl.favicon ? (
                          <img
                            src={pl.favicon}
                            alt={pl.name}
                            style={{
                              width: '18px', height: '18px', borderRadius: '4px',
                              objectFit: 'contain', background: 'rgba(255,255,255,0.9)', padding: '2px',
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: '18px', height: '18px', borderRadius: '4px',
                            background: exp.color, color: '#111218',
                            fontSize: '9px', fontWeight: 700, flexShrink: 0,
                          }}>
                            {pl.name.charAt(0)}
                          </span>
                        )}
                        <a href={pl.demoHref} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '14px', fontWeight: 500, color: '#D1D5DB', textDecoration: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                        >
                          {pl.name}
                        </a>
                        <span style={{ color: '#4B5563', fontSize: '13px' }}>·</span>
                        <img
                          src="/github-favicon.png"
                          alt=""
                          style={{ width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0 }}
                        />
                        <a href={pl.repoHref} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '13px', fontWeight: 500, color: '#9CA3AF', textDecoration: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                        >
                          GitHub
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {/* External link */}
                {exp.link && (
                  <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '24px' }}>
                    You can check out some of that work at{' '}
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: exp.color, textDecoration: 'none', fontWeight: 600 }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {exp.linkLabel} ↗
                    </a>
                  </p>
                )}

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
