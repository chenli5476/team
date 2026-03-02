'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../sections/Footer'
import { projects } from '../../lib/data'

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const projectData = projects.find(p => p.id === parseInt(id!))
    if (projectData) {
      setProject(projectData)
    } else {
      // 项目不存在，重定向到项目列表页
      router.push('/projects')
    }
  }, [id, router])

  if (!project) {
    return (
      <div className="min-h-screen bg-deep-void text-star-white flex items-center justify-center">
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-void text-star-white overflow-x-hidden">
      {/* 导航栏 */}
      <Navigation isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      
      {/* 页面内容 */}
      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* 返回按钮 */}
          <motion.button
            className="mb-8 text-moon-gray hover:text-nebula-purple transition-colors duration-300 flex items-center gap-2"
            onClick={() => router.push('/projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回项目列表
          </motion.button>

          {/* 项目标题 */}
          <motion.h1 
            className="text-3xl md:text-5xl font-space-grotesk font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {project.title}
          </motion.h1>

          {/* 项目状态 */}
          <motion.div 
            className="mb-8 px-4 py-2 bg-nebula-purple/20 border border-nebula-purple/50 rounded-lg inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-nebula-purple font-medium">前端已上线，后端API开发中</span>
          </motion.div>

          {/* 项目截图 */}
          <motion.div 
            className="mb-12 rounded-xl overflow-hidden border border-nebula-purple/20 shadow-lg shadow-nebula-purple/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* 项目描述 */}
          <motion.p 
            className="text-lg text-moon-gray mb-12 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {project.description}
          </motion.p>

          {/* 技术栈 */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-space-grotesk font-bold mb-4">技术栈</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech: string, index: number) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-stellar-blue/20 border border-stellar-blue/50 rounded-full text-stellar-blue text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 演示链接 */}
          <motion.a
            href="#" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-nebula-purple hover:bg-nebula-purple/80 text-white font-medium rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3c0-1.66 4-3 9-3s9 1.34 9 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            查看演示
          </motion.a>
        </div>
      </main>
      
      {/* 页脚 */}
      <Footer />
    </div>
  )
}

export default ProjectDetailPage