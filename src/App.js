import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CharacterSelectPage from './pages/CharacterSelectPage'
import VSPage from './pages/VSPage'

const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<CharacterSelectPage />} />
        <Route path="/vs/:players" element={<VSPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
