import Test from './modules/Test.svelte'

export default {
    pages: [
        {slug: '/test', modules: [
            {name: 'Test', props: {a: 123}}
        ]}
    ],
    modules: {
        Test: import('./modules/Test.svelte')
    },
    $db: {
        base_url: 'https://db.hadiahmadi.dev',
        /* token: '<get a token from https://db.hadiahmadi.dev/create>' */
    },
    $routes: {
        /* ... */
    }
}
