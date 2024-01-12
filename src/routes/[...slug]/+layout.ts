import {createSvelite} from '$lib';
import sv from '../../svelite/sv';

export async function load({ params }) {
	return await sv.load(params.slug);
}
