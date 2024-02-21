export function matchRoute(slug, pages, routes = []) {
    console.log('matchRoute', { slug, pages, routes })
    const params = {}
    for (let page of pages ?? []) {
        if (page.slug == slug) return { page, params };

        const routeSplitted = page.slug.slice(1).split('/')
        const slugSplitted = slug.slice(1).split('/')

        let resultPage

        if (routeSplitted.length === slugSplitted.length) {
            for (let index in routeSplitted) {
                if (routeSplitted[index].startsWith(':')) {
                    params[routeSplitted[index].slice(1)] = slugSplitted[index]


                    resultPage = page;
                    continue
                } else {

                    if (routeSplitted[index] !== slugSplitted[index]) {
                        resultPage = null
                        break;
                    }
                }


            }

            if (resultPage) {
                return {
                    page: resultPage,
                    params
                }
            }
        }
    }

    for (let route in routes ?? {}) {
        console.log({ route, slug: slug.slice(1) })
        if (route === slug.slice(1)) return { route: routes[route], params };

        const routeSplitted = route.split('/')
        const slugSplitted = slug.slice(1).split('/')


        let resultRoute;

        if (routeSplitted.length === slugSplitted.length) {
            for (let index in routeSplitted) {
                console.log(routeSplitted[index])
                if (routeSplitted[index].startsWith(':')) {
                    params[routeSplitted[index].slice(1)] = slugSplitted[index]
                    console.log('set param', params)


                    resultRoute = route;
                    continue
                } else {

                    if (routeSplitted[index] !== slugSplitted[index]) {
                        resultRoute = null
                        break;
                    }
                }


            }

            if (resultRoute) {
                return {
                    route: routes[resultRoute],
                    params
                }
            }

        }

    }
    return {}
}

export async function loadPageData(url, config) {
    const slug = url.pathname
    const { page, route, params } = matchRoute(slug, config.pages, config.routes)

    console.log({ page, route, params })
    const base_url = url.origin;

    function api(path) {
        return {
            async get(params) {
                return fetch(base_url + path).then(res => res.json())
            },
            async post(body) {
                return fetch(base_url + path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(res => res.json())
            }
        }
    }

    if (!page) {
        return { route, params }
    }

    const resolvedLayouts = {}
    // layout
    if (page.layout) {
        // layout component
        if (!resolvedLayouts[page.layout.name])
            resolvedLayouts[page.layout.name] = await config.layouts[page.layout.name]
        page.layout.component = resolvedLayouts[page.layout.name].default

        // layout load
        if (resolvedLayouts[page.layout.name].load) {
            page.layout.props ??= {};

            const paramsObject = {}

            if (layout.params) {
                for (let key in module.params) {
                    if (module.params[key].startsWith(':')) {
                        paramsObject[key] = params[module.params[key].slice(1)]
                    } else {
                        paramsObject[key] = module.params[key]
                    }
                }
            } else {
                paramsObject = params
            }

            page.layout.props.data = await resolvedLayouts[page.layout.name].load({
                props: page.layout.props,
                api,
                base_url,
                params: paramsObject
            });
        }
    }

    const resolvedModules = {}
    // Page (recursive)
    async function initializeModule(module) {
        if (!resolvedModules[module.name])
            resolvedModules[module.name] = await config.modules[module.name]

        // page component
        module.component = resolvedModules[module.name].default
        // page load
        if (resolvedModules[module.name].load) {

            console.log('load: ', resolvedModules)
            module.props ??= {}

            const paramsObject = {}

            if (module.params) {
                for (let key in module.params) {
                    if (module.params[key].startsWith(':')) {
                        paramsObject[key] = params[module.params[key].slice(1)]
                    } else {
                        paramsObject[key] = module.params[key]
                    }
                }
            } else {
                paramsObject = params
            }
            module.props.data = await resolvedModules[module.name].load({
                props: module.props,
                base_url,
                api,
                params: paramsObject
            });
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
        page,
    };
}

export function normalizeConfig(config) {

    // enable modules Single component mode (no name, description, load...)
    let modules = {};
    let layouts = {};
    let pages = [];

    function loadPlugin(plugin) {
        if (plugin.plugins) {
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
            slug: x.slug.startsWith('/') ? x.slug : '/' + x.slug
        })),
        modules,
        layouts,
    }
}

