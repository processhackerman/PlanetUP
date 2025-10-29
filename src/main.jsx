import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import './styles/main.scss'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/PlanetUP'>
    <App />
  </BrowserRouter>
)
