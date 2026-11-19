import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const lifePage = () => ({
    name: 'life-page',
    apply: 'build',
    closeBundle() {
        mkdirSync(resolve('dist/life'), { recursive: true });
        copyFileSync(resolve('dist/index.html'), resolve('dist/life/index.html'));
    },
});

export default defineConfig({
    base: '/',
    plugins: [react(), lifePage()],
});
