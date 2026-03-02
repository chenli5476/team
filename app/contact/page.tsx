'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

const ContactPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-deep-void text-star-white overflow-x-hidden">
      {/* 导航栏 */}
      <Navigation isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      
      {/* 页面内容 */}
      <main>
        <Contact />
      </main>
      
      {/* 页脚 */}
      <Footer />
    </div>
  )
}

export default ContactPage