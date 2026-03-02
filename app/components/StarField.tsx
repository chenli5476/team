import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'

const StarField = () => {
  return (
    <Canvas className="starfield">
      <Stars
        count={10000}
        radius={1000}
        depth={500}
        factor={4}
        saturation={0}
        fade
      />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}

export default StarField
