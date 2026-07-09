// Public-safe proof only. Raw evidence and unfinished claims stay in private/intake.
export const proofStats = [
  { value: '7', label: 'Proof-backed milestones', detail: 'curated public trail' },
  { value: '8+', label: 'AI systems shipped', detail: 'RAG, CV, agents, voice AI' },
  { value: '50K+', label: 'Community reach', detail: 'JHU LinkedIn audience managed' },
  { value: '100/100', label: 'Academic evaluation', detail: 'AuraPath at Johns Hopkins' },
]

export const evidenceThemes = [
  {
    title: 'Applied AI systems',
    detail: 'Production-minded projects across RAG, multimodal navigation, voice AI, analytics, and multi-agent workflows.',
  },
  {
    title: 'Public technical proof',
    detail: 'Open-source contribution, live demos, GitHub repositories, reports, and shipped prototypes tied to clear outcomes.',
  },
  {
    title: 'Leadership and communication',
    detail: 'Campus brand leadership, team coordination, professor-facing presentations, and cross-functional product storytelling.',
  },
]

export const achievements = [
  {
    id: 'openclaw',
    date: 'Feb 2026',
    category: 'Open Source',
    title: 'Merged production fix into OpenClaw',
    summary:
      'Implemented base64 image validation to prevent Anthropic API-induced session corruption in live agent workflows, with end-to-end coverage for edge cases.',
    signal: 'Original technical contribution in a large public AI codebase.',
    links: [
      { label: 'PR #18263', href: 'https://github.com/OpenClaw/OpenClaw/pull/18263' },
      { label: 'Source file', href: 'https://github.com/OpenClaw/OpenClaw/blob/main/src/agents/tool-images.ts' },
    ],
    proof: { level: 'strong', types: ['Merged PR', 'Source code', 'Tests'] },
    tags: ['TypeScript', 'Testing', 'Anthropic API'],
  },
  {
    id: 'jhu-social-media',
    date: '2025 - Present',
    category: 'Leadership',
    title: 'Social Media Head for Johns Hopkins DC Campus',
    summary:
      'Leading social media strategy and content operations for the JHU Carey DC Campus while managing a 50K LinkedIn community and supporting a 12K+ Instagram audience.',
    signal: 'Critical campus role combining communication, brand systems, and measurable community reach.',
    links: [
      { label: 'JHU Carey Instagram', href: 'https://www.instagram.com/jhucarey/' },
      { label: 'JHU Carey LinkedIn', href: 'https://www.linkedin.com/school/jhucarey/' },
    ],
    proof: { level: 'public', types: ['Institution pages', 'Audience metrics'] },
    tags: ['Brand', 'Community', 'Strategy'],
  },
  {
    id: 'aurapath',
    date: '2025 - 2026',
    category: 'Johns Hopkins',
    title: 'Built AuraPath and earned a 100/100 evaluation',
    summary:
      'Led a 5-person team building an AI navigation app for visually impaired users, combining LiDAR, computer vision, sensor fusion, and iOS into an assistive navigation experience.',
    signal: 'Independent academic evaluation plus team leadership on an applied AI product.',
    links: [
      { label: 'PDF report', href: '/AuraPath_Report.pdf' },
      { label: 'Slides', href: '/aurapath-slides.html' },
    ],
    proof: { level: 'strong', types: ['Report', 'Slides', 'Evaluation'] },
    tags: ['Computer Vision', 'iOS', 'Team Lead'],
  },
  {
    id: 'finrag',
    date: '2025',
    category: 'AI Product',
    title: 'Shipped FinRAG Analyst for cited SEC filing answers',
    summary:
      'Built a RAG system over SEC 10-K and 10-Q filings with a 6-step ingestion pipeline, Cohere reranking, Qdrant Cloud, and live ingestion monitoring.',
    signal: 'Public project showing retrieval architecture, financial document grounding, and production deployment taste.',
    links: [
      { label: 'GitHub', href: 'https://github.com/sriram369/finrag-analyst' },
      { label: 'Live demo', href: 'https://app-self-one-65.vercel.app' },
    ],
    proof: { level: 'strong', types: ['Repository', 'Live demo'] },
    tags: ['RAG', 'FastAPI', 'Qdrant'],
  },
  {
    id: 'krutrim',
    date: 'Aug - Nov 2023',
    category: 'AI Internship',
    title: 'Worked on multilingual LLM systems at Ola Krutrim AI',
    summary:
      'Contributed to LLM fine-tuning and prompt-engineering workflows focused on improving model responsiveness across India’s multilingual landscape.',
    signal: 'Industry AI experience in a distinguished applied AI organization.',
    links: [{ label: 'Kruti.ai', href: 'https://www.kruti.ai/' }],
    proof: { level: 'public', types: ['Product page', 'Experience record'] },
    tags: ['LLMs', 'NLP', 'Multilingual AI'],
  },
  {
    id: 'ikshana',
    date: 'Summer 2023',
    category: 'NUS Singapore',
    title: 'Built Ikshana during the NUS exchange program',
    summary:
      'Created a speech-to-sign-language translator for the hearing-impaired community using audio transcription, deep learning, and a live web interface.',
    signal: 'Global academic project with accessibility impact and computer vision depth.',
    links: [{ label: 'GitHub', href: 'https://github.com/sriram369/ikshana' }],
    proof: { level: 'public', types: ['Repository', 'Academic project'] },
    tags: ['Deep Learning', 'Accessibility', 'Gradio'],
  },
  {
    id: 'upi-fraud',
    date: '2021 - 2025',
    category: 'VIT Vellore',
    title: 'Completed UPI fraud detection capstone',
    summary:
      'Built an XGBoost-based machine learning model to detect fraudulent UPI transactions, connecting financial risk analysis with applied ML.',
    signal: 'Foundational applied ML work in financial technology.',
    links: [{ label: 'GitHub', href: 'https://github.com/sriram369/UPI_Fraud_Detection_Using_XGBoost-' }],
    proof: { level: 'public', types: ['Repository', 'Capstone project'] },
    tags: ['XGBoost', 'Fraud Detection', 'Fintech'],
  },
]
