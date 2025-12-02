import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KonamiCode = () => {
  const [isUnlocked, setIsUnlocked] = useState(false)

  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
  ]

  useEffect(() => {
    let sequence: string[] = []
    
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence = [...sequence, e.code].slice(-konamiCode.length)
      
      if (sequence.length === konamiCode.length) {
        const isMatch = sequence.every((key, index) => key === konamiCode[index])
        if (isMatch) {
          setIsUnlocked(true)
          setTimeout(() => setIsUnlocked(false), 10000)
          sequence = []
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <AnimatePresence>
      {isUnlocked && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass rounded-3xl p-12 max-w-2xl mx-4 text-center"
            initial={{ scale: 0.5, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <motion.h2
              className="text-5xl font-bold mb-6 text-gradient"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              🎉 Пасхальное яйцо найдено!
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Вы обнаружили секретную функцию! 🚀
            </motion.p>
            <motion.div
              className="space-y-4 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-400 font-mono">
                {'>'} Секретный проект: <span className="text-gradient">AI-Powered Portfolio v2.0</span>
              </p>
              <p className="text-gray-400 font-mono">
                {'>'} Статус: <span className="text-green-400">В разработке</span>
              </p>
              <p className="text-gray-400 font-mono">
                {'>'} Особенности: 3D аватары, голосовое управление, AR режим
              </p>
            </motion.div>
            <motion.button
              className="mt-8 px-8 py-4 glass glass-hover rounded-full font-semibold glow-cyan"
              onClick={() => setIsUnlocked(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Закрыть
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default KonamiCode

