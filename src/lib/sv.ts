import { createSvelite } from './svelite';
import { AdminPanelPlugin } from './admin/plugin';

export default createSvelite({
	plugins: [
		AdminPanelPlugin({
            logo: 'logo.png',
            theme: 'dark',
			collections: [
				{
					name: 'Users',
					slug: 'users',
					fields: [
						{ name: 'Name', type: 'plain_text' },
						{ name: 'Username', type: 'plain_text' },
						{ name: 'Status', type: 'select', items: ['active', 'disabled'] }
					]
				},
				{
					name: 'Blogs',
					slug: 'blogs',
					fields: [
						{ name: 'Title', type: 'plain_text' },
						{ name: 'Content', type: 'plain_text' },
						{ name: 'Status', type: 'select', items: ['draft', 'published'] }
					]
				}

			]
		})
	],
	api: 'http://localhost:5173/api'
});
