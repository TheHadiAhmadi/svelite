declare const _default: {
    api: {
        auth: {
            login: any;
            register: any;
            logout: any;
            getUser: any;
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
        modules?: undefined;
    } | {
        page: any;
        modules: any;
    }>;
};
export default _default;
