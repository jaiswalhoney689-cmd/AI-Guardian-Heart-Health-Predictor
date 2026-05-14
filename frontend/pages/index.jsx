import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <div>
            <div className="text-white font-semibold">CardioCheck AI</div>
            <div className="text-xs text-slate-400">AI · Heart Health</div>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-slate-200 hover:text-white">Sign in</Link>
          <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-semibold">Get started</Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="p-8 relative bg-white rounded-2xl shadow-xl z-10">
            <div className="heartbeat-bg" aria-hidden />
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">Early Detection. Better Protection.</h1>
              <p className="mt-4 text-black/80 text-lg">Because Every Heartbeat Matters.</p>

              <p className="mt-6 text-sm text-black/70 max-w-lg">CardioCheck AI is a student-built healthcare AI project focusing on early cardiovascular risk detection using interpretable AI and friendly UX.</p>

              <div className="mt-8 flex gap-4">
                <Link href="/signup" className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-black font-semibold">Get Started</Link>
                <Link href="/assess" className="px-6 py-3 rounded-xl border border-black/10 text-black">Check Heart Risk</Link>
              </div>

              <div className="mt-8 text-sm text-black/60 max-w-lg">
                <ul className="list-disc pl-5 space-y-2">
                  <li>AI-assisted early risk screening</li>
                  <li>Simple inputs, clear recommendations</li>
                  <li>Privacy-first, research-focused</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="relative">
                <svg className="heart-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="hgrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#ff7a7a" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#hgrad)" d="M12 21s-7.5-4.5-9.5-7.5A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 8.5C19.5 16.5 12 21 12 21z" />
                </svg>
                <img src="/illustration.svg" alt="AI illustration" className="rounded-2xl shadow-2xl mt-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-6 text-center text-slate-500">
        © {new Date().getFullYear()} CardioCheck AI — Built by Honey Jaiswal
      </footer>
    </div>
  )
}

