import {sv} from '$lib/svelite';

console.log(sv)

export async function load({ params }) {
	return await sv.load(params.slug);
}
