// ─────────────────────────────────────────────────────────────
// All /life content lives here. Edit this file, nothing else.
//
// PHOTOS: put images in the portfolio-assets repo under  life/
// ─────────────────────────────────────────────────────────────
export const ASSETS_BASE = 'https://chungshing.github.io/portfolio-assets/life/';

// The three polaroids next to the intro.
export const HERO = [
    { src: 'hero-me.webp', cap: 'locked in', ratio: '4/5', crop: '4/5' },
    { src: 'hero-highview.webp', cap: 'enoshima after hours', ratio: '4/5', crop: '4/5' },
    { src: 'hero-pizza.webp', cap: 'carb loading', ratio: '1/1', crop: '1/1' },
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
    // August 2026
    {
        src: '2026-08-singapore-suits.webp',
        place: 'Singapore',
        date: 'Aug 2026',
        cap: '2021 flashbacks',
    },
    {
        src: '2026-08-singapore-kimi-lotus.webp',
        place: 'Singapore',
        date: 'Aug 2026',
        cap: 'leave him alone, he knows what he’s doing',
        ratio: '4/3',
    },

    // May 2026
    {
        src: '2026-05-shiinamachi-porsche.webp',
        place: 'Tokyo',
        date: 'May 2026',
        cap: 'uonami fish bar, blue hour',
        stamp: 'JP',
    },
    {
        src: '2026-05-tokyo-gtr.webp',
        place: 'Tokyo',
        date: 'May 2026',
        cap: 'midnight club irl',
        crop: '1/1',
    },
    {
        src: '2026-05-hiroshima-torii.webp',
        place: 'Hiroshima',
        date: 'May 2026',
        cap: 'gate in the ocean, no big deal',
        stamp: 'JP',
        ratio: '9/16',
    },
    {
        src: '2026-05-railway-stairs.webp',
        place: 'Onomichi',
        date: 'May 2026',
        cap: 'railroad crossing steps',
    },
    {
        src: '2026-05-enoshima-sunset.webp',
        place: 'Enoshima',
        date: 'May 2026',
        cap: 'golden hour melt',
    },
    {
        src: '2026-05-omurice-burger.webp',
        place: 'Japan',
        date: 'May 2026',
        cap: 'perfectly balanced yin and yang',
        crop: '1/1',
    },

    // April 2025
    {
        src: '2025-04-osaka-glico.webp',
        place: 'Osaka',
        date: 'Apr 2025',
        cap: 'obligatory dotonbori pic',
    },
    {
        src: '2025-04-himeji-castle.webp',
        place: 'Himeji',
        date: 'Apr 2025',
        cap: 'sakura season peak',
    },
    {
        src: '2025-04-kyoto-fushimi-inari.webp',
        place: 'Kyoto',
        date: 'Apr 2025',
        cap: '10,000 gates, zero cardio left',
    },
    {
        src: '2025-04-kyoto-kiyomizudera.webp',
        place: 'Kyoto',
        date: 'Apr 2025',
        cap: 'main character sky',
    },

    // August 2022
    {
        src: '2022-08-langkawi-skybridge.webp',
        place: 'Langkawi',
        date: 'Aug 2022',
        cap: 'paid for the view, got clouds',
        stamp: 'MY',
        ratio: '9/16',
    },
];
// Cassette label: keep each line under ~28 characters.
export const TRACKS = [
    { song: 'Show Me How', artist: 'Men I Trust' },
    { song: 'K.', artist: 'Cigarettes After Sex' },
    { song: 'No Surprises', artist: 'Radiohead' },
];

// Café receipt.
export const RECEIPT = {
    cafe: 'KISSA CAFÉ',
    table: 'WINDOW SEAT',
    lines: [
        ['iced house latte', '1'],
        ['tiramisu', '1'],
        ['going back to 505', 'free'],
    ],
    total: 'on the house',
};

export const LINKS = {
    portfolio: '/',
    linkedin: 'https://www.linkedin.com/in/chungshinglai',
};
