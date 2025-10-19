import { createRoot } from 'react-dom/client'
import { GameProvider } from './GameContext.jsx'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/PlanetUP'>
    <GameProvider>
      <App />
    </GameProvider>
  </BrowserRouter>
)
