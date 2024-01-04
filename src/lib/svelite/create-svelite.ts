// place files you want to import through the `$lib` alias in this folder.
//

import { createSveliteLoad } from './create-svelite-load';
import { customApi, createSveliteApi } from './svelite-api';

export type FileManagementConfig = {};
export type ContentManagementConfig = {};
export type ContentTypeManagementConfig = {};

export type ModuleProp = { [x: string]: any };

export type ModuleType = {
	name: string;
	component: any;
	description?: string;
	load?: any;
	props?: ModuleProp;
};

export type PageModule = {
	name: string;
	props: any;
};

export type SvelitePage = {
	slug: string;
	modules: PageModule[];
	layout?: PageModule;
	title?: string;
};

export type SvelitePlugin = {
	modules?: Record<string, ModuleType>;
	layouts?: Record<string, ModuleType>;
	pages?: SvelitePage[];
};

export type SveliteConfig = {
	plugins?: SvelitePlugin[];
	api?: string;
	modules?: Record<string, ModuleType>;
	layouts?: Record<string, ModuleType>;
	pages?: SvelitePage[];
	// more...
};

export default function createSvelite(config: SveliteConfig) {
	let api;
	if (config.api) {
		if (typeof config.api === 'object') {
			api = customApi(config.api);
		} else if (typeof config.api === 'string') {
			api = createSveliteApi(config.api);
		} else {
			api = createSveliteApi('/api');
		}
	} else {
		api = createSveliteApi('/api');
	}

	let modules = {};
	let layouts = {};
	let pages: SvelitePage[] = [];

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
		load
	};
}
