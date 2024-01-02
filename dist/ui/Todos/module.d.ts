import Todos from './Todos.svelte';
declare const _default: {
    name: string;
    description: string;
    component: typeof Todos;
    props: {
        collection: {
            label: string;
            type: string;
        };
    };
    load(props: any): Promise<{
        todos: any;
        insert(body: any): Promise<void>;
        remove(id: string): Promise<void>;
    }>;
};
export default _default;
