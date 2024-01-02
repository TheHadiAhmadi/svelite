// place files you want to import through the `$lib` alias in this folder.
//
import AdminLayoutSvelte from '../layouts/AdminLayout/AdminLayout.svelte';
import AuthLayoutSvelte from '../layouts/AuthLayout/AuthLayout.svelte';
import { createSveliteLoad } from './create-svelite-load';
import { customApi, createSveliteApi } from './svelite-api';
export function createSvelitePlugin() {
    return (config) => {
    };
}
export const SampleAdminPanelPlugin = (config = { adminPrefix: "admin/", authPrefix: "auth/" }) => {
    const adminModules = {};
    const adminLayouts = {
        "AdminLayout": {
            name: 'AdminLayout',
            description: "Admin Panel Layout",
            component: AdminLayoutSvelte
        },
        "AuthLayout": {
            name: "AuthLayout",
            description: "Authentication Pages Layout",
            component: AuthLayoutSvelte
        }
    };
    const adminPages = [
        {
            slug: config.authPrefix + 'login',
            layout: { name: 'AuthLayout', props: {} },
            modules: []
        },
        {
            slug: config.adminPrefix + 'pages',
            layout: { name: 'AdminLayout', props: {} },
            modules: []
        }
    ];
    return {
        modules: adminModules,
        pages: adminPages,
        layouts: adminLayouts
    };
};
export default function createSvelite(config) {
    let api;
    if (config.api) {
        if (typeof config.api === 'object') {
            api = customApi(config.api);
        }
        else if (typeof config.api === 'string') {
            api = createSveliteApi(config.api);
        }
        else {
            api = createSveliteApi('/api');
        }
    }
    else {
        api = createSveliteApi('/api');
    }
    let modules = {};
    let layouts = {};
    let pages = [];
    for (let plugin of config.plugins ?? []) {
        modules = { ...modules, ...(plugin.modules ?? {}) };
        layouts = { ...layouts, ...(plugin.layouts ?? {}) };
        pages = [...pages, ...(plugin.pages ?? [])];
    }
    modules = { ...modules, ...(config.modules ?? {}) };
    layouts = { ...layouts, ...(config.layouts ?? {}) };
    pages = [...pages, ...(config.pages ?? [])];
    const load = createSveliteLoad(api, pages, modules, layouts);
    return {
        api,
        load,
    };
}
