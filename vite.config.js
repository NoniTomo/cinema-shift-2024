import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': '/src',
            '@assets': '/src/assets',
            '@components': '/src/components'
        }
    },
    plugins: [react(), svgr()]
});
