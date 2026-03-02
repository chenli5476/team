import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

// 打字机效果组件
const TypewriterText = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <div className="font-space-mono text-moon-gray">
      {displayedText}
      <span className="animate-pulse">|</span>
    </div>
  )
}

// 进度条组件
const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-64 h-1 bg-cosmic-navy/50 rounded-full overflow-hidden my-8 mx-auto">
      <motion.div
        className="h-full bg-gradient-to-r from-aurora-cyan to-nebula-purple rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5 }}
        style={{
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)',
        }}
      />
    </div>
  )
}

// 3D星系核心组件
const GalaxyCore = () => {
  return (
    <Canvas className="absolute inset-0 z-0">
      <Stars count={1000} radius={500} depth={200} factor={4} saturation={0} fade />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 100]} intensity={1} color="#6366f1" />
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <icosahedronGeometry args={[2, 5]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Canvas>
  )
}

// 加载屏幕组件
const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + 5
        })
      }, 150)
      return () => clearInterval(timer)
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-deep-void z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <GalaxyCore />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <motion.div
              className="mb-4"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <h1 className="text-4xl md:text-6xl font-space-grotesk font-bold gradient-text mb-4">
                知澜
              </h1>
            </motion.div>
            <ProgressBar value={progress} />
            <TypewriterText text="INITIALIZING..." speed={100} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
