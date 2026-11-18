import { useEffect, useRef, useState } from 'react';

export default function MarginNote({ children, speed = 35 }) {
    const full = String(children);
    const ref = useRef(null);
    const [started, setStarted] = useState(false);
    const [shown, setShown] = useState(0);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (reduced) {
            setStarted(true);
            setShown(full.length);
            return;
        }
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setStarted(true);
                    io.disconnect();
                }
            },
            { threshold: 0.6 }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, [full, reduced]);

    useEffect(() => {
        if (!started || shown >= full.length) return;
        const t = setTimeout(() => setShown((n) => n + 1), speed);
        return () => clearTimeout(t);
    }, [started, shown, full, speed]);

    return (
        <p className='margin-note' ref={ref} aria-label={full}>
            <span aria-hidden='true'>{full.slice(0, shown)}</span>
            <span aria-hidden='true' style={{ visibility: 'hidden' }}>
                {full.slice(shown)}
            </span>
        </p>
    );
}
