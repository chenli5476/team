import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { navLinks } from '../lib/data'
import { useMousePosition } from '../hooks/useMousePosition'

const Navigation = ({ isMenuOpen, onMenuToggle }: { isMenuOpen: boolean; onMenuToggle: () => void }) => {
  const [scrolled, setScrolled] = useState(false)
  const mousePosition = useMousePosition()

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-space-black/90 backdrop-blur-xl' : 'bg-transparent'}`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(99, 102, 241, 0.2)' : 'none',
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-space-mono font-bold gradient-text">
          知澜
        </a>
        
        {/* 桌面导航 */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-moon-gray hover:text-star-white transition-colors duration-300 font-medium relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-nebula-purple to-stellar-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        {/* 移动端菜单按钮 */}
        <button 
          className="md:hidden text-star-white"
          onClick={onMenuToggle}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* 移动端导航菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-deep-void z-30 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Canvas className="absolute inset-0 z-0">
              <Stars count={500} radius={500} depth={200} factor={4} saturation={0} fade />
            </Canvas>
            <div className="relative z-10 text-center">
              <div className="flex flex-col space-y-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-space-grotesk font-bold text-star-white hover:text-nebula-purple transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={onMenuToggle}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 星光轨迹效果 */}
      {scrolled && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1) 0%, transparent 200px)`,
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </nav>
  )
}

export default Navigation
