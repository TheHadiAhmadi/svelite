import AdminLayout from './AdminLayout.svelte';

/**
 * @type {import('../../../svelite/create-svelite').ModuleType}
 * */
export default {
	name: 'Admin Layout',
	description: 'layout for admin panel',
	props: {
		dir: { type: 'select', items: ['rtl', 'ltr'] },
		theme: { type: 'select', items: ['dark', 'light'] }
	},
	load(props, api) {
		console.log('load', api);
		return {
			logout() {
				console.log(api);
				return api.auth.logout();
			}
		};
	},
	component: AdminLayout
};
