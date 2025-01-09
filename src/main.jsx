import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StatsCalculator from './StatsCalculator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StatsCalculator />
  </StrictMode>,
)
