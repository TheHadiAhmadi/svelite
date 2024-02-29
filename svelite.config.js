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
            default: Test,
            async load(props) {
                console.log('load inside test module', props)
                return {a: 34}
            }
        }
    },
    $db: {
        base_url: 'https://db.hadiahmadi.dev',
        /* token: '<get a token from https://db.hadiahmadi.dev/create>' */
    },
    $routes: {
        /* ... */
    }
}
