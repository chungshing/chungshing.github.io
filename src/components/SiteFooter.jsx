import './SiteFooter.css';

// One footer for every page. `fixed` pins it to the bottom of the viewport (used on /life).
export default function SiteFooter({ motto, fixed = false }) {
    return (
        <footer className={`site-footer mono${fixed ? ' site-footer--fixed' : ''}`}>
            <p className='footer-thanks'>Thanks for reading a page from my notebook.</p>
            <p className='footer-quote'>{motto}</p>
            <p className='footer-copyright'>© {new Date().getFullYear()} Chung Shing</p>
        </footer>
    );
}
