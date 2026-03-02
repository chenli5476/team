/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#0a0a0f',
        'deep-void': '#050508',
        'cosmic-navy': '#0f172a',
        'nebula-purple': '#6366f1',
        'stellar-blue': '#3b82f6',
        'aurora-cyan': '#06b6d4',
        'quantum-pink': '#ec4899',
        'star-white': '#f8fafc',
        'moon-gray': '#94a3b8',
        'asteroid-gray': '#475569',
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-space': 'linear-gradient(180deg, #0a0a0f 0%, #1e1b4b 100%)',
        'gradient-nebula': 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        'gradient-text': 'linear-gradient(135deg, #f8fafc 0%, #6366f1 50%, #06b6d4 100%)',
      },
    },
  },
  plugins: [],
}