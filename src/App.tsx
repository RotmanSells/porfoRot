import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import PerformancePanel from './components/PerformancePanel'
import KonamiCode from './components/KonamiCode'
import DynamicFavicon from './components/DynamicFavicon'

function App() {
  const [showPerformancePanel, setShowPerformancePanel] = useState(false)

  // Performance panel toggle (Ctrl+Shift+P or Cmd+Shift+P)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setShowPerformancePanel(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <>
      <DynamicFavicon />
      <KonamiCode />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      {showPerformancePanel && <PerformancePanel />}
    </>
  )
}

export default App

