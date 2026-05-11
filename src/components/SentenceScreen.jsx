import { useState } from 'react'
import { sentenceCategories } from '../data/sentenceData'

export default function SentenceScreen({ onBack }) {
  const [activeCategory, setActiveCategory] = useState(null)

  const totalSentences = sentenceCategories.reduce((sum, c) => sum + c.sentences.length, 0)

  if (activeCategory) {
    const cat = sentenceCategories.find(c => c.id === activeCategory)
    return (
      <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="animate-slide-up flex items-center gap-4 mb-6">
          <button id="back-from-sentences-detail" onClick={() => setActiveCategory(null)}
            className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center hover:border-indigo-500/50 transition-all cursor-pointer">
            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
              {cat.icon} {cat.name}
            </h1>
            <p className="text-slate-500 text-sm">{cat.sentences.length} contoh kalimat</p>
          </div>
        </div>

        {/* Sentences list */}
        <div className="space-y-4">
          {cat.sentences.map((sentence, index) => (
            <div key={index}
              className="animate-slide-up glass-card p-5 hover:border-indigo-500/30 transition-all"
              style={{ animationDelay: `${index * 0.05}s` }}>
              {/* Number badge */}
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  {/* Japanese sentence */}
                  <p className="text-lg text-white leading-relaxed mb-2"
                    style={{ fontFamily: 'var(--font-jp)', fontWeight: 400 }}>
                    {sentence.japanese}
                  </p>
                  {/* Indonesian meaning */}
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {sentence.meaning}
                  </p>
                  {/* Kanji tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {sentence.kanji.map((k, i) => (
                      <span key={i}
                        className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs"
                        style={{ fontFamily: 'var(--font-jp)' }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Category selection screen
  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="animate-slide-up flex items-center gap-4 mb-6">
        <button id="back-from-sentences" onClick={onBack}
          className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center hover:border-indigo-500/50 transition-all cursor-pointer">
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
            Contoh Kalimat
          </h1>
          <p className="text-slate-500 text-sm">{totalSentences} kalimat dalam {sentenceCategories.length} kategori</p>
        </div>
      </div>

      {/* Info card */}
      <div className="animate-slide-up glass-card p-5 mb-6 text-center" style={{ animationDelay: '0.1s' }}>
        <span className="text-4xl block mb-2">💬</span>
        <p className="text-slate-300 text-sm">
          Pelajari penggunaan kanji N5 dalam kalimat sehari-hari. Dikelompokkan berdasarkan jenis kata.
        </p>
      </div>

      {/* Category list */}
      <div className="space-y-3">
        {sentenceCategories.map((cat, i) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className="animate-slide-up glass-card glass-card-hover w-full p-5 text-left transition-all duration-300 cursor-pointer group"
            style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow-lg`}>
                {cat.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white">{cat.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {cat.sentences.length} contoh kalimat
                </p>
              </div>
              <svg className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
