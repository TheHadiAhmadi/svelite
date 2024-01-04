// import { readFileSync, writeFileSync } from 'node:fs';
//  import { existsSync } from 'node:fs';

type DBAdapter = {
	read: (collection: string) => Promise<any[]>;
	write: (collection: string, data: any[]) => Promise<void>;
};

export default function createSveliteDb(adapter: DBAdapter) {
	let cache: any = {};

	async function read(collectionName: string) {
		console.log('simple read');
		if (!cache[collectionName]) {
			cache[collectionName] = await adapter.read(collectionName);
		}

		console.log('read: ', cache);
		return cache[collectionName];
	}

	function debounce(cb: any, timeout = 1000) {
		let timer: any;

		return (...args: any[]) => {
			if (timer) clearTimeout(timer);

			timer = setTimeout(() => {
				cb(...args);
			}, timeout);
		};
	}
	const deboundedWrite = debounce(adapter.write);

	function write(collectionName: string, data: any) {
		cache[collectionName] = data;

		deboundedWrite(collectionName, data);
	}

	return (collectionName: string) => {
		return {
			find() {
				let filters: any[] = [];
				let pagination: any = {};

				async function paginate(page: number, perPage: number) {
					pagination = { page, perPage };

					return (await all()).slice(
						(pagination.page - 1) * pagination.perPage,
						pagination.page * pagination.perPage
					);
				}

				async function all() {
					const items = await read(collectionName);
					const result = applyFilters(items);
					return result;
				}

				async function first() {
					const items = await read(collectionName);
					const result = applyFilters(items)[0] ?? null;
					return result;
				}

				function applyFilters(items: any[]) {
					return filters.reduce((prev, curr) => {
						return prev.filter((x) => applyComparison(x[curr.field], curr.operator, curr.value));
					}, items);
				}

				function applyComparison(value: any, operator: string, compareValue: any): boolean {
					switch (operator) {
						case '=':
							return value === compareValue;
						case '<':
							return value < compareValue;
						case '<=':
							return value <= compareValue;
						case '>':
							return value > compareValue;
						case '>=':
							return value >= compareValue;
						// Add other conditions as needed
						default:
							return true; // No comparison applied for unknown operators
					}
				}

				function filter(field: string, operator: '=', value: any) {
					filters.push({ value, operator, field });
					return {
						filter,
						all,
						first,
						paginate
					};
				}
				return { filter, all, first, paginate };
			},
			async insert(data: any) {
				console.log('insert', data);
				data.id = 'id_' + Math.random();

				console.log(data);
				write(collectionName, [...(await read(collectionName)), data]);
				return data;
			},
			async remove(id: string) {
				console.log('remove', id);
				const data = await read(collectionName);

				write(
					collectionName,
					data.filter((x: any) => x.id !== id)
				);
			},
			async update(predicate: (value: any, index: number) => any, data) {
				console.log('update', data);
				const items = await read(collectionName);

				console.log('write', items);

				write(
					collectionName,
					items.map((x: any, index: number) => {
						if (predicate(x, index)) {
							return { ...x, ...data };
						}
						return x;
					})
				);
			}
		};
	};
}
/* const JSONAdapter = (filename: string) => {
	async function read(collection: string) {
		//if (!existsSync(filename)) {
		//		await writeFile(filename, '{}');
		//	}
		console.log('Read from Adapter');
		const data = JSON.parse((readFileSync(filename, 'utf-8')) || '{}');

		return data[collection] ?? [];
	}

	async function write(collection: string, value: any[]) {
		const data = JSON.parse((readFileSync(filename, 'utf-8')) || '{}');

		console.log(data);

		data[collection] = value;
		console.log('Write in Adapter');
		await writeFileSync(filename, JSON.stringify(data));
		return;
	}
	return { read, write };
}; */

export const createMemoryAdapter = () => {
	let content = {};
	return {
		read(collection) {
			return content[collection] ?? [];
		},
		write(collection, value) {
			content[collection] = value;
		}
	};
};
