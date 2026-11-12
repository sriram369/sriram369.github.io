export const profile = {
  name: 'Sriram Naidu Thota',
  shortName: 'Sriram',
  email: 'chillbrosriram@gmail.com',
  resume: '/Sriram_Resume.pdf',
  location: 'New York, NY',
}

export const socials = [
  { key: 'linkedin', label: 'LinkedIn', handle: 'in/sriramthota', href: 'https://www.linkedin.com/in/sriramthota/' },
  { key: 'github', label: 'GitHub', handle: 'sriram369', href: 'https://github.com/sriram369' },
  { key: 'x', label: 'X', handle: '@chillybrosriram', href: 'https://x.com/chillybrosriram' },
]

// Primary nav. Labels and hash keys are stable: they are bookmarked and shared.
export const navLinks = [
  { key: 'experience', label: 'Work' },
  { key: 'education', label: 'Education' },
  { key: 'projects', label: 'Projects' },
]

export const pageMeta = {
  home: {
    title: "Sriram's Website",
    description: "Sriram's personal website.",
  },
  experience: {
    title: 'Work | Sriram Naidu Thota',
    description: 'Work experience across full-stack and applied AI engineering, AI product consulting, open source, and Johns Hopkins leadership.',
  },
  education: {
    title: 'Education | Sriram Naidu Thota',
    description: 'Academic journey across Johns Hopkins University, VIT Vellore, and the National University of Singapore.',
  },
  projects: {
    title: 'Projects | Sriram Naidu Thota',
    description: 'Selected AI, data science, RAG, computer vision, and multi-agent projects by Sriram Naidu Thota.',
  },
  coursework: {
    title: 'Coursework | Sriram Naidu Thota',
    description: 'Academic coursework across AI, business analytics, data systems, cloud computing, and responsible AI.',
  },
  certifications: {
    title: 'Certifications | Sriram Naidu Thota',
    description: 'Certifications and verified learning records across data science, Python, UX, ecology, and product discovery.',
  },
  contact: {
    title: 'Contact | Sriram Naidu Thota',
    description: 'Contact Sriram Naidu Thota for AI systems, product strategy, collaboration, and full-time opportunities.',
  },
}

export const now = [
  {
    line: 'SDE',
    org: 'Nouveau Elevator',
    href: 'https://www.nouveauelevator.com/',
    logo: '/nouveau-favicon.jpg',
    note: 'Currently',
  },
  {
    line: 'MS, Information Systems',
    org: 'Johns Hopkins University',
    href: 'https://carey.jhu.edu/',
    logo: '/jhu-favicon.png',
    note: 'Graduate',
  },
  {
    line: 'BTech, Computer Engineering',
    org: 'VIT Vellore',
    href: 'https://vit.ac.in/',
    logo: '/vit-favicon.jpg',
    note: 'Undergraduate',
  },
]

// Home page: words that rotate after "i love building". Each maps to shipped work
// (agents at Nouveau and OmAgent, FinRAG, Swaram, Chilly).
export const buildWords = ['ai agents.', 'rag systems.', 'voice ai.', 'multi-agent systems.']

// Home page marquee: tools taken from the Work and Projects entries.
export const stack = ['React', 'Node.js', 'PostgreSQL', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'LangGraph', 'RAG', 'Claude', 'Vertex AI']

// Home page numbers. Every figure comes from the Work and Projects entries.
export const stats = [
  {
    id: 'workflow',
    value: 90,
    prefix: '~',
    suffix: '%',
    text: 'less time on a form-entry workflow. The AI assistant I built at Nouveau Elevator took it from ~5 minutes to ~30 seconds.',
    href: '#experience',
    cta: 'Work',
  },
  {
    id: 'aurapath',
    value: 100,
    suffix: '/100',
    text: 'for AuraPath, an AI navigation app for visually impaired users. I led the 5-person team at Johns Hopkins.',
  },
  {
    id: 'community',
    value: 50,
    suffix: 'K',
    text: 'member LinkedIn community managed for JHU Carey.',
  },
  {
    id: 'openclaw',
    value: 232,
    suffix: 'k+',
    text: 'stars on OpenClaw, where my image-validation fix is merged to main.',
  },
]

export const journey = [
  { city: 'Hyderabad', note: 'Born here' },
  { city: 'Bengaluru', note: 'Grew up here' },
  { city: 'Vellore', note: 'B.E. at VIT' },
  { city: 'Singapore', note: 'Summer exchange at NUS' },
  { city: 'Washington D.C.', note: 'M.S. at Johns Hopkins' },
  { city: 'New York', note: 'SDE at Nouveau Elevator', current: true },
]
