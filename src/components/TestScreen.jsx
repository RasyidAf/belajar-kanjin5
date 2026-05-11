import { useState } from 'react'

export default function TestScreen({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showError, setShowError] = useState(false)

  const current = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  const handleNext = () => {
    if (selectedOption === null) {
      setShowError(true)
      return
    }
    setShowError(false)
    const newAnswers = [...answers, {
      questionIndex: currentIndex,
      selected: selectedOption,
      correct: current.options[selectedOption].correct
    }]
    setAnswers(newAnswers)

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
    } else {
      const correctCount = newAnswers.filter(a => a.correct).length
      onComplete({
        total: questions.length,
        correct: correctCount,
        wrong: questions.length - correctCount,
        answers: newAnswers,
        questions: questions
      })
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto flex flex-col">
      {/* Progress */}
      <div className="animate-fade-in mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500">
            Soal {currentIndex + 1} dari {questions.length}
          </span>
          <span className="text-xs text-indigo-400 font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="progress-bar h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className="animate-scale-in glass-card p-8 text-center mb-6 animate-pulse-glow" key={currentIndex}>
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Apa arti dari kanji ini?</p>
        <span className="text-7xl font-bold text-white block my-4" style={{ fontFamily: 'var(--font-jp)' }}>
          {current.kanji.kanji}
        </span>
        <p className="text-sm text-sakura-300" style={{ fontFamily: 'var(--font-jp)' }}>
          {current.kanji.reading}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 flex-1">
        {current.options.map((option, i) => (
          <button key={i} onClick={() => { setSelectedOption(i); setShowError(false) }}
            className={`radio-option w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
              selectedOption === i
                ? 'selected border-indigo-500'
                : 'border-slate-700/50 bg-slate-800/40'
            }`}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              selectedOption === i
                ? 'border-indigo-400 bg-indigo-500'
                : 'border-slate-600'
            }`}>
              {selectedOption === i && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <span className="text-sm text-slate-200">{option.text}</span>
          </button>
        ))}
      </div>

      {/* Error message */}
      {showError && (
        <p className="text-red-400 text-sm text-center mt-3 animate-fade-in">
          ⚠️ Pilih salah satu jawaban terlebih dahulu
        </p>
      )}

      {/* Next button */}
      <button id="next-question" onClick={handleNext}
        className="mt-6 w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-sakura-500 hover:from-indigo-500 hover:to-sakura-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
        {currentIndex + 1 < questions.length ? 'Selanjutnya →' : 'Lihat Hasil 🎯'}
      </button>
    </div>
  )
}
