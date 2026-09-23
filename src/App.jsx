import './App.css'
import { Route, Routes } from 'react-router-dom'
import ActivitySessionPage from './pages/ActivitySessionPage'
import ChallengesPage from './pages/ChallengesPage'
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import LoginPage from './pages/LoginPage'
import ProgressPage from './pages/ProgressPage'
import RegisterPage from './pages/RegisterPage'
import TopicDetailPage from './pages/TopicDetailPage'
import diagnosticTest from './data/diagnostic-test.json'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
            purpose="practice"
            sessionData={diagnosticTest}
          />
        }
      />

    </Routes>
  )
}

export default App