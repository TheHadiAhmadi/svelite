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
	};
}
