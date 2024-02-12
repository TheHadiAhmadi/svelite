import Test from './test.svelte'

export default () => {
    return {
        modules: {
            Test,
        },
        pages: [
            {slug: 'test-plugin', modules: [
                {name: 'Test'},
                {name: 'Test'},
            ]}

        ],
        layouts: {},
    }
}
