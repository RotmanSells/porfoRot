import { useEffect } from 'react'

const DynamicFavicon = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const updateFavicon = (scrollProgress: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, 32, 32)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 32, 32)
      gradient.addColorStop(0, `hsl(${280 + scrollProgress * 80}, 70%, 60%)`)
      gradient.addColorStop(1, `hsl(${320 + scrollProgress * 40}, 70%, 60%)`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 32, 32)

      // Draw letter "Р"
      ctx.fillStyle = 'white'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Р', 16, 16)

      // Update favicon
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link')
      link.type = 'image/png'
      link.rel = 'icon'
      link.href = canvas.toDataURL()
      if (!document.querySelector("link[rel*='icon']")) {
        document.getElementsByTagName('head')[0].appendChild(link)
      }
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      updateFavicon(progress)
    }

    const handleInteraction = () => {
      // Pulse effect on interaction
      let pulse = 0
      const pulseInterval = setInterval(() => {
        pulse += 0.2
        if (pulse > 1) {
          clearInterval(pulseInterval)
          handleScroll()
          return
        }
        updateFavicon(pulse)
      }, 50)
    }

    // Initial favicon
    updateFavicon(0)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', handleInteraction)
    window.addEventListener('keydown', handleInteraction)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [])

  return null
}

export default DynamicFavicon

