import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// The proxy lives on Vercel (GH Pages can't hold a secret key server-side).
// Set VITE_CHAT_API_URL in .env before building if this changes.
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'https://sriram369-github-io.vercel.app/api/chat'

export default function SriChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm Sri 👋 Ask me anything about Sriram — his work, projects, or background." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .slice(-20),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message || 'Sri is unreachable right now — try again in a bit.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 200 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', bottom: '76px', right: 0,
              width: 'min(360px, calc(100vw - 32px))',
              height: 'min(480px, calc(100vh - 160px))',
              background: '#111218',
              borderRadius: '18px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: '#0891B2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>
                S
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#FAFAF8' }}>Sri</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Ask about Sriram</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} style={{
              flex: 1, overflowY: 'auto',
              padding: '16px 18px',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '9px 13px',
                  borderRadius: '14px',
                  fontSize: '13.5px', lineHeight: 1.5,
                  background: m.role === 'user' ? '#0891B2' : 'rgba(255,255,255,0.07)',
                  color: m.role === 'user' ? '#fff' : '#E5E7EB',
                }}>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div style={{
                  alignSelf: 'flex-start',
                  padding: '9px 13px',
                  borderRadius: '14px',
                  fontSize: '13.5px',
                  background: 'rgba(255,255,255,0.07)',
                  color: '#9CA3AF',
                }}>
                  Sri is typing…
                </div>
              )}
              {error && (
                <div style={{ fontSize: '12px', color: '#F87171' }}>{error}</div>
              )}
            </div>

            {/* Input */}
            <div style={{
              padding: '12px 14px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', gap: '8px', alignItems: 'flex-end',
            }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Sri…"
                rows={1}
                style={{
                  flex: 1, resize: 'none',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  fontSize: '13.5px',
                  color: '#FAFAF8',
                  fontFamily: 'inherit',
                  maxHeight: '90px',
                }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: input.trim() && !loading ? '#0891B2' : 'rgba(255,255,255,0.08)',
                  border: 'none', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: input.trim() && !loading ? 'pointer' : 'default',
                  color: '#fff',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat with Sri' : 'Chat with Sri'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#111218',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 12px 32px rgba(17,18,24,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FAFAF8" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '22px', fontWeight: 700, color: '#FAFAF8',
          }}>
            S
          </span>
        )}
      </motion.button>
    </div>
  )
}
