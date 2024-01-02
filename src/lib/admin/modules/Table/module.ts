import Table from './Table.svelte'

export default {
    name: "Table",
    description: "Table component for list pages",
    component: Table,
    props: {
        collection: {type: 'plain_text', label: 'Collection'}
    },

    async load(props, api) {
        console.log('load table data')
        let items = await api.db(props.collection).find().all().then(res => res.data)

        return {
            remove(id) {
                api.db(props.collection).remove(id)
                return true;
            },
            items,
            reload() {}
        }


    }
}
