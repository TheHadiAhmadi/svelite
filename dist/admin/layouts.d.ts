declare const _default: {
	AdminLayout: {
		name: string;
		description: string;
		props: {
			dir: {
				type: string;
				items: string[];
			};
			theme: {
				type: string;
				items: string[];
			};
		};
		component: typeof import('./layouts/AdminLayout/AdminLayout.svelte').default;
	};
	AuthLayout: {
		name: string;
		description: string;
		component: typeof import('./layouts/AuthLayout/AuthLayout.svelte').default;
	};
};
export default _default;
