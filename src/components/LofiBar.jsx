import './LofiBar.css';

const RADIO_EMBED_URL = 'https://embed.datamind.fm/?layout=mini&theme=transparent';

export default function LofiBar() {
    return (
        <aside className='lofi-radio' aria-label='DataMind FM radio'>
            <iframe
                className='lofi-radio__iframe'
                src={RADIO_EMBED_URL}
                title='DataMind FM audio player'
                width='320'
                height='64'
                loading='lazy'
                allow='autoplay'
                referrerPolicy='strict-origin-when-cross-origin'
            />
        </aside>
    );
}
