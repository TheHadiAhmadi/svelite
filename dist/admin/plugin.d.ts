export declare function AdminPanelPlugin(config: any): {
    modules: {
        Form: {
            name: string;
            description: string;
            component: typeof import("./modules/Form/Form.svelte").default;
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
        Page: {
            name: string;
            description: string;
            component: typeof import("./modules/Page/Page.svelte").default;
            props: {
                actions: {
                    type: string;
                    label: string;
                };
                title: {
                    type: string;
                    label: string;
                };
                content: {
                    type: string;
                    label: string;
                };
            };
        };
        Table: {
            name: string;
            description: string;
            component: typeof import("./modules/Table/Table.svelte").default;
            props: {
                collection: {
                    type: string;
                    label: string;
                };
            };
            load(props: any, api: any): Promise<{
                remove(id: any): boolean;
                items: any;
                reload(): void;
            }>;
        };
        Login: {
            name: string;
            description: string;
            component: typeof import("./modules/Login/Login.svelte").default;
            props: {};
            load(props: any, api: any): {
                login(username: any, password: any): any;
            };
        };
    };
    pages: any[];
    layouts: {
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
            component: typeof import("./layouts/AdminLayout/AdminLayout.svelte").default;
        };
        AuthLayout: {
            name: string;
            description: string;
            component: typeof import("./layouts/AuthLayout/AuthLayout.svelte").default;
        };
    };
};
