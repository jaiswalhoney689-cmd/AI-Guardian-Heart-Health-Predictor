import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function ResultsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [result, setResult] = useState<any>(null);
  const [loadingResult, setLoadingResult] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/login?redirect=/results');
      return;
    }

    // Try to load result from sessionStorage first (just-completed assessment)
    const sessionResult = sessionStorage.getItem('assessmentResult');
    if (sessionResult) {
      setResult(JSON.parse(sessionResult));
      setLoadingResult(false);
      return;
    }

    // TODO: Load from Firestore user results
    setLoadingResult(false);
  }, [user, authLoading, router]);

  if (authLoading || loadingResult) {
    return (
      <>
        <Head>
          <title>Loading Results — CardioCheck AI</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">CardioCheck AI</h1>
            <p className="text-slate-600">Loading your results...</p>
          </div>
        </div>
      </>
    );
  }

  if (!result) {
    return (
      <>
        <Head>
          <title>No Results — CardioCheck AI</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">No Assessment Results</h1>
              <p className="text-slate-600 mb-8">Complete a heart health assessment to see your results.</p>
              <Link href="/assess" className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition">
                Start Assessment
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const riskScore = result.riskScore || 0;
  const riskLevel = result.riskLevel || 'moderate';
  const getRiskColor = (level: string) => {
    if (level === 'low') return 'text-green-600';
    if (level === 'high') return 'text-red-600';
    return 'text-amber-600';
  };

  const getRiskBgColor = (level: string) => {
    if (level === 'low') return 'bg-green-50 border-green-200';
    if (level === 'high') return 'bg-red-50 border-red-200';
    return 'bg-amber-50 border-amber-200';
  };

  const getRiskMessage = (level: string) => {
    if (level === 'low') return 'Your cardiovascular risk appears to be low.';
    if (level === 'high') return 'Your cardiovascular risk is elevated. Please consult a healthcare provider.';
    return 'Your cardiovascular risk is moderate. Consider lifestyle improvements.';
  };

  return (
    <>
      <Head>
        <title>Your Results — CardioCheck AI</title>
        <meta name="description" content="Your personalized cardiovascular risk assessment results" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
              ❤️ CardioCheck AI
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/assess" className="text-slate-600 hover:text-slate-900">New Assessment</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {/* Risk Score Display */}
          <div className={`rounded-2xl border-2 p-8 sm:p-12 mb-12 ${getRiskBgColor(riskLevel)}`}>
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Your Results</h1>
              <p className="text-slate-600 text-lg">Assessment completed on {new Date().toLocaleDateString()}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              {/* Gauge Visual */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  {/* Gauge background */}
                  <svg className="w-full h-full" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Low risk arc (green) */}
                    <path
                      d="M 100 100 m -80 0 a 80 80 0 0 1 53.3 13.3"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Moderate risk arc (amber) */}
                    <path
                      d="M 153.3 113.3 a 80 80 0 0 1 53.3 13.3"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* High risk arc (red) */}
                    <path
                      d="M 206.6 126.6 a 80 80 0 0 1 -53.3 186.6"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Score needle */}
                    <line
                      x1="100"
                      y1="100"
                      x2={100 + 70 * Math.cos((riskScore / 100) * Math.PI - Math.PI / 2)}
                      y2={100 + 70 * Math.sin((riskScore / 100) * Math.PI - Math.PI / 2)}
                      stroke="#1f2937"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="100" r="6" fill="#1f2937" />
                  </svg>

                  {/* Score display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`text-5xl font-bold ${getRiskColor(riskLevel)}`}>
                      {riskScore}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">Risk Score</div>
                  </div>
                </div>
              </div>

              {/* Risk Summary */}
              <div className="flex-1">
                <h2 className={`text-3xl font-bold ${getRiskColor(riskLevel)} mb-4 capitalize`}>
                  {riskLevel} Risk
                </h2>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  {getRiskMessage(riskLevel)}
                </p>
                {riskLevel === 'high' && (
                  <div className="p-4 bg-red-100 border border-red-300 rounded-lg mb-6">
                    <p className="text-red-800 font-semibold mb-2">⚠️ Recommended Action</p>
                    <p className="text-red-700 text-sm">Schedule a consultation with a cardiologist or your healthcare provider soon to discuss your results.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Risk Factors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Risk Factors</h2>
            <div className="grid gap-4">
              {[
                { name: 'Age', value: result.age, positive: result.age < 50, description: 'Younger age is protective' },
                { name: 'Blood Pressure', value: result.bloodPressure, positive: !result.bloodPressure?.includes('high'), description: 'Normal BP reduces risk' },
                { name: 'BMI', value: result.bmi?.toFixed(1), positive: (result.bmi || 0) < 25, description: 'Healthy weight is key' },
              ].map((factor) => (
                <div key={factor.name} className="p-4 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{factor.name}</h3>
                    <p className="text-sm text-slate-600">{factor.description}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${factor.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {factor.positive ? '✓' : '⚠'} {factor.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Personalized Recommendations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Personalized Recommendations</h2>
            <div className="grid gap-4">
              {(result.recommendations || [
                'Maintain a regular exercise routine of at least 150 minutes per week',
                'Reduce sodium intake to less than 2,300mg per day',
                'Maintain a healthy weight through balanced diet and exercise',
                'Monitor your blood pressure regularly and keep records',
                'Consider stress reduction techniques like meditation or yoga',
              ]).slice(0, 5).map((rec: string, index: number) => (
                <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-3">
                    <div className="text-2xl">💡</div>
                    <p className="text-slate-700">{rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Next Steps</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="#"
                className="p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition text-center"
              >
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold text-slate-900 mb-2">Download PDF Report</h3>
                <p className="text-sm text-slate-600">Save your assessment results as a PDF</p>
              </a>
              <Link
                href="/assess"
                className="p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition text-center"
              >
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-semibold text-slate-900 mb-2">Retake Assessment</h3>
                <p className="text-sm text-slate-600">Update your information and get new results</p>
              </Link>
              <a
                href="https://cardiologist.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-red-50 border border-red-200 rounded-lg hover:shadow-lg transition text-center sm:col-span-2"
              >
                <div className="text-3xl mb-3">👨‍⚕️</div>
                <h3 className="font-semibold text-red-900 mb-2">Find a Cardiologist</h3>
                <p className="text-sm text-red-700">Search for heart specialists in your area</p>
              </a>
            </div>
          </section>

          {/* Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-2">⚠️ Important Disclaimer</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              This assessment is for educational purposes only and is not a medical diagnosis. Please consult a healthcare professional before making any medical decisions. CardioCheck AI makes no warranties about the accuracy of results. Always seek professional medical advice for diagnosis and treatment.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/privacy" className="text-amber-700 hover:text-amber-900 text-sm font-semibold">Privacy Policy</Link>
              <span className="text-amber-700">•</span>
              <Link href="/disclaimer" className="text-amber-700 hover:text-amber-900 text-sm font-semibold">Medical Disclaimer</Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white mt-16 py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-slate-600 text-sm">
            <p>&copy; 2026 CardioCheck AI. Free, private, educational health assessment.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
