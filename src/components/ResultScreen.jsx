export default function ResultScreen({ result, onBack }) {
  const percentage = Math.round((result.correct / result.total) * 100)
  const isExcellent = percentage >= 90
  const isGood = percentage >= 70 && percentage < 90
  const isOk = percentage >= 50 && percentage < 70

  const getMessage = () => {
    if (isExcellent) return { emoji: '🏆', text: 'Luar Biasa!', sub: 'Kamu sangat menguasai kanji N5!' }
    if (isGood) return { emoji: '🎉', text: 'Hebat!', sub: 'Terus berlatih untuk hasil sempurna!' }
    if (isOk) return { emoji: '💪', text: 'Lumayan!', sub: 'Masih bisa ditingkatkan lagi!' }
    return { emoji: '📚', text: 'Tetap Semangat!', sub: 'Pelajari lagi daftar kanji dan coba lagi!' }
  }

  const msg = getMessage()

  const getGradient = () => {
    if (isExcellent) return 'from-emerald-500 to-emerald-400'
    if (isGood) return 'from-indigo-500 to-sakura-400'
    if (isOk) return 'from-amber-500 to-amber-400'
    return 'from-red-500 to-red-400'
  }

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto flex flex-col items-center justify-center">
      <div className="animate-scale-in text-center w-full">
        {/* Emoji */}
        <div className="animate-float text-7xl mb-4">{msg.emoji}</div>

        {/* Message */}
        <h1 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          {msg.text}
        </h1>
        <p className="text-slate-400 text-sm mb-8">{msg.sub}</p>

        {/* Score card */}
        <div className="glass-card p-8 mb-6">
          {/* Circular progress */}
          <div className="relative w-36 h-36 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(51,65,85,0.5)" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none"
                stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${percentage * 3.27} 327`}
                className="transition-all duration-1000" />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">{percentage}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-200">{result.total}</p>
              <p className="text-xs text-slate-500 mt-1">Total Soal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{result.correct}</p>
              <p className="text-xs text-slate-500 mt-1">Benar</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">{result.wrong}</p>
              <p className="text-xs text-slate-500 mt-1">Salah</p>
            </div>
          </div>
        </div>

        {/* Review section */}
        {result.answers && result.questions && (
          <div className="glass-card p-4 mb-6 text-left max-h-60 overflow-y-auto">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-semibold">Ringkasan Jawaban</p>
            {result.answers.map((ans, i) => {
              const q = result.questions[i]
              const wrongAnswerText = !ans.correct ? q.options[ans.selected].text : null;

              return (
                <div key={i} className={`flex items-center gap-3 py-2 ${i > 0 ? 'border-t border-slate-800/50' : ''}`}>
                  <span className={`text-lg ${ans.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                    {ans.correct ? '✓' : '✗'}
                  </span>
                  <span className="text-xl" style={{ fontFamily: 'var(--font-jp)' }}>{q.kanji.kanji}</span>
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    {!ans.correct && (
                      <>
                        <span className="text-xs text-red-400/80 line-through decoration-red-500/50">{wrongAnswerText}</span>
                        <span className="text-xs text-slate-500">→</span>
                      </>
                    )}
                    <span className={`text-xs ${ans.correct ? 'text-slate-400' : 'text-emerald-400'}`}>
                      {q.kanji.meaning}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Back button */}
        <button id="back-to-menu" onClick={onBack}
          className={`w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r ${getGradient()} text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer`}>
          Selesai & Kembali ke Menu
        </button>
      </div>
    </div>
  )
}
