import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
        files: {
//             routes: path.resolve('./src/lib/routes'),
            lib: path.resolve('./src/lib/'),
            appTemplate: path.resolve('./src/lib/app.html')
        },
		csrf: {
			checkOrigin: false
		},
        alias: {
//             "$config": path.resolve("./svelite.config")
        },
// 		adapter: adapter()
	},
};

export default config;
