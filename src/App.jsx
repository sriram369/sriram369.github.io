import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Coursework from './components/Coursework'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

const pages = {
  home: null, // handled separately — renders Hero + About
  experience: Experience,
  education: Education,
  projects: Projects,
  coursework: Coursework,
  certifications: Certifications,
  contact: Contact,
}

const pageMeta = {
  home: {
    title: 'Sriram Naidu Thota',
    description:
      'Sriram Naidu Thota - AI systems, product strategy, and a public proof trail of applied AI work, open-source contributions, and Johns Hopkins achievements.',
  },
  experience: {
    title: 'Experience | Sriram Naidu Thota',
    description: 'Work experience across open source, Johns Hopkins leadership, AI engineering, and AI product discovery.',
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

const pageKeys = Object.keys(pages)

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '').toLowerCase().split('/')[0]
  return pageKeys.includes(hash) ? hash : 'home'
}

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash)

  useEffect(() => {
    const onHashChange = () => setActivePage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onHashChange)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activePage])

  useEffect(() => {
    const meta = pageMeta[activePage] ?? pageMeta.home
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [activePage])

  const navigate = (page) => {
    const nextPage = pageKeys.includes(page) ? page : 'home'
    const nextHash = nextPage === 'home' ? '' : `#${nextPage}`

    if (window.location.hash === nextHash) {
      setActivePage(nextPage)
      return
    }

    if (nextHash) {
      window.location.hash = nextHash
    } else {
      window.history.pushState('', document.title, window.location.pathname + window.location.search)
      setActivePage('home')
    }
  }

  const PageComponent = pages[activePage]

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8' }}>
      <Navbar activePage={activePage} navigate={navigate} />
      <main>
        {activePage === 'home' ? (
          <>
            <Hero />
            <About />
          </>
        ) : (
          PageComponent && <PageComponent />
        )}
      </main>
      <Footer />
    </div>
  )
}
