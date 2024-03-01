import { existsSync, readFileSync, writeFileSync } from 'node:fs';

import {customAlphabet} from 'nanoid';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const getId = customAlphabet(alphabet, 8);

// TODO: Cleanup structure of db
// Use one function and multiple adapters.
// Add Mongodb adapter
export function createMemoryDb(initialData = {}) {
    const _data = initialData

    return (table = "") => {
        return {

            async query({ filters, page, perPage }) {
                if (!_data[table]) return []

                return {
                    data: _data[table]
                }

            },
            async insert(data) {

                _data[table] ??= []
                _data.id = getId()
                _data[table].push(data)

                return data
            },
            async update(data) {

                if (!_data[table]) {
                    return;
                }

                _data[table] = _data[table].map(x => {

                    if (x.id === data.id)
                        return { ...x, ...data }

                    return x
                })

                return { todo: true }

            },
            async remove(id) {
                if (!_data[table]) return;

                _data[table] = _data[table].filter(x => x.id !== id)
                return true
            }
        }
    }
}

export function createHttpDb(base_url, token) {
    return (table = "") => {
        async function call(path, body) {

            const response = await fetch(`${base_url}/${token}/${table}/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
            return response;
        }

        return {
            async query({ filters, page, perPage }) {
                return call('query', { filters, page, perPage })
            },
            async insert(data) {
                return call('insert', data)
            },
            async update(data) {
                return call('update', data)
            },
            async remove(id) {
                return call('remove', { id })
            }
        }
    }
}

export function createFileDb(path) {

    const adapter = createFileAdapter(path)

	return (collectionName) => {
		return {
			query({filters = [], page = 1, perPage= 0} = {}) {
                
                return adapter.query(collectionName, {
                    filters, 
                    pagination: {page, perPage}
                })
			},
			async insert(data) {
                data.id ??= getId();
                data.createdAt = new Date().valueOf()
                data.updatedAt = 0
                const result = await adapter.insert(collectionName, data);
				return result;
			},
			async remove(id) {
                await adapter.remove(collectionName, id)
                return true;
			},
			async update(id, data) {
                data.updatedAt = new Date().valueOf()
				const result = await adapter.update(collectionName, id, data);
                return result
			}
		};
	};
}

const createFileAdapter = (path) => {
    if(!existsSync(path)) {
        writeFileSync(path, '{}')
    }

    let db = {}

    function read() {
        const file = readFileSync(path);
        db = JSON.parse(file)
    }
    read()

    function write() {
        writeFileSync(path, JSON.stringify(db));
    }

    let isDirty = false;

    setInterval(() => {
        if(isDirty) {
            write()
        }
        isDirty = false
    }, 2000)

    return {
        async insert(collection, data) {
            if (!db[collection]) {
                db[collection] = [];
            }
            db[collection].push(data);
            isDirty = true
            return data;
        },

        async query(collection, {pagination = {page: 1, perPage: 0}, filters = []}) {
            if (!db[collection]) {
                return {data:[], total: 0, page: 1, perPage: 0};
            }

            let items = applyFilters(db[collection], filters)

            return {
                data: pagination.perPage === 0 ? items : items.slice(
                    (pagination.page - 1) * pagination.perPage,
                    pagination.page * pagination.perPage
                ),
                total: items.length,
                page: pagination.page,
                perPage: pagination.perPage === 0 ? items.length : Math.min(items.length, pagination.perPage)
            }
        },

        async update(collection, id, data) {
            if (!db[collection]) {
                return null;
            }
            const index = db[collection].findIndex(item => item.id === id);
            if (index !== -1) {
                db[collection][index] = { ...db[collection][index], ...data };
                isDirty = true
                return db[collection][index];
            }
            return null;
        },

        async remove(collection, id) {
            if (!db[collection]) {
                return null;
            }
            const index = db[collection].findIndex(item => item.id === id);
            if (index !== -1) {
                const deleted = db[collection][index];
                db[collection].splice(index, 1);
                isDirty = true
                return deleted;
            }
            return null;
        }
    }
}

function applyFilters(items, filters) {
    return filters.reduce((prev, curr) => {
        return prev.filter((x) => applyComparison(x[curr.field], curr.operator, curr.value));
    }, items);
}


function applyComparison(value, operator, compareValue) {
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
