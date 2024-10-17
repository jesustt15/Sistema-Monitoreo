import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
import { SensorApp } from './SensorApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SensorApp/>
  </StrictMode>,
)
