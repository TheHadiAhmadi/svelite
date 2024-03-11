export default {
    plugins: [/* List of plugins */],
    pages: [
        {
            slug: '/test',
            title: 'Test',
            modules: [{name: 'Test'}]
        }
    ],
    modules: {
        Test: import('./modules/Test.svelte')
    },
    secrets: {
        $name: 'VERY_SECRET',
        nod: 'sdf'
    },
    layouts: {

        // layout definitions
    }
}