import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import TrustIndicators from '../components/TrustIndicators'
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
    <>
      <Head>
        <title>CardioCheck AI — Free Heart Health Assessment</title>
        <meta name="description" content="Get a personalized cardiovascular risk assessment in 2 minutes. Free, private, no account needed. Powered by AI." />
        <meta property="og:title" content="CardioCheck AI — Free Heart Health Assessment" />
        <meta property="og:description" content="Get a personalized cardiovascular risk assessment in 2 minutes. Free, private, no account needed. Powered by AI." />
        <meta property="og:url" content="https://cardiocheckai-iota.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CardioCheck AI — Free Heart Health Assessment" />
        <meta name="twitter:description" content="Personalized cardiovascular risk assessment in 2 minutes. Free, AI-powered, no account needed." />
      </Head>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "CardioCheck AI",
          "description": "Free AI-powered cardiovascular risk assessment tool",
          "url": "https://cardiocheckai-iota.vercel.app",
          "applicationCategory": "HealthApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>
    <div className="min-h-screen bg-white">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                ❤️
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-lg">CardioCheck AI</h1>
                <p className="text-xs text-slate-500">Heart Health Assessment</p>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              {streak > 0 && (
                <div className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span>🔥</span>
                  <span>{streak}d</span>
                </div>
              )}
              <Link
                href="/assess"
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold hover:shadow-lg transition"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4">
                  Know Your
                  <span className="block bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    Heart Risk
                  </span>
                </h2>
                <p className="text-xl text-slate-600 max-w-lg">
                  Get a personalized cardiovascular risk assessment in just 2 minutes. Simple, accurate, and completely private.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: '🔒', text: 'Privacy First' },
                  { icon: '⚡', text: '2 Minutes' },
                  { icon: '✓', text: 'No Account' },
                  { icon: '🤖', text: 'AI Powered' },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-700 font-medium text-sm"
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/assess"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-red-500 to-blue-600 text-white font-bold hover:shadow-lg transition text-center"
                >
                  Check My Heart Risk →
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 rounded-lg border-2 border-slate-300 text-slate-900 font-bold hover:bg-slate-50 transition text-center"
                >
                  Learn How It Works
                </a>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-sm">
                {/* Heart Icon Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative text-center">
                  <div className="text-9xl animate-heartbeat">❤️</div>
                  <p className="text-slate-600 font-semibold mt-4">Preventive Health Screening</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-red-50 to-blue-50 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { number: '8', unit: '', label: 'health metrics analyzed' },
                { number: 'Under 2', unit: 'min', label: 'to complete' },
                { number: '0', unit: '', label: 'personal data stored' },
                { number: '100%', unit: 'free', label: 'no account needed' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text">
                    {stat.number} {stat.unit && <span className="text-lg">{stat.unit}</span>}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Why Trust CardioCheck AI?</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built with healthcare professionals in mind. Designed for patients. Powered by AI.
            </p>
          </div>
          <TrustIndicators />
        </section>

        {/* How It Works */}
        <section className="bg-slate-50 py-16 sm:py-24" id="how-it-works">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">How It Works</h3>
              <p className="text-lg text-slate-600">Simple, transparent, and quick</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  icon: '📋',
                  title: 'Fill Out Your Health Info',
                  description: 'Answer easy questions about your age, weight, blood pressure, and lifestyle habits including sleep and stress levels.',
                },
                {
                  step: '2',
                  icon: '🤖',
                  title: 'AI Analysis',
                  description: 'Our advanced AI model evaluates your data against established cardiovascular risk factors and guidelines.',
                },
                {
                  step: '3',
                  icon: '💡',
                  title: 'Get Personalized Results',
                  description: 'Receive your risk score, health insights, and actionable recommendations tailored to your profile.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-blue-400 transition"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-blue-600 text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Healthcare Disclaimer */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
            <p className="text-slate-800 font-medium">
              <strong>🏥 Important:</strong> This AI assessment is for educational purposes only and not a substitute for professional medical advice. 
              Always consult with a healthcare provider for diagnosis and treatment recommendations.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Check Your Heart Health?</h3>
            <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
              Take control of your cardiovascular health today. Get your personalized risk assessment in 2 minutes.
            </p>
            <Link
              href="/assess"
              className="inline-block px-8 py-4 rounded-lg bg-white text-red-600 font-bold hover:shadow-lg transition"
            >
              Start Assessment Now →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm">
            <p>© 2026 CardioCheck AI. For educational purposes. <Link href="/privacy" className="text-slate-300 hover:text-white">Privacy</Link> • <Link href="/disclaimer" className="text-slate-300 hover:text-white">Disclaimer</Link></p>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}
