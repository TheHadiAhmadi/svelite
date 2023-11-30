import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnocssVitePlugin from 'unocss/vite';

export default defineConfig({
	plugins: [sveltekit(), UnocssVitePlugin()]
});
