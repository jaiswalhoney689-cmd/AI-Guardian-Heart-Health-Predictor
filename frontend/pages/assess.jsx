import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import HealthForm from '../components/HealthForm'
import RiskResult from '../components/RiskResult'
import MedicalDisclaimer from '../components/MedicalDisclaimer'
import Footer from '../components/Footer'

export default function AssessPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    calculateStreak()
  }, [])

  const calculateStreak = () => {
    if (typeof window === 'undefined') return
    
    const visits = JSON.parse(localStorage.getItem('cardiocheck_visits') || '[]')
    const today = new Date().toISOString().split('T')[0]

    if (!visits.includes(today)) {
      visits.push(today)
      localStorage.setItem('cardiocheck_visits', JSON.stringify(visits))
    }

    let currentStreak = 0
    const today_date = new Date(today)
    for (let i = 0; i < visits.length; i++) {
      const visitDate = new Date(visits[visits.length - 1 - i])
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

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('formData', JSON.stringify(formData))
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'
      const response = await fetch(`${apiUrl}/assess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Heart Health Assessment — CardioCheck AI</title>
        <meta name="description" content="Get your personalized cardiovascular risk assessment in 2 minutes. Free, private, no account needed." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Medical Disclaimer Banner */}
        <MedicalDisclaimer variant="banner" />
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                ❤️
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">CardioCheck AI</h1>
                <p className="text-xs text-slate-500">Heart Health Assessment</p>
              </div>
            </div>
            {streak > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full font-semibold text-sm flex items-center gap-1">
                <span>🔥</span>
                <span>{streak}d</span>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {result ? (
            <div className="animate-fade-in">
              <RiskResult result={result} onReset={handleReset} />
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Page Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                  Check Your Heart Health
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Get a personalized heart disease risk assessment in just a few minutes. 
                  Simple, quick, and powered by AI.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { icon: '✓', label: 'Privacy First' },
                  { icon: '⚡', label: '2 Minutes' },
                  { icon: '🔒', label: 'No Account' },
                  { icon: '✨', label: 'AI Powered' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-lg border-2 border-slate-200 p-3 sm:p-4 text-center hover:border-blue-400 transition"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6 sm:p-8 mb-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                    <p className="text-sm font-semibold text-red-900">⚠️ Error</p>
                    <p className="text-sm text-red-800 mt-1">{error}</p>
                  </div>
                )}

                <HealthForm onSubmit={handleSubmit} loading={loading} />
              </div>

              {/* Footer Info */}
              <div className="text-center text-sm text-slate-600 max-w-2xl mx-auto">
                <p className="mb-2">
                  💡 <strong>Educational Tool Only</strong> — This AI assessment is for informational 
                  purposes and not a substitute for professional medical advice.
                </p>
                <p>
                  Your data is analyzed but not stored. See our <a href="/privacy" className="text-blue-600 hover:underline">privacy policy</a> for details.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile CTA safety margin */}
      {!result && <div className="h-20 sm:h-0"></div>}
    </div>

    {/* FOOTER */}
    <Footer />
    </>
  )
}
