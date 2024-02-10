import Home from './Home.svelte'
import Footer from './Footer.svelte'
import Test from './Test.svelte'
import Header from './Header.svelte'

export default {
    plugins: [/* List of plugins */],
    pages: [
        {
            slug: '/',
            modules: [
                {name: 'Header'},
                {name: 'Home'},
                {name: 'Footer'}
            ],
        },
        {
            slug: '/test',
            modules: [
                {name: 'Header'},
                {name: 'Test'},
                {name: 'Footer'}
            ]
        }

    ],
    modules: {
        Home,
        Footer,
        Test,
        Header,
    },
    layouts: {
        // layout definitions
    }
}
