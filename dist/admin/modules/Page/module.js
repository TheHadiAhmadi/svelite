import Page from './Page.svelte';
export default {
	name: 'Page',
	description: 'Page Form admin pages',
	component: Page,
	props: {
		actions: { type: 'array', label: 'Actions' },
		title: { type: 'plain_text', label: 'Title' },
		content: { type: 'slot', label: 'Content' }
	}
};
