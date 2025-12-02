import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ExperienceItem {
  id: number
  company: string
  position: string
  period: string
  description: string[]
  logo?: string
}

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: 'Tech Startup',
      position: 'Senior Frontend Developer',
      period: '2022 - настоящее время',
      description: [
        'Разработка современных веб-приложений с использованием React и TypeScript',
        'Руководство командой из 5 разработчиков',
        'Внедрение лучших практик и оптимизация производительности',
        'Создание дизайн-системы и компонентной библиотеки',
      ],
    },
    {
      id: 2,
      company: 'Digital Agency',
      position: 'Frontend Developer',
      period: '2020 - 2022',
      description: [
        'Разработка клиентских проектов для крупных брендов',
        'Интеграция с различными API и сторонними сервисами',
        'Оптимизация SEO и производительности сайтов',
        'Работа с командой дизайнеров над созданием UI/UX',
      ],
    },
    {
      id: 3,
      company: 'Freelance',
      position: 'Frontend Developer',
      period: '2018 - 2020',
      description: [
        'Разработка веб-сайтов и веб-приложений для клиентов',
        'Работа с различными технологическими стеками',
        'Управление проектами от концепции до запуска',
      ],
    },
  ]

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen py-20 px-4 md:px-8"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          id="experience-heading"
          className="text-5xl md:text-6xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Опыт работы
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                experience={exp}
                index={index}
                inView={inView}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  experience: ExperienceItem
  index: number
  inView: boolean
  isEven: boolean
}

const TimelineItem = ({ experience, index, inView, isEven }: TimelineItemProps) => {
  return (
    <motion.div
      className={`relative flex items-center ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 glow-cyan"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        />
      </div>

      {/* Content card */}
      <div
        className={`ml-20 md:ml-0 md:w-5/12 ${
          isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
        }`}
      >
        <motion.div
          className="glass rounded-2xl p-6 glass-hover"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center">
              <span className="text-xl font-bold text-gradient">
                {experience.company[0]}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gradient">{experience.position}</h3>
              <p className="text-gray-400 text-sm">{experience.company}</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 font-mono mb-4">{experience.period}</p>

          <ul className="space-y-2">
            {experience.description.map((item, i) => (
              <motion.li
                key={i}
                className="text-gray-300 flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 + i * 0.1 }}
              >
                <span className="text-cyan-400 mt-1">▹</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Experience

