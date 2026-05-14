import React from 'react'

export default function TextInput({ label, type = 'text', name, value, onChange, placeholder, children, forceBlackText = false }) {
  const baseInput = "w-full py-3 pr-12 pl-4 rounded-xl bg-white/3 border border-white/6 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
  const colorClass = forceBlackText || type === 'password' ? 'input-black' : 'text-slate-100'

  return (
    <label className="block text-sm text-slate-200">
      <span className="text-xs opacity-80 mb-2 block">{label}</span>
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseInput} ${colorClass}`}
        />
        {children}
      </div>
    </label>
  )
}
