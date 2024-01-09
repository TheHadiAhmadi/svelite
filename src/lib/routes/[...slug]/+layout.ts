import sv from '$svelite';

export async function load({ params }) {
	return await sv.load(params.slug);
}
