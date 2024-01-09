import sv from '../../sv';

export async function load({ params }) {
	return await sv.load(params.slug);
}
