export const PROJECTS = [
    {
        title: 'F1 Race Intelligence Dashboard',
        description:
            'Started as a way to combine my interest in Formula 1 with learning full-stack development. It now ingests race data, processes it, and surfaces strategy insights through an interactive dashboard.',
        note: '✦ Running live with automated race data updates.',
        stack: ['Spring Boot', 'Next.js', 'PostgreSQL', 'REST API'],
        links: [
            {
                type: 'demo',
                label: 'Live Demo',
                url: 'https://f1-race-intelligence-dashboard.vercel.app',
            },
            {
                type: 'github',
                label: 'GitHub',
                url: 'https://github.com/chungshing/f1-race-intelligence-dashboard',
            },
        ],
    },
    {
        title: 'Golf Swing AI Analysis',
        description:
            'What if a golf swing could be broken down frame by frame and explained like a coach would? This project explores that idea using computer vision and machine learning to turn swing videos into actionable feedback.',
        note: '✦ Built alongside an industry partner through SIT. Code private due to NDA.',
        stack: [
            'Python',
            'Computer Vision',
            'TensorFlow',
            'MediaPipe',
            'OpenCV',
            'Flask',
            'MongoDB',
            'Google Cloud',
        ],
        links: [
            {
                type: 'video',
                label: 'Watch Video',
                url: 'https://chungshing.github.io/portfolio-assets/video/golf.mp4',
            },
        ],
    },
    {
        title: 'Hospitality Booking Platform',
        description:
            'A project that got me exploring how all the pieces of a booking system fit together, from checking room availability to handling reservations and connecting everything through one application.',
        note: '✦ Exploring SQL and NoSQL in one booking platform.',
        stack: ['Node.js', 'EJS', 'MySQL', 'MongoDB'],
        links: [
            {
                type: 'screenshots',
                label: 'View Screenshots',
                images: [
                    {
                        url: 'https://chungshing.github.io/portfolio-assets/image/archDiagram.png',
                        alt: 'System architecture diagram for the Hospitality Booking Platform',
                    },
                    {
                        url: 'https://chungshing.github.io/portfolio-assets/image/webpage1.png',
                        alt: 'Hostel landing page screenshot',
                    },
                    {
                        url: 'https://chungshing.github.io/portfolio-assets/image/webpage2.png',
                        alt: 'Hostel listing page screenshot',
                    },
                    {
                        url: 'https://chungshing.github.io/portfolio-assets/image/webpage3.png',
                        alt: 'Hostel detail page screenshot',
                    },
                    {
                        url: 'https://chungshing.github.io/portfolio-assets/image/webpage4.png',
                        alt: 'Hostel detail page screenshot, scrolled down',
                    },
                    {
                        url: 'https://chungshing.github.io/portfolio-assets/image/webpage5.png',
                        alt: 'Hostel detail page screenshot, scrolled down further',
                    },
                ],
            },
        ],
    },
    {
        title: 'Yelp Big Data Pipeline',
        description:
            'A chance to play around with big data and see what happens when datasets get too large for a regular application. I used Hadoop and Spark to process the Yelp Open Dataset and explore the insights hidden in it.',
        note: '✦ From raw JSON to distributed processing and data-driven insights.',
        stack: ['Java', 'Hadoop', 'HDFS', 'Spark', 'Python', 'Data Visualization'],
        links: [
            {
                type: 'github',
                label: 'View Analysis',
                url: 'https://github.com/chungshing/yelp-data-pipeline/blob/main/Part%205%20Data%20Visualization/yelp_data_analysis.ipynb',
            },
            {
                type: 'github',
                label: 'GitHub',
                url: 'https://github.com/chungshing/yelp-data-pipeline',
            },
        ],
    },
];
