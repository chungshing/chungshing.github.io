import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import LofiBar from './components/LofiBar.jsx'
import { Life, isLifePath, usePathname } from './lib/router.jsx'
import Home from './pages/Home/Home.jsx'
import './styles/index.css'

// GitHub Pages serves 404.html for /life; it stashes the path and sends us here.
const redirect = sessionStorage.getItem('spa-redirect')
if (redirect) {
  sessionStorage.removeItem('spa-redirect')
  history.replaceState(null, '', redirect)
}

function Root() {
  const path = usePathname()
  return (
    <>
      {isLifePath(path) ? (
        <Suspense fallback={null}>
          <Life />
        </Suspense>
      ) : (
        <Home />
      )}
      {/* lives outside the pages, so the music keeps playing when you switch between them */}
      <LofiBar />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
