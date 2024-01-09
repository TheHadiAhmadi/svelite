import {createSvelite} from '.'
import config from '$svelite'


export default createSvelite({
    plugins: config.plugins,
    modules: config.modules,
    pages: config.pages,
    layouts: config.layouts,
    api: config.api
})


/* import { createSvelite } from './svelite';
import { AdminPanelPlugin } from './admin/plugin';
import modules from './modules'
import customPlugin from './custom/plugin'

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
                    sidebar: ({user}) => user?.role === "ADMIN",
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
		}),
//        customPlugin()
	],
    // api: 'https://svelite-api.hadiahmadi.dev/api'
	// api: 'http://localhost:5173/api'
    api: 'http://localhost:3010/api'
});
*/
