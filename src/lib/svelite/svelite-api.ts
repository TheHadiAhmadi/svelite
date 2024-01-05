export function customApi(methods) {
    methods.file ??= {}
    methods.auth ??= {}
    methods.db ??= {}
	return {
        file: {
            upload: methods.file.upload,
            url: (id: string) => methods.file.url(id)
        },
		auth: {
			login: methods.auth.login,
			register: methods.auth.register,
			logout: methods.auth.logout,
			getUser: methods.auth.getUser
		},
		db: (collection) => {
			let filters: any[] = [];

			return {
				find() {
					function all() {
						return methods.db.find({ collection, filters });
					}

					function paginate(page, perPage) {
						return methods.db.find({ collection, filters, page, perPage });
					}

					function first() {
						return methods.db
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
					return methods.db.insert({ data, collection });
				},
				update(data) {
					return methods.db.update({ data, collection });
				},
				remove(id) {
					return methods.db.remove({ id, collection });
				}
			};
		}
	};
}

export function createSveliteApi(url: string) {
	async function run(action: string, body: any) {
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
		},
		async logout() {
			return console.log('logout');
		},
		async getUser() {
			return { name: 'DEMO', username: 'demo1', email: 'demo@gmail.com', id: 'id_123123131' };
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
