import './styles/main.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import GameDetails from './pages/GameDetails'
import Header from './components/Header'
import StatsPage from './pages/StatsPage'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </>
  )
}

export default App
