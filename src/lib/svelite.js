export function matchRoute(slug, pages, routes = []) {
    const params = {}
    for (let page of pages ?? []) {
        if (page.slug == slug) return { page, params };
    }

    for (let page of pages ?? []) {
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
        if (route === slug.slice(1)) return { route: routes[route], params };
    }

    for (let route in routes ?? {}) {
        const routeSplitted = route.split('/')
        const slugSplitted = slug.slice(1).split('/')


        let resultRoute;

        if (routeSplitted.length === slugSplitted.length) {
            for (let index in routeSplitted) {
                if (routeSplitted[index].startsWith(':')) {
                    params[routeSplitted[index].slice(1)] = slugSplitted[index]

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

    function reload() {
        page.layout?.reload?.()
        for(let module of page.modules) {
            module.reload()
        }
    }

    let _redirect;

    function redirect(path, status = 302) {
       
        return {
            redirect: {
                path,
                status
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

            let paramsObject = {}

            if (page.layout.params) {
                for (let key in page.layout.params) {
                    if (page.layout.params[key].startsWith(':')) {
                        paramsObject[key] = params[page.layout.params[key].slice(1)]
                    } else {
                        paramsObject[key] = page.layout.params[key]
                    }
                }
            } else {
                paramsObject = params
            }

            page.layout.reload = async () => {

                page.layout.props.data = await resolvedLayouts[page.layout.name].load({
                    props: page.layout.props,
                    api,
                    base_url,
                    params: paramsObject,
                    reload,
                    redirect
                });
                if(page.layout.props.data?.redirect?.path) {
                    _redirect = page.layout.props.data.redirect
                }
            }
            await page.layout.reload()
            
        }
    }

    const resolvedModules = {}
    // Page (recursive)
    async function initializeModule(module) {
        console.log('initialize: ', module.name)
        if (!resolvedModules[module.name])
            resolvedModules[module.name] = await config.modules[module.name]

        // page component
        module.component = resolvedModules[module.name].default
        // page load
        if (resolvedModules[module.name].load) {

            module.props ??= {}

            let paramsObject = {}

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
            
            module.reload = async () => {
                module.props.data = await resolvedModules[module.name].load({
                    props: module.props,
                    base_url,
                    api,
                    reload,
                    params: paramsObject,
                    redirect
                });
                if(module.props.data?.redirect?.path) {
                    _redirect = module.props.data.redirect
                }
            }
            
            await module.reload()
            
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
        redirect: _redirect,
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

