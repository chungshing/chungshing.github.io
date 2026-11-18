import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const Life = lazy(() => import('./life/Life.jsx'));

// GitHub Pages serves 404.html for /life; it stashes the path and sends us here.
const redirect = sessionStorage.getItem('spa-redirect');
if (redirect) {
    sessionStorage.removeItem('spa-redirect');
    history.replaceState(null, '', redirect);
}
const isLife = /^\/life\/?$/.test(window.location.pathname);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {isLife ? (
            <Suspense fallback={null}>
                <Life />
            </Suspense>
        ) : (
            <App />
        )}
    </React.StrictMode>
);
