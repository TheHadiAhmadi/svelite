declare const modules: {
    Header: {
        name: string;
        description: string;
        props: {
            title: {
                type: string;
                label: string;
            };
            subtitle: {
                type: string;
                label: string;
            };
            background: {
                type: string;
                label: string;
            };
        };
        component: typeof import("./ui/Header/Header.svelte").default;
    };
    Todos: {
        name: string;
        description: string;
        component: typeof import("./ui/Todos/Todos.svelte").default;
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
};
export default modules;
