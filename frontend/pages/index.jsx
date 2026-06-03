import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import TrustIndicators from '../components/TrustIndicators'
import AITransparency from '../components/AITransparency'
import MedicalDisclaimer from '../components/MedicalDisclaimer'
import Footer from '../components/Footer'
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
        <title>CardioCheck AI — Cardiovascular Awareness Assessment</title>
        <meta name="description" content="An educational AI system for cardiovascular health awareness. Get a personalized risk assessment in 2 minutes. Free, private, no account needed." />
        <meta property="og:title" content="CardioCheck AI — Cardiovascular Awareness System" />
        <meta property="og:description" content="Educational AI-powered cardiovascular health assessment. Quick, private, and science-based." />
        <meta property="og:url" content="https://cardiocheckai-iota.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CardioCheck AI — Cardiovascular Awareness" />
        <meta name="twitter:description" content="Educational cardiovascular risk assessment powered by AI. Get insights in 2 minutes." />
      </Head>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "CardioCheck AI",
          "description": "Educational cardiovascular health awareness system powered by AI",
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
        {/* Medical Disclaimer Banner */}
        <MedicalDisclaimer variant="banner" />

        {/* Header */}
        <header className="sticky top-12 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                ❤️
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-lg">CardioCheck AI</h1>
                <p className="text-xs text-slate-500">Educational Health Assessment</p>
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
                Start Assessment
              </Link>
            </nav>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="text-sm font-bold uppercase text-red-600 mb-2 tracking-widest">Educational Health Technology</div>
                <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight mb-6">
                  Know Your
                  <span className="block bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    Cardiovascular Health
                  </span>
                </h2>
                <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                  CardioCheck AI is an <strong>educational and awareness system</strong> that helps you understand your cardiovascular health risk factors using advanced AI analysis.
                </p>
              </div>

              {/* Purpose Statement */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-slate-700 font-semibold">
                  💡 <strong>Purpose:</strong> Raise awareness about cardiovascular health and encourage professional consultation.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🔒', text: 'Privacy First' },
                  { icon: '⚡', text: '2 Minutes' },
                  { icon: '✓', text: 'No Account' },
                  { icon: '🧠', text: 'AI-Powered' },
                  { icon: '📊', text: 'Transparent' },
                  { icon: '🏥', text: 'Evidence-Based' },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-200 transition"
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/assess"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-red-500 to-blue-600 text-white font-bold hover:shadow-lg transition text-center text-lg"
                >
                  Start Assessment →
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 rounded-lg border-2 border-slate-300 text-slate-900 font-bold hover:bg-slate-50 transition text-center"
                >
                  How It Works
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
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative text-center space-y-6">
                  <div className="text-9xl animate-heartbeat">❤️</div>
                  <div className="space-y-2">
                    <p className="text-slate-900 font-bold text-xl">Cardiovascular Health Assessment</p>
                    <p className="text-slate-600">Evidence-based AI analysis</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-gradient-to-r from-red-50 to-blue-50 py-12 sm:py-16 border-y-2 border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {[
                { number: '8+', label: 'Health Metrics' },
                { number: '<2', label: 'Minutes' },
                { number: '0', label: 'Data Stored' },
                { number: '100%', label: 'Free' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text">
                    {stat.number}
                  </div>
                  <p className="text-sm text-slate-600 font-medium mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REAL-WORLD USE CASES */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24" id="use-cases">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Real-World Use Cases</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              How CardioCheck AI helps people make informed health decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '👨‍💼',
                title: 'Young Professionals',
                description: 'Sarah (32) wants to check her heart health before starting a fitness program. She gets a personalized risk assessment to guide her doctor consultation.',
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Family Health Planning',
                description: 'John (45) with family history of heart disease uses CardioCheck to understand his risk and make lifestyle changes recommended by his cardiologist.',
              },
              {
                icon: '🏫',
                title: 'Educational Use',
                description: 'Medical students and health educators use CardioCheck to understand cardiovascular risk factors and how AI can assist in health assessments.',
              },
            ].map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h4>
                <p className="text-slate-600 leading-relaxed">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TRUST & CREDIBILITY SECTION */}
        <section className="bg-slate-50 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Built for Trust & Safety</h3>
              <p className="text-lg text-slate-600">Healthcare-grade privacy and transparency standards</p>
            </div>
            <TrustIndicators />
          </div>
        </section>

        {/* AI TRANSPARENCY SECTION */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <AITransparency />
        </section>

        {/* EXPANDED MEDICAL DISCLAIMER */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <MedicalDisclaimer variant="expanded" />
        </section>

        {/* SCIENTIFIC CREDIBILITY */}
        <section className="bg-gradient-to-r from-blue-50 to-slate-50 py-16 sm:py-24 border-t-2 border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Scientific Foundation</h3>
              <p className="text-lg text-slate-600">CardioCheck AI is built on established cardiovascular research</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: 'Evidence-Based',
                  description: 'Grounded in Framingham Heart Study, ACC/AHA guidelines, and peer-reviewed cardiovascular research',
                  icon: '📚',
                },
                {
                  title: 'Multi-Factor Analysis',
                  description: 'Considers age, lifestyle, medical history, family history, and health metrics for comprehensive risk assessment',
                  icon: '🔬',
                },
                {
                  title: 'Transparent Methodology',
                  description: 'All factors and weightings are explained. Users can understand exactly why their risk level was assigned',
                  icon: '🔍',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 border-2 border-slate-200 text-center"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-8 text-center">
              <p className="text-lg text-blue-900 font-semibold">
                ⚠️ <strong>Important Limitation:</strong> CardioCheck AI is an educational tool. 
                A single AI assessment cannot replace comprehensive medical evaluation by a healthcare professional. 
                Professional diagnosis requires clinical examination and additional testing.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Learn Your Cardiovascular Health Status?</h3>
            <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
              Take a quick, private assessment and get personalized insights. No account needed.
            </p>
            <Link
              href="/assess"
              className="inline-block px-8 py-4 rounded-lg bg-white text-red-600 font-bold text-lg hover:shadow-lg transition"
            >
              Start Your Assessment Now →
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
    </>
  )
}
