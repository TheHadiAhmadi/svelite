export function matchRoute(slug, pages) {
    for(let page of pages ?? []) {
        if(page.slug == slug) return {page};
    }
    return {} 
}

export async function loadPageData(url, config) {
    const slug = url.pathname
    const {page, params} = matchRoute(slug, config.pages)

    function api(path) {
        return {
            async get(params) {
                return fetch(url.origin + path).then(res => res.json())
            },
            async post(body) {
                return fetch(url.origin + path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json())
            }
        }
    }

    if(!page) return {}

    const resolvedLayouts = {}
    // layout
    if (page.layout) {
        // layout component
        if(!resolvedLayouts[page.layout.name])
            resolvedLayouts[page.layout.name] = await config.layouts[page.layout.name]
        page.layout.component = resolvedLayouts[page.layout.name].default

        // layout load
        if (resolvedLayouts[page.layout.name].load) {
            page.layout.props ??= {};
            page.layout.props.data = await resolvedLayouts[page.layout.name].load({
                props: page.layout.props,
                api,
                params
            });
        }
    }

    const resolvedModules = {}
    // Page (recursive)
    async function initializeModule(module) {
        if(!resolvedModules[module.name])
            resolvedModules[module.name] = await config.modules[module.name]

        // page component
        module.component = resolvedModules[module.name].default
        // page load
        if (resolvedModules[module.name].load) {

            console.log('load: ', resolvedModules)
            module.props ??= {}
            module.props.data = await resolvedModules[module.name].load({props: module.props, api, params});
        }

        // initialize all modules of page recursively
        for (let key in module.props) {
            let prop = module.props[key];
            if (
                Array.isArray(prop) &&
                prop.length > 0 &&
                typeof prop[0].props === 'object' &&
                resolvedModules[prop[0].name]
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
        pages: pages.map(x => ({
            ...x, 
            slug: x.slug.startsWith('/') ? x.slug : '/' + x.slug})),
        modules,
        layouts,
    }
}

