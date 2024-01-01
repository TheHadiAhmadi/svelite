import sv from '$lib/sv';
import Todos from './Todos.svelte';

export default {
	name: 'Todos',
	description: 'Todo list module',
	component: Todos,
	props: {
		collection: { label: 'Collection', type: 'plain_text' }
	},
	async load(props: any) {
		let todos = await sv.api
			.db(props.collection)
			.find()
			.all()
			.then((res) => res.data);
		return {
			todos,
			async insert(body: any) {
				sv.api.db(props.collection).insert(body);
			},
			async remove(id: string) {
				sv.api.db(props.collection).remove(id);
			}
		};
	}
};
