import AdminLayout from './AdminLayout.svelte';
/**
* @type {import('../../../svelite/create-svelite').ModuleType}
* */
declare const _default: {
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
    component: typeof AdminLayout;
};
export default _default;
