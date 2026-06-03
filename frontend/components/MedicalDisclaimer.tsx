import React from 'react'

interface MedicalDisclaimerProps {
  variant?: 'banner' | 'expanded' | 'minimal'
  className?: string
}

export default function MedicalDisclaimer({ variant = 'banner', className = '' }: MedicalDisclaimerProps) {
  if (variant === 'minimal') {
    return (
      <div className={`bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg ${className}`}>
        <p className="text-xs sm:text-sm text-amber-900 font-semibold">
          ⚠️ This is an educational tool, not medical advice or diagnosis
        </p>
      </div>
    )
  }

  if (variant === 'expanded') {
    return (
      <div className={`bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 sm:p-8 ${className}`}>
        <div className="flex gap-4">
          <div className="flex-shrink-0 text-2xl">⚠️</div>
          <div>
            <h3 className="font-bold text-slate-900 mb-3 text-lg">Important Medical Disclaimer</h3>
            
            <div className="space-y-3 text-sm sm:text-base text-slate-700">
              <p>
                <strong className="text-amber-900">CardioCheck AI</strong> is an <strong>educational and awareness tool only</strong>. 
                It does NOT:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-2 text-slate-700">
                <li>Diagnose any medical condition</li>
                <li>Replace consultation with a healthcare provider</li>
                <li>Provide medical treatment or prescriptions</li>
                <li>Constitute professional medical advice</li>
              </ul>

              <p className="pt-2">
                <strong>If you have cardiovascular concerns:</strong> Please consult a qualified healthcare 
                professional (cardiologist, physician, or nurse practitioner) for proper diagnosis and treatment.
              </p>

              <p className="pt-2 text-amber-900 font-semibold">
                In case of emergency, call emergency services immediately.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-amber-300 text-xs text-slate-600">
              <p>By using this tool, you acknowledge that you have read and understood these disclaimers.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default banner variant
  return (
    <div className={`bg-red-50 border-b-2 border-red-200 sticky top-0 z-30 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <span className="text-lg flex-shrink-0">⚠️</span>
          <p className="text-xs sm:text-sm text-red-900 font-semibold">
            <strong>Educational Use Only:</strong> This tool does NOT diagnose medical conditions. 
            For health concerns, consult a healthcare provider.
          </p>
        </div>
      </div>
    </div>
  )
}
