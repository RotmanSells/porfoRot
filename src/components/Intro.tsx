import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface IntroProps {
  onComplete: () => void
}

const Intro = ({ onComplete }: IntroProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { text: 'Р', delay: 0 },
    { text: 'О', delay: 100 },
    { text: 'Т', delay: 200 },
    { text: 'М', delay: 300 },
    { text: 'А', delay: 400 },
    { text: 'Н', delay: 500 },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setTimeout(onComplete, 1000)
      }
    }, steps[currentStep]?.delay || 0)

    return () => clearTimeout(timer)
  }, [currentStep, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <motion.span
            key={index}
            className="text-7xl md:text-9xl font-bold text-gradient"
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0,
              y: index <= currentStep ? 0 : 50,
              scale: index <= currentStep ? 1 : 0.5,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          >
            {step.text}
          </motion.span>
        ))}
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentStep >= steps.length - 1 ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        Frontend Developer
      </motion.div>
    </motion.div>
  )
}

export default Intro

