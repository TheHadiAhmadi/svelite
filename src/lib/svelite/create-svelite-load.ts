import type {PageModule} from ".";

export function createSveliteLoad(api, pages, modules, layouts) {

	return async (slug: string) => {
        let page = pages.find(x => x.slug === slug)
        if(!page) {
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

        async function initializeModule(module: PageModule) {
            module.component = modules[module.name].component

			if (modules[module.name].load) {
				module.props.data = await modules[module.name].load(module.props, api);

                console.log("DATA: ", module.name, module.props.data)
                // reload page after running action
				for (let key in module.props.data) {
					if (typeof module.props.data[key] === 'function') {
						const fn = module.props.data[key];
						if (fn.constructor.name === 'AsyncFunction') {
							module.props.data[key] = async (...args) => {
								const result = await fn(...args);

								location.reload();
								return result;
							};
						} else {
							module.props.data[key] = (...args) => {
								const result = fn(...args);
								location.reload();

								return result;
							};
						}
					}
				}
			}

            for(let key in module.props) {
                let prop = module.props[key]
                if(Array.isArray(prop) && prop.length > 0 && typeof prop[0].props === 'object' && modules[prop[0].name]) {
                    for(let slot of prop) {
                        await initializeModule(slot)
                    }
                }
            }
        }
		for (let module of page.modules) {
            await initializeModule(module)
		}

		return {
			page,
            modules,
		};
	};
}
