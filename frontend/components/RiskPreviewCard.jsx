import React from 'react'

export default function RiskPreviewCard({ score = 14 }) {
  const level = score < 20 ? 'Low' : score < 50 ? 'Moderate' : 'High'
  const color = score < 20 ? 'text-green-300' : score < 50 ? 'text-amber-300' : 'text-red-300'

  return (
    <div className="glass-card-dark p-4 w-56 text-white relative">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-300">Risk Score</div>
          <div className={`text-3xl font-extrabold ${color}`}>{score}%</div>
          <div className="text-sm opacity-80 mt-1">{level} Risk</div>
        </div>

        <div className="w-20 h-20 relative flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-16 h-16">
            <path className="stroke-current text-slate-800" d="M18 2a16 16 0 1 0 0 32a16 16 0 0 0 0-32z" fill="none" strokeWidth="2" opacity="0.18" />
            <circle cx="18" cy="18" r="10" fill="none" stroke="#00e5ff" strokeWidth="3" strokeDasharray={`${(score/100)*63} 63`} strokeLinecap="round" />
          </svg>
          <div className="pulse-ring" style={{ width: 70, height: 70, left: -13, top: -13 }} />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs text-slate-300">ECG Preview</div>
        <svg className="ecg-mini mt-2" viewBox="0 0 100 36" preserveAspectRatio="none">
          <polyline fill="none" stroke="#00e5ff" strokeWidth="2" points="0,20 20,20 28,12 34,28 44,10 52,20 64,20 72,6 80,26 100,20">
          </polyline>
        </svg>
      </div>
    </div>
  )
}
