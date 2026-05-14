import React from 'react'

export default function HeartScene() {
  return (
    <div className="relative flex-1 flex items-center justify-center p-8">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-6 blur-3xl opacity-30" />

        <div className="relative z-10 flex items-center justify-center">
          {/* Pulsing heart SVG */}
          <div className="relative">
            <svg className="heart-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#ff4d6d" />
                  <stop offset="100%" stopColor="#ff2d55" />
                </linearGradient>
              </defs>
              <path fill="url(#g1)" d="M32 57s-3.6-2.8-8.8-7.1C13.6 42.1 4 34.9 4 24.8 4 15.7 11.2 9 19.7 9c4.8 0 8.6 2.6 10.3 5.5C31.7 11.6 35.6 9 40.3 9 48.8 9 56 15.7 56 24.8c0 10.1-9.6 17.3-19.2 25.1C35.6 54.2 32 57 32 57z"/>
            </svg>

            <div className="pulse-ring" style={{ width: 220, height: 220, left: -78, top: -78 }} />
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="absolute -top-6 left-6 w-44 glass-card-dark p-3 text-white text-sm">
          <div className="text-xs text-slate-300">Recent Check</div>
          <div className="mt-2 font-semibold text-lg">Risk: <span className="text-cyan-300">Low</span></div>
        </div>

        <div className="absolute -bottom-6 right-6 w-48 glass-card-dark p-3 text-white text-sm">
          <div className="text-xs text-slate-300">Avg Heart Rate</div>
          <div className="mt-2 font-semibold text-lg">72 bpm</div>
        </div>
      </div>
    </div>
  )
}
