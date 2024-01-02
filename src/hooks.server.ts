import createSveliteServer from '$lib/svelite/server';
import config from '../admin.config';

const server = createSveliteServer({});

export function handle({ event, resolve }) {
	event.locals.config = config;

	if (event.url.pathname.startsWith('/api')) {
        return server(event.request)
	}

	return resolve(event);
}
