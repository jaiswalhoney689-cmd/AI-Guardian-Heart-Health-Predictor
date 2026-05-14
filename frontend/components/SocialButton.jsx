import React from 'react'

export default function SocialButton({ provider = 'google', children, onClick }) {
  const base = 'flex items-center justify-center gap-3 py-2 px-4 rounded-xl w-full glass-card border-white/6 hover:scale-105 transition-transform'
  if (provider === 'google') {
    return (
      <button onClick={onClick} className={base} aria-label="Sign in with Google">
        <img src="/google.svg" alt="Google" className="h-5 w-5" />
        <span className="text-sm text-slate-100">{children || 'Continue with Google'}</span>
      </button>
    )
  }
  return (
    <button onClick={onClick} className={base} aria-label="Sign in with Apple">
      <img src="/apple.svg" alt="Apple" className="h-5 w-5 invert" />
      <span className="text-sm text-slate-100">{children || 'Continue with Apple'}</span>
    </button>
  )
}
