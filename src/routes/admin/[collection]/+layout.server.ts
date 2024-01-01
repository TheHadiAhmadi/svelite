export async function load({ locals, params }) {
	const collectionDefinition = locals.config.collections.find((x) => x.slug === params.collection);

	return {
		collection: collectionDefinition
	};
}
