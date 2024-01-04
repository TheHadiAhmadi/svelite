import type { PageModule } from '.';

function matchRoute(url, pages) {
	console.log(pages.map((x) => x.slug));
	let result: any = {};
	for (let page of pages) {
		console.log('processing...', url, page.slug);

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
		console.log('check', urlSplitted, slugSplitted);
		for (let index in slugSplitted) {
			if (urlSplitted[index] !== slugSplitted[index]) {
				// check if slugSplitted is dynamic
				if (slugSplitted[index]?.startsWith('{')) {
					result.page = page;
					params[slugSplitted[index].slice(1, slugSplitted[index].length - 1)] = urlSplitted[index];
					result.params = params;
				} else {
					delete result['page'];
					break;
				}
			} else {
				continue;
			}
		}

		if (result.page) return result;
		console.log('after loop', result);
	}
	return result;
}

export function createSveliteLoad(api, pages, modules, layouts) {
	return async (slug: string) => {
		const dbpages = await api
			.db('pages')
			.find()
			.all()
			.then((res) => res.data);

		const allPages = [...pages, ...dbpages];

		const matchedRoute = matchRoute(slug, allPages);

		console.log('matchedRoute: ', slug, matchedRoute);

		if (!matchedRoute.page) return {};
		const page = matchedRoute.page;

		if (page.layout) {
			page.layout.component = layouts[page.layout.name].component;
		}

		async function initializeModule(module: PageModule) {
			module.component = modules[module.name].component;

			if (modules[module.name].load) {
				module.props.data = await modules[module.name].load(module.props, api, matchedRoute.params);

				console.log('DATA: ', module.name, module.props.data);
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
		for (let module of page.modules) {
			await initializeModule(module);
		}

		return {
			page,
			modules
		};
	};
}
