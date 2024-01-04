import ViewPage from './ViewPage.svelte';

export default {
	name: 'ViewPage',
	description: 'View static Pages from db',
	component: ViewPage,
	async load(props, api, params) {
		const pages = await api
			.db('pages')
			.find()
			.all()
			.then((res) => res.data);

		let page = null;
		for (let pageItem of pages) {
			if (params.slug == pageItem.slug) {
				page = pageItem;
			}

			console.log('SKIP', params.slug, pageItem);
		}

		if (page) {
			return {
				page
			};
		}
		return {};
	}
};
