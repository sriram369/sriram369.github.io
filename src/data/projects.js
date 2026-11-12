// group drives the filter on the Projects page. origin is the label shown on the card.
export const projectGroups = [
  { key: 'all', label: 'All' },
  { key: 'personal', label: 'Personal' },
  { key: 'jhu', label: 'Johns Hopkins' },
  { key: 'nus', label: 'NUS' },
  { key: 'vit', label: 'VIT' },
]

export const projects = [
  {
    id: 'aurapath',
    group: 'jhu',
    featured: true,
    image: '/img/project-aurapath.webp',
    title: 'AuraPath',
    tagline: 'AI navigation for the visually impaired',
    description:
      'Led a 5-person team to build an AI-powered navigation app for visually impaired users, combining LiDAR, Computer Vision, Sensor Fusion, and iOS into a seamless assistive experience.',
    tech: ['LiDAR', 'Computer Vision', 'Sensor Fusion', 'iOS', 'AI'],
    origin: 'Johns Hopkins University',
    role: 'Team Lead (5 members)',
    quote: {
      text: 'Exceptional work. This project is a model of what transformative thinking and teamwork can achieve. I encourage you to pursue this idea beyond the classroom.',
      by: 'Prof. Hassan A. Tetteh',
      note: 'Score: 100/100',
    },
    links: [
      { kind: 'report', label: 'PDF report', href: '/AuraPath_Report.pdf' },
      { kind: 'slides', label: 'Slides', href: '/aurapath-slides.html' },
    ],
  },
  {
    id: 'finrag',
    group: 'personal',
    featured: true,
    image: '/img/project-finrag.webp',
    title: 'FinRAG Analyst',
    tagline: 'Cited, hallucination-free answers over SEC EDGAR filings',
    description:
      'Production-grade RAG system that lets anyone ask natural language questions about SEC 10-K and 10-Q filings and get accurate, cited answers in seconds. Built a 6-step ingestion pipeline (SEC EDGAR, custom SGML parser, LlamaParse, SentenceSplitter, Cohere embeddings, Qdrant Cloud), Cohere reranking for retrieval precision, and an SSE-powered live ingestion monitor that streams pipeline progress to the browser in real time. Runs entirely on free-tier infrastructure at under $0.002 per query.',
    tech: ['Python', 'FastAPI', 'Next.js', 'Cohere', 'Qdrant', 'LlamaIndex', 'RAG', 'Docker', 'Railway', 'Vercel'],
    origin: 'Personal Project',
    links: [
      { kind: 'demo', label: 'Live demo', href: 'https://app-self-one-65.vercel.app' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/finrag-analyst' },
    ],
  },
  {
    id: 'swaram',
    group: 'personal',
    image: '/img/project-swaram.webp',
    title: 'Swaram',
    tagline: 'Multilingual voice chat application',
    description:
      'A real-time voice-to-voice conversational AI enabling hands-free conversations across 11+ Indian languages. Speak naturally and Swaram transcribes your voice, generates an AI response, and speaks back, all in a continuous loop. Features adaptive silence detection, smart farewell detection, and support for Hindi, Tamil, Telugu, Kannada, Bengali, and more. Powered by Sarvam AI.',
    tech: ['Python', 'FastAPI', 'Sarvam AI', 'Web Audio API', 'Vercel'],
    origin: 'Personal Project',
    links: [
      { kind: 'demo', label: 'Live demo', href: 'https://callmemaybe-two.vercel.app' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/callmemaybe' },
    ],
  },
  {
    id: 'wandr',
    group: 'personal',
    featured: true,
    image: '/img/project-wandr.webp',
    title: 'Wandr',
    tagline: 'AI vacation planner: real flights, itineraries, and budgets in one message',
    description:
      'An AI vacation planner that turns a single message into a full itinerary: real flights via Amadeus, Airbnb pricing, day-by-day plans, and a 3-tier budget breakdown, powered by Claude.',
    tech: ['Claude', 'Amadeus API', 'Next.js', 'AI'],
    origin: 'Personal Project',
    links: [
      { kind: 'demo', label: 'Live demo', href: 'https://wandr-vacation-planner.vercel.app/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/vacation-planner' },
    ],
  },
  {
    id: 'omagent',
    group: 'personal',
    image: '/img/project-omagent.webp',
    title: 'OmAgent',
    tagline: "Custom WhatsApp AI agents for businesses that can't afford enterprise tech",
    description:
      'Builds custom WhatsApp AI agents for clinics, hotels, restaurants, retail, education, and real estate, with custom conversation flows, CRM integration, and payment links, deployed in 1-5 days.',
    tech: ['WhatsApp API', 'Claude', 'GPT-4o', 'RAG', 'AI Agents'],
    origin: 'Personal Project',
    links: [
      { kind: 'demo', label: 'Live demo', href: 'https://om-agent.vercel.app/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/OmAgent' },
    ],
  },
  {
    id: 'chilly',
    group: 'personal',
    title: 'Chilly',
    tagline: 'OpenClaw bot: a multi-agent equity research system with LangGraph',
    description:
      'Chilly is an OpenClaw bot that orchestrates 6 specialized finance agents (Market Data, Technical Analysis, SEC RAG, ML Prediction, Sentiment, Risk & Execution) via LangGraph to generate full equity research reports in under 90 seconds, with 94% human-rated quality, 92% directional accuracy, and PDF and Telegram export.',
    tech: ['LangGraph', 'Multi-Agent AI', 'Python', 'RAG', 'Gradient Boosting', 'Telegram API'],
    origin: 'Personal Project',
    links: [
      { kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/Chilly' },
      { kind: 'linkedin', label: 'LinkedIn post', href: 'https://www.linkedin.com/in/sriramthota/recent-activity/articles/' },
    ],
  },
  {
    id: 'ewaste',
    group: 'jhu',
    title: 'E-Waste Policy Bot',
    tagline: 'RAG chatbot for e-waste regulations',
    description:
      'A chatbot that lets you ask plain-English questions about Maryland e-waste laws, EPA guidelines, and Baltimore disposal rules, and get back clear answers with citations. Built using RAG (retrieval-augmented generation) so responses are grounded in real policy documents, not guesswork.',
    tech: ['RAG', 'LLM', 'FAISS', 'Streamlit', 'Python'],
    origin: 'Johns Hopkins University',
    links: [
      { kind: 'demo', label: 'Live demo', href: 'https://ewaste-policy-bot-ei5fwefkqs432bdf8dnopg.streamlit.app/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/ewaste-policy-bot' },
    ],
  },
  {
    id: 'dc-airbnb',
    group: 'jhu',
    title: 'DC Airbnb Analytics',
    tagline: 'Investment intelligence for the DC short-term rental market',
    description:
      'Analyzed every Airbnb listing across Washington D.C. to identify which neighborhoods and property types offer the best return for investors. Surfaces pricing trends, occupancy patterns, and location-based insights to answer: where should you actually put your money? Course project for Data Science & Business Intelligence.',
    tech: ['Python', 'Data Science', 'BI Tools', 'Analytics'],
    origin: 'Johns Hopkins University',
    links: [
      { kind: 'demo', label: 'Live demo', href: 'https://app-cool-aj.streamlit.app/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/dc-airbnb-analytic' },
      { kind: 'report', label: 'PDF report', href: '/dc-airbnb-report.pdf' },
    ],
  },
  {
    id: 'ikshana',
    group: 'nus',
    title: 'Ikshana',
    tagline: 'Speech to sign language translator for the hearing-impaired',
    description:
      'Built for the hearing-impaired community. Ikshana listens to spoken English and translates it into American Sign Language (ASL) visuals in real time. It transcribes audio using deep learning (CNNs + BiLSTMs) and displays the corresponding ASL through a live web interface. Built at the National University of Singapore as a step toward bridging the communication gap for disabled users.',
    tech: ['Computer Vision', 'Deep Learning', 'CNN', 'BiLSTM', 'Gradio', 'Python'],
    origin: 'NUS Singapore, Exchange',
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/ikshana' }],
  },
  {
    id: 'upi-fraud',
    group: 'vit',
    title: 'UPI Fraud Detection',
    tagline: 'ML model for fraudulent transaction detection',
    description:
      'Built a machine learning model using XGBoost to detect fraudulent UPI transactions. B.E. Capstone project demonstrating applied ML on real-world financial data.',
    tech: ['XGBoost', 'Python', 'Machine Learning', 'Data Analysis'],
    origin: 'VIT Vellore, Capstone',
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/UPI_Fraud_Detection_Using_XGBoost' }],
  },
  {
    id: 'multi-agent',
    group: 'jhu',
    title: 'Multi-Agent Coder',
    tagline: 'Collaborative AI coding system',
    description:
      'Developed a Multi-Agent Collaborative Coding System using large language models, where multiple AI agents work together to solve complex programming problems.',
    tech: ['Multi-Agent AI', 'LLMs', 'Python', 'AI Systems'],
    origin: 'Johns Hopkins University',
    links: [{ kind: 'github', label: 'GitHub', href: 'https://github.com/sriram369/multi-agent-coder' }],
  },
]
