import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './components/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>
        <App />
      </AuthProvider>
          </BrowserRouter>
  </StrictMode>,
)