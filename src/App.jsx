import './App.css'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import ActivitySessionPage from './pages/ActivitySessionPage'
import ChallengesPage from './pages/ChallengesPage'
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import LoginPage from './pages/LoginPage'
import ProgressPage from './pages/ProgressPage'
import RegisterPage from './pages/RegisterPage'
import TopicDetailPage from './pages/TopicDetailPage'
import { loadLatestTestResult, saveLatestTestResult } from './utils/testResults'

function App() {
  const location = useLocation()
  const [latestTestResult, setLatestTestResult] = useState(loadLatestTestResult)
  const [resultSaved, setResultSaved] = useState(true)

  const handleTestComplete = (result) => {
    setLatestTestResult(result)
    setResultSaved(saveLatestTestResult(result))
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage latestTestResult={latestTestResult} resultSaved={resultSaved} />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/library" element={<LibraryPage />} />

      <Route
        path="/library/topic/:slug"
        element={<TopicDetailPage />}
      />

      <Route
        path="/diagnostic"
        element={
          <ActivitySessionPage
            key={location.key}
            purpose="practice"
            sessionData={location.state?.sessionData}
            onComplete={handleTestComplete}
          />
        }
      />

    </Routes>
  )
}

export default App
