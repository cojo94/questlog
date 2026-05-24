import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameDetails from './pages/GameDetails'
import EditGame from './pages/EditGame'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="/game/:id/edit" element={<EditGame />} />
    </Routes>
  )
}

export default App
