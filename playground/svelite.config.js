import * as Home from './modules/Home.svelte'
import * as Footer from './modules/Footer.svelte'
import * as Test from './modules/Test.svelte'
import * as Header from './modules/Header.svelte'

import AdminPlugin from './plugins/admin/index'
import TestPlugin from './plugins/test2-plugin/index.js'

export default {
    plugins: [
        TestPlugin(), 
        AdminPlugin({

        })
    ],
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
