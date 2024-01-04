import { createSvelite } from './svelite';
import { AdminPanelPlugin } from './admin/plugin';

export default createSvelite({
	plugins: [
		AdminPanelPlugin({
			collections: [
				{
					name: 'Users',
					slug: 'users',
					fields: [
						{ name: 'Name', type: 'plain_text' },
						{ name: 'Username', type: 'plain_text' },
						{ name: 'Status', type: 'select', items: ['active', 'disabled'] }
					]
				}
			]
		})
	],
	api: 'http://localhost:5173/api'
});
