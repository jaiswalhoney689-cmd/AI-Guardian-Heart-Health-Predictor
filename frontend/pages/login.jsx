import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import SocialButton from '../components/SocialButton'
import Toast from '../components/Toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' })
  const [remember, setRemember] = useState(true)
  const [mode, setMode] = useState('login')

  function notify(type, message) {
    setToast({ show: true, type, message })
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)

    if (mode === 'login') {
      if (!email.includes('@') || password.length < 6) {
        notify('error', 'Please enter a valid email and password (min 6 chars)')
        return
      }
      notify('success', 'Welcome back to CardioCheck AI')
      return
    }

    // signup
    if (!name || !email.includes('@') || password.length < 6) {
      notify('error', 'Please provide name, a valid email and a password (min 6 chars)')
      return
    }
    notify('success', 'Account created — welcome to CardioCheck AI')
    // optionally switch to login
    setMode('login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-8 rounded-2xl glass-card shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-semibold text-slate-50">Welcome back</h1>
                <p className="text-sm text-slate-300">Sign in to continue to CardioCheck AI</p>
              </div>
            </div>
            <div className="text-xs text-slate-400">AI · Healthcare</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <TextInput label="Full name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            )}

            <TextInput label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hospital.com" />

            <TextInput label="Password" type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" forceBlackText>
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-3 btn-text-black">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.99 9.99 0 011.175-4.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </TextInput>

            <div className="flex items-center justify-between text-sm">
              {mode === 'login' ? (
                <label className="inline-flex items-center gap-2 text-slate-300">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-cyan-400" />
                  Remember me
                </label>
              ) : (
                <div />
              )}
              <a className="text-xs text-cyan-300 hover:underline">Forgot Password?</a>
            </div>

            <div>
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-semibold hover:scale-[1.02] transition-transform flex items-center justify-center gap-3">
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                ) : null}
                <span>{loading ? 'Signing in...' : 'Sign in'}</span>
              </button>
            </div>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/6" />
            <div className="text-xs text-slate-400">or continue with</div>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SocialButton provider="google" onClick={() => notify('info', 'Google sign-in not wired (demo)')}>Google</SocialButton>
            <SocialButton provider="apple" onClick={() => notify('info', 'Apple sign-in not wired (demo)')}>Apple</SocialButton>
          </div>

          <div className="mt-6 text-center text-sm text-slate-300">
            {mode === 'login' ? (
              <>Don&apos;t have an account? <button onClick={() => setMode('signup')} className="text-cyan-300 font-medium hover:underline">Sign up</button></>
            ) : (
              <>Already have an account? <button onClick={() => setMode('login')} className="text-cyan-300 font-medium hover:underline">Sign in</button></>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.5 }} className="hidden lg:flex items-center justify-center">
            <div className="max-w-md">
              <img src="/illustration.svg" alt="AI healthcare illustration" className="rounded-2xl shadow-xl" />
              <div className="mt-6 text-slate-300">
                <h3 className="text-xl font-semibold text-white">AI-powered heart insights</h3>
                <p className="text-sm opacity-80">Quick, easy-to-understand heart risk checks for people — CardioCheck AI (demo).</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      <Toast show={toast.show} type={toast.type} message={toast.message} />
    </div>
  )
}
