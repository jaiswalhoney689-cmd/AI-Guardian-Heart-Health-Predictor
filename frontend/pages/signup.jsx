import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login?mode=signup');
  }, [router]);

  return (
    <>
      <Head>
        <title>Create Account — CardioCheck AI</title>
        <meta name="description" content="Sign up for CardioCheck AI with your phone number" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❤️</div>
          <h1 className="text-2xl font-bold text-white mb-2">CardioCheck AI</h1>
          <p className="text-slate-400">Redirecting to signup...</p>
        </div>
      </div>
    </>
  );
}
