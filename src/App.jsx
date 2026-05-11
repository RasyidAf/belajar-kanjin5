import { useState, useEffect } from 'react'
import './index.css'
import InputNameScreen from './components/InputNameScreen'
import MenuScreen from './components/MenuScreen'
import KanjiTable from './components/KanjiTable'
import TestSetupScreen from './components/TestSetupScreen'
import TestScreen from './components/TestScreen'
import ResultScreen from './components/ResultScreen'
import SentenceScreen from './components/SentenceScreen'

function App() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || ''
  })
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history')
    return saved ? JSON.parse(saved) : []
  })
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('userName') ? 'menu' : 'input'
  })
  const [testQuestions, setTestQuestions] = useState([])
  const [testResult, setTestResult] = useState(null)

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName)
    }
  }, [userName])

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  const handleNameSubmit = (name) => {
    setUserName(name)
    setCurrentScreen('menu')
  }

  const handleReset = () => {
    localStorage.removeItem('userName')
    localStorage.removeItem('history')
    setUserName('')
    setHistory([])
    setCurrentScreen('input')
  }

  const handleStartTest = (questions) => {
    setTestQuestions(questions)
    setCurrentScreen('test')
  }

  const handleTestComplete = (result) => {
    const newEntry = {
      id: Date.now(),
      total: result.total,
      correct: result.correct,
      wrong: result.wrong,
      date: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    setHistory(prev => [newEntry, ...prev])
    setTestResult(result)
    setCurrentScreen('result')
  }

  const handleBackToMenu = () => {
    setTestQuestions([])
    setTestResult(null)
    setCurrentScreen('menu')
  }

  return (
    <>
      <div className="bg-particles" />
      <div className="relative z-10 min-h-screen">
        {currentScreen === 'input' && (
          <InputNameScreen onSubmit={handleNameSubmit} />
        )}
        {currentScreen === 'menu' && (
          <MenuScreen
            userName={userName}
            history={history}
            onReset={handleReset}
            onNavigate={setCurrentScreen}
          />
        )}
        {currentScreen === 'kanjiTable' && (
          <KanjiTable onBack={handleBackToMenu} />
        )}
        {currentScreen === 'sentences' && (
          <SentenceScreen onBack={handleBackToMenu} />
        )}
        {currentScreen === 'testSetup' && (
          <TestSetupScreen
            onStartTest={handleStartTest}
            onBack={handleBackToMenu}
          />
        )}
        {currentScreen === 'test' && (
          <TestScreen
            questions={testQuestions}
            onComplete={handleTestComplete}
          />
        )}
        {currentScreen === 'result' && (
          <ResultScreen
            result={testResult}
            onBack={handleBackToMenu}
          />
        )}
      </div>
    </>
  )
}

export default App
