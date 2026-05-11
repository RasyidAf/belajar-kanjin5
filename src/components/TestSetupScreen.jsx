import { allKanji } from '../data/kanjiData'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateQuestions(count) {
  const shuffled = shuffleArray(allKanji)
  const selected = shuffled.slice(0, count)
  return selected.map((kanji) => {
    const others = allKanji.filter((k) => k.id !== kanji.id)
    const distractors = shuffleArray(others).slice(0, 4)
    const options = shuffleArray([
      { text: kanji.meaning, correct: true },
      ...distractors.map((d) => ({ text: d.meaning, correct: false })),
    ])
    return { kanji, options }
  })
}

const testOptions = [
  { label: '10', value: 10, icon: '⚡', desc: 'Latihan cepat' },
  { label: '20', value: 20, icon: '📚', desc: 'Latihan standar' },
  { label: '50', value: 50, icon: '🔥', desc: 'Tantangan besar' },
  { label: 'Semua', value: allKanji.length, icon: '🏆', desc: `Semua ${allKanji.length} kanji` },
]

export default function TestSetupScreen({ onStartTest, onBack }) {
  const handleStart = (count) => {
    const questions = generateQuestions(count)
    onStartTest(questions)
  }

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto">
      <div className="animate-slide-up flex items-center gap-4 mb-8">
        <button id="back-from-setup" onClick={onBack}
          className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center hover:border-indigo-500/50 transition-all cursor-pointer">
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
            Test Pengetahuan
          </h1>
          <p className="text-slate-500 text-sm">Pilih jumlah soal</p>
        </div>
      </div>

      <div className="animate-slide-up glass-card p-6 mb-6 text-center" style={{ animationDelay: '0.1s' }}>
        <span className="text-5xl block mb-3">🧠</span>
        <p className="text-slate-300 text-sm">
          Tebak arti kanji dari 5 pilihan jawaban. Soal diacak secara unik setiap sesi.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {testOptions.map((opt, i) => (
          <button key={opt.value} onClick={() => handleStart(opt.value)}
            className="animate-slide-up glass-card glass-card-hover p-5 text-center transition-all duration-300 cursor-pointer group"
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform inline-block">{opt.icon}</span>
            <p className="text-2xl font-bold text-white">{opt.label}</p>
            <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
