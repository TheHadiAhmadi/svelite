import api from "$lib/api";
import Todos from "./Todos.svelte";

export default {
    name: "Todos",
    description: "Todo list module",
    component: Todos,
    props: {
        collection: {label: 'Collection', type: 'plain_text'}
    },
    async load(props: any) {
        let todos = await api(props.collection).find().all().then(res => res.data)
        return {
            todos,
            async insert(body: any) {
                api(props.collection).insert(body)
            },
            async remove(id: string) {
                api(props.collection).remove(id)
            }
        }
    }
}


