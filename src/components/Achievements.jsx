import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { achievements, evidenceThemes, proofStats } from '../data/achievements'

function LinkButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 13px',
        borderRadius: '8px',
        background: 'rgba(8,145,178,0.09)',
        border: '1px solid rgba(8,145,178,0.18)',
        color: '#067391',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M17 7H8M17 7v9" />
      </svg>
    </a>
  )
}

function AnchorButton({ href, children }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 13px',
        borderRadius: '8px',
        background: '#F4F1EA',
        border: '1px solid #E8E4DA',
        color: '#4B5563',
        fontSize: '12px',
        fontWeight: 700,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11.5 4.43" />
        <path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 107.07 7.07l1.33-1.33" />
      </svg>
    </a>
  )
}

function ProofMetadata({ proof }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '16px',
    }}>
      <span style={{
        color: '#6B7280',
        fontSize: '12px',
        fontWeight: 800,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        Proof
      </span>
      <span style={{
        padding: '4px 10px',
        borderRadius: '100px',
        background: proof.level === 'strong' ? 'rgba(16,185,129,0.10)' : 'rgba(8,145,178,0.08)',
        border: proof.level === 'strong' ? '1px solid rgba(16,185,129,0.18)' : '1px solid rgba(8,145,178,0.14)',
        color: proof.level === 'strong' ? '#047857' : '#067391',
        fontSize: '11px',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}>
        {proof.level}
      </span>
      {proof.types.map((type) => (
        <span key={type} style={{
          padding: '4px 10px',
          borderRadius: '100px',
          background: '#F4F1EA',
          color: '#4B5563',
          fontSize: '12px',
          fontWeight: 700,
        }}>
          {type}
        </span>
      ))}
    </div>
  )
}

export default function Achievements() {
  const isMobile = useIsMobile()

  useEffect(() => {
    const scrollToAchievement = () => {
      const [, achievementId] = window.location.hash.replace('#', '').split('/')
      if (!achievementId) return

      window.requestAnimationFrame(() => {
        document.getElementById(`achievement-${achievementId}`)?.scrollIntoView({
          block: 'start',
          behavior: 'auto',
        })
      })
    }

    scrollToAchievement()
    window.addEventListener('hashchange', scrollToAchievement)
    return () => window.removeEventListener('hashchange', scrollToAchievement)
  }, [])

  return (
    <section id="achievements" style={{
      padding: isMobile ? '80px 20px' : '120px 40px',
      background: 'linear-gradient(180deg, #FAFAF8 0%, #F4F1EA 100%)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '44px' }}
        >
          <span className="section-label">06 — Achievements</span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#111218',
            marginTop: '12px',
            marginBottom: '16px',
          }}>
            Proof Trail
          </h2>
          <p style={{
            fontSize: '17px',
            color: '#4B5563',
            maxWidth: '690px',
            lineHeight: 1.7,
            letterSpacing: '-0.01em',
          }}>
            A dated record of applied AI work, public technical proof, leadership, and academic signals.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, minmax(0, 1fr))',
          gap: '12px',
          marginBottom: '28px',
        }}>
          {proofStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              style={{
                background: '#fff',
                border: '1px solid #ECE8DE',
                borderRadius: '8px',
                padding: '18px',
                minHeight: '132px',
              }}
            >
              <strong className="font-display" style={{
                display: 'block',
                fontSize: '34px',
                lineHeight: 1,
                color: '#111218',
                marginBottom: '12px',
              }}>
                {stat.value}
              </strong>
              <span style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1F2937' }}>
                {stat.label}
              </span>
              <span style={{ display: 'block', fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '0.86fr 1.14fr',
          gap: '20px',
          alignItems: 'start',
        }}>
          <motion.aside
            initial={{ opacity: 0, x: isMobile ? 0 : -18, y: isMobile ? 18 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#111218',
              borderRadius: '8px',
              padding: isMobile ? '24px 20px' : '28px',
              position: isMobile ? 'static' : 'sticky',
              top: '88px',
            }}
          >
            <span style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#38BDF8',
              marginBottom: '12px',
            }}>
              Evidence themes
            </span>
            <div style={{ display: 'grid', gap: '18px' }}>
              {evidenceThemes.map((theme) => (
                <div key={theme.title}>
                  <h3 className="font-display" style={{
                    fontSize: '24px',
                    color: '#FAFAF8',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    marginBottom: '8px',
                  }}>
                    {theme.title}
                  </h3>
                  <p style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: 1.65 }}>
                    {theme.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>

          <div style={{ display: 'grid', gap: '14px' }}>
            {achievements.map((achievement, i) => (
              <motion.article
                key={`${achievement.date}-${achievement.title}`}
                id={`achievement-${achievement.id}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                style={{
                  background: '#fff',
                  border: '1px solid #ECE8DE',
                  borderRadius: '8px',
                  padding: isMobile ? '20px 18px' : '24px 26px',
                  boxShadow: '0 8px 30px rgba(17,18,24,0.04)',
                  scrollMarginTop: '88px',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '14px',
                  flexWrap: 'wrap',
                  marginBottom: '10px',
                }}>
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      marginBottom: '8px',
                      color: '#0891B2',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>
                      {achievement.category}
                    </span>
                    <h3 className="font-display" style={{
                      fontSize: 'clamp(24px, 3vw, 34px)',
                      fontWeight: 600,
                      lineHeight: 1.08,
                      letterSpacing: '-0.02em',
                      color: '#111218',
                    }}>
                      {achievement.title}
                    </h3>
                  </div>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: '#F4F1EA',
                    color: '#4B5563',
                    fontSize: '12px',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                  }}>
                    {achievement.date}
                  </span>
                </div>

                <p style={{
                  fontSize: '15px',
                  lineHeight: 1.72,
                  color: '#374151',
                  maxWidth: '760px',
                  marginBottom: '14px',
                }}>
                  {achievement.summary}
                </p>

                <div style={{
                  padding: '12px 14px',
                  border: '1px solid rgba(8,145,178,0.16)',
                  borderRadius: '8px',
                  background: 'rgba(8,145,178,0.05)',
                  color: '#1F2937',
                  fontSize: '13px',
                  lineHeight: 1.55,
                  marginBottom: '16px',
                }}>
                  <strong style={{ color: '#067391' }}>Signal:</strong> {achievement.signal}
                </div>

                <ProofMetadata proof={achievement.proof} />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {achievement.tags.map((tag) => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <AnchorButton href={`#achievements/${achievement.id}`}>Proof link</AnchorButton>
                    {achievement.links.map((link) => (
                      <LinkButton key={link.href} href={link.href}>{link.label}</LinkButton>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
