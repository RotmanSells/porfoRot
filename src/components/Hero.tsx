import { motion } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import ParticlesCanvas from './ParticlesCanvas'

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Главная секция"
    >
      <ParticlesCanvas />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">Ротман</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Создаю яркие цифровые впечатления
          </motion.p>

          <motion.p
            className="text-base md:text-lg text-gray-400 mb-12 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {'<Frontend Developer />'}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 glass glass-hover rounded-full font-semibold text-lg glow-cyan"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
            >
              Смотреть проекты
            </motion.button>

            <motion.button
              className="px-8 py-4 glass glass-hover rounded-full font-semibold text-lg glow-pink"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
            >
              Связаться
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <button
                onClick={() => {
                  const element = document.querySelector('#about')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Scroll down"
              >
                <ArrowDownIcon className="w-8 h-8 mx-auto" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

