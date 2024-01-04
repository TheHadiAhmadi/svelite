import Register from './Register.svelte';

export default {
	name: 'Register',
	description: 'Register Page',
	component: Register,
	props: {},
	load(props, api) {
		return {
			register({ username, password, email, name }) {
				console.log('register');
				return api.auth.register({ username, password, email, name });
			}
		};
	}
};
