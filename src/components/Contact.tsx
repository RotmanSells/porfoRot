import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, FormEvent } from 'react'
import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Real-time validation
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Некорректный email адрес' }))
    } else if (name === 'email') {
      setErrors(prev => ({ ...prev, email: '' }))
    }

    if (name === 'name' && value.length < 2) {
      setErrors(prev => ({ ...prev, name: 'Имя должно содержать минимум 2 символа' }))
    } else if (name === 'name') {
      setErrors(prev => ({ ...prev, name: '' }))
    }

    if (name === 'message' && value.length < 10) {
      setErrors(prev => ({ ...prev, message: 'Сообщение должно содержать минимум 10 символов' }))
    } else if (name === 'message') {
      setErrors(prev => ({ ...prev, message: '' }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Final validation
    const newErrors = {
      name: formData.name.length < 2 ? 'Имя обязательно' : '',
      email: !validateEmail(formData.email) ? 'Некорректный email' : '',
      message: formData.message.length < 10 ? 'Сообщение слишком короткое' : '',
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(error => error)) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:rotman@example.com',
      icon: EnvelopeIcon,
      color: 'from-blue-400 to-cyan-400',
    },
    {
      name: 'Telegram',
      href: 'https://t.me/rotman',
      icon: PaperAirplaneIcon,
      color: 'from-cyan-400 to-blue-500',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/rotman',
      icon: (props: any) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'from-purple-400 to-pink-400',
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen py-20 px-4 md:px-8"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          id="contact-heading"
          className="text-5xl md:text-6xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Контакты
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="glass rounded-3xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gradient">Напишите мне</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg glass-dark border ${
                    errors.name ? 'border-red-500' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500`}
                  placeholder="Ваше имя"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg glass-dark border ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500`}
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg glass-dark border ${
                    errors.message ? 'border-red-500' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 resize-none`}
                  placeholder="Ваше сообщение..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 glass glass-hover rounded-lg font-semibold text-lg glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={isSubmitting ? {} : { scale: 1.02 }}
                whileTap={isSubmitting ? {} : { scale: 0.98 }}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Сообщение успешно отправлено!
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Произошла ошибка. Попробуйте еще раз.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gradient">Социальные сети</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 glass glass-hover p-4 rounded-xl group"
                    whileHover={{ scale: 1.05, x: 10 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center`}>
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium group-hover:text-gradient transition-colors">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">Давайте работать вместе!</h3>
              <p className="text-gray-300 leading-relaxed">
                Я всегда открыт для обсуждения новых проектов, творческих идей или возможностей стать частью вашей команды.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

