import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home.jsx'
import './styles/index.css'

const Life = lazy(() => import('./pages/Life/Life.jsx'))

// GitHub Pages serves 404.html for /life; it stashes the path and sends us here.
const redirect = sessionStorage.getItem('spa-redirect')
if (redirect) {
  sessionStorage.removeItem('spa-redirect')
  history.replaceState(null, '', redirect)
}
const isLife = /^\/life\/?$/.test(window.location.pathname)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isLife ? (
      <Suspense fallback={null}>
        <Life />
      </Suspense>
    ) : (
      <Home />
    )}
  </React.StrictMode>,
)
