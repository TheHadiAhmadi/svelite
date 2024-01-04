import { sveltekit } from '@sveltejs/kit/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		//nodePolyfills({
		// To exclude specific polyfills, add them to this list.
		//	include: [
		//		'fs' // Excludes the polyfill for `fs` and `node:fs`.
		//	],
		// Whether to polyfill specific globals.
		//    globals: {
		//        Buffer: true, // can also be 'build', 'dev', or false
		//        global: true,
		//        process: true
		//   },
		// Whether to polyfill `node:` protocol imports.
		//	protocolImports: true
		//}),
		sveltekit()
	]
});
