'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../lib/data';

// 技能光谱条组件
const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => {
  // 根据技能类型设置颜色
  const getSkillColor = (skillName: string) => {
    if (['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React框架', 'Next.js框架', 'TypeScript语言', 'Tailwind CSS样式'].includes(skillName)) {
      return 'from-stellar-blue to-aurora-cyan';
    } else if (['Node.js', 'Express', 'MongoDB', 'AWS', 'Node.js后端', 'Express框架', 'MongoDB数据库', 'AWS云服务'].includes(skillName)) {
      return 'from-aurora-cyan to-nebula-purple';
    } else {
      return 'from-nebula-purple to-stellar-blue';
    }
  }

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-star-white font-medium">{name}</span>
        <span className="text-aurora-cyan font-space-mono">{level}%</span>
      </div>
      <div className="w-full h-2 bg-cosmic-navy/50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getSkillColor(name)} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          style={{
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)',
          }}
        />
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const skillIcons = [
    { name: 'Git', icon: '🔀' },
    { name: 'UI设计', icon: '🎨' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Figma', icon: '🖌️' },
    { name: 'Docker', icon: '🐳' },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-nebula relative min-h-[600px]">
      <div className="container mx-auto px-4">
        {/* 标题 */}
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
            我们的技术光谱
          </p>
        </motion.div>
        
        {/* 图标网格 - 简单居中排列 */}
        <div className="flex justify-center items-center gap-8 flex-wrap max-w-4xl mx-auto px-4 mb-20">
          {skillIcons.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-20 h-20 rounded-full bg-cosmic-navy/80 border border-nebula-purple/50 flex items-center justify-center text-3xl hover:border-aurora-cyan transition-colors cursor-pointer">
                {skill.icon}
              </div>
              <span className="text-star-white text-sm">{skill.name}</span>
            </motion.div>
          ))}
        </div>
        
        {/* 查看详情按钮 - 右下角 */}
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed right-8 bottom-32 px-5 py-3 bg-cosmic-navy/80 backdrop-blur-sm border border-nebula-purple/30 text-aurora-cyan rounded-full flex items-center gap-2 hover:bg-cosmic-navy/90 hover:border-aurora-cyan transition-colors z-50"
        >
          <span>查看技能详情</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* 展开的技能面板 */}
        {isExpanded && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-96 bg-cosmic-navy/95 backdrop-blur-sm border-l border-nebula-purple/30 p-8 z-50 overflow-y-auto"
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-moon-gray hover:text-star-white transition-colors"
            >
              ✕
            </button>
            <h3 className="text-2xl font-space-grotesk font-bold text-star-white mb-6">
              技能熟练度
            </h3>
            {/* 技能进度条列表 */}
            {skills.map((skill, index) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;