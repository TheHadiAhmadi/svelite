import sv from '$lib/sv';
import type { PageLoadEvent } from './$types';

export async function load({ params }: PageLoadEvent) {
	console.log(params.slug);
	const res = await sv.load(params.slug);

	console.log(res);

	return res;
}
