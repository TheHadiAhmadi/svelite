export declare function customApi(methods: any): {
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
export declare function createSveliteApi(url: string): {
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
