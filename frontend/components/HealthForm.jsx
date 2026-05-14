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
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? '' : isNaN(value) ? value : parseFloat(value),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.age || !formData.weight || !formData.height || !formData.systolicBP || !formData.diastolicBP || !formData.cholesterol) {
      alert('Please fill in all required fields')
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <option value="no">No</option>
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-600 text-black font-semibold py-3 px-4 rounded-full transition-colors cyan-glow"
      >
        {loading ? 'Analyzing...' : 'Check My Risk'}
      </button>

      <p className="text-xs text-slate-400 text-center">
        * Required fields. Your data is not stored.
      </p>
    </form>
  )
}
