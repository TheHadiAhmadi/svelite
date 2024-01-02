export function createSveliteLoad(api, pages, modules, layouts) {
    return async (slug) => {
        let page = pages.find(x => x.slug === slug);
        if (!page) {
            page = await api
                .db('pages')
                .find()
                .filter('slug', '=', slug)
                .first()
                .then((res) => res.data);
        }
        if (!page) {
            return {};
        }
        if (page.layout) {
            page.layout.component = layouts[page.layout.name].component;
        }
        for (let module of page.modules) {
            module.component = modules[module.name].component;
            console.log("module", module);
            if (modules[module.name].load) {
                module.props.data = await modules[module.name].load(module.props);
                for (let key in module.props.data) {
                    if (typeof module.props.data[key] === 'function') {
                        const fn = module.props.data[key];
                        if (fn.constructor.name === 'AsyncFunction') {
                            module.props.data[key] = async (...args) => {
                                const result = await fn(...args);
                                location.reload();
                                return result;
                            };
                        }
                        else {
                            module.props.data[key] = (...args) => {
                                const result = fn(...args);
                                location.reload();
                                return result;
                            };
                        }
                    }
                }
            }
        }
        return {
            page
        };
    };
}
