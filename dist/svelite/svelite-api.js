export function customApi(methods) {
    return {
        auth: {
            login: methods.login,
            register: methods.register,
        },
        db: (collection) => {
            let filters = [];
            return {
                find() {
                    function all() {
                        return methods.find({ collection, filters });
                    }
                    function paginate(page, perPage) {
                        return methods.find({ collection, filters, page, perPage });
                    }
                    function first() {
                        return methods.find({ collection, filters }).then(res => ({ ...res, data: res.data[0] }));
                    }
                    function filter(field, operator, value) {
                        filters.push({ field, operator, value });
                        return {
                            all,
                            paginate,
                            first
                        };
                    }
                    return {
                        filter,
                        all,
                        paginate,
                        first
                    };
                },
                insert(data) {
                    return methods.insert({ data, collection });
                },
                update(data) {
                    return methods.update({ data, collection });
                },
                remove(id) {
                    return methods.remove({ id, collection });
                }
            };
        }
    };
}
export function createSveliteApi(url) {
    async function run(action, body) {
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...body, action })
        };
        const result = await fetch(url, opts).then((res) => res.json());
        return result;
    }
    return customApi({
        async find({ collection, filters, page, perPage }) {
            return run('find', { collection, filters, page, perPage });
        },
        async insert({ collection, data }) {
            return run('insert', { collection, data });
        },
        async update({ collection, data }) {
            return run('update', { collection, data });
        },
        async remove({ collection, id }) {
            return run('remove', { collection, data: id });
        },
        async login({ password, username }) {
            return console.log('todo login');
        },
        async register({ password, username, name, email }) {
            return console.log('todo register');
        }
    });
}
/*

    return {
        auth: {
            login({ username, password }) {},
            register({ username, password, name, email }) {}
        },
        db: (collection: string) => ({
            insert: (data: any) => run('insert', { collection, data }),
            update: (data: any) => run('update', { collection, data }),
            remove: (id: string) => run('remove', { collection, data: id }),
            find: () => {
                let filters: any[] = [];
                let page = 0;
                let perPage = 0;

                function filter(field: string, operator: string, value: any) {
                    filters.push({ field, operator, value });
                    return {
                        filter,
                        paginate,
                        all,
                        first
                    };
                }

                function paginate(_page: number, _perPage: number) {
                    page = _page;
                    perPage = _perPage;

                    return run('find', { collection, filters, page, perPage });
                }

                function all() {
                    return run('find', { collection, filters });
                }

                function first() {
                    return run('find', { collection, filters }).then((res) => ({
                        ...res,
                        data: res.data[0]
                    }));
                }

                return {
                    all,
                    paginate,
                    filter,
                    first
                };
            }
        })
    };*/
