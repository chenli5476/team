import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Mail, MapPin } from 'lucide-react'

// 信号波动画组件
const SignalWave = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-20">
      <div className="w-full h-full flex items-center justify-center">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border border-nebula-purple"
            style={{
              width: `${100 + index * 100}px`,
              height: `${100 + index * 100}px`,
            }}
            animate={{
              scale: [0, 3],
              opacity: [1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 1.3,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <SignalWave />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-space-grotesk font-bold mb-4 gradient-text">
            联系我们
          </h2>
          <p className="text-moon-gray text-lg max-w-2xl mx-auto">
            建立通讯连接
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左侧联系信息 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-cosmic-navy/50 backdrop-blur-sm border border-nebula-purple/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-space-grotesk font-bold mb-8 text-star-white">
              建立联系
            </h3>
            <p className="text-moon-gray mb-8">
              我们期待与您建立联系，共同探索数字宇宙的无限可能。
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-nebula-purple/20 flex items-center justify-center text-nebula-purple">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-star-white font-medium mb-1">邮箱</h4>
                  <p className="text-moon-gray">2958654899@qq.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-stellar-blue/20 flex items-center justify-center text-stellar-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-star-white font-medium mb-1">地址</h4>
                  <p className="text-moon-gray">中国·福建</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* 右侧通讯表单 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-cosmic-navy/50 backdrop-blur-sm border border-nebula-purple/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-space-grotesk font-bold mb-8 text-star-white">
              发送讯息
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-star-white font-medium mb-2">姓名</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-space-black/50 border border-nebula-purple/30 rounded-lg text-star-white focus:outline-none focus:border-nebula-purple focus:ring-2 focus:ring-nebula-purple/20 transition-all duration-300"
                  placeholder="您的姓名"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-star-white font-medium mb-2">邮箱</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-space-black/50 border border-nebula-purple/30 rounded-lg text-star-white focus:outline-none focus:border-nebula-purple focus:ring-2 focus:ring-nebula-purple/20 transition-all duration-300"
                  placeholder="您的邮箱"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-star-white font-medium mb-2">信息</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-space-black/50 border border-nebula-purple/30 rounded-lg text-star-white focus:outline-none focus:border-nebula-purple focus:ring-2 focus:ring-nebula-purple/20 transition-all duration-300"
                  placeholder="您的信息"
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-nebula-purple to-stellar-blue text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-nebula-purple/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                发送讯息
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
