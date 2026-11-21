import { Pin } from 'lucide-react';

const CURRENTLY = [
    '→ job hunting: backend / full-stack',
    '→ exploring AI agents',
    '→ building: SportsQuant (Python)',
    '→ tinkering: F1 dashboard',
];

export default function CoderCard() {
    return (
        <div className='coder-card'>
            <span className='coder-card-pin' aria-hidden='true'>
                <Pin size={16} strokeWidth={2} fill='currentColor' />
            </span>

            <img
                src='https://chungshing.github.io/portfolio-assets/image/coder.png'
                alt='Illustration of a developer coding at a desk'
                className='coder-card-img'
                loading='lazy'
            />

            <p className='coder-card-label mono'>currently</p>

            <ul className='coder-card-list' tabIndex={0} aria-label='Currently working on'>
                {CURRENTLY.map((line) => (
                    <li key={line} className='mono'>
                        {line}
                    </li>
                ))}
            </ul>
        </div>
    );
}
