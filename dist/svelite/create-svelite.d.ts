export type FileManagementConfig = {};
export type ContentManagementConfig = {};
export type ContentTypeManagementConfig = {};
export type ModuleProp = {
    [x: string]: any;
};
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
};
export default function createSvelite(config: SveliteConfig): {
    api: {
        upload: any;
        file: (id: string) => any;
        auth: {
            login: ({ username, password }: {
                username: any;
                password: any;
            }) => Promise<any>;
            register: ({ username, name, email, password }: {
                username: any;
                name: any;
                email: any;
                password: any;
            }) => Promise<any>;
            logout: any;
            getUser: () => Promise<{
                token: string | null;
            } | null>;
        };
        db: (collection: string) => {
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
        modules?: undefined;
    } | {
        page: any;
        modules: any;
    }>;
};
