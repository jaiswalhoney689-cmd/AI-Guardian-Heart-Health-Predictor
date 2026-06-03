import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface TransparencyProps {
  className?: string
}

export default function AITransparency({ className = '' }: TransparencyProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  const steps = [
    {
      id: 1,
      icon: '📝',
      title: 'Input Collection',
      description: 'You provide lifestyle, symptoms, and basic health indicators',
      details: [
        'Demographics (age, gender)',
        'Measurements (height, weight)',
        'Health metrics (blood pressure, cholesterol)',
        'Family and medical history',
        'Lifestyle factors (sleep, stress, exercise)',
      ],
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-300',
    },
    {
      id: 2,
      icon: '⚙️',
      title: 'AI Analysis',
      description: 'Rule-based and AI interpretation layer processes data',
      details: [
        'Validated against cardiovascular risk guidelines',
        'Analyzed using medical research parameters',
        'Cross-referenced with health factor relationships',
        'Weighted scoring of multiple risk factors',
      ],
      color: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-300',
    },
    {
      id: 3,
      icon: '💡',
      title: 'Risk Assessment',
      description: 'System generates awareness explanation and guidance',
      details: [
        'Risk level categorization (Low/Moderate/High)',
        'Plain-language explanation of contributing factors',
        'Awareness-focused suggestions (NOT medical advice)',
        'Contextual recommendations for lifestyle consideration',
      ],
      color: 'from-green-50 to-green-100',
      borderColor: 'border-green-300',
    },
    {
      id: 4,
      icon: '📊',
      title: 'Results Delivery',
      description: 'Transparent, structured output with clear disclaimers',
      details: [
        'Visual risk indicators and percentages',
        'Detailed factor breakdown',
        'Next steps for professional consultation',
        'Privacy assurance (no data stored)',
      ],
      color: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-300',
    },
  ]

  return (
    <div className={`py-8 sm:py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            🧠 How CardioCheck AI Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transparent, explainable AI for cardiovascular awareness. Learn how your assessment is processed.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative"
            >
              {/* Connector line (except last) */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-slate-300 to-transparent hidden sm:block"></div>
              )}

              <div className={`bg-gradient-to-br ${step.color} border-2 ${step.borderColor} rounded-xl p-6 sm:p-8 transition-all hover:shadow-lg`}>
                {/* Step header */}
                <button
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                  className="w-full text-left flex items-start gap-4"
                >
                  <div className="flex-shrink-0 text-4xl pt-1">{step.icon}</div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Step {step.id}</div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{step.title}</h3>
                        <p className="text-slate-600 mt-1">{step.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-slate-400 text-2xl">
                        {expandedStep === step.id ? '−' : '+'}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded details */}
                {expandedStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t-2 border-slate-300/50"
                  >
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700">
                          <span className="text-slate-400 mt-1">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Principles */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>✓</span> What We Use
            </h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• Evidence-based health guidelines</li>
              <li>• Medical research parameters</li>
              <li>• Validated risk factors</li>
              <li>• Your health data input</li>
            </ul>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>✗</span> What We Don't Do
            </h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• Diagnose medical conditions</li>
              <li>• Provide medical treatment</li>
              <li>• Store your personal data</li>
              <li>• Replace healthcare providers</li>
            </ul>
          </div>
        </div>

        {/* Data Privacy */}
        <div className="mt-8 bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 rounded-xl p-6 sm:p-8">
          <h4 className="font-bold text-slate-900 mb-3 text-lg">🔒 Your Privacy is Protected</h4>
          <p className="text-slate-700 mb-4">
            CardioCheck AI is designed with privacy-first principles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-slate-900">No Storage</strong>
              <p className="text-slate-600 mt-1">Your health data is analyzed but never stored</p>
            </div>
            <div>
              <strong className="text-slate-900">No Tracking</strong>
              <p className="text-slate-600 mt-1">We don't identify or profile individual users</p>
            </div>
            <div>
              <strong className="text-slate-900">No Sharing</strong>
              <p className="text-slate-600 mt-1">Your data is never sold or shared with third parties</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
