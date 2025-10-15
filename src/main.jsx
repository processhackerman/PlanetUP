import { createRoot } from 'react-dom/client'
import { GameProvider } from './GameContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
  </GameProvider>
)
