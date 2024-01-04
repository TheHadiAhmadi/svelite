import type { PageModule } from '.';

function matchRoute(url, pages) {
	let result: any = {};
	for (let page of pages) {

		if (url === page.slug)
			return {
				page,
				params: {}
			};

		const urlSplitted = url.split('/');
		const slugSplitted = page.slug?.split('/');
		// match dynamic..
		//
		if (!urlSplitted.length === slugSplitted) return {};

		let params: any = {};
		for (let index in slugSplitted) {
			if (urlSplitted[index] !== slugSplitted[index]) {
				// check if slugSplitted is dynamic
				if (slugSplitted[index]?.startsWith('{...')) {
					result.page = page;

					params[slugSplitted[index].slice(4, slugSplitted[index].length - 1)] = urlSplitted
						.slice(index)
						.join('/');
					result.params = params;

					break;
				}
				if (slugSplitted[index]?.startsWith('{')) {
					result.page = page;
					params[slugSplitted[index].slice(1, slugSplitted[index].length - 1)] = urlSplitted[index];
					result.params = params;
					break;
				} else {
					delete result['page'];
					break;
				}
			} else {
				continue;
			}
		}

		if (result.page) return result;
	}
	return result;
}

export function createSveliteLoad(api, pages, modules, layouts) {
	return async (slug: string) => {
		const route = matchRoute(slug, pages);

		if (!route.page) return {};
		const { page, params } = route;
    

        // layout
		if (page.layout) {
            // layout component
			page.layout.component = layouts[page.layout.name].component;

            // layout load
			if (layouts[page.layout.name].load) {
				page.layout.props ??= {};
				page.layout.props.data = await layouts[page.layout.name].load(
					page.layout.props,
					api,
					params
				);
			}
		}

        // Page (recursive)
		async function initializeModule(module: PageModule) {
            // page component
			module.component = modules[module.name].component;

            // page load
			if (modules[module.name].load) {
				module.props.data = await modules[module.name].load(module.props, api, params);
			}

            // initialize all modules of page recursively
			for (let key in module.props) {
				let prop = module.props[key];
				if (
					Array.isArray(prop) &&
					prop.length > 0 &&
					typeof prop[0].props === 'object' &&
					modules[prop[0].name]
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
			modules
		};
	};
}
