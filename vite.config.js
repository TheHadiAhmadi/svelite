import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig({
    css: {
        postcss: path.resolve('src/lib/config/postcss.config')
    },
    build: {
        rollupOptions: {
            external: ['$config']
        }
    },
	plugins: [
		sveltekit(),
	]
});
