export function customApi(methods) {
    methods.file ??= {}
    methods.auth ??= {}
    methods.db ??= {}

	return {
        upload: methods.upload,
        file: (id: string) => methods.file(id),
		auth: {
			login: async ({username, password}) => {
                if(methods.login) {
                    const res = await methods.login({username, password})
                    return res
                }
            },
			register: async ({username, name, email, password}) => {
                if(methods.login && methods.register) {
                    await methods.register({username, name, email, password})

                    const res = await methods.login({username, password})

                    const token = res.data.token
                    localStorage.setItem("TOKEN", token)
                    return res;
                }
            },
			logout: methods.logout,
			getUser: async () => {
                if(typeof window !== 'undefined') {
                    const token = localStorage.getItem("TOKEN")
                    return {
                        token
                    }

                    // return methods.getUser(token)
                } else {
                    return null
                }

            }
		},
		db: (collection: string) => {
			let filters: any[] = [];

			return {
				find() {
					function all() {
						return methods.find({ collection, filters });
					}

					function paginate(page, perPage) {
						return methods.find({ collection, filters, page, perPage });
					}

					function first() {
						return methods
							.find({ collection, filters })
							.then((res) => ({ ...res, data: res.data[0] }));
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

export function createSveliteApi(url: string) {
	async function run(action: string, body: any) {
		const opts: any = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...body, action })
		};

        if(typeof window !== 'undefined') {
            const token = localStorage.getItem('TOKEN')
            opts.headers['Authorization'] = 'bearer ' + token
        }

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
            return run('login', {password, username})
		},
		async register({ password, username, name, email }) {
            return run('register', {password, name, email, username})
		},
		async logout() {
			return console.log('logout');
		},
		async getUser(token: string) {
            return run('get_user', {})
			// return { name: 'DEMO', username: 'demo1', email: 'demo@gmail.com', id: 'id_123123131' };
		},
        file: (id: string) => url + '/files/' + id,
        async upload(file) {
            const formData = new FormData()
            formData.append('file', file)
            
            const id = await fetch(url + '/files', {
                method: 'POST',
                headers: {
                    Authorization: 'bearer ' + '123',
                },
                body: formData
            }).then(res => res.json()).then(res => res.data.id)

            return id
        }
	});
}
