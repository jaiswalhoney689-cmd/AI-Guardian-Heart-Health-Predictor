import { useState } from 'react'

export default function RiskResult({ result, onReset }) {
  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-green-100 border-green-400 text-green-900'
      case 'moderate':
        return 'bg-yellow-100 border-yellow-400 text-yellow-900'
      case 'high':
        return 'bg-red-100 border-red-400 text-red-900'
      default:
        return 'bg-gray-100 border-gray-400 text-gray-900'
    }
  }

  const getRiskBadgeColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-green-500 text-white'
      case 'moderate':
        return 'bg-yellow-500 text-white'
      case 'high':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getIcon = (level) => {
    switch (level.toLowerCase()) {
      case 'low':
        return '✓'
      case 'moderate':
        return '⚠'
      case 'high':
        return '!'
      default:
        return '?'
    }
  }

  return (
    <div className="space-y-6">
      {/* Risk Score Card */}
      <div className={`p-8 border-2 rounded-lg ${getRiskColor(result.risk_level)}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Heart Disease Risk</h2>
          <span className={`${getRiskBadgeColor(result.risk_level)} w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold`}>
            {getIcon(result.risk_level)}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-bold">{result.risk_score_pct}%</span>
          <span className="text-xl font-semibold capitalize">{result.risk_level} Risk</span>
        </div>

        {/* Summary */}
        <p className="text-base leading-relaxed">{result.summary}</p>
      </div>

      {/* Risk Level Guide */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Understanding Your Risk:</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold">Low (0-10%):</span>
            <span className="text-gray-700">Your current risk is low. Continue healthy lifestyle habits.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 font-bold">Moderate (10-30%):</span>
            <span className="text-gray-700">Plan to discuss risk factors with your healthcare provider.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-600 font-bold">High (30%+):</span>
            <span className="text-gray-700">Schedule a consultation with a cardiologist soon.</span>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Personalized Recommendations:</h3>
        <div className="grid gap-3">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <p className="text-gray-800">{rec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-sm text-red-800">
        <p className="font-semibold mb-1">Important Disclaimer:</p>
        <p>
          This tool provides educational information only and is not a medical diagnosis. 
          Please consult with a healthcare professional for personalized medical advice.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Check Again
        </button>
      </div>
    </div>
  )
}
