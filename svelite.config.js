import Test from './modules/Test.svelte'

export default {
    pages: [
        {slug: '/test', modules: [
            {name: 'Test', props: {a: 123}}
        ]}
    ],
    modules: {
        Test: {
            name: 'Test',
            component: Test,
            async load(props) {
                console.log('load inside test module', props)
                return {a: 34}
            }
        }
    }
}
