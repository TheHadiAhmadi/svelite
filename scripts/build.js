import {build} from 'vite'
import path from 'path'
import {cpSync} from 'fs'

await build({
    logLevel: 'silent',
    build: {
        ssr: true,
        outDir: 'dist',
        rollupOptions: {
            external: ['svelte'],
            input: {
                svelite: path.resolve("./src/lib/svelite"),
                server: path.resolve("./src/lib/server"),
                vite: path.resolve("./src/lib/vite"),
                db: path.resolve("./src/lib/db"),
            },
        }
    }
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
            formats: ['es'],
        },
    }
})


cpSync('./src/lib/components', './dist/components', {
    recursive: true
})
cpSync('./src/lib/components/index.js', './dist/components/index.js')


