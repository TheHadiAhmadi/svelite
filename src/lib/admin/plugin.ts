import modules from './modules';
import layouts from './layouts';

import AuthenticationPlugin from './plugins/Authentication/plugin'
import AdminDashboardPlugin from './plugins/AdminDashboard/plugin'
import PageManagementPlugin from './plugins/PageManagement/plugin'
import ContentManagementPlugin from './plugins/ContentManagement/plugin'
import ContentTypeBuilderPlugin from './plugins/ContentTypeBuilder/plugin'

export function getAdminLayout(config: any) {
    return {
        name: 'AdminLayout',
        props: {
            logo: config.logo ?? 'logo.png',
            theme: config.theme ?? 'dark',
            dir: config.dir ?? 'ltr',
			sidebar: [{ title: 'Home', href: '/admin', icon: 'home' }]
        }
    } }

export function AdminPanelPlugin(config: any) {
    let plugins = []

    let layout = getAdminLayout(config)
    let adminPrefix = config.adminPrefix ?? 'admin'

	if (config.contentTypeManagement !== false) {
		// build dynamic tables (collections + custom tables)...
		// and dynamic routes for
        const contentTypeBuilderConfig = {
            layout,
            adminPrefix,
        }

        plugins.push(ContentTypeBuilderPlugin(contentTypeBuilderConfig))
	}


	if (config.dashboard !== false) {
        const adminDashboardConfig = {
            layout,
            adminPrefix,
        }

        plugins.push(AdminDashboardPlugin(adminDashboardConfig))
	}

	if (config.auth !== false) {
        const contentManagementConfig = {
            layout,
            adminPrefix,
            collections: config.collections
        }

        plugins.push(ContentManagementPlugin(contentManagementConfig))
    }

	if (config.pageManagement !== false) {
        const pageManagementConfig = {
            layout,
            adminPrefix,
        }
        plugins.push(PageManagementPlugin(pageManagementConfig))
	}

	if (config.auth !== false) {
        const authenticationConfig = {
            layout,
            adminPrefix,
        }

        plugins.push(AuthenticationPlugin(authenticationConfig))
	}
	return {
        plugins,
		modules,
		layouts
	};
}
