import { useState, useEffect } from 'react'
import ResultOutput from './ResultOutput'

export default function RiskResult({ result, onReset }) {
  const [badges, setBadges] = useState([])
  const [streak, setStreak] = useState(0)
  const [formData, setFormData] = useState({
    sleepHours: 7,
    stressLevel: 3,
    smoking: 'no',
    exerciseFrequency: 'moderate',
  })

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
    <div className="space-y-8">
      {/* Back Button and Streak */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2 transition"
        >
          ← Back to Assessment
        </button>
        {streak > 0 && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-semibold">
            <span>🔥</span>
            <span>{streak}d streak</span>
          </div>
        )}
      </div>

      {/* Main Result Output */}
      <ResultOutput
        riskLevel={result.risk_level}
        riskScore={result.risk_score_pct}
        summary={result.summary}
        factors={result.factors || []}
        recommendations={result.recommendations || []}
        aiReasoning={result.ai_reasoning}
      />

      {/* Achievement Badges */}
      {badges.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 sm:p-8">
          <h4 className="font-bold text-slate-900 text-lg mb-4">🏆 Your Achievements</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="bg-white rounded-lg p-4 text-center border-2 border-purple-200 hover:border-purple-400 transition"
              >
                <div className="text-4xl mb-2">{badge.emoji}</div>
                <p className="font-semibold text-sm text-slate-900">{badge.name}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-4 italic">
            Keep maintaining these healthy habits for ongoing cardiovascular wellness!
          </p>
        </div>
      )}

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onReset}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition text-center"
        >
          Take Assessment Again
        </button>
        <a
          href="/"
          className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition text-center"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
