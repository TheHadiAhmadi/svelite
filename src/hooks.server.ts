import sv from '$lib/sv';
import config from '../admin.config';

export function handle({ event, resolve }) {
	event.locals.config = config;

	if (event.url.pathname.startsWith('/api')) {
		return sv.apiHandler(event.request);
	}

	return resolve(event);
}
