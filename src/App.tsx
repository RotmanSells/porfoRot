import { useState, useEffect } from 'react'
import Intro from './components/Intro'
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
  const [showIntro, setShowIntro] = useState(true)
  const [showPerformancePanel, setShowPerformancePanel] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

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
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
      {!showIntro && (
        <>
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
      )}
    </>
  )
}

export default App

