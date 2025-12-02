import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [showFunFact, setShowFunFact] = useState(false)

  const techStack = [
    'React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS',
    'Framer Motion', 'Three.js', 'Node.js', 'Git', 'Figma'
  ]

  const funFacts = [
    'Я варю кофе при температуре 93°C',
    'Люблю решать задачи в 3 часа ночи',
    'Могу написать код быстрее, чем говорю',
    'Верю, что лучший код — это тот, который не нужно писать',
  ]

  const currentFunFact = funFacts[Math.floor(Math.random() * funFacts.length)]

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-20 px-4 md:px-8"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          id="about-heading"
          className="text-5xl md:text-6xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          О себе
        </motion.h2>

        <motion.div
          className="glass rounded-3xl p-8 md:p-12 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            Привет! Я <span className="text-gradient font-semibold">Ротман</span>, 
            фронтенд-разработчик, который превращает идеи в интерактивные цифровые 
            впечатления. Специализируюсь на создании современных веб-приложений с 
            акцентом на производительность, доступность и пользовательский опыт.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Моя страсть — это не только писать чистый код, но и создавать визуально 
            привлекательные интерфейсы, которые оставляют незабываемое впечатление. 
            Я постоянно изучаю новые технологии и подходы, чтобы оставаться на переднем 
            крае веб-разработки.
          </p>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Технологический стек</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                className="glass glass-hover px-6 py-3 rounded-full font-medium"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="glass glass-hover px-8 py-4 rounded-full font-semibold text-lg"
            onClick={() => setShowFunFact(!showFunFact)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={showFunFact}
            aria-controls="fun-fact"
          >
            {showFunFact ? 'Скрыть' : 'Показать'} забавный факт
          </motion.button>

          {showFunFact && (
            <motion.div
              id="fun-fact"
              className="mt-6 glass rounded-2xl p-6 max-w-md mx-auto"
              role="region"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <p className="text-xl font-mono text-gradient">{currentFunFact}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default About

