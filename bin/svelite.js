#!/usr/bin/env node

import path from 'path'
import { sveltekit } from '@sveltejs/kit/vite';
import { build, createServer } from "vite";

if(process.argv.includes('build')) {
    const server = await build({
        plugins: [sveltekit()],
        server: {fs: {strict: false}},
        css: {
            postcss: path.resolve('node_modules/svelitecms/dist/postcss.config.js')
        },
    })
    console.log('HELLO')

} else {
    const server = await createServer({
        plugins: [sveltekit()],
        server: {fs: {strict: false}},
        css: {
            postcss: path.resolve('node_modules/svelitecms/dist/postcss.config.js')
        },
    })

    await server.listen(5173)

    server.printUrls()
}
