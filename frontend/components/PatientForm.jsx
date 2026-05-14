import React, { useState } from 'react'

export default function PatientForm({ onAnalyze }) {
  const [form, setForm] = useState({
    fullName: '', age: '', gender: '', height: '', weight: '', bp: '', chol: '', hr: '', oxy: '', sugar: '', smoke: '', chestPain: '', family: '', exercise: '', notes: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onAnalyze) onAnalyze(form)
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card-dark p-6 space-y-4 text-white">
      <div>
        <h2 className="text-2xl font-bold">Patient Health Information</h2>
        <p className="text-sm text-slate-300">Secure AI-powered cardiovascular assessment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="input-dark w-full" />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} className="input-dark w-full" />
        <select name="gender" value={form.gender} onChange={handleChange} className="input-dark w-full">
          <option value="">Gender</option>
          <option>Female</option>
          <option>Male</option>
          <option>Other</option>
        </select>
        <input name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} className="input-dark w-full" />
        <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} className="input-dark w-full" />
        <input name="bp" placeholder="Blood Pressure (e.g., 120/80)" value={form.bp} onChange={handleChange} className="input-dark w-full" />
        <input name="chol" placeholder="Cholesterol (mg/dL)" value={form.chol} onChange={handleChange} className="input-dark w-full" />
        <input name="hr" placeholder="Heart Rate (bpm)" value={form.hr} onChange={handleChange} className="input-dark w-full" />
        <input name="oxy" placeholder="Oxygen Level (%)" value={form.oxy} onChange={handleChange} className="input-dark w-full" />
        <input name="sugar" placeholder="Blood Sugar (mg/dL)" value={form.sugar} onChange={handleChange} className="input-dark w-full" />
        <select name="smoke" value={form.smoke} onChange={handleChange} className="input-dark w-full">
          <option value="">Smoking Status</option>
          <option>Never</option>
          <option>Former</option>
          <option>Current</option>
        </select>
        <select name="chestPain" value={form.chestPain} onChange={handleChange} className="input-dark w-full">
          <option value="">Chest Pain Type</option>
          <option>Typical</option>
          <option>Atypical</option>
          <option>Non-anginal</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select name="family" value={form.family} onChange={handleChange} className="input-dark w-full">
          <option value="">Family History</option>
          <option>None</option>
          <option>Yes</option>
        </select>
        <select name="exercise" value={form.exercise} onChange={handleChange} className="input-dark w-full">
          <option value="">Exercise Frequency</option>
          <option>Never</option>
          <option>Sometimes</option>
          <option>Regular</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-slate-300">ECG Upload</label>
        <input type="file" name="ecg" className="input-dark w-full mt-2" />
      </div>

      <div>
        <label className="text-sm text-slate-300">Medical Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} className="input-dark w-full mt-2" placeholder="Any additional notes..."></textarea>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="px-5 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-600 text-black font-semibold cyan-glow">Analyze Heart Risk</button>
        <button type="button" className="px-4 py-3 rounded-md border border-slate-600 text-white">Save Information</button>
      </div>
    </form>
  )
}
