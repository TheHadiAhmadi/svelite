export async function load({locals, params}) {

    const collectionDefinition = locals.config.collections.find(x => x.slug === params.collection)

    const rows = [{id: 1}, {id: 2}]

    return {
        collection: collectionDefinition,
        rows
    }
}
