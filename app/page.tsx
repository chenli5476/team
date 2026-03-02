'use client'

import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
import Hero from './sections/Hero'
import Footer from './sections/Footer'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 模拟加载过程
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-deep-void text-star-white overflow-x-hidden">
      {/* 加载屏幕 */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* 导航栏 */}
      <Navigation isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      
      {/* 页面内容 */}
      <main>
        <Hero />
      </main>
      
      {/* 页脚 */}
      <Footer />
    </div>
  )
}

export default Home
