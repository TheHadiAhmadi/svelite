import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            external: ['$config']
        }
    },
	plugins: [
		sveltekit(),
	]
});
