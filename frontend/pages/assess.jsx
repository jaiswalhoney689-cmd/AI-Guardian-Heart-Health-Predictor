import React, { useState } from 'react'
import HealthForm from '../components/HealthForm'
import RiskResult from '../components/RiskResult'

export default function AssessPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)
    try {
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
        {/* Header */}
        <div className="text-center mb-8">
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
