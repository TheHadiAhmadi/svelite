import Form from './Form.svelte';
declare const _default: {
    name: string;
    description: string;
    component: typeof Form;
    props: {
        collection: {
            type: string;
            label: string;
        };
        submit: {
            type: string;
            label: string;
        };
    };
    load(props: any, api: any, params: any): Promise<any>;
};
export default _default;
