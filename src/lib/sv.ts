import { createSvelite } from './svelite';
import { AdminPanelPlugin } from './admin/plugin';
import modules from './modules'

export default createSvelite({
	plugins: [
		AdminPanelPlugin({
            logo: 'logo.png',
            theme: 'dark',
            modules,
			collections: [
				{
					name: 'Users',
					slug: 'users',
					fields: [
						{ name: 'Name', type: 'plain_text' },
						{ name: 'Username', type: 'plain_text' },
						{ name: 'Status', type: 'select', items: ['active', 'disabled'] },
						{ name: 'Profile', type: 'image'},

					]
				},
				{
					name: 'Blogs',
					slug: 'blogs',
					fields: [
						{ name: 'Title', type: 'plain_text' },
						{ name: 'Gallery', type: 'image', multiple: true },
						{ name: 'Content', type: 'plain_text' },
						{ name: 'Status', type: 'select', items: ['draft', 'published'] }
					]
				}

			]
		})
	],
    // api: 'https://svelite-api.hadiahmadi.dev/api'
	// api: 'http://localhost:5173/api'
    api: 'http://localhost:3010/api'
});
