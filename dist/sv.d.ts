declare const _default: {
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
export default _default;
