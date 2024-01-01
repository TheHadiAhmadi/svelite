// place files you want to import through the `$lib` alias in this folder.
//

import { createSveliteLoad } from './create-svelite-load';
import { createSveliteApi } from './svelite-api';
import { createSveliteApiHandler } from './svelite-api-handler';

export type FileManagementConfig = {};
export type ContentManagementConfig = {};
export type ContentTypeManagementConfig = {};

export type ModuleProp = { [x: string]: any };

export type ModuleType = {
	name: string;
	description: string;
	component: any;
	load: any;
	props: ModuleProp[];
};

export type SveliteConfig = {
	api?: string;
	fileManagement: false | FileManagementConfig;
	contentTypeManagement: true | false | ContentTypeManagementConfig;
	contentManagement: true | false | ContentTypeManagementConfig;
	modules: Record<string, ModuleType>;
	layouts: Record<string, ModuleType>;
	// more...
};

export function createSvelite(config: SveliteConfig) {
	const api = createSveliteApi(config.api ?? '/api/'); // todo should include full url..

	const load = createSveliteLoad(api, config.modules, config.layouts);

	function initialize() {}

	const apiHandler = createSveliteApiHandler({});

	return {
		initialize,
		api,
		load,
		apiHandler
	};
}
