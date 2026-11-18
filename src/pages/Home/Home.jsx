import { useEffect, useRef, useState } from 'react';
import './home.css';
import CoderCard from '../../components/CoderCard.jsx';
import ContactForm from '../../components/ContactForm.jsx';
import HeroCard from '../../components/HeroCard.jsx';
import LofiBar from '../../components/LofiBar.jsx';
import MarginNote from '../../components/MarginNote.jsx';
import Navbar from '../../components/Navbar.jsx';
import { EDUCATION, EXPERIENCE } from '../../data/journey.js';
import { PROJECTS } from '../../data/projects.js';
import { STACK } from '../../data/stack.js';

export default function Home() {
    const contentRef = useRef(null);
    const [journeyTab, setJourneyTab] = useState('experience');
    const [videoModal, setVideoModal] = useState(null);
    const [imageGallery, setImageGallery] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (!imageGallery) return;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') setImageGallery(null);
            if (e.key === 'ArrowLeft') setCurrentImage((i) => Math.max(0, i - 1));
            if (e.key === 'ArrowRight')
                setCurrentImage((i) => Math.min(imageGallery.length - 1, i + 1));
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [imageGallery]);

    useEffect(() => {
        if (!videoModal) return;

        const onKeyDown = (e) => {
            if (e.key === 'Escape') setVideoModal(null);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [videoModal]);

    return (
        <div className='page'>
            <div className='layout'>
                <aside className='hero-col'>
                    <HeroCard />
                    <CoderCard />
                </aside>

                <div className='spine' aria-hidden='true'>
                    <span className='spine-ring' />
                    <span className='spine-ring' />
                    <span className='spine-ring' />
                    <span className='spine-ring' />
                    <span className='spine-ring' />
                    <span className='spine-ring' />
                </div>

                <div className='content-wrap'>
                    <main className='content-col' ref={contentRef}>
                        <section id='about'>
                            <p className='eyebrow'>behind the keyboard</p>
                            <h2>About Me</h2>
                            <p className='subtitle'>Mostly curious. Occasionally caffeinated.</p>
                            <div className='card'>
                                <p style={{ marginTop: 0 }}>
                                    I've always enjoyed figuring out how things work, especially the
                                    bits happening behind the screen. Somewhere along the way, that
                                    curiosity turned into an interest in backend development,
                                    full-stack applications, and building things that solve everyday
                                    problems.
                                </p>
                                <p style={{ marginBottom: 0 }}>
                                    Most of my projects start with a random idea or something I want
                                    to figure out. Sometimes it's an API, sometimes a workflow that
                                    could be a little smoother, or just something I thought would be
                                    fun to build. A lot of learning happens along the way, and
                                    that's probably my favourite part of it.
                                </p>
                                <p style={{ marginBottom: 0 }}>
                                    Outside of that, I'm usually following some kind of sport,
                                    gaming, planning my next trip or spending time with friends.
                                    There's always something going on, and I like keeping it that
                                    way.
                                </p>
                            </div>
                            <MarginNote>✎ curiosity is where my projects begin</MarginNote>
                        </section>

                        <hr className='section-divider' />

                        <section id='experience'>
                            <p className='eyebrow'>learning by building</p>
                            <h2>Journey</h2>
                            <p className='subtitle'>A few stops along the way.</p>

                            <div className='notebook-tabs mono'>
                                <button
                                    className={`notebook-tab ${journeyTab === 'experience' ? 'active' : ''}`}
                                    onClick={() => setJourneyTab('experience')}
                                >
                                    work
                                </button>
                                <button
                                    className={`notebook-tab ${journeyTab === 'education' ? 'active' : ''}`}
                                    onClick={() => setJourneyTab('education')}
                                >
                                    studies
                                </button>
                            </div>

                            <div className='project-list'>
                                {(journeyTab === 'experience' ? EXPERIENCE : EDUCATION).map((e) => (
                                    <div
                                        className='card journey-card'
                                        key={e.role + (e.company || e.org)}
                                    >
                                        {journeyTab === 'experience' ? (
                                            <>
                                                <h3>{e.company}</h3>
                                                <p className='journey-role'>{e.role}</p>
                                                <p className='journey-meta mono'>
                                                    {e.type} • {e.location} • {e.mode}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h3>{e.role}</h3>
                                                <p className='journey-org'>{e.org}</p>
                                            </>
                                        )}
                                        <p
                                            className='mono hero-status'
                                            style={{ height: 'auto', marginBottom: 6 }}
                                        >
                                            {e.period}
                                        </p>
                                        <p style={{ marginBottom: 0 }}>{e.description}</p>
                                        {e.highlights && (
                                            <ul className='journey-highlights'>
                                                {e.highlights.map((h, i) => (
                                                    <li key={i}>{h}</li>
                                                ))}
                                            </ul>
                                        )}
                                        {e.link && (
                                            <p className='journey-link mono'>
                                                <span className='journey-link-title'>
                                                    {e.link.title}
                                                </span>
                                                <a
                                                    href={e.link.href}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='project-btn project-btn-primary'
                                                >
                                                    {e.link.label}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className='section-divider' />

                        <section id='projects'>
                            <p className='eyebrow'>pages from the notebook</p>
                            <h2>Featured Work</h2>
                            <p className='subtitle'>Things I built, broke, and fixed.</p>
                            <div className='project-list'>
                                {PROJECTS.map((p) => (
                                    <div className='card project-card' key={p.title}>
                                        <h3>{p.title}</h3>
                                        <p>{p.description}</p>
                                        {p.note && <p className='project-note mono'>{p.note}</p>}
                                        <div className='project-tags'>
                                            {p.stack.map((s) => (
                                                <span className='tag' key={s}>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                        <div className='project-actions'>
                                            {p.links.map((link, i) => {
                                                if (link.type === 'screenshots') {
                                                    return (
                                                        <button
                                                            key={i}
                                                            className='project-btn project-btn-primary'
                                                            onClick={() => {
                                                                setImageGallery(link.images);
                                                                setCurrentImage(0);
                                                            }}
                                                        >
                                                            {link.label} →
                                                        </button>
                                                    );
                                                }

                                                if (link.type === 'video') {
                                                    return (
                                                        <button
                                                            key={i}
                                                            className='project-btn project-btn-primary'
                                                            onClick={() => setVideoModal(link.url)}
                                                        >
                                                            {link.label} →
                                                        </button>
                                                    );
                                                }

                                                return (
                                                    <a
                                                        key={i}
                                                        className='project-btn project-btn-primary'
                                                        href={link.url}
                                                        target='_blank'
                                                        rel='noreferrer'
                                                    >
                                                        {link.label} →
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <hr className='section-divider' />

                        <section id='skills'>
                            <p className='eyebrow'>on the desk</p>
                            <h2>Toolbox</h2>
                            <p className='subtitle'>Tools I reach for.</p>
                            <div className='stack-columns'>
                                {Object.entries(STACK).map(([group, tools]) => (
                                    <div className='card stack-group' key={group}>
                                        <p className='stack-group-label mono'>{group}</p>
                                        <div className='stack-grid'>
                                            {tools.map((t) => (
                                                <span className='tag' key={t.name}>
                                                    <i className={t.icon}></i> {t.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <MarginNote>
                                ✎ The stack changes, but the goal stays the same: build something
                                useful.
                            </MarginNote>
                        </section>

                        <hr className='section-divider' />

                        <section id='contact'>
                            <p className='eyebrow'>leave a note</p>
                            <h2>Let's Connect</h2>
                            <p className='subtitle'>Coffee's on me. Let's build something.</p>
                            <div className='card'>
                                <ContactForm />
                            </div>
                        </section>
                    </main>
                </div>

                <aside className='nav-col'>
                    <Navbar scrollRef={contentRef} />
                </aside>

                <LofiBar />
            </div>

            <footer className='site-footer mono'>
                <p className='footer-thanks'>Thanks for reading a page from my notebook.</p>
                <p className='footer-quote'>build · break · learn · repeat</p>
                <p className='footer-copyright'>© {new Date().getFullYear()} Chung Shing</p>
            </footer>

            {videoModal && (
                <div className='video-modal-backdrop' onClick={() => setVideoModal(null)}>
                    <div className='video-modal' onClick={(e) => e.stopPropagation()}>
                        <button
                            className='video-modal-close'
                            onClick={() => setVideoModal(null)}
                            aria-label='Close video'
                        >
                            ✕
                        </button>
                        <video src={videoModal} controls autoPlay muted />
                    </div>
                </div>
            )}
            {imageGallery && (
                <div className='video-modal-backdrop' onClick={() => setImageGallery(null)}>
                    <div className='image-viewer' onClick={(e) => e.stopPropagation()}>
                        <button
                            className='image-viewer-close'
                            onClick={() => setImageGallery(null)}
                            aria-label='Close'
                        >
                            ×
                        </button>

                        <h3 className='image-title'>Hospitality Booking Platform</h3>

                        <img
                            src={imageGallery[currentImage].url}
                            alt={imageGallery[currentImage].alt}
                            className='viewer-image'
                            loading='lazy'
                        />

                        <div className='viewer-controls'>
                            <button
                                className='project-btn'
                                disabled={currentImage === 0}
                                onClick={() => setCurrentImage(currentImage - 1)}
                            >
                                ← Previous
                            </button>

                            <span className='mono'>
                                {currentImage + 1} / {imageGallery.length}
                            </span>

                            <button
                                className='project-btn'
                                disabled={currentImage === imageGallery.length - 1}
                                onClick={() => setCurrentImage(currentImage + 1)}
                            >
                                Next →
                            </button>
                        </div>

                        <div className='viewer-dots'>
                            {imageGallery.map((_, i) => (
                                <button
                                    key={i}
                                    className={
                                        i === currentImage ? 'viewer-dot active' : 'viewer-dot'
                                    }
                                    onClick={() => setCurrentImage(i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
