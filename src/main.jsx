import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ZakatCalculator from '../ZakatCalculator';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZakatCalculator />
  </StrictMode>
)
