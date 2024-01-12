console.log('loading tailwind config')
export default {
	content: [
        './modules/**/*.{svelte,css}',
        './layouts/**/*.{svelte,css}',
        './plugins/**/*.{svelte,css}',
		'./node_modules/svelitecms/dist/**/*.svelte'
	],
	darkMode: 'class'
};
