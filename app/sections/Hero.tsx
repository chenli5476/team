import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

// 流星效果组件
const ShootingStar = () => {
  const [isClient, setIsClient] = useState(false)
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    // 只在客户端设置isClient为true
    setIsClient(true)
    
    // 初始化位置
    setPosition({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
    })
    
    const resetPosition = () => {
      setPosition({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
      })
    }
    const interval = setInterval(resetPosition, Math.random() * 5000 + 2000)
    return () => clearInterval(interval)
  }, [])

  // 在服务器端和客户端都返回相同的结构
  if (!isClient) {
    return <div className="absolute w-16 h-0.5 bg-white rounded-full opacity-0" />
  }

  return (
    <motion.div
      className="absolute w-16 h-0.5 bg-white rounded-full"
      initial={{ opacity: 0, x: position.x * window.innerWidth, y: position.y * window.innerHeight, rotate: Math.random() * 360 }}
      animate={{ 
        opacity: [0, 1, 0],
        x: position.x * window.innerWidth + Math.cos(Math.random() * Math.PI * 2) * 200,
        y: position.y * window.innerHeight + Math.sin(Math.random() * Math.PI * 2) * 200,
      }}
      transition={{
        duration: Math.random() * 2 + 1,
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
      }}
      style={{
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
      }}
    />
  )
}

// 滚动提示组件
const ScrollHint = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-moon-gray"
      animate={{
        y: [0, 10, 0],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    >
      <div className="w-6 h-10 border-2 border-moon-gray rounded-full flex justify-center pt-2 mb-2">
        <motion.div
          className="w-1 h-2 bg-moon-gray rounded-full"
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
      <p className="font-space-mono text-xs">Scroll to Explore</p>
    </motion.div>
  )
}

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* 流星效果 */}
      {[...Array(5)].map((_, index) => (
        <ShootingStar key={index} />
      ))}
      
      {/* 3D背景增强 */}
      <div className="absolute inset-0 z-0">
        <Canvas className="w-full h-full">
          <Stars count={5000} radius={1000} depth={500} factor={4} saturation={0} fade />
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 100]} intensity={0.5} color="#6366f1" />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-space-grotesk font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <span className="gradient-text">探索</span>无限可能
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-space-mono text-moon-gray mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Exploring the Digital Universe
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-moon-gray mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            We are a collective of creators, engineers, and visionaries<br />
            building tomorrow's digital experiences.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="/projects"
              className="px-8 py-4 bg-nebula-purple hover:bg-nebula-purple/80 text-white font-medium rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              进入虚空
            </motion.a>
            <motion.a
              href="/team"
              className="px-8 py-4 bg-transparent border border-nebula-purple hover:border-nebula-purple/80 text-white font-medium rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              查看作品
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* 滚动提示 */}
      <ScrollHint />
    </section>
  )
}

export default Hero
