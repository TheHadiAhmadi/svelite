import Table from './Table.svelte';
declare const _default: {
    name: string;
    description: string;
    component: typeof Table;
    props: {
        collection: {
            type: string;
            label: string;
        };
    };
    load(props: any, api: any): Promise<{
        remove(id: any): Promise<boolean>;
        items: any;
        reload(): void;
    }>;
};
export default _default;
