export default function Logo({ className = 'h-10 w-auto' }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="10" fill="url(#g)" />
        <path d="M14 28c3-6 6-8 10-8s7 4 10 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="18" r="3" fill="#fff" opacity="0.85" />
      </svg>
    </div>
  )
}
