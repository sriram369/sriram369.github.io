import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
)

// Production pages arrive pre-rendered and are hydrated. The dev server sends
// an empty shell, which is rendered from scratch.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
