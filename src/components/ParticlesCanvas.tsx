import { Canvas } from '@react-three/fiber'
import FloatingParticles from './FloatingParticles'

const ParticlesCanvas = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%' }}
      >
        <FloatingParticles />
      </Canvas>
    </div>
  )
}

export default ParticlesCanvas

