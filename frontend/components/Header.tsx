import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            ❤️
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-lg">CardioCheck AI</h1>
            <p className="text-xs text-slate-500">Heart Health Assessment</p>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          {loading ? (
            <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-full text-white font-bold flex items-center justify-center hover:shadow-lg transition"
              >
                {user.phoneNumber?.slice(-4) || 'U'}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                  <Link
                    href="/results"
                    className="block w-full px-4 py-3 text-left text-slate-900 hover:bg-slate-50 text-sm font-medium"
                    onClick={() => setShowMenu(false)}
                  >
                    My Results
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setShowMenu(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 text-sm font-medium border-t border-slate-200"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900 font-medium text-sm"
              >
                Sign In
              </Link>
              <Link
                href="/assess"
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-blue-600 text-white font-semibold hover:shadow-lg transition"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
