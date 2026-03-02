import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useState } from 'react'
import { projects } from '../lib/data'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
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
            探索我们的宇宙项目
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
              onClick={() => openModal(project)}
            >
              <motion.div
                className={`bg-cosmic-navy/50 backdrop-blur-sm border border-nebula-purple/20 rounded-xl overflow-hidden cursor-pointer h-96`}
                whileHover={{ 
                  scale: 1.02, 
                  y: -10,
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                  borderColor: 'rgba(99, 102, 241, 0.5)'
                }}
              >
                {/* 项目图片 */}
                <div className="relative h-64 overflow-hidden">
                  <div className="w-full h-full relative">
                    <motion.img 
                      src={project.id === 1 ? '/images/果园管理系统网页展示图.png' : project.id === 2 ? '/images/简历网站展示图.png' : project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      whileHover={{ scale: 1.1 }}
                      onError={(e) => {
                        // 图片加载失败时显示首字母占位图
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) {
                          placeholder.style.display = 'flex';
                        }
                      }}
                    />
                    {/* 首字母占位图 */}
                    <div className="w-full h-full bg-cosmic-navy/80 flex items-center justify-center text-xl font-bold text-white hidden">
                      {project.title}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black to-transparent opacity-70"></div>
                </div>
                
                {/* 项目描述 */}
                <div className="p-4">
                  {project.id === 3 ? (
                    <div className="flex flex-col items-center justify-center h-full min-w-[200px]">
                      <h3 className="text-3xl font-bold text-white whitespace-normal">
                        敬请期待
                      </h3>
                      <p className="text-gray-400 mt-2">
                        更多项目开发中...
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                      <div className="flex items-center gap-2">
                        {project.id === 1 && (
                          <>
                            <span className="text-moon-gray text-sm">三创赛参赛项目</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${project.statusColor === 'yellow' ? 'bg-amber-500/20 text-amber-400' : project.statusColor === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                              {project.status}
                            </span>
                          </>
                        )}
                        {project.id === 2 && (
                          <span className={`px-2 py-1 rounded-full text-xs ${project.statusColor === 'yellow' ? 'bg-amber-500/20 text-amber-400' : project.statusColor === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {project.status}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-nebula-purple/20 text-nebula-purple text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 项目详情模态框 */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-space-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ backgroundColor: 'white !important', color: 'black !important' }}
              className="border border-gray-200 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 模态框内容 */}
              <div className="max-h-[80vh] overflow-y-auto">
                {/* 顶部：项目截图 */}
                <div className="relative w-full">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-space-black/50 flex items-center justify-center text-white cursor-pointer z-10" onClick={closeModal}>
                    ×
                  </div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${selectedProject.statusColor === 'yellow' ? 'bg-yellow-400 text-yellow-900' : selectedProject.statusColor === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {selectedProject.status}
                  </div>
                  
                  {/* 截图滑动功能 */}
                  <div className="w-full overflow-hidden relative">
                    <div className="flex transition-transform duration-300 ease-in-out">
                      {selectedProject.id === 1 && (
                        <>
                          <div className="min-w-full">
                            <img 
                              src="/images/果园管理系统网页展示图.png"
                              alt="智慧果园管理系统" 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          {/* 可以添加更多截图 */}
                        </>
                      )}
                      {selectedProject.id === 2 && (
                        <>
                          <div className="min-w-full">
                            <img 
                              src="/images/简历网站展示图.png"
                              alt="团队简历网站" 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          {/* 可以添加更多截图 */}
                        </>
                      )}
                      {selectedProject.id === 3 && (
                        <>
                          <div className="min-w-full">
                            <img 
                              src={selectedProject.image}
                              alt={selectedProject.title} 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* 底部：文字介绍 */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: '华文隶书, sans-serif', color: '#1e3a8a' }}>
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-6">
                    <p style={{ color: '#0e7490' }}>
                      {selectedProject.id === 1 ? '三创赛参赛项目' : selectedProject.subtitle}
                    </p>
                    {selectedProject.id === 1 && (
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">
                        调试中
                      </span>
                    )}
                  </div>
                  <h4 style={{ color: '#312e81' }} className="text-lg font-medium mb-3">项目简介</h4>
                  <p style={{ color: '#64748b' }} className="mb-6">
                    {selectedProject.details.intro}
                  </p>
                  {selectedProject.details.features.length > 0 && (
                    <>
                      <h4 style={{ color: '#4c1d95' }} className="text-lg font-medium mb-3">核心功能</h4>
                      <ul className="space-y-2 mb-6">
                        {selectedProject.details.features.map((feature: string, index: number) => {
                          let iconColor = ''
                          if (feature.includes('📊')) iconColor = 'text-green-600'
                          else if (feature.includes('🌤️')) iconColor = 'text-yellow-600'
                          else if (feature.includes('⚠️')) iconColor = 'text-red-600'
                          else if (feature.includes('✅')) iconColor = 'text-blue-600'
                          else if (feature.includes('🤖')) iconColor = 'text-purple-600'
                          
                          const parts = feature.split('：')
                          return (
                            <li key={index}>
                              <span className={iconColor}>{parts[0]}</span> <span style={{ color: '#475569' }}>：</span> <span style={{ color: '#64748b' }}>{parts[1]}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </>
                  )}
                  <h4 style={{ color: '#312e81' }} className="text-lg font-medium mb-3">技术栈</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        style={{ 
                          backgroundColor: 'rgba(248, 250, 252, 0.8)',
                          borderColor: 'rgba(30, 64, 175, 0.5)',
                          color: '#1e40af'
                        }}
                        className="px-3 py-1 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
