import { useState } from 'react'

export default function HealthForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    // Step 1: Demographics
    age: '',
    gender: 'male',
    
    // Step 2: Measurements
    weight: '',
    height: '',
    
    // Step 3: Medical
    systolicBP: '',
    diastolicBP: '',
    systolicBPUnknown: false,
    cholesterol: '',
    cholesterolUnknown: false,
    smoking: 'never',
    exerciseFrequency: 'moderate',
    
    // Step 4: Family History
    familyHeartDisease: 'no',
    familyHighBP: 'no',
    familyDiabetes: 'no',
    familyStroke: 'no',
    familyHighCholesterol: 'no',
    
    // Step 5: Medical History
    medicalHistory: {
      diabetes: false,
      hypertension: false,
      asthma: false,
      thyroid: false,
      kidney: false,
      obesity: false,
    },
    otherDisease: '',
    smokingHabit: 'no',
    alcoholUse: 'no',
    
    // Step 6: Lifestyle
    sleepHours: 7,
    stressLevel: 3,
  })
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : isNaN(value) ? value : parseFloat(value),
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    if (name.startsWith('medical-')) {
      const condition = name.replace('medical-', '')
      setFormData((prev) => ({
        ...prev,
        medicalHistory: {
          ...prev.medicalHistory,
          [condition]: checked,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    }
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

  const handleBPToggle = () => {
    setFormData((prev) => ({
      ...prev,
      systolicBPUnknown: !prev.systolicBPUnknown,
      systolicBP: !prev.systolicBPUnknown ? '' : prev.systolicBP,
      diastolicBP: !prev.systolicBPUnknown ? '' : prev.diastolicBP,
    }))
  }

  const handleCholesterolToggle = () => {
    setFormData((prev) => ({
      ...prev,
      cholesterolUnknown: !prev.cholesterolUnknown,
      cholesterol: !prev.cholesterolUnknown ? '' : prev.cholesterol,
    }))
  }

  const getSleepBadge = () => {
    const sleep = formData.sleepHours
    if (sleep >= 7 && sleep <= 9) {
      return { text: 'Optimal', color: 'bg-green-100 text-green-800', icon: '✓' }
    } else if ((sleep >= 6 && sleep < 7) || (sleep > 9 && sleep <= 10)) {
      return { text: 'Fair', color: 'bg-amber-100 text-amber-800', icon: '⚠' }
    } else {
      return { text: 'Poor', color: 'bg-red-100 text-red-800', icon: '!' }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation for final step
    if (currentStep === totalSteps) {
      if (!formData.age || !formData.weight || !formData.height) {
        alert('Please fill in all required demographic information')
        return
      }
      if (!formData.systolicBPUnknown && (!formData.systolicBP || !formData.diastolicBP)) {
        alert('Please enter blood pressure or select "I don\'t know"')
        return
      }
      if (!formData.cholesterolUnknown && !formData.cholesterol) {
        alert('Please enter cholesterol or select "I don\'t know"')
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

  const stressOptions = [
    { level: 1, emoji: '😌', label: 'Very low' },
    { level: 2, emoji: '🙂', label: 'Low' },
    { level: 3, emoji: '😐', label: 'Moderate' },
    { level: 4, emoji: '😟', label: 'High' },
    { level: 5, emoji: '😰', label: 'Very high' },
  ]

  const medicalConditions = [
    { id: 'diabetes', label: 'Diabetes', icon: '🩺' },
    { id: 'hypertension', label: 'Hypertension', icon: '📊' },
    { id: 'asthma', label: 'Asthma', icon: '🫁' },
    { id: 'thyroid', label: 'Thyroid disorder', icon: '⚕️' },
    { id: 'kidney', label: 'Kidney disease', icon: '🔬' },
    { id: 'obesity', label: 'Obesity', icon: '⚖️' },
  ]

  const sleepBadge = getSleepBadge()
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Healthcare Trust Disclaimer - Top */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>🏥 AI Health Tool</strong> — This assessment is educational only, not a medical diagnosis. 
          Always consult a healthcare professional.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-700">Step {currentStep} of {totalSteps}</span>
          <span className="text-xs font-medium text-slate-500">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step 1: Demographics */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Personal Information</h2>
            <p className="text-slate-600">Let's start with the basics</p>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Age (years) *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="120"
              placeholder="e.g., 45"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
            />
            <p className="text-xs text-slate-500 mt-1">Age is an important risk factor for heart disease</p>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['male', 'female'].map((option) => (
                <label key={option} className="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-full px-4 py-3 rounded-lg border-2 text-center font-medium transition ${
                    formData.gender === option
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Measurements */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Body Measurements</h2>
            <p className="text-slate-600">Height and weight help calculate BMI</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="20"
                max="300"
                step="0.1"
                placeholder="e.g., 75"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
              />
              <p className="text-xs text-slate-500 mt-1">Typical: 50-150 kg</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Height (cm) *
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="100"
                max="250"
                step="0.1"
                placeholder="e.g., 175"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
              />
              <p className="text-xs text-slate-500 mt-1">Without shoes</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Medical Information */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Medical Vitals</h2>
            <p className="text-slate-600">Blood pressure and cholesterol levels</p>
          </div>

          {/* Blood Pressure */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-slate-800">
                Blood Pressure (mmHg)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.systolicBPUnknown}
                  onChange={handleBPToggle}
                  className="w-4 h-4 rounded"
                />
                <span>I don't know</span>
              </label>
            </div>

            {!formData.systolicBPUnknown ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    name="systolicBP"
                    value={formData.systolicBP}
                    onChange={handleChange}
                    min="50"
                    max="250"
                    placeholder="Systolic"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
                  />
                  <p className="text-xs text-slate-500 mt-1">Systolic (top)</p>
                </div>
                <div>
                  <input
                    type="number"
                    name="diastolicBP"
                    value={formData.diastolicBP}
                    onChange={handleChange}
                    min="30"
                    max="150"
                    placeholder="Diastolic"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
                  />
                  <p className="text-xs text-slate-500 mt-1">Diastolic (bottom)</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-600 p-4 bg-slate-100 rounded-lg">
                No problem! We'll estimate based on other factors.
              </p>
            )}
          </div>

          {/* Cholesterol */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-slate-800">
                Total Cholesterol (mg/dL)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.cholesterolUnknown}
                  onChange={handleCholesterolToggle}
                  className="w-4 h-4 rounded"
                />
                <span>I don't know</span>
              </label>
            </div>

            {!formData.cholesterolUnknown ? (
              <input
                type="number"
                name="cholesterol"
                value={formData.cholesterol}
                onChange={handleChange}
                min="100"
                max="400"
                placeholder="e.g., 200"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
              />
            ) : (
              <p className="text-sm text-slate-600 p-4 bg-slate-100 rounded-lg">
                Don't worry! This is optional for the assessment.
              </p>
            )}
          </div>

          {/* Smoking Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">
              Smoking Status
            </label>
            <select
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
            >
              <option value="never">Never smoked</option>
              <option value="former">Former smoker</option>
              <option value="yes">Current smoker</option>
            </select>
          </div>

          {/* Exercise Frequency */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">
              Exercise Frequency
            </label>
            <select
              name="exerciseFrequency"
              value={formData.exerciseFrequency}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
            >
              <option value="sedentary">Sedentary (&lt;1 day/week)</option>
              <option value="light">Light (1-2 days/week)</option>
              <option value="moderate">Moderate (3-4 days/week)</option>
              <option value="vigorous">Vigorous (5+ days/week)</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 4: Family History */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Family History</h2>
            <p className="text-slate-600">Do your parents or close relatives have any of these conditions?</p>
          </div>

          {[
            { key: 'familyHeartDisease', label: 'Heart disease or heart attack', icon: '❤️' },
            { key: 'familyHighBP', label: 'High blood pressure', icon: '📊' },
            { key: 'familyDiabetes', label: 'Diabetes', icon: '🩺' },
            { key: 'familyStroke', label: 'Stroke', icon: '🧠' },
            { key: 'familyHighCholesterol', label: 'High cholesterol', icon: '⚕️' },
          ].map((condition) => (
            <div key={condition.key} className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                {condition.icon} {condition.label}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['no', 'yes', 'unsure'].map((option) => (
                  <label key={option} className="relative flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={condition.key}
                      value={option}
                      checked={formData[condition.key] === option}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-full px-3 py-2 rounded-lg border-2 text-center text-sm font-medium transition ${
                      formData[condition.key] === option
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                    }`}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 5: Medical History */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Medical History</h2>
            <p className="text-slate-600">Select any conditions you have been diagnosed with</p>
          </div>

          <div className="space-y-3">
            {medicalConditions.map((condition) => (
              <label key={condition.id} className="flex items-center p-4 rounded-lg border-2 border-slate-300 hover:border-blue-400 cursor-pointer transition bg-white">
                <input
                  type="checkbox"
                  name={`medical-${condition.id}`}
                  checked={formData.medicalHistory[condition.id]}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer"
                />
                <span className="ml-3 font-semibold text-slate-800">{condition.icon} {condition.label}</span>
              </label>
            ))}
          </div>

          {/* Smoking & Alcohol */}
          <div className="space-y-4 pt-4 border-t-2 border-slate-200">
            <label className="block text-sm font-semibold text-slate-800">Current smoking?</label>
            <div className="grid grid-cols-3 gap-3">
              {['no', 'yes', 'former'].map((option) => (
                <label key={option} className="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="smokingHabit"
                    value={option}
                    checked={formData.smokingHabit === option}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-full px-3 py-2 rounded-lg border-2 text-center text-sm font-medium transition ${
                    formData.smokingHabit === option
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </div>
                </label>
              ))}
            </div>

            <label className="block text-sm font-semibold text-slate-800 pt-2">Alcohol use?</label>
            <div className="grid grid-cols-3 gap-3">
              {['no', 'moderate', 'heavy'].map((option) => (
                <label key={option} className="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="alcoholUse"
                    value={option}
                    checked={formData.alcoholUse === option}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-full px-3 py-2 rounded-lg border-2 text-center text-sm font-medium transition ${
                    formData.alcoholUse === option
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Other Disease */}
          <div className="pt-4 border-t-2 border-slate-200">
            <label className="block text-sm font-semibold text-slate-800 mb-2">Other conditions?</label>
            <input
              type="text"
              name="otherDisease"
              value={formData.otherDisease}
              onChange={handleChange}
              placeholder="e.g., Heart arrhythmia, Sleep apnea..."
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-blue-500 focus:outline-none transition text-slate-900"
            />
          </div>
        </div>
      )}

      {/* Step 6: Lifestyle */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Sleep & Stress</h2>
            <p className="text-slate-600">These affect your heart health too!</p>
          </div>

          {/* Sleep Hours */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">
              Average sleep per night
            </label>
            <p className="text-xs text-slate-600 mb-4">Optimal: 7-9 hours. Less than 6 or more than 10 increases cardiac risk.</p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-600">{formData.sleepHours.toFixed(1)}h</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${sleepBadge.color}`}>
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
                className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>3h</span>
                <span>6h</span>
                <span>9h</span>
                <span>12h</span>
              </div>
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">
              Daily stress level
            </label>
            <p className="text-xs text-slate-600 mb-4">Chronic stress raises cortisol, blood pressure, and inflammation.</p>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {stressOptions.map((option) => (
                <button
                  key={option.level}
                  type="button"
                  onClick={() => handleStressSelect(option.level)}
                  className={`p-3 rounded-lg border-2 transition ${
                    formData.stressLevel === option.level
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300'
                      : 'border-slate-300 bg-white hover:border-blue-400'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.emoji}</div>
                  <div className={`text-xs font-semibold ${formData.stressLevel === option.level ? 'text-blue-900' : 'text-slate-700'}`}>
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Stress Warning */}
            {formData.stressLevel >= 4 && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-sm text-red-900">
                  <strong>💡 Tip:</strong> High stress is a known cardiovascular risk factor. Consider meditation, exercise, or relaxation techniques.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons - Sticky on mobile */}
      <div className="flex gap-3 pt-8 sticky bottom-0 bg-white pb-4 -mx-6 px-6 border-t border-slate-200">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-400 text-slate-800 font-semibold hover:bg-slate-100 transition"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? '⏳ Analyzing...' : currentStep === totalSteps ? '✓ Check My Risk' : 'Next'}
        </button>
      </div>

      {currentStep === totalSteps && (
        <p className="text-xs text-slate-500 text-center pb-4">
          Your data is analyzed but not stored. View our privacy policy for details.
        </p>
      )}
    </form>
  )
}
