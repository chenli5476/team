// 导航链接
export const navLinks = [
  { name: '首页', href: '/' },
  { name: '关于我们', href: '/about' },
  { name: '团队成员', href: '/team' },
  { name: '项目展示', href: '/projects' },
  { name: '技术栈', href: '/skills' },
  { name: '联系我们', href: '/contact' },
]

// 团队成员数据
export const teamMembers = [
  {
    id: 1,
    name: '沈嘉钧',
    role: '团队成员',
    bio: '简历已提交，资质审核中',
    skills: ['Node.js后端', 'Express框架', 'MongoDB数据库', 'AWS云服务'],
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20portrait%20of%20a%20back-end%20developer%20in%20space%20theme&size=512x512',
    color: '#10b981', // 后端=绿
    orbitRadius: 1.2,
    timeline: [
      { year: '2025', event: '入学成为大一新生' },
      { year: '2025', event: '加入知澜团队' },
      { year: '2025', event: '开始学习后端开发' },
    ],
    social: {
      github: '#',
      linkedin: '#',
    },
  },
  {
    id: 2,
    name: '陈航朸',
    role: '团队交付负责人',
    bio: '负责项目最终交付物的品质审核与统筹技术文档，对外展示材料的优化与完善。确保团队成果以高水准呈现。具备灵活的技术协作能力，可支援前端开发工作。',
    skills: ['文档规范', 'PPT优化', '品质把控', '前端开发（辅助）'],
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20portrait%20of%20a%20quality%20control%20officer%20in%20space%20theme&size=512x512',
    color: '#06b6d4', // 品质=青
    orbitRadius: 0.8,
    timeline: [
      { year: '2025', event: '入学成为大一新生' },
      { year: '2025', event: '加入知澜团队' },
      { year: '2025', event: '开始学习品质管理' },
    ],
    social: {
      linkedin: '#',
    },
  },
  {
    id: 3,
    name: '张明月',
    role: '战略展示负责人',
    bio: '负责项目路演与投资人沟通，擅长将技术成果转化为清晰的商业价值表达，具备优秀的逻辑梳理与现场应变能力，是团队对外沟通的关键桥梁。',
    skills: ['PPT制作', '项目路演', '商业演讲', '战略规划'],
    avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=professional%20portrait%20of%20a%20female%20business%20presenter%20in%20space%20theme&size=512x512',
    color: '#f59e0b', // 演讲=橙
    orbitRadius: 1.1,
    timeline: [
      { year: '2025', event: '入学成为大一新生' },
      { year: '2025', event: '加入知澜团队' },
      { year: '2025', event: '开始学习演讲与展示' },
    ],
    social: {
      linkedin: '#',
    },
  },
]

// 项目数据
export const projects = [
  {
    id: 1,
    title: '智慧果园管理系统',
    subtitle: '三创赛参赛项目 | 前端已完成，后端API开发中',
    description: '基于AI技术的智慧果园全流程管理平台，为果农提供从种植到销售的一站式数字化解决方案。',
    tech: ['React', 'TypeScript', 'Node.js', '农业数字化'],
    status: '开发中',
    statusColor: 'yellow',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=smart%20orchard%20management%20system%20dashboard%20interface&size=1024x768',
    details: {
      intro: '基于AI技术的智慧果园全流程管理平台，为果农提供从种植到销售的一站式数字化解决方案。集成气象监测、病虫害预警、农事任务管理等功能，助力传统农业转型升级。',
      features: [
        ' 果园数据可视化：实时展示果树数量、种植面积、作业统计',
        ' 智能天气预警：未来3天天气预测，辅助农事决策',
        ' 病虫害预警：AI识别病虫害高发期，提前预警',
        ' 农事任务管理：打卡、待办、提醒一体化',
        ' AI果树医生：智能诊断果树健康问题'
      ]
    }
  },
  {
    id: 2,
    title: '团队官网',
    subtitle: '已上线',
    description: '知澜团队的官方网站，展示团队成员、项目和技术栈。',
    tech: ['Next.js', 'Tailwind', 'Three.js'],
    status: '已上线',
    statusColor: 'green',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=team%20website%20with%20space%20theme%20design&size=1024x768',
    details: {
      intro: '知澜团队的官方网站，展示团队成员、项目和技术栈，采用现代化的太空主题设计。',
      features: [
        '🚀 团队成员展示：3D星球环绕效果',
        '🌠 项目展示：卡片式布局',
        '💻 技术栈：技能雷达图',
        '📞 联系我们：表单提交'
      ]
    }
  },
  {
    id: 3,
    title: '敬请期待',
    subtitle: '更多项目开发中...',
    description: '我们正在开发更多创新项目，敬请期待！',
    tech: [],
    status: '即将上线',
    statusColor: 'blue',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=coming%20soon%20project%20placeholder%20with%20space%20theme&size=1024x768',
    details: {
      intro: '我们正在开发更多创新项目，敬请期待！',
      features: []
    }
  },
]

// 技术栈数据
export const skills = [
  { name: 'React框架', level: 75 },
  { name: 'Next.js框架', level: 70 },
  { name: 'TypeScript语言', level: 65 },
  { name: 'Tailwind CSS样式', level: 75 },
  { name: 'Three.js 3D', level: 60 },
  { name: 'Node.js后端', level: 65 },
  { name: 'MongoDB数据库', level: 55 },
  { name: 'AWS云服务', level: 50 },
  { name: 'Docker容器', level: 55 },
  { name: 'Figma设计', level: 70 },
]
