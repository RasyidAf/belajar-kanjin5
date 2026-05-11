export default function MenuScreen({ userName, history, onReset, onNavigate }) {
  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="animate-slide-up flex items-center justify-between mb-8">
        <div>
          <p className="text-slate-400 text-sm">Selamat datang,</p>
          <h1
            className="text-2xl font-bold gradient-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {userName}
          </h1>
        </div>
        <button
          id="reset-button"
          onClick={onReset}
          className="px-4 py-2 rounded-xl text-sm font-medium text-red-400 border border-red-400/30 hover:bg-red-400/10 hover:border-red-400/60 transition-all duration-300 cursor-pointer"
        >
          🔄 Reset
        </button>
      </div>

      {/* Stats summary */}
      <div className="animate-slide-up glass-card p-5 mb-6" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">📊</span>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Statistik</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-400">{history.length}</p>
            <p className="text-xs text-slate-500 mt-1">Total Tes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {history.reduce((sum, h) => sum + h.correct, 0)}
            </p>
            <p className="text-xs text-slate-500 mt-1">Total Benar</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-sakura-400">
              {history.length > 0
                ? Math.round(
                    (history.reduce((sum, h) => sum + h.correct, 0) /
                      history.reduce((sum, h) => sum + h.total, 0)) *
                      100
                  )
                : 0}
              %
            </p>
            <p className="text-xs text-slate-500 mt-1">Akurasi</p>
          </div>
        </div>
      </div>

      {/* Menu buttons */}
      <div className="space-y-4 mb-8">
        <button
          id="menu-kanji-table"
          onClick={() => onNavigate('kanjiTable')}
          className="animate-slide-up glass-card glass-card-hover w-full p-6 text-left transition-all duration-300 cursor-pointer group"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              📖
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Daftar Kanji</h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Lihat tabel lengkap 98 kanji N5
              </p>
            </div>
            <svg
              className="ml-auto w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button
          id="menu-sentences"
          onClick={() => onNavigate('sentences')}
          className="animate-slide-up glass-card glass-card-hover w-full p-6 text-left transition-all duration-300 cursor-pointer group"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              💬
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Contoh Kalimat</h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Pelajari kanji dalam kalimat
              </p>
            </div>
            <svg
              className="ml-auto w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button
          id="menu-test"
          onClick={() => onNavigate('testSetup')}
          className="animate-slide-up glass-card glass-card-hover w-full p-6 text-left transition-all duration-300 cursor-pointer group"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sakura-500 to-sakura-600 flex items-center justify-center text-2xl shadow-lg shadow-sakura-500/20 group-hover:shadow-sakura-500/40 transition-shadow">
              🧠
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Test Pengetahuan</h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Uji kemampuan kanji kamu
              </p>
            </div>
            <svg
              className="ml-auto w-5 h-5 text-slate-600 group-hover:text-sakura-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>

      {/* History */}
      <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">📝</span>
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Histori Tes
          </h2>
        </div>

        {history.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-slate-500 text-sm">Belum ada histori tes</p>
            <p className="text-slate-600 text-xs mt-1">
              Mulai tes pertamamu! 🚀
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {history.map((entry, index) => {
              const percentage = Math.round((entry.correct / entry.total) * 100)
              const isGood = percentage >= 80
              const isOk = percentage >= 50 && percentage < 80
              return (
                <div
                  key={entry.id}
                  className="glass-card p-4 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500">{entry.date}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isGood
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isOk
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {percentage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-400">
                      {entry.total} soal
                    </span>
                    <span className="text-emerald-400">✓ {entry.correct}</span>
                    <span className="text-red-400">✗ {entry.wrong}</span>
                  </div>
                  {/* Mini progress bar */}
                  <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        background: isGood
                          ? 'linear-gradient(90deg, #10b981, #34d399)'
                          : isOk
                          ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                          : 'linear-gradient(90deg, #ef4444, #f87171)',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
