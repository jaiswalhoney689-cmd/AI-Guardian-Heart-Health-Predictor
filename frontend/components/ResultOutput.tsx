import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface RiskFactorDetail {
  factor: string
  impact: string
  level: 'low' | 'moderate' | 'high'
}

interface ResultOutputProps {
  riskLevel: string
  riskScore: number
  summary: string
  factors: RiskFactorDetail[]
  recommendations: string[]
  aiReasoning?: string
  className?: string
}

export default function ResultOutput({
  riskLevel,
  riskScore,
  summary,
  factors,
  recommendations,
  aiReasoning,
  className = '',
}: ResultOutputProps) {
  const [expandedFactors, setExpandedFactors] = useState(false)
  const [expandedReasoning, setExpandedReasoning] = useState(false)

  const getRiskColor = (level: string) => {
    if (level.toLowerCase() === 'low') return { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-300', badge: 'bg-green-100 text-green-800' }
    if (level.toLowerCase() === 'high') return { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-300', badge: 'bg-red-100 text-red-800' }
    return { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300', badge: 'bg-amber-100 text-amber-800' }
  }

  const getRiskIcon = (level: string) => {
    if (level.toLowerCase() === 'low') return '✓'
    if (level.toLowerCase() === 'high') return '⚠️'
    return '→'
  }

  const colors = getRiskColor(riskLevel)

  const getFactorColor = (level: string) => {
    if (level === 'low') return 'bg-green-100 text-green-800'
    if (level === 'high') return 'bg-red-100 text-red-800'
    return 'bg-amber-100 text-amber-800'
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* MEDICAL DISCLAIMER NOTICE */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4"
      >
        <p className="text-sm text-amber-900 font-semibold flex items-start gap-2">
          <span className="flex-shrink-0 text-lg">⚠️</span>
          <span>
            <strong>Important:</strong> This assessment is for educational awareness only and does NOT constitute medical diagnosis or advice. 
            Please consult a healthcare provider for proper evaluation.
          </span>
        </p>
      </motion.div>

      {/* MAIN RISK ASSESSMENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 sm:p-8`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-5xl">{getRiskIcon(riskLevel)}</div>
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Risk Level</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors.badge}`}>
                {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
              </span>
            </div>

            {/* Risk Score Visualization */}
            <div className="my-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Risk Score</span>
                <span className="text-2xl font-bold text-slate-900">{riskScore}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${riskScore}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    riskLevel.toLowerCase() === 'low'
                      ? 'bg-green-500'
                      : riskLevel.toLowerCase() === 'high'
                      ? 'bg-red-500'
                      : 'bg-amber-500'
                  }`}
                />
              </div>
            </div>

            {/* Summary */}
            <p className={`${colors.text} text-base sm:text-lg font-medium mt-4`}>{summary}</p>

            <p className="text-sm text-slate-600 mt-4 italic">
              This assessment is based on the health information you provided and validated medical guidelines.
            </p>
          </div>
        </div>
      </motion.div>

      {/* RISK FACTORS BREAKDOWN */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={() => setExpandedFactors(!expandedFactors)}
          className="w-full bg-white border-2 border-slate-200 rounded-xl p-6 text-left hover:border-slate-300 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-slate-900 text-lg">📊 Contributing Risk Factors</h4>
            <p className="text-sm text-slate-600 mt-1">Detailed breakdown of factors affecting your assessment</p>
          </div>
          <div className="text-2xl text-slate-400 group-hover:text-slate-600 transition">
            {expandedFactors ? '−' : '+'}
          </div>
        </button>

        {expandedFactors && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-3"
          >
            {factors && factors.length > 0 ? (
              factors.map((factor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border-2 border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getFactorColor(factor.level)} flex-shrink-0`}>
                      {factor.level.toUpperCase()}
                    </span>
                    <div className="flex-grow">
                      <h5 className="font-semibold text-slate-900">{factor.factor}</h5>
                      <p className="text-sm text-slate-600 mt-1">{factor.impact}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-slate-600 text-sm">No additional factor details available.</p>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* AI REASONING PANEL */}
      {aiReasoning && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setExpandedReasoning(!expandedReasoning)}
            className="w-full bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-left hover:border-blue-300 transition flex items-center justify-between group"
          >
            <div>
              <h4 className="font-bold text-slate-900 text-lg">🧠 AI Reasoning & Explanation</h4>
              <p className="text-sm text-slate-600 mt-1">Why this assessment result was generated</p>
            </div>
            <div className="text-2xl text-blue-400 group-hover:text-blue-500 transition">
              {expandedReasoning ? '−' : '+'}
            </div>
          </button>

          {expandedReasoning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-6"
            >
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{aiReasoning}</p>
              <p className="text-xs text-slate-600 mt-4 italic">
                This explanation is generated by our AI analysis system based on your input and medical guidelines.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* RECOMMENDATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 sm:p-8"
      >
        <h4 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
          <span>💡</span> Suggestions for Cardiovascular Awareness
        </h4>

        <div className="space-y-3">
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className="bg-white rounded-lg p-4 border-l-4 border-green-500 flex gap-3"
              >
                <span className="flex-shrink-0 text-xl">→</span>
                <p className="text-slate-700">{rec}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-slate-600 text-sm">No recommendations available.</p>
          )}
        </div>

        <p className="text-xs text-slate-600 mt-6 pt-4 border-t border-green-200">
          💡 <strong>Note:</strong> These are awareness suggestions only, not medical recommendations. 
          Always consult a healthcare provider before making any health decisions.
        </p>
      </motion.div>

      {/* NEXT STEPS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900 text-white rounded-xl p-6 sm:p-8"
      >
        <h4 className="font-bold text-lg mb-4">🎯 Next Steps</h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="flex-shrink-0 bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</span>
            <div>
              <p className="font-semibold">Consider Your Results</p>
              <p className="text-sm text-slate-300">Reflect on the risk factors identified in your assessment</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</span>
            <div>
              <p className="font-semibold">Consult a Healthcare Provider</p>
              <p className="text-sm text-slate-300">Schedule an appointment with a cardiologist or physician for professional evaluation</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</span>
            <div>
              <p className="font-semibold">Take Action</p>
              <p className="text-sm text-slate-300">Implement lifestyle changes and follow professional medical guidance</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* EMERGENCY WARNING */}
      <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
        <p className="text-sm text-red-900 font-semibold flex items-start gap-2">
          <span className="flex-shrink-0">🚨</span>
          <span>
            <strong>Medical Emergency?</strong> If you experience chest pain, shortness of breath, or other emergency symptoms, 
            call emergency services immediately. Do not rely on this assessment.
          </span>
        </p>
      </div>
    </div>
  )
}
