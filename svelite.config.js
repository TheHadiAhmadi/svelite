
export default {
    pages: [
        {slug: '/test', modules: [{name: 'Test', props: {a: 123}}]}
    ],
    modules: {
        Test: {
            name: 'Test',
            component: console.log,
            async load(props) {
                console.log('load inside test module', props)

            }
        }
    }

}
