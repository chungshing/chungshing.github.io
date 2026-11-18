import { useCallback, useEffect, useRef, useState } from 'react';
import './life.css';
import { ASSETS_BASE, HERO, LINKS, RECEIPT, TRACKS, TRIPS } from './content.js';

const FONTS =
    'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Caveat:wght@500;700&family=Schibsted+Grotesk:wght@400;600&display=swap';
const TONES = [
    ['#C98A4B', '#7C4A22'],
    ['#A3A97C', '#4F5226'],
    ['#E4B36B', '#B8581F'],
    ['#6F7F8C', '#2E2218'],
    ['#8A9A5B', '#3F4A22'],
    ['#2F4A5A', '#C98A4B'],
];
const PAGE = 8;

const urlFor = (src) => (!src ? null : /^https?:/.test(src) ? src : ASSETS_BASE + src);
const tone = (i) => TONES[i % TONES.length];
const label = (t) => (t.place ? `${t.place}, ${t.date} — ${t.cap}` : t.cap);

function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!('IntersectionObserver' in window)) return el.classList.add('in');
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    el.classList.add('in');
                    io.disconnect();
                }
            },
            { threshold: 0.12 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return ref;
}

function Reveal({ className = '', children }) {
    const ref = useReveal();
    return (
        <div ref={ref} className={`lf-rv ${className}`}>
            {children}
        </div>
    );
}

function Photo({ item, index, onOpen }) {
    const [natural, setNatural] = useState(null);
    const url = urlFor(item.src);
    const [a, b] = tone(index);
    return (
        <button
            type='button'
            className='lf-ph'
            style={{ aspectRatio: item.crop || natural || item.ratio || '3/4', '--a': a, '--b': b }}
            onClick={onOpen}
            aria-label={`Enlarge: ${label(item)}`}
        >
            {url && (
                <img
                    src={url}
                    alt={item.alt || item.cap}
                    loading='lazy'
                    decoding='async'
                    onLoad={(e) =>
                        setNatural(`${e.currentTarget.naturalWidth}/${e.currentTarget.naturalHeight}`)
                    }
                />
            )}
        </button>
    );
}

function Lightbox({ view, onClose, onNav }) {
    const ref = useRef(null);
    const open = view !== null;
    useEffect(() => {
        const d = ref.current;
        if (open && !d.open) d.showModal();
        if (!open && d.open) d.close();
    }, [open]);
    useEffect(() => {
        if (!open) return;
        const k = (e) => {
            if (e.key === 'ArrowRight') onNav(1);
            if (e.key === 'ArrowLeft') onNav(-1);
        };
        window.addEventListener('keydown', k);
        return () => window.removeEventListener('keydown', k);
    }, [open, onNav]);

    const item = open ? view.list[view.i] : null;
    const url = item && urlFor(item.src);
    const [a, b] = tone(open ? view.i : 0);
    return (
        <dialog
            ref={ref}
            className='lf-lb'
            onClose={onClose}
            onClick={(e) => e.target === ref.current && onClose()}
            aria-label='Photo viewer'
        >
            {item && (
                <>
                    <div className='lf-lb-stage'>
                        {url ? (
                            <img src={url} alt={item.alt || item.cap} />
                        ) : (
                            <div
                                className='lf-lb-ph'
                                style={{ aspectRatio: item.crop || item.ratio || '3/4', '--a': a, '--b': b }}
                            />
                        )}
                    </div>
                    <p className='lf-lb-cap'>{label(item)}</p>
                    {view.list.length > 1 && (
                        <div className='lf-lb-nav'>
                            <button type='button' onClick={() => onNav(-1)} aria-label='Previous photo'>
                                ‹
                            </button>
                            <button type='button' onClick={() => onNav(1)} aria-label='Next photo'>
                                ›
                            </button>
                        </div>
                    )}
                    <button type='button' className='lf-lb-x' onClick={onClose} aria-label='Close'>
                        ×
                    </button>
                </>
            )}
        </dialog>
    );
}

function Cassette() {
    return (
        <svg
            viewBox='0 0 360 230'
            role='img'
            aria-label='Cassette tape: Side A, on repeat'
            className='lf-cassette'
        >
            <rect x='4' y='4' width='352' height='222' rx='14' fill='#B8581F' stroke='#3A2819' strokeWidth='3' />
            <g fill='#3A2819'>
                <circle cx='18' cy='18' r='5' />
                <circle cx='342' cy='18' r='5' />
                <circle cx='18' cy='212' r='5' />
                <circle cx='342' cy='212' r='5' />
            </g>
            <rect x='28' y='28' width='304' height='104' rx='6' fill='#F5ECD7' />
            <rect x='28' y='28' width='304' height='26' rx='6' fill='#66652F' />
            <text x='42' y='47' fontFamily='Instrument Serif,serif' fontSize='20' fill='#F5ECD7'>
                Side A — on repeat
            </text>
            <g fontFamily='Caveat,cursive' fontWeight='700' fontSize='22' fill='#3A2819'>
                {TRACKS.slice(0, 3).map((t, i) => (
                    <text key={i} x='44' y={79 + i * 23}>
                        {i + 1}. {t.song} · {t.artist}
                    </text>
                ))}
            </g>
            <path d='M250 100q30-14 62 0' stroke='#B8581F' strokeWidth='3' fill='none' strokeLinecap='round' />
            <rect x='84' y='142' width='192' height='50' rx='25' fill='#2E2218' />
            <path d='M128 152h104M128 176h104' stroke='#8A6A3E' strokeWidth='2' />
            <g fill='#F5ECD7' stroke='#F5ECD7' strokeWidth='2' strokeLinecap='round'>
                {[128, 232].map((cx) => (
                    <g className='lf-reel' key={cx}>
                        <circle cx={cx} cy='167' r='17' stroke='none' />
                        <circle cx={cx} cy='167' r='6' fill='#2E2218' stroke='none' />
                        <path
                            d={`M${cx} 150v6M${cx} 178v6M${cx - 17} 167h6M${cx + 11} 167h6`}
                            stroke='#2E2218'
                        />
                    </g>
                ))}
            </g>
            <path d='M52 226l26-30h204l26 30z' fill='#7A3A12' />
            <g fill='#2E2218'>
                <circle cx='112' cy='211' r='4' />
                <circle cx='180' cy='211' r='4' />
                <circle cx='248' cy='211' r='4' />
            </g>
        </svg>
    );
}

const doodle = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

export default function Life() {
    const [shown, setShown] = useState(PAGE);
    const [view, setView] = useState(null);
    const heroRef = useReveal();

    useEffect(() => {
        const html = document.documentElement;
        const prevTitle = document.title;
        html.classList.add('life-route');
        document.title = 'Outside the Screen | Chung Shing';
        let link = document.getElementById('life-fonts');
        if (!link) {
            link = document.createElement('link');
            link.id = 'life-fonts';
            link.rel = 'stylesheet';
            link.href = FONTS;
            document.head.appendChild(link);
        }
        return () => {
            html.classList.remove('life-route');
            document.title = prevTitle;
        };
    }, []);

    const open = (list, i) => setView({ list, i });
    const nav = useCallback(
        (d) =>
            setView((v) => (v ? { ...v, i: (v.i + d + v.list.length) % v.list.length } : v)),
        [],
    );
    const close = useCallback(() => setView(null), []);
    const rot = [-2, 1.5, -1, 2.5];

    return (
        <div className='life'>
            <header className='lf-wrap lf-hero'>
                <div ref={heroRef} className='lf-rv'>
                    <span className='lf-hand lf-note'>hi, you made it past the résumé :)</span>
                    <h1>
                        outside
                        <br />
                        the <i>screen</i>
                    </h1>
                    <p>
                        A little corner for the places I’ve been, things I’ve enjoyed and moments worth
                        keeping. Some travel memories, a bit of music, good coffee and whatever else
                        finds its way here. Pull up a chair.
                    </p>
                </div>
                <div className='lf-stack'>
                    {HERO.slice(0, 3).map((h, i) => (
                        <figure key={i} className={`lf-pol lf-p${i + 1}`}>
                            {i === 0 && <span className='lf-tape' />}
                            <Photo item={h} index={i} onOpen={() => open(HERO, i)} />
                            <figcaption>{h.cap}</figcaption>
                        </figure>
                    ))}
                    <span className='lf-hand lf-arrow'>scroll, it’s a mess in a good way ↓</span>
                </div>
            </header>

            <div className='lf-wrap lf-sec'>
                <Reveal className='lf-head'>
                    <h2>Postcards</h2>
                    <span className='lf-hand'>places I’ve been, and what I ate there</span>
                </Reveal>
                <div className='lf-log'>
                    {TRIPS.slice(0, shown).map((t, i) => (
                        <figure
                            key={`${t.src}-${i}`}
                            className='lf-pol'
                            style={{ '--rot': `${rot[i % 4]}deg` }}
                        >
                            <span className='lf-meta'>
                                {t.place} · {t.date}
                            </span>
                            {t.stamp && (
                                <span className='lf-stampc'>
                                    {t.stamp}
                                    <br />
                                    {t.date.slice(-4)}
                                </span>
                            )}
                            <Photo item={t} index={i} onOpen={() => open(TRIPS, i)} />
                            <figcaption>{t.cap}</figcaption>
                        </figure>
                    ))}
                </div>
                {shown < TRIPS.length && (
                    <p className='lf-morewrap'>
                        <button type='button' className='lf-more' onClick={() => setShown((s) => s + PAGE)}>
                            more from the roll
                        </button>
                    </p>
                )}
            </div>

            <div className='lf-wrap lf-sec'>
                <Reveal className='lf-head'>
                    <h2>Everything else</h2>
                    <span className='lf-hand'>music and coffee</span>
                </Reveal>
                <Reveal className='lf-misc'>
                    <div className='lf-tapec'>
                        <Cassette />
                    </div>
                    <div className='lf-rcpt'>
                        <div>
                            <b>{RECEIPT.cafe}</b>
                            <span>{RECEIPT.table}</span>
                        </div>
                        <hr />
                        {RECEIPT.lines.map(([n, p]) => (
                            <div key={n}>
                                <span>{n}</span>
                                <span>{p}</span>
                            </div>
                        ))}
                        <hr />
                        <div>
                            <b>TOTAL</b>
                            <b>{RECEIPT.total}</b>
                        </div>
                    </div>
                </Reveal>
            </div>

            <footer className='lf-foot'>
                <Reveal>
                    <div className='lf-doodles'>
                        <svg width='54' height='54' viewBox='0 0 56 56' {...doodle} aria-hidden='true'>
                            <circle cx='28' cy='28' r='22' />
                            <path d='M28 18l9 7-3 11H22l-3-11z' />
                            <path d='M28 18v-6M37 25l9-3M34 36l5 8M22 36l-5 8M19 25l-9-3' />
                        </svg>
                        <span className='lf-hand'>p.s. of course, football and gaming couldn’t be left out</span>
                        <svg width='64' height='44' viewBox='0 0 72 48' {...doodle} aria-hidden='true'>
                            <path d='M14 8h44c8 0 12 14 12 24 0 5-4 7-8 4l-8-8H18l-8 8c-4 3-8 1-8-4 0-10 4-24 12-24z' />
                            <path d='M20 16v8M16 20h8' />
                            <circle cx='50' cy='17' r='2' />
                            <circle cx='57' cy='22' r='2' />
                        </svg>
                    </div>
                    <span className='lf-hand lf-bye'>that’s the tour. thanks for stopping by.</span>
                    <p className='lf-back'>
                        back to the <a href={LINKS.portfolio}>portfolio</a> · say hi on{' '}
                        <a href={LINKS.linkedin} target='_blank' rel='noopener noreferrer'>
                            LinkedIn
                        </a>
                    </p>
                </Reveal>
            </footer>

            <Lightbox view={view} onClose={close} onNav={nav} />
        </div>
    );
}
