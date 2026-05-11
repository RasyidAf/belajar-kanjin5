import { useState } from 'react'
import { allKanji } from '../data/kanjiData'

export default function KanjiTable({ onBack }) {
  const [search, setSearch] = useState('')

  const filtered = allKanji.filter(
    (k) =>
      k.kanji.includes(search) ||
      k.reading.includes(search) ||
      k.meaning.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      <div className="animate-slide-up flex items-center gap-4 mb-6">
        <button id="back-from-table" onClick={onBack}
          className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center hover:border-indigo-500/50 transition-all cursor-pointer">
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
            Daftar Kanji N5
          </h1>
          <p className="text-slate-500 text-sm">{allKanji.length} kanji</p>
        </div>
      </div>

      <div className="animate-slide-up mb-6" style={{ animationDelay: '0.1s' }}>
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input id="search-kanji" type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kanji, hiragana, atau arti..."
            className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm" />
        </div>
      </div>

      <div className="animate-slide-up glass-card overflow-hidden" style={{ animationDelay: '0.2s' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">#</th>
                <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Kanji</th>
                <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Cara Baca</th>
                <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider min-w-[120px]">Arti</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((kanji, index) => (
                <tr key={kanji.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors group">
                  <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-xs text-slate-600">{index + 1}</td>
                  <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <span className="text-2xl sm:text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors" style={{ fontFamily: 'var(--font-jp)' }}>
                      {kanji.kanji}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                    <span className="text-xs sm:text-sm text-sakura-300" style={{ fontFamily: 'var(--font-jp)' }}>{kanji.reading}</span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-slate-300">{kanji.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            <p>Tidak ditemukan kanji yang sesuai</p>
          </div>
        )}
      </div>
      <p className="text-center text-slate-600 text-xs mt-4">{filtered.length} dari {allKanji.length} kanji ditampilkan</p>
    </div>
  )
}
