import { useState } from 'react'

export default function InputNameScreen({ onSubmit }) {
  const [name, setName] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="animate-scale-in w-full max-w-md">
        {/* Decorative kanji background */}
        <div className="text-center mb-8">
          <div className="animate-float inline-block">
            <span
              className="text-8xl font-bold opacity-20 select-none block"
              style={{ fontFamily: 'var(--font-jp)' }}
            >
              漢字
            </span>
          </div>
          <h1
            className="text-4xl font-bold mt-4 gradient-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Kanji N5
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Belajar & Uji Pengetahuan Kanji JLPT N5
          </p>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="glass-card p-8">
          <label
            htmlFor="name-input"
            className="block text-sm font-medium text-slate-300 mb-3"
          >
            Siapa nama kamu?
          </label>
          <div
            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
              isFocused
                ? 'ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : ''
            }`}
          >
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Masukkan nama kamu..."
              className="w-full px-5 py-4 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none text-lg transition-colors"
              autoFocus
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim()}
            className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 cursor-pointer ${
              name.trim()
                ? 'bg-gradient-to-r from-indigo-600 to-sakura-500 hover:from-indigo-500 hover:to-sakura-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Mulai Belajar ✨
          </button>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          Data tersimpan di browser kamu
        </p>
      </div>
    </div>
  )
}
