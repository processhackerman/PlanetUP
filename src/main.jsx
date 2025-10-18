import { createRoot } from 'react-dom/client'
import { GameProvider } from './GameContext.jsx'
import App from './App.jsx'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
  </GameProvider>
)
