import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
    };
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const fullPhone = countryCode + phoneNumber.replace(/\D/g, '');

    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {},
        });
      }

      const result = await signInWithPhoneNumber(auth, fullPhone, recaptchaVerifierRef.current);
      setConfirmationResult(result);
      setStep('otp');
      setResendTimer(30);
    } catch (err: any) {
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Please check and try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again in a few minutes.');
      } else {
        setError(err.message || 'Failed to send OTP');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (newOtp.every(digit => digit)) {
      handleVerifyOtp(newOtp);
    }
  };

  const handleVerifyOtp = async (otpArray: string[] = otp) => {
    if (!confirmationResult) return;
    
    setError('');
    setLoading(true);
    const otpCode = otpArray.join('');

    try {
      await confirmationResult.confirm(otpCode);
      const redirect = router.query.redirect as string || '/assess';
      router.push(redirect);
    } catch (err: any) {
      if (err.code === 'auth/invalid-verification-code') {
        setError('Invalid OTP. Please check and try again.');
      } else {
        setError(err.message || 'Failed to verify OTP');
      }
      setOtp(['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const fullPhone = countryCode + phoneNumber.replace(/\D/g, '');
      const result = await signInWithPhoneNumber(auth, fullPhone, recaptchaVerifierRef.current!);
      setConfirmationResult(result);
      setResendTimer(30);
      setOtp(['', '', '', '', '', '']);
    } catch (err: any) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In — CardioCheck AI</title>
        <meta name="description" content="Sign in to CardioCheck AI with your phone number" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="text-4xl">❤️</span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">CardioCheck AI</h1>
            <p className="text-slate-400">
              {router.query.mode === 'signup' ? 'Create your account' : 'Sign in to your account'}
            </p>
          </div>

          {/* Card */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-3">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-20 px-3 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+81">🇯🇵 +81</option>
                    </select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit number"
                      maxLength="10"
                      className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Enter your 10-digit phone number</p>
                </div>

                {error && (
                  <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || phoneNumber.length < 10}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>

                <div id="recaptcha-container" className="flex justify-center"></div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-slate-800 text-slate-400">Or</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-slate-400 text-sm">
                    New to CardioCheck?{' '}
                    <Link href="/login?mode=signup" className="text-red-500 hover:text-red-400 font-semibold">
                      Create account
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-4">
                    Enter OTP
                  </label>
                  <p className="text-xs text-slate-400 mb-4">We sent a 6-digit code to {countryCode}{phoneNumber}</p>
                  
                  <div className="flex gap-2 justify-center mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpInput(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && index > 0) {
                            document.getElementById(`otp-${index - 1}`)?.focus();
                          }
                        }}
                        inputMode="numeric"
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl font-semibold bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-200 text-sm mb-4">
                      {error}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !otp.every(d => d)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-600 text-white font-semibold rounded-lg transition disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify & Sign In'}
                </button>

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-slate-400 text-sm">
                      Resend code in <span className="font-semibold text-red-500">{resendTimer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-red-500 hover:text-red-400 text-sm font-semibold disabled:text-slate-500"
                    >
                      Didn't receive code? Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setOtp(['', '', '', '', '', '']);
                    setError('');
                  }}
                  className="w-full py-2 text-slate-300 hover:text-white text-sm transition"
                >
                  ← Use different number
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-slate-700 text-center">
              <p className="text-slate-400 text-xs">
                By signing in, you agree to our{' '}
                <Link href="/privacy" className="text-red-500 hover:text-red-400">
                  Privacy Policy
                </Link>
                {' '}and{' '}
                <Link href="/disclaimer" className="text-red-500 hover:text-red-400">
                  Medical Disclaimer
                </Link>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link href="/" className="text-slate-400 hover:text-white text-sm">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
