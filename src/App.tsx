import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ConfirmPage from './pages/ConfirmPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/potwierdz" element={<ConfirmPage />} />
      </Routes>
    </Router>
  )
}

export default App

