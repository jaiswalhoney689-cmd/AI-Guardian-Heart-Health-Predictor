import React from 'react'
import Link from 'next/link'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`bg-slate-900 text-slate-300 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">❤️</div>
              <div>
                <h3 className="font-bold text-white text-lg">CardioCheck AI</h3>
                <p className="text-xs text-slate-400">Cardiovascular Awareness</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4">
              An educational AI system for cardiovascular health awareness.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold text-white mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-slate-400 hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#use-cases" className="text-slate-400 hover:text-white transition">
                  Use Cases
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Research documentation coming soon')
                  }}
                >
                  Research
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal & Safety</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-white transition">
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-white transition"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Terms of Service coming soon')
                  }}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Questions?</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">
                For medical concerns, consult your healthcare provider.
              </li>
              <li>
                <a 
                  href="mailto:hello@cardiocheckai.com" 
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400 text-center sm:text-left">
            <p>© {currentYear} CardioCheck AI. Educational tool for awareness purposes only.</p>
            <p className="mt-2">
              ⚠️ <strong>Not a medical device.</strong> Always consult qualified healthcare professionals.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">🔒</span>
              <span className="text-slate-400">Privacy First</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">⚖️</span>
              <span className="text-slate-400">Compliant</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">📊</span>
              <span className="text-slate-400">Transparent</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
