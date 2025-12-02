import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools' | 'design'
}

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skills: Skill[] = [
    { name: 'React', level: 95, category: 'frontend' },
    { name: 'TypeScript', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 85, category: 'frontend' },
    { name: 'Vite', level: 90, category: 'frontend' },
    { name: 'Tailwind CSS', level: 95, category: 'frontend' },
    { name: 'Framer Motion', level: 88, category: 'frontend' },
    { name: 'Three.js', level: 75, category: 'frontend' },
    { name: 'Node.js', level: 80, category: 'backend' },
    { name: 'Git', level: 90, category: 'tools' },
    { name: 'Figma', level: 85, category: 'design' },
    { name: 'Webpack', level: 80, category: 'tools' },
    { name: 'Docker', level: 70, category: 'tools' },
  ]

  const categories = [
    { id: 'all', name: 'Все', color: 'from-cyan-400 to-blue-500' },
    { id: 'frontend', name: 'Frontend', color: 'from-purple-400 to-pink-500' },
    { id: 'backend', name: 'Backend', color: 'from-blue-400 to-cyan-500' },
    { id: 'tools', name: 'Инструменты', color: 'from-green-400 to-emerald-500' },
    { id: 'design', name: 'Дизайн', color: 'from-pink-400 to-rose-500' },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(s => s.category === selectedCategory)

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen py-20 px-4 md:px-8"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          id="skills-heading"
          className="text-5xl md:text-6xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Навыки
        </motion.h2>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'glass glow-cyan text-white'
                  : 'glass-dark text-gray-300 hover:text-white'
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={selectedCategory === category.id}
              aria-label={`Фильтр навыков: ${category.name}`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredSkills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={index}
              inView={inView}
              isHovered={hoveredSkill === skill.name}
              onHover={() => setHoveredSkill(skill.name)}
              onLeave={() => setHoveredSkill(null)}
            />
          ))}
        </div>

        {/* Skills Constellation Visualization */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-gradient">
            Созвездие навыков
          </h3>
          <SkillsConstellation
            skills={skills}
            inView={inView}
            hoveredSkill={hoveredSkill}
            onSkillHover={setHoveredSkill}
          />
        </motion.div>
      </div>
    </section>
  )
}

interface SkillBarProps {
  skill: Skill
  index: number
  inView: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

const SkillBar = ({ skill, index, inView, isHovered, onHover, onLeave }: SkillBarProps) => {
  return (
    <motion.div
      className="glass rounded-2xl p-6"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold">{skill.name}</span>
        <span className={`text-sm font-mono ${isHovered ? 'text-gradient' : 'text-gray-400'}`}>
          {skill.level}%
        </span>
      </div>
      <div className="h-3 bg-black/20 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full ${
            isHovered ? 'glow-cyan' : ''
          }`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

interface SkillsConstellationProps {
  skills: Skill[]
  inView: boolean
  hoveredSkill: string | null
  onSkillHover: (skill: string | null) => void
}

const SkillsConstellation = ({ skills, inView, hoveredSkill, onSkillHover }: SkillsConstellationProps) => {
  const positions = skills.map((_, i) => {
    const angle = (i / skills.length) * Math.PI * 2
    const radius = 150
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  })

  return (
    <div className="relative h-96 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="-200 -200 400 400">
        {/* Connections */}
        {skills.map((skill, i) => {
          const nextIndex = (i + 1) % skills.length
          const isActive = hoveredSkill === skill.name || hoveredSkill === skills[nextIndex]?.name
          return (
            <motion.line
              key={`line-${i}`}
              x1={positions[i].x}
              y1={positions[i].y}
              x2={positions[nextIndex].x}
              y2={positions[nextIndex].y}
              stroke={isActive ? 'url(#gradient)' : 'rgba(139, 92, 246, 0.3)'}
              strokeWidth={isActive ? 2 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          )
        })}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Skill Nodes */}
      {skills.map((skill, i) => {
        const isHovered = hoveredSkill === skill.name
        return (
          <motion.div
            key={skill.name}
            className="absolute"
            style={{
              left: `calc(50% + ${positions[i].x}px)`,
              top: `calc(50% + ${positions[i].y}px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.05 + 0.3 }}
            onHoverStart={() => onSkillHover(skill.name)}
            onHoverEnd={() => onSkillHover(null)}
          >
            <motion.div
              className={`w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 cursor-pointer ${
                isHovered ? 'glow-cyan' : ''
              }`}
              animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            {isHovered && (
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap glass px-3 py-1 rounded text-sm font-mono"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {skill.name}
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default Skills

