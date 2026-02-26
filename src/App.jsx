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
  home: Hero,
  about: About,
  experience: Experience,
  education: Education,
  projects: Projects,
  coursework: Coursework,
  certifications: Certifications,
  contact: Contact,
}

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const PageComponent = pages[activePage] || Hero

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activePage])

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8' }}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main>
        <PageComponent />
      </main>
      <Footer />
    </div>
  )
}
