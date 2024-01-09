console.log('loading tailwind config')
export default {
	content: [
        './modules/**/*.svelte',
        './src/**/*.css',
		'./src/lib/modules/**/*.svelte',
		'./node_modules/svelitecms/dist/core/**/*.svelte',
		'./node_modules/svelitecms/dist/admin/**/*.svelte'
	],
	darkMode: 'class'
};
