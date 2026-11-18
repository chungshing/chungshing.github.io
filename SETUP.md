npm install
npm run dev            # localhost:5173

# deploy to GitHub Pages
# 1. vite.config.js -> set base: '/your-repo-name/'
# 2. git init, push to a repo named your-repo-name (or username.github.io for root)
npm run build
npm run deploy         # uses gh-pages, pushes dist/ to gh-pages branch
# then in repo settings -> Pages -> source: gh-pages branch

Fill in: src/data/ (projects.js, stack.js, journey.js), src/pages/Home/Home.jsx (bio paragraph), src/pages/Life/content.js (/life photos + text)
