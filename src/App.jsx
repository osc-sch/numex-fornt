import './App.css'
import { Route, Routes } from 'react-router-dom'
import ChallengesPage from './pages/ChallengesPage'
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import LoginPage from './pages/LoginPage'
import ProgressPage from './pages/ProgressPage'
import RegisterPage from './pages/RegisterPage'
import TopicDetailPage from './pages/TopicDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/topic/:slug" element={<TopicDetailPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}

export default App
