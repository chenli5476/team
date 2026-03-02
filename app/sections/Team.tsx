import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Github, Linkedin, X } from 'lucide-react'
import { useState } from 'react'
import { teamMembers } from '../lib/data'

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

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMemberClick = (member: any) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  return (
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
                  一支充满锐气的年轻技术团队，正在用代码探索无限可能。
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
                onClick={() => handleMemberClick(member)}
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
      
      {/* 团队成员模态框 */}
      {selectedMember && (
        <TeamMemberModal 
          member={selectedMember} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  )
}

export default Team
