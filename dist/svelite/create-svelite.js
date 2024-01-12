// place files you want to import through the `$lib` alias in this folder.
//
import { createSveliteLoad } from './svelite-load.js';
import { customApi, createSveliteApi } from './svelite-api.js';
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
    function loadPlugin(plugin) {
        if (plugin.plugins) {
            plugin.plugins.map(x => loadPlugin(x));
        }
        modules = { ...modules, ...(plugin.modules ?? {}) };
        layouts = { ...layouts, ...(plugin.layouts ?? {}) };
        pages = [...pages, ...(plugin.pages ?? [])];
    }
    for (let plugin of config.plugins ?? []) {
        loadPlugin(plugin);
    }
    modules = { ...modules, ...(config.modules ?? {}) };
    layouts = { ...layouts, ...(config.layouts ?? {}) };
    pages = [...pages, ...(config.pages ?? [])];
    const load = createSveliteLoad(api, pages, modules, layouts);
    return {
        api,
        load
    };
}
