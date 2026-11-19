import { lazy, useSyncExternalStore } from 'react';

// Tiny client-side router for the two pages (no library needed).
// Navigating this way never reloads the document, so anything mounted
// outside the page (the lofi player) keeps playing.

const loaders = { '/life': () => import('../pages/Life/Life.jsx') };

export const Life = lazy(loaders['/life']);
export const isLifePath = (p) => /^\/life\/?$/.test(p);

const subscribe = (cb) => {
    window.addEventListener('popstate', cb);
    window.addEventListener('app:navigate', cb);
    return () => {
        window.removeEventListener('popstate', cb);
        window.removeEventListener('app:navigate', cb);
    };
};
export const usePathname = () => useSyncExternalStore(subscribe, () => window.location.pathname);

export async function navigate(to) {
    if (to === window.location.pathname) return;
    try {
        await loaders[to]?.(); // load the next page first so the switch is instant
    } catch {
        window.location.assign(to); // chunk failed: fall back to a normal page load
        return;
    }
    history.pushState(null, '', to);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.dispatchEvent(new Event('app:navigate'));
}

// Drop-in <a> that navigates without reloading. Ctrl/Cmd-click and new-tab still work.
export function Link({ to, onClick, children, ...rest }) {
    const handle = (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
    };
    return (
        <a href={to} onClick={handle} {...rest}>
            {children}
        </a>
    );
}
