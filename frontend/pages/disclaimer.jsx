import Head from 'next/head';
import Link from 'next/link';

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Medical Disclaimer — CardioCheck AI</title>
        <meta name="description" content="Important medical disclaimer for CardioCheck AI. This tool is for educational purposes only." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 hover:text-red-600 transition">
              ❤️ CardioCheck AI
            </Link>
            <nav className="hidden sm:flex gap-6 text-sm font-medium">
              <Link href="/" className="text-slate-600 hover:text-slate-900">Home</Link>
              <Link href="/privacy" className="text-slate-600 hover:text-slate-900">Privacy</Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12">
            <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 rounded">
              <h1 className="text-3xl font-bold text-red-900 mb-2">⚠️ Medical Disclaimer</h1>
              <p className="text-red-800 text-lg font-semibold">
                Please read this carefully before using CardioCheck AI.
              </p>
            </div>

            {/* Educational Purpose Only */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Educational Purpose Only</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
                <p className="text-slate-700 text-lg leading-relaxed">
                  <strong>CardioCheck AI is an educational tool only.</strong> It is designed to help you understand general cardiovascular health concepts and risk factors—not to provide medical diagnosis, treatment, or professional medical advice.
                </p>
              </div>
            </section>

            {/* Not Medical Advice */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Not a Medical Diagnosis</h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                The cardiovascular risk assessment provided by this app:
              </p>
              <ul className="space-y-3 text-slate-700 ml-6">
                <li>❌ <strong>Is NOT a medical diagnosis</strong> — Only a licensed healthcare provider can diagnose you</li>
                <li>❌ <strong>Is NOT a substitute for professional medical advice</strong> — Please consult a doctor for health concerns</li>
                <li>❌ <strong>May not be accurate</strong> — AI models can make mistakes, especially with incomplete information</li>
                <li>❌ <strong>Should not be used to make medical decisions</strong> — Always verify results with a healthcare professional</li>
                <li>❌ <strong>Cannot replace blood tests or examinations</strong> — Your doctor may order additional tests</li>
              </ul>
            </section>

            {/* AI Limitations */}
            <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">AI Model Limitations</h2>
              <p className="text-blue-900 mb-4 leading-relaxed">
                This app uses artificial intelligence to estimate cardiovascular risk. AI models have inherent limitations:
              </p>
              <ul className="space-y-2 text-blue-900 ml-6">
                <li>• AI predictions are based on statistical patterns, not medical expertise</li>
                <li>• Results may be inaccurate if you provide incorrect information</li>
                <li>• The model cannot account for rare conditions or individual medical factors</li>
                <li>• Risk scores are estimates—not certainties</li>
                <li>• AI may overestimate or underestimate risk for certain populations</li>
              </ul>
            </section>

            {/* When to See a Doctor */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Consult a Healthcare Professional</h2>
              <p className="text-slate-700 mb-4 font-semibold">
                Please see a doctor or cardiologist immediately if you experience:
              </p>
              <ul className="space-y-2 text-slate-700 ml-6">
                <li>🚨 Chest pain or pressure</li>
                <li>🚨 Severe shortness of breath</li>
                <li>🚨 Sudden dizziness or fainting</li>
                <li>🚨 Heart palpitations or irregular heartbeat</li>
                <li>🚨 Any other symptoms of a heart emergency</li>
              </ul>
              <p className="text-red-600 font-bold mt-4">
                In a medical emergency, call 911 immediately.
              </p>
            </section>

            {/* No Warranties */}
            <section className="mb-12 bg-slate-100 border border-slate-300 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                <strong>CardioCheck AI makes no warranties:</strong>
              </p>
              <ul className="space-y-2 text-slate-700 ml-6">
                <li>✗ We do not guarantee the accuracy or completeness of results</li>
                <li>✗ We do not warrant that the app will be free from errors or interruptions</li>
                <li>✗ We are not liable for any health decisions made based on this tool</li>
                <li>✗ We disclaim all liability for health outcomes or damages arising from use of this app</li>
              </ul>
            </section>

            {/* Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="text-slate-700 leading-relaxed">
                CardioCheck AI and its creators are <strong>not responsible</strong> for any health outcomes, medical decisions, or damages (direct or indirect) arising from your use of this app. By using this tool, you assume all risk and agree that we are not liable for any consequences.
              </p>
            </section>

            {/* User Responsibility */}
            <section className="mb-12 bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-4">Your Responsibility</h2>
              <p className="text-green-900 mb-4 leading-relaxed">
                By using CardioCheck AI, you agree to:
              </p>
              <ul className="space-y-2 text-green-900 ml-6">
                <li>✓ Treat this as an educational tool only</li>
                <li>✓ Not rely on it as medical advice</li>
                <li>✓ Consult a licensed healthcare professional before making any medical decisions</li>
                <li>✓ Provide accurate information for the best results</li>
                <li>✓ Never delay or avoid seeking professional medical care</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions or Concerns?</h2>
              <p className="text-slate-700 mb-2">
                If you have questions about this disclaimer or the app, contact us:
              </p>
              <p className="text-slate-700">
                <strong>Email:</strong> <a href="mailto:support@cardiocheckai.com" className="text-red-600 underline hover:text-red-700">support@cardiocheckai.com</a>
              </p>
            </section>

            {/* Summary */}
            <section className="mt-12 bg-slate-50 border border-slate-300 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">📋 Summary</h3>
              <p className="text-slate-700 leading-relaxed">
                <strong>CardioCheck AI is for learning and awareness only.</strong> It is not a substitute for professional medical care. Always consult a licensed healthcare provider for diagnosis, treatment, or medical decisions. If you have chest pain, shortness of breath, or other emergency symptoms, call 911.
              </p>
            </section>
          </article>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white mt-16 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-slate-600 text-sm">
            <p>&copy; 2026 CardioCheck AI. All rights reserved. Educational use only.</p>
            <p className="mt-2">
              <Link href="/privacy" className="text-slate-600 hover:text-slate-900">Privacy Policy</Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
