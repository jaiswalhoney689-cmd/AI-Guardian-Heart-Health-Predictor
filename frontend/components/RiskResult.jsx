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

  // Calculate Heart Health Score (inverted from risk)
  const heartHealthScore = 100 - (result.risk_score_pct || 50)

  // Initialize badges and streak on mount
  useEffect(() => {
    // Load form data from sessionStorage if available
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('formData') : null
    if (stored) {
      try {
        setFormData(JSON.parse(stored))
      } catch (e) {
        console.log('Could not parse stored form data')
      }
    }

    // Calculate earned badges
    const earnedBadges = calculateBadges(formData)
    setBadges(earnedBadges)

    // Calculate and update streak
    updateStreak()
  }, [])

  // Save form data to session storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('formData', JSON.stringify(formData))
    }
  }, [formData])

  const calculateBadges = (data) => {
    const earned = []

    // Sleep Hero: 7-9 hours
    if (data.sleepHours >= 7 && data.sleepHours <= 9) {
      earned.push({
        id: 'sleep-hero',
        name: 'Sleep Hero',
        emoji: '🌙',
        condition: 'sleep_hours between 7 and 9',
      })
    }

    // Calm Mind: stress <= 2
    if (data.stressLevel <= 2) {
      earned.push({
        id: 'calm-mind',
        name: 'Calm Mind',
        emoji: '🧘',
        condition: 'stress_level <= 2',
      })
    }

    // Non-Smoker: smoking = never
    if (data.smoking === 'never' || data.smoking === 'no' || data.smoking === 'former') {
      earned.push({
        id: 'non-smoker',
        name: 'Non-Smoker',
        emoji: '🚭',
        condition: 'smoking = never',
      })
    }

    // Active Life: exercise >= 4 days/week
    if (data.exerciseFrequency === 'vigorous') {
      earned.push({
        id: 'active-life',
        name: 'Active Life',
        emoji: '🏃',
        condition: 'exercise_frequency >= 4 days/week',
      })
    }

    // Heart Guard: All 4 badges earned simultaneously
    if (earned.length >= 4) {
      earned.push({
        id: 'heart-guard',
        name: 'Heart Guard',
        emoji: '❤️',
        condition: 'All 4 badges earned simultaneously',
      })
    }

    return earned
  }

  const updateStreak = () => {
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

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-400'
    if (score >= 40) return 'text-amber-400'
    return 'text-red-400'
  }

  const getScoreBgColor = (score) => {
    if (score >= 70) return 'text-green-500'
    if (score >= 40) return 'text-amber-500'
    return 'text-red-500'
  }

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

  const handleShare = async () => {
    if (typeof window === 'undefined') return

    const shareText = `I checked my heart health on CardioCheck AI and scored ${heartHealthScore}/100! Check yours at cardiocheckai-iota.vercel.app`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CardioCheck AI',
          text: shareText,
          url: 'https://cardiocheckai-iota.vercel.app',
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText)
      alert('Score copied to clipboard!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Streak Badge */}
      {streak > 0 && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-lg text-center font-semibold">
          🔥 Day {streak} streak! Keep going!
        </div>
      )}

      {/* Heart Health Score Ring */}
      <div className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="absolute w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="75"
              stroke="rgba(71, 85, 105, 0.3)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="75"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(heartHealthScore / 100) * 471} 471`}
              className={`transition-all duration-1000 ${getScoreBgColor(heartHealthScore)}`}
            />
          </svg>
          <div className="text-center z-10">
            <div className={`text-5xl font-bold ${getScoreColor(heartHealthScore)}`}>
              {heartHealthScore}
            </div>
            <div className="text-sm text-slate-400 mt-1">Your Heart Health Score</div>
          </div>
        </div>
      </div>

      {/* Risk Level Card */}
      <div className={`p-6 border-2 rounded-lg ${getRiskColor(result.risk_level)}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Your Heart Disease Risk</h2>
          <span className={`${getRiskBadgeColor(result.risk_level)} w-14 h-14 flex items-center justify-center rounded-full text-xl font-bold`}>
            {getIcon(result.risk_level)}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-bold">{result.risk_score_pct}%</span>
          <span className="text-lg font-semibold capitalize">{result.risk_level} Risk</span>
        </div>

        <p className="text-base leading-relaxed">{result.summary}</p>
      </div>

      {/* Risk Factor Breakdown */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">Risk Factor Breakdown</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Sleep Quality</span>
              <span className="text-sm font-bold text-gray-900">{result.sleep_risk || 40}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${result.sleep_risk || 40}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Stress Level</span>
              <span className="text-sm font-bold text-gray-900">{result.stress_risk || 40}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${result.stress_risk || 40}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Risk</span>
              <span className="text-sm font-bold text-gray-900">{result.risk_score_pct}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  result.risk_score_pct < 25
                    ? 'bg-green-500'
                    : result.risk_score_pct < 55
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${result.risk_score_pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      {badges.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">🏆 Your Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center p-4 bg-white rounded-lg border-2 border-amber-200 shadow-sm"
              >
                <div className="text-3xl mb-1">{badge.emoji}</div>
                <div className="text-xs font-semibold text-gray-800 text-center">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sleep Warning */}
      {formData.sleepHours < 6 && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <p className="text-sm text-red-900">
            <strong>💤 Sleep Alert:</strong> Poor sleep raises blood pressure and inflammation. Aim for 7–9 hours per night.
          </p>
        </div>
      )}

      {/* Stress Warning */}
      {formData.stressLevel >= 4 && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <p className="text-sm text-red-900">
            <strong>😰 Stress Alert:</strong> High cortisol from chronic stress strains your heart. Practice mindfulness or relaxation techniques.
          </p>
        </div>
      )}

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

      {/* Progress Tip */}
      <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg">
        <p className="text-sm text-cyan-900">
          <strong>💡 Next Step:</strong> {heartHealthScore < 50
            ? 'Focus on improving your sleep to 7–9 hours per night. This could increase your score by up to 12 points.'
            : heartHealthScore < 70
            ? 'Manage stress through regular exercise and relaxation. This could add up to 10 points to your score.'
            : 'You\'re doing great! Maintain your healthy habits to keep your score high.'}
        </p>
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

      {/* Disclaimer */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-sm text-red-800">
        <p className="font-semibold mb-1">Important Disclaimer:</p>
        <p>
          This tool provides educational information only and is not a medical diagnosis. 
          Please consult with a healthcare professional for personalized medical advice.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          onClick={handleShare}
          className="flex-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-600 text-black font-bold py-3 px-4 rounded-lg transition-colors cyan-glow"
        >
          📤 Share My Score
        </button>
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
