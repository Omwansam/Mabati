import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QuoteCartProvider } from './context/QuoteCartProvider.jsx'
import './index.css'
import App from './App.jsx'

const routerBasename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Missing #root element in index.html')
}

createRoot(rootEl).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={routerBasename}>
        <QuoteCartProvider>
          <App />
        </QuoteCartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
