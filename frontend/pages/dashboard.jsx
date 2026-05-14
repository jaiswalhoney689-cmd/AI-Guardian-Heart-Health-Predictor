import React from 'react'
import HeartScene from '../components/HeartScene'
import PatientForm from '../components/PatientForm'
import RiskPreviewCard from '../components/RiskPreviewCard'

export default function Dashboard() {
  const handleAnalyze = (data) => {
    console.log('Analyze', data)
    // placeholder: call backend /assess
  }

  return (
    <div className="min-h-screen dashboard-bg text-white">
      <div className="ecg-lines" />
      <div className="neural-particles" />

      {/* Top navbar */}
      <nav className="w-full py-4 px-6 flex items-center justify-between bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="text-xl font-bold">CardioCheck AI</div>
          <div className="text-xs text-slate-400">AI · Heart Health</div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a className="opacity-90">Dashboard</a>
          <a className="opacity-80">Reports</a>
          <a className="opacity-80">Profile</a>
          <button className="px-3 py-2 rounded-md border border-slate-700">Sign Out</button>
        </div>
      </nav>

      {/* Main split */}
      <main className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-7 bg-transparent relative flex flex-col rounded-xl overflow-visible">
          <HeartScene />
        </section>

        <aside className="md:col-span-5 space-y-6">
          <div className="sticky top-24">
            <PatientForm onAnalyze={handleAnalyze} />
            <div className="mt-4">
              <RiskPreviewCard score={18} />
            </div>
          </div>

          {/* Analytics cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="analytics-card text-white">
              <div className="text-xs text-slate-300">Blood Pressure</div>
              <div className="mt-2 text-lg font-semibold">120/80</div>
            </div>
            <div className="analytics-card text-white">
              <div className="text-xs text-slate-300">BMI</div>
              <div className="mt-2 text-lg font-semibold">24.3</div>
            </div>
            <div className="analytics-card text-white">
              <div className="text-xs text-slate-300">Pulse</div>
              <div className="mt-2 text-lg font-semibold">72 bpm</div>
            </div>
            <div className="analytics-card text-white">
              <div className="text-xs text-slate-300">Cholesterol</div>
              <div className="mt-2 text-lg font-semibold">180 mg/dL</div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}
