import React, { useState, useEffect } from 'react'
import HealthForm from '../components/HealthForm'
import RiskResult from '../components/RiskResult'

export default function AssessPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    // Calculate streak on component mount
    calculateStreak()
  }, [])

  const calculateStreak = () => {
    if (typeof window === 'undefined') return
    
    const visits = JSON.parse(localStorage.getItem('cardiocheck_visits') || '[]')
    const today = new Date().toISOString().split('T')[0]

    // Add today if not already present
    if (!visits.includes(today)) {
      visits.push(today)
      localStorage.setItem('cardiocheck_visits', JSON.stringify(visits))
    }

    // Calculate streak
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
      // Store form data in sessionStorage for RiskResult component
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
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Streak */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {streak > 0 && (
              <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-semibold text-sm">
                🔥 {streak} day streak!
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-2">
            CardioCheck AI
          </h1>
          <p className="text-lg text-red-700">Know your heart risk in 2 minutes</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {result ? (
            <>
              <RiskResult result={result} onReset={handleReset} />
            </>
          ) : (
            <>
              <p className="text-gray-600 text-center mb-6">
                Enter a few simple health details to get a personalized heart risk estimate — quick and easy for anyone.
              </p>
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              <HealthForm onSubmit={handleSubmit} loading={loading} />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-red-700">
          <p>⚠️ This tool is for informational purposes only and not a substitute for medical advice.</p>
        </div>
      </div>
    </div>
  )
}
