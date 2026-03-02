import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Team Resume | 宇宙探索者',
  description: '一个具有宇宙星空感和高深科技感的团队简历展示网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className={`${inter.className} bg-space-black text-star-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
}