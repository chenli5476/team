import { navLinks } from '../lib/data'

// 小飞船彩蛋组件
const SpaceshipEasterEgg = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-nebula-purple/20 border border-nebula-purple/50 flex items-center justify-center text-nebula-purple cursor-pointer z-40 hover:bg-nebula-purple/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-nebula-purple/20 hover:rotate-10 active:scale-95"
      onClick={scrollToTop}
      style={{
        animation: 'bounce 2s infinite',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

const Footer = () => {
  return (
    <footer className="py-16 relative overflow-hidden">
      {/* 背景地平线光效 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-nebula-purple to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo + Slogan */}
          <div>
            <a href="#" className="text-2xl font-space-mono font-bold gradient-text inline-block mb-4">
              知澜
            </a>
            <p className="text-moon-gray mb-6">
              探索数字宇宙的无限可能
            </p>
            <p className="text-aurora-cyan font-space-mono text-sm">
              © 2025 知澜. All systems operational.
            </p>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h4 className="text-star-white font-bold mb-4">快速链接</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-moon-gray hover:text-nebula-purple transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 联系信息 */}
          <div>
            <h4 className="text-star-white font-bold mb-4">联系我们</h4>
            <ul className="space-y-2">
              <li className="text-moon-gray">
                邮箱：contact@cosmic-explorers.com
              </li>
              <li className="text-moon-gray">
                地址：北京市海淀区中关村科技园区
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-nebula-purple/20 pt-8 text-center text-moon-gray text-sm">
          <p>Designed with ❤️ for the digital universe</p>
        </div>
      </div>
      
      {/* 小飞船彩蛋 */}
      <SpaceshipEasterEgg />
    </footer>
  )
}

export default Footer
