import RoleEditor from './RoleEditor.svelte'

export default {
    name: 'RoleEditor',
    description: 'Role editor form',
    component: RoleEditor,
    load() {


        return {
            insert(value) {
                console.log('insert', value)
            },
            update(value) {
                console.log('update', value)
            }


        }
    }

}
