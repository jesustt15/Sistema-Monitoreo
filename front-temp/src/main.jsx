import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SensorApp } from './SensorApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SensorApp/>
  </StrictMode>,
)
