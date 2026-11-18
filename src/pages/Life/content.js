// ─────────────────────────────────────────────────────────────
// All /life content lives here. Edit this file, nothing else.
//
// PHOTOS: put images in the portfolio-assets repo under  life/
// (e.g. life/travel/osaka-01.jpg) and reference them below as
// 'travel/osaka-01.jpg'. A full https:// URL also works.
// Entries with no `src` show a coloured placeholder.
// ─────────────────────────────────────────────────────────────
export const ASSETS_BASE = 'https://chungshing.github.io/portfolio-assets/life/';

// The three polaroids next to the intro.
export const HERO = [
    { src: '', cap: 'me, mid-sentence', ratio: '4/5' },
    { src: '', cap: 'somewhere high up', ratio: '4/5' },
    { src: '', cap: 'the usual, oat flat white', ratio: '1/1' },
];

// Postcards + camera roll, newest first. To add a photo, copy one line.
//   src    image path (see above)
//   place  short place name           date  e.g. 'Mar 2026'
//   cap    handwritten caption
//   stamp  optional: 'JP' turns it into a stamped postcard
//   ratio  optional: placeholder shape before the photo loads (default '3/4', i.e. phone portrait)
//   crop   optional: force a shape, e.g. '1/1' or '3/2' (otherwise the photo keeps its own shape)
//   alt    optional: screen-reader description (defaults to the caption)
export const TRIPS = [
    { src: '', place: 'Osaka', date: 'Mar 2026', cap: 'rain, again', stamp: 'JP' },
    { src: '', place: 'Osaka', date: 'Mar 2026', cap: 'ramen, 11pm', crop: '1/1' },
    { src: '', place: 'Kyoto', date: 'Mar 2026', cap: 'quiet temple, loud tourists' },
    { src: '', place: 'Macau', date: 'Dec 2025', cap: 'egg tart count: 4', stamp: 'MO', ratio: '3/2' },
    { src: '', place: 'Tokyo', date: 'Mar 2026', cap: 'konbini breakfast', crop: '1/1' },
    { src: '', place: 'Hong Kong', date: 'Dec 2025', cap: 'peak, but foggy' },
    { src: '', place: 'Nara', date: 'Mar 2026', cap: 'deer won', ratio: '3/2' },
    { src: '', place: 'Somewhere', date: '2025', cap: 'street corn, anywhere' },
    { src: '', place: 'Somewhere', date: '2025', cap: 'swap me too', crop: '1/1' },
    { src: '', place: 'Somewhere', date: '2024', cap: 'and me' },
    { src: '', place: 'Somewhere', date: '2024', cap: 'last one', ratio: '3/2' },
];

// Cassette label: keep each line under ~28 characters.
export const TRACKS = [
    { song: 'song', artist: 'artist' },
    { song: 'song', artist: 'artist' },
    { song: 'song', artist: 'artist' },
];

// Café receipt.
export const RECEIPT = {
    cafe: 'CAFÉ NO. 4',
    table: 'TABLE 2',
    lines: [
        ['oat flat white', '1'],
        ['cheesecake (shared)', '1'],
        ['3 hours of talking', 'free'],
    ],
    total: 'worth it',
};

export const LINKS = {
    portfolio: '/',
    linkedin: 'https://www.linkedin.com/in/chungshinglai',
};
