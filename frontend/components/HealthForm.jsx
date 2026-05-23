import { useState } from 'react'

export default function HealthForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    systolicBP: '',
    diastolicBP: '',
    cholesterol: '',
    smoking: 'no',
    exerciseFrequency: 'moderate',
    familyHistory: 'no',
    sleepHours: 7,
    stressLevel: 3,
  })
  const [currentStep, setCurrentStep] = useState(1)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : isNaN(value) ? value : parseFloat(value),
    }))
  }

  const handleSliderChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }))
  }

  const handleStressSelect = (level) => {
    setFormData((prev) => ({
      ...prev,
      stressLevel: level,
    }))
  }

  const getSleepBadge = () => {
    const sleep = formData.sleepHours
    if (sleep >= 7 && sleep <= 9) {
      return { text: 'Optimal range', color: 'bg-green-100 text-green-800', icon: '✓' }
    } else if ((sleep >= 6 && sleep < 7) || (sleep > 9 && sleep <= 10)) {
      return { text: 'Slightly outside optimal', color: 'bg-amber-100 text-amber-800', icon: '⚠' }
    } else {
      return { text: 'High risk range', color: 'bg-red-100 text-red-800', icon: '!' }
    }
  }

  const stressOptions = [
    { level: 1, emoji: '😌', label: 'Very low' },
    { level: 2, emoji: '🙂', label: 'Low' },
    { level: 3, emoji: '😐', label: 'Moderate' },
    { level: 4, emoji: '😟', label: 'High' },
    { level: 5, emoji: '😰', label: 'Very high' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation for final step
    if (currentStep === 3) {
      if (!formData.age || !formData.weight || !formData.height || !formData.systolicBP || !formData.diastolicBP || !formData.cholesterol) {
        alert('Please fill in all required fields')
        return
      }
      onSubmit(formData)
      return
    }

    // Move to next step
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const sleepBadge = getSleepBadge()

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-slate-300">Step {currentStep} of 3</span>
          <span className="text-sm font-medium text-slate-400">{Math.round((currentStep / 3) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Step 1: Basic Information</h3>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Age (years) *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="120"
              required
              className="input-dark w-full"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-dark w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Weight and Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Weight (kg) *
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="1"
                max="300"
                step="0.1"
                required
                className="input-dark w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Height (cm) *
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="50"
                max="250"
                step="0.1"
                required
                className="input-dark w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Medical Info */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Step 2: Medical Information</h3>

          {/* Blood Pressure */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Systolic BP (mmHg) *
              </label>
              <input
                type="number"
                name="systolicBP"
                value={formData.systolicBP}
                onChange={handleChange}
                min="60"
                max="250"
                required
                className="input-dark w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Diastolic BP (mmHg) *
              </label>
              <input
                type="number"
                name="diastolicBP"
                value={formData.diastolicBP}
                onChange={handleChange}
                min="40"
                max="150"
                required
                className="input-dark w-full"
              />
            </div>
          </div>

          {/* Cholesterol */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Total Cholesterol (mg/dL) *
            </label>
            <input
              type="number"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              min="100"
              max="400"
              required
              className="input-dark w-full"
            />
          </div>

          {/* Smoking Status */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Do you smoke?
            </label>
            <select
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
              className="input-dark w-full"
            >
              <option value="never">Never</option>
              <option value="yes">Yes</option>
              <option value="former">Former Smoker</option>
            </select>
          </div>

          {/* Exercise Frequency */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Exercise Frequency
            </label>
            <select
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleChange}
              className="input-dark w-full"
            >
              <option value="sedentary">Sedentary (&lt;1 day/week)</option>
              <option value="light">Light (1-2 days/week)</option>
              <option value="moderate">Moderate (3-4 days/week)</option>
              <option value="vigorous">Vigorous (5+ days/week)</option>
            </select>
          </div>

          {/* Family History */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Family History of Heart Disease?
            </label>
            <select
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleChange}
              className="input-dark w-full"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Lifestyle (Sleep & Stress) */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Step 3: Sleep & Stress</h3>

          {/* Sleep Hours */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Average sleep per night
            </label>
            <p className="text-xs text-slate-400 mb-3">Less than 6 or more than 9 hours may increase cardiac risk</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-cyan-400">{formData.sleepHours.toFixed(1)}h</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${sleepBadge.color}`}>
                  {sleepBadge.icon} {sleepBadge.text}
                </span>
              </div>
              <input
                type="range"
                name="sleepHours"
                value={formData.sleepHours}
                onChange={handleSliderChange}
                min="3"
                max="12"
                step="0.5"
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>3h</span>
                <span>12h</span>
              </div>
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Daily stress level
            </label>
            <p className="text-xs text-slate-400 mb-4">Chronic stress raises cortisol and blood pressure</p>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {stressOptions.map((option) => (
                <button
                  key={option.level}
                  type="button"
                  onClick={() => handleStressSelect(option.level)}
                  className={`p-3 rounded-lg transition-all ${
                    formData.stressLevel === option.level
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-600 ring-2 ring-purple-300'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.emoji}</div>
                  <div className={`text-xs font-medium ${formData.stressLevel === option.level ? 'text-white' : 'text-slate-300'}`}>
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Stress Warning */}
            {formData.stressLevel >= 4 && (
              <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
                <p className="text-sm text-red-200">
                  💡 <strong>High stress is a known cardiovascular risk factor.</strong> Consider mindfulness or relaxation techniques.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-full transition-colors"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-600 text-black font-semibold py-3 px-4 rounded-full transition-colors cyan-glow"
        >
          {loading ? 'Analyzing...' : currentStep === 3 ? 'Check My Risk' : 'Next'}
        </button>
      </div>

      {currentStep === 3 && (
        <p className="text-xs text-slate-400 text-center">
          * Required fields. Your data is not stored.
        </p>
      )}
    </form>
  )
}
