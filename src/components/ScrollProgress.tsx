import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
        style={{
          width: `${scrollProgress * 100}%`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

export default ScrollProgress

