import {build} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import path from 'path'
import {cpSync} from 'fs'

await build({
    logLevel: 'silent',
    build: {
        ssr: true,
        outDir: 'dist',
        rollupOptions: {
            input: {
                svelite: path.resolve("./src/lib/svelite"),
                // client: path.resolve("./src/lib/client"),
                server: path.resolve("./src/lib/server"),
                vite: path.resolve("./src/lib/vite"),
            },
        }
    },
    plugins: [svelte()]
})

await build({
    logLevel: 'silent',
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
            entry: path.resolve("./src/lib/client"),
            name: "svelite-client",
            fileName: 'client',
            rollupOptions: {
            }
        }
    },
    plugins: [svelte()]
})


cpSync('./src/lib/components', './dist/components', {
    recursive: true
})


