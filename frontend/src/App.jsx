import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameDetails from './pages/GameDetails'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<GameDetails />} />
    </Routes>
  )
}

export default App
