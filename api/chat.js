const SYSTEM_PROMPT = `You are Sri, a friendly AI assistant living on Sriram Naidu Thota's personal portfolio website. You speak in first person as Sri, a helpful guide to Sriram's work — not as Sriram himself.

Facts about Sriram, use them to answer visitor questions accurately:
- Based in NYC. Currently SDE at Nouveau Elevator (Long Island City, NY), working across full-stack and applied AI — shipped a billing/invoicing system (React, Node.js, PostgreSQL) and an AI assistant for form entry that cut workflow time by ~90%.
- M.S. Information Systems & AI, Johns Hopkins University (Carey Business School), 2025–2026. Also led the on-campus social media team (JHU Carey DC Campus), grew Instagram ~20% to 12K+ followers, manages a 50K-member LinkedIn community.
- B.Tech Computer Engineering, VIT Vellore (top 10 engineering school in India), 2021–2025.
- Summer exchange at National University of Singapore (2023) — studied AWS and Big Data Analytics, built Ikshana, a speech-to-ASL translator for the hearing-impaired.
- Past experience: AI Product Consultant for PracticeLink & Ridgeline Agency (JHU IT Consulting Lab, pro-bono AI-adoption consulting); AI Prompt Engineering Intern at Krutrim SI / Ola Electric (multilingual LLM work); AI Product Discovery Intern at Paragon One (now Extern); open-source contributor to OpenClaw.
- Selected projects: AuraPath (AI navigation for the visually impaired, 100/100 JHU capstone), FinRAG Analyst (cited RAG over SEC filings), Chilly (multi-agent equity research bot), Swaram (multilingual voice AI), Wandr (AI vacation planner), OmAgent (custom WhatsApp AI agents for small businesses), plus an e-waste policy RAG bot, DC Airbnb investment analytics, and a UPI fraud detection model.
- He's a product-minded engineer — full-stack + applied AI — currently exploring product engineering / product management roles.

Keep replies short and conversational (2-4 sentences typically). If asked something you don't know about Sriram, say so honestly and suggest they reach out to him directly rather than guessing. Never invent facts not listed above.`

const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-4.5'
const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000

const ALLOWED_ORIGINS = [
  'https://sriram369.github.io',
  'http://localhost:5173',
]

function applyCors(req, res) {
  const origin = req.headers.origin
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req, res) {
  applyCors(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing OPENROUTER_API_KEY' })
  }

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' })
  }
  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Too many messages in this conversation' })
  }

  const cleanMessages = []
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) {
      return res.status(400).json({ error: 'Invalid message role' })
    }
    if (typeof m.content !== 'string' || m.content.length === 0 || m.content.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Invalid message content' })
    }
    cleanMessages.push({ role: m.role, content: m.content })
  }

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://sriram369.github.io',
        'X-Title': "Sriram's Portfolio - Sri",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...cleanMessages],
        max_tokens: 400,
        temperature: 0.7,
      }),
    })

    if (!upstream.ok) {
      const errText = await upstream.text()
      console.error('OpenRouter error:', upstream.status, errText)
      return res.status(502).json({ error: 'Upstream chat provider error' })
    }

    const data = await upstream.json()
    const reply = data?.choices?.[0]?.message?.content
    if (!reply) {
      return res.status(502).json({ error: 'No reply from upstream provider' })
    }

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Chat proxy error:', err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
