import AdminLayoutSvelte from '../layouts/AdminLayout/AdminLayout.svelte';
import AuthLayoutSvelte from '../layouts/AuthLayout/AuthLayout.svelte';
export type FileManagementConfig = {};
export type ContentManagementConfig = {};
export type ContentTypeManagementConfig = {};
export type ModuleProp = {
    [x: string]: any;
};
export type ModuleType = {
    name: string;
    description: string;
    component: any;
    load: any;
    props: ModuleProp[];
};
export type PageModule = {
    name: string;
    props: any;
};
export type SvelitePage = {
    slug: string;
    layout: PageModule;
    modules: PageModule[];
    title?: string;
};
export type SvelitePlugin = {
    modules: Record<string, ModuleType>;
    layouts: Record<string, ModuleType>;
    pages: SvelitePage[];
};
export type SveliteConfig = {
    plugins: SvelitePlugin[];
    api?: string;
    modules: Record<string, ModuleType>;
    layouts: Record<string, ModuleType>;
    pages: SvelitePage[];
};
export declare function createSvelitePlugin(): (config: any) => void;
export declare const SampleAdminPanelPlugin: (config?: any) => {
    modules: {};
    pages: {
        slug: string;
        layout: {
            name: string;
            props: {};
        };
        modules: never[];
    }[];
    layouts: {
        AdminLayout: {
            name: string;
            description: string;
            component: typeof AdminLayoutSvelte;
        };
        AuthLayout: {
            name: string;
            description: string;
            component: typeof AuthLayoutSvelte;
        };
    };
};
export default function createSvelite(config: SveliteConfig): {
    api: {
        auth: {
            login: any;
            register: any;
        };
        db: (collection: any) => {
            find(): {
                filter: (field: any, operator: any, value: any) => {
                    all: () => any;
                    paginate: (page: any, perPage: any) => any;
                    first: () => any;
                };
                all: () => any;
                paginate: (page: any, perPage: any) => any;
                first: () => any;
            };
            insert(data: any): any;
            update(data: any): any;
            remove(id: any): any;
        };
    };
    load: (slug: string) => Promise<{
        page?: undefined;
    } | {
        page: any;
    }>;
};
