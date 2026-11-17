import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { PiixPal } from 'piixpal/react';
import { useEffect, useState } from 'react';

const KITTY_SRC = 'https://cdn.jsdelivr.net/npm/piixpal@0.4/dist/c/kitty.min.js';

const PHRASES = ['coffee brewing...', 'late night debugging...', 'ideas becoming reality...'];

function useTypewriter(phrases, speed = 55, pause = 1400) {
    const [text, setText] = useState('');
    const [i, setI] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (reduced) {
            setText(phrases[0]);
            return;
        }
        const current = phrases[i % phrases.length];
        let timeout;
        if (!deleting && text === current) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && text === '') {
            setDeleting(false);
            setI((n) => n + 1);
        } else {
            timeout = setTimeout(
                () => setText(current.slice(0, deleting ? text.length - 1 : text.length + 1)),
                deleting ? speed / 2 : speed
            );
        }
        return () => clearTimeout(timeout);
    }, [text, deleting, i, phrases, speed, pause, reduced]);

    return text;
}
const LINKS = [
    {
        icon: Linkedin,
        label: 'linkedin',
        href: 'https://www.linkedin.com/in/chungshinglai/',
        external: true,
    },
    { icon: Github, label: 'github', href: 'https://github.com/chungshing', external: true },
    { icon: Mail, label: 'email', href: 'mailto:chungshinglai@gmail.com', external: false },
];

export default function HeroCard() {
    const typed = useTypewriter(PHRASES);

    return (
        <div className='hero-card'>
            <PiixPal pal='kitty' src={KITTY_SRC} edge='box' at={0.85} />
            <p className='eyebrow'>developer's corner</p>
            <h1 className='hero-name'>Chung Shing</h1>
            <p className='hero-role mono'>Software Engineer, Singapore</p>
            <p className='hero-tagline'>
                Building things,
                <br />
                chasing interests,
                <br />
                enjoying the ride.
            </p>
            <p className='hero-status mono'>
                {typed}
                <span className='cursor'>|</span>
            </p>
            <div className='hero-links'>
                {LINKS.map(({ icon: Icon, label, href, external }) => (
                    <a
                        key={label}
                        className='hero-link-row'
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                    >
                        <Icon size={15} strokeWidth={1.75} />
                        <span className='mono'>{label}</span>
                        <ArrowRight size={13} strokeWidth={1.75} className='hero-link-arrow' />
                    </a>
                ))}
            </div>
        </div>
    );
}
