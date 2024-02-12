export function matchRoute(slug, pages) {
    for(let page of pages ?? []) {
        if(page.slug == slug) return {page};
    }
    return {} 
}

export async function loadPageData(slug, config) {
    const {page, params} = matchRoute(slug, config.pages)

    if(!page) return {}

    // layout
    if (page.layout) {
        // layout component
        page.layout.component = config.layouts[page.layout.name].component;

        // layout load
        if (config.layouts[page.layout.name].load) {
            page.layout.props ??= {};
            page.layout.props.data = await config.layouts[page.layout.name].load(
                page.layout.props,
                config.api,
                params
            );
        }
    }

    // Page (recursive)
    async function initializeModule(module) {
        // page component
        module.component = config.modules[module.name].component ?? config.modules[module.name];
        // page load
        if (config.modules[module.name].load) {
            module.props ??= {}
            module.props.data = await config.modules[module.name].load(module.props, config.api, params);
        }

        // initialize all modules of page recursively
        for (let key in module.props) {
            let prop = module.props[key];
            if (
                Array.isArray(prop) &&
                prop.length > 0 &&
                typeof prop[0].props === 'object' &&
                config.modules[prop[0].name]
            ) {
                for (let slot of prop) {
                    await initializeModule(slot);
                }
            }
        }
    }
    // call initialize module for all modules of page
    for (let module of page.modules) {
        await initializeModule(module);
    }
    return {
        page
    };
}

export function normalizeConfig(config) {
    
	let api = {};
	if (config.api) {
		if (typeof config.api === 'object') {
	// 		api = customApi(config.api);
		} else if (typeof config.api === 'string') {
			// api = createSveliteApi(config.api);
		} else {
			// api = createSveliteApi('/api');
		}
	} else {
	// 	api = createSveliteApi('/api');
	}

    api = {
        auth: {login: console.log, register: console.log, logout: console.log, getUser: console.log},
        db: (collection) => ({find: () => ({find: console.log, first: console.log, filter: console.log}), insert: console.log, update: console.log, remove: console.log})
    }

    // enable modules Single component mode (no name, description, load...)
	let modules = {};
	let layouts = {};
	let pages = [];

    function loadPlugin(plugin) {
        if(plugin.plugins) {
            plugin.plugins.map(x => loadPlugin(x))
        }

		modules = { ...modules, ...(plugin.modules ?? {}) };
		layouts = { ...layouts, ...(plugin.layouts ?? {}) };
		pages = [...pages, ...(plugin.pages ?? [])];
    }

	for (let plugin of config.plugins ?? []) {
        loadPlugin(plugin)
	}

	modules = { ...modules, ...(config.modules ?? {}) };
	layouts = { ...layouts, ...(config.layouts ?? {}) };
	pages = [...pages, ...(config.pages ?? [])];

    return {
        api,
        pages: pages.map(x => ({
            ...x, 
            slug: x.slug.startsWith('/') ? x.slug : '/' + x.slug})),
        modules,
        layouts
    }
}

