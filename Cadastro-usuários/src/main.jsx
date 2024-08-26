import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/home';
import './index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
