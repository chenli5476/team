import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

// 导航链接
const navLinks = [
  { name: '首页', href: '#' },
  { name: '关于我们', href: '#about' },
  { name: '团队成员', href: '#team' },
  { name: '项目展示', href: '#projects' },
  { name: '技术栈', href: '#skills' },
  { name: '联系我们', href: '#contact' },
]

// 团队成员数据
const teamMembers = [
  {
    id: 1,
    name: '张星云',
    role: '前端架构师',
    bio: '专注于前端架构和用户体验设计，拥有5年前端开发经验',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20portrait%20of%20a%20tech%20engineer%20with%20glasses%20in%20space%20theme&size=512x512',
    color: '#3b82f6', // 前端=蓝
    orbitRadius: 1,
    timeline: [
      { year: '2020', event: '加入宇宙探索者团队' },
      { year: '2018', event: '担任前端架构师' },
      { year: '2016', event: '开始前端开发职业生涯' },
    ],
    social: {
      github: '#',
      linkedin: '#',
    },
  },
  {
    id: 2,
    name: '李星辰',
    role: '后端工程师',
    bio: '擅长分布式系统和云计算，致力于构建高可用的后端服务',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20portrait%20of%20a%20back-end%20developer%20in%20space%20theme&size=512x512',
    color: '#10b981', // 后端=绿
    orbitRadius: 1.2,
    timeline: [
      { year: '2021', event: '加入宇宙探索者团队' },
      { year: '2019', event: '专注于分布式系统开发' },
      { year: '2017', event: '开始后端开发职业生涯' },
    ],
    social: {
      github: '#',
      linkedin: '#',
    },
  },
  {
    id: 3,
    name: '王宇宙',
    role: 'UI/UX设计师',
    bio: '专注于用户界面设计和用户体验研究，创造美观且易用的产品',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20portrait%20of%20a%20UI%20UX%20designer%20in%20space%20theme&size=512x512',
    color: '#6366f1', // 设计=紫
    orbitRadius: 0.8,
    timeline: [
      { year: '2019', event: '加入宇宙探索者团队' },
      { year: '2018', event: '专注于UI/UX设计' },
      { year: '2016', event: '开始设计职业生涯' },
    ],
    social: {
      linkedin: '#',
    },
  },
  {
    id: 4,
    name: '赵星际',
    role: '全栈工程师',
    bio: '具备前后端开发能力，擅长解决复杂的技术问题',
    skills: ['React', 'Node.js', 'Python', 'Docker'],
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20portrait%20of%20a%20full-stack%20developer%20in%20space%20theme&size=512x512',
    color: '#ec4899', // 全栈=粉
    orbitRadius: 1.1,
    timeline: [
      { year: '2022', event: '加入宇宙探索者团队' },
      { year: '2020', event: '成为全栈工程师' },
      { year: '2018', event: '开始软件开发职业生涯' },
    ],
    social: {
      github: '#',
      linkedin: '#',
    },
  },
]

// 项目数据
const projects = [
  {
    id: 1,
    title: '深空探索者',
    description: '一个基于Three.js的交互式宇宙探索应用，让用户能够虚拟漫游太空',
    tech: ['Three.js', 'React', 'TypeScript', 'Framer Motion'],
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=space%20exploration%20app%20interface%20with%203D%20stars%20and%20planets&size=1024x768',
  },
  {
    id: 2,
    title: '星云数据分析平台',
    description: '一个用于分析和可视化天文数据的平台，帮助科学家发现宇宙的奥秘',
    tech: ['React', 'Node.js', 'MongoDB', 'D3.js'],
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=data%20visualization%20platform%20with%20space%20theme&size=1024x768',
  },
  {
    id: 3,
    title: '星际通讯系统',
    description: '一个实时通讯应用，模拟星际间的通信延迟和数据传输',
    tech: ['React', 'Socket.io', 'Node.js', 'Tailwind CSS'],
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=real-time%20communication%20app%20with%20space%20theme&size=1024x768',
  },
]

// 技术栈数据
const skills = [
  { name: 'React', level: 95 },
  { name: 'Next.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Tailwind CSS', level: 90 },
  { name: 'Three.js', level: 80 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 75 },
  { name: 'AWS', level: 70 },
  { name: 'Docker', level: 75 },
  { name: 'Figma', level: 80 },
]

// 星空背景组件
const Starfield = () => {
  return (
    <Canvas className="starfield">
      <Stars
        count={2000}
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
          <div className="relative z-10 text-center">
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
                宇宙探索者
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

// 导航栏组件
const Navigation = ({ isMenuOpen, onMenuToggle }: { isMenuOpen: boolean; onMenuToggle: () => void }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 监听鼠标移动事件
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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
          宇宙探索者
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

// 流星效果组件
const ShootingStar = () => {
  const [position, setPosition] = useState({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
  })

  useEffect(() => {
    const resetPosition = () => {
      setPosition({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
      })
    }
    const interval = setInterval(resetPosition, Math.random() * 5000 + 2000)
    return () => clearInterval(interval)
  }, [])

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

// 3D几何形状组件
const GeometricShapes = () => {
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      
      {/* 二十面体 */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color="#6366f1"
          metalness={0.5}
          roughness={0.2}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
      
      {/* 环面 */}
      <mesh position={[2, 2, -2]}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          metalness={0.5}
          roughness={0.2}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
      
      {/* 立方体 */}
      <mesh position={[-2, -2, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#ec4899"
          metalness={0.5}
          roughness={0.2}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
    </Canvas>
  )
}

// 团队成员模态框组件
const TeamMemberModal = ({ member, isOpen, onClose }: { member: any; isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Canvas className="absolute inset-0 z-0">
            <Stars count={1000} radius={500} depth={200} factor={4} saturation={0} fade />
          </Canvas>
          <motion.div
            className="relative z-10 bg-cosmic-navy/90 backdrop-blur-xl border border-nebula-purple/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-64 h-64 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-nebula-purple/50">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-space-grotesk font-bold mb-2 text-star-white">
                    {member.name}
                  </h3>
                  <p className="text-nebula-purple font-medium mb-6 text-xl">{member.role}</p>
                  <p className="text-moon-gray mb-8">{member.bio}</p>
                  <div className="mb-8">
                    <h4 className="text-lg font-bold mb-4 text-star-white">技能</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill: string, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-nebula-purple/20 text-nebula-purple text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-8">
                    <h4 className="text-lg font-bold mb-4 text-star-white">职业轨迹</h4>
                    <div className="space-y-4">
                      {member.timeline.map((item: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-20 text-aurora-cyan font-space-mono">{item.year}</div>
                          <div className="flex-1 text-moon-gray">{item.event}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {member.social.github && (
                      <a href={member.social.github} className="text-moon-gray hover:text-nebula-purple transition-colors">
                        <Github size={24} />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-moon-gray hover:text-nebula-purple transition-colors">
                        <Linkedin size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button 
              className="absolute top-4 right-4 text-moon-gray hover:text-star-white transition-colors"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 技能图标环绕组件
const SkillOrbit = ({ skills, color }: { skills: string[]; color: string }) => {
  return (
    <div className="relative w-full h-full">
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2
        const radius = 80
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        
        return (
          <motion.div
            key={index}
            className="absolute w-10 h-10 bg-cosmic-navy/80 rounded-full flex items-center justify-center border border-nebula-purple/30"
            style={{
              left: `calc(50% + ${x}px - 20px)`,
              top: `calc(50% + ${y}px - 20px)`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
          >
            <span className="text-xs text-nebula-purple font-medium">{skill.substring(0, 2)}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

// 项目详情模态框组件
const ProjectModal = ({ project, isOpen, onClose }: { project: any; isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative z-10 bg-cosmic-navy/90 backdrop-blur-xl border border-nebula-purple/30 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* 左侧图片 */}
              <div className="h-64 lg:h-auto overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 右侧详情 */}
              <div className="p-8">
                <h3 className="text-3xl font-space-grotesk font-bold mb-4 text-star-white">
                  {project.title}
                </h3>
                <p className="text-moon-gray mb-8">{project.description}</p>
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-star-white">技术栈</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-stellar-blue/20 text-stellar-blue text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-star-white">挑战与解决方案</h4>
                  <p className="text-moon-gray">
                    我们在项目开发过程中遇到了多个技术挑战，通过团队协作和创新思维，成功找到了有效的解决方案，确保了项目的顺利完成。
                  </p>
                </div>
                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-star-white">团队角色</h4>
                  <p className="text-moon-gray">
                    前端开发：张星云<br />
                    后端开发：李星辰<br />
                    UI/UX设计：王宇宙<br />
                    全栈开发：赵星际
                  </p>
                </div>
                <motion.a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-nebula-purple hover:bg-nebula-purple/80 text-white font-medium rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  查看项目链接 <ExternalLink size={16} className="ml-2" />
                </motion.a>
              </div>
            </div>
            <button 
              className="absolute top-4 right-4 text-moon-gray hover:text-star-white transition-colors bg-cosmic-navy/50 rounded-full p-2"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 技术轨道组件
const SkillOrbitDisplay = ({ skills }: { skills: any[] }) => {
  // 分类技能
  const frontendSkills = skills.filter(skill => ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].includes(skill.name))
  const backendSkills = skills.filter(skill => ['Node.js', 'Express', 'MongoDB', 'AWS'].includes(skill.name))
  const designSkills = skills.filter(skill => ['Figma', 'Adobe XD', 'UI Design', 'UX Research'].includes(skill.name))
  const devopsSkills = skills.filter(skill => ['Docker', 'AWS'].includes(skill.name))

  return (
    <div className="relative w-full h-96">
      {/* 中心核心能力 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-nebula-purple/20 flex items-center justify-center border border-nebula-purple/50">
          <h3 className="text-center font-space-grotesk font-bold text-star-white">
            核心能力
          </h3>
        </div>
      </div>
      
      {/* 前端技能轨道 */}
      <div className="absolute inset-0">
        <div className="w-full h-full rounded-full border-2 border-aurora-cyan/30 relative">
          {frontendSkills.map((skill, index) => {
            const angle = (index / frontendSkills.length) * Math.PI * 2
            const radius = 120
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            
            return (
              <motion.div
                key={skill.name}
                className="absolute w-16 h-16 bg-cosmic-navy/80 rounded-full flex items-center justify-center border border-aurora-cyan/50 cursor-pointer"
                style={{
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 32px)`,
                }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(6, 182, 212, 0.6)' }}
              >
                <span className="text-xs text-aurora-cyan font-medium text-center">{skill.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* 后端技能轨道 */}
      <div className="absolute inset-12">
        <div className="w-full h-full rounded-full border-2 border-stellar-blue/30 relative">
          {backendSkills.map((skill, index) => {
            const angle = (index / backendSkills.length) * Math.PI * 2
            const radius = 80
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            
            return (
              <motion.div
                key={skill.name}
                className="absolute w-14 h-14 bg-cosmic-navy/80 rounded-full flex items-center justify-center border border-stellar-blue/50 cursor-pointer"
                style={{
                  left: `calc(50% + ${x}px - 28px)`,
                  top: `calc(50% + ${y}px - 28px)`,
                }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(59, 130, 246, 0.6)' }}
              >
                <span className="text-xs text-stellar-blue font-medium text-center">{skill.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* 设计技能轨道 */}
      <div className="absolute inset-24">
        <div className="w-full h-full rounded-full border-2 border-nebula-purple/30 relative">
          {designSkills.map((skill, index) => {
            const angle = (index / designSkills.length) * Math.PI * 2
            const radius = 40
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            
            return (
              <motion.div
                key={skill.name}
                className="absolute w-12 h-12 bg-cosmic-navy/80 rounded-full flex items-center justify-center border border-nebula-purple/50 cursor-pointer"
                style={{
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)' }}
              >
                <span className="text-xs text-nebula-purple font-medium text-center">{skill.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 信号波动画组件
const SignalWaves = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {[1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 border border-nebula-purple/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 1,
          }}
          style={{
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  )
}

// 输入框组件
const InputField = ({ label, type, placeholder }: { label: string; type: string; placeholder: string }) => {
  return (
    <div className="relative">
      <input
        type={type}
        className="w-full bg-space-black border-b border-nebula-purple/30 text-star-white focus:outline-none focus:border-nebula-purple/80 transition-all duration-300 pb-2 pt-6"
        placeholder=""
      />
      <label className="absolute left-0 top-4 text-moon-gray hover:text-nebula-purple transition-colors duration-300 text-sm">
        {placeholder}
      </label>
    </div>
  )
}

// 小飞船彩蛋组件
const SpaceshipEasterEgg = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <motion.button
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-nebula-purple/20 border border-nebula-purple/50 flex items-center justify-center text-nebula-purple cursor-pointer z-30"
      whileHover={{ scale: 1.1, rotate: 10, boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
    >
      <span className="text-2xl">🚀</span>
    </motion.button>
  )
}

// 主页面组件
export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 模拟加载过程
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // 切换移动端菜单
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-space">
      <Starfield />
      <LoadingScreen isLoading={isLoading} />
      <Navigation isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      
      {/* Hero Section */}
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
                href="#projects"
                className="px-8 py-4 bg-nebula-purple hover:bg-nebula-purple/80 text-white font-medium rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                Enter the Void
              </motion.a>
              <motion.a
                href="#team"
                className="px-8 py-4 bg-transparent border border-nebula-purple hover:border-nebula-purple/80 text-white font-medium rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                View Our Work
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* 滚动提示 */}
        <ScrollHint />
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧文字内容 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-lg font-space-mono text-nebula-purple mb-4">WHO WE ARE</h3>
              <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold mb-8 gradient-text">
                Pioneers of the Digital Frontier
              </h2>
              
              <div className="space-y-8">
                <div>
                  <p className="text-lg text-star-white mb-4 leading-relaxed">
                    We are a team of technical experts dedicated to solving complex problems through innovative technology. We believe that, just like space exploration, technological exploration requires courage, perseverance, and boundless curiosity.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-space-grotesk font-bold text-aurora-cyan">50+</span>
                    <span className="text-moon-gray">years of combined experience</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-lg text-star-white mb-4 leading-relaxed">
                    Our team members come from diverse technical backgrounds, bringing rich experience and expertise. We collaborate seamlessly, pursue excellence, and constantly challenge ourselves to explore the boundaries of technology.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-space-grotesk font-bold text-nebula-purple">20+</span>
                    <span className="text-moon-gray">completed projects</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-lg text-star-white mb-4 leading-relaxed">
                    Our goal is to create impactful products that deliver value to users while advancing technology. We believe that through collaboration and innovation, we can create technological solutions that change the world.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-space-grotesk font-bold text-stellar-blue">10+</span>
                    <span className="text-moon-gray">industry awards</span>
                  </div>
                </div>
              </div>
              
              {/* 特色列表 */}
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-nebula-purple/20 flex items-center justify-center text-nebula-purple">
                    🚀
                  </div>
                  <span className="text-star-white font-medium">Innovation-Driven</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stellar-blue/20 flex items-center justify-center text-stellar-blue">
                    🔭
                  </div>
                  <span className="text-star-white font-medium">Future-Focused</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-aurora-cyan/20 flex items-center justify-center text-aurora-cyan">
                    ⚛️
                  </div>
                  <span className="text-star-white font-medium">Precision Engineering</span>
                </div>
              </div>
            </motion.div>
            
            {/* 右侧3D几何形状 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-96 md:h-[500px] bg-cosmic-navy/30 backdrop-blur-sm border border-nebula-purple/20 rounded-xl overflow-hidden relative"
            >
              <GeometricShapes />
              {/* 背景网格线 */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f111_1px,transparent_1px),linear-gradient(to_bottom,#6366f111_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section id="team" className="py-20 md:py-32 bg-gradient-nebula relative overflow-hidden">
        {/* 星座连线背景 */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,100 L300,150 L500,100 L700,200 L900,150" stroke="#6366f1" strokeWidth="1" fill="none" />
            <path d="M200,300 L400,350 L600,300 L800,350" stroke="#6366f1" strokeWidth="1" fill="none" />
            <path d="M150,500 L350,450 L550,500 L750,450" stroke="#6366f1" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold mb-4 gradient-text">
              团队成员
            </h2>
            <p className="text-moon-gray text-lg max-w-2xl mx-auto">
              我们的团队由一群充满激情和创造力的技术专家组成
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group"
              >
                <motion.div
                  className="bg-cosmic-navy/50 backdrop-blur-sm border border-nebula-purple/20 rounded-xl overflow-hidden hover:border-nebula-purple/50 transition-all duration-300 hover:shadow-lg hover:shadow-nebula-purple/20 p-6 text-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* 技能图标环绕 */}
                  <div className="w-48 h-48 mx-auto mb-6 relative">
                    <SkillOrbit skills={member.skills} color={member.color} />
                    
                    {/* 头像 */}
                    <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-nebula-purple/50">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* 发光环 */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: `0 0 20px ${member.color}`,
                      }}
                      animate={{
                        boxShadow: [`0 0 20px ${member.color}`, `0 0 30px ${member.color}`, `0 0 20px ${member.color}`],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-space-grotesk font-bold mb-2 text-star-white">
                    {member.name}
                  </h3>
                  <p className="text-nebula-purple font-medium mb-4">{member.role}</p>
                  <p className="text-moon-gray mb-6 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.bio}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold mb-4 gradient-text">
              项目展示
            </h2>
            <p className="text-moon-gray text-lg max-w-2xl mx-auto">
              我们的项目体现了我们的技术实力和创新精神
            </p>
          </motion.div>
          
          {/* 水平滚动容器 */}
          <div className="relative">
            <div className="overflow-x-auto pb-8 -mx-4 px-4">
              <div className="flex gap-8 min-w-max">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="group relative w-80 md:w-96"
                  >
                    <motion.div
                      className="bg-cosmic-navy/50 backdrop-blur-sm border border-nebula-purple/20 rounded-xl overflow-hidden hover:border-nebula-purple/50 transition-all duration-300 hover:shadow-lg hover:shadow-nebula-purple/20 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="h-64 relative overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-space-grotesk font-bold text-star-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-moon-gray text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.tech.map((tech: string, techIndex: number) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-stellar-blue/20 text-stellar-blue text-xs rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* 项目间的连接线 */}
                    {index < projects.length - 1 && (
                      <div className="absolute top-1/2 left-full w-8 h-0.5 bg-nebula-purple/30 transform -translate-y-1/2 hidden md:block"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 bg-gradient-nebula">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold mb-4 gradient-text">
              技术栈
            </h2>
            <p className="text-moon-gray text-lg max-w-2xl mx-auto">
              我们掌握的技术工具和框架
            </p>
          </motion.div>
          
          {/* 轨道式展示 - 仅在大屏显示 */}
          <div className="hidden lg:block mb-24">
            <SkillOrbitDisplay skills={skills} />
          </div>
          
          {/* 光谱条展示 */}
          <div className="max-w-3xl mx-auto">
            {skills.map((skill, index) => {
              // 根据技能类型设置不同的颜色
              let skillColor = 'from-nebula-purple to-stellar-blue'
              if (['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].includes(skill.name)) {
                skillColor = 'from-aurora-cyan to-stellar-blue'
              } else if (['Node.js', 'Express', 'MongoDB', 'AWS'].includes(skill.name)) {
                skillColor = 'from-stellar-blue to-nebula-purple'
              } else if (['Figma', 'Adobe XD', 'UI Design', 'UX Research'].includes(skill.name)) {
                skillColor = 'from-nebula-purple to-quantum-pink'
              } else if (['Docker'].includes(skill.name)) {
                skillColor = 'from-quantum-pink to-aurora-cyan'
              }
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-8"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-star-white font-medium">{skill.name}</span>
                    <span className="text-moon-gray text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-cosmic-navy/50 rounded-full h-3 overflow-hidden border border-nebula-purple/20">
                    <motion.div
                      className={`bg-gradient-to-r ${skillColor} h-full rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      style={{
                        boxShadow: '0 0 10px rgba(99, 102, 241, 0.6)',
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
        {/* 背景信号波 */}
        <SignalWaves />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold mb-4 gradient-text">
                联系我们
              </h2>
              <p className="text-moon-gray text-lg max-w-2xl mx-auto">
                有任何问题或合作意向，请随时联系我们
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 左侧联系信息 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-cosmic-navy/50 backdrop-blur-sm border border-nebula-purple/20 rounded-xl p-8"
              >
                <h3 className="text-2xl font-space-grotesk font-bold mb-8 gradient-text">
                  Establish Connection
                </h3>
                
                <p className="text-moon-gray mb-8">
                  We'd love to hear from you! Whether you have a question about our services, want to collaborate on a project, or just want to say hello, feel free to reach out to us.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-nebula-purple/20 flex items-center justify-center text-nebula-purple">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-star-white font-medium mb-1">Email</h4>
                      <p className="text-moon-gray">2958654899@qq.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-stellar-blue/20 flex items-center justify-center text-stellar-blue">
                      <Linkedin size={20} />
                    </div>
                    <div>
                      <h4 className="text-star-white font-medium mb-1">LinkedIn</h4>
                      <p className="text-moon-gray">Cosmic Explorers Team</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-aurora-cyan/20 flex items-center justify-center text-aurora-cyan">
                      <Github size={20} />
                    </div>
                    <div>
                      <h4 className="text-star-white font-medium mb-1">GitHub</h4>
                      <p className="text-moon-gray">@cosmic-explorers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-stellar-blue/20 flex items-center justify-center text-stellar-blue">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 className="text-star-white font-medium mb-1">地址</h4>
                      <p className="text-moon-gray">中国·福建</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h4 className="text-lg font-bold mb-4 text-star-white">Connect With Us</h4>
                  <div className="flex gap-4">
                    <motion.a
                      href="#"
                      className="w-10 h-10 rounded-full bg-nebula-purple/20 flex items-center justify-center text-nebula-purple hover:bg-nebula-purple/40 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-10 h-10 rounded-full bg-stellar-blue/20 flex items-center justify-center text-stellar-blue hover:bg-stellar-blue/40 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Linkedin size={20} />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-10 h-10 rounded-full bg-aurora-cyan/20 flex items-center justify-center text-aurora-cyan hover:bg-aurora-cyan/40 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Mail size={20} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
              
              {/* 右侧联系表单 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-cosmic-navy/50 backdrop-blur-sm border border-nebula-purple/20 rounded-xl p-8"
              >
                <h3 className="text-2xl font-space-grotesk font-bold mb-8 gradient-text">
                  Send a Message
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <InputField label="Name" type="text" placeholder="Your Name" />
                    </div>
                    <div>
                      <InputField label="Email" type="email" placeholder="Your Email" />
                    </div>
                  </div>
                  
                  <div>
                    <InputField label="Subject" type="text" placeholder="Message Subject" />
                  </div>
                  
                  <div>
                    <label className="block text-moon-gray mb-2 text-sm">Message</label>
                    <textarea
                      className="w-full bg-space-black border border-nebula-purple/30 text-star-white focus:outline-none focus:border-nebula-purple/80 transition-all duration-300 p-4 rounded-lg h-32"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  
                  <motion.button
                    className="w-full py-4 bg-nebula-purple hover:bg-nebula-purple/80 text-white font-medium rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-space-black border-t border-nebula-purple/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-space-mono font-bold gradient-text mb-4">
                宇宙探索者
              </h3>
              <p className="text-moon-gray mb-6">
                探索数字宇宙的无限可能，创造未来科技体验
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-moon-gray hover:text-nebula-purple transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-moon-gray hover:text-nebula-purple transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-moon-gray hover:text-nebula-purple transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-star-white mb-4">快速链接</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-moon-gray hover:text-nebula-purple transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-star-white mb-4">联系我们</h4>
              <ul className="space-y-2">
                <li className="text-moon-gray">
                  2958654899@qq.com
                </li>
                <li className="text-moon-gray">
                  中国·福建
                </li>
                <li className="text-moon-gray">
                  @cosmic-explorers
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-nebula-purple/20 text-center">
            <p className="text-moon-gray text-sm">
              © 2024 宇宙探索者. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* 小飞船彩蛋 */}
      <SpaceshipEasterEgg />
    </div>
  )
}
