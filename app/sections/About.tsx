import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useState, useEffect } from 'react'

// 特色项目组件
const FeatureItem = ({ icon, title, description, color }: { icon: string; title: string; description: string; color: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="cursor-pointer relative flex flex-col items-center text-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex flex-col items-center gap-2">
        <motion.div 
          className={`w-12 h-12 rounded-full bg-${color}/20 flex items-center justify-center text-${color} text-xl`}
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            boxShadow: isHovered ? `0 0 20px rgba(${color === 'nebula-purple' ? '99, 102, 241' : color === 'stellar-blue' ? '59, 130, 246' : '6, 182, 212'}, 0.6)` : 'none'
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {icon}
        </motion.div>
        <span className="text-star-white font-medium text-sm">{title}</span>
      </div>
      <AnimatePresence>
        <motion.div 
          className="mt-2 text-moon-gray text-sm max-w-[200px] text-center"
          initial={{ opacity: 0, y: 10, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 10, 
            height: isHovered ? 'auto' : 0
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {description}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// 3D几何形状组件 - Three.js 星球效果
const GeometricShapes = () => {
  const [rotation, setRotation] = useState(0)
  
  // 动画更新
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.01)
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      
      {/* 中心星球 */}
      <mesh rotation={[0, rotation, 0]} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#4f46e5" 
          emissive="#312e81" 
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* 土星环效果 */}
      {[...Array(3)].map((_, i) => (
        <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry 
            args={[3 + i * 0.5, 0.2, 16, 100]} 
          />
          <meshStandardMaterial 
            color={`rgba(99, 102, 241, ${0.3 + i * 0.1})`} 
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
      
      {/* 环绕粒子 */}
      {[...Array(20)].map((_, i) => (
        <mesh key={`particle-${i}`} position={[
          Math.sin(i * 0.314) * 4,
          Math.cos(i * 0.314) * 4,
          Math.sin(i * 0.628) * 2
        ]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" />
        </mesh>
      ))}
      
      {/* 背景星星 */}
      <Stars count={200} radius={10} depth={5} factor={4} saturation={0} fade />
    </Canvas>
  )
}

const About = () => {
  return (
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
            <h3 className="text-lg font-space-mono text-nebula-purple mb-4">关于我们</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]" style={{ fontFamily: '演示新手书, sans-serif' }}>
              数字前沿的开拓者
            </h2>
            
            <div className="space-y-8">
              <div>
                <p className="text-2xl font-medium mb-4 leading-relaxed text-moon-gray">
                  一支充满锐气的年轻技术团队，正在用代码探索无限可能。
                </p>
              </div>
              
              <div>
                <p className="text-lg text-moon-gray mb-4 leading-relaxed">
                  我们的团队成员来自不同的技术背景，带来了丰富的经验和专业知识。我们 <span className="text-[#06b6d4] font-medium">无缝协作</span>，<span className="text-[#8b5cf6] font-medium">追求卓越</span>，不断挑战自我，<span className="text-[#3b82f6] font-medium">探索技术的边界</span>。
                </p>
              </div>
            </div>
            
            {/* 证书展示 */}
            <div className="mt-16">
              <h3 className="text-2xl font-space-grotesk font-bold mb-8 text-[#f8fafc] border-l-4 border-[#8b5cf6] pl-4">
                证书与荣誉
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                  className="bg-cosmic-navy/30 backdrop-blur-sm border border-nebula-purple/20 rounded-xl p-4 hover:border-nebula-purple/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.15)' }}
                >
                  <h4 className="text-lg font-medium mb-2 text-star-white">科大讯飞AI微调工程师认证</h4>
                  <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                    <img 
                      src="/images/certificates/Ai大学认证证书.png" 
                      alt="科大讯飞AI微调工程师认证" 
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        console.error('科大讯飞AI微调工程师认证图片加载失败:', (e.target as HTMLImageElement).src);
                      }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-cosmic-navy/30 backdrop-blur-sm border border-nebula-purple/20 rounded-xl p-4 hover:border-nebula-purple/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.15)' }}
                >
                  <h4 className="text-lg font-medium mb-2 text-star-white">科大讯飞AI智能体工程师认证</h4>
                  <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                    <img 
                      src="/images/certificates/Ai大学认证证书2.png" 
                      alt="科大讯飞AI智能体工程师认证" 
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        console.error('科大讯飞AI智能体工程师认证图片加载失败:', (e.target as HTMLImageElement).src);
                      }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-cosmic-navy/30 backdrop-blur-sm border border-nebula-purple/20 rounded-xl p-4 hover:border-nebula-purple/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.15)' }}
                >
                  <h4 className="text-lg font-medium mb-2 text-star-white">第18届RST大赛奖项</h4>
                  <p className="text-moon-gray text-sm mb-2">国赛二等奖、福建赛区一等奖</p>
                  <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                    <img 
                      src="/images/certificates/D03021515_国赛证书.jpg" 
                      alt="第18届RST大赛奖项" 
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        console.error('第18届RST大赛奖项图片加载失败:', (e.target as HTMLImageElement).src);
                      }}
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="bg-cosmic-navy/30 backdrop-blur-sm border border-nebula-purple/20 rounded-xl p-4 hover:border-nebula-purple/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.15)' }}
                >
                  <h4 className="text-lg font-medium mb-2 text-star-white">亚太杯数学建模三等奖</h4>
                  <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                    <img 
                      src="/images/certificates/亚太杯数学建模比赛三等奖.jpg" 
                      alt="亚太杯数学建模三等奖" 
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        console.error('亚太杯数学建模三等奖图片加载失败:', (e.target as HTMLImageElement).src);
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* 特色图标 */}
            <div className="mt-12">
              <div className="flex justify-center gap-8">
                <FeatureItem 
                  icon="🚀" 
                  title="创新驱动" 
                  description="以技术创新驱动产品迭代，持续探索前沿解决方案" 
                  color="nebula-purple"
                />
                <FeatureItem 
                  icon="🔭" 
                  title="面向未来" 
                  description="立足当下，着眼未来，用技术构建可持续的数字生态" 
                  color="stellar-blue"
                />
                <FeatureItem 
                  icon="⚛️" 
                  title="精准工程" 
                  description="追求代码质量与工程精度，确保每个细节的可靠性" 
                  color="aurora-cyan"
                />
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
  )
}

export default About
