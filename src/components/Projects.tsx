import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  category: 'web' | 'mobile' | 'ai' | 'entertainment'
  githubUrl?: string
  liveUrl?: string
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Современная платформа для электронной коммерции с интеграцией платежей и админ-панелью',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      technologies: ['React', 'TypeScript', 'Next.js', 'Stripe', 'Tailwind CSS'],
      category: 'web',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 2,
      title: 'Mobile Fitness App',
      description: 'Приложение для отслеживания тренировок с AI-рекомендациями и социальными функциями',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow'],
      category: 'mobile',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 3,
      title: 'AI Content Generator',
      description: 'Генератор контента на основе AI с поддержкой множества форматов и языков',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      technologies: ['React', 'Python', 'OpenAI API', 'Node.js'],
      category: 'ai',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 4,
      title: 'Interactive Game',
      description: 'Браузерная игра с 3D графикой и мультиплеером',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      technologies: ['Three.js', 'React', 'WebSocket', 'Node.js'],
      category: 'entertainment',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      description: 'Панель аналитики с интерактивными графиками и экспортом данных',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      technologies: ['React', 'D3.js', 'TypeScript', 'Chart.js'],
      category: 'web',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
    {
      id: 6,
      title: 'Social Media App',
      description: 'Социальная сеть с реальным временем обновлений и медиа-контентом',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      technologies: ['React', 'GraphQL', 'Apollo', 'MongoDB'],
      category: 'web',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
    },
  ]

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'web', name: 'Веб' },
    { id: 'mobile', name: 'Мобильные' },
    { id: 'ai', name: 'AI' },
    { id: 'entertainment', name: 'Развлечения' },
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen py-20 px-4 md:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          id="projects-heading"
          className="text-5xl md:text-6xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Проекты
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
              aria-label={`Фильтр: ${category.name}`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  inView: boolean
}

const ProjectCard = ({ project, index, inView }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="glass rounded-3xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={`Скриншот проекта ${project.title}`}
          className="w-full h-full object-cover"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-gradient">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 glass-dark rounded-full text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <motion.div
          className="flex gap-4"
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 5 }}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <CodeBracketIcon className="w-5 h-5" />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              Live Demo
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Projects

