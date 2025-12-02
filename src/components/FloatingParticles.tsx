import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const FloatingParticles = () => {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const temp: Array<{
      t: number
      factor: number
      speed: number
      xFactor: number
      yFactor: number
      zFactor: number
      mx: number
      my: number
    }> = []
    for (let i = 0; i < 100; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [])

  const points = useMemo(() => {
    return new Float32Array(
      particles.flatMap((p) => [
        p.xFactor,
        p.yFactor,
        p.zFactor,
      ])
    )
  }, [particles])

  useFrame((state) => {
    if (ref.current) {
      particles.forEach((particle, i) => {
        particle.t += particle.speed / 2
        const t = particle.t
        
        if (ref.current && ref.current.geometry.attributes.position) {
          const positions = ref.current.geometry.attributes.position.array as Float32Array
          positions[i * 3] = particle.xFactor + Math.cos((t / 10) * particle.factor) + (Math.sin(t * 1) * particle.factor) / 10
          positions[i * 3 + 1] = particle.yFactor + Math.sin((t / 10) * particle.factor) + (Math.cos(t * 2) * particle.factor) / 10
          positions[i * 3 + 2] = particle.zFactor + Math.cos((t / 10) * particle.factor) + (Math.sin(t * 3) * particle.factor) / 10
          ref.current.geometry.attributes.position.needsUpdate = true
        }
      })
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.075
    }
  })

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export default FloatingParticles

