import { PiixPal } from 'piixpal/react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import SiteFooter from '../../components/SiteFooter.jsx';
import { Link } from '../../lib/router.jsx';
import { ASSETS_BASE, HERO, LINKS, RECEIPT, TRACKS, TRIPS } from './content.js';
import './life.css';

// a capybara reading the sign-off line (the portfolio has the kitty)
const CAPY_SRC = 'https://cdn.jsdelivr.net/npm/piixpal@0.4/dist/c/capy.min.js';
// reading-progress bar with a runner (works here because /life scrolls the window)
const SCROLLY_SRC = 'https://cdn.jsdelivr.net/npm/piixpal@0.4/dist/c/scrolly.min.js';

const FONTS =
    'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Lora:wght@400;500&family=Fira+Code:wght@400;500&display=swap';
const TONES = [
    ['#C98A4B', '#7C4A22'],
    ['#A3A97C', '#4F5226'],
    ['#8FC4BE', '#2F6F6B'],
    ['#6F7F8C', '#2E2218'],
    ['#8A9A5B', '#3F4A22'],
    ['#2F4A5A', '#79B3AD'],
];

// Newest first by `date` ('Mar 2026'); ties keep the order in content.js. Year-only dates count as January.
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const when = (d = '') => {
    const y = Number((d.match(/\d{4}/) || [0])[0]);
    const m = MONTHS.indexOf(((d.match(/[A-Za-z]{3}/) || [''])[0] || '').toLowerCase());
    return y * 12 + Math.max(m, 0);
};
const SORTED = TRIPS.map((t, i) => [t, i])
    .sort((a, b) => when(b[0].date) - when(a[0].date) || a[1] - b[1])
    .map(([t]) => t);

// Rough card height (in column widths) used to drop each photo into the shortest column.
const heightOf = (t) => {
    const [a, b] = String(t.crop || t.ratio || '3/4')
        .split('/')
        .map(Number);
    return b / a + 0.3;
};

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
            { threshold: 0.12 }
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

function Photo({ item, index, onOpen, eager = false }) {
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
                    loading={eager ? 'eager' : 'lazy'}
                    decoding='async'
                    onLoad={(e) =>
                        setNatural(
                            `${e.currentTarget.naturalWidth}/${e.currentTarget.naturalHeight}`
                        )
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
                                style={{
                                    aspectRatio: item.crop || item.ratio || '3/4',
                                    '--a': a,
                                    '--b': b,
                                }}
                            />
                        )}
                    </div>
                    <p className='lf-lb-cap'>{label(item)}</p>
                    {view.list.length > 1 && (
                        <div className='lf-lb-nav'>
                            <button
                                type='button'
                                onClick={() => onNav(-1)}
                                aria-label='Previous photo'
                            >
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
        <svg viewBox='0 0 360 230' role='img' aria-label='Cassette tape' className='lf-cassette'>
            <rect
                x='4'
                y='4'
                width='352'
                height='222'
                rx='14'
                fill='#3F7F7B'
                stroke='#3A2819'
                strokeWidth='3'
            />
            <g fill='#3A2819'>
                <circle cx='18' cy='18' r='5' />
                <circle cx='342' cy='18' r='5' />
                <circle cx='18' cy='212' r='5' />
                <circle cx='342' cy='212' r='5' />
            </g>
            <rect x='28' y='28' width='304' height='104' rx='6' fill='#F5ECD7' />
            <rect x='28' y='28' width='304' height='26' rx='6' fill='#2F6F6B' />
            <text
                x='42'
                y='47'
                fontFamily='Caveat,cursive'
                fontWeight='700'
                fontSize='24'
                fill='#F5ECD7'
            >
                Side A — late nights
            </text>
            <g fontFamily='Caveat,cursive' fontWeight='700' fontSize='22' fill='#3A2819'>
                {TRACKS.slice(0, 3).map((t, i) => (
                    <text key={i} x='44' y={79 + i * 23}>
                        {i + 1}. {t.song} · {t.artist}
                    </text>
                ))}
            </g>
            <path
                d='M262 42q14-9 28 0t28 0'
                stroke='#F5ECD7'
                strokeWidth='3'
                fill='none'
                strokeLinecap='round'
            />
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
            <path d='M52 226l26-30h204l26 30z' fill='#2A5753' />
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
    const [cols, setCols] = useState(3);
    const [expanded, setExpanded] = useState(false);
    const [overflowing, setOverflowing] = useState(false);
    const clipRef = useRef(null);
    const logRef = useRef(null);
    const [view, setView] = useState(null);
    const heroRef = useReveal();

    useLayoutEffect(() => {
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

    useEffect(() => {
        const el = logRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => setCols(e.contentRect.width < 620 ? 2 : 3));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Pinterest-style placement: each photo goes into the shortest column, in date order,
    // so the first row reads left to right and so on down the page.
    const columns = useMemo(() => {
        const out = Array.from({ length: cols }, () => ({ h: 0, items: [] }));
        SORTED.forEach((t, i) => {
            const c = out.reduce((a, b) => (b.h < a.h ? b : a));
            c.items.push([t, i]);
            c.h += heightOf(t);
        });
        return out;
    }, [cols]);

    useEffect(() => {
        const inner = logRef.current;
        const clip = clipRef.current;
        if (!inner || !clip || expanded) return;
        const check = () => setOverflowing(clip.scrollHeight > clip.clientHeight + 8);
        check();
        const ro = new ResizeObserver(check);
        ro.observe(inner);
        window.addEventListener('resize', check);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', check);
        };
    }, [expanded]);

    const open = (list, i) => setView({ list, i });
    const nav = useCallback(
        (d) => setView((v) => (v ? { ...v, i: (v.i + d + v.list.length) % v.list.length } : v)),
        []
    );
    const close = useCallback(() => setView(null), []);
    const rot = [-2, 1.5, -1, 2.5];

    return (
        <div className='life'>
            <main>
                <header className='lf-wrap lf-hero'>
                    <div ref={heroRef} className='lf-rv'>
                        <span className='lf-hand lf-note'>hi, you made it past the résumé :)</span>
                        <h1>
                            outside
                            <br />
                            the <i>screen</i>
                        </h1>
                        <p>
                            A little corner for the places I’ve been, things I’ve enjoyed and
                            moments worth keeping. Some travel memories, a bit of music, good coffee
                            and whatever else finds its way here. Pull up a chair.
                        </p>
                        <p className='lf-daynote'>
                            <svg
                                width='38'
                                height='38'
                                viewBox='0 0 40 40'
                                {...doodle}
                                aria-hidden='true'
                            >
                                <circle cx='20' cy='20' r='7' />
                                <path d='M20 4v5M20 31v5M4 20h5M31 20h5M8.7 8.7l3.5 3.5M27.8 27.8l3.5 3.5M31.3 8.7l-3.5 3.5M12.2 27.8l-3.5 3.5' />
                            </svg>
                            <span className='lf-hand'>
                                bright on purpose: the portfolio is the night desk, this is the
                                daylight.
                            </span>
                        </p>
                    </div>
                    <div className='lf-stack'>
                        {HERO.slice(0, 3).map((h, i) => (
                            <figure key={i} className={`lf-pol lf-p${i + 1}`}>
                                {i === 0 && <span className='lf-tape' />}
                                <Photo item={h} index={i} onOpen={() => open(HERO, i)} eager />
                                <figcaption>{h.cap}</figcaption>
                            </figure>
                        ))}
                        <span className='lf-hand lf-arrow'>
                            scroll, it’s a mess in a good way ↓
                        </span>
                    </div>
                </header>

                <div className='lf-wrap lf-sec'>
                    <Reveal className='lf-head'>
                        <h2>postcards</h2>
                        <span className='lf-hand'>proof i touch grass</span>
                    </Reveal>
                    <div
                        ref={clipRef}
                        className={`lf-clip ${expanded ? '' : 'is-collapsed'} ${overflowing && !expanded ? 'is-clipped' : ''}`}
                        onFocus={(e) => {
                            if (expanded) return;
                            const clip = clipRef.current.getBoundingClientRect();
                            if (e.target.getBoundingClientRect().top > clip.bottom - 60)
                                setExpanded(true);
                        }}
                    >
                        <div ref={logRef} className='lf-log'>
                            {columns.map((col, ci) => (
                                <div key={ci} className='lf-col'>
                                    {col.items.map(([t, i]) => (
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
                                            <Photo
                                                item={t}
                                                index={i}
                                                onOpen={() => open(SORTED, i)}
                                            />
                                            <figcaption>{t.cap}</figcaption>
                                        </figure>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    {overflowing && !expanded && (
                        <p className='lf-morewrap'>
                            <button
                                type='button'
                                className='lf-more'
                                onClick={() => setExpanded(true)}
                            >
                                more from the roll
                            </button>
                        </p>
                    )}
                </div>

                <div className='lf-wrap lf-sec'>
                    <Reveal className='lf-head'>
                        <h2>analog hours</h2>
                        <span className='lf-hand'>music and coffee</span>
                    </Reveal>
                    <Reveal className='lf-misc'>
                        <div className='lf-tapec'>
                            <Cassette />
                        </div>
                        <div className='lf-rcptc'>
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
                        </div>
                    </Reveal>
                </div>

                <div className='lf-foot'>
                    <Reveal>
                        <p className='lf-bye'>
                            that’s the tour.
                            <PiixPal pal='capy' src={CAPY_SRC} at={0.06} />
                        </p>
                        <div className='lf-doodles'>
                            <svg
                                width='54'
                                height='54'
                                viewBox='0 0 56 56'
                                {...doodle}
                                aria-hidden='true'
                            >
                                <circle cx='28' cy='28' r='22' />
                                <path d='M28 18l9 7-3 11H22l-3-11z' />
                                <path d='M28 18v-6M37 25l9-3M34 36l5 8M22 36l-5 8M19 25l-9-3' />
                            </svg>
                            <span className='lf-hand'>
                                p.s. when the IDE closes — sports, gaming, and zero tabs open
                            </span>
                            <svg
                                width='64'
                                height='44'
                                viewBox='0 0 72 48'
                                {...doodle}
                                aria-hidden='true'
                            >
                                <path d='M14 8h44c8 0 12 14 12 24 0 5-4 7-8 4l-8-8H18l-8 8c-4 3-8 1-8-4 0-10 4-24 12-24z' />
                                <path d='M20 16v8M16 20h8' />
                                <circle cx='50' cy='17' r='2' />
                                <circle cx='57' cy='22' r='2' />
                            </svg>
                        </div>
                        <p className='lf-back'>
                            back to the <Link to={LINKS.portfolio}>night desk (portfolio)</Link> ·
                            say hi on{' '}
                            <a href={LINKS.linkedin} target='_blank' rel='noopener noreferrer'>
                                LinkedIn
                            </a>
                        </p>
                    </Reveal>
                </div>
            </main>

            <div id='lf-progress' className='lf-progress' aria-hidden='true' />
            <PiixPal
                pal='scrolly'
                src={SCROLLY_SRC}
                side='top'
                color='#4F8F8B'
                box='#lf-progress'
            />

            <SiteFooter motto='wander · eat · listen · repeat' fixed />

            <Lightbox view={view} onClose={close} onNav={nav} />
        </div>
    );
}
