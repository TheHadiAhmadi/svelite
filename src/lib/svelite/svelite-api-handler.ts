import db from '$lib/server/db';
import type { ServerLoadEvent } from '@sveltejs/kit';

function respond(code = 200, data: any = null, message = 'Success', field = null) {
	const response: any = {};

	response.code = code ?? 200;
	if (data) response.data = data;
	response.message = message;
	response.field = field;

	return new Response(JSON.stringify(response));
}

export function createSveliteApiHandler(config) {
	return async (request: ServerLoadEvent['request']) => {
		console.log('request', request.url);
		const url = new URL(request.url);
		if (url.pathname === '/api/files') {
			return new Response(JSON.stringify({ success: true }));
			// FILE UPLOAD
		} else {
			console.log(url.pathname);
			let body;
			try {
				body = await request.json();
			} catch (err) {
				body = {};
			}

			const collection = db(body.collection);
			const action = body.action;
			const data = body.data;

			let result: any = null;
			let message = 'success';

			console.log({ action, collection, data });
			switch (action) {
				case 'insert':
					const insertedData = await collection.insert(data);
					result = insertedData;
					message = 'Data Inserted successfully';

					break;

				case 'update':
					// Assuming you have a specific identifier for the update (e.g., data.id)
					await collection.update((value) => value.id === data.id, data);
					message = 'Data updated successfully';
					break;

				case 'remove':
					// Assuming data is the ID to be removed
					await collection.remove(data);
					message = 'Data removed successfully';
					break;

				case 'find':
					const { filters = [], perPage, page } = body;
					// Assuming filters is an array of filter items
					let query = collection.find();

					filters.map((filter: any) => {
						query = query.filter(filter.field, filter.operator, filter.value);
					});

					if (perPage) {
						result = await query.paginate(page, perPage);
					} else {
						result = await query.all();
					}

					break;

				default:
					message = 'action is not defined';
			}

			return respond(200, result, message);
		}
	};
}
