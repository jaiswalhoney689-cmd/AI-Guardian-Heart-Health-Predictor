import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

export default function Home() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    calculateStreak()
  }, [])

  const calculateStreak = () => {
    if (typeof window === 'undefined') return

    const visits = JSON.parse(localStorage.getItem('cardiocheck_visits') || '[]')
    if (visits.length === 0) return

    const today = new Date().toISOString().split('T')[0]
    let currentStreak = 0
    const today_date = new Date(today)
    
    for (let i = 0; i < visits.length; i++) {
      const expectedDate = new Date(today_date)
      expectedDate.setDate(expectedDate.getDate() - i)
      const expectedStr = expectedDate.toISOString().split('T')[0]
      if (visits[visits.length - 1 - i] === expectedStr) {
        currentStreak++
      } else {
        break
      }
    }

    setStreak(currentStreak)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="py-6 px-8 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <div>
            <div className="font-semibold">CardioCheck AI</div>
            <div className="text-xs text-slate-400">AI · Heart Health</div>
          </div>
        </div>

        {/* Streak in top right */}
        <div className="flex items-center gap-4">
          {streak > 0 && (
            <div className="hidden sm:block bg-gradient-to-r from-red-600 to-red-700 px-3 py-2 rounded-full text-sm font-semibold">
              🔥 {streak} day streak
            </div>
          )}
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-slate-300 hover:text-white transition">Sign in</Link>
            <Link href="/assess" className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg transition">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Early Detection. <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Better Protection.</span>
              </h1>
              <p className="mt-4 text-xl text-slate-300">Because Every Heartbeat Matters.</p>
            </div>

            <p className="text-base text-slate-400 max-w-lg">
              CardioCheck AI is a student-built healthcare AI project focusing on early cardiovascular risk detection using interpretable AI and friendly UX.
            </p>

            {/* Trust Strip */}
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300 flex items-center gap-2">
                🔒 Privacy-first
              </div>
              <div className="px-3 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300 flex items-center gap-2">
                📱 No hardware needed
              </div>
              <div className="px-3 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300 flex items-center gap-2">
                ⚡ 2-min screening
              </div>
              <div className="px-3 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm text-slate-300 flex items-center gap-2">
                🤖 AI-powered
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/assess"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 transition"
              >
                Check Heart Risk
              </Link>
              <Link
                href="/assess"
                className="px-8 py-3 rounded-xl border border-slate-600 text-white font-semibold hover:bg-slate-800 transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center p-8"
          >
            <div className="w-full max-w-md">
              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="hgrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#ff7a7a" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#hgrad)" d="M12 21s-7.5-4.5-9.5-7.5A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 8.5C19.5 16.5 12 21 12 21z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Stats Row */}
      <section className="px-6 py-12 bg-slate-800/50">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-500">2 min</div>
            <div className="text-slate-400 mt-1">Quick screening</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-500">8+</div>
            <div className="text-slate-400 mt-1">Health factors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-500">Free</div>
            <div className="text-slate-400 mt-1">Forever</div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2">Enter Health Data</h3>
              <p className="text-slate-400">Provide simple health metrics including sleep, stress, and medical history.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
            >
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p className="text-slate-400">Our Gemini AI evaluates your data against cardiovascular risk factors.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
            >
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">Get Insights</h3>
              <p className="text-slate-400">Receive personalized recommendations to improve your heart health.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="px-6 py-12 bg-gradient-to-r from-red-900/30 to-red-800/30 border-t border-b border-red-700/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Know Your Heart?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get a personalized cardiovascular risk assessment in just 2 minutes. No medical expertise needed.
          </p>
          <Link
            href="/assess"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-lg hover:shadow-lg hover:shadow-red-500/50 transition"
          >
            Start Assessment Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 border-t border-slate-800">
        <p>© {new Date().getFullYear()} CardioCheck AI — Built by Honey Jaiswal</p>
        <p className="text-xs mt-2">⚠️ This tool is for informational purposes only. Consult healthcare professionals for medical advice.</p>
      </footer>
    </div>
  )
}

