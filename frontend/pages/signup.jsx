import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'
import TextInput from '../components/TextInput'
import SocialButton from '../components/SocialButton'
import Toast from '../components/Toast'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' })

  function notify(type, message) {
    setToast({ show: true, type, message })
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000)
  }

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    if (!name || !email.includes('@') || password.length < 6) {
      notify('error', 'Please provide a valid name, email and password (min 6 chars)')
      return
    }
    notify('success', 'Account created — welcome to CardioCheck AI')
  }

  // Demo signup: only email + password
  async function handleDemoSignup(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    if (!email.includes('@') || password.length < 6) {
      notify('error', 'Please provide a valid email and a password (min 6 chars)')
      return
    }
    // create a lightweight demo account (client-side demo)
    notify('success', 'Demo account created — you can now sign in')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-8 rounded-2xl glass-card shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-semibold text-slate-50">Create your account</h1>
                <p className="text-sm text-slate-300">Join CardioCheck AI — student-built tools to help people know their heart</p>
              </div>
            </div>
            <div className="text-xs text-slate-400">Secure · Professional</div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <TextInput label="Full name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            <TextInput label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hospital.com" />
            <TextInput label="Password" type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" forceBlackText>
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

            <div>
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-black font-semibold hover:scale-[1.02] transition-transform flex items-center justify-center gap-3">
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                ) : null}
                <span>{loading ? 'Creating account...' : 'Create account'}</span>
              </button>
            </div>
            <div>
              <button type="button" onClick={handleDemoSignup} className="w-full mt-3 py-3 rounded-xl bg-white/6 text-slate-100 border border-white/6 hover:bg-white/8 transition">Create demo account (email + password)</button>
            </div>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/6" />
            <div className="text-xs text-slate-400">or continue with</div>
            <div className="flex-1 h-px bg-white/6" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SocialButton provider="google" onClick={() => notify('info', 'Google sign-up not wired (demo)')}>Google</SocialButton>
            <SocialButton provider="apple" onClick={() => notify('info', 'Apple sign-up not wired (demo)')}>Apple</SocialButton>
          </div>

          <div className="mt-6 text-center text-sm text-slate-300">
            Already have an account? <Link href="/login" className="text-cyan-300 font-medium hover:underline">Sign in</Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="hidden lg:flex items-center justify-center">
          <div className="max-w-md">
            <img src="/illustration.svg" alt="AI healthcare illustration" className="rounded-2xl shadow-xl" />
            <div className="mt-6 text-slate-300">
              <h3 className="text-xl font-semibold text-white">People-first workflows</h3>
              <p className="text-sm opacity-80">Create an account to try quick heart checks and simple, understandable recommendations.</p>
            </div>
          </div>
        </motion.div>

      </div>

      <Toast show={toast.show} type={toast.type} message={toast.message} />
    </div>
  )
}
