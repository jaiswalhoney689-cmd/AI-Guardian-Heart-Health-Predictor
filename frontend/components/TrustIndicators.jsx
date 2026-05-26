export default function TrustIndicators() {
  const indicators = [
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data is analyzed but never stored',
    },
    {
      icon: '✓',
      title: 'No Registration',
      description: 'Get results instantly without creating an account',
    },
    {
      icon: '⚡',
      title: '2 Minutes',
      description: 'Quick assessment optimized for smartphones',
    },
    {
      icon: '🏥',
      title: 'AI Reviewed',
      description: 'Insights based on medical research and guidelines',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {indicators.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg border-2 border-slate-200 p-5 sm:p-6 text-center hover:border-blue-400 hover:shadow-lg transition duration-300"
        >
          <div className="text-3xl mb-3">{item.icon}</div>
          <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
          <p className="text-xs sm:text-sm text-slate-600">{item.description}</p>
        </div>
      ))}
    </div>
  )
}
