import Form from './Form.svelte';

export default {
	name: 'Form',
	description: 'Form Module for Admin panel',
	component: Form,
	props: {
		collection: { type: 'plain_text', label: 'Collection' },
		submit: { type: 'object', label: 'Submit' }
	},
	async load(props, api, params) {
		let result: any = {};
		console.log(props, params);

		if (props.load) {
			const [collection, field, op, val] = props.load.split(':');

			const value = await api
				.db(collection)
				.find()
				.filter(field, op, params[val])
				.first()
				.then((res) => res.data);

			result.value = value;
		}

		if (props.submit) {
			result.submit = async (newValue) => {
				const [collection, action] = props.submit.action.split(':');
				await api.db(collection)[action](newValue);

				return true;
			};
		}

        result.upload = api.upload
        result.file = api.file

		return result;
	}
};
