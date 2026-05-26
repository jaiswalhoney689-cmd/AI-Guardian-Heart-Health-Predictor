import { useState, useEffect } from 'react'

export default function RiskResult({ result, onReset }) {
  const [badges, setBadges] = useState([])
  const [streak, setStreak] = useState(0)
  const [formData, setFormData] = useState({
    sleepHours: 7,
    stressLevel: 3,
    smoking: 'no',
    exerciseFrequency: 'moderate',
  })
  const [animatedScore, setAnimatedScore] = useState(0)

  // Calculate Heart Health Score
  const heartHealthScore = 100 - (result.risk_score_pct || 50)

  // Animate score on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedScore((prev) => {
        const target = heartHealthScore
        const diff = target - prev
        return prev + diff * 0.1
      })
    }, 30)
    return () => clearInterval(timer)
  }, [heartHealthScore])

  // Initialize badges and streak on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('formData') : null
    if (stored) {
      try {
        setFormData(JSON.parse(stored))
      } catch (e) {
        console.log('Could not parse stored form data')
      }
    }

    const earnedBadges = calculateBadges(formData)
    setBadges(earnedBadges)
    updateStreak()
  }, [])

  const calculateBadges = (data) => {
    const earned = []

    if (data.sleepHours >= 7 && data.sleepHours <= 9) {
      earned.push({
        id: 'sleep-hero',
        name: 'Sleep Champion',
        emoji: '🌙',
      })
    }

    if (data.stressLevel <= 2) {
      earned.push({
        id: 'calm-mind',
        name: 'Calm Mind',
        emoji: '🧘',
      })
    }

    if (data.smoking === 'never' || data.smoking === 'no' || data.smoking === 'former') {
      earned.push({
        id: 'non-smoker',
        name: 'Non-Smoker',
        emoji: '🚭',
      })
    }

    if (data.exerciseFrequency === 'vigorous' || data.exerciseFrequency === 'moderate') {
      earned.push({
        id: 'active-life',
        name: 'Active Lifestyle',
        emoji: '🏃',
      })
    }

    if (earned.length >= 4) {
      earned.push({
        id: 'heart-guard',
        name: 'Heart Guardian',
        emoji: '❤️‍🩹',
      })
    }

    return earned
  }

  const updateStreak = () => {
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

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low':
        return {
          bg: 'bg-green-50',
          border: 'border-green-300',
          text: 'text-green-900',
          badge: 'bg-green-500',
          gradient: 'from-green-400 to-emerald-600',
        }
      case 'moderate':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-300',
          text: 'text-amber-900',
          badge: 'bg-amber-500',
          gradient: 'from-amber-400 to-orange-600',
        }
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          text: 'text-red-900',
          badge: 'bg-red-500',
          gradient: 'from-red-400 to-rose-600',
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          text: 'text-gray-900',
          badge: 'bg-gray-500',
          gradient: 'from-gray-400 to-slate-600',
        }
    }
  }

  const getRiskMessage = (level) => {
    switch (level.toLowerCase()) {
      case 'low':
        return {
          title: '✓ Low Risk',
          message: 'Great news! Your current heart disease risk is low. Continue maintaining healthy habits.',
          action: 'Keep up the good work!',
        }
      case 'moderate':
        return {
          title: '⚠ Moderate Risk',
          message: 'Your risk is moderate. Consider making lifestyle improvements and consulting your healthcare provider.',
          action: 'Start with one recommendation below.',
        }
      case 'high':
        return {
          title: '! High Risk',
          message: "Your risk is elevated. It's important to schedule a consultation with a cardiologist soon.",
          action: 'Seek professional medical advice.',
        }
      default:
        return {
          title: '? Your Risk',
          message: 'We've analyzed your health data. Review the details below.',
          action: 'Learn more below.',
        }
    }
  }

  const handleShare = async () => {
    if (typeof window === 'undefined') return

    const shareText = `I just completed a heart health risk assessment on CardioCheck AI! 🏥 My health score: ${Math.round(heartHealthScore)}/100`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CardioCheck AI - Heart Health Assessment',
          text: shareText,
          url: 'https://cardiocheckai.vercel.app',
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Score copied to clipboard!')
    }
  }

  const handleDownload = () => {
    const reportContent = `
HEART HEALTH ASSESSMENT REPORT
Generated: ${new Date().toLocaleDateString()}

OVERALL RISK SCORE: ${Math.round(heartHealthScore)}/100

Risk Level: ${result.risk_level}
Risk Percentage: ${result.risk_score_pct}%

SUMMARY:
${result.summary}

RECOMMENDATIONS:
${result.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

DISCLAIMER:
This assessment is educational only and not a medical diagnosis.
Please consult with a healthcare professional for personalized medical advice.

For more information, visit: https://cardiocheckai.vercel.app
    `
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent))
    element.setAttribute('download', `CardioCheck_Report_${new Date().toISOString().split('T')[0]}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const colors = getRiskColor(result.risk_level)
  const message = getRiskMessage(result.risk_level)

  return (
    <div className="space-y-6 pb-8">
      {/* Streak Badge */}
      {streak > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg text-center font-semibold animate-pulse">
          🔥 Day {streak} Streak! You're on fire!
        </div>
      )}

      {/* Healthcare Trust Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <p className="text-sm text-blue-900 font-medium">
          <strong>🏥 Important:</strong> This AI assessment is for educational purposes only and not a medical diagnosis.
          Always consult a healthcare professional.
        </p>
      </div>

      {/* Animated Heart Health Score */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-md">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-slate-600 font-medium mb-4">Your Heart Health Score</p>

          {/* Animated Circular Progress */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-4">
            <svg className="absolute w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              
              {/* Animated score circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeDasharray={`${(animatedScore / 100) * 565} 565`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.gradient.split(' ')[1]} />
                  <stop offset="100%" stopColor={colors.gradient.split(' ')[3]} />
                </linearGradient>
              </defs>
            </svg>

            {/* Center content */}
            <div className="text-center z-10">
              <div className={`text-5xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                {Math.round(animatedScore)}
              </div>
              <p className="text-sm text-slate-600 mt-2">out of 100</p>
            </div>
          </div>

          {/* Score interpretation */}
          <div className="text-center">
            <p className={`text-sm font-medium ${colors.text}`}>
              {animatedScore >= 70
                ? '✓ Excellent heart health'
                : animatedScore >= 40
                ? '⚠ Fair heart health'
                : '! Poor heart health'}
            </p>
          </div>
        </div>
      </div>

      {/* Risk Assessment Card */}
      <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-6 shadow-md`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${colors.text} mb-1`}>{message.title}</h2>
            <p className={`text-sm ${colors.text} opacity-80`}>{message.message}</p>
          </div>
          <div className={`${colors.badge} text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0`}>
            {result.risk_score_pct}%
          </div>
        </div>

        <div className={`p-3 rounded-lg ${colors.bg} border-2 ${colors.border} mt-4`}>
          <p className={`text-sm font-medium ${colors.text}`}>💡 {message.action}</p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Key Health Insights</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">❤️</span>
            <div>
              <p className="font-semibold text-slate-900">Risk Level</p>
              <p className="text-sm text-slate-600 capitalize">{result.risk_level} risk for heart disease</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">📊</span>
            <div>
              <p className="font-semibold text-slate-900">Risk Percentage</p>
              <p className="text-sm text-slate-600">{result.risk_score_pct}% estimated risk</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">📋</span>
            <div>
              <p className="font-semibold text-slate-900">Summary</p>
              <p className="text-sm text-slate-600">{result.summary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factor Breakdown */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Risk Factors</h3>
        <div className="space-y-4">
          {[
            { name: 'Sleep Quality', value: result.sleep_risk || 40, color: 'from-blue-400 to-blue-600' },
            { name: 'Stress Level', value: result.stress_risk || 40, color: 'from-orange-400 to-orange-600' },
            { name: 'Overall Risk', value: result.risk_score_pct || 50, color: 'from-red-400 to-red-600' },
          ].map((factor, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-800">{factor.name}</span>
                <span className="text-sm font-bold text-slate-700">{factor.value}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${factor.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${factor.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      {badges.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6 shadow-sm">
          <h3 className="font-bold text-amber-900 mb-4 text-lg">🏆 Your Achievements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center p-4 bg-white rounded-lg border-2 border-amber-200 hover:shadow-md transition text-center"
              >
                <div className="text-3xl mb-1">{badge.emoji}</div>
                <p className="text-xs font-semibold text-amber-900">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personalized Recommendations */}
      <div className="bg-white rounded-xl border-2 border-blue-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">💪 Personalized Recommendations</h3>
        <div className="space-y-3">
          {result.recommendations?.map((rec, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </span>
              <p className="text-sm text-slate-800">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Warnings if applicable */}
      {formData.sleepHours < 6 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-sm text-red-900">
            <strong>💤 Sleep Alert:</strong> Poor sleep increases blood pressure and inflammation. Aim for 7–9 hours nightly.
          </p>
        </div>
      )}

      {formData.stressLevel >= 4 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-sm text-red-900">
            <strong>😰 Stress Alert:</strong> High cortisol from stress strains your heart. Practice meditation or exercise.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <button
          onClick={handleShare}
          className="px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
          📤 Share
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-3 rounded-lg bg-slate-500 text-white font-semibold hover:bg-slate-600 transition"
        >
          📥 Download
        </button>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-slate-100 border border-slate-300 p-4 rounded-lg text-center">
        <p className="text-xs text-slate-700">
          <strong>Disclaimer:</strong> This tool provides educational information only. 
          It is not a substitute for professional medical advice. 
          Please consult with a healthcare provider for diagnosis and treatment.
        </p>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full px-4 py-3 rounded-lg border-2 border-slate-400 text-slate-800 font-semibold hover:bg-slate-100 transition"
      >
        ↻ New Assessment
      </button>
    </div>
  )
}
