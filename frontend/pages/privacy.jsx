import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — CardioCheck AI</title>
        <meta name="description" content="Privacy policy for CardioCheck AI. Learn how we handle your health data." />
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
              <Link href="/disclaimer" className="text-slate-600 hover:text-slate-900">Disclaimer</Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: May 26, 2026</p>

            {/* What Data We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What Data We Collect</h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                When you use CardioCheck AI, we collect the following health information to calculate your cardiovascular risk score:
              </p>
              <ul className="space-y-2 text-slate-700 ml-6">
                <li>✓ <strong>Age</strong> — Your age in years</li>
                <li>✓ <strong>Gender</strong> — Your biological sex</li>
                <li>✓ <strong>Weight & Height</strong> — To calculate BMI</li>
                <li>✓ <strong>Blood Pressure</strong> — Systolic and diastolic readings</li>
                <li>✓ <strong>Cholesterol Level</strong> — Total cholesterol or LDL/HDL values</li>
                <li>✓ <strong>Lifestyle Factors</strong> — Smoking, exercise, sleep, and stress levels</li>
                <li>✓ <strong>Medical History</strong> — Diabetes, heart disease, or other conditions</li>
              </ul>
            </section>

            {/* Data Processing & Storage */}
            <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">🔒 How We Handle Your Data</h2>
              <div className="space-y-3 text-blue-900 text-sm leading-relaxed">
                <p>
                  <strong>✓ Processed Instantly:</strong> Your data is processed by our AI model immediately to generate your risk score.
                </p>
                <p>
                  <strong>✓ Never Stored on Our Servers:</strong> We do not permanently save your health information. Your data is processed in-memory and then discarded.
                </p>
                <p>
                  <strong>✓ Not Shared:</strong> Your health data is never shared with third parties, advertisers, or other services.
                </p>
                <p>
                  <strong>✓ Not Sold:</strong> We do not sell or monetize your health data in any way.
                </p>
                <p>
                  <strong>✓ No Tracking:</strong> We do not use cookies or tracking pixels to follow your behavior outside this app.
                </p>
              </div>
            </section>

            {/* User Accounts (if logged in) */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">If You Create an Account</h2>
              <p className="text-slate-700 mb-4 leading-relaxed">
                If you sign up with your phone number to save your assessments:
              </p>
              <ul className="space-y-2 text-slate-700 ml-6 mb-4">
                <li>✓ Your phone number is stored securely with Firebase Authentication</li>
                <li>✓ Your assessment results and history are saved in our database</li>
                <li>✓ You can delete your account and all associated data at any time</li>
                <li>✓ Your data is still never shared with anyone else</li>
              </ul>
            </section>

            {/* Privacy Practices */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Privacy Practices</h2>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">🌐 Open Source</h3>
                  <p>This application is open source. You can inspect our code on GitHub to verify exactly what we do with your data.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">🔐 Secure Connection</h3>
                  <p>All communication between your device and our servers is encrypted using HTTPS/TLS security.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">📊 Analytics Only</h3>
                  <p>We use basic analytics to understand how many people use the app and from where — no personally identifiable information is tracked.</p>
                </div>
              </div>
            </section>

            {/* Contact & Questions */}
            <section className="mb-12 bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-4">Questions About Your Privacy?</h2>
              <p className="text-green-900 mb-4">
                If you have any concerns about how your data is handled, please contact us:
              </p>
              <p className="text-green-900">
                <strong>Email:</strong> <a href="mailto:privacy@cardiocheckai.com" className="text-green-700 underline hover:text-green-800">privacy@cardiocheckai.com</a>
              </p>
            </section>

            {/* Disclaimer Link */}
            <section className="pt-8 border-t border-slate-200 text-center">
              <p className="text-slate-600 mb-4">
                Also read our <Link href="/disclaimer" className="text-red-600 font-semibold hover:text-red-700">Medical Disclaimer</Link>
              </p>
            </section>
          </article>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white mt-16 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-slate-600 text-sm">
            <p>&copy; 2026 CardioCheck AI. All rights reserved. Free, private, educational health assessment.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
