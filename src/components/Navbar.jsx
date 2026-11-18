import { useEffect, useState } from 'react';
import './Navbar.css';

const LINKS = [
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Journey' },
    { id: 'projects', label: 'Featured Work' },
    { id: 'skills', label: 'Toolbox' },
    { id: 'contact', label: "Let's Connect" },
];

export default function Navbar({ scrollRef }) {
    const [active, setActive] = useState('about');

    useEffect(() => {
        const root = scrollRef?.current;
        if (!root) return;
        const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
        if (!sections.length) return;

        const THRESHOLD = 140;

        const onScroll = () => {
            const rootScrolls = root.scrollHeight > root.clientHeight + 4;
            const scroller = rootScrolls ? root : window;
            const atBottom = rootScrolls
                ? root.scrollHeight - root.scrollTop - root.clientHeight < 4
                : window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

            if (atBottom) {
                setActive(sections[sections.length - 1].id);
                return;
            }
            let current = sections[0].id;
            for (const sec of sections) {
                const top = sec.getBoundingClientRect().top;
                if (top <= THRESHOLD) current = sec.id;
            }
            setActive(current);
        };

        onScroll();
        root.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        return () => {
            root.removeEventListener('scroll', onScroll);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [scrollRef]);

    const goTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className='navbar'>
            {LINKS.map((l) => (
                <button
                    key={l.id}
                    type='button'
                    onClick={() => goTo(l.id)}
                    className={`mono navbar-link ${active === l.id ? 'is-active' : ''}`}
                >
                    {l.label}
                </button>
            ))}
        </nav>
    );
}
