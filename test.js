import { render } from 'svelte/server'
// import test from './playground/modules/Test.svelte'
import {writeFileSync} from 'fs'

import tailwindcss from '@tailwindcss/vite'
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { build, createServer } from 'vite'

async function run() {

    const vite = await createServer({
        plugins: [
            svelte({
                preprocess: vitePreprocess()
            }),
            tailwindcss()
        ],
    })

    const { default: test } = await vite.ssrLoadModule('./playground/modules/Test.svelte')
    const res = render(test, {
        props: { a: 1 }
    })

    // console.log({ res })
    writeFileSync('test.head.html', res.head)
    writeFileSync('test.html', res.html)
}

run()